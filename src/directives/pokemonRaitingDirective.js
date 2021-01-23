appDirectives.directive("pokemonRaiting", ['pokemonService', function (pokemonService) {
    return {
        restrict: 'E',
        scope: {
            pokemonId: '@id'
        },
        templateUrl: '../partials/pokemon-raiting.html',
        link: function (scope, element, attributes) {
            attributes.$observe('pokemonId', function (value) {     
                if (value) {
                    scope.pokemonId = value;
                }
            });
        },
        controller: 'RaitingController',
    };
}]);