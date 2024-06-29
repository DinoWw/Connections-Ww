export { selected, gameData, categoryByElement};



const selected = new Set();
const gameData = {};


const onGameDataLoaded = new Event("gamedataloaded");
await fetch('data/game2.json').then(async response => {

   // update so reference passed to buttonFunctions doesn't break
   // TODO: gamedata = data? mayb
   await response.json().then((data) => {
		for (let key in data) {
         gameData[key] = data[key];
      }
   });

}).then(() => {
	setTimeout(() => {
		window.dispatchEvent(onGameDataLoaded);
	}, 50);
});


const elementCategory = Object.fromEntries(
	gameData.categories
	.map(c => 
		c.elements
		.map(e => [e, c])
	).reduce((acc, els) => acc.concat(els), [])
);






function categoryByElement(sElement) {
    return elementCategory[sElement];
    //return elementCategory[sElement];
}