//global variables
var time;
var clock;
$(document).ready(function () {
    // the timer at the top
    function runningClock() {
        time = moment().format("hh:mm:ss A");
        $("#time").text(time);
    }
    //  Call function with setInterval
    clock = setInterval(runningClock , 1000);
});