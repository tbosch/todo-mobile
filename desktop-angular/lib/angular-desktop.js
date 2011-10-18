(function(angular) {
    $(function() {
        $("body").append('<div id="waitDialog"></div>' +
            '<div id="waitDialogMessage">Please wait...</div>');
        // We do not use ng:autbind, so the desktop version
        // is similar to the mobile version.
        angular.compile($(document))();
    });

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

    angular.service('$navigate', function() {
        return activePage;
    });

    /**
     * Helper function to put the navigation part out of the controller into the page.
     * @param scope
     */
    angular.Object.navigate = function(scope) {
        var service = scope.$service("$navigate");
        if (arguments.length === 2) {
            // used without the test.
            service(arguments[1]);
            return;
        }
        // parse the arguments...
        var test = arguments[1];
        var outcomes = {};
        var parts;
        for (var i = 2; i < arguments.length; i++) {
            parts = arguments[i].split(':');
            outcomes[parts[0]] = parts[1];
        }
        if (test && test.then) {
            // test is a promise.
            test.then(function(test) {
                if (outcomes[test]) {
                    service(outcomes[test]);
                } else if (outcomes.success) {
                    service(outcomes.success);
                }
            }, function(test) {
                if (outcomes[test]) {
                    service(outcomes[test]);
                } else  if (outcomes.failure) {
                    service(outcomes.failure);
                }
            });
        } else {
            if (outcomes[test]) {
                service(outcomes[test]);
            } else if (test !== false && outcomes.success) {
                service(outcomes.success);
            } else if (test === false && outcomes.failure) {
                service(outcomes.failure);
            }
        }
    };

    angular.service("$waitDialog", function() {
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

    function findCtrlFunction(name) {
        var parts = name.split('.');
        var base = window;
        var part;
        for (var i = 0; i < parts.length; i++) {
            part = parts[i];
            base = base[part];
        }
        return base;
    }

    function sharedCtrl(rootScope, name) {
        var ctrl = findCtrlFunction(name);
        var instance = rootScope[name];
        if (!instance) {
            instance = rootScope.$new(ctrl);
            rootScope[name] = instance;
        }
        return instance;
    }

    function parseSharedControllersExpression(expression) {
        var pattern = /(.*?):(.*?)($|,)/g;
        var match;
        var hasData = false;
        var controllers = {}
        while (match = pattern.exec(expression)) {
            hasData = true;
            controllers[match[1]] = match[2];
        }
        if (!hasData) {
            throw "Expression " + expression + " needs to have the syntax <name>:<controller>,...";
        }
        return controllers;
    }

    angular.directive('ngd:shared-controller', function(expression) {
        this.scope(true);
        var controllers = parseSharedControllersExpression(expression);
        return function(element) {
            var scope = this;
            for (var name in controllers) {
                scope[name] = sharedCtrl(scope.$root, controllers[name]);
            }
        }
    });

    window.desktop = {
        activePage: activePage
    }

})(window.angular);