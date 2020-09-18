const button = document.querySelector(".page__nav--burger");
const menu = document.querySelector(".page__nav--list");

button.addEventListener("click", function (){
    menu.classList.toggle("show");
    button.classList.toggle("show");
})