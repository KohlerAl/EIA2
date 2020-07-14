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
        sendData(information, _name);
    }

    export async function findPictures(): Promise<void> {
        let response: Response = await fetch(url + "?" + "getPicture=yes"); 
        let responseText: string = await response.text(); 
        let pretty: string = responseText.replace(/\\|{|}|"|_id|insertName/g, ""); 
        let prettier: string = pretty.replace(/,,,/g , "|"); 
        console.log(prettier);

        createDatalist(pretty); 
    }

    async function sendData(_information: PicturePart[], _name: string): Promise<void> {
        let name: string  = _name.replace(" ", "_")
        console.log(name); 
        let info: string = JSON.stringify(_information); 
        let query: URLSearchParams = new URLSearchParams(info); 
        let response: Response = await fetch(url + "?savePicture&" + name + "&" + query.toString());
        await fetch(url + "?insertName&" + name );
        
        let responseText: string = await response.text();
        if(responseText != "") {
            alert("Your picture " + _name + " has been saved!")
        }
    }

    function createDatalist(_response: string) {

        let creations: HTMLInputElement = <HTMLInputElement>document.getElementById("creations"); 
        let masterpiece: HTMLDataListElement = <HTMLDataListElement>document.getElementById("masterpiece"); 
        
        for(let entry of _response){
            let option: HTMLOptionElement = document.createElement("option");
            switch(entry) {
                case("_"):
                option.innerHTML += "<br>" + "Bestell-ID: " + entry ; 
                break;
                case("["):
                break; 
                case("]"): 
                break; 
                case(","): 
                option.innerHTML += "<br>"; 
                break; 
                case(":"):
                option.innerHTML += entry + " "; 
                break; 
                default:
                option.innerHTML += "" + entry ; 
                break; 
                }
            
        }
        /* let group: HTMLDivElement = document.createElement("div");
        let input: HTMLInputElement = document.createElement("input");
        input.setAttribute("list", _product + "s");
        input.setAttribute("placeholder", "Supermarkt auswählen");
        input.name = _product;
        let datalist: HTMLDataListElement = document.createElement("datalist");
        datalist.id = _product + "s";
        for (let item of _elements) {
            let option: HTMLOptionElement = document.createElement("option");
            option.setAttribute("name", item.name);
            option.value = item.name;

            group.appendChild(input);
            group.appendChild(datalist);
            datalist.appendChild(option);

        } */
    }
}