var PLAY;
var END=0;
var gameState=PLAY;
var monkey , monkey_running;
var banana ,bananaImage, obstacle, obstacleImage
var bananaGroup, obstacleGroup,food;
var survivalTime=0;


function preload(){
  
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
bananaImage = loadImage("banana.png");
  obstacleImage= loadImage("obstacle.png");
}



function setup() {
  createCanvas(400,400);

  //ground
  ground = createSprite(400,375,900,10);
  ground.velocityX=-4;
 //monkey
  monkey = createSprite(80,310,20,20);
  monkey.addAnimation("moving",monkey_running);
  monkey.scale=0.1;
  bananaGroup=createGroup();
  obstacleGroup=createGroup();
}


function draw() {
  background("Lightgreen")

  fill("white");
  textSize(15);
  text("Survival Time:"+survivalTime,250,50);
  survivalTime=Math.ceil(frameCount/frameRate())
  
  if(gameState===PLAY){
     
    if (ground.x < 0){
      ground.x = ground.width/2;
    }
    
    if(keyDown("space")&& monkey.y >=100){
    monkey.velocityY=-12;
 }
        monkey.velocityY = monkey.velocityY +0.8;
 monkey.collide(ground);
 spawnBanana();
  spawnObstacles();
   if(monkey.isTouching(obstacleGroup)){
      gameState=END;
    }
   
   
  }
   
   else if(gameState===END){
        ground.velocityX=0;
   monkey.velocityY=0;
      obstacleGroup.setLifetimeEach(-1);
 bananaGroup.setLifetimeEach(-1);
   
obstacleGroup.setVelocityXEach(0);
 bananaGroup.setVelocityXEach(0);
     survivalTime=0;
 
   }
   
   
 
    
  drawSprites();
}

function spawnBanana(){
  if( frameCount % 60==0){
    var banana=createSprite(400,120,10,10);
    banana.y= Math.round(random(140,200));
    banana.addImage(bananaImage);
    banana.scale=0.1;
    banana.velocityX=-4;
  //banana.lifetime=200;
  bananaGroup.add(banana);

  }
}

function spawnObstacles(){
  
if(frameCount%200==0){
  
obstacle = createSprite(400,340,10,10);
obstacle.addImage("obstacle",obstacleImage);
obstacle.scale = 0.1;  
    
obstacle.velocityX = -5;  
obstacle.lifetime = 100;  
obstacleGroup.add(obstacle);  
}    
}