//tutorial level
var loadLevel_0 = function(game, player, platforms, enemies, orePots, exit, ores, specialEntities, dialogue, decorations, background) {
	//empty out all the old level elements
	platforms.removeAll(true);
	enemies.removeAll(true);
	orePots.removeAll(true);
	exit.removeAll(true);
	ores.removeAll(true);
	specialEntities.removeAll(true);
	decorations.removeAll(true);

	//change the background to reflect the new level
	background.loadTexture('background_0');
	
	//resize the world to match the new level dimensions
	game.world._definedSize = false;	//this lets us make the world smaller than it is currently
	game.world.resize(1000,600);

	//reset the player's position
	player.body.moves = false;	//temporarily disable physics movement control so we can warp them
	player.x = 615;
	player.y = 256;
	player.body.moves = true;	//re-enable physics movement

	//spawn some tutorial arrows
	player.arrowLeft = new Arrow(game, 'keyL', 575, 216);
	game.add.existing(player.arrowLeft);
	player.arrowRight = new Arrow(game, 'keyR', 655, 216);
	game.add.existing(player.arrowRight);
	player.facingRight = false;
	player.scale.x *= -1;

	//create the ground
	var ground = platforms.create(0, 415, 'platform_med');
	// ground.scale.setTo(6.66, 25/17);		//scale the ground to fit the game (sprite is 300x68, & we need to to be 2000x16)
	ground.body.immovable = true;	//make the ground immovable so it won't fall when player touches it
	ground.body.setSize(1000, 100, 0, 0);
	ground.visible = false;

	//make the house
	var house = platforms.create(0, 0, 'wall_big');
	house.body.immovable = true;		//make wall immovable
	house.body.setSize(102, 415, 0, 0);	//adjust bounding box according to specifications
	house.visible = false;
	
	//spawn the level exit door thing
	var door = exit.create(962, 245, 'doorAtlas', 'Mineshaft1');
	door.animations.add('open', ['Mineshaft2','Mineshaft3'], 5, false);
	door.openSound = game.add.audio('smash');	//temporary sound until we get the door open noise
	door.body.immovable = true;
	door.interacttext = new Instruction(game, 'keyE', 862, 245, player);
	console.log(door.interacttext);

	// //create special entities

	// //special trigger to spawn a wall at the end of the sword section, in order to contain any excess enemies
	// var enemyContainer = specialEntities.create(1700, 200, 'platform_med');
	// enemyContainer.body.immovable = true;			//make enemyContainer immovable
	// enemyContainer.body.setSize(300, 34, 0, 17);	//adjust bounding box according to specifications
	// enemyContainer.alpha = 0;						//make enemyContainer invisible
	// enemyContainer.specialFunction = containEnemies;	//have it's special function be containing enemies
	// enemyContainer.platforms = platforms;	//enemyContainer will need access to platforms in order to spawn the wall

	//spawn blacksmiths
	var blacksmith_1 = specialEntities.create(403,230, 'smithyAtlas', 'SmithyMouthClosed');	//blacksmith @ start of level
	blacksmith_1.animations.add('speak', ['SmithyMouthOpen','SmithyMouthClosed'], 5, true);
	blacksmith_1.scale.x = -1/3;
	blacksmith_1.scale.y = 1/3;
	blacksmith_1.body.immovable = true;
	blacksmith_1.specialFunction = speak;	//temporary thing until I set up a dialogue system
	blacksmith_1.game = game;
	blacksmith_1.dialogue = dialogue;
	blacksmith_1.dialogueConvo = 0;	//0 corresponds to the sword conversation in the tutorial dialogue JSON
	blacksmith_1.dialogueLine = 0;	//start at line 0
	blacksmith_1.typing = false;	//start off not typing
	blacksmith_1.dialogueState = 0;	//start off in "not talked to"
	blacksmith_1.player = player;
	blacksmith_1.interacttext = new Instruction(game, 'keyE', 320, 180, player);
	blacksmith_1.speak_1 = game.add.audio('oldMan_1');
	blacksmith_1.speak_2 = game.add.audio('oldMan_2');
	blacksmith_1.speak_3 = game.add.audio('oldMan_3');
	blacksmith_1.speak_4 = game.add.audio('oldMan_4');
	blacksmith_1.sounds = [blacksmith_1.speak_1, blacksmith_1.speak_2, blacksmith_1.speak_3, blacksmith_1.speak_4];
	game.add.existing(blacksmith_1.interacttext);
}

var containEnemies = function() {
	console.log('sealing off enemies...');
	//spawn a wall at the end of the sword section
	var wall = this.platforms.create(1500, -83, 'wall_med');
	wall.body.immovable = true;
	wall.body.setSize(34, 300, 17, 17);
	//remove the trigger to prevent wall spam
	this.kill();
}

var speak = function() {
	//this is a stripped-down version of the dialogue system code given as an example in lecture 18.
	//all credit to Professor Nathan Altice (for the parts that work, at least - the crappy parts are my doing)

	/*A NOTE ON THE VALUES OF DIALOGUESTATE:
	 * 0: not yet talked to
	 * 1: talking to player
	 * 2: finished talking
	 */

	this.interacttext.showing = true;
	
	//only "update" if the player presses E
	if(!this.game.input.keyboard.justPressed(Phaser.Keyboard.E)) {
		return;
	}
	
	console.log('talking to the blacksmith...');
	console.log(this.dialogueState);

	if(this.dialogueState == 0) {	//if we haven't been talked to yet, perform some first-time setup
		//create the dialogue box
		this.dialogueBox = this.game.add.sprite(170, 420, 'dialogueBox');	//the dialogue background
		this.dialogueBox.fixedToCamera = true;
		this.dialogueText = this.game.add.text(220, 445, '', {fontSize: '24px', fill: '#fff' });	//the dialogue text
		this.dialogueText.fixedToCamera = true;
		this.nextText = this.game.add.text(805, 594, '', {fontSize: '24px', fill: '#aaa' });	//tells us what key to press to advance the dialogue
		this.nextText.fixedToCamera = true;
		this.dialogueState = 1;	//switch to state 1 ("talking to player")
		this.player.inDialogue = true;	//disable player movement & sword swinging
		this.interacttext.kill();

		//add the speaker's portrait
		//this.speakerImage = this.game.add.sprite(275, 285, 'player');	//replace with blacksmith sprite later
		this.speakerImage = this.game.add.sprite(275,285, 'smithyAtlas', 'SmithyMouthClosed');	//blacksmith @ start of level
		this.speakerImage.animations.add('speak', ['SmithyMouthOpen','SmithyMouthClosed'], 5, true);
		this.speakerImage.fixedToCamera = true;
		this.speakerImage.anchor.set(0.5);
		this.speakerImage.scale.x = -1.25/3;//setTo(1.5);
		this.speakerImage.scale.y = 1.25/3;

		//add the listener's portrait
		this.listenerImage = this.game.add.sprite(725, 285, 'player');
		this.listenerImage.fixedToCamera = true;
		this.listenerImage.anchor.set(0.5);
		this.listenerImage.scale.x = -1.5;
		this.listenerImage.scale.y = 1.5;

		//add the conversation emote
		this.emote = this.game.add.sprite(500, 125, 'swordBlade');	//CHANGE THIS SPRITE LATER
		this.emote.fixedToCamera = true;
		this.emote.anchor.set(0.5);
		this.emote.scale.setTo(0.5);
	}
	else if(this.dialogueState == 2) {	//if we're done talking, remove the dialogue box & other dressings
		this.dialogueBox.kill();
		this.dialogueText.kill();
		this.nextText.kill();
		this.speakerImage.kill();
		this.listenerImage.kill();
		this.emote.kill();
		this.typing = false;
		this.player.inDialogue = false;	//re-enable player movement & sword swinging

		//re-enable player movement/sword/etc.
		//PUT SOMETHING HERE LATER

		//attempt to reset the system
		//DO NOT ENABLE - there's some bug going on where on the second time talking, the system starts off in random places in the dialogue
		// this.dialogueState = 0;
		// this.dialogueLine = 0;
	}

	//halt if we're already typing
	//DO NOT COMBINE THIS CHECK WITH THE ONE FOR PRESSING E - the state-checking If statements to execute based ONLY on whether we're pressing E,
	//while the rest of this system needs the additional question of whether or not we're already typing
	if(this.typing) {
		return;
	}

	//alert the system that we're typing and should not allow advancements
	this.typing = true;
	//clear the dialogue text
	this.dialogueText.text = '';
	
	//stop once we hit the end of the conversation (assume the next conversation either doesn't exist or goes to a different blacksmith)
	if(this.dialogueLine > this.dialogue[this.dialogueConvo].length-1) {
		console.log("finished conversation");
		this.dialogueState = 2;	//switch to state 2 ("done talking")
	}
	else {
		this.speakerImage.animations.play('speak');
		this.currentSound = this.sounds[this.game.rnd.integerInRange(0, 3)]
		this.currentSound.play();
		//update emote
		if(this.dialogue[this.dialogueConvo][this.dialogueLine]['newEmote']) {	//if a new emote was specified
			var newEmote = this.dialogue[this.dialogueConvo][this.dialogueLine]['newEmote'];
			console.log('we want the new emote to be "' + newEmote + '"');
			if(newEmote == "OVERRIDE_NONE") {	//special value for no emote
				console.log('disabling sprite...');
				this.emote.alpha = 0;	//become completely transparent
			}
			else {	//we want an emote sprite that we've already loaded into memory
				this.emote.loadTexture(newEmote);	//swap emote's texture to that of the new emote
				this.emote.alpha = 1;	//become fully visible
			}
		}

		// build dialogue (concatenate speaker + line of text)
		this.dialogueLines = this.dialogue[this.dialogueConvo][this.dialogueLine]['speaker'].toUpperCase() + ': ' + this.dialogue[this.dialogueConvo][this.dialogueLine]['dialog'];

		// setup timer to iterate through each letter in dialogue
		let currentChar = 0;
		this.textTimer = this.game.time.events.repeat(10, this.dialogueLines.length, function(){
			this.nextText.text = '';	//don't display the prompt for input until text is fully displayed
			this.dialogueText.text += this.dialogueLines[currentChar];
			currentChar++;
		}, this);
		// callback function fires once timer is finished
		this.textTimer.timer.onComplete.addOnce(function(){
			// show prompt for more text
			this.nextText.text = '[E]';
			this.nextText.anchor.setTo(1, 1);
			//halt speaking animation & sound
			this.speakerImage.animations.stop('speak');
			this.currentSound.stop();
			// un-lock input
			this.typing = false;
		}, this);
			
		// set bounds on dialogue
		this.dialogueText.wordWrap = true;
		this.dialogueText.wordWrapWidth = 575;

		// increment dialogue line
		this.dialogueLine++;
	}
}

// var talk_hammer = function() {
// 	console.log('talking to the blacksmith about hammer...');
// }