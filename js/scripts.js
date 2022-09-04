// Seleção de elementos
const todoAdd = document.querySelector("#todo-add")
const todoAddInput = document.querySelector("#todo-add__input")
const todoList = document.querySelector("#todo-list")
const todoEdit = document.querySelector("#todo-edit")
const todoEditInput = document.querySelector("#todo-edit__input")
const CancelEditBtn = document.querySelector("#cancel-edit-btn")

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

// Eventos
todoAdd.addEventListener("submit", (e) => {
    e.preventDefault();

    const inputValue = todoAddInput.value;

    if(inputValue) {
        saveTodo(inputValue);
    }
})