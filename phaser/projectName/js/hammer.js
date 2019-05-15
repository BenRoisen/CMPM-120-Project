function Hammer (game, key, player, walls, enemies)
{
   // Set the sprite
   Phaser.Sprite.call(this, game, player.x, player.y, key, 0);
   game.physics.enable(this);

   this.alpha = 0;
   this.anchor.x = 0.5;
   this.anchor.y = 0.5;
   this.game = game;
   this.key = key;
   this.player = player;
   this.enemies = enemies;
   
   // Allow for button pressing
   this.cursors = game.input.keyboard.createCursorKeys();
}

Hammer.prototype = Object.create(Phaser.Sprite.prototype);
Hammer.prototype.constructor = Hammer;

Hammer.prototype.update = function () {
   // Set position to the player's shoulder
   boxsize_x = 80;
   boxsize_y = 60;
   spritesize_x = 114;
   spritesize_y = 60;
   offset_y = 85;

   this.y = this.player.y;
   this.x = this.player.x;
   
   // Set the box size
   this.body.setSize(boxsize_x, boxsize_y, spritesize_x/2-boxsize_x/2, spritesize_y/2-boxsize_y/2+offset_y);

   // Set collision if the hammer isn't touching a wall
   if(this.cursors.down.isDown)
   {
      if(!this.player.can_jump)
      {
         game.physics.arcade.overlap(this, this.enemies, this.enemy_check, null, this);
      }
   }
   

   game.debug.body(this);
}

Hammer.prototype.enemy_check = function (hamnmer, enemy) {
   enemy.got_hit = true;
   console.log("hammered enemy");
   if(this.player.body.velocity.y > 0)
   {
      this.player.body.velocity.y *= -0.6;
   }
}