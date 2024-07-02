import * as local from "./localStorageInterface.js";

export {
   incrementSolvedCatetegoriesCount,
   gameData,
   metaData,
   categoryByElement,
   fillGameStructures,
   categoryId,
   checkTextOverflow
};

// To other modules and scripts should be read-only excepth through the funcutions below !!
let gameData = {};

const metaData =
   await fetch(`data/metaData.json`)
      .then(response => response.json());

// needs reformatting if we need more than one onresize function
window.onresize = checkTextOverflow;

// TODO: at least capitalize all entries
// alters data
function normalizeFormat(data) {
   data.initial = data.initial.map(row => row.map(title => title.toUpperCase()));
   //data.categories.forEach(c => )
   // TODO: implement format assertions (with assert?)
}




let elementCategory = {};
const categoryId = {};

function fillGameStructures(jsonData) {
   gameData = jsonData;

   // always reset as guesses will be re-'played' and solvedCount will increase to its prior value
   gameData.solvedCategoriesCount = 0;

   if (gameData.guesses === undefined) {
      gameData.guesses = [];
   }
   if (gameData.mistakes === undefined) {
      gameData.mistakes = 0;
   }

   // always empty sleected as sets cannot be serialized
   gameData.selected = new Set();



   gameData.solvedCategoriesCount = 0;

   elementCategory = Object.fromEntries(
      gameData.categories
         .map(c =>
            c.elements
               .map(e => [e, c])
         ).reduce((acc, els) => acc.concat(els), [])
   );

   gameData.categories.forEach((category, id) => {
      categoryId[category.title] = id;
   });
   local.storeGame();

   document.getElementById("author").textContent = "Level designed by " + gameData.author

}

function incrementSolvedCatetegoriesCount() {
   gameData.solvedCategoriesCount++;
   local.storeGame();
}

//TODO refactor into categoryByTitle to reflect behavior better
function categoryByElement(sElement) {
   return elementCategory[sElement];
}

function checkTextOverflow() {

   let terms = document.querySelectorAll(".term-text")

   for (let t of terms) {
      let font = "20px" // hardcoded in tiles.css
      t.style.fontSize = font;

      // while the word is too long 
      while (t.scrollWidth > t.clientWidth) {
         font = parseInt(font.slice(0, 2)) - 1 + "px"
         t.style.fontSize = font;
      }
      t.style.fontSize = parseInt(font.slice(0, 2)) - 2 + "px"

   }
}

