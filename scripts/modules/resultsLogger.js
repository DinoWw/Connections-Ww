import { gameData } from "./globals.js";

export { logGuess, emoji };

const colorEmoji = {
   "#FFF78D": String.fromCodePoint(0x1F7E8),
   "#A4DCFF": String.fromCodePoint(0x1F7E6),
   "#A173BC": String.fromCodePoint(0x1F7EA),
   "pink": String.fromCodePoint(0x1F7E7),
}


const guesses = [];

const categoryId = {};

// Ugly, but needed as gameData is asynchronously loaded and filling categoryId 
//    can't be done on top level
// Restructuring code further could solve this, but i do not deem it important 
//    enough for now
let first = true;
function logGuess(categoryList) {
   if (first) {
      gameData.categories.forEach((category, id) => {
         categoryId[category.title] = id;
      });
      first = false;
   }
   const guess = categoryList.map(category => categoryId[category]);
   guesses.push(guess);
}


function emoji() {
   return guesses.map(
      (guess) => guess.map(
         id => emojiByColor(gameData.categories[id].color)
      ).join("")
   ).join("<br/>");
}

function emojiByColor(color) {
   const square = colorEmoji[color];
   if (square != undefined) {
      return square
   }
   return String.fromCodePoint(0x1F621);
}