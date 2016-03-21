angular.module('app')
.controller('checkoutCtrl', ['$scope', '$rootScope', '$http', '$mdDialog', '$mdMedia', function ($scope, $rootScope, $http, $mdDialog, $mdMedia) {
    $rootScope.bottomToolbarTemplate = 'views/toolbar_checkout.html';
    $rootScope.bottomToolbarScope = $scope;

    $scope.total = 0;
    $scope.inCart = [];

    $scope.showProductSearch = function (event) {
        $mdDialog.show({
            parent: angular.element(document.body),
            templateUrl: 'views/dialogs/product_search.html',
            targetEvent: event,
            clickOutsideToClose: true,
            scope: $scope,
            preserveScope: true,
            controller: productSearchDialogCtrl,
            fullscreen: $mdMedia('xs')
        });
    };

    $scope.scanBarcode = function () {
        cordova.plugins.barcodeScanner.scan(
            function (result) {
                var product = $scope.findProductFromBarcode(result.text);
                if(product){
                    $scope.addProduct(product);
                }else{
                    $rootScope.showError("No product with the scanned barcode was found, try searching for it instead.", "No product found!");
                }
                $scope.$apply();
            },
            function (error) {
                $rootScope.showError("Could not scan the barcode, please try again!");
            }
        );
    };

    $scope.findProductFromBarcode = function (barcode) {
        var product;

        for(var i = 0; i < $scope.products.length; i++){
            if($rootScope.products[i].barcode == barcode){
                product = $rootScope.products[i];
                break;
            }
        }

        return product;
    };

    $scope.addProduct = function (product) {

        if(!product){
            return;
        }

        if($scope.inCart.indexOf(product) != -1){
            var index = $scope.inCart.indexOf(product);
            $scope.inCart[index].amount += 1;
        }else{
            product.amount = 1;
            $scope.inCart.push(product);
        }
        $scope.calculateTotal();
    };

    $scope.calculateTotal = function () {
        var total = 0;

        for(var i = 0; i < $scope.inCart.length; i++){
            var item = $scope.inCart[i];
            total += (item.amount*item.priceInDKK);
        }

        $scope.total = total;
    };

    $scope.$on("$destroy", function(){
        $rootScope.bottomToolbarTemplate = "";
        $rootScope.bottomToolbarScope = null;
    });

}]);