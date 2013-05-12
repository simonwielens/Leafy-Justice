function gameResourcesNeeded() {
	this.enemies = [];	
	this.maps = [];
	this.items = [];
	this.audio = [];
	this.mapGraphics = [];
	this.screens = [];
	this.backgrounds = [];
	this.hud = [];
	this.players = [];
	this.gameData = [];

	this.addDataToGameData = function addDataToGameData(objectData){
		for(var i = 0; i < objectData.length;i++){
			this.gameData.push(objectData[i]);
		}
	};
	
	this.getGameData = function getGameData(){
		this.gameData = [];
		//Get all data and load them in correctly.
		this.addDataToGameData(this.items);
		this.addDataToGameData(this.maps);
		this.addDataToGameData(this.hud);
		this.addDataToGameData(this.audio);
		this.addDataToGameData(this.players);
		this.addDataToGameData(this.enemies);
		this.addDataToGameData(this.backgrounds);
		this.addDataToGameData(this.mapGraphics);
		this.addDataToGameData(this.screens);
		return this.gameData;
	};
}
var gameResources = new gameResourcesNeeded();