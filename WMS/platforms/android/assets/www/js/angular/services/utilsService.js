// Service that will hold all the utility functions.

mobilityApp.service('utilsService', function($http, $ionicPopup, $ionicModal, $location, sessionService, checkNetworkService, urlConstant) {

    var alertPopup;
    var isAlertOpen = false;
    this.loaderMessage = "";
    /**
     * TODO - Comment
     * @returns {undefined}
     */
    this.showFeedbackModel = function() {
        //TO-DO FeedBack logic.
    };
    /**
     * TODO - Comment
     * @returns {undefined}
     */
    this.showInfoModel = function() {
        //TO-DO Add Application information popup logic.
    };
    /**
     * TODO - Comment
     * @returns {undefined}
     */
    this.handleBackButton = function(pageName) {
        $location.path(pageName);
    };
    /**
     * This function is used to logout from the applciation.
     * @returns {undefined}
     */
    this.logout = function(quitApp) {
        var confirmPopup = $ionicPopup.confirm({
            title: 'E-DSC',
            template: 'Are you sure you want to logout?'
        });
        confirmPopup.then(function(res) {
            if (res) {
                //TODO-logout from sap,and reset all session variable.
                sessionService.reset();
                localStorage.setItem("login", "0");
                $location.path("Login");
            } else {
            }
        });
    };

    /**
     * This function is used to logout user from sap.
     * @param {type} quitApp
     * @returns {undefined}
     */
    this.logoutFunction = function(quitApp) {
        this.makeAjaxCall(this.getEnvironmentType() + "" + urlConstant.logoutUrl,
                this.getMapData("", "empty", sessionService.orderStatusServiceData),
                function(response) {
                }, false
                );
    };

    this.getEnvironmentType = function() {
        return localStorage.getItem("envType");
    };

    this.showOkPopup = function(title, messageStr) {
        isAlertOpen = true;
        alertPopup = $ionicPopup.alert({
            title: title,
            template: messageStr
        });
        alertPopup.then(function(res) {
            isAlertOpen = false;
        });
    };
    this.hideKeyboard = function() {
        try {
            if (window.cordova && window.cordova.plugins.Keyboard) {
                cordova.plugins.Keyboard.close();
            }
        } catch (e) {

        }
    };
    this.showLoader = function(backDropClose) {
        var closeOnClick = false;
        var service = this;

        if (backDropClose === true) {
            closeOnClick = true;
        }
        $(".loaderMessage").parents(".modal-backdrop").remove();
        $ionicModal.fromTemplateUrl('partials/loaderMessage.html', {
            scope: null,
            backdropClickToClose: closeOnClick
        }).then(function(modal) {
            service.modal = modal;
            service.modal.show();
        });
    };
    this.hideLoaderModal = function() {
        this.modal.hide();
        setTimeout(function() {
            $("body").removeClass("modal-open");
        }, 100);
        $(".loaderMessage").parents(".modal-backdrop").remove();
    };

    /**
     * This function is used to reset the all check marks,
     * from the list of items passed as argument.
     * @param {type} items list for which all checked value should be set to false
     * @returns {undefined}
     */
    this.resetCheckedValue = function(items) {
        for (index in items) {
            items[index].checked = false;
        }
    };

    this.regexpValidation = function(value, regexp) {
        return new RegExp(regexp).test(value);
    };
    /**
     * This function is used to make ajax call.
     * @param {type} url
     * @param {type} data
     * @param {type} successCallback
     * @param {type} showLoader
     * @param {type} isLogin
     * @returns {Boolean}
     */
    this.makeAjaxCall = function(url, data, successCallback, showLoader, isLogin) {
        if (!checkNetworkService.checkNetworkAvailability()) {
            this.showOkPopup("No Internet Connection", "E-DSC requires an active internet connection. Please check your connection and try again.");
            return false;
        }
        sessionService.requestStartTime = new Date();
        if (showLoader === true || showLoader === undefined) {
            this.showLoader();
        }
        this.hideKeyboard();
        var request = {};
        request.method = 'POST';
        request.data = JSON.stringify(data);
        request.url = url;
        request.timeout = 1000 * 60;

        var promise = $http(request);
        var service = this;
        promise.success(function(data, status, header, config) {
            if (showLoader === true || showLoader === undefined) {
                service.hideLoaderModal();
            }
            successCallback(data);
        });
        promise.error(function(data, status, header, config) {
            setTimeout(function() {
                service.hideLoaderModal();
                if (status === 404) {
                    service.showOkPopup("Error", "Page not found. Please try again later.");
                } else if (status === 406) {
                    service.showOkPopup("Error", "Invalid format. Please check input.");
                } else if (status === 408) {
                    service.showOkPopup("Error", "Error - " + status);
                } else {
                    service.showOkPopup("Unable to Connect", "There was some error while connecting to the server. Please try again.");
                }
            }, 100);
        });
    };
});