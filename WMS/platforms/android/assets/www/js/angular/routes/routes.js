mobilityApp.config(function($stateProvider, $urlRouterProvider) {

    $stateProvider
            .state('Login', {
                url: "/Login",
                templateUrl: "partials/login.html"
            })
            .state('Welcome', {
                url: "/Welcome",
                templateUrl: "partials/welcome.html"
            });
    $urlRouterProvider.otherwise("/Login");
});