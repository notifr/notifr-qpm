var notifrApp = angular.module('notifrApp', ['ui.router', 'monospaced.elastic'])
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
    qpm.questions = [];
    qpm.addSessionInfo = function (sessions, questions) {
        sessions.map(function (session) {
            qpm.sessions.push(session);
        });
        questions.map(function (question) {
            qpm.questions.push(question);
        });
    }
    qpm.getSessionInfo = function () {
        return qpm.sessions;
    }
    qpm.getQuestionInfo = function () {
        return qpm.questions;
    }
    return qpm;

});
notifrApp.controller('appController', ['$scope', '$stateParams', '$state', 'sessions', function ($scope, $stateParams, $state, sessions) {
    $scope.slider = true;
    $scope.comment = false;
    $scope.qpmData = {};
    $scope.qpmData.sessions = [{}];
    $scope.qpmData.questions = [{}];
    $scope.sessions = {};
    $scope.questions = {};
    $scope.addNewSession = function () {
        var newSession = $scope.sessions.length + 1;
        $scope.qpmData.sessions.push({});
        console.log($scope.qpmData);
    }
    $scope.removeSession = function (index) {
        var lastSession = $scope.sessions.length - 1;
        $scope.qpmData.sessions.splice(index, 1);
    };
    $scope.removeQuestion = function (index) {
        var lastSession = $scope.questions.length - 1;
        $scope.qpmData.questions.splice(index, 1);
    };
    $scope.addNewQuestion = function () {
        var newQuestion = $scope.questions.length + 1;
        $scope.qpmData.questions.push({});
    }
    $scope.addType = function (type, index) {
        if (type == 'smile')
            $scope.qpmData.questions[index].type = 'text';
        else if (type == 'text')
            $scope.qpmData.questions[index].type = 'smile';
    }

    $scope.submitInfo = function () {
        sessions.addSessionInfo($scope.qpmData.sessions, $scope.qpmData.questions);
        $state.go('qpm');
    }
}]);

notifrApp.controller('qpmController', ['$scope', '$stateParams', '$state', 'sessions', function ($scope, $stateParams, $state, sessions) {

    $scope.qpmSessions = sessions.getSessionInfo()
    $scope.qpmQuestions = sessions.getQuestionInfo();

}]);

notifrApp.directive('bullet', function () {
    return {
        require: 'ngModel',
        link: function (scope, element, attrs, modelCtrl) {
            var capitalize = function (inputValue) {
                if (inputValue == undefined) inputValue = '';
                var capitalized = inputValue;
                var res = capitalized.charAt(0);

//                if (res !== "•") {
//                    capitalized = "• " + capitalized;
//                    modelCtrl.$setViewValue(capitalized);
//                    modelCtrl.$render();
                
////                } if (res !== '\n' && capitalized !== inputValue) {
//////                    capitalized = "\n sam " + capitalized;
////                    capitalized.replace(/[\r\n]+/g, '\n •');
////                    modelCtrl.$setViewValue(capitalized);
////                    modelCtrl.$render();
//                }else {
//                    return capitalized;
//                }
//                
                
                
                element.bind("mousedown keydown keypress", function (event) {
                    if (event.which === 13) {
                        capitalized += "\n • ";
                        modelCtrl.$setViewValue(capitalized);
                        modelCtrl.$render();

                        event.preventDefault();
                    }
//                    if (event.which === 1) {
//                            capitalized += "• ";
//                            modelCtrl.$setViewValue(capitalized);
//                            modelCtrl.$render();
//
//                        event.preventDefault();
//                    }
//                    if(res !== "•") {
//                        capitalized += "• ";
//                        modelCtrl.$setViewValue(capitalized);
//                        modelCtrl.$render();
//                    }
                });
//                var keycode = (event.keyCode ? event.keyCode : event.which);
//                if(keycode == '13'){
//                    document.getElementById('todolist').value +='• ';
//                }
//                var txtval = document.getElementById('todolist').value;
//                if(txtval.substr(txtval.length - 1) == '\n'){
//                    document.getElementById('todolist').value = txtval.substring(0,txtval.length - 1);
//                
                
                
            }
            modelCtrl.$parsers.push(capitalize);
            capitalize(scope[attrs.ngModel]); // capitalize initial value
        }
    };
});