angular.module('app')
.controller('searchCtrl', ['$scope', '$rootScope', '$http', function ($scope, $rootScope, $http) {

    $rootScope.title = "Search for products";

    $scope.getBeers = function () {
        $http.get("http://fredagscafeen.dk/api/items/").success(function (data) {
            $scope.beers = data;
        });
    };

    $scope.getBeers();

}]);