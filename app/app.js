var notifrApp = angular.module('notifrApp', ['ui.router'])
    .config(['$stateProvider', '$urlRouterProvider', '$httpProvider', function ($stateProvider, $urlRouterProvider, $httpProvider) {

        $httpProvider.defaults.withCredentials = true;
        $stateProvider

            .state('app', {
            url: '/app',
            templateUrl: 'views/app.html',
            controller: 'appController'
        })

        $urlRouterProvider.otherwise('/app');

    }]);

notifrApp.controller('appController', ['$scope', '$stateParams', '$state', function ($scope, $stateParams, $state) {
    console.log("Hello");


}]);

notifrApp.filter('split', function () {
    return function (input, splitChar, splitIndex) {
        // do some bounds checking here to ensure it has that index
        return input.split(splitChar)[splitIndex];
    }
});

notifrApp.filter('randomize', function () {
    return function (input, scope) {
        if (input != null && input != undefined && input > 1) {
            return 'avatar' + (Math.floor((Math.random() * input) + 1));
        }
    }
});