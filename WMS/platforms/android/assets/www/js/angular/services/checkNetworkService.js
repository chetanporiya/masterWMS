// Service that will hold all the utility functions.

mobilityApp.service('checkNetworkService', function(sessionService) {
    this.isLoading = false;
    this.networkCurrentState;
    this.getObjNetworkInfo = function() {
        //alert("******************** getObjNetworkInfo start (deviceInfoService.js) ********************");
        this.networkState = navigator.connection.type;
        this.objStatesAndMessages = {};
        this.objStatesAndMessages[Connection.UNKNOWN] = 'Unknown connection.';
        this.objStatesAndMessages[Connection.ETHERNET] = 'Ethernet connection.';
        this.objStatesAndMessages[Connection.WIFI] = 'WiFi connection.';
        this.objStatesAndMessages[Connection.CELL_2G] = 'Cell 2G connection.';
        this.objStatesAndMessages[Connection.CELL_3G] = 'Cell 3G connection.';
        this.objStatesAndMessages[Connection.CELL_4G] = 'Cell 4G connection.';
        this.objStatesAndMessages[Connection.CELL] = 'Cell generic connection.';
        this.objStatesAndMessages[Connection.NONE] = 'No network connection.';
        //alert("networkState: " + this.objStatesAndMessages[this.networkState]);
        return this.objStatesAndMessages[this.networkState];
    };

    this.checkNetworkAvailability = function() {
        if (this.getObjNetworkInfo() === "No network connection.") {
            return false;
        } else {
            return true;
        }
    };

    /**
     * Purpose: Method for checking whether network connection is available or not.
     * And if available then which type of connection is that (3G, 2G, Wifi or Unknown) and
     * based on that it will set, what IP address to use for making further AJAX calls.
     *
     * Use: This nethod 
     */
    this.resetDeviceInfo = function() {
        this.getdeviceinfo();
    };

    this.getdeviceinfo = function() {
        var uuid, platform, connectionType, osVersion, deviceModel, appVersion;
        var states = {};
        states[Connection.UNKNOWN] = 'Unknown connection';
        states[Connection.ETHERNET] = 'Ethernet connection';
        states[Connection.WIFI] = 'WiFi connection';
        states[Connection.CELL_2G] = 'Cell 2G connection';
        states[Connection.CELL_3G] = 'Cell 3G connection';
        states[Connection.CELL_4G] = 'Cell 4G connection';
        states[Connection.CELL] = 'Cell generic connection';
        states[Connection.NONE] = 'No network connection';

        uuid = device.uuid;
        platform = device.platform;
        var networkState = navigator.connection.type;
        connectionType = states[networkState];
        osVersion = device.version;
        deviceModel = device.model;

        var deviceinfomap = {};
        deviceinfomap["uuid"] = uuid;
        deviceinfomap["platform"] = platform;
        deviceinfomap["connectionType"] = connectionType;
        deviceinfomap["osVersion"] = osVersion;
        deviceinfomap["deviceModel"] = deviceModel;
        deviceinfomap["appId"] = "App Name";

        if (platform.toLowerCase() === "android" || platform.toLowerCase() === "ios") {
            navigator.appInfo.getVersion(function(args) {
                appVersion = args;
            });
        } else if (platform.toLowerCase() === "blackberry10") {
            appVersion = blackberry.app.version;
        }
        setTimeout(function() {
            deviceinfomap["appVersion"] = appVersion;
            sessionService.deviceinfo = JSON.stringify(deviceinfomap);
            return JSON.stringify(deviceinfomap);
        }, 50);
    };

});