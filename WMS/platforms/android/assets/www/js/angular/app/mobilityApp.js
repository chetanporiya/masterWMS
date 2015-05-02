var mobilityApp = angular.module('workerManagementSystem', ['ionic']);
mobilityApp.factory('httpRequestInterceptor', ['$rootScope', function() {
        return {
            request: function($config) {
                $config.headers["Authorization"] = ["Basic " + window.btoa("poservices:poservices@123")];
                $config.headers["Accept"] = "application/json";
                $config.headers["Content-Type"] = "application/json";
                return $config;
            }
        };
    }]);

mobilityApp.config(function($httpProvider) {
    $httpProvider.interceptors.push('httpRequestInterceptor');
});

mobilityApp.run(function($rootScope, $location, $ionicPlatform) {
    $rootScope.config = {};
    $rootScope.config.app_url = $location.url();
    $rootScope.config.app_path = $location.path();
    $rootScope.layout = {};
    $rootScope.layout.loading = false;

    $rootScope.$on("$routeChangeStart", function() {
    });

    $ionicPlatform.registerBackButtonAction(function() {
    }, 100);

    $location.path("ListPage");
});
 