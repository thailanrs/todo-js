// Seleção de elementos
const todoAdd = document.querySelector("#todo-add")
const todoAddInput = document.querySelector("#todo-add__input")
const todoList = document.querySelector("#todo-list")
const todoEdit = document.querySelector("#todo-edit")
const todoEditInput = document.querySelector("#todo-edit__input")
const cancelEditBtn = document.querySelector("#cancel-edit-btn")
const searchForm = document.querySelector("#search__form")
const searchInput = document.querySelector("#search__input");
const eraseSearchBtn = document.querySelector("#erase-search__button");
const filterSelect = document.querySelector("#filter__select");
const toolbar = document.querySelector("#toolbar");

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
    toolbar.classList.toggle("hide");
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
    // Done, edit, remove
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
        
        todoEditInput.focus();
    }
    
    if (targetBtn.classList.contains("delete-todo")){
        parentDiv.remove();
    }

    // Filter
    const allTodos = document.querySelectorAll(".todo");
    
    if (filterSelect.value === "all") {
        allTodos.forEach((todo) => {
            todo.classList.remove("hide");          
        });
    }
    
    if (filterSelect.value === "done") {
        allTodos.forEach((todo) => {
            if (todo.classList.contains("done")){
                todo.classList.remove("hide");  
            } else {
                todo.classList.add("hide");
            }
        });
    }
    
    if (filterSelect.value === "todo") {
        allTodos.forEach((todo) => {
            if (todo.classList.contains("done")){
                todo.classList.add("hide");  
            } else {
                todo.classList.remove("hide");
            }
        });
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

// Search
searchForm.addEventListener("input", (e) => {
    e.preventDefault();
    
    allTodos = document.querySelectorAll("h3")

    allTodos.forEach((todo) => {
        let todoTitle = todo.innerText;
        let parentDiv = todo.closest("div");

        if (!(todoTitle.includes(searchInput.value))) {
            parentDiv.classList.add("hide");
        } else {
            parentDiv.classList.remove("hide");
        }
    });
    
    if (searchInput.value === "") {
        allTodos.forEach((todo) => {
            let parentDiv = todo.closest("div");
            
            parentDiv.classList.remove("hide");
        });
    }
    
})

eraseSearchBtn.addEventListener("click", (e) => {
    e.preventDefault();

    searchInput.value = "";
})