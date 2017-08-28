$(document).ready(function() {

    //Initial array of animals
    var animals = ["lion", "giraffe", "elephant", "hyena"];

    // GET request to Giphy for the animal button of choice
    function displayAnimalInfo() {
        var animal = $(this).attr("data-name");
        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
            animal + "&api_key=f7d0cd7d081f4a3c96e6bfa7383528c8&limit=10";

        $.ajax({
            url: queryURL,
            method: "GET"
        })

        .done(function(response) {

            // log the animal array
            console.log(response);

            // The image information is inside of the data key, make a variable 
            // named results and set it equal to response.data
            
            //This clears the existing gifs in the HTML Div
            $("#gifs-appear-here").empty();

            var results = response.data;

            for (var i = 0; i < results.length; i++) {

                // Make a div with jQuery and store it in a variable named animalDiv.
                // Make a paragraph tag with jQuery and store it in a variable named p.
                // Set the inner text of the paragraph to the rating of the image in results[i].
                // Make an image tag with jQuery and store it in a variable named animalImage.
                // Set the image's src to results[i]'s fixed_height.url.

                // Append the animalImage variable to the animalDiv variable.
                // Prepend the animalDiv variable to the element with an id of gifs-appear-here.
                var animalDiv = $("<div class='animalDiv'>");
                var rating = results[i].rating;
                var p = $("<p>").text("Rating: " + rating);
                var animalImage = $("<img>");
                animalImage.attr("src", results[i].images.fixed_height_still.url);
                animalImage.attr("data-still", results[i].images.fixed_height_still.url);
                animalImage.attr("data-animate", results[i].images.fixed_height.url);
                animalImage.attr("data-state", "still");
                animalImage.attr("class", "gif");
                // Append the p variable to the animalDiv variable.
                animalDiv.append(p);
                animalDiv.append(animalImage);
                $("#gifs-appear-here").prepend(animalDiv);
            }

            $(".gif").on("click", function() {

                // variable named state to store the image's data-state
                var state = $(this).attr("data-state");
                //Check if the variable state is equal to 'still',
                // then update the src attribute of this image to it's data-animate value,
                // and update the data-state attribute to 'animate'.
                if (state === "still") {
                    $(this).attr("src", $(this).attr("data-animate"));
                    $(this).attr("data-state", "animate");
                    // If state is equal to 'animate', then update the src attribute of this
                    // image to it's data-still value and update the data-state attribute to 'still'
                } else {
                    $(this).attr("src", $(this).attr("data-still"));
                    $(this).attr("data-state", "still");
                }
            });
        });
    };

    function renderButtons() {
        // Deleting the animal buttons prior to adding new animal buttons
        $("#buttons-view").empty();
        // Looping through the array of animals
        for (var i = 0; i < animals.length; i++) {
            // Dynamicaly generating buttons for each animal in the array.
            var a = $("<button>");
            // Adding a class
            a.addClass("animal");
            // Adding a data-attribute with a value of the animal
            a.attr("data-name", animals[i]);
            // Providing the button's text with a value of the animal
            a.text(animals[i]);
            // Adding the button to the HTML
            $("#buttons-view").append(a);
        }
    }

    $("#add-animal").on("click", function(event) {
        // event.preventDefault() prevents the form from trying to submit itself.
        // User can hit enter instead of clicking the button if they want
        event.preventDefault();
        // This line will grab the text from the input box
        var animal = $("#animal-input").val().trim();

        // The animal from the textbox is then added to our array
        animals.push(animal);

        $("#animal-input").val("");

        // calling renderButtons to process the animal array
        renderButtons();
    });

    // Adding a click event listener to all elements with a class of "animal"
    $(document).on("click", ".animal", displayAnimalInfo);
    // Calling the renderButtons to display the initial list of animals
    renderButtons();
});