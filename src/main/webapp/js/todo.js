function TodoController($openkeyval) {
    this.storageKey = 'JQueryMobileAngularTodoapp';
    this.todos = [];
    this.inputText = '';
    var self = this;

    this.addTodo = function() {
        this.todos.push({name: this.inputText, done: false});
        this.inputText = '';
    }

    this.refreshTodos = function() {
        $openkeyval.read(this.storageKey, function(data) {
            if (!data) {
                data = [];
            }
            self.todos = data;
        });

    }

    this.saveTodos = function() {
        // delete all checked todos
        var newTodos = $.grep(this.todos, function(todo) {
            return !todo.done;
        });
        this.todos = newTodos;
        $openkeyval.write(this.storageKey, this.todos);
    }

    this.onActivate = function(prevscope) {
        if (prevscope && prevscope.storageKey) {
            this.storageKey = prevscope.storageKey;
            this.refreshTodos();
        }
    }

    this.refreshTodos();
}

function SettingsController() {
    this.onActivate = function(prevscope) {
        if (prevscope && prevscope.storageKey) {
            this.storageKey = prevscope.storageKey;
        }
    }
}


