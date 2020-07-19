namespace EIA2_Endabgabe {
    export class Moon extends Form {

        constructor(_info?: string[]) {
            if (_info)
                super(_info);
            else
                super();
            this.type = "Moon";
        }

        public draw(): void {
            crc2.beginPath();
            crc2.save();
            crc2.translate(this.position.x, this.position.y);
            crc2.rotate(this.rotation * Math.PI / 180);
            crc2.arc(0, 0, this.size.x, 0, 2 * Math.PI);
            crc2.globalCompositeOperation = "lighter";
            crc2.shadowColor = "#ffffff66";
            crc2.lineWidth = 4;
            crc2.shadowOffsetX = 5; 
            crc2.shadowOffsetY = 5; 
            crc2.shadowBlur = 10; 
            if (this.active == true) {
                crc2.strokeStyle = "red";;
                crc2.stroke();
            }
            else {
                crc2.strokeStyle = this.color;
                crc2.stroke();
            }
            crc2.restore();
            crc2.closePath();

            /* crc2.beginPath(); 
            crc2.save();
            crc2.translate(this.position.x, this.position.y);
            crc2.rotate(this.rotation* Math.PI / 180); 
            crc2.arc(this.size.x/4, this.size.x/4, this.size.x/1.5, 0, 2 * Math.PI);
            crc2.globalAlpha = 0.1;
            crc2.fillStyle = "#000000";
            crc2.fill(); 
            crc2.restore(); 
            crc2.closePath();  */
        }

        public changeColor(_newColor: string): void {
            super.changeColor(_newColor);
        }

        public changePosition(_x: number, _y: number) {
            super.changePosition(_x, _y);
        }

        public changeRotation(_factor: number) {
            super.changeRotation(_factor);
        }

        public resize(_factor: number) {
            super.resize(_factor);
        }

        public move(): void {
            super.move(1);
            if (this.position.x < this.size.x)
                this.position.x += crc2.canvas.width;
            if (this.position.y < this.size.y)
                this.position.y += crc2.canvas.height;
            if (this.position.x > crc2.canvas.width - this.size.x)
                this.position.x -= crc2.canvas.width;
            if (this.position.y > crc2.canvas.height - this.size.y)
                this.position.y -= crc2.canvas.height;
        }
    }
}