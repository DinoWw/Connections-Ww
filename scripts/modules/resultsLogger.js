import { json } from "./globals.js";

export { logGuess, emoji };

const guesses = [];

const categoryId = {};

// Ugly, but needed as json is asynchronously loaded and filling categoryId 
//    can't be done on top level
// Restructuring code further could solve this, but i do not deem it important 
//    enough for now
let first = true;
function logGuess(categoryList) {
   if(first){
      json.categories.forEach((category, id) => {
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
         id => emojiByColor(json.categories[id].color)
      ).join("")
   ).join("\n");
}

function emojiByColor(color){
   return String.fromCodePoint(0x1F621);
}