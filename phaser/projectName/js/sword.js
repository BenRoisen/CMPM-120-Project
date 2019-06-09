function Sword (game, key, key2, player, walls, enemies, pots, bigOres)
{
   // Set the sprite
   Phaser.Sprite.call(this, game, player.x, player.y, key, 0);

   //Physics properties
   game.physics.enable(this);
   this.anchor.x = 8/60;
   this.anchor.y = 8/51;

   this.alpha = 1;
   this.angle = -90;
   this.uangle = -90;
   this.shadow_angle = -90;
   this.delay = 15;
   this.end_lag = 15;
   this.state = 0;
   this.hit_wall = false;
   this.pieceLost = false;

   this.slash = game.add.audio('slash');
   this.shatter = game.add.audio('shatter');

   this.player = player;
   this.walls = walls;
   this.enemies = enemies;
   this.pots = pots;
   this.bigOres = bigOres;
   
   this.y = player.y;
   if(player.facingRight)
   {
      this.x = player.x - 10;
      this.angle = this.uangle;
      this.shadow_angle = this.angle - 5;
      this.scale.set(1);

   } else {
      this.x = player.x + 10;
      this.angle = (this.uangle -180) * -1;
      this.shadow_angle = this.angle + 5;
      this.scale.set(-1);
   }

   this.boxes = game.add.group();
   // Create sword parts
   for(i = 0; i < player.swordLength; ++i)
   {
      swordbox = new Swordbox(game, i, key2, player, this, walls, enemies, false);
      game.add.existing(swordbox);
      this.boxes.add(swordbox);
   }

   // Create shadow boxes
   for(i = 2; i < player.swordLength; ++i)
   {
      swordbox = new Swordbox(game, i, key2, player, this, walls, enemies, true);
      game.add.existing(swordbox);
      this.boxes.add(swordbox);
   }
}

Sword.prototype = Object.create(Phaser.Sprite.prototype);
Sword.prototype.constructor = Sword;

Sword.prototype.update = function () {
   // Set position to the player's shoulder
   this.y = this.player.y;
   if(this.player.facingRight)
   {
      this.x = this.player.x - 14;
      this.angle = this.uangle;
      this.shadow_angle = this.angle - 5;
      this.scale.set(1, 1);
   } else {
      this.x = this.player.x + 14;
      this.angle = (this.uangle -180) * -1;
      this.shadow_angle = this.angle + 5;
      this.scale.set(1, -1);
   }
   this.body.velocity.x = this.player.body.velocity.x;
   this.body.velocity.y = this.player.body.velocity.y;

   switch(this.state)
   {
      case(0): // holding upwards
         if(this.delay > 0) {
            this.delay--;
         } else {
            this.state = 1;
         }
         break;
      case(1): // swinging
         // animation
         this.uangle += 9;

         // Collision checks
         this.wall_check(this);
         game.physics.arcade.overlap(this.boxes, this.enemies, this.enemy_check, null, this);
         game.physics.arcade.overlap(this.boxes, this.pots, this.pot_check, null, this);
         game.physics.arcade.overlap(this.boxes, this.bigOres, this.big_ore_check, null, this);
         // Change state at end of swing
         if(this.uangle >= 0) 
         {
            this.state = 2;
            this.shadow_angle = this.angle;
         }
         break;
      case(2): // ending
         // animation
         if(this.end_lag > 0)
         {
            this.end_lag--;
         } else {
            this.state = 3;
         }
         // Collision checks
         this.wall_check(this);
         game.physics.arcade.overlap(this.boxes, this.enemies, this.enemy_check, null, this);
         game.physics.arcade.overlap(this.boxes, this.pots, this.pot_check, null, this);
         game.physics.arcade.overlap(this.boxes, this.bigOres, this.big_ore_check, null, this);
         break;
      case(3): // destroying
         this.destroy();
         console.log('destroying Sword');
         break;
      case(4): // reeling back
         if(this.end_lag > 0)
         {
            this.uangle -= 9;
            this.end_lag--;
         } else {
            this.state = 3;
         }
         break;
   }
}

Sword.prototype.wall_check = function (sword) {
   if (game.physics.arcade.overlap(sword.boxes, sword.walls) && !sword.pieceLost) 
   {
      sword.state = 4;
      sword.end_lag = 5;
      sword.player.swordLength -= 1;
      sword.pieceLost = true;
      this.shatter.play();
   }
}

Sword.prototype.enemy_check = function (swordbox, enemy) {
   if(!enemy.pot_broken)
   {
      if(!swordbox.sword.pieceLost)
      {
         swordbox.sword.state = 4;
         swordbox.sword.end_lag = 5;
         swordbox.sword.player.swordLength -= 1;
         swordbox.sword.pieceLost = true
         this.shatter.play();
      }
   } else {
      this.slash.play();
      enemy.got_hit = true;
   }
   console.log("hit enemy");
}

Sword.prototype.pot_check = function (swordbox, pot) {
   if(!swordbox.sword.pieceLost)
   {
      swordbox.sword.state = 4;
      swordbox.sword.end_lag = 5;
      swordbox.sword.player.swordLength -= 1;
      swordbox.sword.pieceLost = true
      this.shatter.play();
   }
}

Sword.prototype.big_ore_check = function (swordbox, bigOre) {
   swordbox.sword.state = 4;
   swordbox.sword.end_lag = 5;
   bigOre.got_hit = true;
   this.slash.play();
}

function Swordbox (game, id, key, player, sword, walls, enemies, shadow)
{
   Phaser.Sprite.call(this, game, player.x, player.y, key, 0);
   game.physics.enable(this);
   console.log("making blade");
   this.anchor.y = 0.5;
   this.anchor.x = 0.5;

   if(shadow)
   {
      this.alpha = 0;
   }

   this.x = sword.x;
   this.y = sword.y;
   this.sword = sword;
   this.walls = walls;
   this.enemies = enemies;
   this.player = player;
   this.id = id;
   this.key = key;
   this.offset = (59*id+128)*0.5;
   this.shadow = shadow;
   this.scale.setTo(0.5);
}

Swordbox.prototype = Object.create(Phaser.Sprite.prototype);
Swordbox.prototype.constructor = Swordbox;

Swordbox.prototype.update = function () {
   if(!this.shadow)
   {
      this.angle = this.sword.angle;
   } else {
      this.angle = this.sword.shadow_angle;
   }

   rads = Math.sin((this.angle-180)*Math.PI/180);
   radc = Math.cos((this.angle-180)*Math.PI/180);
   

   if(this.player.facingRight)
   {
      this.x = this.sword.x - this.offset*radc + 30*rads;
      this.y = this.sword.y - this.offset*rads - 30*radc;
      this.body.setSize(45-20*radc, 45+20*rads, -10*radc, -10*rads);
   } else {
      this.x = this.sword.x - this.offset*radc - 30*rads;
      this.y = this.sword.y - this.offset*rads + 30*radc;
      this.body.setSize(45+20*radc, 45+20*rads, -10*radc, -10*rads);
   }

   if(this.id >= this.player.swordLength)
   {
      if(!this.shadow)
      {
         shatter = new ShatterBlade(game, this.key, this.x, this.y, this.angle, this.player.facingRight);
         game.add.existing(shatter);
      }
      this.destroy();
   }
   

   if(this.sword.state == 3)
   {
      this.destroy();
   }

   //game.debug.body(this);
}

function ShatterBlade (game, key, x, y, angle, facingRight)
{
   Phaser.Sprite.call(this, game, x, y, key, 0);
   game.physics.enable(this);
   console.log("making broken blade");

   this.x = x;
   this.y = y;
   this.angle = angle;
   if(facingRight)
   {
      this.body.angularVelocity = -1200
      this.body.velocity.x = -400*Math.sin((this.angle-180)*Math.PI/180);
      this.body.velocity.y = 400*Math.cos((this.angle-180)*Math.PI/180) - 400;
   } else {
      this.body.angularVelocity = 1200
      this.body.velocity.x = 400*Math.sin((this.angle-180)*Math.PI/180);
      this.body.velocity.y = 400*Math.cos((this.angle-180)*Math.PI/180) - 400;
   }

   this.body.gravity.y = 1600;
   this.anchor.y = 0.5;
   this.anchor.x = 0.5;
   this.scale.setTo(0.5);
}

ShatterBlade.prototype = Object.create(Phaser.Sprite.prototype);
ShatterBlade.prototype.constructor = ShatterBlade;

ShatterBlade.prototype.update = function () {
   if (this.x > game.world.width + 100 || this.x < -100 
            || this.y > game.world.height + 100  || this.y < -100)
   {
      this.destroy()
   }
}
