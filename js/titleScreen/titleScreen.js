/*----------------------
 
    A title screen
 
  ----------------------*/

var fromMainMenu = false;

var TitleScreen = me.ScreenObject.extend({
    // constructor
    init: function() {
        this.parent(true);
 
        // title screen image
        this.title = null;
 
        this.font = null;
        this.scrollerfont = null;
        this.scrollertween = null;
 
        this.scroller = "";
        this.scrollerpos = 600;
        this.menuLength = 0;
        this.menu = ["NewGame", "LoadGame"];
    },
 
    // reset function
    onResetEvent: function() {
        if (this.title == null) {
            // init stuff if not yet done
            this.title = me.loader.getImage("titleScreen");
            // font to display the menu items
            this.font = new me.BitmapFont("32x32_font", 32);
            this.font.set("left");
 
            // set the scroller
            this.scrollerfont = new me.BitmapFont("32x32_font", 32);
            this.scrollerfont.set("left");
        }
 
        // reset to default value
        this.scrollerpos = 640;
 
        // a tween to animate the arrow
        this.scrollertween = new me.Tween(this).to({
            scrollerpos: -2200
        }, 10000).onComplete(this.scrollover.bind(this)).start();

        // enable the keyboard
        me.input.bindKey(me.input.KEY.ENTER, "enter", true);
        me.input.bindKey(me.input.KEY.UP, "up", true);
        me.input.bindKey(me.input.KEY.DOWN, "down", true);
 
        //TODO: Add different bird signing pitches for when they load or start a game
        // play something
        me.audio.play("cling");
		
		me.audio.play("BluJay_theme");
 
    },
 
    // some callback for the tween objects
    scrollover: function() {
        // reset to default value
        this.scrollerpos = 640;
        this.scrollertween.to({
            scrollerpos: -2200
        }, 10000).onComplete(this.scrollover.bind(this)).start();
    },
 
    // update function
    update: function() {
        // Enter pressed - Start from beginning
        if (me.input.isKeyPressed('enter')) {
			me.audio.stop("BluJay_theme");
			fromMainMenu = true;
	        if(this.menu[this.menuLength] == "LoadGame"){
	      		this.loadSession();
	           	me.state.change(me.state.PLAY);
	        }else{	
	        	StoryManager.tellFullscreenStory("intro");
			}
        }else if(me.input.isKeyPressed('up')){
        	this.menuLength = this.menuLength - 1;
        	this.updateMenu();
        }else if(me.input.isKeyPressed('down')){
        	this.menuLength = this.menuLength + 1;
        	this.updateMenu();
        }
 
        
        return true;
    },
 
    // draw function
    draw: function(context) {
        context.drawImage(this.title, 0, 0);

        this.font.draw(context, "LEAFY JUSTICE", 100, 40);
        this.font.draw(context, "NEW GAME", 40, 340);
        this.font.draw(context, "LOAD GAME", 40, 420);
        this.drawArrow(context);
        this.scrollerfont.draw(context, this.scroller, this.scrollerpos, 440);
    },
 
    // destroy function
    onDestroyEvent: function() {
        me.input.unbindKey(me.input.KEY.ENTER);
        me.input.unbindKey(me.input.KEY.UP);
        me.input.unbindKey(me.input.KEY.DOWN);
		me.audio.stopTrack();
 
        //just in case
        this.scrollertween.stop();
    },
    
    loadSession: function(){
    	if (localStorage.level){
        	level = localStorage.level;
        	level = "level02";
        	
    	}else{
        	level = "level4";
    	}
    },
    
    updateMenu: function(){
    	if(this.menuLength > 1){
    		this.menuLength = 0;
    	}else if(this.menuLength < 0){
    		this.menuLength = 1;
    	}
    },
    
    drawArrow: function(context){
        if(this.menuLength == 0){
        	this.font.draw(context, ">", 0, 340);
        }else if(this.menuLength == 1){
        	this.font.draw(context, ">", 0, 420);
        }
    }
 
});