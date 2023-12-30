class Todo {
    constructor() {
        this.todos = [];
    }

    addTodo(newTodo) {
        this.todos.push({id: parseInt(Math.random() * 1000).toString(), value: newTodo});
    }

    deleteTodo(id) {
        this.todos = this.todos.filter(todo => {
            return todo.id !== id;
        })
    }

    updateTodo(idToUpdate, valueToUpdate) {
        this.todos = this.todos.map(todo => {
            if(todo.id === idToUpdate) {
                return {id: idToUpdate, value: valueToUpdate};
            }
            return todo;
        })
    }

    isEmpty() {
        return this.todos.length === 0;
    }

    getTodos() {
        return this.todos;
    }

    setTodos(value) {
        this.todos = value;
    }
}