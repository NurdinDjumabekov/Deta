const input = document.getElementById("input");
const create_button = document.getElementById("create_button");
const todolist = document.getElementById("todo_list");

function createTodo() {
  if (input.value.trim() === "") {
    return false;
  } else {
    const div = document.createElement("div");
    const div_interior = document.createElement("div");
    const H3 = document.createElement("h3");
    const button = document.createElement("button");
    const button_edid = document.createElement("button");
    div_interior.setAttribute("class", "div_interior");
    div.setAttribute("class", "block_text");
    H3.innerText = input.value;
    todolist.append(div);
    div.append(H3);
    div.append(div_interior);
    input.value = "";
    ////////////////////////
    button_edid.setAttribute("class", "button_edit_kudato");
    button_edid.innerHTML = "EDIT";
    div_interior.append(button_edid);
    button_edid.onclick = () => {
      let changes_text = prompt("Измените текст :");
      H3.innerText = changes_text;
    };
    /////////////////////////
    button.innerText = "Delete";
    div_interior.append(button);
    button.setAttribute("class", "button_delete");
    button.onclick = () => {
      div.remove();
    };
  }
}

create_button.addEventListener("click", createTodo);
input.addEventListener("keydown", (e) => {
  if (e.keyCode === 13) {
    createTodo();
  } else {
    return false;
  }
});
