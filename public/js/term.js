"use strict"

getWeather();

logbox.hidden = true;
weatherbox.hidden = true;

//Calculate initial size of our input
cmd_line.style.width = `${(termbox.clientWidth - s_prompt.clientWidth - 30)}px`;

//Resize our input everytime window resizes
document.body.onresize = function(event){
    cmd_line.style.width = `${(termbox.clientWidth - s_prompt.clientWidth - 30)}px`;

}

//Make input cursor blink
cmd_line.focus();

//Clear any previous text
cmd_line.value = "";

let cmd_code = null;

cmd_line.onkeyup = function(event){


    if (event.code == "ArrowUp"){
        getPrevCmd();
    }

    else if (event.code == "Enter"){

        //Retrieve the text in our input box
        let cmd = cmd_line.value;

        //Make sure command isn't too long or empty
        if (checkLength(cmd) == false || cmd == ""){
            return;
        }

        //Send POST Request to server with our command
        sendReq(cmd, handleResponse);
    }

}

function handleResponse(cmd, cmd_code){

    //Create a new paragraph element to be inserted
    let prev_cmd = document.createElement("p");
    prev_cmd.className = "term_p";

    //Make input the text of the paragraph element
    prev_cmd.innerHTML = ("<b>Server# </b>" + cmd);

    //Insert paragraph element before Server prompt and clear input
    s_prompt.before(prev_cmd);
    cmd_line.value = "";

    //Handle the appropriate code we get back from server
    handleCmd(cmd, cmd_code);

    //Make terminal and device log automatically scroll to bottom line
    cmd_area.scrollTop = cmd_area.scrollHeight;
    log_body.scrollTop = log_body.scrollHeight;
}


function checkLength(cmd){

    if (cmd.length > 47){
        cmd_line.value = "";
        return false;
    }

}


function sendReq(cmd){

    let data = "command=" + cmd;
    let http = new XMLHttpRequest();

    http.open('POST', '/', true);
    http.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');

    http.onload = function(){
        if (http.status == 200){
            let cmd_code = http.response;
            handleResponse(cmd, cmd_code);
            return;
        }
    }

    http.send(data);

}

function getStatus(){

    let http = new XMLHttpRequest();

    http.open('GET', '/status', true);

    http.onload = function(){
        if (http.status == 200){

            let extras = JSON.parse(http.response);

            buildTable("+------------+----------+");
            buildTable("|   DEVICE   |  STATUS  |");
            buildTable("+------------+----------+");

            for(let i = 0; i < extras.row.length; i++){

                let turned = (extras.row[i].up == 1)?"on":"off";

                let device = calcDevSpace(extras.row[i].device);
                let dev_stat = calcColSpace(turned, 10);

                buildTable(device + dev_stat);
            }

            buildTable("+------------+----------+");

            cmd_area.scrollTop = cmd_area.scrollHeight;


        }
    }

    http.send();
}

function getUptime(){

    let http = new XMLHttpRequest();

    http.open('GET', '/uptime', true);

    http.onload = function(){
        if (http.status == 200){

            let extras = JSON.parse(http.response);
            console.log(extras);

            buildTable("+------------+-------+--------+---------+--------+");
            buildTable("|   DEVICE   |  DAY  |  WEEK  |  MONTH  |  YEAR  |");
            buildTable("+------------+-------+--------+---------+--------+");

            for(let i = 0; i < extras.length; i++){

                let device = calcDevSpace(extras[i].device);
                let day = calcColSpace(extras[i].day, 7);
                let week = calcColSpace(extras[i].week, 8);
                let month = calcColSpace(extras[i].month, 9);
                let year = calcColSpace(extras[i].year, 8);
                buildTable(device + day + week + month + year);

            }
            buildTable("+------------+-------+--------+---------+--------+");

            cmd_area.scrollTop = cmd_area.scrollHeight;

        }
    }

    http.send();
}

function calcDevSpace(str){

    let space = 11 - str.length;
    let entry = "| ";
    entry += str;
    for (let i = 0; i < space; i++){
        entry += " ";
    }
    entry += "|"
    console.log("entry");
    return entry;
}


function calcColSpace(str, col_len){

    let space = (col_len - str.length);

    let entry = "";
    for (let i = 0; i < space; i++){
        entry += " ";
    }
    entry += str;
    entry += "|"
    return entry;
}

function buildTable(html_string){
    console.log(html_string);
    let table_cols = document.createElement("p");
    table_cols.className = "term_p";
    table_cols.style.whiteSpace = "pre";
    table_cols.innerHTML = html_string;
    s_prompt.before(table_cols);
}


function getWeather(){

    let http = new XMLHttpRequest();
    http.open('GET', 'http://api.openweathermap.org/data/2.5/weather?q=Champaign&units=imperial&APPID=1d8a8e33637d90d70c9ef537c17a8cb2', true);
    http.onload = function(){
        if (http.status == 200){

            let weather = JSON.parse(http.response);

            let temp = weather.main.temp;
            let high = weather.main.temp_max;
            let low = weather.main.temp_min;
            let conditions = weather.weather[0].description;

            let temp_p = document.createElement("p");
            temp_p.id = "mainTemp";
            temp_p.innerHTML = (temp + " °F");
            weather_body.append(temp_p);

            let high_p = document.createElement("p");
            high_p.id = "highLow";
            high_p.innerHTML = ("H:   " + high + " °F");
            weather_body.append(high_p);

            let low_p = document.createElement("p");
            low_p.id = "highLow";
            low_p.innerHTML = ("L:   " + low + " °F");
            weather_body.append(low_p);

            let con_p = document.createElement("p");
            con_p.id = "tempCondition";
            con_p.innerHTML = (conditions.toUpperCase());
            weather_body.append(con_p);
        }
    }

    http.send();

}
