"use strict"

//Make a new empty array to hold previous commands (up to 10)
let cmd_hist = [];
let held = 0;
let pos = 0;
let filled = false;


function handleCmd(cmd, cmd_code){

    //If we don't have 10 commands yet, add to history
    if (held < 10){
        cmd_hist[held] = cmd;
        held++;
        pos = held - 1;
        if (held == 10){
            filled = true;
        }
    }
    //Otherwise, shift elements in array left and add to end
    else{
        cmd_hist.shift();
        cmd_hist.push(cmd)
    }


    switch(cmd_code){

        case "001":
            paletteBlue();
            return;

        case "002":
            paletteRed();
            return;

        case "003":
            paletteWhite();
            return;

        case "004":
            clearTerm();
            return;

        case "006":
            designOrbit();
            return;

        case "007":
            designDefault();
            return;

        case "008":
            logbox.hidden = false;
            logbox.classList.add("popUp");
            setTimeout(function(){
                logbox.classList.remove("popUp");
            }, 200);
            return;

        case "009":
            logbox.classList.add("vanish");
            setTimeout(function(){
                logbox.hidden = true;
                logbox.classList.remove("vanish");
            }, 100);
            return;

        case "010":
            weatherbox.hidden = false;
            weatherbox.classList.add("popUp");
            setTimeout(function(){
                weatherbox.classList.remove("popUp");
            }, 200);
            return;

        case "011":
            weatherbox.classList.add("vanish");
            setTimeout(function(){
                weatherbox.hidden = true;
                weatherbox.classList.remove("vanish");
            }, 100);
            return;

        case "012":
            getStatus();
            return;

        case "013":
            getUptime();
            return;

        case "100":
            logDeviceChange("Main Light", "off");
            return;

        case "101":
            logDeviceChange("Main Light", "on");
            return;

        case "110":
            logDeviceChange("Desk Lamp", "off");
            return;

        case "111":
            logDeviceChange("Desk Lamp", "on");
            return;

        case "120":
            logDeviceChange("Waterfall", "off");
            return;

        case "121":
            logDeviceChange("Waterfall", "on");
            return;

        default :
            let prev_cmd = document.createElement("p"); //Create a new paragraph element to be inserted
            prev_cmd.className = "term_p";
            prev_cmd.innerHTML = (cmd + ": Unrecognized Command!"); //Make input the text of the paragraph element
            s_prompt.before(prev_cmd); //Insert paragraph element before prompt
            cmd_line.value = "";
    }
}


function logDeviceChange(device, state){

    let date = new Date();

    let log_note = document.createElement("p"); //Create a new paragraph element to be inserted
    log_note.innerHTML = (date + ": " + device + " turned " + state + "."); //Make input the text of the paragraph element
    log_note.className = "log_p";
    log_body.append(log_note); //Insert paragraph element at end of body

}


function getPrevCmd(){

    if (pos >= 0 && filled == true){
        cmd_line.value = cmd_hist[pos];
        pos--;
    }
    else if(pos >=-1 && filled == false && cmd_hist.length >= 1){
        if (pos == -1){
            pos = cmd_hist.length - 1;
            cmd_line.value = "";
        }else{
            cmd_line.value = cmd_hist[pos];
            pos--;
        }
    }
    else{
        cmd_line.value = "";
        pos = 9;
    }
}



function clearTerm(){
    let len = cmd_area.childNodes.length;
    let d = 1;
    for(let i = 1; i < len; i++){
        if(i >= len - 4){
            break;
        }
        cmd_area.removeChild(cmd_area.childNodes[d]);
    }
}

function designOrbit(){

    log_title.style.fontFamily = "Orbitron";
    logbox.style.borderStyle = "solid";

    term_title.style.fontFamily = "Orbitron";
    termbox.style.borderStyle = "solid";

    weather_title.style.fontFamily = "Orbitron";
    weatherbox.style.borderStyle = "solid";

}

function designDefault(){

    log_title.style.fontFamily = "monospace";
    logbox.style.borderStyle = "none";

    term_title.style.fontFamily = "monospace";
    termbox.style.borderStyle = "none";

    weather_title.style.fontFamily = "monospace";
    weatherbox.style.borderStyle = "none";

}



function paletteWhite(){

    document.body.style.background = "#EAEAEA";

    //Change terminal palette
    term_title.style.color = "#632100";
    top_bar.style.background = "rgba(255, 255, 255, 0.5)";
    cmd_area.style.background = "rgba(35, 6, 42, 0.9)";
    termbox.style.borderColor = "rgba(18, 4, 21, 0.5)";


    //Change device log palette
    log_title.style.color = "#632100";
    log_bar.style.background = "rgba(255, 255, 255, 0.5)";
    log_body.style.background = "rgba(35, 6, 42, 0.9)";
    logbox.style.borderColor = "rgba(18, 4, 21, 0.5)";

    //Change weather palette

    weather_title.style.color = "#632100";
    weather_bar.style.background = "rgba(255, 255, 255, 0.5)";
    weather_body.style.background = "rgba(35, 6, 42, 0.9)";
    weatherbox.style.borderColor = "rgba(18, 4, 21, 0.5)";

}

function paletteBlue(){

    document.body.style.background = "linear-gradient(#5486BB, #1A2837) fixed";

    //Change terminal palette
    term_title.style.color = "#FFFFFF";
    top_bar.style.background = "rgba(0, 241, 241, 0.7)";
    cmd_area.style.background = "rgba(28, 28, 50, 0.92)";
    termbox.style.borderColor = "rgba(45, 45, 88, 0.5)";



    //Change device log palette
    log_title.style.color = "#FFFFFF";
    log_bar.style.background = "rgba(0, 241, 241, 0.7)";
    log_body.style.background = "rgba(28, 28, 50, 0.92)";
    logbox.style.borderColor = "rgba(45, 45, 88, 0.5)";

    //Change weather palette
    weather_title.style.color = "#FFFFFF";
    weather_bar.style.background = "rgba(0, 241, 241, 0.7)";
    weather_body.style.background = "rgba(28, 28, 50, 0.92)";
    weatherbox.style.borderColor = "rgba(45, 45, 88, 0.5)";

}

function paletteRed(){
    document.body.style.background = "linear-gradient(#901e1e, #511010) fixed";

    //Change terminal palette
    term_title.style.color = "#FFFFFF";
    top_bar.style.background = "rgba(195, 17, 17, 0.8)";
    cmd_area.style.background = "rgba(34, 34, 34, 0.8)";
    termbox.style.borderColor = "rgba(23, 23, 23, 0.5)";


    //Change device log palette
    log_title.style.color = "#FFFFFF";
    log_bar.style.background = "rgba(195, 17, 17, 0.8)";
    log_body.style.background = "rgba(34, 34, 34, 0.8)";
    logbox.style.borderColor = "rgba(23, 23, 23, 0.5)";

    //Change device log palette
    weather_title.style.color = "#FFFFFF";
    weather_bar.style.background = "rgba(195, 17, 17, 0.8)";
    weather_body.style.background = "rgba(34, 34, 34, 0.8)";
    weatherbox.style.borderColor = "rgba(23, 23, 23, 0.5)";


}
