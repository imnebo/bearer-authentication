(function () {
    angular.module("BearerApp", ['ngMaterial', 'ngMessages', 'ui.router'])
        .run(function ($rootScope, $state) {
            $rootScope.$on('$stateChangeStart', function (event, toState, tdata, from, fdata) {
                var token = localStorage.token;

                if (toState.loginCompulsory && !token) {
                    event.preventDefault();
                    $state.go('login');
                }
            });
        })

        .factory('httpInterceptor', function () {
            return {
                request: function (config) {
                    var token = localStorage.getItem('token');
                    if (token) {
                        config.headers['Authorization'] = 'Bearer ' + token;
                    }
                    //config.timeout = 10000;
                    return config;
                },
                response: function (config) {
                    return config;
                }
            }
        })

})();
