$(document).ready(function() {

    var topics = ["squirrel", "raccoon", "cat", "rabbit", "sea lion", "gecko"];
    makeButtons();

    function makeButtons() {
        $(".topicButton").remove();
        topics.forEach(function(topic) {
            var newButton = $("<button>").addClass("topicButton").attr("id", topic).text(topic);
            newButton.on("click", function() {
                $(".gifDiv").remove();
                getGifs(this.id);
            });
            $("#ButtonArea").append(newButton);
        });
    }

    var animalAddButton = $("<button>").text("Add an animal: ").attr("id", "btnAddAnimal");
    var animalAddForm = $("<input>").attr("id", "animalAddForm");
    animalAddButton.on("click", function() {
        var newAnimal = animalAddForm.val().trim();
        animalAddForm.val("");
        if (newAnimal.length > 1) {
            topics.push(newAnimal);
            makeButtons();
        }
    });
    $("#AddButtonArea").append(animalAddButton).append(animalAddForm);

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
                gifDiv.append(p);
                gifDiv.append(image);
                $("#ImageArea").prepend(gifDiv);
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