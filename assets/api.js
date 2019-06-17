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
        });})