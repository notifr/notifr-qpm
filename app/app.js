var notifrApp = angular.module('notifrApp', ['ui.router'])
    .config(['$stateProvider', '$urlRouterProvider', '$httpProvider', function ($stateProvider, $urlRouterProvider, $httpProvider) {

        $httpProvider.defaults.withCredentials = true;
        $stateProvider

            .state('app', {
                url: '/app',
                templateUrl: 'views/app.html',
                controller: 'appController'
            })
            .state('qpm', {
                url: '/qpm',
                templateUrl: 'views/app-questions.html',
                controller: 'qpmController'
            })
        $urlRouterProvider.otherwise('/app');
    }]);

notifrApp.factory('sessions', function () {
    var qpm = {};
    qpm.sessions = [];

    qpm.addSessionInfo = function (sessions) {
        sessions.map(function (session) {
            qpm.sessions.push(session);
        });
    }
    qpm.getSessionInfo = function () {
        return qpm.sessions;
    }
    return qpm;

});
notifrApp.controller('appController', ['$scope', '$stateParams', '$state', 'sessions', function ($scope, $stateParams, $state, sessions) {
    $scope.qpmData = {};
    $scope.qpmData.sessions = [{}];

    $scope.addNewSession = function () {
        //        $scope.qpmData.sessions[index].name = name;
        //        $scope.qpmData.sessions[index].details = details;
        console.log($scope.qpmData.sessions);
        var newSession = $scope.qpmData.sessions.length + 1;
        $scope.qpmData.sessions.push({});
        console.log($scope.qpmData);
    }

    $scope.removeSession = function (index) {
        var lastSession = $scope.qpmData.sessions.length - 1;
        $scope.qpmData.sessions.splice(index, 1);
    };

    $scope.submitInfo = function () {
        sessions.addSessionInfo($scope.qpmData.sessions);
        $state.go('qpm');
        console.log($scope.qpmData);
    }
}]);

notifrApp.controller('qpmController', ['$scope', '$stateParams', '$state', 'sessions', function ($scope, $stateParams, $state, sessions) {

    $scope.qpmSessions = sessions.getSessionInfo()

}]);