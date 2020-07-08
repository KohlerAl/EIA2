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
        let colorPicker = document.getElementById("colorPicker");
        let colorPickerWrapper = document.getElementById("colorPickerWrapper");
        colorPicker.onchange = function () {
            colorPickerWrapper.style.backgroundColor = colorPicker.value;
        };
        colorPickerWrapper.style.backgroundColor = colorPicker.value;
        let backgroundColor = document.getElementById("backgroundColor");
        let backgroundColorWrapper = document.getElementById("backgroundColorWrapper");
        backgroundColor.onchange = function () {
            backgroundColorWrapper.style.backgroundColor = backgroundColor.value;
        };
        backgroundColorWrapper.style.backgroundColor = backgroundColor.value;
    }
})(EIA2_Endabgabe || (EIA2_Endabgabe = {}));
//# sourceMappingURL=Endabgabe.js.map