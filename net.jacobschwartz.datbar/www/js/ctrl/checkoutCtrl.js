angular.module('app')
.controller('checkoutCtrl', ['$scope', '$rootScope', '$http', '$mdDialog', '$mdMedia', function ($scope, $rootScope, $http, $mdDialog, $mdMedia) {
    $rootScope.bottomToolbarTemplate = 'views/toolbar_checkout.html';
    $rootScope.bottomToolbarScope = $scope;
    
    $rootScope.topButtonsTemplate = 'views/top_buttons_checkout.html';
    $rootScope.topButtonsScope = $scope;

    $scope.total = 0;
    if(!$rootScope.inCart){
        $rootScope.inCart = [];
    }

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

        for(var i = 0; i < $rootScope.products.length; i++){
            if($rootScope.products[i].barcode == barcode){
                product = $rootScope.products[i];
                break;
            }
        }

        return product;
    };

    $scope.changeAmount = function (item, amount) {
        item.amount += amount;

        $scope.calculateTotal();
    };

    $scope.addProduct = function (product) {

        if(!product){
            return;
        }

        if($rootScope.inCart.indexOf(product) != -1){
            var index = $rootScope.inCart.indexOf(product);
            $rootScope.inCart[index].amount += 1;
        }else{
            product.amount = 1;
            $rootScope.inCart.push(product);
        }
        $scope.calculateTotal();
    };

    $scope.removeProduct = function (product) {
        var index = $rootScope.inCart.indexOf(product);
        $rootScope.inCart.splice(index, 1);

        $scope.calculateTotal();
    };

    $scope.clearCart = function () {
        $rootScope.inCart = [];
        $scope.calculateTotal();
    };

    $scope.calculateTotal = function () {
        var total = 0;

        for(var i = 0; i < $rootScope.inCart.length; i++){
            var item = $rootScope.inCart[i];
            total += (item.amount*item.priceInDKK);
        }

        $scope.total = total;
    };

    $scope.calculateTotal();

    $scope.$on("$destroy", function(){
        $rootScope.bottomToolbarTemplate = "";
        $rootScope.bottomToolbarScope = null;

        $rootScope.topButtonsTemplate = "";
        $rootScope.topButtonsScope = null;
    });

}]);