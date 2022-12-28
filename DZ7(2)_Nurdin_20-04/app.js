/////////////////////////////add task
document.querySelector(".addBtn").onclick = function () {
  if (document.querySelector("input").value === "") {
    alert("введите текст");
  } else {
    document.querySelector(".tasks").innerHTML += `<div class="task">
          <span  class="taskName">${
            document.querySelector("input").value
          }</span>
          <button class="delete">x</button>
      </div>`;

    // //Д3:
    ////////// - при клике на кнопку add input должен очищаться
    const clearTask = document.querySelector("input");
    clearTask.value = "";

    //////////////delete task////////////
    const current_tasks = document.querySelectorAll(".delete");
    for (let i = 0; i < current_tasks.length; i++) {
      current_tasks[i].onclick = function () {
        this.parentNode.remove();
      };
    }
    ///////done task////////
    let doneTask = document.querySelectorAll(".taskName");
    for (let i = 0; i < doneTask.length; i++) {
      doneTask[i].onclick = function () {
        this.classList.toggle("completed");
      };
    }
  }
};
