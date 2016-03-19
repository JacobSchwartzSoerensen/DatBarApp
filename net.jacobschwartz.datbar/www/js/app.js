angular.module('app', ['ngMaterial', 'ngRoute', ])
.config(function ($routeProvider, $locationProvider) {
    $routeProvider
        .when('/', {
            templateUrl: 'views/search.html',
            controller: 'searchCtrl'
        });
})
.run(function ($rootScope, $mdSidenav, $location) {

    $rootScope.toggleMenu = function () {
        $mdSidenav('left').toggle();
    };

    $rootScope.goTo = function(path){
        $location.path(path);
    };

});