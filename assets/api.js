$("#music-button").on("click", function (event) {
    event.preventDefault()

    $.ajax({
        url: "https://api.napster.com/v2.2/artists/top",
        method: "GET",
        headers: {
            'apikey': 'MTlhZTJjNGUtZWYyZC00ZTkwLWI3M2UtOGJlYWM0OTQ0MmEw'
        }
    })
        .then(function (response) {
            console.log(response);
        });


const tracksTemplateSource = document.getElementById('tracks-template').innerHTML;
const tracksTemplate = Handlebars.compile(tracksTemplateSource);

const $tracks = $('#tracks-container');

const getTopTracks = $.get('https://api.napster.com/v2.1/tracks/top?apikey=MTlhZTJjNGUtZWYyZC00ZTkwLWI3M2UtOGJlYWM0OTQ0MmEw');
    })