export { 
   solvedCategoriesCount, incrementSolvedCatetegoriesCount, 
   selected, 
   gameData, 
   categoryByElement, 
   fillGameStructures,
   categoryId
};



const selected = new Set();
let gameData = {};
let solvedCategoriesCount = 0;


// alters data
function normalizeFormat(data) {
   data.initial = data.initial.map(row => row.map(title => title.toUpperCase()));
   //data.categories.forEach(c => )
   // TODO: implement format assertions (with assert?)
}




let elementCategory = {};
const categoryId = {};

function fillGameStructures(jsonData){
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

function incrementSolvedCatetegoriesCount(){
   solvedCategoriesCount ++;
   console.log(solvedCategoriesCount)
}

function categoryByElement(sElement) {
    return elementCategory[sElement];
    //return elementCategory[sElement];
}


