"use strict";
var L05_Haushaltshilfe;
(function (L05_Haushaltshilfe) {
    async function communicate(_url) {
        console.log("Start");
        let response = await fetch(_url);
        console.log("Response", response);
        let answer = await response.text();
        console.log(answer);
        console.log("End");
    }
    L05_Haushaltshilfe.communicate = communicate;
})(L05_Haushaltshilfe || (L05_Haushaltshilfe = {}));
//# sourceMappingURL=client.js.map