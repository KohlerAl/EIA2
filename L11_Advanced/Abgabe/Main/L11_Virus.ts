//Abgabe L11 von Alida Kohler, erstellt am 23.06.2020
//Konzipiert für ein Handy-Display mit dem Format 360x560
namespace L11_Virus {
    export let canvas: HTMLCanvasElement;
    export let crc2: CanvasRenderingContext2D;
    export let width: number;
    export let height: number;

    /* let coronas: Corona[] = [];
    let largeCells: BodyCell[] = [];
    let particles: Particle[] = [];
    let smallCells: Background[] = [];
    let antibodys: Antibody[] = []; */

    let cells: Cell[] = [];

    let backgroundImage: ImageData;


    window.addEventListener("load", createImage);
    window.addEventListener("resize", handleResize);

    function handleResize(): void {
        cells = [];
        createImage();
    }

    function createImage(): void {
        canvas = <HTMLCanvasElement>document.querySelector("canvas");
        crc2 = <CanvasRenderingContext2D>canvas.getContext("2d");
        resizeCanvas();
        createBackground();
        createCells();
        window.setInterval(animation, 20);
    }

    function createCells(): void {
        //Depending on the size of the canvas, different numbers of cells are created
        let numCircles: number = (width + height) / 5;
        //Declaring the minium and maximum size each cell can be
        //define some colours both for the cells themselves and for their nuclei

        //Define some variables to be passed to the function drawCell after their value is set
        // as well as some other variables to distinguish different cases of cells and devices
        let xPos: number;
        let yPos: number;
        let radius: number;
        let storage: number = 0;
        let coronaPosition: number = 10;
        let j: number;
        let nParticles: number;

        //To make the picture not too confusing on small screens, the number of cells to be shown is reduced again 

        if (width > 800) {
            numCircles = numCircles;
            j = Math.floor(width / 50);
            nParticles = 600;
        }
        else {
            numCircles = numCircles / 2;
            j = 15;
            nParticles = 100;
        }

        //Create Cells for the Background
        for (let i = 0; i < numCircles; i++) {
            // Creating some random values for circle characteristics.
            xPos = Math.random() * canvas.width;
            yPos = Math.random() * canvas.height;

            let position: Vector = new Vector(xPos, yPos);
            let cell: Background = new Background(position);
            cell.draw();
        }
        //  Create Macrophages
        for (let i = 0; i < 2; i++) {
            let position: Vector = new Vector(width - 200 + (200 * Math.random()), 400 + (200 * Math.random()))
            let macrophage: Macrophage = new Macrophage(position);
            macrophage.draw();
        }
        backgroundImage = crc2.getImageData(0, 0, width, height);

        //Create Antibodys
        for (let i = 0; i < j; i++) {
            xPos = Math.random() * canvas.width / 1.5;
            yPos = 450 + (70 * Math.random());
            /* if (xPos > width / 2) {
                yPos = yPos + 50;
                xPos = xPos - width / 2 + 10;
            } */
            let position: Vector = new Vector(xPos, yPos);
            let antibody: Antibody = new Antibody(position);
            antibody.draw();
            cells.push(antibody);
        }

        //Create bigger Cells for the foreground
        while (storage < width) {
            yPos = 80;
            xPos = storage + 40;
            storage = xPos + 40;
            let position: Vector = new Vector(xPos, yPos);
            let cell: BodyCell = new BodyCell(position, false);
            cell.draw();
            cells.push(cell);
        }

        for (let i = 0; i < j; i++) {
            radius = 30;
            xPos = coronaPosition + radius + 10;
            coronaPosition = xPos + radius;
            yPos = 220 + (50 * Math.random());

            if (xPos > width) {
                yPos = yPos + 100;
                xPos = xPos - width + 10;
            }
            let position: Vector = new Vector(xPos, yPos);
            let corona: Corona = new Corona(position);
            corona.draw();
            cells.push(corona);
        }

        for (let i = 0; i < nParticles; i++) {
            xPos = Math.random() * canvas.width;
            yPos = Math.random() * canvas.height;
            // Call draw Cell and commit all needed values for the cell 
            let position: Vector = new Vector(xPos, yPos);
            let cell: Particle = new Particle(position);
            cell.draw();
            cells.push(cell);
        }

    }

    function animation(): void {

        crc2.putImageData(backgroundImage, 0, 0);

        for (let cell of cells) {
            if (cell instanceof Antibody || cell instanceof Corona)
                cell.move(1 / 20);
            else if (cell instanceof BodyCell)
                cell.move(1 / 30)
            else if (cell instanceof Particle)
                cell.move(1 / 50)
            cell.draw();
        }
        isInfected();

    }

    function isInfected(): void {
        for (let cell of cells) {
            if (cell instanceof Corona && cell.isInfected()) {
                startReaction(cell);
                changeBodyCell(cell.position.x);
            }
        }
    }

    function startReaction(_corona: Corona): void {
        _corona.isInfecting = true;
        window.setTimeout(function (): void {
            endReaction(_corona);
        }, 3000);
    }

    function endReaction(_corona: Corona) {
        _corona.isInfecting = false;  
    }

    function changeBodyCell(_virusPos: number) {
        for (let cell of cells) {
            let areaMin: number = cell.position.x - 40;
            let areaMax: number = cell.position.x + 40;

            if (cell instanceof BodyCell && _virusPos > areaMin && _virusPos < areaMax) {
                let index: number = cells.indexOf(cell);
                cells.splice(index, 1);

                let newPosition: Vector = new Vector(cell.position.x, cell.position.y);
                let infectedCell: BodyCell = new BodyCell(newPosition, true);
                infectedCell.draw();
                for (let cell of cells) {
                    if(cell instanceof Corona) {
                        cell.draw();
                    }
                }
                cells.push(infectedCell);
            }
        }
    }

}