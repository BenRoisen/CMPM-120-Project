function Sword (game, key, key2, player, walls, enemies, pots)
{
   // Set the sprite
   Phaser.Sprite.call(this, game, 75, 100, key, 0);

   //Physics properties
   game.physics.enable(this);
   this.anchor.x = 0;
   this.anchor.y = 0.5;

   this.y = player.y - 4;
   if(player.facingRight)
   {
      this.x = player.x - 21;
   } else {
      this.x = player.x + 21;
   }

   this.alpha = 1;
   this.angle = -90;
   this.delay = 15;
   this.end_lag = 15;
   this.state = 0;
   this.hit_wall = false;
   this.slash = new Phaser.Sound(game,'slash',1,false);
   this.player = player;
   this.walls = walls;
   this.enemies = enemies;
   this.pots = pots;
   this.uangle = -90;
   this.shadow_angle = -90;

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
   this.y = this.player.y - 4;
   if(this.player.facingRight)
   {
      this.x = this.player.x - 21;
      this.angle = this.uangle;
   } else {
      this.x = this.player.x + 21;
      this.angle = (this.uangle -180) * -1;
   }

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
         // Set angle difference of shadow
         if(this.uangle >= -81)
         {
            if(this.player.facingRight)
            {
               this.shadow_angle = this.angle - 5;
            } else {
               this.shadow_angle = this.angle + 5;
            }
         }
         // Collision checks
         this.wall_check(this);
         game.physics.arcade.overlap(this.boxes, this.enemies, this.enemy_check, null, this);
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
   if (game.physics.arcade.overlap(sword.boxes, sword.walls)) 
   {
      sword.state = 4;
      sword.end_lag = 5;
      sword.player.swordLength -= 1;
      this.slash.play();
   }
}

Sword.prototype.enemy_check = function (swordbox, enemy) {
   enemy.got_hit = true;
   console.log("hit enemy");
   this.slash.play();
}

// Sword.prototype.touchOrePot = function (swordbox, pot) {
//    //spawn an ore at the pot's location
//    var ore = this.game.ores.create(pot.body.x, pot.body.y, 'obsidian');
//    ore.scale.setTo(0.5);
//    ore.body.gravity.y = 150;  //make the ore fall
   
//    //give a short delay before the ore can be picked up (so it doesn't instantly disappear)
//    ore.vulnerable = false;    //start off invulnerable
//    var spawnTimer = this.game.time.create(true);
//    spawnTimer.add(500,this.game.enableOre,this, ore);   //after half a second, let the ore be picked up
//    spawnTimer.start();
   
//    pot.kill(); //remove the old pot now that we're done with it
// }

function Swordbox (game, id, key, player, sword, walls, enemies, shadow)
{
   Phaser.Sprite.call(this, game, player.x, player.y, key, 0);
   game.physics.enable(this);
   console.log("making blade");
   this.anchor.y = 0.5;
   this.anchor.x = 0.35;

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
   this.offset = (49*id+101);
   this.shadow = shadow;
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
   this.x = this.sword.x - this.offset*radc;
   this.y = this.sword.y - this.offset*rads;

   if(this.player.facingRight)
   {
      this.body.setSize(60-15*radc, 60+30*rads, -15*radc, -30*rads);
   } else {
      this.body.setSize(60+15*radc, 60+30*rads, -15*radc, -30*rads);
   }

   if(this.id > this.player.swordLength)
   {
      this.kill();
   }
   

   if(this.sword.state == 3)
   {
      this.destroy();
   }
}