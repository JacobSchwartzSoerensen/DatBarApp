angular.module('app')
.controller('checkoutCtrl', ['$scope', '$rootScope', '$http', '$mdDialog', '$mdMedia', function ($scope, $rootScope, $http, $mdDialog, $mdMedia) {
    $rootScope.bottomToolbarTemplate = 'views/toolbar_checkout.html';
    $rootScope.bottomToolbarScope = $scope;

    $scope.total = 0;
    $scope.inCart = [];
    $scope.products = [{
        "id": 7,
        "brewery": {
            "id": 1,
            "name": "Aarhus Bryghus",
            "description": "",
            "website": ""
        },
        "type": null,
        "created": "2015-12-08T08:09:08Z",
        "name": "Drageblod",
        "description": "",
        "country": "",
        "priceInDKK": 35.0,
        "abv": null,
        "container": "BOTTLE",
        "volumeInCentiliters": null,
        "inStock": false,
        "imageUrl": "",
        "barcode": "5704004000626",
        "lastModified": "2015-12-09T21:17:48.447034Z",
        "link": ""
    },
        {
            "id": 8,
            "brewery": {
                "id": 1,
                "name": "Aarhus Bryghus",
                "description": "",
                "website": ""
            },
            "type": null,
            "created": "2015-12-08T08:09:08Z",
            "name": "Extra Pilsner",
            "description": "",
            "country": "",
            "priceInDKK": 12.0,
            "abv": null,
            "container": "DRAFT",
            "volumeInCentiliters": null,
            "inStock": false,
            "imageUrl": "",
            "barcode": "EXTRAPILSNER",
            "lastModified": "2015-12-09T21:17:58.449846Z",
            "link": ""
        },
        {
            "id": 9,
            "brewery": {
                "id": 1,
                "name": "Aarhus Bryghus",
                "description": "",
                "website": ""
            },
            "type": null,
            "created": "2015-12-08T08:09:08Z",
            "name": "Extra Pilsner",
            "description": "",
            "country": "",
            "priceInDKK": 25.0,
            "abv": null,
            "container": "BOTTLE",
            "volumeInCentiliters": null,
            "inStock": false,
            "imageUrl": "",
            "barcode": "5704004000411",
            "lastModified": "2015-12-09T21:18:07.459982Z",
            "link": ""
        }];

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

    $scope.loadProducts = function () {
        $http.get("http://fredagscafeen.dk/api/items/").success(function (data) {
            $scope.products = data;
        }).error(function () {
            $rootScope.showError('Could not load the products! Maybe someone drank all the beers :O');
        });
    };

    $scope.$on("$destroy", function(){
        $rootScope.bottomToolbarTemplate = "";
        $rootScope.bottomToolbarScope = null;
    });

    $scope.loadProducts();

}]);