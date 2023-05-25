//All the elements:
const form = document.getElementById("todo-form");
const todoInput = document.getElementById("todo");
const todoList = document.querySelector(".list-group");
const firstCardBody = document.querySelector(".card-body");
const secondCardBody = document.querySelectorAll(".card-body")[1];
const filter = document.getElementById("filter");
const clearButton = document.getElementById("clear-todos");

//all event listeners

const eventListeners = () => {
  form.addEventListener("submit", addTodo);
  document.addEventListener("DOMContentLoaded", loadAllTodosToUI);
  secondCardBody.addEventListener("click", deleteTodo);
  filter.addEventListener("keyup", filterTodos);
  clearButton.addEventListener("click", clearAllTodos);
};
function clearAllTodos() {
  if (confirm("Tüm Todo'ları silmek istediğinizden emin misiniz?")) {
    while (todoList.firstElementChild != null) {
      todoList.removeChild(todoList.firstElementChild);
      localStorage.removeItem("todos");
    }
  }
}
function filterTodos(e) {
  const filterValue = e.target.value.toLowerCase();
  const listItems = document.querySelectorAll(".list-group-item");
  listItems.forEach(function (listItem) {
    const text = listItem.textContent.toLowerCase();
    if (text.indexOf(filterValue) === -1) {
      listItem.setAttribute("style", "display : none !important");
    } else {
      listItem.setAttribute("style", "display : block");
    }
  });
}
deleteTodo = e => {
  if (e.target.className === "fa fa-remove") {
    deleteTodoFromStorage(e.target.parentElement.parentElement.textContent);
    e.target.parentElement.parentElement.remove();
    showAlert("success", "Todo başarıyla silindi");
  }
};
function deleteTodoFromStorage(deletetodo) {
  let todos = getTodosFromStorage();
  todos.forEach(function (todo, index) {
    if (todo === deletetodo) {
      todos.splice(index, 1);
    }
  });
  localStorage.setItem("todos", JSON.stringify(todos));
}
function loadAllTodosToUI() {
  let todos = getTodosFromStorage();
  todos.forEach(todo => {
    addTodotoUI(todo);
  });
}

const addTodo = e => {
  const newTodo = todoInput.value.trim();

  if (newTodo === "") {
    showAlert("danger", "Lütfen bir todo girin...");
  } else {
    addTodotoUI(newTodo);
    addTodoToStorage(newTodo);
    showAlert("success", "To-do'nuz başarıyla eklendi");
  }
};
//takes todos from storage
function getTodosFromStorage() {
  let todos;
  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }
  return todos;
}

addTodoToStorage = newTodo => {
  let todos = getTodosFromStorage();
  todos.push(newTodo);
  localStorage.setItem("todos", JSON.stringify(todos));
};
showAlert = (type, message) => {
  const alert = document.createElement("div");
  alert.className = `alert alert-${type}`;
  alert.textContent = message;
  firstCardBody.appendChild(alert);
  setTimeout(() => {
    firstCardBody.removeChild(alert);
  }, 2000);
};
addTodotoUI = newTodo => {
  const listItem = document.createElement("li");
  // Creating link
  const link = document.createElement("a");
  link.href = "#";
  link.className = "delete-item";
  link.innerHTML = "<i class='fa fa-remove'></i>";
  listItem.className = "list-group-item d-flex justify-content-between";
  //Adding Text Node
  listItem.appendChild(document.createTextNode(newTodo));
  listItem.appendChild(link);
  // adding list item to to-do list
  todoList.appendChild(listItem);

  todoInput.value = "";
};

eventListeners();
