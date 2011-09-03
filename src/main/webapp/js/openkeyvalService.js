angular.service('$openkeyval', function($updateView, waitdialog) {
    var readUrl = 'https://secure.openkeyval.org/';
    var writeUrl = 'https://secure.openkeyval.org/store/?';

    function jsonp(url, success) {
        waitdialog.show();
        $.ajax({
            url: url,
            dataType: "jsonp",
            success: success
        });
    }

    function read(key, success) {
        jsonp(
            readUrl + key,
            function(data) {
                data = JSON.parse(data);
                success(data);
                afterJsonp();
            });
    }

    function write(key, value) {
        value = encodeURIComponent(JSON.stringify(value));
        jsonp(writeUrl + key + '=' + value, afterJsonp);
    }

    function afterJsonp() {
        waitdialog.hide();
        $updateView();
    }

    return {
        read: read,
        write: write
    }

});