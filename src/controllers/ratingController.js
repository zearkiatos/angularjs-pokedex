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