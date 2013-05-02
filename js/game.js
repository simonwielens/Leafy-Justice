var playScreenGlobalObject;

var game = {	
	/* ---
	
		Initialize the jsApp
		
		---			*/
	onload: function onload(){
		
		// init the video
		if (!me.video.init('gameDiv', 640, 480, false, 1.0))
		{
			alert("Sorry but your browser does not support html 5 canvas.");
			return;
		}
				
		// initialize the "audio"
		me.audio.init("mp3");
		
		// set all resources to be loaded
		me.loader.onload = this.loaded.bind(this);
		
		// set all resources to be loaded
		me.loader.preload(gameResources.getGameData());

		// load everything & display a loading screen
		me.state.change(me.state.LOADING);
	},
	
	
	/* ---
	
		callback when everything is loaded
		
		---										*/
	loaded: function loaded()	{
		var i = 0;
		
		// set the "Play/Ingame" Screen Object
	    me.state.set(me.state.MENU, new TitleScreen());
		
	    // set the "Play/Ingame" Screen Object
		playScreenGlobalObject = new PlayScreen();
		me.state.set(me.state.PLAY, playScreenGlobalObject);
		
		me.state.set(STORY_STATE, new StoryScreen());
	    
	   
	    
		// set a global fading transition for the screen
	    me.state.transition("fade", "#FFFFFF", 250);
		
	    // Add Player Entities to the entity pool
		this.addEntity(playerEntity);
		
	   	    
	    me.entityPool.add("StoryEntity", StoryEntity);
	   
		// Add Item Entities to the entity pool
		this.addEntity(itemEntity);

		// Add Enemy Entities to the entity pool
		this.addEntity(enemyEntity);
		
		this.addEntity(lawnmowerEntity);
		// Add Checkpoint Entity to the entity pool
		//this.addEntity(checkpointEntity);

	             
		// enable the keyboard
		this.controls();
		
		// display the menu title
	    me.state.change(me.state.MENU);
	},
	
	addEntity: function addEntity(entityArray){
		var i = 0;
		for(i = 0; i < entityArray.length; i++){
			me.entityPool.add(entityArray[i].name, entityArray[i].data);
		}
	},
	
	controls: function controls(){
		me.input.bindKey(me.input.KEY.LEFT,  "left");
		me.input.bindKey(me.input.KEY.RIGHT, "right");
		me.input.bindKey(me.input.KEY.UP,     "jump", true);
		me.input.bindKey(me.input.KEY.S, 	 "save", true);
		me.input.bindKey(me.input.KEY.F, 	 "toggle_fly", true);
		me.input.bindKey(me.input.KEY.SPACE, 	"shoot", true);
	}

};

//Load when HTML loads
window.onReady(function(){
	game.onload();
});