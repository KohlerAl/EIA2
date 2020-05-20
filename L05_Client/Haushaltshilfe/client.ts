namespace L05_Haushaltshilfe {
export async function communicate(_url: RequestInfo): Promise<void> {
    console.log("Start"); 
    let response: Response = await fetch(_url);
    console.log("Response", response);
    let answer: string = await response.text(); 
    console.log(answer); 
    console.log("End");
}

}