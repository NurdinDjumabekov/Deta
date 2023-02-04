function readMore() {
  const more = document.querySelector(".more");
  const btn1 = document.querySelector(".btn1");
  const btn2 = document.querySelector(".btn2");
  const btn3 = document.querySelector(".btn3");
  const btn4 = document.querySelector(".btn4");
  const btn5 = document.querySelector(".btn5");
  const btn6 = document.querySelector(".btn6");
  /////////////
  const span1 = document.querySelector("#span_1");
  const span2 = document.querySelector("#span_2");
  const span3 = document.querySelector("#span_3");
  const span4 = document.querySelector("#span_4");
  const span5 = document.querySelector("#span_5");
  const span6 = document.querySelector("#span_6");

  btn1.addEventListener("click", () => {
    span1.classList.toggle("more");
  });

  btn2.addEventListener("click", () => {
    span2.classList.toggle("more");
  });

  btn3.addEventListener("click", () => {
    span3.classList.toggle("more");
  });

  btn4.addEventListener("click", () => {
    span4.classList.toggle("more");
  });

  btn5.addEventListener("click", () => {
    span5.classList.toggle("more");
  });

  btn6.addEventListener("click", () => {
    span6.classList.toggle("more");
  });
}
readMore();
