namespace L04_Haushaltshilfe {

    export interface Item {
        name: string; 
        unit: string; 
        price: number; 
    }

    export interface Data {
        [category: string]: Item[]; 
    }
}