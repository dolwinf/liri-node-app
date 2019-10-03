<h1>LIRI Node App</h1>

<hr>

Author: Dolwin Fernandes

<hr>

<h3> App demo </h3>

![alt text](https://github.com/mjbenefiel/liri-node-app/blob/master/gif/liriappdemo.gif "Liri Node App")

<hr>

<h2> Project overview</h2>
LIRI is a command line Node app that takes in user input and returns data from the following APIs: Bandsintown, Spotify and OMDb.
<hr>

<h2> How it works </h2>
On the command line, type:

- `node liri.js concert-this "artist/band name here"` to return concert information from Bandsintown.

- `node liri.js spotify-this-song "song name here"` to return song information from Spotify.

- `node liri.js movie-this "movie name here"` to return movie information from OMDb.

- `node liri.js do-what-it-says` to return information stored in random.txt

<hr>

<h2>NPM packages used</h2>

[Node.js](https://nodejs.org/en/)

[chalk](https://www.npmjs.com/package/chalk)

[figlet](https://www.npmjs.com/package/figlet)

[Bandsintown API](http://www.artists.bandsintown.com/bandsintown-api)

[OMDb API](http://www.omdbapi.com/)

[Spotify API](https://developer.spotify.com/documentation/web-api/)

<hr></hr>

<h4>Below is a thorough, but not comprehensive, step-by-step process of how I got the app running in terms of code</h4>

- Navigate to root of project. Initialize package.json by running `npm init -y`

- Creation of .gitignore file

- Creation of keys.js

  - Spotify keys for export

- Creation of .env file to store Spotify API keys

- Creation of random.txt with default result for do-what-it-says command
