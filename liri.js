//
//Required moduals
//

var keys = require("./keys.js");
var request = require("request");
var twitter = require("twitter");
var spotify = require("node-spotify-api");
var fs = require("fs");
 
//
//Twitter Function
//

if (process.argv[2] === "my-tweets"){

	//console.log("Here are your tweets!!!");

	var client = new twitter(keys.twitterKeys)

	var params = {
		screen_name: 'sjm27527',
		count: 20
	};

	client.get('statuses/user_timeline', params, function(error, tweets, response){
	if (error){
		console.log("Twitter is problematic, please try again later");
	}
	else {
		console.log("");
		console.log("My last 20 (or so) tweets");
		console.log("--------------------------");
		tweets.forEach(function(individualTweet){
			console.log("Time Posted: " + individualTweet.created_at);
			console.log("Tweet: " + individualTweet.text);
			console.log("--------------------------");
		})
	}		
	})
}

//
//Spotify Function
//

if (process.argv[2] === "spotify-this-song"){

var newSpotify = new spotify({
	id: "0888876dd4e746b69a275d3c58cd021c",
	secret: "4afc6e98cbf6417996aa4beb038144c3"
});

var nodeArgs = process.argv;
	var song = "";

	for (var i = 3; i < nodeArgs.length; i++){
		if (i > 3 && i < nodeArgs.length){
			song = song + "+" + nodeArgs[i];
		}
		else {
			song += nodeArgs[i];
		}
	}

	if (song.length < 1){
		song = "The Sign Ace of Base";
	}

function spotifyIt(song) {
  newSpotify.search({ type: 'track', query: song }, function(err, data) {
    if ( err ) {
        console.log('Error occurred: ' + err);
        return;  //from spotify npm docs
    }
    else{
    var songInfo = data.tracks.items[0];
    var songResult = console.log(songInfo.artists[0].name)
                     console.log(songInfo.name)
                     console.log(songInfo.preview_url)
                     console.log(songInfo.album.name)
    };
  });
}  
spotifyIt(song);
}

//
//OMDB function
//

if (process.argv[2] === "movie-this"){
	
	var nodeArgs = process.argv;
	var movieName = "";

	for (var i = 3; i < nodeArgs.length; i++){
		if (i > 3 && i < nodeArgs.length){
			movieName = movieName + "+" + nodeArgs[i];
		}
		else {
			movieName += nodeArgs[i];
		}
	}

	if (movieName.length < 1){
		movieName = "Mr. Nobody";
	}

	var queryURL = "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&apikey=40e9cece";

	request(queryURL, function(error, response, body){

		if (!error && response.statusCode === 200){
			console.log("Title: " + JSON.parse(body).Title);
			console.log("Release Year: " + JSON.parse(body).Year);
			console.log("IMDB Rating: " + JSON.parse(body).imdbRating);
			console.log("Rotten Tomatoes Rating: " + JSON.parse(body).Ratings[1].Value);
			console.log("Produced in: " + JSON.parse(body).Country);
			console.log("Language: " + JSON.parse(body).Language);
			console.log("Plot: " + JSON.parse(body).Plot);
			console.log("Actors: " + JSON.parse(body).Actors);
		}
		else{
			console.log("WTF???")
		}
	});
};

//
//Do what it says function
//

if (process.argv[2] === "do-what-it-says"){

	var newSpotify = new spotify({
	id: "0888876dd4e746b69a275d3c58cd021c",
	secret: "4afc6e98cbf6417996aa4beb038144c3"
	});

	fs.readFile("random.txt", "utf8", function(error, data) {

	  // If the code experiences any errors it will log the error to the console.
	  if (error) {
	    return console.log(error);
	}

  // We will then print the contents of data
  console.log(data);

  // Then split it by commas (to make it more readable)
  var dataArr = data.split(",");

  // We will then re-display the content as an array for later use.
  //console.log(dataArr);

  var iWant = dataArr[1]

function spotifyIt(song) {
  newSpotify.search({ type: 'track', query: iWant }, function(err, data) {
    if ( err ) {
        console.log('Error occurred: ' + err);
        return;  //from spotify npm docs
    }
    else{
    var songInfo = data.tracks.items[0];
    var songResult = console.log(songInfo.artists[0].name)
                     console.log(songInfo.name)
                     console.log(songInfo.preview_url)
                     console.log(songInfo.album.name)
    };
  });
}  
spotifyIt(song);


});




}