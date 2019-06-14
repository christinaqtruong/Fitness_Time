
//when window loads, it initiates all the functions
window.onload = function(){
    //click events
    $(document).on('click', "#submit-btn", function(){
        //sends user input to firebase

    })

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
};

//variable that holds our setInterval to run the stopwatch
var interval;

//prevents clock from speeding up
var clockRunning = false;
var workoutInterval = 0;
var restInterval = 0;

function reset(){

    //resets time to zero
    workoutInterval = 0;
    restInterval = 0

    //reset the display
    $('workoutInterval-display').text("00:00:00");
    $('restInterval-display').text("00:00:00");

    //stop the music
}

function start(){
    //setInterval starts count and sets the clock to running
    if(!clockRunning){
        interval = setInterval(count, 1000);
        clockRunning = true;
    }
    //  Call function with setInterval
    clock = setInterval(runningClock , 1000);
});
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
};


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

database.ref().push({
    workoutInterval: workoutInterval,
    restInterval: restInterval,
    dateAdded: firebase.database.ServerValue.TIMESTAMP
});
})

database.ref().on("child_added", function(snapshot){
    //stored snapshot value in a variable
    var sv = snapshot.val();

    console.log(sv.workoutInterval);
    console.log(sv.restInterval);

    //display on HTML
    $("#workoutInterval-display").text(sv.workoutInterval);
    $("#restInterval-display").text(sv.restInterval);
}, function(errorObject){
    console.log("Errors handled:" + errorObject.code);
});

//variable that holds our setInterval to run the stopwatch
var interval;

//prevents clock from speeding up
var clockRunning = false;

var workoutInterval = "";
var restInterval = "";

function reset(){

    //resets time to zero
    workoutInterval = 0;
    restInterval = 0;

    //reset the display
    $('#workoutInterval-display').text("00:00:00");
    $('#restInterval-display').text("00:00:00");

    //stop the music
}

function start(){
    //setInterval starts count and sets the clock to running
    if(!clockRunning){
        interval = setInterval(count, 1000);
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
    var hours = Math.floor(t)
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


    return hours + ":" + minutes + ":" + seconds;
}

function countdown(){
    //decrements time 
    workoutInterval--;
    restInterval--;

    //get the current time and display it
    var convertedWorkoutInterval = timeConverter(workoutInterval);
    var convertedRestInterval = timeConverter(restInterval);

    //display the countdown
    $("#workoutInterval-display").text(convertedWorkoutInterval);
    $("#restInterval-display").text(convertedRestInterval);

}
