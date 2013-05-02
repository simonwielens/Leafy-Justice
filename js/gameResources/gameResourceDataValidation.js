function neededMelonJsGameData(){
	this.gameData = [];
	this.player = [];
	this.enemies = [];
	this.items = [];
	this.background = [];
	this.map = [];
	this.hud = [];
	this.audio = [];
	this.tiles = [];
	this.titleScreen = [];
	this.error = [];
	
	this.checkError = function checkError(objectArray, section){
		var i = 0;
		var returnValue = false;
		if(typeof section === "undefined"){
			section = "Unknown Section";
		}
		for(i = 0; i < objectArray.length; i++){
			//Check if object is undefined
			if(typeof objectArray[i] === "undefined"){
				this.error.push("Error occured in "+section);
				returnValue = true;
			}
			
			//Check if needed attributes are undefined
			if(typeof objectArray[i].name === "undefined"){
				this.error.push("Error occured in "+section+"'s name");
				returnValue = true;
			}
			
			//Check if needed attributes are undefined
			if(typeof objectArray[i].type === "undefined"){
				this.error.push("Error occured in "+section+"'s type");
				returnValue = true;
			}
			
			//Check if needed attributes are undefined
			if(typeof objectArray[i].src === "undefined"){
				this.error.push("Error occured in "+section+"'s source");
				returnValue = true;
			}

			if(returnValue){
				break;
			}
		}
		return returnValue;
	};
	
	this.addMap = function addMap(map, tiles, mapName, tilesName){
		if(typeof mapName === "undefined"){
			mapName = "Map";
		}
		if(typeof tilesName === "undefined"){
			tilesName = "Tiles";
		}
		if(this.checkError(map, mapName)||this.checkError(tiles, tilesName)){
			return;
		}
		
		//Set map and tiles data here
		this.map.push(map);
		this.tiles.push(tiles);
	};
	
	this.addHud = function addHud(hud, hudName){
		if(typeof hudName === "undefined"){
			hudName = "Hud";
		}
		if(this.checkError(hud, hudName)){
			return;
		}
		
		//Set map and tiles data here
		this.hud.push(hud);
	};
	
	this.addAudio = function addAudio(audio, audioName){
		if(typeof audioName === "undefined"){
			audioName = "Audio";
		}
		if(this.checkError(audio, audioName)){
			return;
		}
		
		//Set map and tiles data here
		this.audio.push(audio);
	};
	
	this.addPlayer = function addPlayer(player){
		if(this.checkError(player, "Player")){
			return;
		}
		
		//Set player data here
		this.player.push(player);
	};
	
	this.addEnemy = function addEnemy(enemy, enemyName){
		if(typeof enemyName === "undefined"){
			enemyName = "Enemy";
		}
		if(this.checkError(enemy, enemyName)){
			return;
		}
		
		//Set enemy data here
		this.enemies.push(enemy);
	};
	
	this.addBackground = function addBackground(background, backgroundName){
		if(typeof backgroundName === "undefined"){
			backgroundName = "Background";
		}
		if(this.checkError(background, backgroundName)){
			return;
		}
		
		//Set background data here
		this.background.push(background);
	};
	
	this.addItem = function addItem(item, itemName){
		if(typeof itemName === "undefined"){
			itemName = "Item";
		}
		if(this.checkError(item, itemName)){
			return;
		}
		
		//Set item data here
		this.items.push(item);
	};
	
	this.addTitleScreen = function addTitleScreen(titleScreen, titleScreenName){
		if(typeof titleScreenName === "undefined"){
			titleScreenName = "Item";
		}
		if(this.checkError(titleScreen, titleScreenName)){
			return;
		}
		
		//Set item data here
		this.titleScreen.push(titleScreen);
	};
	
	this.addDataToGameData = function addDataToGameData(objectData){
		var i = 0;
		for(i = 0; i < objectData.length;i++){
			this.gameData.push(objectData[i]);
		}
	};
	
	this.returnGameData = function returnGameData(){
		this.gameData = [];
		//Get all data and load them in correctly.
		this.addDataToGameData(this.tiles);
		this.addDataToGameData(this.map);
		this.addDataToGameData(this.hud);
		this.addDataToGameData(this.audio);
		this.addDataToGameData(this.player);
		this.addDataToGameData(this.enemies);
		this.addDataToGameData(this.background);
		this.addDataToGameData(this.items);
		this.addDataToGameData(this.titleScreen);
		return this.gameData;
	};

	this.getGameData = function getGameData(){
		var i = 0;
		var gameData = [];
		if(this.error.length > 0){
			for(i = 0; i < this.error.length; i++){
				document.write(this.error[i]);
			}
		}else{
			gameData = this.returnGameData();
		}
		return gameData;
	};
}

function gameResourceData(name, source){
	return {
		name: name,
		type: "image",
		src: source
	};
}

function gameResourceTileData(name, source){
	return {
		name: name,
		type: "tmx",
		src: source
	};
}

function gameResourceAudioData(settings){
	return {
		name: settings.name,
		type: "audio",
		src: typeof settings.source !== 'undefined' ? settings.source : "data/audio/",
		channel: typeof settings.channel !== 'undefined' ? settings.channel : 1
	};
}

var gameResources = new neededMelonJsGameData();