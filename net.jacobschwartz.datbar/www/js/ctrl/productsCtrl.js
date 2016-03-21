angular.module('app')
.controller('productsCtrl', ['$scope', '$rootScope', '$filter', function ($scope, $rootScope, $filter) {

    $rootScope.title = "Products";

    $scope.filterProducts = function(query){
        $scope.shownProducts = $filter('filter')($rootScope.products, query);
    };

    $scope.filterProducts("");

    $rootScope.onProductsReady = function () {
        $scope.filterProducts("");
    };

}]);