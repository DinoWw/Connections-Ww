//import { metaData } from "./globals.js";
import { gameData, metaData } from "./globals.js";

export { loadGame, storeGame };



function loadGame(gameName) {
    return JSON.parse(localStorage.getItem(gameName));
}

// TODO:
function storeGame() {
    console.log(metaData, gameData)
    let fileName = metaData.visibleGames[gameData.title];
    if (fileName === undefined) fileName = metaData.invisibleGames[gameData.title];
    if (fileName === undefined) throw new Error("cannot save game state to localstorage");

    localStorage.setItem(fileName, JSON.stringify(gameData));

}

