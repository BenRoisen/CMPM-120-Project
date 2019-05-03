function Sword (game, key, x, y, sword_size, player)
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
   this.angle = 270;
   this.delay = 15;
   this.end_lag = 15;
   this.swinging = false;
   this.hit_wall = false;
   this.hit_angle = 0;
   this.player = player;

   console.log(game);
}

Sword.prototype = Object.create(Phaser.Sprite.prototype);
Sword.prototype.constructor = Sword;

Sword.prototype.update = function () {
   this.x = this.player.x;
   this.y = this.player.y;//game.player.y;

   if(this.delay > 0) {
      this.delay--;
   } else {
      this.swinging = true;
   }

   if(this.swinging == true) {
      this.angle += 9;
      this.wall_check();
      if(this.angle <= 0) {
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