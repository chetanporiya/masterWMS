cordova.define('cordova/plugin_list', function(require, exports, module) {
module.exports = [
    {
        "file": "plugins/com.yezhiming.cordova.appinfo/www/appinfo.js",
        "id": "com.yezhiming.cordova.appinfo.AppInfo",
        "merges": [
            "navigator.appInfo"
        ]
    },
    {
        "file": "plugins/nl.x-services.plugins.toast/www/Toast.js",
        "id": "nl.x-services.plugins.toast.Toast",
        "clobbers": [
            "window.plugins.toast"
        ]
    },
    {
        "file": "plugins/nl.x-services.plugins.toast/test/tests.js",
        "id": "nl.x-services.plugins.toast.tests"
    },
    {
        "file": "plugins/org.apache.cordova.device/www/device.js",
        "id": "org.apache.cordova.device.device",
        "clobbers": [
            "device"
        ]
    },
    {
        "file": "plugins/org.apache.cordova.inappbrowser/www/inappbrowser.js",
        "id": "org.apache.cordova.inappbrowser.inappbrowser",
        "clobbers": [
            "window.open"
        ]
    },
    {
        "file": "plugins/org.apache.cordova.network-information/www/network.js",
        "id": "org.apache.cordova.network-information.network",
        "clobbers": [
            "navigator.connection",
            "navigator.network.connection"
        ]
    },
    {
        "file": "plugins/org.apache.cordova.network-information/www/Connection.js",
        "id": "org.apache.cordova.network-information.Connection",
        "clobbers": [
            "Connection"
        ]
    }
];
module.exports.metadata = 
// TOP OF METADATA
{
    "com.blackberry.app": "2.1.0",
    "com.blackberry.ui.toast": "2.1.0",
    "com.yezhiming.cordova.appinfo": "2.0.2",
    "nl.x-services.plugins.toast": "2.0.2",
    "org.apache.cordova.device": "0.2.13",
    "org.apache.cordova.inappbrowser": "0.6.0",
    "org.apache.cordova.network-information": "0.2.15"
}
// BOTTOM OF METADATA
});