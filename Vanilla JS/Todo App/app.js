const todo = new Todo();
const input = document.querySelector('.inputBox input');
const addBtn = document.querySelector('button');
const todos = document.querySelector('.todos');
const todoLI = document.querySelectorAll('ul li');
const crossIcon = document.querySelector('#crossIcon');

const KEY = 'todoStorage';


const updateLocalStorage = () => {
    localStorage.setItem(KEY, JSON.stringify(todo.getTodos()));
}


const emptyInputBox = () => {
    input.value = '';
}

if(todo.isEmpty()) {
    const p = document.createElement('p');
    p.innerText = 'No todos added';
    todos.append(p);
}

const emptyNode = parentNode => {
    while(parentNode.firstChild) {
        parentNode.removeChild(parentNode.firstChild);
    }
}

const renderTodoList = () => {
    emptyNode(todos);
    todo.getTodos().map(todo => {
        const li = document.createElement('li');
        const div = document.createElement('div');
        const span = document.createElement('span');
        const newInput = document.createElement('input');
        
        newInput.disabled = true;
        newInput.type = 'text';
        newInput.placeholder = 'Enter Todo here';
        newInput.value = todo.value;
        newInput.setAttribute('id', `${todo.id}`);
        
        span.append('X');
        span.classList.add('todoSpan');
        span.setAttribute('id', todo.id);
        
        div.append(newInput);
        div.append(span);
        div.classList.add('inputBox');
        
        li.append(div);
        
        todos.append(li);
    })

    updateLocalStorage();
}

addBtn.addEventListener('click', () => {
    const todoVal = input.value;
    if(!todoVal) {
        alert('Enter valid todo');
        return;
    }
    todo.addTodo(todoVal);
    emptyInputBox();
    renderTodoList();
})

function handleDelete(e) {
    if(e && e.target && e.target.id && e.target.nodeName === 'SPAN') {
        todo.deleteTodo(e.target.id);
        renderTodoList();
    }
    if(todo.isEmpty()) {
        const p = document.createElement('p');
        p.innerText = 'No todos added';
        todos.append(p);
    }
}

function makeInputEditable(e) {
    if(e.target.disabled) {
        e.target.disabled = false;
    }
    else e.target.disabled = true;
}

function makeChange(e) {
    if(e.key === 'Enter') {
        console.log(todo.getTodos());
        todo.updateTodo(e.target.id, e.target.value);
        e.target.disabled = true;
        renderTodoList();
    }
}


crossIcon.addEventListener('click', () => emptyInputBox());


(() => {
    const localTodos = localStorage.getItem(KEY);
    if(localTodos) {
        todo.setTodos(JSON.parse(localTodos));
        renderTodoList();
    }
})()