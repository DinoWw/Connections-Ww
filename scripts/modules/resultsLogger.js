import { gameData, categoryId, categoryByElement } from "./globals.js";
import { popUp } from "./popUp.js"

export { logGuess, emoji, clearGuesses };

// TODO: log guesses to localStorage !!

const colorEmoji = {
   "#FFF78D": String.fromCodePoint(0x1F7E8),
   "#A4DCFF": String.fromCodePoint(0x1F7E6),
   "#A173BC": String.fromCodePoint(0x1F7EA),
   "pink": String.fromCodePoint(0x1F7E7),
}


const guesses = [];


// returns false if guessed already, otherwise true
function logGuess(titleList) {

   if (guesses.some(guess => {
      return guess.every(item => {
         return titleList.includes(item)
      }
      )
   })) {
      return false;
   }
   guesses.push(titleList);
   return true;
}

// i broke
function emoji() {

   console.log("gamedata", gameData)
   return guesses.map(
      (guess) => guess.map(
         title => emojiByColor(categoryByElement(title).color)
         // bilo emojiByColor(gameData.categories[categoryByElement(title)].color)
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


function clearGuesses() {
   // clear the array
   guesses.length = 0;
}