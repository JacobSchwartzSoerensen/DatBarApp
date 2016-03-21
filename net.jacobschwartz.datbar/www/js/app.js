angular.module('app', ['ngMaterial', 'ngRoute', ])
.config(function ($routeProvider, $locationProvider) {
    $routeProvider
        .when('/', {
            templateUrl: 'views/products.html',
            controller: 'productsCtrl'
        }).when('/about', {
            templateUrl: 'views/about.html'
        }).when('/checkout', {
            templateUrl: 'views/checkout.html',
            controller: 'checkoutCtrl'
        });
})
.run(function ($rootScope, $mdSidenav, $location, $mdDialog, $http) {

    $rootScope.title = "DatBar";

    $rootScope.menu = [
        {title: 'Products', link: '/', icon: 'img/list-of-three-elements-on-black-background.svg'},
        {title: 'Checkout', link: '/checkout', icon: 'img/shopping-basket-button.svg'},
        {title: 'About', link: '/about', icon: 'img/rounded-info-button.svg'}
    ];

    $rootScope.toggleMenu = function () {
        $mdSidenav('left').toggle();
    };

    $rootScope.goTo = function(path){
        $location.path(path);
    };

    $rootScope.showError = function (message, title, buttonText, event) {

        title = title ? title : 'Something went wrong ;(';
        message = message ? message : 'Seems like we\'ve got beer in the machinery, please try again later.';
        buttonText = buttonText ? buttonText : 'OK :(';

        $mdDialog.show(
            $mdDialog.alert()
                .parent(angular.element(document.body))
                .clickOutsideToClose(true)
                .title(title)
                .textContent(message)
                .ariaLabel('Error dialog')
                .ok(buttonText)
                .targetEvent(event)
        );
    };

    $rootScope.loadProducts = function () {
        $http.get("http://fredagscafeen.dk/api/items/").success(function (data) {
            $rootScope.products = data;
        }).error(function () {
            $rootScope.showError('Could not load the products! Maybe someone drank all the beers :O');
            //TODO Remove debug data before launch
            $rootScope.products = [{
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
        }).finally(function () {
            if($rootScope.onProductsReady){
                $rootScope.onProductsReady();
            }
        });
    };

    $rootScope.loadProducts();

});