appControllers.controller('PokemonTopController', ["$scope", "$rootScope", "pokemonService", function ($scope, $rootScope, pokemonService) {
    $scope.pokemonsTopTen = [];

    $rootScope.title = 'Pokemons top 10';

    $scope.init = async function() {
        pokemonService.getPokemonsTopTen().then(function(data) {
            $scope.pokemonsTopTen = data;
        });
    }

    $scope.init();
}]);