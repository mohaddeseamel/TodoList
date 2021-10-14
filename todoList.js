//get todos from localStorage
let todos = localStorage.getItem("todos");
console.log(todos);

//try parse data or null

try {
  todos = JSON.parse(todos);
  todos = todos.length ? todos : null;
} catch {
  todos = null;
}
console.log(todos);

if (!todos) {
  todos = [
    { content: "watching", status: true },
    { content: "listening", status: false },
    { content: "like", status: true },
  ];
  localStorage.setItem("todos", JSON.stringify(todos));
}

//functon to create or update todos list in ui
function createTodo(todos) {
  let todosList = document.querySelector("#todos-list");
  todosList.innerHTML = " ";

  todos.forEach((todo, index) => {
    let li = document.createElement("li");
    li.classList = "list-group-item";
    let content = document.createElement("span");
    content.textContent = todo.content;
    content.style.textDecoration = todo.status ? "initial" : "line-through";
    let deleteBtn = document.createElement("img");
    deleteBtn.className = "float-right";
    deleteBtn.src = "./media/delete.png";
    deleteBtn.alt = "delete icon";

    //append content and deleteBtn to li

    li.append(content);
    li.append(deleteBtn);

    //append li to todosList
    todosList.append(li);

    deleteBtn.addEventListener("click", (e) => {
      todos.splice(index, 1);
      localStorage.setItem("todos", JSON.stringify(todos));
      createTodo(todos);
    });

    content.addEventListener("click", (e) => {
      todos[index].status = !todos[index].status;
      localStorage.setItem("todos", JSON.stringify(todos));
      createTodo(todos);
    });
  });
}
createTodo(todos);

//action add & search

let actions = document.querySelector("#actions");
let formWrapper = document.querySelector("#form-wrapper");

Array.from(actions.children).forEach((action) => {
  if (action.dataset.action == "add") {
    action.addEventListener("click", (e) => {
      formWrapper.innerHTML = `
         <form id="add">
        <input class="form-control" name="add" placeholder="add todo...">
    </form>`;
    createTodo(todos);
      let add = document.querySelector("#add");
      add.addEventListener("submit", (e) => {
        e.preventDefault();
        if (add.add.value) {
          todos.push({ content: add.add.value, status: true });
          localStorage.setItem("todos", JSON.stringify(todos));
          createTodo(todos);
        }
      });
    });
  } else if (action.dataset.action == "search") {
    action.addEventListener("click", (e) => {
      formWrapper.innerHTML = `
        <form id="search">
                    <input class="form-control" name="search" placeholder="search todos...">
                </form>
        `;
      let search = document.querySelector("#search");
      search.addEventListener("keyup", (e) => {
        if(search.search.value){
            let filter_todos = todos.filter(
                todo => todo.content.toLowerCase().includes(search.search.value.toLowerCase())
            )
            createTodo(filter_todos);
        }else{
            createTodo(todos);
        }
      });
    });
  }
});
