//when window loads, it initiates all the functions
window.onload = function(){
    
    //click events
    $(document).on('click', "#startTimer-btn", function(){
        //starts timer
        start();
    })

    $(document).on('click', "#reset-btn", function(){
        //resets timer
        reset();
    })

    $(document).on('click', "#pause-btn", function(){
        //resets timer
        pause();
    })


// My web app's Firebase configuration
var firebaseConfig = {
    apiKey: "AIzaSyBKYD8IunAzx6dTWPxw9egVjiW4odHBnFw",
    authDomain: "fitnesstime-cqmt.firebaseapp.com",
    databaseURL: "https://fitnesstime-cqmt.firebaseio.com",
    projectId: "fitnesstime-cqmt",
    storageBucket: "fitnesstime-cqmt.appspot.com",
    messagingSenderId: "334521941866",
    appId: "1:334521941866:web:68651ef04c47065d"
  };

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
var database = firebase.database();

//clicking submit button grab input values and pushes it to firebase
$("#submit-btn").on("click", function(event){
    event.preventDefault();

    workoutInterval = $("#workoutInterval-input").val().trim();
    restInterval = $("#restInterval-input").val().trim();

    console.log("workoutInterval", workoutInterval);
    console.log("restInterval", restInterval);



    database.ref().push({
        workoutInterval: workoutInterval,
        restInterval: restInterval,
        dateAdded: firebase.database.ServerValue.TIMESTAMP
    });
});

var workoutTotalSeconds;
var restTotalSeconds;

database.ref().on("child_added", function(snapshot){
    //stored snapshot value in a variable
    var sv = snapshot.val();

    console.log(sv.workoutInterval);
    console.log(sv.restInterval);

    //splits user input by the : into minutes and seconds, and turns them from string into numbers for the workout interval
    var workoutIntervalMinutes = parseInt(sv.workoutInterval.split(":")[0]);
    var workoutIntervalSeconds = parseInt(sv.workoutInterval.split(":")[1]);

    console.log("workoutIntervalMinutes", workoutIntervalMinutes);
    console.log("workoutIntervalSeconds", workoutIntervalSeconds);

    //converts minutes into seconds and adds it to seconds for total workout duration in seconds
    workoutTotalSeconds = (workoutIntervalMinutes * 60) + workoutIntervalSeconds
    console.log("workoutTotalSeconds", workoutTotalSeconds);

    //splits user input by the : into minutes and seconds and turns them from string into numbers for the rest interval
    var restIntervalMinutes = parseInt(sv.restInterval.split(":")[0]);
    var restIntervalSeconds = parseInt(sv.restInterval.split(":")[1]);

    //converts minutes into seconds and adds it to seconds for total workout duration in seconds
    restTotalSeconds = (restIntervalMinutes * 60) + workoutIntervalSeconds

    //display on HTML
    if(sv.workoutInterval){
            $("#workoutInterval-display").text(sv.workoutInterval);
    }
    if(sv.restInterval){
            $("#restInterval-display").text(sv.restInterval);
    }
}, function(errorObject){
    console.log("Errors handled:" + errorObject.code);
});

//variable that holds our setInterval to run the stopwatch
var interval;

var workoutInterval;
var restInterval;

//prevents clock from speeding up
var clockRunning = false;

function reset(){

    //clear timer 
    clearInterval(interval);

    //resets time to zero
    workoutInterval = 0;
    restInterval = 0;

    //reset the display
    $('#workoutInterval-display').text("00:00");
    $('#restInterval-display').text("00:00");

    //stop the music
}

function start(){
    //setInterval starts count and sets the clock to running
    if(!clockRunning){
        interval = setInterval(countdown, 1000);
        clockRunning = true;
    }
}

function pause (){
    //clearInterval stops the count and sets clock to not running
    clearInterval(interval);
    clockRunning = false;
}

function loopIntervals (){
    //loops intervals if checkbox is checked
    $('input[type=checkbox]').change(function(){
        if($(this).is(':checked')) {
            // Checkbox is checked loop the start function
            start();
        } else {
            // Checkbox is not checked..
        }
    });
}

function timeConverter(t){
    var minutes = Math.floor(t/60);
    var seconds = t - (minutes * 60);

    if (seconds < 10) {
        seconds = "0" + seconds
    }

    if (minutes === 0) {
        minutes = "00";
    }

    else if (minutes < 10) {
        minutes = "0" + minutes
    }


    return minutes + ":" + seconds;
}

var workingOut = true;

function countdown() {
    if (workingOut) {
        //decrements workout interval time first, and once it hits zero, moves on to decrement the rest interval time 
        workoutTotalSeconds--;

        //get the current time and display it
        // var convertedWorkoutInterval = timeConverter(workoutInterval);
        var seconds = workoutTotalSeconds;
        var duration = moment.duration(seconds, 'seconds');
        var formattedWorkout = duration.format("hh:mm:ss");
        console.log(formattedWorkout);

        //display the countdown
        $("#workoutInterval-display").text(formattedWorkout);

        if (workoutTotalSeconds === 0) {
            workingOut = false;
        }
    }
    else {
        //decrements rest time
        restTotalSeconds--;

        //get the current time and display it
        // var convertedRestInterval = timeConverter(restInterval);
        var seconds = restTotalSeconds;
        var duration = moment.duration(seconds, 'seconds');
        var formattedRest = duration.format("hh:mm:ss");
        console.log(formattedRest);

        //display the countdown
        $("#restInterval-display").text(formattedRest);

    }
    
}}
