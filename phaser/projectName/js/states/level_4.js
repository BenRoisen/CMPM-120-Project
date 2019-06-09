//tutorial level
var loadLevel_4 = function(game, player, platforms, enemies, orePots, exit, ores, specialEntities, decorations, bigOres, background) {
   //empty out all the old level elements
   platforms.removeAll(true);
   enemies.removeAll(true);
   orePots.removeAll(true);
   exit.removeAll(true);
   ores.removeAll(true);
   decorations.removeAll(true);
   specialEntities.removeAll(true);

   // Change background
   background.loadTexture('bigOreBG');

   //resize the world to match the new level dimensions
   game.world._definedSize = false; //this lets us make the world smaller than it is currently
   game.world.resize(3000,600);

   //reset the player's position
   player.body.moves = false;
   player.x = 140;
   player.y = 0;
   player.body.moves = true;
   console.log(player);

   //create the ground
   var ground = platforms.create(0, 450, 'platform_med');
   ground.scale.setTo(7, 1);     //scale the ground to fit the game (sprite is 300x68, & we need to to be 2000x16)
   ground.body.immovable = true; //make the ground immovable so it won't fall when player touches it
   ground.alpha = 0;

   bigore = new BigOre(game, 'obsidian', 2400, 375, player);
   game.add.existing(bigore);
   bigOres.add(bigore);

   var forground = decorations.create(0, 0, 'bigOreFG');
}

