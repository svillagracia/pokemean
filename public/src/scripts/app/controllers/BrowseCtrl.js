PokeMean.controller('BrowseCtrl', ['$scope', '$http', function ($scope, $http) {
  console.log('BrowseCtrl Loaded!');

  function getPokemon () {
    console.log('Getting Pokemon!')
    $scope.loading = true;
    $http.get('/api/pokemon/browse')
    .success(function (data) {
      $scope.loading = false;
      $scope.pokemon = data.results;
    })
    .error(function (err) {
      $scope.loading = false;
      console.log(err);
      $scope.pokemon = 'Uh oh! Something went wrong!';
    });
  };

  $scope.getDetails = function (pokemon) {
    console.log('Getting details!');
    var pokemonObject = { data: pokemon };
    $scope.loadingDetails = true;
    $http.get('/api/pokemon/details/' + pokemon, pokemonObject)
    .success(function (data) {
      $scope.loadingDetails = false;
      console.log(data);
      $scope.details = data;
    })
    .error(function (err) {
      $scope.loadingDetails = false;
      console.log(err);
      $scope.details = 'Uh oh! Something went wrong...';
    })
  }

  getPokemon();

}]);