function productSearchDialogCtrl($scope, $mdDialog, $filter, $http, $rootScope) {
    $scope.closeDialog = function() {
        $mdDialog.hide();
        $scope.addProduct.searchQuery = "";
    };

    $scope.querySearch = function (query) {
        var result = $filter('filter')($scope.products, query);
        return result;
    };

    if(!$scope.addProduct){
        $scope.addProduct = function (product) {
            $rootScope.showError("You need to define your own $scope.addProduct(product) function!")
        };
    }

}