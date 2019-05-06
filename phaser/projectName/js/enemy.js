function Enemy (game, key, x, y, behavior, player, walls)
{
   // Set the sprite
   Phaser.Sprite.call(this, game, 66, 100, key, 0);
   this.x = x;
   this.y = y;

   //Physics properties
   game.physics.enable(this);
   this.anchor.set(0.5);
   this.body.gravity.y = 300;
   this.body.collideWorldBounds = true;
   this.behavior = behavior;
   this.player = player;
   this.walls = walls;
   this.state = 0;
   this.max_xv = 150;
   this.min_xv = -150;
   this.jump_v = -350;
   this.grounded = true;
   this.timer = 120;
}

Enemy.prototype = Object.create(Phaser.Sprite.prototype);
Enemy.prototype.constructor = Enemy;

Enemy.prototype.update = function () {
   // I touch walls now
   game.physics.arcade.collide(this, this.walls);

   switch(this.state)
   {
      case(0): // hiding
         if(Phaser.Math.distance(this.x, this.y, this.player.x, this.player.y) <= 200)
         {
            this.state = 1;
            console.log('they see me rollin');
         }
         break;
      case(1): // they see me rollin'
         if(Phaser.Math.distance(this.x, this.y, this.player.x, this.player.y) >= 400)
         {
            this.state = 2;
            this.angle = 0;
            console.log('ima kill you');
         } else {
            if(this.player.x > this.x)
            {
               this.body.velocity.x = -200;
               this.angle -= 15;
            } else {
               this.body.velocity.x = 200;
               this.angle += 15;
            }
         }
         break;
      case(2): // ima kill you
         if(this.grounded)
         {
            this.body.velocity.x = 0;
            if(this.timer <= 0)
            {
               this.body.velocity.y = this.jump_v;
               this.grounded = false;
            } else {
               this.timer--;
            }
         } else {
            console.log('im coming for you');
            this.body.velocity.x = (this.player.x - this.x)/2;
            // max x control
            if(this.body.velocity.x > this.max_xv)
            {
               this.body.velocity.x = this.max_xv;
            }
            // min x control
            if(this.body.velocity.x < this.min_xv)
            {
               this.body.velocity.x = this.min_xv;
            }

            if(this.body.touching.down == true)
            {
               this.grounded = true;
               this.timer = 60;
            }
         }
         break;
   }

   if(game.physics.arcade.collide(this, this.player))
   {
      console.log("ouch");
   }
      
}