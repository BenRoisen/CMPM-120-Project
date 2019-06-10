function BigOre(game, key, x, y, player) {
   Phaser.Sprite.call(this, game, x, y, 'bigOreAtlas', 'BigOreFine01');
   this.game = game;
   this.game.physics.arcade.enable(this);
   this.x = x;
   this.y = y;
   this.anchor.x = 0.5;
   this.anchor.y = 0.5;
   this.body.immovable = true;

   this.hits = 3;
   this.player = player;
   this.got_hit = false;
   this.fading = false;
   this.fadeTime = 229;

   this.emitter = game.add.emitter(this.x, this.y, 100);
   this.emitter.particleClass = OreShard;
   this.emitter.gravity = 800;

   this.animations.add('hit0', Phaser.Animation.generateFrameNames('BigOreFine', 1, 5, '', 2), 5, true);
   this.animations.add('hit1', Phaser.Animation.generateFrameNames('BigOreCrack', 1, 5, '', 2), 5, true);
   this.animations.add('hit2', Phaser.Animation.generateFrameNames('BigOreLargeCrack', 1, 5, '', 2), 5, true);
   this.animations.add('hit3', Phaser.Animation.generateFrameNames('BigOreBroken', 1, 5, '', 2), 5, true);
   this.body.setSize(466, 1000, 0, 0);
}
BigOre.prototype = Object.create(Phaser.Sprite.prototype);
BigOre.prototype.constructor = BigOre;

BigOre.prototype.update = function() {

   if(this.got_hit) 
   {
      console.log("got hit");
      this.hits--;
      this.got_hit = false;
      this.emitter.makeParticles();
      this.emitter.start(true, 800, null, 20);
   }

   if(this.hits <= 0 && !this.fading)
   {
      this.emitter.makeParticles();
      this.emitter.start(true, 2000, null, 100);
      whiteOut = new WhiteOut(game, 'white', 0, 0, this.player);
      game.add.existing(whiteOut);
      this.fading = true;
   }

   if(this.fading)
   {
      if(this.fadeTime > 0)
      {
         --this.fadeTime;
      } else {
         console.log("onEmitting");
         this.emitter.destroy();
         this.destroy();
      }
   }

   switch(this.hits)
   {
      case(0):
         this.animations.play('hit3');
         break;
      case(1):
         this.animations.play('hit2');
         break;
      case(2):
         this.animations.play('hit1');
         break;
      case(3):
         this.animations.play('hit0');
         break;
   }

   game.physics.arcade.collide(this, this.player);
}

// Ore Shards for the particle emitter
var OreShard = function(game, x, y) {
   Phaser.Particle.call(this, game, x, y, 'obsidian');
   this.game.physics.arcade.enable(this);
};

OreShard.prototype = Object.create(Phaser.Particle.prototype);
OreShard.prototype.constructor = OreShard;

OreShard.prototype.onEmit = function() {
   // this.alpha = 0.5;
   this.rotation = Math.random() * 2 * Math.PI;
   this.body.velocity.x = Math.cos(this.rotation) * (Math.random() * 600 +300);
   this.body.velocity.y = Math.sin(this.rotation) * (Math.random() * 600 +300);

   this.scale.x = 0.5;
   this.scale.y = 0.5;
   this.alpha = 0.5;
}

function WhiteOut(game, key, x, y, player) {
   Phaser.Sprite.call(this, game, x, y, key);
   this.game = game;
   this.scale.x = game.world.width/640;
   this.scale.y = game.world.height/640;
   this.alpha = 0;
   this.delay = 30;
   this.player = player;
}
WhiteOut.prototype = Object.create(Phaser.Sprite.prototype);
WhiteOut.prototype.constructor = WhiteOut;

WhiteOut.prototype.update = function() {

   if(this.alpha < 1)
   {
      this.alpha += 0.005;
   } else {
      if(this.delay > 0)
      {
         --this.delay;
      } else {
         game.state.start('GameOver', true, false, this.player.oreCount, true);
      }
   }
}