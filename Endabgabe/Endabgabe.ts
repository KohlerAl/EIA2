namespace EIA2_Endabgabe {
    export let canvas: HTMLCanvasElement;
    export let crc2: CanvasRenderingContext2D;

    window.addEventListener("load", handleLoad);

    function handleLoad(): void {
        canvas = <HTMLCanvasElement>document.querySelector("canvas");
        crc2 = <CanvasRenderingContext2D>canvas.getContext("2d");
        canvas.width = 360;
        canvas.height = 560;

        crc2.fillStyle = "#ffffff";
        crc2.fillRect(0, 0, 360, 560);

        styleColorPicker();
    }

    function styleColorPicker(): void {
        var color_picker: HTMLInputElement = <HTMLInputElement>document.getElementById("color-picker");
        var color_picker_wrapper: HTMLDivElement = <HTMLDivElement>document.getElementById("color-picker-wrapper");
        color_picker.onchange = function () {
            color_picker_wrapper.style.backgroundColor = color_picker.value;
        }
        color_picker_wrapper.style.backgroundColor = color_picker.value;
    }
}