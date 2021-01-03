appControllers.controller("PokedexController", [
  "$scope",
  "$routeParams",
  "pokemonService",
  function ($scope, $routeParams, pokemonService) {
    const type = $routeParams.type;
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
  },
]);
