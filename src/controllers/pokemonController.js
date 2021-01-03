appControllers.controller("PokemonController", [
  "$scope",
  "$routeParams",
  "pokemonService",
  function ($scope, $routeParams, pokemonService) {
    $scope.pokemon = {};
    const name = $routeParams.name;

    pokemonService.getPokemon(name).then(function (data) {
      $scope.pokemon = data;
    });
  },
]);
