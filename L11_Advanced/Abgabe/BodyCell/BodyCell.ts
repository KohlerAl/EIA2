namespace L11_Virus {
    export enum STATE_BODYCELL {
        NORMAL = "normal",
        INFECTED = "infected",
        KILLED = "killed"
    }

    export class BodyCell extends Cell {

        private color: string;
        private nucleus: string;

        private nucleusPosX: number;
        private nucleusPosY: number;

        public status: STATE_BODYCELL;

        constructor(_position: Vector, _isInfected?: STATE_BODYCELL) {
            super(_position);

            if (_isInfected) {
                this.status = _isInfected;
            }
            else {
                this.status = STATE_BODYCELL.NORMAL;
            }

            let colorIndex = Math.round(Math.random() * 3);
            let colors: string[] = ["#1bd080", "#55f6a2", "#54b27d", "#00ab5f"];
            this.color = colors[colorIndex];

            this.nucleusPosX = this.position.x + 2;
            this.nucleusPosY = this.position.y - 2;

            this.nucleus = "#888888";

            this.velocity.add(new Vector(0, 12));
        }

        public set task(_status: STATE_BODYCELL) {
            this.status = _status;
        }

        public draw(): void {
            if (this.status == STATE_BODYCELL.INFECTED) {
                this.color = "#891911"
            }

            else if (this.status == STATE_BODYCELL.KILLED) {
                this.color = "#000000"
            }

            crc2.save();
            let startAngle = (Math.PI / 180);
            let endAngle = (Math.PI / 180) * 360;

            // Create the Cell itself
            crc2.beginPath();
            crc2.ellipse(this.position.x, this.position.y, 40, 50, 0, startAngle, endAngle);
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

        public move(_timeslice: number): void {
            super.move(_timeslice);

            if (this.position.y < 72)
                this.velocity = new Vector(0, 10);
            if (this.position.y > 87)
                this.velocity = new Vector(0, -10);
        }
    }
}