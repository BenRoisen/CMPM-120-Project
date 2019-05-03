function Enemy (game, key, x, y, behavior)
{
   // Set the sprite
   Phaser.Sprite.call(this, game, 128, 48, key, 0);

   //Physics properties
   game.physics.enable(this);
   this.anchor.set(0.5);
   this.body.gravity.y = 300;
   this.body.collideWorldBounds = true;
   this.behavior = behavior;
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
   
   switch(this.state)
   {
      case(0): // hiding
         if(Phaser.Math.distance(this.x, this.y, game.player.x, game.player.y) <= 60)
         {
            this.state = 1;
         }
      case(1): // they see me rollin'
         if(Phaser.Math.distance(this.x, this.y, game.player.x, game.player.y) >= 120)
         {
            this.state = 2;
            this.angle.set(0);
         } else {
            if(game.player.x > this.x)
            {
               this.body.velocity.x = -200;
               this.angle -= 15;
            } else {
               this.body.velocity.x = 200;
               this.angle += 15;
            }
         }
      case(2): // ima kill you
         if(this.grounded)
         {
            this.body.velocity.x = 0;
            if(this.timer <= 0)
            {
               this.body.velocity.y = this.jump_v;
            } else {
               this.timer--;
            }
         } else {
            this.body.velocity.x = (this.x - game.player.x)/2;
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

            if(this.body.onWorldBounds == true)
            {
               this.grounded = true;
               this.timer = 120;
            }
         }
         
   }
      
}