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
const modalCancelBtn = document.querySelector(".modal__cancel-btn");
const modalconfirmBtn = document.querySelector(".modal__confirm-btn");
const modalDelete = document.querySelector("#modal-delete");

let oldInputValue;
let targetDel;
let storage;

// Funções
const setStorage = (storage) => localStorage.setItem('allTodos', JSON.stringify(storage));
const getStorage = () => JSON.parse(localStorage.getItem('allTodos'));
storage = getStorage() ?? [];

function addTodo(text, status = "") {
    const todo = document.createElement("div");
    todo.classList.add("todo");
    if (status === "checked") {
        todo.classList.toggle("done");        
    }
    
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
            
            storage = storage.map(todo => {
                if (todo.title === oldInputValue) {
                    todo.title = editInputValue;
                }
                setStorage(storage);
            })
        }
    })
}

function targetDelete(target){
    const parentDiv = target.closest("div");
    targetDel = parentDiv;

}

function deleteTodo(){
    targetDel.remove();
    let index;
    storage.forEach(todo => {
        if (todo.title === targetDel.querySelector("h3").innerText){
            index = storage.indexOf(todo);
        }
    })
    storage.splice(index, 1);
    setStorage(storage);
}

function modalToggle(){
    modalDelete.classList.toggle("hide");
}

function atualizaTela(){
    if(storage.length > 0){
        storage.forEach(todo => {
            addTodo(todo.title, todo.status);
        })
    }
}

// Eventos
todoAdd.addEventListener("submit", (e) => {
    e.preventDefault();

    const inputValue = todoAddInput.value;

    addTodo(inputValue);

    storage.push({'title': inputValue})
    setStorage(storage);
    
})

todoEdit.addEventListener("submit", (e) => {
    e.preventDefault();
    
    const editInputValue = todoEditInput.value;
    
    if(editInputValue) {
        updateTodo(editInputValue);
    }
    
    toggleForms();
})

cancelEditBtn.addEventListener("click", (e) => {
    e.preventDefault();

    toggleForms(); 
})

document.addEventListener("click", (e) => {    
    // Done, edit, remove
    const targetBtn = e.target;
    const parentDiv = targetBtn.closest("div");

    let todoTitle;
    allTodos = document.querySelectorAll(".todo");
    
    if(parentDiv && parentDiv.querySelector("h3")) {
        todoTitle = parentDiv.querySelector("h3").innerText;
    }
    
    if (targetBtn.classList.contains("complete-todo")){
        parentDiv.classList.toggle("done");
        storage.forEach(todo => {
            if (todo.title === parentDiv.querySelector("h3").innerText){
                index = storage.indexOf(todo);
            }
        })
        if (storage[index].status === "checked") {
            storage[index].status = "";
            setStorage(storage);
        } else {
            storage[index].status = "checked";
            setStorage(storage);
        }
    }
    
    if (targetBtn.classList.contains("edit-todo")){
        toggleForms();
        
        todoEditInput.value = todoTitle;
        oldInputValue = todoTitle;
        
        todoEditInput.focus();
    }
    
    if (targetBtn.classList.contains("delete-todo")){
        modalToggle();
        targetDelete(targetBtn);
    }
    
    if (targetBtn.classList.contains("modal__confirm-btn")){
        deleteTodo();
        modalToggle();
    }
    
    // Filter
    
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

// Search
searchForm.addEventListener("input", (e) => {
    e.preventDefault();

    allTodos = document.querySelectorAll("h3")

    allTodos.forEach((todo) => {
        let todoTitle = todo.innerText;
        let parentDiv = todo.closest("div");

        if (!(todoTitle.toLowerCase().includes(searchInput.value.toLowerCase()))) {
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

// Modal
modalCancelBtn.addEventListener("click", (e) => {
    modalToggle();
})

atualizaTela();