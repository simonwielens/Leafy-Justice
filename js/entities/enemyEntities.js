/* --------------------------
an enemy Entity
------------------------ */
var wheelie = entity("EnemyEntity", me.ObjectEntity.extend({
    init: function(x, y, settings) {
        // define this here instead of tiled
        settings.image = "wheelie_right";
        settings.spritewidth = 64;
 
        // call the parent constructor
        this.parent(x, y, settings);
 
        this.startX = x;
        this.endX = x + settings.width - settings.spritewidth;
        // size of sprite
 
        // make him start from the right
        this.pos.x = x + settings.width - settings.spritewidth;
        this.walkLeft = true;
 
        // walking & jumping speed
        this.setVelocity(4, 6);
 
        // make it collidable
        this.collidable = true;
        // make it a enemy object
        this.type = me.game.ENEMY_OBJECT;
        this.damage = 5;
 
    },
 
 
    // call by the engine when colliding with another object
    // obj parameter corresponds to the other object (typically the player) touching this one
    onCollision: function(res, obj) {
 
        if(obj.name == "mainplayer" ){
            // res.y >0 means touched by something on the bottom
            // which mean at top position for this one
            if (this.alive && (res.y > 0) && obj.falling) {
                this.flicker(45);
            }
        }
        
        if(obj.type == "Bullet"){
            me.game.remove(this);
        }
        
    },
 
    // manage the enemy movement
    update: function() {
        // do nothing if not visible
        if (!this.visible)
            return false;
 
        if (this.alive) {
            if (this.walkLeft && this.pos.x <= this.startX) {
                this.walkLeft = false;
            } else if (!this.walkLeft && this.pos.x >= this.endX) {
                this.walkLeft = true;
            }
            // make it walk
            this.flipX(this.walkLeft);
            this.vel.x += (this.walkLeft) ? -this.accel.x * me.timer.tick : this.accel.x * me.timer.tick;
                 
        } else {
            this.vel.x = 0;
        }
         
        // check and update movement
        this.updateMovement();
         
        // update animation if necessary
        if (this.vel.x!=0 || this.vel.y!=0) {
            // update objet animation
            this.parent(this);
            return true;
        }
        return false;
    }
}));


var lawnmowerEntity = entity("lawnmower", me.ObjectEntity.extend({
    init: function(x, y, settings) {
        // define this here instead of tiled
        settings.image = "lawnmower";
        settings.spritewidth = 384;
 
 
 		me.audio.play("LawnMower");
 	
        // call the parent constructor
        this.parent(x, y, settings);
 
 		console.log("Settings Width " + settings.spritewidth);
        this.startX = x;
        this.endX = x + settings.width - settings.spritewidth;
  
        // walking & jumping speed
        this.setVelocity(2, 6);
 
 		this.gravity=0.98;
 
        // make it collidable
        this.collidable = true;
        // make it a enemy object
        this.type = me.game.ENEMY_OBJECT;
        this.damage = 100;
        
        this.canBreakTile = true;
 
    },
 
 
    // call by the engine when colliding with another object
    // obj parameter corresponds to the other object (typically the player) touching this one
    onCollision: function(res, obj) {
 		
 		
    },
 
    // manage the enemy movement
    update: function() {
       
       // // do nothing if not visible
       
       if (this.pos.x >= this.endX) {
                
            this.vel.x = 0;
       }
       else
       {
       		this.vel.x +=  this.accel.x * me.timer.tick;
       }
  
  
        // check and update movement
        this.updateMovement();
         
        // update animation if necessary
        if (this.vel.x!=0 || this.vel.y!=0) {
            // update objet animation
            this.parent(this);
            return true;
        }
        return false;
    },
	
	onDestroyEvent: function() {
		me.audio.stop("LawnMower");
	}
}));


enemyEntity.push(wheelie);
enemyEntity.push(lawnmowerEntity);
