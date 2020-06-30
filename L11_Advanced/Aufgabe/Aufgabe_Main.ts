namespace L11_Aufgabe {
    export let canvas: HTMLCanvasElement;
    export let crc2: CanvasRenderingContext2D;
    export let width: number;
    export let height: number;

    
    let cells: Cell[] = [];

    window.addEventListener("load", createImage);

    function createImage(): void {
        canvas = <HTMLCanvasElement>document.querySelector("canvas");
        crc2 = <CanvasRenderingContext2D>canvas.getContext("2d");
        createCells();
        window.setInterval(animation, 20);
    }

    function createCells(): void {
        let xPos: number;
        let yPos: number;
        let storage: number = 0;
        for (let x: number = 0; x < 10; x++) {
            yPos = 80;
            xPos = storage + 40;
            storage = xPos + 40;
            let position: Vector = new Vector(xPos, yPos);
            let cell: BodyCell = new BodyCell(position, false);
            cell.draw();
            cells.push(cell);
        }

    }

    function animation(): void {
        crc2.fillStyle = "white"; 
        crc2.fillRect(0, 0, 360, 560); 
        for (let cell of cells) {
            cell.move(1/10); 
            cell.draw(); 
            //cell.setColor(); 
        }
    }
}