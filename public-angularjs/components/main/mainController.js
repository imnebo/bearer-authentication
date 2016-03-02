(function(){
angular.module('BearerApp')
    .controller('mainController',function($scope,$http, $q, $state){

        $scope.gotoSignup = function(){
            $state.go('signup')
        };
        $scope.gotoLogin = function(){
            $state.go('login')
        }
    })
})();