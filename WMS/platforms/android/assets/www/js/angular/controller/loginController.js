//mobilityApp.controller('loginController', function($scope, $location, loginService) {
//    $scope.loginService = loginService;
//    $scope.login = function() {
//         $location.path('Welcome');
//    };
//});

/*
 * This controller handles login functionality.
 */
mobilityApp.controller('loginController', function($scope, $location, utilsService, checkNetworkService, loginService, sessionService, urlConstant) {
    $scope.loginService = loginService;
    $scope.utilsService = utilsService;
    $scope.checkNetworkService = checkNetworkService;
    $scope.sessionService = sessionService;

    localStorage.setItem("userName", $scope.loginService.userName);
    localStorage.setItem("password", $scope.loginService.password);
    localStorage.setItem("rememberPassword", $scope.loginService.rememberPassword);
    var TOTAL_LOGIN_ATTEMP = 3;

    /**
     * This function is use handle login attempts.
     * if 
     * @returns {undefined}
     */
    $scope.parseLoginResponse = function() {
        $scope.loginService.message = '';
        $scope.userName = $scope.loginService.userName;
        if (!sessionStorage.getItem("loginAttemp" + $scope.userName)) {
            sessionStorage.setItem("loginAttemp" + $scope.userName, 1);
            $scope.loginService.message = "You have " + (TOTAL_LOGIN_ATTEMP - parseInt(sessionStorage.getItem("loginAttemp" + $scope.userName))) + " Tries Remaining";
        } else {
            sessionStorage.setItem("loginAttemp" + $scope.userName, parseInt(sessionStorage.getItem("loginAttemp" + $scope.userName)) + 1);
            if (parseInt(sessionStorage.getItem("loginAttemp" + $scope.userName)) >= TOTAL_LOGIN_ATTEMP) {
                $scope.loginService.message = "Your account may be blocked, please contact your KAM.";
            } else {
                $scope.loginService.message = "You have " + (TOTAL_LOGIN_ATTEMP - parseInt(sessionStorage.getItem("loginAttemp" + $scope.userName))) + " Tries Remaining";
            }
        }
        $scope.utilsService.showOkPopup("Login Error", data.Exception);
    };
    /**
     * This function is used to get productForm and Plant details from sap.
     */
    $scope.login = function() {

        if ($scope.loginService.password !== '' && $scope.loginService.userName !== '') {
            $scope.sessionService.operationType = "User Login";
            var strUsername = $scope.loginService.userName.split("_");
            $scope.loginService.internalUserName = $scope.loginService.userName;

            if (strUsername.length === 1) {
                localStorage.setItem("envType", urlConstant.prod);
            } else {
                if (strUsername[0].toLowerCase() === "dev") {
                    localStorage.setItem("envType", urlConstant.dev);
                } else if (strUsername[0].toLowerCase() === "qa") {
                    localStorage.setItem("envType", urlConstant.qa);
                } else if (strUsername[0].toLowerCase() === "local") {
//                    localStorage.setItem("envType", "http://172.24.105.203:6080/");
                    localStorage.setItem("envType", "http://172.24.105.176:8080/");
                }
                $scope.loginService.internalUserName = strUsername[1];
            }

            var data = {
                "soNumber": "",
                "item": "",
                "customerNsr": "",
                "costType": "",
                "searchText": "1"
            };

            if (!$scope.checkNetworkService.checkNetworkAvailability()) {
                $scope.utilsService.showOkPopup("No Internet Connection", "E-DSC requires an active internet connection. Please check your connection and try again.");
                return false;
            }
            $scope.utilsService.loaderMessage = "Logging in...";

            if ($scope.loginService.rememberPassword) {
                localStorage.setItem("RememberPassword", "yes");
                localStorage.setItem("login", "1");
            } else {
                localStorage.setItem("RememberPassword", "no");
            }
            $scope.utilsService.makeAjaxCall(
                    $scope.utilsService.getEnvironmentType() + "" + urlConstant.loginUrl,
                    data,
                    function(response) {
                        alert(JSON.stringify(response));
                        $location.path('Welcome');
                    },
                    true,
                    true);
        } else {
            $scope.utilsService.showOkPopup("Login Error", "Please enter your username and password in order to continue.");
        }
    };

    if (localStorage.getItem("userName") !== null) {
        $scope.isRememberPassword = localStorage.getItem("rememberPassword");
        if ($scope.isRememberPassword === "true") {
            $scope.loginService.userName = localStorage.getItem("userName");
            $scope.loginService.password = localStorage.getItem("password");
            $scope.loginService.rememberPassword = true;
            if (localStorage.getItem("login") === "1") {
                setTimeout(function() {
                    if ($scope.checkNetworkService.checkNetworkAvailability()) {
                        $scope.login();
                    }
                }, 400);
            }
        } else {
            $scope.loginService.userName = '';
            $scope.loginService.password = '';
            $scope.loginService.rememberPassword = false;
        }
    }
});