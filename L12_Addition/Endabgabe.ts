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
        let colorPicker: HTMLInputElement = <HTMLInputElement>document.getElementById("colorPicker");
        let colorPickerWrapper: HTMLDivElement = <HTMLDivElement>document.getElementById("colorPickerWrapper");
        colorPicker.onchange = function () {
            colorPickerWrapper.style.backgroundColor = colorPicker.value;
        }
        colorPickerWrapper.style.backgroundColor = colorPicker.value;


        let backgroundColor: HTMLInputElement = <HTMLInputElement>document.getElementById("backgroundColor");
        let backgroundColorWrapper: HTMLDivElement = <HTMLDivElement>document.getElementById("backgroundColorWrapper");
        backgroundColor.onchange = function () {
            backgroundColorWrapper.style.backgroundColor = backgroundColor.value;
        }
        backgroundColorWrapper.style.backgroundColor = backgroundColor.value;
    }

}