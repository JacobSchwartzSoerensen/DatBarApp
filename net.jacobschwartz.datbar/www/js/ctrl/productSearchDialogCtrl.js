function productSearchDialogCtrl($scope, $mdDialog, $filter, $http, $rootScope) {
    $scope.closeDialog = function() {
        $mdDialog.hide();
        $scope.addProduct.searchQuery = "";
    };

    $scope.querySearch = function (query) {
        var result = $filter('filter')($scope.products, query);
        return result;
    };

    if(!$scope.loadProducts){
        $scope.loadProducts = function () {
            $http.get("http://fredagscafeen.dk/api/items/").success(function (data) {
                $scope.products = data;
            }).error(function () {
                $rootScope.showError('Could not load the products! Maybe someone drank all the beers :O');
            });
        };
    }

    if(!$scope.products){
        $scope.loadProducts();
    }

    if(!$scope.addProduct){
        $scope.addProduct = function (product) {
            $rootScope.showError("You need to define your own $scope.addProduct(product) function!")
        };
    }

}