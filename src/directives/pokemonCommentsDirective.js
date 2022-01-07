appDirectives.directive("pokemonComments", ['pokemonService', function (pokemonService) {
    return {
        restrict: 'E',
        templateUrl: '/partials/pokemon-comments.html',
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