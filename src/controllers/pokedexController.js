appControllers.controller("PokedexController", [
  "$scope",
  "$http",
  function ($scope, $http) {
    $scope.pokemons = [];

    $http({
      method: "GET",
      url: "/db/mocks/pokemons.json",
    }).then(function (response) {
      $scope.pokemons = response.data;
    });
  },
]);
