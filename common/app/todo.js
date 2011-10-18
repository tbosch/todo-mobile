angular.service('todoStore', function(xhr, waitDialog) {
    var readUrl = 'https://secure.openkeyval.org/';
    var writeUrl = 'https://secure.openkeyval.org/store/?';

    function read(key, success) {
        waitDialog.show();
        xhr('JSON',
            readUrl + key+'?callback=JSON_CALLBACK',
            function(status, data) {
                success(data);
                waitDialog.hide();
            });
    }

    function write(key, value) {
        waitDialog.show();
        value = encodeURIComponent(JSON.stringify(value));
        xhr('JSON', writeUrl + key + '=' + value+'&callback=JSON_CALLBACK',
              function() {
            waitDialog.hide();
        });
    }

    return {
        read: read,
        write: write
    }

}, {$inject: ['$xhr', '$waitDialog']});


function TodoController(todoStore) {
    this.storageKey = 'JQueryMobileAngularTodoapp';
    this.store = todoStore;
    this.todos = [];
    this.inputText = '';
    this.refreshTodos();
}

TodoController.$inject = ['todoStore'];

TodoController.prototype = {
    addTodo: function() {
        this.todos.push({name: this.inputText, done: false});
        this.inputText = '';
    },
    refreshTodos: function() {
        var self = this;
        this.store.read(this.storageKey, function(data) {
            if (!data) {
                data = [];
            }
            self.todos = data;
        });
    },
    saveTodos: function() {
        // delete all checked todos
        var newTodos = [], todo;
        for (var i=0; i<this.todos.length; i++) {
            todo = this.todos[i];
            if (!todo.done) {
                newTodos.push(todo);
            }
        }
        this.todos = newTodos;
        this.store.write(this.storageKey, this.todos);
    }
};

