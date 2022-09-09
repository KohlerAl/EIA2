"use strict";
var lektion03;
(function (lektion03) {
    window.addEventListener("load", handleLoad);
    function handleLoad() {
        // tslint:disable-next-line: quotemark
        let allBoxes = document.querySelectorAll('input[type="checkbox"]');
        console.log(allBoxes);
        for (let box of allBoxes) {
            box.addEventListener("pointerdown", handleCheck);
        }
        let add = document.querySelector("#add");
        add.addEventListener("pointerdown", addProduct);
    }
    function handleCheck(_event) {
        let target = _event.target;
        console.log(target.value);
        let parent = target.parentElement;
        if (parent.classList.contains("checked")) {
            parent.classList.remove("checked");
        }
        else {
            parent.classList.add("checked");
        }
    }
    function addProduct() {
        let formData = new FormData(document.forms[0]);
        for (let entry of formData) {
            console.log(entry[0] + "  " + entry[1]);
        }
    }
})(lektion03 || (lektion03 = {}));
//# sourceMappingURL=main.js.map