namespace lektion04 {
    export interface Item {
        name: string;
        amount: number;
        lastBought: string; 
        comment: string;
        checked: boolean; 
    }

    export interface Entry {
        [category: string]: Item[];
    }

    export let data: Entry = {
        entries: [
            { name: "Nudeln", amount: 2, lastBought: "28.08.2022", comment: "Barilla", checked: false },
            { name: "Eier", amount: 10, lastBought: "25.08.2022", comment: "Freilandhaltung", checked: true },
            { name: "Äpfel", amount: 5, lastBought: "25.08.2022", comment: "zum backen", checked: true }
        ]
    }; 
}