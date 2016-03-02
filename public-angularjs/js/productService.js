(function () {
    angular.module('BearerApp')
        .service('productService', function ($http, $q) {
            var self = this;

            self.getProducts = function () {
                var deferred = $q.defer();
                $http.get('/product/get')
                    .success(function (data) {
                        deferred.resolve(data);
                    })
                    .error(function (data) {
                        deferred.reject(data);
                    });
                return deferred.promise;
            };
        })
})()