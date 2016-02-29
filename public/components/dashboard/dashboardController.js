(function () {
    angular.module('BearerApp')
        .controller('dashboardController', function ($scope, $http, $q, $state, productService, $mdSidenav, $timeout, $mdToast) {
            $scope.products = [];
            $scope.newProduct = {
                productName: '',
                productPrice: '',
                productQuantity: ''
            };
            $timeout(function () {
                productService.getProducts()
                    .then(function (responseData) {
                        if (responseData.status) {
                            $scope.products = responseData.data;
                        }
                    }, function (responseError) {
                        console.log('responseError: ', responseError);
                    })
            }, 0);

            $scope.gotoSignup = function () {
                $state.go('signup')
            };
            $scope.gotoLogin = function () {
                $state.go('login')
            };
            $scope.addProduct = function () {
                $scope.isOpenRight();
            };
            $scope.logout = function(){
                localStorage.removeItem('token');
                $state.go('login')
            };

            //************ Edit Product ************
            $scope.editProduct = function (product) {
                $scope.product = product;
                $mdSidenav('edit-right').toggle();
            };
            $scope.update = function (product) {
                $http.post('/product/updateproduct', product)
                    .then(function (data) {
                        if(data.status) {
                            $mdSidenav('edit-right').close();
                        } else{
                            (function() {
                                $mdToast.show(
                                    $mdToast.simple()
                                        .textContent(data.statusText)
                                        .position('right')
                                        .hideDelay(3000)
                                );
                            })();
                        }
                    },function (responseError) {
                    (function() {
                        $mdToast.show(
                            $mdToast.simple()
                                .textContent(responseError.statusText)

                                .hideDelay(3000)
                        );
                    })();
                    $state.reload();
                    console.log('responseError: ', responseError);
                });
            };

            //************/ Add Product ************

            $scope.addProduct = function () {
                $mdSidenav('add-right').toggle();
            };
            $scope.save = function () {
                $http.post('/product/add', $scope.newProduct)
                    .then(function (data) {
                        if(data.status) {
                            productService.getProducts()
                                .then(function (responseData) {
                                    if (responseData.status) {
                                        $scope.products = responseData.data;
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
                                    console.log('responseError: ', responseError);
                                });
                            $mdSidenav('add-right').close();
                        } else{
                            (function() {
                                $mdToast.show(
                                    $mdToast.simple()
                                        .textContent(data.statusText)
                                        .position('right')
                                        .hideDelay(3000)
                                );
                            })();
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
                        console.log('responseError: ', responseError);
                    })
            };

        })
})();