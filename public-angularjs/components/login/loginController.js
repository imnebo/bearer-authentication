(function () {
    angular.module('BearerApp')
        .controller('loginController', LoginController);
    function LoginController($scope,$http,$state, $mdToast) {
        $scope.login = function () {
            $http.post('/signin', $scope.user)
                .then(function (responseData) {
                    if (responseData.status) {
                        localStorage.setItem('token', responseData.data.access_token);
                        $state.go('dashboard');
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
                                .position('right')
                                .hideDelay(3000)
                            );
                          })();
                          $state.reload();
                })

        }
    }
})();