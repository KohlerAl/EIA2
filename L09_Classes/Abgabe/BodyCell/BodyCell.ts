namespace L09_Virus {
    export class BodyCell {
        position: Vector;
        velocity: Vector;
        color: string;
        nucleus: string;

        nucleusPosX: number;
        nucleusPosY: number;

        constructor(_position: Vector, _colorIndex: number) {
            this.position = _position;

            let colors: string[] = ["#1bd080", "#55f6a2", "#54b27d", "#00ab5f", "#891911"];
            let nucleusColors: string[] = ["#888888", "#373737", "#4a4a4a", "#444444", "#4a4a4a"];

            this.nucleusPosX = _position.x + 2;
            this.nucleusPosY = _position.y - (25 * Math.random());
            /* = this.positio;
            this.nucleusPos.y =   this.position.y - (25 * Math.random()) */

            this.color = colors[_colorIndex];
            this.nucleus = nucleusColors[_colorIndex];

            this.velocity = new Vector(0, 5);
            //this.velocity.add();
        }

        draw(_position: Vector): void {
            crc2.save();
            let startAngle = (Math.PI / 180);
            let endAngle = (Math.PI / 180) * 360;

            // Create the Cell itself
            crc2.beginPath();
            crc2.ellipse(_position.x, _position.y, 40, 50, 0, startAngle, endAngle);
            crc2.closePath();
            crc2.strokeStyle = this.color;
            crc2.fillStyle = this.color;

            crc2.stroke();
            crc2.fill();

            //Draw Nucleus 
            //They are not perfect circles, to make them look more naturally
            crc2.beginPath();
            crc2.arc(this.nucleusPosX, this.nucleusPosY, 10, Math.random(), 1.95 * Math.PI);
            crc2.fillStyle = this.nucleus + "66";

            crc2.closePath();
            crc2.fill();

        }

        move(_timeslice: number): void {
            // Offset = Geschwindigkeit
            let offset: Vector = new Vector(this.velocity.x, this.velocity.y);
            // Mit der Zeit multiplizieren
            offset.x *= 0;
            offset.y *= _timeslice;
            // Zu der Posiition addieren 
            this.position.add(offset);

            if (this.position.y < 72)
            this.velocity = new Vector (0, 10); 
            if (this.position.y > 87)
            this.velocity = new Vector (0, -10);
        }
    }
}