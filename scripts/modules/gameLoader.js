import { gameData } from "./globals.js";

export {loadGame};




async function loadGame(gameName){
    await fetch(`data/${gameName}.json`).then(async response => {
        await response.json().then((data) => {
            normalizeFormat(data);
            gameData = data;
        });
    });
}