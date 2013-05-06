/*  Bullet
============*/

var bulletEntity = entity("bulletEntity", me.ObjectEntity.extend({
    init: function (flipped, x, y, settings) {
        if(!flipped){
            // speed up
            x = x + 30;
        }

        this.parent(x, y, settings);
        this.collidable = true;
        this.gravity = 0;
        this.type = "Bullet";
        this.flipX(flipped);
        this.oldX = 0;

    },

    update: function () {
    
        // check for collision
        var res = me.game.collide(this);
        if (res) {
            if(res.obj.type == me.game.ENEMY_OBJECT ||
               res.obj.type == "Apple"){
                me.game.remove(this);
            }
        }
        
        if (!this.visible){
            // remove myself if not on the screen anymore
            me.game.remove(this);
            return false;
        }

        if(this.pos.x == this.oldX){
            // remove myself if not on the screen anymore
            me.game.remove(this);
            return false;
        }else{
            this.oldX = this.pos.x;
        }

        console.log(this.flipX);
        if(this.lastflipX){
            // speed up
            this.vel.x -= 1;
        }else {

            this.vel.x += 1;
        }
        

        this.updateMovement();
        return true;
    }
}));

playerEntity.push(bulletEntity);