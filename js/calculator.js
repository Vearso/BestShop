document.addEventListener("DOMContentLoaded", function () {

    const form = document.querySelector(".calc__form");

    const products = form.querySelector("#products");
    const orders = form.querySelector("#orders");
    const offer = form.querySelector("#package");
    const accounting = form.querySelector("#accounting");
    const terminal = form.querySelector("#terminal");

    const totalPriceEl = document.querySelector("#total-price");

    const state = {
        products: 0,
        orders: 0,
        package: 0,
        accounting: false,
        terminal: false
    }

    function sum() {
        let sum = 0;
        sum = state.products + state.orders + state.package;
        if (state.accounting) sum += 35;
        if (state.terminal) sum += 5;
        return sum;
    }

    function value(el, price) {
        return `${el.value * price}`;
    }

    function display() {
        if (sum()) {
            totalPriceEl.lastElementChild.innerHTML = `$ ${(sum())}`;
            totalPriceEl.classList.add("open");
        } else totalPriceEl.classList.remove("open");
    }

    [products, orders].forEach((el, i) => {
        let key = el.id;
        el.addEventListener("input", e => {
            let popUp = document.querySelector(`[data-id = ${key}]`)
            if (Number.isInteger(+el.value) && el.value >= 0) {
                el.style.borderColor = "#08A6E4";
                if (el.value) {
                    let price = value(el, 0.5 / (i + 1));

                    popUp.classList.add("open");
                    popUp.lastElementChild.innerHTML = `$ ${price}`;
                    popUp.children[1].innerHTML = `${el.value} * $${0.5 / (i + 1)}`;

                    state[key] = Number(price);
                } else {
                    popUp.classList.remove("open");
                    state[key] = 0;
                }
                display();
            } else {
                el.style.borderColor = "red";
            }
        });
    });

    offer.addEventListener("click", e => {
        offer.lastElementChild.style.display = "block";
        offer.classList.toggle("open");

        [...offer.lastElementChild.children].forEach((el, i) => {
            el.addEventListener("click", e => {
                e.stopPropagation();
                let popUp = document.querySelector(`[data-id=${offer.id}]`);

                state.package = 30 * i;

                offer.firstElementChild.innerHTML = el.innerHTML;

                popUp.classList.add("open");
                popUp.children[1].innerHTML = el.innerHTML;
                popUp.lastElementChild.innerHTML = `$${state.package}`;

                display();

                offer.classList.remove("open");
                el.parentElement.style.display = "none";
            })
        });

        if (!offer.classList.contains("open")) {
            offer.lastElementChild.style.display = "none";
        }
    });

    [accounting, terminal].forEach((el, i) => {
        let key = el.id;
        el.addEventListener("input", e => {
            let popUp = document.querySelector(`[data-id = ${key}]`)
            if (el.checked) {
                popUp.classList.add("open");
                if (key === 'accounting') popUp.lastElementChild.innerHTML = `$35`
                else popUp.lastElementChild.innerHTML = `$10`;

                state[key] = true;

            } else {
                popUp.classList.remove("open");
                state[key] = false;
            }
            display();
        })
    })
});