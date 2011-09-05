function TodoController(todoStore, activePage) {
    this.storageKey = 'JQueryMobileAngularTodoapp';
    this.store = todoStore;
    this.activePage = activePage;
    this.todos = [];
    this.inputText = '';
    this.refreshTodos();
}

TodoController.$inject = ['todoStore', '$activePage'];

TodoController.prototype = {
    showSettings: function() {
        this.activePage("#settings");
    },
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
        var newTodos = $.grep(this.todos, function(todo) {
            return !todo.done;
        });
        this.todos = newTodos;
        this.store.write(this.storageKey, this.todos);
    },
    onActivate: function(prevscope) {
        if (prevscope && prevscope.storageKey) {
            this.storageKey = prevscope.storageKey;
            this.refreshTodos();
        }
    }
}

function SettingsController(activePage) {
    this.activePage = activePage;
};

SettingsController.$inject = ['$activePage'];


SettingsController.prototype = {
    onActivate: function(prevscope) {
        if (prevscope && prevscope.storageKey) {
            this.storageKey = prevscope.storageKey;
        }
    },
    back: function() {
        this.activePage("back");
    }
}


