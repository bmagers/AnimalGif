$(document).ready(function() {

    var topics = ["dog", "cat", "squirrel", "raccoon", "bald eagle", "rat", "fox", "coyote", "rabbit", "orca", "sea lion"];
    topics.forEach(function(topic) {
        var newButton = $("<button>").attr("id", topic).text(topic);
        newButton.on("click", function() {
            getGifs(this.id);
        });
        $("#ImageArea").append(newButton);
    });

    function getGifs(topic) {
        var gifsUrl = "https://api.giphy.com/v1/gifs/search?q=" + topic + "&api_key=BSEP7a1S74kX6ETXGCDeTDZ2A4uwiO4K&limit=10";
        $.ajax({
            url: gifsUrl,
            method: "GET"
        }).then(function(response) {
            var images = response.data;
            for (var i = 0; i < images.length; i++) {
                var gifDiv = $("<div>").addClass("gifDiv");
                var p = $("<p>").text("Rating: " + images[i].rating);
                var imageStill = images[i].images.fixed_height_still.url;
                var imageAnimated = images[i].images.fixed_height.url;
                var image = $("<img>").attr("src", imageStill).addClass("gifImg");
                image.attr("data-state", "still");
                image.attr("data-animated", imageAnimated);
                image.attr("data-still", imageStill);
                gifDiv.append(image);
                gifDiv.append(p);
                $("#ImageArea").append(gifDiv);
            }
        });
    }

    $(document).on("click", ".gifImg", function() {
        var state = $(this).attr("data-state");
        if (state === "still") {
            $(this).attr("src", $(this).attr("data-animated"));
            $(this).attr("data-state", "animated");
        } else {
            $(this).attr("src", $(this).attr("data-still"));
            $(this).attr("data-state", "still");
        }
    });




});