$('#addTodo').submit(function(event) {
    addTodo();
    event.preventDefault();
});

function addTodo() {
    // Read UI
    var inputText = $('#inputText').val();
    // Update UI
    var list = $('#todos');
    var entryCount = list.find('input').length;
    list.append(entryTemplate(entryCount, inputText));
    // Create new jquery widgets
    list.trigger('create');
    $('#input').val('');
}

function entryTemplate(index, name) {
    return '<input type="checkbox" id="todo' + index + '"/>' +
        '<label for="todo' + index + '">' + name + '</label>';
}

$(function() {
    TodoController();
});