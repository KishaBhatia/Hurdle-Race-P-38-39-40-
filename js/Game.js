class Game {
  constructor(){}

  getState(){
    var gameStateRef  = database.ref('gameState');
    gameStateRef.on("value",function(data){
       gameState = data.val();
    })

  }

  update(state){
    database.ref('/').update({
      gameState: state
    });
  }

  async start(){
    if(gameState === 0){
      player = new Player();
      var playerCountRef = await database.ref('playerCount').once("value");
      if(playerCountRef.exists()){
        playerCount = playerCountRef.val();
        player.getCount();
      }
      form = new Form()
      form.display();
    }

    runner1 = createSprite(100,200);
    runner1.addImage("R1",runner1_img);
    runner2 = createSprite(300,200);
    runner2.addImage("R2",runner2_img);
    runner3 = createSprite(500,200);
    runner3.addImage("R3",runner3_img);
    runner4 = createSprite(700,200);
    runner4.addImage("R4",runner4_img);
    runners = [runner1, runner2, runner3, runner4];
  }

  play(){
    form.hide();

    Player.getPlayerInfo();
    
    if(allPlayers !== undefined){

      background(ground_img);
      image(track_img,0,0,displayWidth,displayHeight);
      //var display_position = 400;
      
      //index of the array
      var index = 0;

      //x and y position of the runners
      var x = 200;
      var y = 500;

      for(var plr in allPlayers){
        //add 1 to the index for every loop
        index = index + 1 ;

        //position the runners a little away from each other in x direction
        y = y + 200;
        //use data form the database to display the runners in y direction
        x = displayWidth - allPlayers[plr].distance;
        runners[index-1].x = x;
        runners[index-1].y = y;

        if (index === player.index){
          runners[index - 1].shapeColor = "red";
          camera.position.x = displayWidth/2;
          camera.position.y = runners[index-1].y
        }

        //textSize(15);
        //text(allPlayers[plr].name + ": " + allPlayers[plr].distance, 120,display_position)
      }

    }

    if(keyIsDown(UP_ARROW) && player.index !== null){
      player.distance +=10
      player.update();
    }

    if(player.distance>3740){
      gameState=2;
    }


    drawSprites();
  }

  end(){
    console.log("Game Ended");
  }
}
