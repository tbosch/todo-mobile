angular.service('jsonp', function($updateView) {
    function jsonp(url, success, error) {

        function successWrapper(data) {
            success(data);
            $updateView();
        }
        $.ajax({
            url: url,
            dataType: "jsonp",
            success: successWrapper,
            error: error
        });
    }

    return jsonp;


}, {$inject: ['$updateView']});