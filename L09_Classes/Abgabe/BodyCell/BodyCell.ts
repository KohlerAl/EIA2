namespace L09_Virus {
    export class BodyCell {
        position: Vector;
        velocity: Vector;
        color: string;
        nucleus: string;
        radiusY: number;

        nucleusPosX: number;
        nucleusPosY: number;

        constructor(_position: Vector) {
            this.position = _position;

            let colors: string[] = ["#1bd080", "#55f6a2", "#54b27d", "#00ab5f"];
            let nucleusColors: string[] = ["#888888", "#373737", "#4a4a4a", "#444444"];
            let numColors: number = colors.length;
            let colorIndex: number;

            this.nucleusPosX = _position.x + 2;
            this.nucleusPosY = _position.y - (25 * Math.random());
            /* = this.positio;
            this.nucleusPos.y =   this.position.y - (25 * Math.random()) */

            this.radiusY = 40 * Math.random();

            colorIndex = Math.round(Math.random() * (numColors - 1));
            this.color = colors[colorIndex];
            this.nucleus = nucleusColors[colorIndex];

            this.velocity = new Vector(0, 2);
            //this.velocity.add();
        }

        draw(_position: Vector): void {
            crc2.save();
            let startAngle = (Math.PI / 180);
            let endAngle = (Math.PI / 180) * 360;

            // Create the Cell itself
            crc2.beginPath();
            crc2.ellipse(_position.x, _position.y, 40, this.radiusY + 40, 0, startAngle, endAngle);
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

            if (this.position.y < 75)
                offset.y = Math.abs(offset.y);
            if (this.position.y > 85)
                offset.y = -1 * offset.y;
        }
    }
}