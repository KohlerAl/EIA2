namespace EIA2_EndabgabeV2 {
    export enum FORM_MOVE {
        ROTATE = "rotate",
        MOVE = "move"
    }
    export abstract class Form {
        public color: string;
        public size: Vector;
        public position: Vector;
        public rotation: number;
        public moveType: FORM_MOVE;
        public active: boolean;
        public velocity: Vector = new Vector(5, 5);
        public type: string;
        public neon: boolean;
        public threeD: boolean;

        public constructor(_info?: string[]) {
            this.color = "#ffffff";
            this.size = new Vector(40, 40);
            this.position = new Vector(50, 50);
            this.rotation = 0;
            this.active = true;
            this.moveType = FORM_MOVE.MOVE;
            this.neon = false;
            this.threeD = false;

        }

        public draw(): void {
            if (this.neon == true) {
                crc2.globalCompositeOperation = "lighter";
                crc2.shadowColor = this.color;
                crc2.lineWidth = 8;
                crc2.shadowOffsetX = 2;
                crc2.shadowOffsetY = 2;
                crc2.shadowBlur = 15;
                crc2.strokeStyle = "#ffffff88";
            }
            else if (this.threeD == true) {
                crc2.fillStyle = "414141";
                crc2.shadowBlur = 10;
                crc2.shadowColor = "cyan";
                crc2.shadowOffsetX = -5;
                crc2.shadowOffsetY = 0;
                crc2.lineWidth = 2;
                crc2.strokeStyle = "#ff3a1f80";
                crc2.fill();
            }
            else {
                crc2.strokeStyle = this.color;
                crc2.fillStyle = this.color;
                crc2.lineWidth = 4;
                crc2.fill();
            }
            if (this.active == true) {
                crc2.strokeStyle = "red";
                crc2.lineWidth = 4;
                crc2.stroke();
            }
            else {
                crc2.strokeStyle = this.color;
                crc2.stroke();
            }
        }

        public move(_rotateValue: number): void {
            switch (this.moveType) {
                case FORM_MOVE.MOVE:
                    let offset: Vector = new Vector(this.velocity.x, this.velocity.y);
                    offset.scale(1 / 50);
                    this.position.add(offset);
                    break;
                case FORM_MOVE.ROTATE:
                    this.rotation += _rotateValue;
                    break;
                default:
                    break;
            }

        }
        public restoreFigure(_info: string[]): void {
            if (_info[0] == "true")
                this.setActive(true);
            else
                this.setActive(false);

            this.size = new Vector(parseInt(_info[1]), parseInt(_info[2]));
            this.changePosition(parseInt(_info[3]), parseInt(_info[4]));
            this.changeRotation(parseInt(_info[5]));

            if (_info[6] == "move")
                this.setAnimation(FORM_MOVE.MOVE);
            else
                this.setAnimation(FORM_MOVE.ROTATE);

            this.changeColor(_info[7]);
            this.changeVelocity(parseInt(_info[8]));

            if (_info[10] == "true")
                this.neon = true;

            if (_info[11] == "true")
                this.threeD = true;
        }

        public changeColor(_newColor: string): void {
            this.color = _newColor;
        }

        public changeRotation(_factor: number): void {
            this.rotation = _factor;
        }

        public resize(_factor: number): void {
            this.size.scale(_factor);
        }

        public changePosition(_x: number, _y: number): void {
            this.position.x = _x;
            this.position.y = _y;
        }

        public setActive(_active: boolean): void {
            this.active = _active;
        }

        public setAnimation(_move: FORM_MOVE): void {
            this.moveType = _move;
        }

        public changeVelocity(_speed: number): void {
            this.velocity.x = _speed;
            this.velocity.y = _speed;
        }
    }
}