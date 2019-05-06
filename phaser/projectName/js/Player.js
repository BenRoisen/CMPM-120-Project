"use strict";

function Player(game, key, frame, scale) {
	//make us extend Phaser.Sprite //new Sprite(game, x, y, key, frame)
	Phaser.Sprite.call(this, game, 50, (game.world.height - 800), key, frame); 

	//add properties
	this.scale.x = scale;		//set x scale
	this.scale.y = scale;		//set y scale
   this.anchor.x = 0.5;       //set center x
   this.anchor.y = 0.5;       //set center y
	
	//setup physics
	game.physics.arcade.enable(this);		//enable arcade physics
	this.body.collideWorldBounds = true;	//make player collide with edge of screen
	this.body.gravity.y = 300;				//how fast we fall
	
	//create an object to listen to the arrow keys
	this.cursors = game.input.keyboard.createCursorKeys();

	//create a variable to track player orientation
	this.facingRight = true;	//true if player faces right; false if player faces left
}

//specify the object's prototype and constructor
Player.prototype = Object.create(Phaser.Sprite.prototype);
Player.prototype.constructor = Player;

//override the built-in update function
Player.prototype.update = function() {
	//var hitPlatform = game.physics.arcade.collide(player, platforms);

	//handle player horizontal movement
	this.body.velocity.x = 0;	//reset player horizontal velocity
	if (this.cursors.left.isDown) {	//did player press the left arrow key?
		//move left
		this.body.velocity.x = -150;
		this.facingRight = false;	//we're moving left
	} else if (this.cursors.right.isDown)	{ //did player press the right arrow key?
		//move right
		this.body.velocity.x = 150;
		this.facingRight = true;	//we're moving right
	} else {	//no input detected
		//do nothing
	}

	//handle player vertical movement
	//this.body.velocity.y = 0;	//reset vertical velocity
	if(this.cursors.up.isDown && this.body.touching.down) {// && hitPlatform) {	//did the player press the up arrow key while standing on the ground?
		//move up
		this.body.velocity.y = -350;
	}
	else if (this.cursors.down.isDown)	//did the player press the down arrow key?
	{
		//do nothing
	}
	else {	//player pressed no keys
		//do nothing
	}
}