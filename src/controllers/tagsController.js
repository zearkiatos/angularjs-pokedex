
appControllers.controller('TabsController', ["$scope", function ($scope) {
    $scope.tab = 1;

    $scope.selectTab = function (tab) {
        $scope.tab = tab;
    };

    $scope.isActive = function(tab) {
        return $scope.tab === tab
    }
}]);
