angular.service('todoStore', function(jsonp, waitdialog) {
    var readUrl = 'https://secure.openkeyval.org/';
    var writeUrl = 'https://secure.openkeyval.org/store/?';

    function read(key, success) {
        waitdialog.show();
        jsonp('JSON',
            readUrl + key+'?callback=JSON_CALLBACK',
            function(status, data) {
                success(data);
                waitdialog.hide();
            });
    }

    function write(key, value) {
        waitdialog.show();
        value = encodeURIComponent(JSON.stringify(value));
        jsonp('JSON', writeUrl + key + '=' + value+'&callback=JSON_CALLBACK', 
              function() {
            waitdialog.hide();
        });
    }

    return {
        read: read,
        write: write
    }

}, {$inject: ['$xhr', 'waitdialog']});