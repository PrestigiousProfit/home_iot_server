"use strict"

const mysql = require("mysql");
const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "IOT_Server"
});

let processCmd = function(cmd){

    switch(cmd){

        case "theme aqua":
            return "001";

        case "theme dark":
            return "002";

        case "theme light":
            return "003";

        case "clear":
            return "004";

        case "style hitech":
            return "006";

        case "style reg":
            return "007";

        case "show logs":
            return "008";

        case "close logs":
            return "009";

        case "show weather":
            return "010";

        case "close weather":
            return "011";

        case "show status":
            return "012";

        case "show uptime":
            return "013";

        case "set light off":
            changeUp('"Main Light"', "0");
            return "100";

        case "set light on":
            changeUp('"Main Light"', "1");
            return "101";

        case "set dl off":
            changeUp('"Desk Lamp"', "0");
            return "110";

        case "set dl on":
            changeUp('"Desk Lamp"', "1");
            return "111";

        case "set fall off":
            changeUp('"Waterfall"', "0");
            return "120";

        case "set fall on":
            changeUp('"Waterfall"', "1");
            return "121";

        default:
            return "404";
    }

};

let connectToSql = function (){
    db.connect((err) => {
        if(err){
            throw error;
        }
        console.log("Success: Connection Established with Database!");

    });
}

let getStatus = function(response){

    let statArray = [];

    let sql = "SELECT * FROM device_status";
    let query = db.query(sql, (err, results) => {
        if(err) throw err;
        for(let i = 0; i < results.length; i++){
            statArray[i] = new Status(results[i].device, results[i].up);
        }
        let obj = {
            row : statArray,
        };
        obj = JSON.stringify(obj);
        response.end(obj);
    });
}

let getUptime = function(response){
    let sql = "SELECT * FROM device_uptime";
    let query = db.query(sql, (err, results) => {
        if(err) throw err;
        let obj = JSON.stringify(results);
        response.end(obj);
    });
}


function changeUp(device, state){
    let sql = "update device_status set up=" + state + " where device=" + device;
    let query = db.query(sql, (err, results) =>{
        if(err) throw err;
    });
}

function Status(device, up){
    this.device = device;
    this.up = up;
}


module.exports.processCmd = processCmd;
module.exports.connectToSql = connectToSql;
module.exports.getStatus = getStatus;
module.exports.getUptime = getUptime;
