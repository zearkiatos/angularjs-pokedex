appControllers.controller('PokemonTopController', ["$scope", "$rootScope", "$q", "pokemonService", function ($scope, $rootScope, $q, pokemonService) {
    $scope.pokemonsTopTen = [];

    $rootScope.title = 'Pokemons top 10';

    $scope.init = function() {
        pokemonService.getPokemonsTopTen(10).then(async function(data) {
            const pokemonsTopTen = await pokemonTopMapper(data);
            $scope.pokemonsTopTen = pokemonsTopTen;
        });
    }

    const pokemonTopMapper = async (pokemonTop) => {
        const pokemons = await pokemonService.getPokemons();
        const pokemonMapped = pokemonTop.map((pokemon) => {
            const name = pokemons.find(p => p.pokemonId === pokemonTop.pokemonId).name;
            return {
                pokemon,
                ...name
            }
        });
        return pokemonMapped;
    }

    $scope.init();
}]);