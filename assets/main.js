    //click events
    $(document).on('click', "#startTimer-btn", function(){
        //starts timer
        start();
        console.log("The timer has been started!");
    })

    $(document).on('click', "#reset-btn", function(){
        //resets timer
        reset();
    })

    $(document).on('click', "#pause-btn", function(){
        //pauses timer
        pause();
    })





    //TRIED TO FORCE INPUT FORM TO ACCEPT ONLY FOUR CHARACTERS AND INSERT A SEMICOLON BETWEEN THE FIRST AND LAST TWO CHARACTERS
    // $(document).keyup(function () {
    // var workoutfield = $('#workoutInterval-input').val().split(""); 
    // console.log(workoutfield);

    // var winput = $('#workoutInterval-input').val();
    // winput = workoutfield[0] + workoutfield[1] + ":" + workoutfield[2] + workoutfield[3];
    // console.log(winput);
    // $('#workoutInterval-input').text(winput);

    // if (workoutfield.length > 4) {
    //     workingoutfield.slice(0,5);
    // }
    // });


// My web app's Firebase configuration
var firebaseConfig = {
    apiKey: "AIzaSyDTjMXFqGMoWs8zsxC5EGaTNCl2SWVb75M",
    authDomain: "lazytimer-cqmt.firebaseapp.com",
    databaseURL: "https://lazytimer-cqmt.firebaseio.com",
    projectId: "lazytimer-cqmt",
    storageBucket: "lazytimer-cqmt.appspot.com",
    messagingSenderId: "371231626261",
    appId: "1:371231626261:web:e616b4da860ca636"
  };

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
var database = firebase.database();

//clicking submit button grab input values and pushes it to firebase
$("#submit-btn").on("click", function(event){
    
    console.log("The submit button was pressed")

    //prevents default submit button function
    event.preventDefault();
    
    //variable for checking workout interval input value
    var workoutInput = $("#workoutInterval-input").val().trim();

    //if there is not input value, set the workout interval to 00:00 by default, else take the user input
    if(workoutInput === ""){
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

    //if there is not input value, set the rest interval to 00:00 by default, else take the user input
    if(restInput === ""){
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

database.ref().on("child_added", function(snapshot){
    //stored snapshot value in a variable
    var sv = snapshot.val();

    console.log("This is the Workout Interval string pulled from firebase: " + sv.workoutInterval);
    console.log("This is the Rest Interval string pulled from firebase: " + sv.restInterval);

    //splits user input by the : into minutes and seconds, and turns them from string into numbers for the workout interval
    var workoutIntervalMinutes = parseInt(sv.workoutInterval.split(":")[0]);
    var workoutIntervalSeconds = parseInt(sv.workoutInterval.split(":")[1]);

    console.log("These are the workout minutes: ", workoutIntervalMinutes);
    console.log("These are the workout seconds: ", workoutIntervalSeconds);

    //converts minutes into seconds and adds it to seconds for total workout duration in seconds
    workoutTotalSeconds = (workoutIntervalMinutes * 60) + workoutIntervalSeconds
    console.log("These are the total workout seconds", workoutTotalSeconds);

    //splits user input by the : into minutes and seconds and turns them from string into numbers for the rest interval
    var restIntervalMinutes = parseInt(sv.restInterval.split(":")[0]);
    var restIntervalSeconds = parseInt(sv.restInterval.split(":")[1]);
    console.log("These are the resting minutes: ", restIntervalMinutes)
    console.log("These are the resting seconds: ", restIntervalSeconds)


    //converts minutes into seconds and adds it to seconds for total rest duration in seconds
    restTotalSeconds = (restIntervalMinutes * 60) + restIntervalSeconds
    console.log("These are the total resting seconds: ", restTotalSeconds)

    //display on HTML
    $("#workoutInterval-display").text(sv.workoutInterval);
    console.log("This is the workout display: " + sv.workoutInterval);

    $("#restInterval-display").text(sv.restInterval);
    console.log("This is the resting display: " + sv.restInterval);

}, function(errorObject){
    console.log("Errors handled:" + errorObject.code);
});

//variable that holds our setInterval to run the stopwatch
var interval;
var workoutInterval;
var restInterval;

//prevents clock from speeding up
var clockRunning = false;

//setInterval starts count and sets the clock to running
function start(){

    if(!clockRunning){
        interval = setInterval(countdown, 1000);
        clockRunning = true;
        console.log("Is the clock running? " + clockRunning);
    }
}

//converts the time from seconds into a format for display
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

//this variable must be true in order for the workout timer to decrement; else it starts decrementing the resting timer
var workingOut = true;

//decrements workout interval time first, and once it hits zero, moves on to decrement the rest interval time 
function countdown(){
	
	// Conditional checker to handle user input = 00 vs non-00 case 
	if( workoutTotalSeconds === 0 ){
		workingOut = false;
	}
	else{
		workingOut = true; 
	}

	////////////
	
	if (workingOut) {
		workoutTotalSeconds--;
		console.log(workoutTotalSeconds);

		var displayWorkout = timeConverter(workoutTotalSeconds);
		console.log("This is the total workout seconds display: " + displayWorkout);

		//display the countdown
        $("#workoutInterval-display").text(displayWorkout);
        if(workoutTotalSeconds === 0){
            workingOut = false;
        }	
	}
	
	//decrements rest time
    if(!workingOut){
        restTotalSeconds--;

        var displayRest = timeConverter(restTotalSeconds);
        console.log("This is the total rest seconds timer display: " + displayRest);

        //display the countdown
        $("#restInterval-display").text(displayRest);

        //////////////NEED TO FIGURE OUT HOW TO INCORPORATE IF FUNCTION IF REST TOTAL SECONDS STARTS AT ZERO, IT NEEDS TO NOT DECREMENT and 
        //FIX BUG WHERE REST TIMER STARTS EXACTLY AS THE WORKOUT TIMER HITS 0

        //once resting time hits zero, either repeat the function or stop the timer
        if(restTotalSeconds === 0) {
            //clears the interval so that it no longer triggers the countdown function
            clearInterval(interval);

            //sets clockRunning to false so that clicking the start button will set the interval function to call the countdown function
            clockRunning = false;
            console.log("Is the clock still running? " + clockRunning);

            //enables workout timer to decrement if start is hit again
            workingOut = true;
        }
    }
}

//clearInterval stops the count and sets clock to not running
function pause (){
    clearInterval(interval);
    clockRunning = false;
    console.log("Is the clock running? " + clockRunning);
}

function reset(){
    clearInterval(interval);
    clockRunning = false;
    workingOut = true;
    workoutInterval = "00:00";
    restInterval = "00:00";
    $("#workoutInterval-display").text("00:00");
    $("#restInterval-display").text("00:00");

}