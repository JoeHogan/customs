// public/js/appRoutes.js
    angular.module('appRoutes', []).config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {

    $routeProvider

        // home page
        .when('/', {
            templateUrl: 'views/home.html',
            controller: 'MainController'
        })

        .when('/application', {
            templateUrl: 'views/application.html',
            controller: 'ApplicationController'
        });

    $locationProvider.html5Mode(true);

}]);