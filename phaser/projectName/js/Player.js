"use strict";

function Player(game, key, frame, scale, platforms) {
	//make us extend Phaser.Sprite //new Sprite(game, x, y, key, frame)
	Phaser.Sprite.call(this, game, 140, (game.world.height - 160), 'playerAtlas', 'Standing01');

	//add properties
	this.scale.x = 1/3;		//set x scale
	this.scale.y = 1/3;		//set y scale
   this.anchor.x = 0.5;       //set center x
   this.anchor.y = 0.5;       //set center y
	
	//setup physics
	game.physics.arcade.enable(this);		//enable arcade physics
	this.body.gravity.y = 800;				//how fast we fall
	
	//create an object to listen to the arrow keys
	this.cursors = game.input.keyboard.createCursorKeys();

	//create a variable to track player orientation
	this.facingRight = true;	//true if player faces right; false if player faces left
	this.can_jump = true;
	this.ground_check = false;
   this.swordOut = false;
   this.repairedSword = false;
   this.invincible = false;

   //set vars for repairing 
   this.repairTime = 150;
   this.repairSound = new Phaser.Sound(game,'potBreak',1,false);

	this.platforms = platforms;
	console.log(this.platforms);
	this.swordLength = 5;

	this.inDialogue = false;	//tracks whether or not the player is in a dialogue instance

   //adding animations
   this.animations.add('stand', ['Standing01'], 0, false);
   this.animations.add('run', Phaser.Animation.generateFrameNames('Running', 1, 4, '', 2), 15, true);
   this.animations.add('jump', Phaser.Animation.generateFrameNames('Jumping', 1, 4, '', 2), 15, false);
   this.animations.add('jumphold', ['Jumping04'], 0, false);
   this.animations.add('smash', Phaser.Animation.generateFrameNames('Smash', 1, 4, '', 2), 15, false);
   this.animations.add('swing', Phaser.Animation.generateFrameNames('Swinging', 1, 4, '', 2), 15, false);
   this.animations.add('repair', Phaser.Animation.generateFrameNames('Repair', 1, 4, '', 2), 15, true);
}

//specify the object's prototype and constructor
Player.prototype = Object.create(Phaser.Sprite.prototype);
Player.prototype.constructor = Player;

//override the built-in update function
Player.prototype.update = function() {
	//var hitPlatform = game.physics.arcade.collide(this, this.platforms);
	//console.log(hitPlatform);

	//handle player horizontal movement
	this.body.velocity.x = 0;	//reset player horizontal velocity
	if (this.cursors.left.isDown && !this.inDialogue) {	//did player press the left arrow key?
		//move left
		this.body.velocity.x = -500;
		this.facingRight = false;	//we're moving left
		if(this.scale.x > 0) {		//face left (if not already doing so)
			this.scale.x *= -1;
		}
	} else if (this.cursors.right.isDown && !this.inDialogue)	{ //did player press the right arrow key?
		//move right
		this.body.velocity.x = 500;
		this.facingRight = true;	//we're moving right
		if(this.scale.x < 0) {		//face right (if not already doing so)
			this.scale.x *= -1;
		}
	} else {	//no input detected
		//do nothing
	}

   // Alternate sidewall collision
   if(this.x < 0)
   {
      this.x = 0;
   }
   if(this.x > game.world.width)
   {
      this.x = game.world.width;
   }

   // If touching the ground
	if(this.body.touching.down && this.body.velocity.y == 0)
	{
		if(this.ground_check)
		{
			this.can_jump = true;
			this.ground_check = false;
		} else {
			this.ground_check = true;
		}
	} else {
		this.ground_check = false;
      this.can_jump = false;
	}

	//handle player vertical movement
	//this.body.velocity.y = 0;	//reset vertical velocity
	if(this.cursors.up.isDown && this.can_jump && !this.inDialogue) {// && hitPlatform) {	//did the player press the up arrow key while standing on the ground?
		//move up
		this.body.velocity.y = -1125;
		this.can_jump = false;
	}
	else if (this.cursors.down.isDown && !this.inDialogue)	//did the player press the down arrow key?
	{
		if(this.can_jump) // Using can_jump as a replacement for "is on the ground"
      {
         // Repair the sword
         if(!this.cursors.left.isDown && !this.cursors.right.isDown && !this.swordOut)
         {
            if(this.repairTime > 0)
            {
               --this.repairTime;
               if(this.repairTime%30 == 0)
               {
                  this.repairSound.play();
               }
            } else {
               this.repairedSword = true;
               this.repairTime = 150;
            }
         } else {
            this.repairTime = 150;
         }
      } else {
         // Grant instant movement downwards
         if(game.input.keyboard.downDuration(Phaser.Keyboard.DOWN, 1))
         {
            this.body.velocity.y += 200;
         }

         // Set gravity much higher
         this.body.gravity.y = 4000;
      }
	}
	else {	//player pressed no keys
		this.body.gravity.y = 1600;
	}

   // Extra piece of code for animation only
   if(this.swordOut)
   {
      if(game.input.keyboard.downDuration(Phaser.Keyboard.SPACEBAR, 1)) this.animations.play('swing');
   } else {
      if(!this.can_jump)
      {
         if(this.cursors.down.isDown) 
         {
            if(game.input.keyboard.downDuration(Phaser.Keyboard.DOWN, 1)) this.animations.play('smash');
         } else {
            if(game.input.keyboard.downDuration(Phaser.Keyboard.UP, 1))
            {
               this.animations.play('jump');
            } else {
               if(!this.cursors.up.isDown) this.animations.play('jumphold');
            }
         }
      } else {
         if(this.cursors.left.isDown || this.cursors.right.isDown)
         {
            this.animations.play('run');
         } else {
            if(this.cursors.down.isDown)
            {
               this.animations.play('repair');
            } else {
               this.animations.play('stand');
            }
         }
      }
   }

   if(this.invincible)
   {
      if(this.alpha != 0.5)
      {
         this.alpha = 0.5;
      } else {
         this.alpha = 1;
      }
   }
}