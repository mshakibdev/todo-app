//Selectors
const todoInput = document.querySelector(".td-input");
const todoButton = document.querySelector(".td-btn");
const todoList = document.querySelector(".td-list");
const filterItems = document.querySelector(".filter-todo");
//alt+shift+down-arrow for copy paste

//Event listeners
todoButton.addEventListener("click", addTodo);
todoList.addEventListener("click", deleteCheck);
filterItems.addEventListener("click", filteredItems); //here you can use "change" instead of "click"
document.addEventListener("DOMContentLoaded", getTodo);

//function

// creating new todo item

function addTodo(event) {
	event.preventDefault();

	// create todo div element
	const todoDiv = document.createElement("div");
	todoDiv.classList.add("todo");

	//create li element
	const newTodo = document.createElement("li");
	newTodo.innerText = todoInput.value;
	newTodo.classList.add("td-item");
	// clear input value

	//append li
	todoDiv.appendChild(newTodo);

	// ADD to LocalStorage
	saveInLocalStorage(todoInput.value);

	//check-mark button
	const completeButton = document.createElement("button");
	completeButton.innerHTML = "<i class='fas fa-check'></i>";
	completeButton.classList.add("complete-btn");
	//append btn
	todoDiv.appendChild(completeButton);

	//trash button
	const trashButton = document.createElement("button");
	trashButton.innerHTML = "<i class='fas fa-trash'></i>";
	trashButton.classList.add("trash-btn");
	//append btn
	todoDiv.appendChild(trashButton);

	//finally append to ul
	todoList.appendChild(todoDiv);

	//clear todo Input value
	todoInput.value = "";
}

// check if todo is complete or incomplete
function deleteCheck(e) {
	// console.log(e.target);
	const item = e.target;
	//done by delete
	if (item.className === "trash-btn") {
		const todoDiv = item.parentElement;

		//animation class fall
		todoDiv.classList.add("fall");
		// delete todo from locals storage
		removeTodo(todoDiv);
		//remove after transition
		todoDiv.addEventListener("transitionend", () => {
			todoDiv.remove();
		});
		// todo.remove();
	}

	//done by complete
	if (item.classList[0] === "complete-btn") {
		const todo = item.parentElement;
		todo.classList.toggle("completed");
	}
}
// filtering todo
function filteredItems(e) {
	const todoItems = todoList.childNodes;

	todoItems.forEach((todoItem) => {
		// console.log(e.target.value);
		switch (e.target.value) {
			case "all":
				todoItem.style.display = "flex";
				break;
			case "completed":
				if (
					todoItem.classList.contains(
						"completed"
					)
				) {
					todoItem.style.display =
						"flex";
				} else {
					todoItem.style.display =
						"none";
				}
				break;
			case "uncompleted":
				if (
					!todoItem.classList.contains(
						"completed"
					)
				) {
					todoItem.style.display =
						"flex";
				} else {
					todoItem.style.display =
						"none";
				}
				break;
			// default:
			// 	break;
		}
	});
	// console.log(todoItems);
}

// saving data in local storage
function saveInLocalStorage(todo) {
	let total_todo;
	let localTodo = localStorage.getItem("todo");
	if (localTodo === null) {
		total_todo = [];
	} else {
		total_todo = JSON.parse(localTodo);
	}
	total_todo.push(todo);
	localStorage.setItem("todo", JSON.stringify(total_todo)); //convert array to string
}

// getting data from local storage
function getTodo() {
	let total_todo;
	let localTodo = localStorage.getItem("todo");
	if (localTodo === null) {
		total_todo = [];
	} else {
		total_todo = JSON.parse(localTodo); //convert string to array
	}
	// looping over local storage data and re-create elements
	total_todo.forEach((todo) => {
		// create todo div element
		const todoDiv = document.createElement("div");
		todoDiv.classList.add("todo");

		//create li element
		const newTodo = document.createElement("li");
		newTodo.innerText = todo;
		newTodo.classList.add("td-item");
		// clear input value

		//append li
		todoDiv.appendChild(newTodo);

		//check-mark button
		const completeButton = document.createElement("button");
		completeButton.innerHTML = "<i class='fas fa-check'></i>";
		completeButton.classList.add("complete-btn");
		//append btn
		todoDiv.appendChild(completeButton);

		//trash button
		const trashButton = document.createElement("button");
		trashButton.innerHTML = "<i class='fas fa-trash'></i>";
		trashButton.classList.add("trash-btn");
		//append btn
		todoDiv.appendChild(trashButton);

		//finally append to ul
		todoList.appendChild(todoDiv);
	});
}
function removeTodo(todoDiv) {
	let total_todo;
	let localTodo = localStorage.getItem("todo");
	if (localTodo === null) {
		total_todo = [];
	} else {
		total_todo = JSON.parse(localTodo); //convert string to array
	}

	const todoInnerText = todoDiv.children[0].innerText;
	const indexOfTodo = total_todo.indexOf(todoInnerText);

	total_todo.splice(indexOfTodo,1);

	localStorage.setItem("todo", JSON.stringify(total_todo)); //convert array to string

}
