"use strict";


var sphero = require("../../../");
var orb = sphero("/dev/rfcomm0");

var BLUE = "#0000FF";
var PINK = "#FF1493";
var YELLOW = "#FFFF00";
var GREEN = "#00FF00";
var RED = "#FF0000";

var TORK = 75;
var NORTH = 0;
var EAST = 90;
var SOUTH = 180;
var WEST = 270;

var move = function (shape, color){

    var i = 1;
    var nextWait = 3000;


    orb.connect(function() {
    
    // Start Calibration:
    orb.startCalibration();
    console.log("::CALIBRATION STARTED::");
    
    setTimeout(function() {

        // Finishing Calibration:
        orb.finishCalibration(function(err, data){
        
        console.log("::CALIBRATION FINISHED::");

            // Let's make shapes:

            if(shape.toUpperCase() === "SQUARE"){

                // Let's make a square: 

                // First move North:
                console.log("Rolling Sphero North");
                orb.color(BLUE);
                orb.roll(75, 0);//North

                // Second move:
                setTimeout(function() {

                    console.log("Rolling Sphero East");
                    orb.color(PINK);
                    orb.roll(75, 90);

                }, nextWait * i++);

                // Third move:
                setTimeout(function() {

                    console.log("Rolling Sphero South");
                    orb.color(YELLOW);
                    orb.roll(75, 180);

                }, nextWait * i++);


                // Fourth move:
                setTimeout(function() {

                    console.log("Rolling Sphero West and back to original point");
                    orb.color(GREEN);
                    orb.roll(75, 270);//West

                }, nextWait * i++);

            } else {

                console.log("User has choose a different shape");
            } 

        // Finish and disconnect:

        setTimeout(function() {

            orb.color(RED);
            
            setTimeout(function() {

                // Disconnecting sphero
                orb.disconnect();
                console.log("::SPHERO DISCONNECTED::");


            }, 1000);// 1 sec to allow disconnection

        }, nextWait * i++);

        });

    }, 5000); // 5 seconds to manually calibrate Sphero
    });

}

module.exports = move;