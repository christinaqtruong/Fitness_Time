

$(document).ready(function() {
  $("#controlers input").attr("disabled", true);
  $("#slider_seek").click(function(evt, arg) {
    var left = evt.offsetX;
    DZ.player.seek((evt.offsetX / $(this).width()) * 100);
  });
});

function event_listener_append() {
  var pre = document.getElementById("event_listener");
  var line = [];
  for (var i = 0; i < arguments.length; i++) {
    line.push(arguments[i]);
  }
  pre.innerHTML += line.join(" ") + "\n";
};

function onPlayerLoaded() {
  $("#controlers input").attr("disabled", false);
  // event_listener_append("player_loaded");
  DZ.Event.subscribe("current_track", function(arg) {
    // event_listener_append(
    //   "current_track",
    //   arg.index,
    //   arg.track.title,
    //   arg.track.album.title
    // );
  });

  DZ.Event.subscribe("player_position", function(arg) {
    // event_listener_append("position", arg[0], arg[1]);
    $("#slider_seek")
      .find(".bar")
      .css("width", (100 * arg[0]) / arg[1] + "%");
  });
};

DZ.init({
  appId: "354324",
  channelUrl:
    "https://christinaqtruong.github.io/Fitness_Time/",
  player: {
    container: "player",
    width: 300,
    height: 300,
    format: "square",
    onload: onPlayerLoaded
  }
});

$("#baggio").on("click",function(){
  console.log("test")
  DZ.player.playRadio(37151);
})


$.ajax({
  url: "https://cors-anywhere.herokuapp.com/https://api.deezer.com/radio/genres",
  method: "GET"
}).then(function(response) {
  
  console.log(response.data[0].radios[0].id);

    var buttons = $('<button class="radioButtonME">').text(response.data[1].radios[0].title).attr("radio-id", response.data[1].radios[0].id);
    $('#buttons').append(buttons);

    var buttontwo = $('<button class="radioButtonME">').text(response.data[4].radios[0].title).attr("radio-id", response.data[4].radios[0].id);
    $('#buttons').append(buttontwo);
   
    var buttonthree = $('<button class="radioButtonME">').text(response.data[6].radios[0].title).attr("radio-id", response.data[6].radios[0].id);
    $('#buttons').append(buttonthree);
    
    var buttonfour = $('<button class="radioButtonME">').text(response.data[11].radios[0].title).attr("radio-id", response.data[11].radios[0].id);
    $('#buttons').append(buttonfour);

    var buttonfive = $('<button class="radioButtonME">').text(response.data[15].radios[0].title).attr("radio-id", response.data[15].radios[01 ].id);
    $('#buttons').append(buttonfive);
});
$(document).on('click', '.radioButtonME', function(){
  console.log("HI");
  DZ.player.playRadio(+$(this).attr("radio-id"))
})


// //google maps
// function initMap() {
//   // The location of Austin
//   var austin = {lat: 30.2672, lng: 97.7431};
//   // The map, centered at Austin
//   var map = new google.maps.Map(
//       document.getElementById('map'), {zoom: 4, center: austin});
//   // The marker, positioned at Uluru
//   var marker = new google.maps.Marker({position: austin, map: map});
// }

//trying to call back location of gyms to get their long/lat and then need to create markers for each location
// $.ajax({
//   url: "https://cors-anywhere.herokuapp.com/https://maps.googleapis.com/maps/api/place/findplacefromtext/json?input=mongolian%20grill&inputtype=textquery&fields=photos,formatted_address,name,opening_hours,rating&locationbias=circle:2000@47.6918452,-122.2226413&key=AIzaSyAtjZ3M06kWHAtzMycdBNSbTWhT4KlCC5w",
//   method: "GET"
// }).then(function(response) {
//   console.log(response)
// })

// //GEOLOCATION API
// var map, infoWindow;
// function initMap() {
//   map = new google.maps.Map(document.getElementById('map'), {
//     center: {lat: -34.397, lng: 150.644},
//     zoom: 6
//   });
//   infoWindow = new google.maps.InfoWindow;
//   if (navigator.geolocation) {
//     navigator.geolocation.getCurrentPosition(function(position) {
//       var pos = {
//         lat: position.coords.latitude,
//         lng: position.coords.longitude
//       };

//       infoWindow.setPosition(pos);
//       infoWindow.setContent('Location found.');
//       infoWindow.open(map);
//       map.setCenter(pos);
//     }, function() {
//       handleLocationError(true, infoWindow, map.getCenter());
//     });
//   } else {
//     // Browser doesn't support Geolocation
//     handleLocationError(false, infoWindow, map.getCenter());
//   }
// }
// function handleLocationError(browserHasGeolocation, infoWindow, pos) {
//   infoWindow.setPosition(pos);
//   infoWindow.setContent(browserHasGeolocation ?
//                         'Error: The Geolocation service failed.' :
//                         'Error: Your browser doesn\'t support geolocation.');
//   infoWindow.open(map);
// }
