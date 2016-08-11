"use strict";


var sphero = require("../../../");
var orb = sphero("/dev/rfcomm0");

var BLUE = "#0000FF";
var PINK = "#FF1493";
var YELLOW = "#FFFF00";
var GREEN = "#00FF00";
var RED = "#FF0000";
var WHITE = "#FFFFFF";

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

                } if (shape.toUpperCase() === "TRIANGLE") {

                    // Let's make a square: 

                    // First move North:
                    console.log("Rolling Sphero 45 degrees");
                    orb.color(color);
                    orb.roll(75, 45);//45 degrees

                    // Second move:
                    setTimeout(function () {

                        console.log("Rolling Sphero 135 degrees");
                        orb.color(color);
                        orb.roll(75, 135);//135 degrees

                    }, nextWait * i++);

                    // Third move:
                    setTimeout(function () {

                        console.log("Rolling Sphero 270 degrees");
                        orb.color(color);
                        orb.roll(75, 270);//270 degrees

                    }, nextWait * i++);


                } if (shape.toUpperCase() === "LINE") {

                    // Let's make a square: 

                    // First move North:
                    console.log("Rolling Sphero North");
                    orb.color(color);
                    orb.roll(75, 0);//North

                    // Second move:
                    setTimeout(function () {

                        console.log("Rolling Sphero South");
                        orb.color(color);
                        orb.roll(75, 180);

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

var color = function (theColor) {

    console.log("::SPHERO COLOURING::");

    orb.connect(function () {

        // Setting The requested Color
        orb.color(theColor);

        setTimeout(function () {

            // Disconnecting sphero
            orb.disconnect();
            console.log("::SPHERO DISCONNECTED::");

        }, 1000);// 1 sec to allow disconnection

    });

}


function commander(command, param1, param2) {

    var theColor = "";
    var theShape = param1;
    if (command.toUpperCase() === "SHAPE" || command.toUpperCase() === "COLOR") {

        switch (param2.toUpperCase()) {

            case "BLUE":
                theColor = BLUE;
                break;

            case "PINK":
                theColor = PINK;
                break;

            case "YELLOW":
                theColor = YELLOW;
                break;

            case "GREEN":
                theColor = GREEN;
                break;

            case "RED":
                theColor = RED;
                break;

            case "SURPRISE":
                theColor = getRandomColor();
                break;

            default:
                console.log("Color not supported!!! Using default...");
                theColor = WHITE;
        }

    } if (command.toUpperCase() === "SHAPE") {

        console.log("Command Sphero to make shapes... [" + theShape + "], [" + theColor + "]");
        move(theShape, theColor);

    } else if (command.toUpperCase() === "COLOR") {

        console.log("Command Sphero to change colouring... [" + theColor + "]");
        color(theColor);

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