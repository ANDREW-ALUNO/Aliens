var ball, ballImage, bg;
var paddle, paddleImage;
var edges;
var blueImage,greenImage,redImage,yellowImage;
var alienGroup;
var countAlien;
var score = 0,lifes = 5;
var gameState = "start"
var alienVelocity = 0.1


function preload(){
    
    ballImage = loadImage("ball.png");
    bg = loadImage("bg.jpg");
    paddleImage = loadImage("paddle.png");
    blueImage = loadImage ("blue.png");
    greenImage = loadImage ("green.png");
    redImage = loadImage ("red.png");
    yellowImage = loadImage ("yellow.png");
     
}

function setup() {
    createCanvas(700, 700);
    ball = createSprite(340,550,10,10);
    ball.addImage("ball",ballImage);
    ball.scale=0.05;
   
    
    paddle = createSprite(340, 600, 120, 10);
    paddle.addImage("paddle",paddleImage)
    paddle.scale=0.1
    
    edges = createEdgeSprites();
    
    alienGroup = createGroup();
    createAlienRow(100,redImage);
    createAlienRow(100+65,blueImage);
    createAlienRow(100+65+65,yellowImage);
    createAlienRow(100+65+65+65,greenImage);
}

function createAlienRow(y, alienImage){
    var x = 125;
    for (c=0; c<6; c++){
        var alien = createSprite(x,y,50,25);
        x += alien.width + 40;
        alien.addImage (alienImage);
        alien.scale = 0.07;
        alienGroup.add(alien);
    }
}

function gameplay(){
    //paddle.x = ball.x
    paddle.x = mouseX;
    if(paddle.x < 60){
       paddle.x = 60
       }
    if(paddle.x > 640){
      paddle.x = 640
    }
  if(!alienGroup[0]){
     gameState = "end"
    ball.destroy();
     text("VOCE GANHOU",350,400)
     
     }
    ball.bounceOff(edges[1]);
    ball.bounceOff(edges[0]);
    ball.bounceOff(edges[3]);
    ball.bounceOff(edges[2]);
    ball.bounceOff (paddle);
    ball.bounceOff(alienGroup, destroyAlien);
  
        
}


function destroyAlien(ball, alien){
  alien.destroy()
  score += 5
  alienVelocity += 0.1
  alienGroup.setVelocityYEach(alienVelocity)
} 





function draw(){
    background(bg);
    
    textSize(25);
    fill("black");
    text ("Score: "+ score,10,25);
    text ("Lifes: " + lifes,10,50);
   textAlign(CENTER,CENTER)
   if(gameState == "start"){
       text ("PRESSIONE A TECLA ESPAÇO PARA COMEÇAR",350,400);
      
      } 
    
  if(ball.y > 650){
    gameState = "start"
    lifes -= 1
    ball.velocityX = 0
    ball.velocityY = 0
    ball.y = 550
    ball.x = 340
     }
  
 if(alienGroup[0].y > 600){
    gameState = "end"
    lifes = 0
    alienGroup.setVelocityYEach(0)
 }
  
  if(lifes <= 0){
     gameState = "end"
     ball.destroy()
     text("VOCE PERDEU",350,400)
     }
  
    if (keyDown("space")&& gameState == "start"){
        gameState = "play"
        ball.velocityX = 6;
        ball.velocityY = -6;
        alienGroup.setVelocityYEach(alienVelocity)
    }


  
  
  
  
    gameplay();
    drawSprites();
    
}




