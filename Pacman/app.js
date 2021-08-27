  var pacmans = [];
  var ghosts = [];
  var level;
  var hud;
  var ghost_img;
  var intro_music;
  var pacman_chomp_sound;
  var pacman_death_sound;
  var pacman_eatghost_sound;
  var power_pellet_sound;
  var congratulations_sound;
  var boom_sound;
  var gameover = false;
  var button;
  var button1;
  var font;
  


  function preload() {
      ghost_img = loadImage('images/ghosts.png');
      logo = loadImage('images/logo.png');
      logo1 = loadImage('images/logo1.png');
      loadImage('images/exit.png');
      loadImage('images/play.png');
      font = loadFont("Font.otf");

      intro_music = loadSound('sounds/pacman_beginning.mp3');
      intro_music.setVolume(0.0);

      pacman_chomp_sound = loadSound('sounds/pacman_chomp.m4a');
      pacman_chomp_sound.setVolume(0.00);

      pacman_death_sound = loadSound('sounds/pacman_death.mp3');
      pacman_death_sound.setVolume(0.0);

      pacman_eatghost_sound = loadSound('sounds/ghost-die.m4a');
      pacman_eatghost_sound.setVolume(0.0);

      power_pellet_sound = loadSound('sounds/power_pellet.m4a');
      power_pellet_sound.setVolume(0.0);

      congratulations_sound = loadSound('sounds/congratulations.m4a');
      congratulations_sound.setVolume(0.0);

      boom_sound = loadSound('sounds/boom.m4a');
      boom_sound.setVolume(0.0);



  }


  function newLevel(level_num) {
      congratulations_sound.play();
      hud.updateLevel(level_num);
      level.buildNewMap(level.blueprint1);


  }
  

  function setup(players_num) {
      angleMode(DEGREES);
      rectMode(CENTER);
      imageMode(CENTER);
      mode = 0
      textFont(font);

      var pacmans = [];

      var game_height = 810;
      var game_width = game_height;

      createCanvas(game_width, game_height);
      background(0);

      level = new Level(1, players_num);
      level.buildNewMap(level.blueprint1);

      hud = new HUD(1);

  }

  function mode1() {

    mode = 1;
    
}

function exitGame() {

    window.close();
    
}

  function draw() {
    if (mode == 0){

        background(0);
        image(logo, 410, 315, 450, 300);
        image(logo1, 400, 100, 300, 120);
        fill("White");
        textSize(35);
        text("2021", 260, 160);
        textSize(25);
        text("3815ICT / 7805ICT", 300, 205);
        textSize(15);
        text("Yasin Cakar", 5, 730);
        text("Mohammad Mari", 5, 760);
        text("David Todorovic", 5, 790);
        // Play button
        button = createImg('images/play.png');
        button.position(325, 475);
        button.size(175, 75);
        button.mousePressed(mode1);
        // Configrure button
        textSize(25);
        text("CONFIGURE", 330, 625);
        // Exit button
        button1 = createImg('images/exit.png');
        button1.position(325, 700);
        button1.size(175, 75);
        button1.mousePressed(exitGame);
    }


    if (mode == 1) {
      removeElements();
      background(0);
      level.drawMap(level.current_map);


      //show pacmans
      var lives_remaining = 0;

      for (i = 0; i < pacmans.length; i++) {

          if (!pacmans[i].is_dying) {
              pacmans[i].hits(level.pellets);
              pacmans[i].hits(level.power_pellets);
              pacmans[i].hits(ghosts);
              pacmans[i].move();
          }
          pacmans[i].show();

          lives_remaining += pacmans[i].lives;

      }

      if (lives_remaining === 0) {
          gameover = true;
      }


      //show ghosts
      for (i = 0; i < ghosts.length; i++) {

          if (!gameover && pacmans[0].is_moving) {
              ghosts[i].move();
          }
          ghosts[i].show();

      }

      hud.show();
    }
  }


  function keyPressed(e) {

      e.preventDefault();

      if (gameover) {

          if (keyCode === 13 || keyCode === 49) {
              setup(1);
              intro_music.play();
              gameover = false;
          } else if (keyCode === 50) {
              setup(2);
              intro_music.play();
              gameover = false;
          }

      } else {

          pacmans[0].is_moving = true;


          switch (keyCode) {

              //player 1 
          case 87: //up
              pacmans[1].changeNextDir([0, -1], 270);
              break;
          case 68: //right
              pacmans[1].changeNextDir([1, 0], 0);
              break;
          case 83: //down
              pacmans[1].changeNextDir([0, 1], 90);
              break;
          case 65: //left
              pacmans[1].changeNextDir([-1, 0], 180);
              break;

              //player 2      
          case 38: //up
              pacmans[0].changeNextDir([0, -1], 270);
              break;
          case 39: //right
              pacmans[0].changeNextDir([1, 0], 0);
              break;
          case 40: //down
              pacmans[0].changeNextDir([0, 1], 90);
              break;
          case 37: //left
              pacmans[0].changeNextDir([-1, 0], 180);
              break;

          case 27: //escape eats all pellets
              level.pellets.forEach(function (pellet) {
                  pellet.empty = true;
              });

              level.power_pellets.forEach(function (pellet) {
                  pellet.empty = true;
              });
              break;

              //debug
              //          case 16: //shift moves ghost
              //              ghosts[0].move();
              //              break;
              //          case 32: //spacebar (moves one)
              //              for (i = 0; i < pacmans.length; i++) {
              //                  pacmans[i].move();
              //
              //              }
              break;

          }

      }





  }