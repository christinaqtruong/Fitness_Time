
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

function countdown(){
    //decrements time 
    
}



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

 $("#music-button").on("click", function(event){
    event.preventDefault()

    $.ajax({
        url: "https://api.napster.com/v2.2/artists/top",
        method: "GET",
        headers: {
           'apikey':'MTlhZTJjNGUtZWYyZC00ZTkwLWI3M2UtOGJlYWM0OTQ0MmEw'
       }
    }).then(function(response){
        console.log(response);
    


});})