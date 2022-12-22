const a = document.querySelector("#minus");
let i = 0;

a.addEventListener("click", function () {
  if (i > 0) {
    i--;
    content.innerHTML = i;
  }
  content.style.background = "red";
  content.style.color = "rgba(168, 15, 15, 0.832)";
});

const b = document.querySelector("#plus");
b.addEventListener("click", function () {
  i++;
  content.innerHTML = i;
  content.style.background = "green";
  content.style.color = "greenyellow";
});
