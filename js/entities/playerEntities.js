/*-------------------
a player entity
-------------------------------- */

//These objects (NormalPlayer,FlyingPlayer) encapsulates the state to of the player object depending on whether
//the player is in a normal state or flying state

CreateDefaultPlayerStateObject = function(_playerEntity) {

	function DefaultPlayerStateClass(playerEntity) {
		
		playerEntity.gravity=0.98;

        // adjust the bounding box
    	playerEntity.updateColRect(1, 48, -1, 0);
	
		this.setWalkAnimation = function() {
		 	playerEntity.setCurrentAnimation("walk");
		}
		
		this.moveLeft = function()
		{
            me.audio.play("Footsetps_single");

			playerEntity.flipX(true);

        	// update the entity velocity
        	playerEntity.vel.x -= playerEntity.accel.x * me.timer.tick;
		}
		
		this.moveRight = function()
		{
            me.audio.play("Footsetps_single");
			
            // unflip the sprite
        	playerEntity.flipX(false);
        	
            // update the entity velocity
        	playerEntity.vel.x += playerEntity.accel.x * me.timer.tick;
		}
		
		this.moveUp = function()
		{
			if (!playerEntity.jumping && !playerEntity.falling) 
        	{
                me.audio.play("jump");
            	// set current vel to the maximum defined value
            	// gravity will then do the rest
            	playerEntity.vel.y = -playerEntity.maxVel.y * me.timer.tick;
            
            	console.log();
            	// set the jumping flag
            	playerEntity.jumping = true;
            
        	}
		}
				
		this.shootSeed = function(lastFlipX, pos_x, pos_y) 
		{
			var shot = new bulletEntity.data(lastFlipX, pos_x+5, pos_y+65, { image: 'birdSeed', spritewidth: 7 });
            me.game.add(shot, 10);
            me.game.sort();
		}
		
		this.getType = function()
		{
			return "default";
		}
		

	}
	
	return new DefaultPlayerStateClass(_playerEntity);

}

CreateFlyingPlayerStateObject = function(_playerEntity) {

	function FlyingPlayerStateClass(playerEntity) {
		
		playerEntity.gravity=0.1;
	    
        // adjust the bounding box
    	playerEntity.updateColRect(1, 48, -1, 0);
		   
		this.setWalkAnimation = function(){
			playerEntity.setCurrentAnimation("ghost_walk");
		}
		
		this.moveLeft = function()
		{
			playerEntity.flipX(true);
        	// update the entity velocity
        	playerEntity.vel.x -= playerEntity.accel.x * me.timer.tick;
		}
		
		this.moveRight = function()
		{
			// unflip the sprite
        	playerEntity.flipX(false);
        	// update the entity velocity
        	playerEntity.vel.x += playerEntity.accel.x * me.timer.tick;
		}
		
		this.moveUp = function()
		{
			playerEntity.vel.y -= (playerEntity.accel.y * me.timer.tick) /3;
		}
		
		this.shootSeed = function(lastFlipX, pos_x, pos_y)  
		{
			var shot = new bulletEntity.data(lastFlipX, pos_x+5, pos_y+40, { image: 'birdSeed', spritewidth: 7 });
            me.game.add(shot, 10);
            me.game.sort();
		}
		
		this.getType = function()
		{
			return "flying";
		}
	}
	return new FlyingPlayerStateClass(_playerEntity);
}

playerEntity1 = entity("mainPlayer", me.ObjectEntity.extend( {
 
    /* -----
 
    constructor
 
    ------ */
 
 	_private : {
		playerState : {},	
	},
	
	togglePlayerState : function(){
		
		console.log("ToggledState");
		if(this._private.playerState.getType() == "default"){
			this._private.playerState = CreateFlyingPlayerStateObject(this);
			
		}
		else if(this._private.playerState.getType() == "flying"){
			
			this._private.playerState = CreateDefaultPlayerStateObject(this);
		}
	
	},
	
	savePlayerDataOnEachTick: function(dataToSave){
		if(this.savedPlayerState.length > 180){
			this.savedPlayerState.shift();
		}
		this.savedPlayerState.push({
			x: dataToSave.x,
			y: dataToSave.y,
			health: dataToSave.health,
			ammo: dataToSave.ammo,
			velX: dataToSave.velX,
			velY: dataToSave.velY,
			flyButtonPressed: dataToSave.flyButtonPressed,
			bulletShot: dataToSave.bulletShot,
			isMoveLeft: dataToSave.isMoveLeft,
			isMoveRight: dataToSave.isMoveRight
		});
	},
	
	rewindPlayerDataOnEachTick: function(){
		if(this.savedPlayerState.length != 0){
			console.log("Length Is: "+this.savedPlayerState.length);
			var localPos = this.savedPlayerState.pop();
			this.pos.x = localPos.x;
			this.pos.y = localPos.y;
			this.health = localPos.health;
			this.ammo = localPos.ammo;
			this.vel.x = localPos.velX;
			this.vel.y = localPos.velY;
			
	        if(localPos.flyButtonPressed){
	    		toggle = true;
	    		this.togglePlayerState();
	    		this._private.playerState.setWalkAnimation();
	    	}
	    	
	        if (localPos.bulletShot) {
			    this.ammo = this.ammo + 1;
	        }
	        
	        if (localPos.isMoveLeft) {
	           	this._private.playerState.moveLeft();
	        }else if (localPos.isMoveRight) {
	            this._private.playerState.moveRight();
	        }
		}
	},
	
    init: function(x, y, settings) {
        // call the constructor
        this.parent(x, y, settings);
        this.savedPlayerState = [];
        if(me.levelDirector.getCurrentLevelId() == localStorage.checkpointLevel && fromMainMenu) {
        	this.pos.x = Number(localStorage.checkpointX);
        	this.pos.y = Number(localStorage.checkpointY);
            //me.game.HUD.setItemValue("score", localStorage.checkpointScore);
       		this.health = Number(localStorage.checkpointHealth);
            this.ammo = Number(localStorage.checkpointAmmo);
    	}else {
            if(fromMainMenu || !localStorage.currentPlayerHealth || !localStorage.currentPlayerAmmo){
            	localStorage.currentPlayerHealth = 100;
            	localStorage.currentPlayerAmmo = 20;
       	    	this.health = 100;
            	this.ammo = 20;
            }else{
            	//Loaded a new level - Retrieve health and ammo from storage
	       		this.health = Number(localStorage.currentPlayerHealth);
	            this.ammo = Number(localStorage.currentPlayerAmmo);
            }
            fromMainMenu = false;
        }

        // set the default horizontal & vertical speed (accel vector)
        this.setVelocity(3, 15);
        
        this.spritewidth = 50;
        this.addAnimation("walk", [0, 1]);
        this.addAnimation("ghost_walk", [2, 3, 4, 5, 6]);
  
		this._private.playerState = CreateDefaultPlayerStateObject(this);

		this._private.playerState.setWalkAnimation();
        
        // set the display to follow our position on both axis
        me.game.viewport.follow(this.pos, me.game.viewport.AXIS.BOTH);
        
        //Rebind keys
        me.input.bindKey(me.input.KEY.UP, "jump", true);
    },
 
    update: function() {
    	if(!this.alive) {
        	this.savedPlayerState = [];
        	this.updateMovement();
    	}
    	
    	//Fixing being able to fly over the lawnmower
    	if(me.levelDirector.getCurrentLevelId() === "level02" && lawnMowerCurrentXPosition != 0){
    		if(lawnMowerCurrentXPosition > this.pos.x){
    			//Reset level
            	me.gamestat.reset();
            	me.levelDirector.reloadLevel();
            	me.game.viewport.fadeOut("#000000", 150);
            	return false;
    		}
    	}
        
        if(me.input.isKeyPressed('rewind')){
			this.rewindPlayerDataOnEachTick();
        }else{
        	var isFlyButtonToggled = me.input.isKeyPressed('toggle_fly');
        	var isBulletShot = me.input.isKeyPressed('shoot') && this.ammo > 0;
        	var isMoveLeft = me.input.isKeyPressed('left');
        	var isMoveRight = me.input.isKeyPressed('right');
        	this.savePlayerDataOnEachTick({
        		x: this.pos.x,
        		y: this.pos.y,
        		health: this.health,
				ammo: this.ammo,
				velX: this.vel.x,
				velY: this.vel.y,
				flyButtonPressed: isFlyButtonToggled,
				bulletShot: isBulletShot,
				isMoveLeft: isMoveLeft,
				isMoveRight: isMoveRight
        	});
        	
	        if(isFlyButtonToggled){
	    		toggle = true;
	    		this.togglePlayerState();
	    		this._private.playerState.setWalkAnimation();
	    	}
	        
	        if (isMoveLeft) {
	           	this._private.playerState.moveLeft();
	        }else if (isMoveRight) {
	            this._private.playerState.moveRight();
	        }else {
	            this.vel.x = 0;
	        }
	        
	        if (me.input.isKeyPressed('jump')) {
	        	me.audio.play("Flap_Loop");
	        	this._private.playerState.moveUp();
	        }
	
	        //shoot regardless of movement
	        if (isBulletShot) {
	            me.audio.play("shoot");
	        	this._private.playerState.shootSeed(this.lastflipX, this.pos.x, this.pos.y);
			    this.ammo = this.ammo - 1;
	        }
	        
	        if(me.input.isKeyPressed('save')){
	        	//Save Game
	        	if(typeof(Storage)!=="undefined"){
	        		localStorage.level = me.levelDirector.getCurrentLevelId();
	        	}
	        } 
	        
	        if(me.input.isKeyPressed('menu')){
		   		me.state.change(me.state.MENU);
	      		me.game.disableHUD(); 
				return false;
	        }     
	     
	        // check & update player movement
	        this.updateMovement();
	     
	        // check for collision
	        var res = me.game.collide(this);
	         
	        if (res) {
	            if (res.obj.type == me.game.ENEMY_OBJECT || res.obj.type == "MovingBlockBullet" || res.obj.type == "lawnmower") {
	                if ((res.y > 0) && !this.jumping && res.obj.type == me.game.ENEMY_OBJECT) {
	                    // bounce (force jump)
	                    this.falling = false;
	                    this.vel.y = -this.maxVel.y * me.timer.tick;
	                    // set the jumping flag
	                    this.jumping = true;
	                    // play some audio
	                    me.audio.play("stomp");
	                }else if(!this.isFlickering()) {
	                    // let's flicker in case we touched an enemy
	                    this.flicker(10);
				        if(res.obj.type == "MovingBlockBullet"){
	                        this.health = this.health - 15;
	                    }
	                    else {
	                        this.health = this.health - res.obj.damage
	                    }
	            
	                    me.game.HUD.setItemValue("health", this.health);
	                }
	
		            if(this.health <= 0) {
		            	me.gamestat.reset();
		            	me.levelDirector.reloadLevel();
		            	me.game.viewport.fadeOut("#000000", 150);
		            	return false;
		            }
		        }
		        
		        if(res.obj.type == "teleporter"){
		        	this.pos.x = res.obj.endX;
		        	this.pos.y = res.obj.endY;
		        }
		
			    if (res.obj.type == "PlayerDeath") {
		        		me.gamestat.reset();
		       			me.levelDirector.reloadLevel();
		        		me.game.viewport.fadeOut("#000000", 150);
					return false;
			    }
		            
		        if(res.obj.type == "Apple") {
		            this.ammo = this.ammo + 5;
		            this.pos.y = this.pos.y - 30;
		            return true;
		        }
		            
		        if(res.obj.type == "Checkpoint") {
		            if(typeof(Storage)!=="undefined") {
		             	localStorage.checkpointLevel = me.levelDirector.getCurrentLevelId();
		       			localStorage.checkpointHealth = this.health;
		                localStorage.checkpointAmmo = this.ammo;
		        		localStorage.checkpointX = this.pos.x;
		        		localStorage.checkpointY = this.pos.y;
		            }
		        }
		    }
		}
		
	    if(me.game.HUD != null){
			me.game.HUD.setItemValue("health", this.health);
	    	me.game.HUD.setItemValue("ammo", this.ammo);
	    }
	    
		// update animation if necessary
		if (this.vel.x != 0 || this.vel.y != 0 || this.isFlickering()) {
			// update objet animation
			this.parent(this);
			return true;
		}
		
		// else inform the engine we did not perform
		// any update (e.g. position, animation)
		return true;  
	}
 
}));

playerEntity.push(playerEntity1);