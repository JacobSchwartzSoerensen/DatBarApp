angular.module('app')
.controller('checkoutCtrl', ['$scope', '$rootScope', '$http', function ($scope, $rootScope, $http) {
    $scope.test = [];
    $rootScope.bottomToolbarTemplate = 'views/toolbar_checkout.html';
    $rootScope.bottomToolbarScope = $scope;

    $scope.total = 0;
    $scope.speeddial = {};
    $scope.speeddial.open = false;

    $scope.showProductSearch = function ($event) {
        $mdDialog.show(

        );
    };

    $scope.$on("$destroy", function(){
        $rootScope.bottomToolbarTemplate = "";
        $rootScope.bottomToolbarController = null;
    });

}]);