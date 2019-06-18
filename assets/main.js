    //click events
    $(document).on('click', "#startTimer-btn", function(){
        console.log("You pressed START");
        
        //starts timer
        start();
    })

    $(document).on('click', "#reset-btn", function(){
        console.log("You pressed RESET");

        //resets timer
        reset();
    })

    $(document).on('click', "#pause-btn", function(){
        console.log("You pressed PAUSE");
        
        //pauses timer
        pause();
    })

    $(document).on('click', "div#workoutInterval-display", function(){
        console.log("You pressed workoutInterval-display");
        
        var workoutForm = $("<form id='workout-form'>");
        var newInput = $("<input type='text'>").val(timeConverter(workoutTotalSeconds));
        workoutForm.append(newInput);
        $("#workout-wrapper").empty().html(workoutForm);

        workoutForm.on("submit", function(event) {
            event.preventDefault();

            //variable for checking workout interval input value
            var workoutInput = newInput.val();
            console.log("the user typed in the time: " + newInput.val());


            // check to make sure both workoutnput and restInput have a colon
            if (!workoutInput.length) {
                workoutInput = timeConverter(workoutTotalSeconds);
            }
            else if (!workoutInput.includes(":")) {
                console.log("User did not put in a semicolon");

                workoutInput = timeConverter(workoutInput);
                console.log(workoutInput);
            }
            console.log("workoutInput", workoutInput);
    

            database.ref().push({
                workoutInterval: workoutInput,
                restInterval: $("#restInterval-display").text(),
                dateAdded: firebase.database.ServerValue.TIMESTAMP
            });
        });
    });

    $(document).on('click', "div#restInterval-display", function(){
        console.log("You pressed restInterval-display");
        
        var restForm = $("<form id='rest-form'>");
        var newInput = $("<input type='text'>").val(timeConverter(restTotalSeconds));
        restForm.append(newInput);
        $("#rest-wrapper").empty().html(restForm);

        restForm.on("submit", function(event) {
            event.preventDefault();

                    //variable for checking workout interval input value
            var restInput = newInput.val();
            console.log("the user typed in the time: " + newInput.val());


            // check to make sure both workoutnput and restInput have a colon
            if (!restInput.length) {
                restInput = timeConverter(restTotalSeconds);
            }
            else if (!restInput.includes(":")) {
                console.log("User did not put in a semicolon");

                restInput = timeConverter(restInput);
                console.log(restInput);
            }
            
            console.log("restInput", restInput);

            database.ref().push({
                workoutInterval: $("#workoutInterval-display").text(),
                restInterval: restInput,
                dateAdded: firebase.database.ServerValue.TIMESTAMP
            });
        });
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

//setInterval starts count and sets the clock to running
var workoutTotalSeconds;
var restTotalSeconds;
var workoutCountdown;
var restCountdown;


//clicking submit button grab input values and pushes it to firebase
$("#submit-btn").on("click", function (event) {

    console.log("The submit button was pressed")

    //prevents default submit button function
    event.preventDefault();

    //variable for checking workout interval input value
    var workoutInput = $("#workoutInterval-input").val().trim();

    //if there is not input value, set the workout interval to 00:00 by default, else take the user input
    if (workoutInput === "") {
        console.log("No Workout Interval set")

        //set time to zero and set working out variable to false to prevent working out timer from decrementing during countdown function
        workoutInterval = "00:00";
        workingOut = false;

    } else {
        workoutInterval = $("#workoutInterval-input").val().trim();
        console.log("The user has set the Workout Interval to: ", workoutInterval);
    }

    //variable for checking workout interval input value
    var restInput = $("#restInterval-input").val().trim();

    // check to make sure both workoutnput and restInput have a colon
    if (!workoutInput.includes(":") || !restInput.includes(":")) {
        console.log("User did not put in a semicolon");
        return;
    }
    


    //if there is not input value, set the rest interval to 00:00 by default, else take the user input
    if (restInput === "") {
        console.log("No rest Interval set")
        restInterval = "00:00";
    } else {
        restInterval = $("#restInterval-input").val().trim();
        console.log("The user has set the Rest Interval to: ", restInterval);
    }

    //grab the user inputs and shove it up to firebase
    database.ref().push({
        workoutInterval: workoutInterval,
        restInterval: restInterval,
        dateAdded: firebase.database.ServerValue.TIMESTAMP
    });


});

database.ref().on("child_added", function (snapshot) {
    //stored snapshot value in a variable
    var sv = snapshot.val();

    
    //splits user input by the : into minutes and seconds, and turns them from string into numbers for the workout interval
    var workoutIntervalMinutes = parseInt(sv.workoutInterval.split(":")[0]);
    var workoutIntervalSeconds = parseInt(sv.workoutInterval.split(":")[1]);

    
    //converts minutes into seconds and adds it to seconds for total workout duration in seconds
    workoutTotalSeconds = (workoutIntervalMinutes * 60) + workoutIntervalSeconds
    workoutCountdown = workoutTotalSeconds;

    //splits user input by the : into minutes and seconds and turns them from string into numbers for the rest interval
    var restIntervalMinutes = parseInt(sv.restInterval.split(":")[0]);
    var restIntervalSeconds = parseInt(sv.restInterval.split(":")[1]);
    

    //converts minutes into seconds and adds it to seconds for total rest duration in seconds
    restTotalSeconds = (restIntervalMinutes * 60) + restIntervalSeconds
    restCountdown = restTotalSeconds;

    //display on HTML
    // $("#workoutInterval-display").text(sv.workoutInterval);
    var workoutDiv = $("<div id='workoutInterval-display' class='inactive'>").text(sv.workoutInterval);
    $("#workout-wrapper").empty().html(workoutDiv);
    
    // $("#restInterval-display").text(sv.restInterval);
    var restDiv = $("<div id='restInterval-display' class='inactive'>").text(sv.restInterval);
    $("#rest-wrapper").empty().html(restDiv);
    
}, function(errorObject){
    console.log("Errors handled:" + errorObject.code);
});

//variable that holds our setInterval to run the stopwatch
var interval;
var workoutInterval;
var restInterval;

//prevents clock from speeding up
var clockRunning = false;

function start(){

    if (!clockRunning) {
        interval = setInterval(countdown, 1000);
        clockRunning = true;
        console.log("Is the clock running? " + clockRunning);
    }
}

//converts the time from seconds into a format for display
function timeConverter(t) {
    var minutes = Math.floor(t / 60);
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

//this variable must be true in order for the workout timer to decrement; else it starts decrementing the resting timer
var workingOut = true;

//decrements workout interval time first, and once it hits zero, moves on to decrement the rest interval time 

var countdown = function() {
    if (workingOut) {
		workoutCountdown--;
        console.log(workoutCountdown);
        $('#workoutInterval-display').removeAttr('class');
        $('#workoutInterval-display').attr('class','active');

		var displayWorkout = timeConverter(workoutCountdown);
		console.log("This is the total workout seconds display: " + displayWorkout);

		//display the countdown
        $("#workoutInterval-display").text(displayWorkout);
        if(workoutCountdown === 0){
            workingOut = false;
            $('#workoutInterval-display').removeAttr('class');
            $('#workoutInterval-display').attr('class','inactive');
        }	
	}
	
	//decrements rest time
    else if(!workingOut && restCountdown != 0){
        restCountdown--;
        $('#restInterval-display').removeAttr();
        $('#restInterval-display').attr('class','active');
        
        var displayRest = timeConverter(restCountdown);
        console.log("This is the total rest seconds timer display: " + displayRest);

        //display the countdown
        $("#restInterval-display").text(displayRest);

        //resets/displays previous workout timer
        workoutCountdown = workoutTotalSeconds
        var displayWorkout = timeConverter(workoutCountdown);
        $("#workoutInterval-display").text(displayWorkout);


    } else if (!workingOut && restCountdown === 0) {
        console.log("Rest timer is starting at zero.");
        
        //resets to previous timer values
        restCountdown = restTotalSeconds

        var displayRest = timeConverter(restCountdown);

        $('#restInterval-display').removeAttr('class');
        $('#restInterval-display').attr('class','inactive');

        $("#restInterval-display").text(displayRest);
        

        //enables workout timer to decrement if start is hit again
        workingOut = true;
    }
};


function start(){

    if(!clockRunning){
        interval = setInterval(countdown, 1000);
        clockRunning = true;
        console.log("Is the clock running? " + clockRunning);
    }
}

//clearInterval stops the count and sets clock to not running
function pause() {
    clearInterval(interval);
    clockRunning = false;
    
    //condition checks
    console.log("Are we working out? " + workingOut);
    console.log("Is the timer running? " + clockRunning);
    console.log("What is the current work out interval? " + workoutInterval);
    console.log("What is the current rest interval? " + restInterval);
}

function reset() {
    clearInterval(interval);
    workoutCountdown = workoutTotalSeconds;
    restCountdown = restTotalSeconds;
    clockRunning = false;
    workingOut = true;
    // workoutInterval = "00:00";
    // restInterval = "00:00";
    $("#workoutInterval-display").text(timeConverter(workoutCountdown));
    $("#restInterval-display").text(timeConverter(restCountdown));

    //condition checks
    console.log("Are we working out? " + workingOut);
    console.log("Is the timer running? " + clockRunning);
    // console.log("What is the current work out interval? " + workoutInterval);
    // console.log("What is the current rest interval? " + restInterval);
};
