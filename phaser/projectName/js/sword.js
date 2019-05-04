function Sword (game, key, x, y, sword_size, player, walls)
{
   // Set the sprite
   Phaser.Sprite.call(this, game, 75, 100, key, 0);

   //Physics properties
   game.physics.enable(this);
   this.anchor.x = 0.5;
   this.anchor.y = 1;
   this.x = x;
   this.y = y;
   this.alpha = 1;
   this.angle = 0;
   this.delay = 15;
   this.end_lag = 15;
   this.state = 0;
   this.hit_wall = false;
   this.hit_angle = 0;
   this.player = player;
   this.walls = walls;


   this.boxes = game.add.group();
   for(i = 0; i < 5; ++i)
   {
      swordbox = new Swordbox(game, 25*i, key, this, walls);
      game.add.existing(swordbox);
      this.boxes.add(swordbox);
   }
}

Sword.prototype = Object.create(Phaser.Sprite.prototype);
Sword.prototype.constructor = Sword;

Sword.prototype.update = function () {
   this.x = this.player.x;
   this.y = this.player.y;//game.player.y;


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
         this.angle += 9;
         this.wall_check(this);
         if(this.angle >= 90) 
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
            this.angle -= 9;
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


function Swordbox (game, offset, key, sword, walls)
{
   Phaser.Sprite.call(this, game, 50, 50, key, 0);
   game.physics.enable(this);
   this.alpha = 0;

   this.x = sword.x;
   this.y = sword.y;
   this.sword = sword;
   this.walls = walls;
   this.offset = offset;
}

Swordbox.prototype = Object.create(Phaser.Sprite.prototype);
Swordbox.prototype.constructor = Swordbox;

Swordbox.prototype.update = function () {
   this.x = this.sword.x;
   this.y = this.sword.y;
   rads = Math.sin((this.sword.angle-90)*Math.PI/180);
   radc = Math.cos((this.sword.angle-90)*Math.PI/180);

   this.body.setSize(30, 30, this.offset*radc, this.offset*rads);
   game.debug.body(this);

   if(this.sword.state == 3)
   {
      this.destroy();
      console.log('destroying Swordbox');
   }
}