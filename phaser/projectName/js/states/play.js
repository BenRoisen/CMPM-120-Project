//Define Play state and methods
var Play = function(game) {};
Play.prototype = {
	init: function(skipTutorial) {
		console.log('Play: preload');
		//create all the variables we need
		this.background;
		this.player;
		this.platforms;
		this.swords;	//keeps track of the sword
		this.score = 0;	//keeps track of score (# of ore pieces)
      this.oreCollected = 0; // keeps track of how many ore has been picked up in this level
		this.scoreText;
		this.ores;			//group to hold ores
		this.exit;
		this.specialEntities;	//group to hold special game elements
      this.bigOres;
      this.skipTutorial = skipTutorial;
		//this.dialogueText = null;
		//this.nextText = null;
		this.allowLevelExit = false;	//controls whether player can leave the level

      this.music = game.add.audio('music');
      this.playerOof = game.add.audio('oof');
      this.pickup = game.add.audio('pickup');
      this.doorOpen = game.add.audio('doorOpen');

	},
	preload: function() {
		console.log('Play: preload');
	},
	create: function() {
		//game.time.advancedTiming = true;	//enable this line to enable FPS counter

		//enable arcade physics
		game.physics.startSystem(Phaser.Physics.ARCADE);
		game.physics.arcade.TILE_BIAS = 32;

		//prepare any dialogue text we'll need
		this.tutorial_dialogue = JSON.parse(game.cache.getText('tutorial_dialogue'));
		//MORE PARSE STATEMENTS HERE AS NEEDED

		//create the background
		this.background = this.add.sprite(0, 0, 'background');
		game.stage.backgroundColor = "#888888";	//create a blue background

		//set the world size
		game.world.setBounds(0, 0, 2000, 1200)	//for now, world is 2x size of screen

		//create a group to hold collidable platforms
		this.platforms = game.add.group();
		this.platforms.enableBody = true;	//enable collisions

		//create a group to hold the level exit door thing
		this.exit = game.add.group();
		this.exit.enableBody = true;

		//Set up the decorations group (to hold non-interactable sprites)
		this.decorations = game.add.group();

		//create the player
		this.player = new Player(game, 'player', 0, 1, this.platforms);	//player(game, key, frame, scale)
		game.add.existing(this.player);
		game.camera.follow(this.player);	//make camera follow player

		//set up scoreText to display player ore count
		this.scoreText = game.add.text(65, 70, 'x0', {font: 'Lucida Casual', fontStyle: 'italic', fontSize: '32px', fill: '#fff' });	//made the text white so it stands out against the shadow
		this.scoreText.fixedToCamera = true;	//make it move with the camera
		this.oreIcon = game.add.sprite(16, 65, 'obsidian');	//icon of the ore sprite to show what we're counting
		this.oreIcon.fixedToCamera = true;
		this.oreIcon.scale.setTo(0.3);

		//set up swordText to display player sowrd length
		this.swordText = game.add.text(16, 12, 'x5', {font: 'Lucida Casual', fontStyle: 'italic', fontSize: '32px', fill: '#fff' });	//made the text white so it stands out against the shadow
		this.swordText.fixedToCamera = true;	//make it move with the camera

		//set up ores
		this.ores = game.add.group();
		this.ores.enableBody = true;
		
		//set up ore pots
		this.orePots = game.add.group();
		this.orePots.enableBody = true;

		//set up enemies
		this.enemies = game.add.group();

      //create the hammer hitbox
      this.hammer = new Hammer(game, 'swordHilt', this.player, this.platforms, this.enemies, this.orePots);
      game.add.existing(this.hammer);
		
      this.swords = game.add.group();  //create the sword group

		//make the sword UI
		this.swordUI = game.add.group();
		//looks confusing, but this basically just creates each UI part and immediately fixes it to the camera
		(this.swordUI.create(5, 5, 'swordHilt')).fixedToCamera = true;	//sword hilt
		for(var i = 0; i < 16; i++) {	//spawn 17 blade segments (the most we can fit onscreen)
			(this.swordUI.create((106 + (49 * i)), 5, 'swordBlade')).fixedToCamera = true;	//make the segment move with the camers
		}

		//set up the specialEntities group
		this.specialEntities = game.add.group();
		this.specialEntities.enableBody = true;

      //Set up the big ore
      this.bigOres = game.add.group();

		//load the first level.
		//NOTE: make sure that any groups/etc. that will be needed for ALL levels have been set up prior to this.
		//(at the very least, make sure all the groups used by the sword have been declared BEFORE calling this function) 
		//loadLevel_1(this.game, this.player, this.platforms, this.enemies, this.orePots, this.exit, this.ores, this.specialEntities, this.decorations, this.bigOres, this.background);
		
		//set up the light mask
		this.shadowTexture = this.game.add.bitmapData(game.width, game.height);	//texture for the light mask
		var shadow = game.add.image(0,0,this.shadowTexture);	//spawn a sprite with the shadow texture
		shadow.blendMode = Phaser.blendModes.MULTIPLY;	//darken the colors of everything below the shadow
		shadow.fixedToCamera = true;
		
		//load the first level.
		//NOTE: make sure that any groups/etc. that will be needed for ALL levels have been set up prior to this.
		//(at the very least, make sure all the groups used by the sword have been declared BEFORE calling this function) 

      if(this.skipTutorial)
      {
         this.levelTracker = 1;
         loadLevel_1(this.game, this.player, this.platforms, this.enemies, this.orePots, this.exit, this.ores, this.specialEntities, this.decorations, this.bigOres, this.background);
      } else {
         //create a variable to keep track of which level we're on
         this.levelTracker = 0; // Change back to one later
         loadLevel_0(this.game, this.player, this.platforms, this.enemies, this.orePots, this.exit, this.ores, this.specialEntities, this.tutorial_dialogue, this.decorations, this.background);
      }

		//bring the UI to the topmost z-level so it renders over the shadow
		game.world.bringToTop(this.scoreText);
		game.world.bringToTop(this.swordText);
		game.world.bringToTop(this.swordUI);
		game.world.bringToTop(this.oreIcon);

      this.music.play('', 0, 1, true);
	},
	update:function() {
		//open door if all ores collected
      if(!this.allowLevelExit)
      {
         if(this.orePots.length <= this.oreCollected)
         {
            //play the "door opens" animation & sound
            var k;
            for (k = 0; k < this.exit.length; k++) {
               var element = this.exit.getChildAt(k);
               element.animations.play('open');       }
            //allow player to exit level
            this.allowLevelExit = true;
            this.doorOpen.play();
         }
      }
		

		//let player collide with platforms
		game.physics.arcade.collide(this.player, this.platforms);

		//swing sword when spacebar is pressed
		if(game.input.keyboard.downDuration(Phaser.Keyboard.SPACEBAR, 1)) {
			if((this.swords.length < 1) && !this.player.inDialogue) {	//only spawn a sword if one isn't currently in action
				var sword = new Sword(game, 'swordArm', 'swordBlade', this.player, this.platforms, this.enemies, this.orePots, this.bigOres);
				this.swords.add(sword);
			}
		}

      // Boolean to track if the player has a sword or not
      if(this.swords.length < 1)
      {
         this.player.swordOut = false;
      } else {
         this.player.swordOut = true;
      }


		//let player collide with enemies (TODO)
		game.physics.arcade.overlap(this.player, this.enemies, this.touchEnemy, null, this);

		//let the hammer collide with ore pots
      if(game.input.keyboard.isDown(Phaser.Keyboard.DOWN))
      {
         game.physics.arcade.overlap(this.hammer, this.orePots, this.touchOrePot, null, this);
      }	
		game.physics.arcade.collide(this.orePots, this.platforms);

		//handle ore collisions
		game.physics.arcade.overlap(this.player, this.ores, this.touchOre, null, this);	//let player collect ores
		game.physics.arcade.collide(this.ores, this.platforms);							//make ores collide with platforms

		//handle collisions w/ the endgame door thing
		game.physics.arcade.overlap(this.player, this.exit, this.touchExit, null, this);

		//handle collisions with special elements
		game.physics.arcade.overlap(this.player, this.specialEntities, this.touchSpecial, null, this);

      // Repairs the sword when given a signal from player
      if(this.player.repairedSword)
      {
         if(this.score > 0) { //only allow repair if we have ore
            this.player.swordLength += 1;
            this.score -= 1;
         }
         this.player.repairedSword = false;
      }

      if(this.score > 0)
      {
         this.player.hasOre = true;
      } else {
         this.player.hasOre = false;
      }
      this.player.oreCount = this.score;
		
		//update the sword UI - make length reflect our current sword length
		var i;
		for (i = 1; i < this.swordUI.length; i++) {	//for each blade segment of the UI
			var segment = this.swordUI.getChildAt(i);	//get the blade segment at index i
			if(i <= this.player.swordLength) {	//if this segment is on our current sword, make it visible
				segment.visible = true;
				this.swordText.cameraOffset.x = segment.cameraOffset.x + 90;	//have swordText render just beyond the tip of the sword
			} else {					//if this segment broke off, make it invisible
				segment.visible = false;
			}
		}

		//update the text-based UI
		//we have to do this each update rather than on some event because there's no good way to let the sword trigger an update if it hits a wall
		this.scoreText.text = 'x' + this.score;
		this.swordText.text = 'x' + this.player.swordLength;

		//update the shadow
		this.updateShadowTexture(this.shadowTexture);
	},
	render:function() {
		//game.debug.body(this.player);
		//game.debug.physicsGroup(this.exit);
		//game.debug.physicsGroup(this.platforms);
		//game.debug.text(game.time.fps, 2, 14, "#00ff00");
	},

   touchEnemy:function(player, enemy) {
    	//deal damage to player if we're not in "invincibility frames"
    	if(!this.player.invincible && enemy.state != 5 && 
               !(game.input.keyboard.isDown(Phaser.Keyboard.DOWN) && player.y + 50 <= enemy.y && !player.can_jump)) {
         console.log(enemy.state);
         this.playerOof.play();
      	this.player.swordLength -= 1;		//lose health
      	if(this.player.swordLength < 0) {	//if dead, go to Game Over
      		game.sound.stopAll();
      		game.state.start('GameOver', true, false, this.score, false);
      	}

         // Push the player and enemy away from each other
         this.player.body.velocity.x += 300;
         this.player.body.velocity.y += 300;

      	this.player.invincible = true;	//temporarily become invincible (to avoid having your health instantly disappear)
      	game.time.events.add(1000, this.toggleInvincible, this);	//become mortal again after 1 second
  		}
   },

   touchOre:function(player, ore) {
   		if(ore.vulnerable) {	//only allow pickup once ore has existed for a bit (see touchOrePot)
   			//remove the ore
   			ore.kill();
            //update the score
   			this.score += 1;
            this.oreCollected += 1;
            // play a sound
            this.pickup.play();
            console.log(this.orePots.length);
            console.log(this.oreCollected);
   		}
   },

	toggleInvincible:function() {
		this.player.invincible = false;	//reset invincibility
      this.player.alpha = 1;
	},

	touchOrePot:function(hammer, pot) {
		//spawn an ore at the pot's location
		var ore = this.ores.create(pot.body.x, pot.body.y, 'obsidian');
		ore.scale.setTo(0.5);
		ore.body.gravity.y = 150;	//make the ore fall
		
		//give a short delay before the ore can be picked up (so it doesn't instantly disappear)
		ore.vulnerable = false;		//start off invulnerable
		var spawnTimer = game.time.create(true);
		spawnTimer.add(500,this.enableOre,this, ore);	//after half a second, let the ore be picked up
		spawnTimer.start();
		
		pot.kill();	//remove the old pot now that we're done with it
	},

	enableOre:function(ore) {
		ore.vulnerable = true;
	},

	touchExit:function(player, exit) {
		//only exit level if player presses E and player has collected all ores
		if(game.input.keyboard.downDuration(Phaser.Keyboard.E, 1) && this.allowLevelExit) {
			//figure out where to go from here
			switch(this.levelTracker) {
				case(0): 	//finished tutorial - load level 1
					//update levelTracker and load level 1
					console.log('loading level 1...');
					this.levelTracker = 1;
					//loadLevel_1(this.game, this.player, this.platforms, this.enemies, this.orePots, this.exit, this.ores, this.specialEntities);
					loadLevel_1(this.game, this.player, this.platforms, this.enemies, this.orePots, this.exit, this.ores, this.specialEntities, this.decorations, this.bigOres, this.background);
					break;
				case(1): 	//finished level 1 - load level 2
					//update levelTracker and load level 2
					console.log('loading level 2...');
					this.levelTracker = 2;
					//loadLevel_2(this.game, this.player, this.platforms, this.enemies, this.orePots, this.exit, this.ores, this.specialEntities);
					loadLevel_2(this.game, this.player, this.platforms, this.enemies, this.orePots, this.exit, this.ores, this.specialEntities, this.decorations, this.background);
					break;
				case(2): 	//finished level 2 - load level 3
					console.log('loading level 3...');
					this.levelTracker = 3;
					//loadLevel_3(this.game, this.player, this.platforms, this.enemies, this.orePots, this.exit, this.ores, this.specialEntities);
					loadLevel_3(this.game, this.player, this.platforms, this.enemies, this.orePots, this.exit, this.ores, this.specialEntities, this.decorations, this.background);
					break;
            case(3):    //finished level 2 - load level 3
               console.log('loading level 4...');
               this.levelTracker = 3;
               //loadLevel_3(this.game, this.player, this.platforms, this.enemies, this.orePots, this.exit, this.ores, this.specialEntities);
               loadLevel_4(this.game, this.player, this.platforms, this.enemies, this.orePots, this.exit, this.ores, this.specialEntities, this.decorations, this.bigOres, this.background);
               break;
				default: 	//default case - we've finished all levels and now want to go to game over
					game.state.start('GameOver', true, false, this.score, true);
					break;
			}
			this.allowLevelExit = false;	//disable the exit for the next level until all ores collected
         this.oreCollected = 0;
		}
	},

	touchSpecial:function(player, entity) {
		//assume that the entity has a built-in function for this scenario
		entity.specialFunction();
	},

	updateShadowTexture:function(shadowTexture) {
		//the following code is adapted from https://gamemechanicexplorer.com/#lighting-3

		//fill shadowTexture with a dark shadow color
		shadowTexture.context.fillStyle = 'rgb(40, 40, 40)';
      if(this.levelTracker == 0)
      {
         shadowTexture.context.fillStyle = 'rgb(255, 255, 255)';
      }
		shadowTexture.context.fillRect(0, 0, this.game.width, this.game.height);

		if(this.player.swordLength < 0) {
			return;
		}

		//get the player's position relative to the game window (in order to calculate the light position correctly)
		var x = this.player.x - this.game.camera.x;
		var y = this.player.y - this.game.camera.y;

		//draw the glow centered on the player
		var light_radius = ((this.player.swordLength * 59) + 128) * 0.5;	//radius of "pure light" (i.e. no flicker)	-this value should match the calculation for swordbox offset in sword.js
		var radius = light_radius + this.game.rnd.integerInRange(1, 10);	//radius of light (counting the flicker part)
		var gradient = shadowTexture.context.createRadialGradient(x, y, light_radius * 0.75, x, y, radius);	//create a gradient to blend the light into the background
		gradient.addColorStop(0, 'rgba(255, 255, 255, 1.0)');
		gradient.addColorStop(1, 'rgba(255, 255, 255, 0.0)');
		shadowTexture.context.beginPath();
		shadowTexture.context.fillStyle = gradient;
		shadowTexture.context.arc(x, y, radius, 0, Math.PI * 2);
		shadowTexture.context.fill();

      if(this.bigOres.length != 0)
      {
         this.bigOres.forEach(function(bigOre) {
            // Randomly change the radius each frame
            var radius = 500 + this.game.rnd.integerInRange(1,10);

            var x = bigOre.x - this.game.camera.x;
            var y = bigOre.y - this.game.camera.y;

            // Draw circle of light with a soft edge
            var gradient =
            this.shadowTexture.context.createRadialGradient(
               x, y, radius * 0.75,
               x, y, radius);
            gradient.addColorStop(0, 'rgba(255, 255, 255, 1.0)');
            gradient.addColorStop(1, 'rgba(255, 255, 255, 0.0)');

            this.shadowTexture.context.beginPath();
            this.shadowTexture.context.fillStyle = gradient;
            this.shadowTexture.context.arc(x, y, radius, 0, Math.PI*2);
            this.shadowTexture.context.fill();
         }, this);
      }

		//tell Phaser that it should update the cached version of shadowTexture
		shadowTexture.dirty = true;
	}
};