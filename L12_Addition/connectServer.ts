namespace EIA2_Endabgabe {
    let url: string = "https://agkeia.herokuapp.com/";

    export interface PicturePart {
        number: number, 
        type: string, 
        active: boolean, 
        size: Vector, 
        positionX: number, 
        positionY: number, 
        rotation: number, 
        moveType: FORM_MOVE, 
        color: string, 
        hitAreaX: Vector, 
        hitAreaY: Vector, 
        velocity: Vector
    }
    export function savePicture(): void {
        let information: PicturePart[] = [];
        for (let figure of figures) {
            let form: PicturePart = {
                "number" : figures.indexOf(figure),
                "type" : figure.type, 
                "active" : figure.active,
                "size" : figure.size, 
                "positionX" : Math.floor(figure.position.x),
                "positionY" : Math.floor(figure.position.y),
                "rotation" : figure.rotation, 
                "moveType" : figure.moveType, 
                "color" : figure.color, 
                "hitAreaX" : figure.hitAreaX, 
                "hitAreaY" : figure.hitAreaY, 
                "velocity" : figure.velocity, 
            }

            information.push(form); 
            
        }

        console.log(information); 
        sendData(information);
    }

    export async function findPictures(): Promise<void> {
        console.log("called"); 
        let response: Response = await fetch(url + "?" + "getPicture=yes"); 
        let responseText: string = await response.text(); 
        let pretty: string = responseText.replace(/\\|{|}|"|/g, ""); 
        console.log(pretty);

    }
    async function sendData(_information: PicturePart[]): Promise<void> {
        let info: string = JSON.stringify(_information); 
        console.log(info)
        let query: URLSearchParams = new URLSearchParams(info); 
        let response: Response = await fetch(url + "?" + query.toString());
        let responseText: string = await response.text();
        console.log(responseText); 
    }
}