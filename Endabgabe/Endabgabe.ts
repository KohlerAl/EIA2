namespace EIA2_Endabgabe {
    export let canvas: HTMLCanvasElement;
    export let crc2: CanvasRenderingContext2D;
    export let figures: Form[] = [];
    export let backgroundColor: HTMLInputElement;
    export let background: string;
    export let creations: HTMLInputElement;
    export let backgroundPattern: string = "plain";
    export let patternColor: HTMLInputElement;

    let backgroundImage: ImageData;

    let canvasWidth: HTMLInputElement;
    let canvasHeight: HTMLInputElement;
    let backgroundColorWrapper: HTMLElement;
    let patterns: HTMLDivElement;

    let patternColorWrapper: HTMLDivElement;

    let forms: HTMLDivElement;
    let animations: HTMLDivElement;
    let form: HTMLFormElement;
    let h3: HTMLHeadingElement;
    let save: HTMLButtonElement;
    let allForms: HTMLDivElement;


    window.addEventListener("load", handleLoad);

    function handleLoad(): void {
        canvas = <HTMLCanvasElement>document.querySelector("canvas");
        crc2 = <CanvasRenderingContext2D>canvas.getContext("2d");

        canvasWidth = <HTMLInputElement>document.getElementById("canvasWidth");
        canvasHeight = <HTMLInputElement>document.getElementById("canvasHeight");
        backgroundColorWrapper = <HTMLDivElement>document.getElementById("backgroundColorWrapper");
        patternColorWrapper = <HTMLDivElement>document.getElementById("patternColorWrapper");
        patternColor = <HTMLInputElement>document.getElementById("patternColor");

        patterns = <HTMLDivElement>document.getElementById("patterns");
        patterns.addEventListener("click", createPattern);

        canvas = <HTMLCanvasElement>document.querySelector("canvas");
        canvas.addEventListener("click", handleClick);

        backgroundColor = <HTMLInputElement>document.getElementById("backgroundColor");
        backgroundColor.addEventListener("change", function (): void {
            createBackground();
        });
        patternColor.addEventListener("change", function (): void {
            createBackground();
        });

        save = <HTMLButtonElement>document.getElementById("save");
        save.addEventListener("click", getName);

        form = <HTMLFormElement>document.querySelector("form");
        form.addEventListener("change", handleFormInput);

        forms = <HTMLDivElement>document.getElementById("forms");
        forms.addEventListener("click", createElement);

        creations = <HTMLInputElement>document.getElementById("creations");
        creations.addEventListener("change", loadPicture);
        animations = <HTMLDivElement>document.getElementById("animations");
        animations.addEventListener("click", setAnimation);

        h3 = <HTMLHeadingElement>document.querySelector("h3");
        h3.addEventListener("click", toggleCanvasProperty);
        canvasWidth.style.display = "none";
        canvasHeight.style.display = "none";
        backgroundColorWrapper.style.display = "none";
        patterns.style.display = "none";
        patternColorWrapper.style.display = "none";

        canvasHeight.addEventListener("change", setCanvasHeight);
        canvasWidth.addEventListener("change", setCanvasWidth);

        allForms = <HTMLDivElement>document.getElementById("allForms");

        canvas.width = 500;
        canvas.height = 700;

        findPictures();
        createBackground();
        window.setInterval(animate, 30);
    }

    function toggleCanvasProperty(): void {
        if (canvasWidth.style.display == "none") {
            canvasWidth.style.display = "inline";
            canvasHeight.style.display = "inline";
            backgroundColorWrapper.style.display = "inline";
            patternColorWrapper.style.display = "inline";
            patterns.style.display = "inline";
        }
        else {
            canvasWidth.style.display = "none";
            canvasHeight.style.display = "none";
            backgroundColorWrapper.style.display = "none";
            patternColorWrapper.style.display = "none";
            patterns.style.display = "none";
        }
    }

    function createElement(_event: MouseEvent): void {
        let target: HTMLElement = <HTMLElement>_event.target;
        let id: string = target.id;
        for (let figure of figures) {
            figure.active = false;
        }
        let symbol: Form;
        switch (id) {
            case "triangle":
                symbol = new Triangle();
                break;
            case "ellipse":
                symbol = new Ellipse();
                break;
            case "square":
                symbol = new Square();
                break;
            case "circle":
                symbol = new Circle();
                break;
            case "line":
                symbol = new Line();
                break;
            case "heart":
                symbol = new Heart();
                break;
            case "star":
                symbol = new Star();
                break;
            default:
                return;
        }
        figures.push(symbol);
        symbol.draw();
        updateList();
    }

    export function updateList(): void {
        while (allForms.firstChild) {
            allForms.removeChild(allForms.firstChild)
        }
        let title: HTMLSpanElement = document.createElement("span");
        title.innerText = "All Elements on your canvas are listed here!";
        allForms.appendChild(title);
        for (let entry of figures) {
            let list: HTMLSpanElement = document.createElement("span");
            list.setAttribute("id", figures.indexOf(entry).toString());
            list.innerText = entry.type + "  color: " + entry.color;
            list.addEventListener("click", setActive);
            allForms.appendChild(list);
        }
    }

    function animate(): void {
        crc2.putImageData(backgroundImage, 0, 0);
        for (let figure of figures) {
            figure.move(0.5);
            figure.draw();
        }
    }

    function createPattern(_event: MouseEvent): void {
        let target: HTMLElement = <HTMLElement>_event.target;
        let id: string = target.id;
        if (id == "dots") {
            backgroundPattern = "dots";
        }
        else if (id == "squares") {
            backgroundPattern = "squares";
        }
        else {
            backgroundPattern = "plain";
        }
        createBackground();
    }

    function setCanvasHeight(): void {
        let newHeight: number = parseInt(canvasHeight.value);
        canvas.height = newHeight;
        createBackground();
    }

    function setCanvasWidth(): void {
        let newWidth: number = parseInt(canvasWidth.value);
        canvas.width = newWidth;
        createBackground();
    }

    export function createBackground(_color?: string): void {
        if (_color) {
            background = _color;
        }
        else
            background = backgroundColor.value;

        if (backgroundPattern == "dots") {
            let pattern: CanvasRenderingContext2D = <CanvasRenderingContext2D>document.createElement('canvas').getContext('2d');
            pattern.beginPath();
            pattern.canvas.width = 20;
            pattern.canvas.height = 20;
            pattern.fillStyle = background;
            pattern.fillRect(0, 0, pattern.canvas.width, pattern.canvas.height);
            pattern.arc(10, 10, 9, 0, 2 * Math.PI);
            pattern.strokeStyle = patternColor.value;
            pattern.stroke();
            pattern.closePath();

            crc2.fillStyle = <CanvasRenderingContext2D>crc2.createPattern(pattern.canvas, "repeat");
        }

        else if (backgroundPattern == "squares") {
            let pattern: CanvasRenderingContext2D = <CanvasRenderingContext2D>document.createElement('canvas').getContext('2d');
            pattern.beginPath();
            pattern.canvas.width = 10;
            pattern.canvas.height = 10;
            pattern.fillStyle = background;
            pattern.fillRect(0, 0, pattern.canvas.width, pattern.canvas.height);
            pattern.strokeStyle = patternColor.value;
            pattern.rect(0, 0, 5, 5);
            pattern.stroke();
            pattern.closePath();

            crc2.fillStyle = <CanvasRenderingContext2D>crc2.createPattern(pattern.canvas, "repeat");
        }

        else {
            crc2.fillStyle = background;
        }

        crc2.fillRect(0, 0, canvas.width, canvas.height);
        backgroundImage = crc2.getImageData(0, 0, canvas.width, canvas.height);
    }

    function handleFormInput(_event: Event): void {
        let target: HTMLElement = <HTMLElement>_event.target;
        let id: string = target.id;
        switch (id) {
            case "colorPicker":
                let colorPicker: HTMLInputElement = <HTMLInputElement>document.getElementById("colorPicker");
                for (let figure of figures) {
                    if (figure.active == true) {
                        figure.changeColor(colorPicker.value)
                    }
                }
                break;
            case "rotationValue":
                let rotationValue: HTMLInputElement = <HTMLInputElement>document.getElementById("rotationValue");
                for (let figure of figures) {
                    if (figure.active == true) {
                        figure.changeRotation(parseInt(rotationValue.value));
                    }
                }
                break;
            case "scaleValue":
                let scaleValue: HTMLInputElement = <HTMLInputElement>document.getElementById("scaleValue");
                for (let figure of figures) {
                    if (figure.active == true && figure.type != "Heart") {
                        figure.resize(parseFloat(scaleValue.value));
                    }
                }
            case "speed":
                let speed: HTMLInputElement = <HTMLInputElement>document.getElementById("speed");
                for (let figure of figures) {
                    if (figure.active == true) {
                        figure.velocity.x = parseInt(speed.value);
                        figure.velocity.y = parseInt(speed.value);
                    }
                }

        }
    }

    function setAnimation(_event: MouseEvent): void {
        let target: HTMLElement = <HTMLElement>_event.target;
        let id: string = target.id;
        for (let figure of figures) {
            if (figure.active == true) {
                switch (id) {
                    case "trash":
                        deleteElement(figure);
                        break;
                    case "rotate":
                        figure.moveType = FORM_MOVE.ROTATE;
                        break;
                    case "move":
                        figure.moveType = FORM_MOVE.MOVE;
                        break;
                    case "neon":
                        figure.neon = true;
                        figure.threeD = false;
                        break;
                    case "threeD":
                        figure.neon = false;
                        figure.threeD = true;
                        break;
                    case "stop":
                        figure.neon = false;
                        figure.threeD = false;
                        break;
                    default:
                        break;
                }
            }
        }
    }

    function handleClick(_event: MouseEvent): void {
        let y: number = _event.clientY;
        let x: number = _event.clientX;

        for (let figure of figures) {
            if (figure.active == true) {
                figure.position.x = x;
                figure.position.y = y;
            }
        }
    }


    function deleteElement(_figure: Form): void {
        let index: number = figures.indexOf(_figure);
        figures.splice(index, 1);
        updateList();
    }

    function getName(): void {
        let pictureName = prompt("Please enter a name for your Picture!");
        if (pictureName == null || pictureName == "") {
            alert("Please enter a word or else the Picture cannot be saved")
        }
        else
            savePicture(pictureName);
    }

    function setActive(_event: MouseEvent): void {
        for (let entry of figures) {
            entry.active = false;
        }
        let target: HTMLElement = <HTMLElement>_event.target;
        console.log(target.id);
        let num: number = parseInt(target.id);
        figures[num].active = true;
    }
}