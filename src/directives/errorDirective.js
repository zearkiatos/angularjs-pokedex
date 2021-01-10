appDirectives.directive("error", function () {
    return {
        restrict: 'E',
        templateUrl: '../partials/error.html',
        scope: {
            message: '@message'
        },
    };
});