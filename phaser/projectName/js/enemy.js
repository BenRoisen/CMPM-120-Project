function Enemy (game, key, x, y, behavior, player, walls)
{
   // Set the sprite
   Phaser.Sprite.call(this, game, 66, 100, 'monsterAtlas', 'PotBreak1');
   this.x = x;
   this.y = y;

   //Physics properties
   game.physics.enable(this);
   this.anchor.set(0.5);
   this.body.gravity.y = 600;
   this.body.collideWorldBounds = true;
   this.behavior = behavior;
   this.player = player;
   this.walls = walls;

   this.roll_time = 0;
   this.state = 0;
   this.max_xv = 150;
   this.min_xv = -150;
   this.jump_v = -575;
   this.timer = 120;
   this.ani_timer = 7;
   this.stun_timer = 120;
   this.ground_check = false;
   this.got_hit = false;
   this.pot_hit = false;
   this.pot_broken = false;

   //Sprite animations
   //this.animations.add('resting', Phaser.Animation.generateFrameNames(key, frame, frame, '', 4), 0, true);
   this.animations.add('roll', ['PotRoll'], 0, false);
   this.animations.add('break', Phaser.Animation.generateFrameNames('PotBreak', 1, 7, '', 1), 15, false);
   this.animations.add('jump', Phaser.Animation.generateFrameNames('PotJump', 1, 6, '', 1), 60, false);
   this.animations.add('monsterJump', Phaser.Animation.generateFrameNames('MonsterJump', 1, 6, '', 1), 60, false);
   this.animations.add('reveal', ['MonsterJump1'], 0, false);
   this.scale.setTo(0.33, 0.33);

   this.rollSound = game.add.audio('roll');
   this.breakSound = game.add.audio('potBreak');
   this.deathSound = game.add.audio('monsterDeath');
}

Enemy.prototype = Object.create(Phaser.Sprite.prototype);
Enemy.prototype.constructor = Enemy;

Enemy.prototype.update = function () {
   // I touch walls now
   game.physics.arcade.collide(this, this.walls);
   // game.debug.body(this);

   switch(this.state)
   {
      case(0): // hiding
         if(Phaser.Math.distance(this.x, this.y, this.player.x, this.player.y) <= 200)
         {
            this.state++;
            this.animations.play('roll');
            this.rollSound.play();
            this.body.setSize(240, 240, 0, 0);
            console.log('they see me rollin');
         }
         break;
      case(1): // they see me rollin'
         if(Phaser.Math.distance(this.x, this.y, this.player.x, this.player.y) >= 400 || this.roll_time >= 120)
         {
            this.state++;
            this.angle = 0;
            this.animations.play('break');
            this.y -= (300-240)/2;
            this.body.setSize(240, 300, 0, 0);
            console.log('ima kill you');
         } else {
            this.roll_time++;
            if(this.player.x > this.x)
            {
               this.body.velocity.x = -400;
               this.angle -= 15;
            } else {
               this.body.velocity.x = 400;
               this.angle += 15;
            }
         }
         break;
      case(2): // Grounded
         this.body.velocity.x = 0;
         if(this.timer <= 0)
         {
            if(this.pot_broken)
            {
               this.animations.play('monsterJump');
            } else {
               this.animations.play('jump');
            }
            this.body.velocity.y = this.jump_v;
            this.ani_timer = 7;
            this.state++;
         } else {
            this.timer--;
         }
         break;
      case(3): // Jump animation
         if(this.ani_timer <= 0)
         {
            this.state++;
         } else {
            this.ani_timer--;
         }
         break;
      case(4): // Jumping
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

         // Turning function
         if(this.scale.x < 0 && this.body.velocity.x < 0) 
         { 
            this.scale.x *= -1; //face right (if not already doing so)
         }
         // Turning function
         if(this.scale.x > 0 && this.body.velocity.x > 0) 
         { 
            this.scale.x *= -1; //face right (if not already doing so)
         }

         if(this.body.touching.down == true && this.body.velocity.y == 0)
         {
            if(this.ground_check)
            {
               this.state = 2;
               this.timer = 60;
               this.ground_check = false;
            } else {
               this.ground_check = true;
            }
         } else {
            this.ground_check = false;
         }
         break;
      case(5): // Stun state
         if(this.stun_timer > 0)
         {
            this.stun_timer--;
         } else {
            this.state = 2;
            this.angle = 0;
            this.stun_timer = 120;
         }
         break;
   }

   // Hit check
   if(this.got_hit)
   {
      if(this.pot_broken)
      {
         this.kill();
         this.deathSound.play();
      } else {
         this.got_hit = false;
      }
   }

   // Pot break check
   if(this.pot_hit)
   {
      this.pot_break();
      this.pot_hit = false;
   }
}

Enemy.prototype.pot_break = function () {
   this.pot_broken = true;
   this.got_hit = false;
   this.animations.play('reveal');
   this.breakSound.play();

   this.stun_self();
}

Enemy.prototype.stun_self = function () {
   this.state = 5;
   this.angle = 180;
   this.body.velocity.x = 0;
   if(this.stun_timer < 60)
   {
      this.stun_timer = 60;
   }
}