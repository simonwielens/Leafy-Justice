var level = "level1";

/* the in game stuff*/
var PlayScreen = me.ScreenObject.extend({ 
    onResetEvent: function() {    
    	// play the audio track
       // me.audio.playTrack("DST-InertExponent");
        
        // load a level
        me.levelDirector.loadLevel(level);
 
        // add a default HUD to the game manager
        me.game.addHUD(0, 430, 640, 60);
 
        // add a new HUD item
        me.game.HUD.addItem("ammo", new AmmoObject(620, 10));
        me.game.HUD.addItem("health", new HealthObject(120, 10));
 
        // make sure everything is in the right order
        me.game.sort();
 
    },
 
    /* ---
 
    action to perform when game is finished (state change)
 
    --- */
    onDestroyEvent: function() {
        // remove the HUD
        me.game.disableHUD(); 
        // stop the current audio track
        me.audio.stopTrack();
    }
 
});