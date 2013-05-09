/*----------------------
 
    A story screen
 
  ----------------------*/
  
var STORY_STATE = me.state.USER + 1;

var StoryManager = {
	current_story_name : "intro",
	
	tellFullscreenStory : function(story_name) {
		
		this.current_story_name = story_name;
		me.state.change(STORY_STATE);	
	}
}


var stories = {
	intro : {
		lines : [
			"On cold winter's night Blue Jay or \"Leafy\" as his friends call him was collecting some berries for his wife while she cares for her eggs.",
			"Help Leafy find some berries..."
		],
		next_state : me.state.PLAY,
		next_level : "level1"
	},
	level02 : {
		lines : [
			"The has mafia kicked you on to the ground!",
			"Oh no!!! A Lawn Mower!!"
		],
		next_state : me.state.PLAY,
		next_level : "level02"
	},
	level03 : {
		lines : [
			"Wow that was a lucky escape!",
			"You must climb the inside of the trunk!!"
		],
		next_state : me.state.PLAY,
		next_level : "level4"
	}

};

/*----------------
 a Story entity
------------------------ */
StoryEntity = me.InvisibleEntity.extend({
    // extending the init function is not mandatory
    // unless you need to add some extra initialization
    init: function(x, y, settings) {
        // call the parent constructor
        this.parent(x, y, settings);
        this.collidable = true;
        
        this.story = settings.s;
    },
 
    // this function is called by the engine, when
    // an object is touched by something (here collected)
    onCollision: function(res, obj) {
        // do something when collected
		console.log('story hit!');
		
        if(obj.name == "mainplayer" ){
            localStorage.currentPlayerHealth = obj.health;
            localStorage.currentPlayerAmmo = obj.ammo;
			StoryManager.tellFullscreenStory(this.story);
        }
		
    }
 
});

 
var StoryScreen = me.ScreenObject.extend({
    // constructor
    init: function() {
        this.parent(true);
 
        // title screen image
        this.title = null;
 
        this.font = null;
    
        
    },
    
 
    // reset function
    onResetEvent: function() {
        if (this.title == null) {
            // font to display the menu items
            //this.font = new me.BitmapFont("32x32_font", 32);
            this.font_type 
			this.font = new me.Font('Blackmoor LET', 30, '#000000', 'left');
			
			console.log(this.font);
			
			this.current_line_of_story = 0;
 
        }
 
        // enable the keyboard
        me.input.bindKey(me.input.KEY.ENTER, "enter", true);
        this.scroll_bg = me.loader.getImage("storyScreen");
        this.current_story_line = 0;
 		me.audio.play("happy_theme")
    },
 
    // update function
    update: function() {
        // enter pressed ?
        if (me.input.isKeyPressed('enter')) {
        
        	var current_story = stories[StoryManager.current_story_name];
        	
        	this.current_story_line++;
        	
        	if (this.current_story_line == current_story.lines.length) {
        	
        		// if continuing the story 
        		if (STORY_STATE == current_story.next_state) {
        			StoryManager.tellFullscreenStory(current_story.next_story);	
        		} else {
					me.audio.stop("happy_theme");
					me.state.change(current_story.next_state);
					level = current_story.next_level;	
					playScreenGlobalObject.onResetEvent();
        		}
	        }
	        
	        return true;
        
        }
        return false;
    },
    
    wrapText: function(ctx,phrase,maxPxLength,textStyle) {
		var wa=phrase.split(" "),
			phraseArray=[],
			lastPhrase=wa[0],
			l=maxPxLength,
			measure=0;
		ctx.font = textStyle;
		for (var i=1;i<wa.length;i++) {
			var w=wa[i];
			measure=ctx.measureText(lastPhrase+w).width;
			if (measure<l) {
				lastPhrase+=(" "+w);
			}else {
				phraseArray.push(lastPhrase);
				lastPhrase=w;
			}
			if (i===wa.length-1) {
				phraseArray.push(lastPhrase);
				break;
			}
		}
		return phraseArray;
	},
      
 
    // draw function
    draw: function(context) {
        context.drawImage(this.scroll_bg, 0, 0);
        
        
      	var current_story = stories[StoryManager.current_story_name];
      	var current_lines = "";
      	
      	
      	
      	for (var line=0; line<=this.current_story_line; line++) {
      	
        	if (this.current_story_line < current_story.lines.length) {
	      		current_lines += current_story.lines[line];	
	      	}
      	}
    
    	var start_x = 120;
    	var start_y = 130;
    
    	var wrapped_lines = this.wrapText(context, current_lines, 400, this.font.font);
    	
    	for (var line=0; line<wrapped_lines.length; line++) {
    		var y_pos = start_y + (line*40);
    	
	        this.font.draw(context, wrapped_lines[line], start_x, y_pos);
    	
    	}
 
    },
 
    // destroy function
    onDestroyEvent: function() {
        me.input.unbindKey(me.input.KEY.ENTER);
		 
    }
 
});