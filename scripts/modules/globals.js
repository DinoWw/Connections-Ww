export {
   solvedCategoriesCount, incrementSolvedCatetegoriesCount,
   selected,
   gameData,
   categoryByElement,
   fillGameStructures,
   categoryId,
   checkTextOverflow
};



const selected = new Set();
let gameData = {};
let solvedCategoriesCount = 0;

// needs reformatting if we need more than one onresize function
window.onresize = checkTextOverflow;

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

   solvedCategoriesCount = 0;

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
}

function incrementSolvedCatetegoriesCount() {
   solvedCategoriesCount++;
   console.log(solvedCategoriesCount)
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

