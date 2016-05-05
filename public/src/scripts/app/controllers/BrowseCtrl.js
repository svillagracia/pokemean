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

  function getDetails (pokemon) {
    switch ($scope.selected) {
      case (pokemon):
        $scope.selected = undefined
        break;
      default:
        console.log('Getting details!');
        var pokemonObject = { pokemon: pokemon };
        $scope.loadingDetails = pokemon;
        $http.get('/api/pokemon/details/' + pokemon, pokemonObject)
        .success(function (data) {
          $scope.selected = data.name
          $scope.loadingDetails = null;
          console.log(data);
          $scope.details = data;
          $scope.type = data.types[0].type.name
        })
        .error(function (err) {
          $scope.loadingDetails = null;
          console.log(err);
          $scope.details = 'Uh oh! Something went wrong...';
        })
    }
  }

  function evoChain (pokemon) {
    $http.get('/api/pokemon/evolution/' + pokemon, { pokemon: pokemon })
    .success(function (data) {
      console.log(data)
    })
    .error(function (err) {
      console.log(err)
    })
  }

  $scope.getDetails = getDetails
  $scope.evoChain = evoChain

  getPokemon();

}]);