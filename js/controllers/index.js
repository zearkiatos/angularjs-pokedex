const appControllers = angular.module('pokedex.controllers', []);
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
      const pokemon = data;
      pokemonService.getPokemonEvolution(pokemon.id).then(function(response) {
        $scope.pokemon = {
          ...pokemon,
          evolution: response
        };
      });
    });
  },
]);

appControllers.controller('PokemonTopController', ["$scope", "$rootScope", "$q", "pokemonService", function ($scope, $rootScope, $q, pokemonService) {
    $scope.pokemonsTopTen = [];

    $rootScope.title = 'Pokemons top 10';

    $scope.init = function() {

        getPokemonTopTen().then(data => {
            $scope.pokemonsTopTen = data
        });
    }

    function getPokemonTopTen () {
        const deferred = $q.defer();
        pokemonService.getPokemonsTopTen(10).then(function(data) {
            pokemonTopMapper(data).then(function(response) {
                deferred.resolve(response);
            });
        });
        return deferred.promise;
    }

    const pokemonTopMapper = async (pokemonTop) => {
        const pokemons = await pokemonService.getPokemons();
        const pokemonMapped = pokemonTop.map((pokemon) => {
            const pokemonFound = pokemons.find(p => p.id === pokemon.pokemonId);
            return {
                ...pokemon,
                name: pokemonFound.name
            }
        });
        return pokemonMapped;
    }

    $scope.init();
}]);
appControllers.controller('RatingController', ["$scope", "pokemonService", async function ($scope, pokemonService) {
    $scope.starts = [
        false,
        false,
        false,
        false,
        false
    ];
    $scope.blockStart = false;
    pokemonService.getRatings($scope.pokemonId).then(function(data) {
        let rating = 0;
        if(data) {  
            for(let item of data) {
                rating += item.rating;
            }
        }
        $scope.ratingQuantity = rating;
    });
    $scope.activeStart = function (start) {
        return $scope.start >= start;
    };

    $scope.showStart = function (start) {
        for(let startIndex in $scope.starts) {
            $scope.starts[startIndex] = ((parseInt(startIndex) + 1) <= start);
        }
    };

    $scope.vote = function (start) {
        // pokemonService.savePokemonVotes($scope.pokemonId);
        pokemonService.savePokemonRating($scope.pokemonId, start);
        $scope.blockStart = true;

    }

    $scope.init = async function() {
        const start = await pokemonService.getStart($scope.pokemonId);
        for(let startIndex in $scope.starts) {
            $scope.starts[startIndex] = ((parseInt(startIndex) + 1) <= start);
        }
    }

    await $scope.init();
}]);

appControllers.controller('TabsController', ["$scope", function ($scope) {
    $scope.tab = 1;

    $scope.selectTab = function (tab) {
        $scope.tab = tab;
    };

    $scope.isActive = function(tab) {
        return $scope.tab === tab
    }
}]);
