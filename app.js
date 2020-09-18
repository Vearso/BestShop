const button = document.querySelector(".page__nav--burger");
const menu = document.querySelector(".page__nav--list");
const button2 = document.querySelector(".page__nav--cross");

button.addEventListener("click", function (){
    menu.classList.toggle("show");
    button.classList.toggle("show");
    button2.classList.toggle("show");
})