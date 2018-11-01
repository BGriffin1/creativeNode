var express = require('express');
var router = express.Router();
const RapidAPI = require('rapidapi-connect');

/* GET home page. */
// router.get('/', function(req, res, next) {
//   res.render('index', { title: 'Express' });
// });

router.get('/', function(req, res) {
  res.sendFile('index.html', { root: 'public' });
});

var songs = [
  {
    name: 'Song1',
    artist: 'Artist1',
    albumUrl: 'default-album-artwork.png'
  },
  {
    name: 'Song2',
    artist: 'Artist2',
    albumUrl: 'default-album-artwork.png'
  }
];

router.get('/songs', function(req, res) {
  console.log("In /songs");
  res.send(songs);
});

router.post('/songs', function(req, res) {
    console.log("In /songs POST");
    console.log(req.body);


    const rapid = new RapidAPI("default-application_5bda4c95e4b0d1763ed6b220", "e129569c-d3a3-4ced-ad2b-fa832950d1dc");
    rapid.call('LastFm', 'getTrackInfo', { 
    	'track': req.body.name,
    	'artist': req.body.artist,
    	'apiKey': '7380cca68e8e7f63bddc4f3fe7ecc72a'
    
    }).on('success', (payload)=>{
    	 /*YOUR CODE GOES HERE*/
    	 console.log("payload: ", payload);
	     var newSong = {"name": payload.track.name, "artist": payload.track.artist.name, "albumUrl": payload.track.album.image[2]['#text']};
	     songs.push(newSong);
       res.send(newSong);
       res.end('{"success" : "Updated Successfully", "status" : 200}');
       console.log("songs: ",songs);
    }).on('error', (payload)=>{
    	 /*YOUR CODE GOES HERE*/ 
    	 console.log("error!: ", payload);
          	 
    });

    
    
    // songs.push(req.body);
    // res.send(req.body);
    // res.end('{"success" : "Updated Successfully", "status" : 200}');
});

router.post('/deleteSong', function(req, res) {
    console.log("In /deleteSong POST");
    // console.log("request to delete: ",req.body);
    for(var song in songs){
      // console.log("song in list:(name)= ", songs[song]);
      if(songs[song].name == req.body.name){  //&& song.artist == req.body.artist){
        // index = songs.indexOf(song);
        songs.splice(song, 1);
        res.send(song.toString());
        res.end('{"success" : "Updated Successfully", "status" : 200}');
      }
    }
    res.end('{"success" : "Something\'s wrong..", "status" : 400}');
});


// var politics = "https://zlzlap7j50.execute-api.us-east-1.amazonaws.com/prod";
// router.get('/politics', function(req,res) {
//   console.log("In politics");
//   request(politics).pipe(res);
// });

module.exports = router;
