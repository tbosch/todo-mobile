angular.service('todoStore', function(jsonp, waitdialog) {
    var readUrl = 'https://secure.openkeyval.org/';
    var writeUrl = 'https://secure.openkeyval.org/store/?';

    function read(key, success) {
        waitdialog.show();
        jsonp(
            readUrl + key,
            function(data) {
                data = JSON.parse(data);
                success(data);
                waitdialog.hide();
            });
    }

    function write(key, value) {
        waitdialog.show();
        value = encodeURIComponent(JSON.stringify(value));
        jsonp(writeUrl + key + '=' + value, function() {
            waitdialog.hide();
        });
    }

    return {
        read: read,
        write: write
    }

}, {$inject: ['jsonp', 'waitdialog']});