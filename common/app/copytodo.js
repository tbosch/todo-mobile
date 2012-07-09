var module = angular.module("todo", []);
module.factory('todoStore', function ($http, $waitDialog) {
    var readUrl = 'https://secure.openkeyval.org/';
    var writeUrl = 'https://secure.openkeyval.org/store/?';

    function read(key) {
        $waitDialog.show();
        return $http({
            method:'JSONP',
            url:readUrl + key + '?callback=JSON_CALLBACK'
        }).then(function (response) {
                $waitDialog.hide();
                return response.data;
            });
    }

    function write(key, value) {
        $waitDialog.show();
        value = encodeURIComponent(JSON.stringify(value));
        $http({
            method:'JSONP',
            url:writeUrl + key + '=' + value + '&callback=JSON_CALLBACK'
        }).then(function () {
                $waitDialog.hide();
            });
    }

    return {
        read:read,
        write:write
    }
});

module.controller('TodoController', function ($scope, $navigate, todoStore) {
    $scope.storageKey = 'JQueryMobileAngularTodoapp';
    $scope.todos = [];
    $scope.inputText = '';

    $scope.addTodo = function () {
        $scope.todos.push({name:$scope.inputText, done:false});
        $scope.inputText = '';
    };
    $scope.showSettings = function () {
        $navigate("#settings");
    };
    $scope.back = function () {
        $navigate('back');
    };
    $scope.refreshTodos = function () {
        todoStore.read($scope.storageKey).then(function (data) {
            if (!data) {
                data = [];
            }
            $scope.todos = data;
        });
    };
    $scope.saveTodos = function () {
        // delete all checked todos
        var newTodos = [], todo;
        for (var i = 0; i < $scope.todos.length; i++) {
            todo = $scope.todos[i];
            if (!todo.done) {
                newTodos.push(todo);
            }
        }
        $scope.todos = newTodos;
        todoStore.write($scope.storageKey, $scope.todos);
    };

    $scope.refreshTodos();
});