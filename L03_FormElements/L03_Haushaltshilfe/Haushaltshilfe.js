"use strict";
var L03_Haushaltshilfe;
(function (L03_Haushaltshilfe) {
    window.addEventListener("load", handleLoad);
    let form = document.getElementById("form");
    let confirm = document.getElementById("confirm");
    let cash = document.getElementById("cash");
    let shopping = document.getElementById("shopping");
    let house = document.getElementById("house");
    let grocery = document.getElementById("grocery");
    let money = document.getElementById("money");
    let household = document.getElementById("household");
    function handleLoad() {
        form.addEventListener("change", handleChange);
        confirm.addEventListener("click", showInput);
    }
    function showInput() {
        if (cash.checked == true) {
            console.log("cash");
            grocery.disabled = true;
            money.disabled = false;
            household.disabled = true;
        }
        else if (shopping.checked == true) {
            console.log("shopping");
            grocery.disabled = false;
            money.disabled = true;
            household.disabled = true;
        }
        else if (house.checked == true) {
            console.log("house");
            grocery.disabled = true;
            money.disabled = true;
            household.disabled = false;
        }
    }
    function handleChange(_event) {
        let order = document.querySelector("div#order");
        order.innerHTML = "";
        let formData = new FormData(document.forms[0]);
        for (let entry of formData) {
            let item = document.querySelector("[value='" + entry[1] + "']");
            console.log(item);
            console.log(entry);
            let price = Number(item.getAttribute("price"));
            order.innerHTML += name + "  € " + price;
        }
    }
})(L03_Haushaltshilfe || (L03_Haushaltshilfe = {}));
//# sourceMappingURL=Haushaltshilfe.js.map