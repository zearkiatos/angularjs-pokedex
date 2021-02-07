(function () {
  const app = angular.module("pokedex", [
    "ngRoute",
    "angular-md5",
    "pokedex.controllers",
    "pokedex.filters",
    "pokedex.directives",
    "pokemon.services"
  ]);

  app.constant('config', {
    DEV: true,
    ENVIRONMENT: 'develop',
    POKEMON_BASE_API: 'https://node-pokemon-service-api.vercel.app/'
  });

  app.run(function ($rootScope) {
    $rootScope.title = 'Pokédex';
  })

  app.config([
    "$routeProvider",
    function ($routeProvider) {
      $routeProvider
        .when("/", {
          templateUrl: "views/pokedex.html",
          controller: "PokedexController"
        })
        .when("/pokemon-top", {
          templateUrl: "views/pokemon-top.html",
          controller: "PokemonTopController"
        })
        .when("/pokemon/:name", {
          templateUrl: "views/pokemon.html",
          controller: "PokemonController",
          controllerAs: "pkmCtrl"
        })
        .when("/:type", {
          templateUrl: "views/pokedex.html",
          controller: "PokedexController"
        })
        .otherwise({
          redirectTo: "/",
        });
    },
  ]);
})();
