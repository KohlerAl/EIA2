namespace L11_Virus {
    export enum STATE_CORONA {
        NORMAL = "normal",
        INFECTING = "infecting",
        PASSIVE = "passive"
    }
    export class Corona extends Cell {

        public status: STATE_CORONA;
        target: Vector;

        constructor(_position: Vector, _status?: STATE_CORONA, _target?: Vector) {
            super(_position);
            this.velocity.random(30, 80);

            if (_status) {
                this.status = _status;
            }
            else {
                this.status = STATE_CORONA.NORMAL;
            }

            if (_target)
                this.target = _target;

            this.type = "Corona";
        }

        public set task(_status: STATE_CORONA) {
            this.status = _status;
        }

        public draw(): void {
            crc2.save();
            crc2.translate(this.position.x, this.position.y);

            for (let i = 0; i < 7; i++) {
                crc2.beginPath();
                crc2.rotate(45);
                crc2.moveTo(0, 25);
                crc2.lineTo(0, 30);
                crc2.strokeStyle = "#777777";
                crc2.lineWidth = 3;
                crc2.stroke();
                crc2.closePath();
                crc2.beginPath();
                crc2.arc(0, 30, 8, 0, 1 * Math.PI);
                crc2.fillStyle = "#cb341a";
                crc2.fill();
            }
            crc2.beginPath();
            crc2.arc(0, 0, 25, 0, 2 * Math.PI);
            crc2.fillStyle = "#ae2d16";
            crc2.fill();
            crc2.closePath();
            crc2.restore();
        }

        public move(_timeslice: number): void {

            if (this.target) {
                let move: Vector = Vector.getDifference(this.target, this.position);
                move.scale(0.01);
                this.position.add(move);
            }
            else {
                switch (this.status) {
                    case STATE_CORONA.INFECTING:
                        break;
                    case STATE_CORONA.PASSIVE:
                        super.move(_timeslice * 2);
                        break;
                    default:
                        super.move(_timeslice);
                }
            }

            if (this.position.x < - 30)
                this.position.x += crc2.canvas.width;
            if (this.position.y < - 30)
                this.position.y += crc2.canvas.height;
            if (this.position.x > crc2.canvas.width + 30)
                this.position.x -= crc2.canvas.width;
            if (this.position.y > crc2.canvas.height + 30)
                this.position.y -= crc2.canvas.height;

        }

        public isInfected(): boolean {
            if (this.position.y < 125) {
                return true;
            }
            else {
                return false;
            }
        }
    }
}