appControllers.controller("PokemonController", [
  "$scope",
  "$routeParams",
  "$rootScope",
  "pokemonService",
  function ($scope, $routeParams, $rootScope, pokemonService) {
    $scope.pokemon = {};
    const name = $routeParams.name;
    $rootScope.title = `Pokédex | ${name}`;

    pokemonService.getPokemon(name).then(function (data) {
      $scope.pokemon = data;
    });
  },
]);
