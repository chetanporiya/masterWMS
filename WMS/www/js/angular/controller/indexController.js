/*
 * Main controller that handles almost entire application.
 */
mobilityApp.controller('indexController', function($scope, $location, utilsService, checkNetworkService) {
    $scope.utilsService = utilsService;
    $scope.checkNetworkService = checkNetworkService;
    $scope.logout = function() {
        $scope.utilsService.logout();
    };
    document.addEventListener("deviceready", onDeviceReady, false);
    function onDeviceReady() {
        $scope.checkNetworkService.getdeviceinfo();
        document.addEventListener("online", onOnline, false);
        if (device.platform.toLowerCase() === 'android' || device.platform.toLowerCase() === 'ios') {
            $scope.appVersion = navigator.appInfo.getVersion(function(args) {
                $scope.appVersion = args;
            });
        }
        else if (device.platform.toLowerCase() === 'blackberry10') {
            $scope.appVersion = blackberry.app.version.toString();
        }
    }

    function onOnline() {
        $scope.checkNetworkService.resetDeviceInfo();
    }

});