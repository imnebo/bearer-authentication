angular.module('BearerApp')
    .config(
        function ($stateProvider, $urlRouterProvider, $httpProvider) {
            $httpProvider.interceptors.push('httpInterceptor');

            $urlRouterProvider.otherwise("/");
            $stateProvider
                .state('login', {
                    url: "/login",
                    templateUrl: "../components/login/login.html",
                    controller: 'loginController'
                })
                .state('signup', {
                    url: "/signup",
                    templateUrl: "./components/signup/signup.html",
                    controller: "signupController"
                })
                .state('main', {
                    url: "/",
                    templateUrl: "./components/main/main.html",
                    controller: 'mainController'
                })
                .state('dashboard', {
                    url: "/dashboard",
                    loginCompulsory: true,
                    templateUrl: "./components/dashboard/dashboard.html",
                    controller: 'dashboardController'
                });
        });