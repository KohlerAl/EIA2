namespace L04_Haushaltshilfe {
    console.log("InterfacesL04 ready"); 

    export interface Item {
        name: string; 
        unit: string; 
        price: number; 
    }

    export interface Data {
        [category: string]: Item[]; 
    }
}