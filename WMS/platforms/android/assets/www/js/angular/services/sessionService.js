mobilityApp.service('sessionService', function() {
    this.deviceinfo = "";
    this.requestStartTime = '';
    this.userName = '';
    this.password = '';
    this.operationType = '';

    this.reset = function() {
        this.userName = '';
        this.password = '';
    };
});