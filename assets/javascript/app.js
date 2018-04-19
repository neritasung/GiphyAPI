$(document).ready(function(){



// Global Variables
var results= [];
var character = ["Mickey Mouse","Winne The Pooh", "Olaf", "Peter Pan", "Sleepy", "Nemo", "Dumbo", "Aladdin","Mulan","Simba","Ariel", "Rapunzel","Merida", "Maleficent","Buzz Lightyear","Mr. Potato Head","Pocahontas","Genie"];

// clear out div
$(".button").empty();
// console.log("abc");

// // Set for loop to loop through the characters in the array of results
for (var i=0; i<character.length; i++){

// create buttons for div
var btn = $("<button>");
btn.addClass("buttons");
btn.attr("data-name", character[i]);
btn.text(character[i]);
$("#character-btn").append(btn);
}

// on click function on the Submit button
$("body").on("click","#submit-button", function(event){
  event.preventDefault();
  
// // add the search results (.val) as a button and add it to the array
var userSearch = $("#search").val().trim();

// Remove the search input
$("#search").val("");

// push the serach into the array
character.push(userSearch);

// clear out the div
$(".button").empty();
// console.log("abc");

// Set for loop to loop through the characters in the array of results
for (var i=0; i<character.length; i++){

// create buttons for div
var btn = $("<button>");
btn.addClass("buttons");
btn.attr("data-name",character[i]);
btn.text(character[i]);
$("#character-btn").append(btn);

}

});

// on click function for the buttons
$(document).on("click", ".buttons", function () {

// clear results on div
$("#gifs").empty();

// link character to data-name
character = $(this).attr("data-name");

// Attach API key
var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + character + "&api_key=FCl6TD0PCJrytH5mV4CQqIJG0gvlPpyi&limit=10";

// Use Ajax to call the Query URL
$.ajax({
    url: queryURL,
    method: "GET"
  })
  .then(function(response) {
    console.log(response);   
    var results = response.data;
    for (var i=0; i<results.length; i++){
     console.log(results[i]);  
// append ratings to the gif
    var p = $("<p>").text("Rating: "+ results[i].rating);

    
// Setting the src attribute of the image to a property pulled off the result item
  var characterImage = $("<img>");
  characterImage.attr("src", results[i].images.downsized_still.url);
  characterImage.attr("data-still", results[i].images.downsized_still.url);
  characterImage.attr("data-animate", results[i].images.downsized.url);
  characterImage.addClass("gif_img")
  characterImage.attr("data-state", "still");
    
// append the gifs and ratings to div
  $("#gifs").append(p).append(characterImage);
};    
});
// // on click function on the GIF (all of them should be still) so the Gif's move
$(document).on("click",".gif_img",function(){
  
var state = $(this).attr("data-state");

if (state === "still") {
  $(this).attr("src", $(this).attr("data-animate"));
  $(this).attr("data-state", "animate");
} 
else {
  $(this).attr("src", $(this).attr("data-still"));
  $(this).attr("data-state", "still");
}
});
});
});