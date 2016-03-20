angular.module('app')
.controller('productsCtrl', ['$scope', '$rootScope', '$http', function ($scope, $rootScope, $http) {

    $rootScope.title = "Products";

    //Adding fake products for testing
    $scope.beers = [{
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

    $scope.getBeers = function () {
        $http.get("http://fredagscafeen.dk/api/items/").success(function (data) {
            $scope.beers = data;
        }).error(function () {
            $rootScope.showError('The products seems to be lost somewhere in cyberspace :O');
        });
    };

    $scope.getBeers();

}]);