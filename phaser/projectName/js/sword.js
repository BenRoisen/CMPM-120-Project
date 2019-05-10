function Sword (game, key, key2, sword_size, player, walls, enemies)
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
   this.player = player;
   this.walls = walls;
   this.enemies = enemies;
   this.uangle = -90;

   this.boxes = game.add.group();
   for(i = 0; i < 5; ++i)
   {
      swordbox = new Swordbox(game, (49*i+101), key2, player, this, walls, enemies);
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
         this.uangle += 9;
         this.wall_check(this);
         game.physics.arcade.overlap(this.boxes, this.enemies, this.enemy_check, null, this);
         if(this.uangle >= 0) 
         {
            this.state = 2;
         }
         break;
      case(2): // ending
         if(this.end_lag > 0)
         {
            this.end_lag--;
         } else {
            this.state = 3;
         }
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
   }
}

Sword.prototype.enemy_check = function (swordbox, enemy) {
   enemy.kill();
   console.log("hit enemy");
}

function Swordbox (game, offset, key, player, sword, walls, enemies)
{
   Phaser.Sprite.call(this, game, player.x, player.y, key, 0);
   game.physics.enable(this);
   this.anchor.y = 0.5;
   this.anchor.x = 0.35;

   this.x = sword.x;
   this.y = sword.y;
   this.sword = sword;
   this.walls = walls;
   this.enemies = enemies;
   this.player = player;
   this.offset = offset;
}

Swordbox.prototype = Object.create(Phaser.Sprite.prototype);
Swordbox.prototype.constructor = Swordbox;

Swordbox.prototype.update = function () {
   this.angle = this.sword.angle;
   rads = Math.sin((this.sword.angle-180)*Math.PI/180);
   radc = Math.cos((this.sword.angle-180)*Math.PI/180);
   this.x = this.sword.x - this.offset*radc;
   this.y = this.sword.y - this.offset*rads;

   if(this.player.facingRight)
   {
      this.body.setSize(60-15*radc, 60+30*rads, -15*radc, -30*rads);
   } else {
      this.body.setSize(60+15*radc, 60+30*rads, -15*radc, -30*rads);
   }
   
   game.debug.body(this);

   if(this.sword.state == 3)
   {
      this.destroy();
   }
}