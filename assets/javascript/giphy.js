///////////////////////////////////////////////////////////////////////////////// 
/////////////////////////////////////////////////////////////////////////////////
//// 																		 ////
////  	            Start of the GifsMe Javascript.         		         ////
////																		 ////
///////////////////////////////////////////////////////////////////////////////// 
/////////////////////////////////////////////////////////////////////////////////

// Contains the array of gifChoices to choose from.
var gifChoices = ["Money", "Clothes", "Happiness"];

// Beginning of the addGifButton function.
function addGifButton(){
	// Increments the value i.
	i++;
	// Creates a new variable that's equal to the value of the user input.
	// The user input will be trimmed, capitalize of the first letter of each word and the rest lowercased.
	var userButtonInput = $("#buttonContent").val().trim().toLowerCase().replace(/\b[a-z]/g, function(letter) {
		return letter.toUpperCase();
	})
	// Removes any selected options from the gifOptions ID.
	$("#gifOptions option").attr("selected", false);
	// Creates a new "<option>" which will contain a special value/ID.
	var gifOption = $("<option>")
		.attr("value", "gifOptionsToPickFrom")
		.attr("id", "option-" + i)
		// Embeds the user input into the gif option list of choices.
		.html(userButtonInput)
		// The newly added "<option>" will be shown selected on the page.
		.attr("selected", "selected");
	// Pushes the gifOption text into the gifChoices array provided on line 10.
	gifChoices.push(gifOption.text());
	// Appends the gifOption content into the id gifOptions.
	$("#gifOptions").append(gifOption);

	console.log("This is gifChoices array: " + gifChoices);
	console.log(userButtonInput + " was added to the list.");
} // End of the addGifButton function.

// Set the variable i equal to 3 due to the array on line 10 and the html page containing 3 initial values.
var i = 3;
// Beginning of the #addButton click function.
$("#addButton").on("click", function(){
	// Ensures that the user does not input a blank text or multiple spaces into the #buttonContent.
	if ($("#buttonContent").val().trim().toLowerCase() == ""){
		console.log("Not a valid text option.");
    }else{
    	// If the above if statement is not true.
    	// Check if the user input is equal to any of the choices within the gifChoices array on line 10.
    	// If the user input ='s, then console log that the user input was already added.
    	// Everything between the /'s will be a regular expression. \b Indicates the beginning to the end of the string. \d = Numeric
    	// At the end the g stands for global match. Which will focus the entire string.
    	if (gifChoices.indexOf($("#buttonContent").val().trim().toLowerCase().replace(/\b[a-z]/g, function(letter) {
    		return letter.toUpperCase();
    	})) != -1){
    		console.log($("#buttonContent").val().trim().toLowerCase().replace(/\b[a-z]/g, function(letter) {
    			return letter.toUpperCase();
    		}) + " was used already added.");
    	}else{
    		// Else call the function addGifButton located on line 13.
			addGifButton();
    	}
    }
}); // End of the #addButton click function.

// Beginning of the #buttonContent keypress function.
$("#buttonContent").keypress(function(event) {
	// Ensures that the user does not input a blank text or multiple spaces into the #buttonContent.
    if ($("#buttonContent").val().trim().toLowerCase() == ""){
 		console.log("Not a valid text option.");
 	// If the statement above is not true, checks if the user presses the enter key. Else do nothing.
    }else if (event.which == 13) {
    	// If the above if statement is not true and the user presses the enter key.
    	// Check if the user input is equal to any of the choices within the gifChoices array on line 10.
    	// If the user input ='s, then console log that the user input was already added.
    	if (gifChoices.indexOf($("#buttonContent").val().trim().toLowerCase().replace(/\b[a-z]/g, function(letter) {
    		return letter.toUpperCase();
    	})) != -1){
    		// Line 78/82 prevents the page from resetting and kepts the user input text as well.
	        event.preventDefault();
    	}else{
    		// If the above if statement on line 76 is not true.
    		// Call the addGifButton function located on line 13.
	        event.preventDefault();
	        addGifButton();
	    }
    }
}); // End of the #buttonContent keypress function.

// Set the variable searchButton equal to the id searchButton.
var searchButton = $("#searchButton");
// Beginning of the searchButton click function.
searchButton.on("click", function(){
	// Set the variable queryURL equal to the weblink below.
	// After the first + symbol, inputs the selected option text that's located witin the id gifOptions.
	// After the third + symbol, inputs the selected option value that's located within the id limit.
	var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + $("#gifOptions option:selected").text() + "&limit=" + $("#limit option:selected").val() + "&rating=pg-13&api_key=dc6zaTOxFJmzC";
	// Here we run our AJAX call to the Giphy API.
	$.ajax({
		url: queryURL,
		method: "GET"
	})
	// Stores all of the retrieved data inside of an object called "response".
	.done(function(response) {
		// Set the variable results equal to api object location response.data.
		var results = response.data;
		// This for loop will run until the var j not less than the results length.
		for (var j=0; j < results.length; j++){
			var gifRating = $("<p>")
				.addClass("ratingFont")
				.text("Rating: " + results[j].rating);
			// Set the variable gifDiv equal a new div and add a new class called gifContentBox.
			var gifDiv = $("<div>")
				.addClass("gifContentBox");
			// Set the variable gifImageContainer equal to a div and add a new class called imageContainer.
			var gifImageContainer = $("<div>")
				.addClass("imageContainer");
			// Set the variable gifImage equal a new img.			
			var gifImage = $("<img>")
				// Adds an attr src equal to the current results[j]. Which will provide a still gif.
				.attr("src", results[j].images.fixed_height_still.url)
				// Adds an data animate equal to the current results[j]. Which will provide a playing gif.
				.data("animate", results[j].images.fixed_height.url)
				// Adds an data still equal to the current results[j]. Which will provide a pause gif.
				.data("still", results[j].images.fixed_height_still.url)
				// Adds an attr data-state equal to still which will change to either animated or still upon click.
				.attr("data-state", "still");
			// Appends the gifImageContainer into gifDiv located on line 113.
			// Also appends both the gifImage and gifRating into the gifImageContainer div located on line 116.
			gifImageContainer.append(gifImage);
			gifImageContainer.append(gifRating);
			gifDiv.append(gifImageContainer);
			// Prepends the gifDiv to the id placeForClickedGifs located on the html page.
			$("#placeForClickedGifs").prepend(gifDiv);
		}

		// Beginning of the id placeForClickedGifs image click function.
		$("#placeForClickedGifs img").on("click", function(){
			// Set the variable state equal to the clicked image current data-state attr.
			var state = $(this).attr("data-state");
			// Checks if image data-state attr is equal the string "still".
			if(state == "still"){
    			// If the above if statement is true.
    			// Change the attr src to the data that within that contains the word animate.
				$(this).attr("src", $(this).data("animate"));
				// Then change the current data-state to animate to note that the gif is now playing.
				$(this).attr("data-state", "animate");
			}else{
    			// If the above if statement is not true.
    			// Change the attr src to the data that within that contains the word still.
				$(this).attr("src", $(this).data("still"));
				// Then change the current data-state to still to note that the gif is now paused.
				$(this).attr("data-state", "still");
			}
		}); // End of the id placeForClickedGifs image click function.
	});
}); // End of the searchButton click function.

// Set the variable resetButton equal to the id resetButton.
var resetButton = $("#resetButton");
// Beginning of the resetButton click function.
resetButton.on("click", function(){
	// Reset the value i = 0;
	i = 0;
	// Empties the id gifOptions which contains all the added gifs choices.
	$("#gifOptions").empty();
	// Empties the gifChoices array which contains all the current added letters.
	gifChoices = [];
	// Empties the id placeForClickedGifs which contains all the added gifs video.
	$("#placeForClickedGifs").empty();
});

