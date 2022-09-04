// Seleção de elementos
const todoAdd = document.querySelector("#todo-add")
const todoAddInput = document.querySelector("#todo-add__input")
const todoList = document.querySelector("#todo-list")
const todoEdit = document.querySelector("#todo-edit")
const todoEditInput = document.querySelector("#todo-edit__input")
const cancelEditBtn = document.querySelector("#cancel-edit-btn")

let oldInputValue;

// Funções
function saveTodo(text) {
    const todo = document.createElement("div");
    todo.classList.add("todo");

    const todoTitle = document.createElement("h3");
    todoTitle.innerText = text;
    todo.appendChild(todoTitle);
    
    const doneBtn = document.createElement("button");
    doneBtn.classList.add("complete-todo");
    doneBtn.innerHTML = '<i class="fa-solid fa-circle-check">';
    todo.appendChild(doneBtn);

    const editBtn = document.createElement("button");
    editBtn.classList.add("edit-todo");
    editBtn.innerHTML = '<i class="fa-solid fa-pen-to-square">';
    todo.appendChild(editBtn);

    const deleteBtn = document.createElement("button");
    deleteBtn.classList.add("delete-todo");
    deleteBtn.innerHTML = '<i class="fa-solid fa-xmark-circle">';
    todo.appendChild(deleteBtn);

    todoList.appendChild(todo);

    todoAddInput.value = "";
    todoAddInput.focus();
}

function toggleForms(){
    todoEdit.classList.toggle("hide");
    todoAdd.classList.toggle("hide");
    todoList.classList.toggle("hide");
}

function updateTodo(editInputValue){
    const allTodos = document.querySelectorAll(".todo");

    allTodos.forEach((todo) => {
        let todoTitle = todo.querySelector("h3");

        if (todoTitle.innerText === oldInputValue) {
            todoTitle.innerText = editInputValue;
        }
    })
}

// Eventos
todoAdd.addEventListener("submit", (e) => {
    e.preventDefault();

    const inputValue = todoAddInput.value;

    if(inputValue) {
        saveTodo(inputValue);
    }
})

document.addEventListener("click", (e) => {
    const targetBtn = e.target;
    const parentDiv = targetBtn.closest("div");
    let todoTitle;

    if(parentDiv && parentDiv.querySelector("h3")) {
        todoTitle = parentDiv.querySelector("h3").innerText;
    }

    if (targetBtn.classList.contains("complete-todo")){
        parentDiv.classList.toggle("done");
    }

    if (targetBtn.classList.contains("edit-todo")){
        toggleForms();

        todoEditInput.value = todoTitle;
        oldInputValue = todoTitle;
    }

    if (targetBtn.classList.contains("delete-todo")){
        parentDiv.remove();
    }
})

cancelEditBtn.addEventListener("click", (e) => {
    e.preventDefault();

    toggleForms();
})

todoEdit.addEventListener("submit", (e) => {
    e.preventDefault();

    const editInputValue = todoEditInput.value;

    if(editInputValue) {
        updateTodo(editInputValue);
    }

    toggleForms();
})