

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
  event_listener_append("player_loaded");
  DZ.Event.subscribe("current_track", function(arg) {
    event_listener_append(
      "current_track",
      arg.index,
      arg.track.title,
      arg.track.album.title
    );
  });

  DZ.Event.subscribe("player_position", function(arg) {
    event_listener_append("position", arg[0], arg[1]);
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

    var buttonfive = $('<button class="radioButtonME">').text(response.data[15].radios[0].title).attr("radio-id", response.data[15].radios[0].id);
    $('#buttons').append(buttonfive);
});
$(document).on('click', '.radioButtonME', function(){
  console.log("HI");
  DZ.player.playRadio(+$(this).attr("radio-id"))
})
