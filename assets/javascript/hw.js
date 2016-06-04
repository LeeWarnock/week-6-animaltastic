$(document).ready(function() {
    var animals = ["gryphon", "dragon", "cheesburgers", "mudskipper", "chazwozzer","slow loris"];
    //adding buttons
    function renderButtons() {
        $("#animals").empty();
        for (var i = 0; i < animals.length; i++) {
            $("#animals").append("<button>" + animals[i] +
                "</button>");
        }
    }
    renderButtons();
    //adds snimals to array
    $("#addAnimal").on("click", function() {
            var input = $("#animal-input").val().toLowerCase().trim();
            //If user input is blank
            if (input == "") {
                alert("We need words in the box, man");
                return false;
            }
            //Checks for duplicate word inputs
            if ($.inArray(input, animals) > -1) {
                alert("This button has already been added");
                return false;
            }
            animals.push(input);
            console.log(animals);
            renderButtons();
            $("#top").hide(3000);
            return false;
        })
        //Clicking one of the buttons renders the gifs
    $(document).on("click", "#animals button", function() {
            $(".animals").empty();
            $("#top").hide(3000);
            var choice = $(this).text();
            console.log(choice);
            var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
                choice + "&api_key=dc6zaTOxFJmzC&limit=10";
            var request = {
                url: queryURL,
                method: "GET"
            }
            $.ajax(request).done(function(response) {
                var obj = response;
                console.log(obj);
                var arr = obj.data;
                console.log(arr);
                for (var i = 0; i < arr.length; i++) {
                    //Images displayed still, but will play when clicked
                    var image = $("<img>").addClass("img-thumbnail gif")
                        .attr("src", arr[i].images.fixed_height_still.url)
                        .attr({"width": 250, "height": 250, "data-index": [i]})
                        .attr('data-still', arr[i].images.fixed_height_still.url)
                        .attr('data-animate', arr[i].images.fixed_height.url)
                        .attr('data-state', 'still');
                    var rating = $("<p class ='rating'>").text(
                        "Rating: " + arr[i].rating);
                    $(".animals").append(image);
                    $(".animals").append(rating);
                }
                //Ajax closer
            });
            //Button that renders gif closer
        })
        //Clicking the gif will animate it by changing the attribute to the animated link
    $(".animals").on("click", ".gif", function() {
            var state = $(this).attr('data-state');
            var animate = $(this).attr('data-animate');
            var still = $(this).attr('data-still');
            if (state == 'still') {
                $(this).attr('src', animate);
                $(this).attr('data-state', 'animate');
            } else {
                $(this).attr('src', still);
                $(this).attr('data-state', 'still');
            }
        })
//document ready function closer
});