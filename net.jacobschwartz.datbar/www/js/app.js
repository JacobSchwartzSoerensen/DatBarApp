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
.run(function ($rootScope, $mdSidenav, $location, $mdDialog) {

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
    }

});