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
      hurdle=new Hurdle();
      hurdle.createHurdle()
    }

    runner1 = createSprite(100,200);
    runner1.addImage("R1",runner1_img);
    runner2 = createSprite(300,200);
    runner2.addImage("R2",runner2_img);
    runner3 = createSprite(500,200);
    runner3.addImage("R3",runner3_img);
    runner4 = createSprite(700,200);
    runner4.addImage("R4",runner4_img);

    runner1.setCollider("rectangle",0,0,20,70);
    runner2.setCollider("rectangle",0,0,20,70);
    runner3.setCollider("rectangle",0,0,20,70);
    runner4.setCollider("rectangle",0,0,20,70);

    runners = [runner1, runner2, runner3, runner4];

    divider1=createSprite(displayWidth/2,displayHeight/4+5,displayWidth,10);
    divider2=createSprite(displayWidth/2,displayHeight/2-20,displayWidth,10);
    divider3=createSprite(displayWidth/2,3*displayHeight/4-50,displayWidth,10);
    divider4=createSprite(displayWidth/2,displayHeight-80,displayWidth,10);

    divider1.visible=false;
    divider2.visible=false;
    divider3.visible=false;
    divider4.visible=false;
  }

  play(){
    form.hide();

    Player.getPlayerInfo();
    //player.getRunnersAtEnd();
    
    if(allPlayers !== undefined){

      background(ground_img);
      image(track_img,0,0,displayWidth*5,displayHeight);
      //var display_position = 400;
      
      //index of the array
      var index = 0;

      //x and y position of the runners
      var x = 0;
      var y = 0;

      for(var plr in allPlayers){
        //add 1 to the index for every loop
        index = index + 1 ;

        //position the runners a little away from each other in x direction
        y = y + 150;
        //use data form the database to display the runners in y direction
        x = 30+allPlayers[plr].distance;
        runners[index-1].x = x;
        runners[index-1].y = y;

        if (index === player.index){
          runners[index - 1].shapeColor = "red";
          camera.position.x = x;
          camera.position.y = displayHeight/2;
        }

        //textSize(15);
        //text(allPlayers[plr].name + ": " + allPlayers[plr].distance, 120,display_position)
      }

    }

    if(keyIsDown(RIGHT_ARROW) && player.index !== null){
      player.distance +=10
      player.update();
    }

    if(player.distance>=5100){
      gameState=2;
      player.rank+=1;
      Player.updateRunnerssAtEnd(player.rank);
      player.WinMessage();
      player.updatePlayerInfo();
      end();
    }

    for(var i=0;i<hurdleGroup.length;i++){
      for(var j=0;j<4;j++){
          if(players[j].isTouching(hurdleGroup.get(i))){
              hurdleGroup.get(i).rotation=90;
              player.updatePlayerInfo();
          }
      }
  } 

    player1.collide(divider1);
    player2.collide(divider2);
    player3.collide(divider3);
    player4.collide(divider4);
    
    drawSprites();
  }

  end(){
    console.log("Game Ended");
    console.log(player.rank);
  }
}
