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
            const name = pokemons.find(p => p.pokemonId === pokemonTop.pokemonId).name;
            return {
                ...pokemon,
                name
            }
        });
        return pokemonMapped;
    }

    $scope.init();
}]);