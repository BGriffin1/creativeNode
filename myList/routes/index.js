var express = require('express');
var router = express.Router();

/* GET home page. */
// router.get('/', function(req, res, next) {
//   res.render('index', { title: 'Express' });
// });

router.get('/', function(req, res) {
  res.sendFile('index.html', { root: 'public' });
});

var songs = [
  {
    name: 'Pikachu',
    artist: 'http://rs795.pbsrc.com/albums/yy232/PixKaruumi/Pokemon%20Pixels/Pikachu_Icon__free__by_Aminako.gif~c200'
  },
  {
    name: 'Charmander',
    artist: 'http://24.media.tumblr.com/tumblr_ma0tijLFPg1rfjowdo1_500.gif'

  }
  // ,
  // {
  //   name: 'Mew',
  //   avatarUrl: 'http://media3.giphy.com/media/J5JrPT8r1xGda/giphy.gif'
  // },
  // {
  //   name: 'Cubone',
  //   avatarUrl: 'http://rs1169.pbsrc.com/albums/r511/nthndo/tumblr_ljsx6dPMNm1qii50go1_400.gif~c200'
  // },
  // {
  //   name: 'Cleffa',
  //   avatarUrl: 'http://media1.giphy.com/media/pTh2K2xTJ1nag/giphy.gif'
  // },
  // {
  //   name: 'Gengar',
  //   avatarUrl: 'https://s-media-cache-ak0.pinimg.com/originals/7e/3b/67/7e3b67c53469cc4302035be70a7f2d60.gif'
  // }
];

router.get('/songs', function(req, res) {
  console.log("In Pokemon");
  res.send(songs);
});

router.post('/songs', function(req, res) {
    console.log("In Pokemon Post");
    console.log(req.body);
    songs.push(req.body);
    res.send(req.body);
    res.end('{"success" : "Updated Successfully", "status" : 200}');
});

router.post('/deleteSong', function(req, res) {
    console.log("In /deleteSong - POST");
    console.log("request to delete: ",req.body);
    for(var song in songs){
      console.log("song in list:(name)= ", songs[song]);
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
