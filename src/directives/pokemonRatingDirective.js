appDirectives.directive("pokemonRating", ['pokemonService', function (pokemonService) {
    return {
        restrict: 'E',
        scope: {
            pokemonId: '@id'
        },
        templateUrl: '../partials/pokemon-rating.html',
        link: function (scope, element, attributes) {
            attributes.$observe('pokemonId', function (value) {     
                if (value) {
                    scope.pokemonId = value;
                }
            });
        },
        controller: 'RatingController',
    };
}]);