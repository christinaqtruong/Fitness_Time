// $("#music-button").on("click", function (event) {
//     event.preventDefault()

// $.ajax({
//   url: "https://api.napster.com/v2.2/artists/top",
//   method: "GET",
//   headers: {
//     apikey: "MTlhZTJjNGUtZWYyZC00ZTkwLWI3M2UtOGJlYWM0OTQ0MmEw"
//   }
// }).then(function(response) {
//   console.log(response);
// });

$(document).ready(function () {
  $("#controlers input").attr("disabled", true);
  $("#slider_seek").click(function (evt, arg) {
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
  DZ.Event.subscribe("current_track", function (arg) {
    event_listener_append(
      "current_track",
      arg.index,
      arg.track.title,
      arg.track.album.title
    );
  });

  DZ.Event.subscribe("player_position", function (arg) {
    event_listener_append("position", arg[0], arg[1]);
    $("#slider_seek")
      .find(".bar")
      .css("width", (100 * arg[0]) / arg[1] + "%");
  });
};

DZ.init({
  appId: "354324",
  channelUrl:
    "file:///C:/Users/chris/OneDrive/Desktop/Intro%20CS/github_projects/Fitness_Time/index.html",
  player: {
    container: "player",
    width: 300,
    height: 300,
    format: "square",
    onload: onPlayerLoaded
  }
});

