function Sword (game, key, x, y, sword_size)
{
   // Set the sprite
   Phaser.Sprite.call(this, game, 75, 100, key, 0);

   //Physics properties
   game.physics.enable(this);
   this.anchor.x = 0;
   this.anchor.y = 0.5;
   this.x = x;
   this.y = y;
   this.alpha = 1;
   //this.angle.set(90);
   this.angle = 90;
   this.delay = 15;
   this.end_lag = 15;
   this.swinging = false;
   this.hit_wall = false;
   this.hit_angle = 0;

}

Sword.prototype = Object.create(Phaser.Sprite.prototype);
Sword.prototype.constructor = Sword;

Sword.prototype.update = function () {
   this.x = 5;
   this.y = 5;//game.player.y;

   if(this.delay > 0) {
      this.delay--;
   } else {
      this.swinging = true;
   }

   if(this.swinging == true) {
      this.angle -= 9;
      this.wall_check();
      if(angle <= 0) {
         this.swinging = false;
      }
   }

   if(this.delay <= 0 && this.swinging == false)
   {
      if(this.end_lag > 0)
      {
         this.end_lag--;
      } else {
         this.kill();
      }
   }

}

Sword.prototype.wall_check = function () {

}