/* --------------------------
an level Entity
------------------------ */
var LevelEntity = entity("me.LevelEntity", me.LevelEntity.extend({ 

	init: function(x,y,settings){
		this.parent(x,y,settings);
		this.to = settings.to;
	},
 
    // call by the engine when colliding with another object
    // obj parameter corresponds to the other object (typically the player) touching this one
    onCollision: function(res, obj) {
 
        if(obj.name == "mainplayer" ){
            this.goTo(this.to);
        }
        
    }
 
}));

enemyEntity.push(LevelEntity);