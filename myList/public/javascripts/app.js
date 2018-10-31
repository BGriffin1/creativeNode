var app = window.angular.module('app', [])

app.factory('pokemonFetcher', pokemonFetcher)
app.controller('mainCtrl', mainCtrl)



function pokemonFetcher ($http) {

  var API_ROOT = 'pokemon'
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

function mainCtrl ($scope, pokemonFetcher, $http) {

  // var politics = "/politics";
  $scope.pokemon = []

  pokemonFetcher.get()
    .then(function (data) {
      $scope.pokemon = data
    })
    
    $scope.addPoki = function() {
      var formData = {name:$scope.Name,avatarUrl:$scope.Artist};
      console.log(formData);
      var pokiURL = 'pokemon';
      $http({
         url: pokiURL,
         method: "POST",
         data: formData
      }).success(function(data, status, headers, config) {
        console.log("Post worked");
        
      }).error(function(data, status, headers, config) {
        console.log("Post failed");
      })
    //   .then(function (data) {
    //   $scope.pokemon = data
    // });
      ;
    }
    
}
