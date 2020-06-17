//Abgabe L09 von Alida Kohler, erstellt am 16.06.2020
//Konzipiert für ein Handy-Display mit dem Format 360x560
namespace L09_Virus {
    export let canvas: HTMLCanvasElement = <HTMLCanvasElement>document.querySelector("canvas");
    export let crc2: CanvasRenderingContext2D = <CanvasRenderingContext2D>canvas.getContext("2d");
    export let width: number;
    export let height: number;

    export let coronas: Corona[] = [];
    export let largeCells: BodyCell[] = [];
    export let particles: Particle[] = [];
    export let smallCells: Background[] = [];
    export let antibodys: Antibody[] = [];
    export let macrophages: Macrophage[] = [];

    export let stopCoronas: Corona[] = []; 

    export let backgroundImage: ImageData;

    window.addEventListener("load", createImage);
    window.addEventListener("resize", createImage);

    function createImage(): void {
        resizeCanvas();
        createBackground();
        createCells();
        //window.setInterval(animation, 20);
    }

    function createCells(): void {
        //Depending on the size of the canvas, different numbers of cells are created
        let numCircles: number = (width + height) / 5;
        //Declaring the minium and maximum size each cell can be
        let maxRadius: number = 20;
        let minRadius: number = 5;
        //define some colours both for the cells themselves and for their nuclei
        let colors: string[] = ["#fbcde2", "#c57ea2", "#f5aacf", "#fdddec"];
        let nucleusColors: string[] = ["#888888", "#373737", "#4a4a4a", "#444444"];
        let numColors: number = colors.length;

        //Define some variables to be passed to the function drawCell after their value is set
        // as well as some other variables to distinguish different cases of cells and devices
        let xPos: number;
        let yPos: number;
        let radius: number;
        let colorIndex: number;
        let color: string;
        let nucleusColor: string;
        let bigCell: boolean;
        let particle: boolean;
        let storage: number = 0;
        let coronaPosition: number = 10;
        let j: number;
        let nParticles: number;

        //To make the picture not too confusing on small screens, the number of cells to be shown is reduced again 

        if (width > 800) {
            numCircles = numCircles;
            j = Math.floor(width / 50);
            nParticles = 800;
        }
        else {
            numCircles = numCircles / 2;
            j = 15;
            nParticles = 150;
        }

        //Create Cells for the Background
        for (let i = 0; i < numCircles; i++) {
            // Creating some random values for circle characteristics.
            xPos = Math.random() * canvas.width;
            yPos = Math.random() * canvas.height;
            radius = minRadius + (Math.random() * (maxRadius - minRadius));
            colorIndex = Math.round(Math.random() * (numColors - 1));
            color = colors[colorIndex];
            nucleusColor = nucleusColors[colorIndex];
            bigCell = false;
            particle = false;

            let position: Vector = new Vector(xPos, yPos);
            let cell: Background = new Background(position);
            cell.draw(position, radius, color, nucleusColor, bigCell, particle);
            smallCells.push(cell);
        }
        //  Create Macrophages
        for (let i = 0; i < 2; i++) {
            let macrophage: Macrophage = new Macrophage();
            macrophage.draw(width - 200 + (100 * Math.random()), 400 + (200 * Math.random()))
        }

        //Create Antibodys
        for (let i = 0; i < 7; i++) {
            xPos = Math.random() * canvas.width / 1.5;
            yPos = 450 + (20 * Math.random());
            if (xPos > width / 2) {
                yPos = yPos + 50;
                xPos = xPos - width / 2 + 10;
            }
            let antibody: Antibody = new Antibody();
            antibody.draw(xPos, yPos);
        }

        //Create bigger Cells for the foreground
        while (storage < width) {
            yPos = 80;
            xPos = storage + 40;
            storage = xPos + 40;
            let position: Vector = new Vector(xPos, yPos);
            let cell: BodyCell = new BodyCell(position);
            cell.draw(position);
            largeCells.push(cell);
        }

        backgroundImage = crc2.getImageData(0, 0, width, height);

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
            corona.draw(position);
            coronas.push(corona);
        }

        for (let i = 0; i < nParticles; i++) {
            xPos = Math.random() * canvas.width;
            yPos = Math.random() * canvas.height;
            // Call draw Cell and commit all needed values for the cell 
            let position: Vector = new Vector(xPos, yPos);
            let cell: Particle = new Particle(position);
            cell.draw(position);
            particles.push(cell);
        }

    }

    function animation(): void {

        crc2.putImageData(backgroundImage, 0, 0);

        for (let particle of particles) {
            particle.move(1 / 50);
            particle.draw(particle.position);
        }

        for (let corona of coronas) {
            corona.move(1 / 50);
            corona.draw(corona.position);
        }

        for (let corona of stopCoronas) {
            corona.draw(corona.position);
        }

        isInfected();

        /* for (let bodyCell of largeCells) {
            bodyCell.move(1 / 20); 
            bodyCell.draw(bodyCell.position);
        } */
    }

    function isInfected(): void {
        for (let corona of coronas) {
            if (corona.isInfected()) {
                startReaction(corona)
            }
        }
    }

    function startReaction(_corona: Corona): void {
        let index: number = coronas.indexOf(_corona);
        stopCoronas.push(_corona); 
        coronas.splice(index, 1);
        window.setTimeout( function(): void {
            endReaction(_corona);
        }, 3000);
    }

    function endReaction(_corona: Corona) {
        let index: number = stopCoronas.indexOf(_corona);
        stopCoronas.splice(index, 1);
        let newPosition: Vector = new Vector (width + 100*Math.random(), 400);

        let newCorona: Corona = new Corona(newPosition);
        newCorona.draw(newPosition);
        coronas.push(newCorona);
    }

}