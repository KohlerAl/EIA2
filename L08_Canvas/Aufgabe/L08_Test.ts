
namespace L08_Test {

    let canvas: HTMLCanvasElement = <HTMLCanvasElement>document.querySelector("canvas");
    let crc2: CanvasRenderingContext2D = <CanvasRenderingContext2D>canvas.getContext("2d");

    let gradient: CanvasGradient = crc2.createLinearGradient(0, 0, 0, crc2.canvas.height);
    gradient.addColorStop(0, "HSL(0, 50%, 70%)");
    gradient.addColorStop(0.25, "white");

   /*  window.addEventListener("load", createImage);
    window.addEventListener("resize", createImage);

    function createImage(): void {
        
        createBackground();
    }

    function createBackground(): void {
        //To make the Background look more interesting, I create a simple pattern, imitating cells. 
        //The opacity is not very high so that the pattern does not distract 
        let pattern: CanvasRenderingContext2D = <CanvasRenderingContext2D>document.createElement('canvas').getContext('2d');
        pattern.canvas.width = 100;
        pattern.canvas.height = 40;
        pattern.fillStyle = "#97a0db3a";
        pattern.fillRect(0, 0, pattern.canvas.width, pattern.canvas.height);
        pattern.moveTo(0, 20);
        pattern.lineTo(20, 20);
        pattern.lineTo(40, 0);
        pattern.lineTo(60, 0);
        pattern.lineTo(100, 20);
        pattern.lineTo(60, 40);
        pattern.lineTo(40, 40);
        pattern.lineTo(20, 20);

        //Draw the pattern for the cell membranes
        pattern.strokeStyle = "#888888";
        pattern.stroke();
        pattern.closePath();

        //Draw the nuclei 
        pattern.beginPath();
        pattern.arc(50, 20, 2, 0, 2 * Math.PI);
        pattern.fillStyle = "#888888";
        pattern.fill();

        //Since the pattern cuts some cells in half, I draw two semicircles, one at the top and one at the bottom
        //By repeating the pattern, whole circles are created.
        pattern.beginPath();
        pattern.arc(95, 40, 2, 1 * Math.PI, 0);
        pattern.fillStyle = "#888888";
        pattern.fill();

        pattern.beginPath();
        pattern.arc(95, 0, 2, 0 * Math.PI, 1 * Math.PI);
        pattern.fillStyle = "#888888";
        pattern.fill();

        crc2.fillStyle = <CanvasRenderingContext2D>crc2.createPattern(pattern.canvas, "no-repeat");
        crc2.fillRect(0, 0, canvas.width, canvas.height);
    } */
    /* console.log("Hello World");
    let canvas: HTMLCanvasElement = <HTMLCanvasElement>document.querySelector("canvas");
    let crc2: CanvasRenderingContext2D = <CanvasRenderingContext2D>canvas.getContext("2d"); */
    /* crc2.fillStyle = "#81a9e9";
    crc2.fillRect(0, 0, crc2.canvas.width, crc2.canvas.height); */
    /**
     * Parameter 1 in fillRect = Startpunkt auf der y-Achse
     * Parameter 2 in fillRect = Startpunkt auf der x-Achse
     * Das Rechteck wird so aber nicht verschoben, es wird lediglich der Ausschnitt verändert, 
     * der von Canvas angezeigt wird. Canvas selbst bleibt an der gleichen Stelle 
     */

    /* crc2.strokeRect(25, 20, 100, 50);
    //strokeRect erzeugt die Umrisse eines Rechtecks, die Hintergrundfarbe bleibt aber die gleiche
    crc2.clearRect(25, 20, 100, 50); */
    //clearRect "radiert" ein Rechteck in canvas, die Hintergrundfarbe ist die von Canvas

    //Kreis
    /* crc2.beginPath();
    crc2.arc(100, 100, 20, 0, 1.5 * Math.PI); */
    /**
     * context.arc(x,y,r,sAngle,eAngle,counterclockwise)
     * x: x-Koordinate des Kreismittelpunkts
     * y: y-Koordinate des Kreismittelpunkts
     * r: radius des Kreises
     * sAngle: Start-Winkel, 0 = 3Uhr auf dem Kreis 
     * eAngle: End-Winkel
     * counterclockwise: Soll der Kreis im oder gegen den Uhrzeigersinn gezeichnet werden? Default: false
     */
    /* crc2.closePath();
    //Ohne ClosePath() wird der Kreis/die Ellipse nicht geschlosse, die gerade Linie fehlt dann
    crc2.stroke(); */

    //Ellipse
    /** crc2.ellipse(100, 100, 10, 75, Math.PI / 4, 0, 2 * Math.PI);
    *
    * crc2.ellipse(x, y, radiusX, radiusY, rotation, startAngle, endAngle [, anticlockwise]);
    crc2.stroke(); */

    //Dreieck
    /*  crc2.moveTo(10, 10);
     crc2.lineTo(50, 50);
     crc2.stroke();
     crc2.lineTo(100, 10);
     crc2.stroke();
     crc2.lineTo(10, 10);
     crc2.stroke(); */

    //Pfadobjekte
    /* let path: Path2D = new Path2D();
    path.arc(60, 60, 40, 0, 2 * Math.PI);
    crc2.stroke(path); */

    /* let gradient: CanvasGradient = crc2.createLinearGradient(0, 0, 0, 100);

    gradient.addColorStop(0, "black");
    gradient.addColorStop(.3, "red"); 
    gradient.addColorStop(.5, "orange");
    gradient.addColorStop(.8, "yellow");
    gradient.addColorStop(1, "gold");

    crc2.fillStyle = gradient;
    crc2.fillRect(0, 0, 200, 100); */


    //Muster
    /* let pattern: CanvasRenderingContext2D = <CanvasRenderingContext2D>document.createElement('canvas').getContext('2d');
    pattern.canvas.width = 40;
    pattern.canvas.height = 20;

    pattern.fillStyle = "purple";
    pattern.fillRect(0, 0, pattern.canvas.width, pattern.canvas.height);
    pattern.moveTo(0, 10);
    pattern.lineTo(10, 10);
    pattern.lineTo(20, 0);
    pattern.lineTo(30, 0);
    pattern.lineTo(40, 10);
    pattern.lineTo(30, 20);
    pattern.lineTo(20, 20);
    pattern.lineTo(10, 10);
    pattern.stroke();

    crc2.fillStyle = <CanvasRenderingContext2D>crc2.createPattern(pattern.canvas, "repeat");
    crc2.fillRect(0, 0, canvas.width, canvas.height); */

    /* crc2.beginPath();
        crc2.arc(xPosition+40, yPosition+40, 42, 0, 2*Math.PI);
        crc2.arc(xPosition+18, yPosition+12, 36, 0, 2*Math.PI); 
        crc2.arc(xPosition+80, yPosition+52, 34, 0, 2*Math.PI);   
        crc2.fillStyle = "green"; 
        crc2.strokeStyle = "darkgreen"; 
        crc2.closePath(); 
        crc2.fill(); 
        crc2.stroke(); 
        crc2.beginPath(); 
        crc2.arc(xPosition+40, yPosition+40, 7, 0, 2*Math.PI);
        crc2.fillStyle = "darkslategrey";
        crc2.closePath(); 
        crc2.fill();  */
    //Linienstile
    /* crc2.strokeStyle = "#b1695a";
    crc2.strokeRect(20, 20, 150, 100);

    let gradient = crc2.createLinearGradient(0, 0, 170, 0);
    gradient.addColorStop(0, "magenta");
    gradient.addColorStop(0.5, "blue");
    gradient.addColorStop(1, "red");

    // Fill with gradient
    crc2.strokeStyle = gradient;
    crc2.lineWidth = 5;
    crc2.strokeRect(20, 20, 150, 100);
 */
    //Test
    /* let pattern: CanvasRenderingContext2D = <CanvasRenderingContext2D>document.createElement('canvas').getContext('2d');
    pattern.canvas.width = 40;
    pattern.canvas.height = 20;
    for (let i: number = 0; i < 10; i++) {
    let x: number = i/2 + Math.floor(Math.random() * 10);
    let y: number = i/2 + Math.floor(Math.random() * 5);
    let r: number = i +  Math.floor(Math.random() * 7);
    crc2.arc(x, y,r, 0, 1.3 * Math.PI); 
    crc2.closePath(); 
    crc2.stroke(); 
    crc2.moveTo(i, i*2); 
    //crc2.lineTo(x,y); 
    } */



    /* crc2.strokeStyle = "rgb(255, 255, 255)";
    crc2.fillStyle = "white";

    let circles: number = 500; 
    let colors: string[] = ["blue", "lightpurple", "purple", "pink"];
    
    function createCircles(_color: number): void {
            let r: number = Math.random() * 20 + 1;
            let x: number = Math.random() * (innerWidth - r * 2) + r; 
            let y: number = Math.random() * (innerWidth - r * 2) + r;
            let dx: number = (Math.random() - 0.5) * 2; 
            let dy: number = (Math.random() - 0.5) * 2; 
            let circle: Path2D = new Path2D();;
            circle.arc(x,y,dx,dy,r); 
            crc2.stroke(circle);
            crc2.fillStyle = colors[_color]; 
            crc2.fill(); 
    }

    window.addEventListener("load", handleLoad); 
    
    function handleLoad(): void {
        for(let i: number = 0; i < circles; i++) {
            let color: number = Math.floor(Math.random() * colors.length); 
            createCircles(color); 
        }
    } */
    

    /* let width: number = window.innerWidth;
    canvas.setAttribute("width", width + "px");
    let height: number = window.innerHeight;
    canvas.setAttribute("height", height + "px");
    crc2.fillStyle = "#97a0db33";
    crc2.fillRect(0, 0, width, height);

    let numCircles = (width + height) /4 ;
    let maxRadius = 20;
    let minRadius = 5;
    let colors = ["#ccddef", "#59e2ff", "#00bfff", "#7fb0e3"];
    let nucleusColors = ["#88888855", "#37373755", "#4a4a4a55", "#44444455"];
    let numColors = colors.length;

    let xPos: number;
    let yPos: number;
    let radius: number;
    let colorIndex: number;
    let color: string;
    let nucleusColor: string; 

    // A3. CREATE circles.
    for (let n = 0; n < numCircles; n++) {
        // A4. RANDOM values for circle characteristics.
        xPos = Math.random() * canvas.width;
        yPos = Math.random() * canvas.height;
        radius = minRadius + (Math.random() * (maxRadius - minRadius));
        colorIndex = Math.round(Math.random() * (numColors - 1));
        color = colors[colorIndex];
        nucleusColor = nucleusColors[colorIndex]; 

        // A5. DRAW circle.
        drawCircle(crc2, xPos, yPos, radius, color);
    }

    function drawCircle(crc2: CanvasRenderingContext2D, xPos: number, yPos: number, radius: number, color: string) {
        // PARAMETERS for shadow and angles.
        let startAngle = (Math.PI / 180);
        let endAngle = (Math.PI / 180) * 360;
        console.log(endAngle);
        crc2.shadowColor = "gray";
        crc2.shadowOffsetX = 1;
        crc2.shadowOffsetY = 1;
        crc2.shadowBlur = 5;
        let rotation: number = Math.random() * 360;
        console.log(rotation);

        // DRAW CIRCLE
        crc2.beginPath();
        crc2.ellipse(xPos, yPos, radius, radius * Math.random() + radius, rotation, startAngle, endAngle);
        crc2.fillStyle = color +"44";
        crc2.closePath();
        crc2.strokeStyle = color + "77"; 
        crc2.stroke(); 
        crc2.fill();

        //Draw Nucleus 
        crc2.beginPath();
        crc2.arc(xPos, yPos, 3, Math.random(), 1.7 * Math.PI); 
        crc2.fillStyle = nucleusColor; 
        crc2.fill(); 
    } */

    //Ellipse 
    /*
    * crc2.ellipse(100, 100, 10, 75, Math.PI / 4, 0, 2 * Math.PI);
    *
    * crc2.ellipse(x, y, radiusX, radiusY, rotation, startAngle, endAngle [, anticlockwise]);
    crc2.stroke(); */
    /*
    interface Form {
        x: number;
        y: number;
        r: number
    };

    let width: number = 600;
    canvas.setAttribute("width", width + "px");
    let height: number = 300;
    canvas.setAttribute("height", height + "px");

    let ellipses: any[] = [];
    function createEllipse(): void {
        let overlap: boolean = false;
        let ellipse: Form = {
            x: Math.random() * width,
            y: Math.random() * height,
            r: Math.random() * 5
        };

        while (ellipses.length < 10) {
            ellipse = {
                x: Math.random() * width,
                y: Math.random() * height,
                r: Math.random() * 10
            }
            ellipses.push(ellipse);
            crc2.arc(ellipse.x, ellipse.y, ellipse.r * 2, 0, 2 * Math.PI);
            crc2.fillStyle = "#b8a5ba91";
            crc2.fill();
            //crc2.strokeStyle = "hsl(0, 255, 150, 100)";
            //crc2.stroke();

         for (let j = 0; j < ellipses.length, j++;) {
                let distance1: number = ellipse.x + ellipses[j]["x"];
                let distance2: number = ellipse.y + ellipses[j]["y"];
                let distance3: number = ellipse.r + ellipses[j]["r"];
                console.log(distance1, distance2, distance3); 
                console.log("HEllo");
            } 
        }
        console.log(ellipses);
    }
    createEllipse();*/

       /*  let xPos: number = 300; 
        let yPos: number = height/2; 
        crc2.beginPath();
        crc2.moveTo(xPos, yPos+20); 
        crc2.quadraticCurveTo(xPos, yPos+50, xPos+40, yPos+80); 
        crc2.moveTo(xPos+40, yPos+80); 
        crc2.quadraticCurveTo(xPos+80, yPos+70, xPos+120, yPos+90); 
        crc2.moveTo(xPos+120, yPos+90); 
        crc2.quadraticCurveTo(xPos+180, yPos+130, xPos+140, yPos+20); 
        crc2.moveTo(xPos+140, yPos+20); 
        crc2.quadraticCurveTo(xPos+140, yPos-80, xPos+30, yPos-50); 
        crc2.moveTo(xPos+30, yPos-50); 
        crc2.quadraticCurveTo(xPos-20, yPos-20, xPos, yPos+20); 
        crc2.stroke(); 
        
        crc2.fill(); 
        crc2.closePath(); */

}