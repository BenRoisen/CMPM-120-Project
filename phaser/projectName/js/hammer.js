function Hammer (game, key, player, walls, enemies, pots)
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
   this.pots = pots;
   
   // Allow for button pressing
   this.cursors = game.input.keyboard.createCursorKeys();
}

Hammer.prototype = Object.create(Phaser.Sprite.prototype);
Hammer.prototype.constructor = Hammer;

Hammer.prototype.update = function () {
   // Set position to the player's shoulder
   boxsize_x = 100;
   boxsize_y = 75;
   spritesize_x = 114;
   spritesize_y = 60;
   offset_y = 40;

   this.y = this.player.y;
   this.x = this.player.x;
   
   // Set the box size
   this.body.setSize(boxsize_x, boxsize_y, spritesize_x/2-boxsize_x/2, spritesize_y/2-boxsize_y/2+offset_y);

   // Activate hammer hitbox
   if(this.cursors.down.isDown && !this.player.swordOut)
   {
      if(!this.player.can_jump) // track if the player is on the ground
      {
         game.physics.arcade.overlap(this, this.enemies, this.enemy_check, null, this);
         game.physics.arcade.overlap(this, this.pots, this.pot_check, null, this);
      }
   }
   
}

Hammer.prototype.enemy_check = function (hammer, enemy) {
   enemy.pot_hit = true;
   console.log("hammered enemy");
   if(this.player.body.velocity.y > 0)
   {
      enemy.body.velocity.y += 200;
      this.player.body.velocity.y *= -0.6;
   }
}

Hammer.prototype.pot_check = function (hammer, pot) {
   pot.gotHit = true;
   console.log("hammered pot");
   if(this.player.body.velocity.y > 0)
   {
      this.player.body.velocity.y *= -0.6;
   }
}