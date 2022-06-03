// dropdown
const dropBtn = document.querySelector(".dropdown-btn");
const dropContent = document.querySelector(".dropdown-content");
dropBtn.addEventListener("click", () => {
  dropContent.classList.toggle("show");
});

const form = document.querySelector("form");
const input = document.querySelector("input");
const secondSec = document.querySelector(".second-section");

// add tasks
form.addEventListener("submit", (e) => {
  e.preventDefault();
  let task = input.value;
  input.value = "";
  let newTask = `<div class="new-task">
            <p>${task}</p>
            <div class="buttons">
              <button id="done"><i class="fas fa-check"></i></button
              ><!--
              --><button id="delete">
                <i class="fas fa-trash"></i>
              </button>
            </div>
          </div> 
          <!--taskend-->
          `;
  secondSec.innerHTML += newTask;
  tasksArr = document.querySelectorAll(".new-task");
});

// buttons functionalities

secondSec.addEventListener("click", function (e) {
  const item = e.target;
  if (item.getAttribute("id") == "done") {
    const task = item.parentElement.parentElement;
    task.classList.add("done-task");
  }
  if (item.getAttribute("id") == "delete") {
    const task = item.parentElement.parentElement;

    task.classList.add("fall");
    console.log(task);
    task.addEventListener("transitionend", function () {
      task.remove();
    });
  }
});

// filter
dropContent.addEventListener("click", function (e) {
  const item = e.target;
  const dropText = document.querySelector(".dropdown-btn-text");
  const todos = secondSec.querySelectorAll(".new-task");
  dropContent.classList.toggle("show");
  todos.forEach(function (todo) {
    console.log(todo);
    switch (item.getAttribute("id")) {
      case "all":
        dropText.textContent = "All";
        todo.style.display = "flex";
        break;
      case "completed":
        dropText.textContent = "Completed";
        if (todo.classList.contains("done-task")) {
          todo.style.display = "flex";
        } else {
          todo.style.display = "none";
        }
        break;
      case "uncompleted":
        dropText.textContent = "Uncompleted";
        if (!todo.classList.contains("done-task")) {
          todo.style.display = "flex";
        } else {
          todo.style.display = "none";
        }
        break;
    }
  });
});
