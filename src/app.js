(function () {
  const app = angular.module("pokedex", [
    "ngRoute",
    "pokedex.controllers",
    "pokedex.filters",
    "pokedex.directives",
  ]);

  app.config([
    "$routeProvider",
    function ($routeProvider) {
      $routeProvider
        .when("/", {
          templateUrl: "views/pokedex.html",
          controller: "PokedexController"
        })
        .when("/pokemon/:id", {
          templateUrl: "views/pokemon.html",
          controller: "PokemonController",
        })
        .otherwise({
          redirectTo: "/",
        });
    },
  ]);
})();
