import { gameData, categoryId } from "./globals.js";

export { logGuess, emoji, clearGuesses };

// TODO: log guesses to localStorage !!

const colorEmoji = {
   "#FFF78D": String.fromCodePoint(0x1F7E8),
   "#A4DCFF": String.fromCodePoint(0x1F7E6),
   "#A173BC": String.fromCodePoint(0x1F7EA),
   "pink": String.fromCodePoint(0x1F7E7),
}


const guesses = [];


function logGuess(categoryList) {
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


function clearGuesses(){
   // clear the array
   guesses.length = 0;
}