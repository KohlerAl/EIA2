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
    export function savePicture(_name: string): void {
        let information: PicturePart[] = [];
        information.push()
        for (let figure of figures) {
            let form: PicturePart = {
                "number": figures.indexOf(figure),
                "type": figure.type,
                "active": figure.active,
                "size": figure.size,
                "positionX": Math.floor(figure.position.x),
                "positionY": Math.floor(figure.position.y),
                "rotation": figure.rotation,
                "moveType": figure.moveType,
                "color": figure.color,
                "hitAreaX": figure.hitAreaX,
                "hitAreaY": figure.hitAreaY,
                "velocity": figure.velocity,
            }
            information.push(form);
        }
        sendData(information, _name);
    }

    export async function findPictures(): Promise<void> {
        let response: Response = await fetch(url + "?" + "getPicture=yes");
        let responseText: string = await response.text();
        let pretty: string = responseText.replace(/\\|\[|{|}|"|_id|insertName|]/g, "");
        let prettier: string = pretty.replace(/,,,/g, ",");
        createDatalist(prettier);
    }

    async function sendData(_information: PicturePart[], _name: string): Promise<void> {
        let name: string = _name.replace(" ", "_")
        
        let canvasInfo: string[] = []; 
        let width: string = (Math.floor(canvas.width)).toString();
        let height: string = (Math.floor(canvas.height)).toString();
        console.log(background); 
        canvasInfo.push(width, height, background);
        let canvasLook: string = JSON.stringify(canvasInfo); 
        let canvasQuery: URLSearchParams = new URLSearchParams(canvasLook)

        let info: string = JSON.stringify(_information);
        let query: URLSearchParams = new URLSearchParams(info);
        let response: Response = await fetch(url + "?savePicture&" + name + "&" + canvasQuery.toString() + "&" + query.toString());
        await fetch(url + "?insertName&" + name);

        let responseText: string = await response.text();
        if (responseText != "") {
            alert("Your picture " + _name + " has been saved!")
        }
    }

    function createDatalist(_response: string) {
        let masterpiece: HTMLDataListElement = <HTMLDataListElement>document.getElementById("masterpiece");
        let options: string[] = _response.split(",");
        console.log(options, options.length);

        for (let entry of options) {
            if (entry == "") {
                //Skip this
            }
            else {
                let option: HTMLOptionElement = document.createElement("option");
                option.setAttribute("name", entry);
                option.value = entry;
                masterpiece.appendChild(option); 
            }
        }
    }

    export async function loadPicture(): Promise<void> {
        let name: string = creations.value; 
        let response: Response = await fetch(url + "?" + "findPicture&" + name);
        let responseText: string = await response.text();
        let pretty: string = responseText.replace(/\\|\[|{|}|"|_id|savePicture|]/g, "");
        let removeName: string = pretty.replace(name, ""); 
        let prettier: string = removeName.replace(/,,,/g, ",");
        let data: string[] = prettier.split(",");
        console.log(data, data.length);
    }
}