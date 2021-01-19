appControllers.controller('PokemonTopController', ["$scope", "pokemonService", function ($scope, pokemonService) {
    $scope.pokemonsTopTen = [];

    $scope.init = function() {
        $scope.pokemonsTopTen = pokemonService.getPokemonsTopTen()
    }

    $scope.init();
}]);