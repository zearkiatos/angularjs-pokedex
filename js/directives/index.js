const appDirectives = angular.module('pokedex.directives', []);
appDirectives.directive("error", function () {
    return {
        restrict: 'E',
        templateUrl: '../partials/error.html',
        scope: {
            message: '@message'
        },
    };
});
appDirectives.directive("pokemonCard", function () {
    return {
        restrict: 'E',
        templateUrl: '../partials/pokemon-card.html'
    };
});


appDirectives.directive("pokemonComments", ['pokemonService', function (pokemonService) {
    return {
        restrict: 'E',
        templateUrl: '../partials/pokemon-comments.html',
        scope: {
            name: '@name',
            id: '@id'
        },
        link: function (scope, element, attributes) {
            attributes.$observe('name', function (value) {
                if (value) {
                    scope.name = value;
                }
            });

            attributes.$observe('id', function (value) {
                if (value) {
                    scope.id = value;
                    pokemonService.getComments(value).then(function(data) {
                       scope.comments = data;
                   });
                }
            });
        },
        controller: function ($scope) {
             pokemonService.getComments($scope.id).then(function(data) {
                $scope.comments = data;
            });
            $scope.comment = {
                anonymous: false,
                user: "",
                comment: "",
                date: Date.now()
            };
            $scope.show = false;

            $scope.toggle = function () {
                $scope.show = !$scope.show;
            };

            $scope.anonymousChanged = function () {
                if ($scope.comment.anonymous) {
                    $scope.comment.user = "";
                }
            };

            $scope.addComment = function () {
                $scope.comment.date = Date.now();
                pokemonService.saveComment($scope.id, $scope.comment);
                pokemonService.getComments($scope.id).then(function(data) {
                    $scope.comments = data;
                });
                $scope.comment = {};
            };
        },
        controllerAs: 'cmtCtrl'
    };
}]);
appDirectives.directive("pokemonData", function () {
    return {
        restrict: 'E',
        templateUrl: '../partials/pokemon-data.html'
    }; 
});
appDirectives.directive("pokemonEvolution", function () {
    return {
        restrict: 'E',
        templateUrl: '../partials/pokemon-evolution.html'
    };
});
appDirectives.directive("pokemonImage", function () {
    return {
        restrict: 'E',
        templateUrl: '../partials/pokemon-image.html'
    };
});
appDirectives.directive("pokemonName", function () {
    return {
        restrict: 'E',
        templateUrl: '../partials/pokemon-name.html'
    };
});
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
appDirectives.directive("pokemonSearch", function () {
    return {
        restrict: 'E',
        templateUrl: '../partials/pokemon-search.html'
    };
});
appDirectives.directive("pokemonStats", function () {
    return {
        restrict: 'E',
        templateUrl: '../partials/pokemon-stats.html'
    };
});
appDirectives.directive("pokemonTitle", function () {
    return {
        restrict: 'E',
        templateUrl: '../partials/pokemon-title.html'
    };
});
appDirectives.directive("pokemonType", function () {
    return {
        restrict: 'E',
        templateUrl: '../partials/pokemon-type.html'
    };
});