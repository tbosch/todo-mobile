(function(angular) {
    var pages;

    function getHash() {
        var hash = location.hash;
        if (hash.charAt(0) === '#') {
            hash = hash.substring(1);
        }
        return hash;
    }

    $(function() {
        pages = $('div.page');
        updatePageFromHash();
    });

    $(window).bind('hashchange', updatePageFromHash);

    function updatePageFromHash() {
        var newPage = getHash();
        pages.hide();
        if (!newPage) {
            $(pages[0]).show();
        } else {
            $("#" + newPage).show();
        }
    }

    function activePage(newPage) {
        if (arguments.length === 0) {
            var page;
            for (var i = 0; i < pages.length; i++) {
                page = $(pages[i]);
                if (page.is(":visible")) {
                    return page;
                }
            }
            return null;
        } else {
            location.hash = newPage;
        }
    }

    var mod = angular.module("ng");
    mod.factory('$navigate', function() {
        return activePage;
    });

    mod.factory("$waitDialog", function() {
        function show() {
            $("#waitDialog").show();
            $("#waitDialogMessage").show();

        }

        function hide() {
            $("#waitDialog").hide();
            $("#waitDialogMessage").hide();
        }

        return {
            show: show,
            hide: hide
        }
    });

    window.desktop = {
        activePage: activePage
    }

})(window.angular);