namespace EIA2_Endabgabe {
    export class Line extends Form {
        constructor(_info?: string[]) {
            if (_info)
                super(_info);
            else
                super();
            this.size = new Vector(0, 100);
            this.type = "Line";
        }

        public draw(): void {
            crc2.beginPath();
            crc2.save();
            crc2.translate(this.position.x, this.position.y);
            crc2.rotate(this.rotation * Math.PI / 180);
            crc2.moveTo(0, 0 - this.size.y / 2);
            crc2.lineTo(0, 0 + this.size.y / 2);
            super.draw();
            crc2.fillStyle = this.color;
            crc2.stroke();
            crc2.restore();
            crc2.closePath();
        }

        public changeColor(_newColor: string): void {
            super.changeColor(_newColor);
        }

        public changePosition(_x: number, _y: number): void {
            super.changePosition(_x, _y);
        }

        public changeRotation(_factor: number): void {
            super.changeRotation(_factor);
        }

        public resize(_factor: number): void {
            super.resize(_factor);
        }

        public move(): void {
            super.move(1);
            if (this.position.x < 0)
                this.position.x += crc2.canvas.width;
            if (this.position.y < 0)
                this.position.y += crc2.canvas.height;
            if (this.position.x > crc2.canvas.width)
                this.position.x -= crc2.canvas.width;
            if (this.position.y > crc2.canvas.height)
                this.position.y -= crc2.canvas.height;
        }
    }
}