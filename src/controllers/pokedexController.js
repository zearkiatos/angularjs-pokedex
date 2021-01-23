appControllers.controller("PokedexController", [
  "$scope",
  "$routeParams",
  "$rootScope",
  "$window",
  "pokemonService",
  function ($scope, $routeParams, $rootScope, $window, pokemonService) {
    const type = $routeParams.type;
    $scope.search = ''
    $rootScope.title = 'Pokédex';
    $scope.pokemons = [];
    if (type) {
      pokemonService.getPokemonsByType(type).then(function (data) {
        $scope.pokemons = data;
      });
    } else {
      pokemonService.getPokemons().then(function (data) {
        $scope.pokemons = data;
      });
    }

    $scope.navigateToPokemonTop = function() {
      $window.location.href="#!/pokemon-top";
    }
  },
]);
