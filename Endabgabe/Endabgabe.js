"use strict";
var EIA2_Endabgabe;
(function (EIA2_Endabgabe) {
    window.addEventListener("load", handleLoad);
    function handleLoad() {
        EIA2_Endabgabe.canvas = document.querySelector("canvas");
        EIA2_Endabgabe.crc2 = EIA2_Endabgabe.canvas.getContext("2d");
        EIA2_Endabgabe.canvas.width = 360;
        EIA2_Endabgabe.canvas.height = 560;
        EIA2_Endabgabe.crc2.fillStyle = "#ffffff";
        EIA2_Endabgabe.crc2.fillRect(0, 0, 360, 560);
        styleColorPicker();
    }
    function styleColorPicker() {
        var color_picker = document.getElementById("color-picker");
        var color_picker_wrapper = document.getElementById("color-picker-wrapper");
        color_picker.onchange = function () {
            color_picker_wrapper.style.backgroundColor = color_picker.value;
        };
        color_picker_wrapper.style.backgroundColor = color_picker.value;
    }
})(EIA2_Endabgabe || (EIA2_Endabgabe = {}));
//# sourceMappingURL=Endabgabe.js.map