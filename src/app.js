(function () {
  const app = angular.module("pokedex", [
    "ngRoute",
    "pokedex.controllers",
    "pokedex.filters",
    "pokedex.directives",
    "pokemon.services"
  ]);

  app.config([
    "$routeProvider",
    function ($routeProvider) {
      $routeProvider
        .when("/", {
          templateUrl: "views/pokedex.html",
          controller: "PokedexController"
        })
        .when("/pokemon/:name", {
          templateUrl: "views/pokemon.html",
          controller: "PokemonController",
          controllerAs: "pkmCtrl"
        })
        .when("/:type",{
            templateUrl: "views/pokedex.html",
            controller: "PokedexController"
        })
        .otherwise({
          redirectTo: "/",
        });
    },
  ]);
})();
