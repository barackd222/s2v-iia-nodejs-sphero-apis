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

var move = function (shape, color) {

    var i = 1;
    var nextWait = 3000;


    orb.connect(function () {

        // Start Calibration:
        orb.startCalibration();
        console.log("::CALIBRATION STARTED::");

        setTimeout(function () {

            // Finishing Calibration:
            orb.finishCalibration(function (err, data) {

                console.log("::CALIBRATION FINISHED::");

                // Let's make shapes:

                if (shape.toUpperCase() === "SQUARE") {

                    // Let's make a square: 

                    // First move North:
                    console.log("Rolling Sphero North");
                    orb.color(color);
                    orb.roll(75, 0);//North

                    // Second move:
                    setTimeout(function () {

                        console.log("Rolling Sphero East");
                        orb.color(color);
                        orb.roll(75, 90);

                    }, nextWait * i++);

                    // Third move:
                    setTimeout(function () {

                        console.log("Rolling Sphero South");
                        orb.color(color);
                        orb.roll(75, 180);

                    }, nextWait * i++);


                    // Fourth move:
                    setTimeout(function () {

                        console.log("Rolling Sphero West and back to original point");
                        orb.color(color);
                        orb.roll(75, 270);//West

                    }, nextWait * i++);

                } else {

                    console.log("User has choose a different shape");
                }

                // Finish and disconnect:

                setTimeout(function () {

                    orb.color(RED);

                    setTimeout(function () {

                        // Disconnecting sphero
                        orb.disconnect();
                        console.log("::SPHERO DISCONNECTED::");


                    }, 1000);// 1 sec to allow disconnection

                }, nextWait * i++);

            });

        }, 5000); // 5 seconds to manually calibrate Sphero
    });

}

var color = function (color) {

    console.log("::SPHERO COLOURING::");

    orb.connect(function () {

        switch (color.toUpperCase()) {

            case "BLUE":
                orb.color(BLUE);
                break;

            case "PINK":
                orb.color(PINK);
                break;

            case "YELLOW":
                orb.color(YELLOW);
                break;

            case "GREEN":
                orb.color(GREEN);
                break;

            case "RED":
                orb.color(RED);
                break;

            case "SURPRISE":
                orb.color(getRandomColor());
                break;

            default:
                console.log("Color not supported!!!");
        }

        setTimeout(function () {

            // Disconnecting sphero
            orb.disconnect();
            console.log("::SPHERO DISCONNECTED::");

        }, 1000);// 1 sec to allow disconnection

    });

}


function commander(command, param1, param2) {

    if (command.toUpperCase() === "SHAPE") {

        console.log("Command Sphero to make shapes...");
        move(param1, param2);

    } else if (command.toUpperCase() === "COLOR") {

        console.log("Command Sphero to change colouring...");
        color(param1);

    } else {

        console.log("Unknown Command found [" + command + "]");
    }
}

function getRandomColor() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

//move("square", "blue");
//color("blue");
//console.log(getRandomColor());

module.exports = commander;