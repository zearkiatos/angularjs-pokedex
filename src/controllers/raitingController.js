appControllers.controller('RaitingController', ["$scope", "pokemonService", function ($scope, pokemonService) {
    $scope.starts = [
        false,
        false,
        false,
        false,
        false
    ];
    $scope.blockStart = false;
    $scope.raitingQuantity = pokemonService.getRaitings($scope.pokemonId);
    $scope.activeStart = function (start) {
        return $scope.start >= start;
    };

    $scope.showStart = function (start) {
        for(let startIndex in $scope.starts) {
            $scope.starts[startIndex] = ((parseInt(startIndex) + 1) <= start);
        }
    };

    $scope.vote = function (start) {
        pokemonService.savePokemonVotes($scope.pokemonId);
        pokemonService.savePokemonRaiting($scope.pokemonId, start);
        $scope.blockStart = true;

    }

    $scope.init = function() {
        const start = pokemonService.getStart($scope.pokemonId);
        for(let startIndex in $scope.starts) {
            $scope.starts[startIndex] = ((parseInt(startIndex) + 1) <= start);
        }
    }

    $scope.init();
}]);