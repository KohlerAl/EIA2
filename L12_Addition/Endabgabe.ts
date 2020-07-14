namespace EIA2_Endabgabe {
    export let canvas: HTMLCanvasElement;
    export let crc2: CanvasRenderingContext2D;
    let backgroundImage: ImageData;
    let pattern: string = "plain";
    export let figures: Form[] = [];

    export let backgroundColor: HTMLInputElement;

    let canvasWidth: HTMLInputElement;
    let canvasHeight: HTMLInputElement;
    let backgroundColorWrapper: HTMLElement;
    let patterns: HTMLDivElement;

    let forms: HTMLDivElement;
    let animations: HTMLDivElement;
    let form: HTMLFormElement;
    let h3: HTMLHeadingElement;
    let save: HTMLButtonElement;
    export let background: string; 
    export let creations: HTMLInputElement; 


    window.addEventListener("load", handleLoad);

    function handleLoad(): void {
        canvas = <HTMLCanvasElement>document.querySelector("canvas");
        crc2 = <CanvasRenderingContext2D>canvas.getContext("2d");

        canvasWidth = <HTMLInputElement>document.getElementById("canvasWidth");
        canvasHeight = <HTMLInputElement>document.getElementById("canvasHeight");
        backgroundColorWrapper = <HTMLElement>document.getElementById("backgroundColorWrapper");

        patterns = <HTMLDivElement>document.getElementById("patterns");
        patterns.addEventListener("click", createPattern);

        canvas = <HTMLCanvasElement>document.querySelector("canvas");
        canvas.addEventListener("click", handleClick);

        backgroundColor = <HTMLInputElement>document.getElementById("backgroundColor");
        backgroundColor.addEventListener("change", createBackground);

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

        canvasHeight.addEventListener("change", setCanvasHeight);
        canvasWidth.addEventListener("change", setCanvasWidth);

        findPictures();
        createBackground();
        window.setInterval(animate, 30);
    }

    function toggleCanvasProperty(): void {
        if (canvasWidth.style.display == "none") {
            canvasWidth.style.display = "inline";
            canvasHeight.style.display = "inline";
            backgroundColorWrapper.style.display = "inline";
            patterns.style.display = "inline";
        }
        else {
            canvasWidth.style.display = "none";
            canvasHeight.style.display = "none";
            backgroundColorWrapper.style.display = "none";
            patterns.style.display = "none";
        }
    }

    function createElement(_event: any): void {
        let id: string = _event.target.id;
        for (let figure of figures) {
            figure.active = false;
        }
        switch (id) {
            case "triangle":
                let triangle: Triangle = new Triangle();
                triangle.draw();
                figures.push(triangle);
                break;
            case "ellipse":
                let ellipse: Ellipse = new Ellipse();
                ellipse.draw();
                figures.push(ellipse);
                break;
            case "square":
                let square: Square = new Square();
                square.draw();
                figures.push(square);
                break;
            case "circle":
                let circle: Circle = new Circle();
                circle.draw();
                figures.push(circle);
                break;
            case "line":
                let line: Line = new Line();
                line.draw();
                figures.push(line);
                break;
            default:
                break;
        }
    }

    function animate(): void {
        crc2.putImageData(backgroundImage, 0, 0);
        for (let figure of figures) {
            figure.move();
            figure.draw();
        }
    }

    function createPattern(_event: any): void {
        let id: string = _event.target.id;
        if (id == "dots") {
            pattern = "dots";
        }
        else if (id == "squares") {
            pattern = "squares";
        }
        else {
            pattern = "plain";
        }
        createBackground();
    }

    function handleClick(_event: MouseEvent): void {
        let y: number = _event.clientY;
        let x: number = _event.clientX;
        console.log(x, y);

        for (let figure of figures) {
            if (figure.active == true) {
                console.log(figure.position);
                figure.position = new Vector(x, y);
            }
        }

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

    function createBackground(): void {
        background = backgroundColor.value;
        console.log(background); 

        if (pattern == "dots") {
            let pattern: CanvasRenderingContext2D = <CanvasRenderingContext2D>document.createElement('canvas').getContext('2d');
            pattern.canvas.width = 20;
            pattern.canvas.height = 20;
            pattern.fillStyle = background;
            pattern.arc(10, 10, 9, 0, 2 * Math.PI);
            pattern.strokeStyle = "#111111";
            pattern.stroke();
            pattern.closePath();

            crc2.fillStyle = pattern;
        }

        else if (pattern == "squares") {
            let pattern: CanvasRenderingContext2D = <CanvasRenderingContext2D>document.createElement('canvas').getContext('2d');
            pattern.canvas.width = 5;
            pattern.canvas.height = 5;
            pattern.fillStyle = background;
            pattern.strokeStyle = "#111111";
            pattern.fillRect(0, 0, 5, 5);
            pattern.stroke();
            pattern.closePath();

            crc2.fillStyle = pattern;
        }

        else {
            crc2.fillStyle = background;
        }

        crc2.fillRect(0, 0, canvas.width, canvas.height);
        backgroundImage = crc2.getImageData(0, 0, canvas.width, canvas.height);
    }

    function handleFormInput(_event: any): void {
        let id: string = _event.target.id;
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
                    if (figure.active == true) {
                        figure.resize(parseInt(scaleValue.value));
                    }
                }

        }
    }

    function setAnimation(_event: any): void {
        let id: string = _event.target.id;
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
                    case "colorChange":
                        figure.moveType = FORM_MOVE.LIGHTEN;
                        break;
                    case "sizeChange":
                        figure.moveType = FORM_MOVE.SIZECHANGE;
                        break;
                    default:
                        break;
                }
            }
        }
    }

   /*  function setActive(_figure: Form) {
        for (let figure of figures) {
            if (figure.active == true) {
                figure.active = false;
            }
        }
        _figure.active = true;
    }
 */
    function deleteElement(_figure: Form) {
        let index: number = figures.indexOf(_figure);
        figures.splice(index, 1);
    }

    function getName(): void {
        let pictureName = prompt("Please enter a name for your Picture!"); 
        if (pictureName == null || pictureName == "") {
            alert("Please enter a word or else the Picture cannot be saved")
        }
        else 
        savePicture(pictureName); 
    }
}