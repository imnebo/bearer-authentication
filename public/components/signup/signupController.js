(function () {
    angular.module('BearerApp')
        .controller('signupController', SignupController);
    function SignupController($scope, $http, $q, $state, $mdToast) {

        $scope.userSignup = {
            userFirstName: '',
            userLastName: '',
            userEmail: '',
            userPassword: ''
        };
        $scope.signup = function () {
            $http.post('/signup', $scope.userSignup)
                .then(function (responseData) {
                    if (responseData.data.status) {
                        $state.go('login');
                    } else {
                        (function() {
                            $mdToast.show(
                              $mdToast.simple()
                                .textContent(responseData.data.message)
                                .position('right')
                                .hideDelay(3000)
                            );
                          })();
                          $state.reload();
                    }
                }, function (responseError) {
                    (function() {
                            $mdToast.show(
                              $mdToast.simple()
                                .textContent(responseError.statusText)
                                
                                .hideDelay(3000)
                            );
                          })();
                          $state.reload();
                })
        };
        $scope.gotoLogin = function(){
            $state.go('login');
        }
    }
})();