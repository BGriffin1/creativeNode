var app = window.angular.module('app', [])

app.factory('songFetcher', songFetcher)
app.controller('mainCtrl', mainCtrl)

function songFetcher ($http) {

  var API_ROOT = '/songs'
  return {
    get: function () {
      return $http
        .get(API_ROOT)
        .then(function (resp) {
          return resp.data
        })
    }
  }

}

function mainCtrl ($scope, songFetcher, $http) {
  // var politics = "/politics";
  $scope.songs = []

  songFetcher.get()
    .then(function (data) {
      $scope.songs = data
      console.log("songs: ", data);
    })
    
    $scope.addSong = function() {
      var formData = {name:$scope.Name,artist:$scope.Artist};
      console.log(formData);
      var songURL = 'songs';
      $http({
         url: songURL,
         method: "POST",
         data: formData
      }).success(function(data, status, headers, config) {
        console.log("Post worked");
        $scope.songs.push(data);
        $scope.Name = "";
        $scope.Artist = "";
      }).error(function(data, status, headers, config) {
        console.log("Post failed");
      })
    //   .then(function (data) {
    //   $scope.pokemon = data
    // });
      ;
    }
    
    $scope.deleteSong = function(song) {
      var songData = {name:song.name,artist:song.artist};
      // var index = $scope.songs.indexOf(song);
      var songURL = 'deleteSong';
      $http({
         url: songURL,
         method: "POST",
         data: songData
      }).success(function(data, status, headers, config) {
        console.log("Post worked");
        $scope.songs.splice(Number(data), 1);
      }).error(function(data, status, headers, config) {
        console.log("Post failed");
      })
    };
    
}



// function pokemonFetcher ($http) {

//   var API_ROOT = 'pokemon'
//   return {
//     get: function () {
//       return $http
//         .get(API_ROOT)
//         .then(function (resp) {
//           return resp.data
//         })
//     }
//   }

// }

// function mainCtrl ($scope, pokemonFetcher, $http) {

//   // var politics = "/politics";
//   $scope.pokemon = []

//   pokemonFetcher.get()
//     .then(function (data) {
//       $scope.pokemon = data
//     })
    
//     $scope.addPoki = function() {
//       var formData = {name:$scope.Name,avatarUrl:$scope.Artist};
//       console.log(formData);
//       var pokiURL = 'pokemon';
//       $http({
//         url: pokiURL,
//         method: "POST",
//         data: formData
//       }).success(function(data, status, headers, config) {
//         console.log("Post worked");
        
//       }).error(function(data, status, headers, config) {
//         console.log("Post failed");
//       })
//     //   .then(function (data) {
//     //   $scope.pokemon = data
//     // });
//       ;
//     }
    
// }
