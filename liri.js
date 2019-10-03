const axios = require("axios");
var figlet = require("figlet");
var chalk = require("chalk");
var moment = require("moment");
var Spotify = require("node-spotify-api");
var fs = require("fs");

require("dotenv").config();
var keys = require("./key");

var command = process.argv[2];
var userInput = process.argv[3];

// --------------------------------------------------------------------------------------------------------------------------------------------------------------------
// create the command concert-this
// This will search the Bands in Town Artist Events API ("https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp")
//for an artist and render the following information about each event to the terminal:

//Name of the venue
//Venue location
//Date of the Event (use moment to format this as "MM/DD/YYYY")

// --------------------------------------------------------------------------------------------------------------------------------------------------------------------
if (command === "concert-this") {
  figlet(userInput, function(err, data) {
    if (err) {
      console.log("Something went wrong...");
      console.dir(err);
      return;
    }
    console.log(chalk.green(data));
  });

  var url = `https://rest.bandsintown.com/artists/${userInput}/events?app_id=${keys.BIT.API_KEY}`;
  axios.get(url).then(function(response) {
    var data = response.data;
    data.forEach(function(item) {
      console.log(
        chalk.blue("\n---------------------------------------------------\n")
      );
      console.log(chalk.green("Venue name: ", chalk.yellow(item.venue.name)));
      console.log(chalk.green("Venue place: ", chalk.yellow(item.venue.city)));
      console.log(
        chalk.green("Venue country: ", chalk.yellow(item.venue.country))
      );
      console.log(
        chalk.green(
          "Venue date: ",
          chalk.yellow(moment(item.datetime).format("MM/DD/YYYY"))
        )
      );
    });
  });
}

//create command spotify-this-song '<song name here>'

/*
This will show the following information about the song in your terminal/bash window
Artist(s)

The song's name

A preview link of the song from Spotify

The album that the song is from

If no song is provided then your program will default to "The Sign" by Ace of Base.

You will utilize the node-spotify-api package in order to retrieve song information from the Spotify API.

The Spotify API requires you sign up as a developer to generate the necessary credentials. You can follow these steps in order to generate a client id and client secret:

Step One: Visit https://developer.spotify.com/my-applications/#!/

Step Two: Either login to your existing Spotify account or create a new one (a free account is fine) and log in.

Step Three: Once logged in, navigate to https://developer.spotify.com/my-applications/#!/applications/create to register a new application to be used with the Spotify API. 
You can fill in whatever you'd like for these fields. When finished, click the "complete" button.

Step Four: On the next screen, scroll down to where you see your client id and client secret. 
Copy these values down somewhere, you'll need them to use the Spotify API and the node-spotify-api package.

*/

var spotify = new Spotify({
  id: keys.spotify.id,
  secret: keys.spotify.secret
});
var urlCheck;
if (userInput === undefined) {
  urlCheck = "Ace of Base The Sign";
} else {
  urlCheck = userInput;
}
if (command === "spotify-this-song") {
  spotify.search({ type: "track", query: urlCheck }, function(err, data) {
    if (err) {
      return console.log("Error occurred: " + err);
    }
    figlet(chalk.green(data.tracks.items[0].artists[0].name), function(
      err,
      data
    ) {
      if (err) {
        console.log("Something went wrong...");
        console.dir(err);
        return;
      }
      console.log(chalk.green(data));
    });
    //song name
    //album name
    //preview link
    //"The Sign" by Ace of Base
    // console.log(data);

    console.log(
      chalk.green("Song title: "),
      chalk.yellow(data.tracks.items[0].name)
    );
    console.log(
      chalk.green("Artist/Band name: "),
      chalk.yellow(data.tracks.items[0].artists[0].name)
    );
    console.log(
      chalk.green("Album name: "),
      chalk.yellow(data.tracks.items[0].album.name)
    );
    console.log(
      chalk.green("Preview URL: "),
      chalk.yellow(data.tracks.items[3].preview_url)
    );
  });
}
// --------------------------------------------------------------------------------------------------------------------------------------------------------------------

//create command movie-this '<movie name here>'

/*
This will output the following information to your terminal/bash window:
  * Title of the movie.
  * Year the movie came out.
  * IMDB Rating of the movie.
  * Rotten Tomatoes Rating of the movie.
  * Country where the movie was produced.
  * Language of the movie.
  * Plot of the movie.
  * Actors in the movie.


If the user doesn't type a movie in, the program will output data for the movie 'Mr. Nobody.'

If you haven't watched "Mr. Nobody," then you should: http://www.imdb.com/title/tt0485947/

It's on Netflix!

You'll use the axios package to retrieve data from the OMDB API. Like all of the in-class activities, the OMDB API requires an API key. You may use trilogy.

*/

if (command === "movie-this") {
  figlet(userInput, function(err, data) {
    if (err) {
      console.log("Something went wrong...");
      console.dir(err);
      return;
    }
    console.log(chalk.green(data));
  });
  var movieURL = `http://www.omdbapi.com/?apikey=${keys.OMDB.API_KEY}&t=${userInput}&limit=3&type=movie`;
  axios.get(movieURL).then(function(response) {
    console.log(
      chalk.green("Movie Title: "),
      chalk.yellow(response.data.Title)
    );
    console.log(chalk.green("Released: "), chalk.yellow(response.data.Year));
    console.log(
      chalk.green("IMDB rating: "),
      chalk.yellow(response.data.imdbRating)
    );
    console.log(
      chalk.green("Rotten Tomatoes rating: "),
      chalk.yellow(response.data.Ratings[1].Value)
    );
    console.log(
      chalk.green("Country of release: "),
      chalk.yellow(response.data.Country)
    );
    console.log(
      chalk.green("Language: "),
      chalk.yellow(response.data.Language)
    );
    console.log(chalk.green("Plot: "), chalk.yellow(response.data.Plot));
    console.log(chalk.green("Actors: "), chalk.yellow(response.data.Actors));
  });
}

//create command do-what-it-says

/*

Using the fs Node package, LIRI will take the text inside of random.txt and then use it to call one of LIRI's commands.

It should run spotify-this-song for "I Want it That Way," as follows the text in random.txt.

Edit the text in random.txt to test out the feature for movie-this and concert-this.

*/

if (command === "do-what-it-says") {
  fs.readFile("random.txt", "utf-8", function(err, data) {
    var index = data.indexOf(" ");
    console.log(data.substring(0, index));
    console.log(data.substring(index + 1));
  });
}
