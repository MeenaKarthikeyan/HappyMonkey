var PLAY = 1;
var END = 0;
var gameState = PLAY;
var monkey , monkey_running, monkey_stop;
var banana ,bananaImage, obstacle, obstacleImage;
var foodGroup, obstacleGroup;
var score;

function preload(){
    
monkey_running = loadAnimation("monkey_0.png","monkey_1.png","monkey_2.png","monkey_3.png","monkey_4.png","monkey_5.png","monkey_6.png","monkey_7.png","monkey_8.png");
 monkey_stop = loadAnimation("monkey_7.png"); 
  
  bananaImage = loadImage("banana.png");
  obstaceImage = loadImage("obstacle.png");
 
}



function setup() {
  // createCanvas(600, 600);
 
  var survivalTime=0;
  
  //creating monkey
   monkey=createSprite(80,315,20,20);
   monkey.addAnimation("moving", monkey_running);
   monkey.addAnimation("stop", monkey_stop);
  // monkey.addImage(bananaImage)
   monkey.scale=0.1
  
  ground = createSprite(400,350,900,10);
  ground.velocityX=-4;
  ground.x=ground.width/2;
  console.log(ground.x)

  foodGroup = new Group();
  obstaclesGroup = new Group();

  score = 0;
 
  
}


function draw() {
  
  background("lightgreen");
  
  stroke("white");
  textSize(20);
  fill("white");
  text("Score: "+ score, 500,50);
  
 if(gameState == PLAY){
  if(ground.x<0) {
    ground.x=ground.width/2;
  }
     monkey.changeAnimation("moving", monkey_running);
    if(keyDown("space") ) {
      monkey.velocityY = -12;
    }
    monkey.velocityY = monkey.velocityY + 0.8;
  
    monkey.collide(ground);   
    spawnFood();
    spawnObstacles();
   if(foodGroup.isTouching(monkey)){
     foodGroup.destroyEach();
     score = score+1;
   }
    survivalTime=Math.ceil(frameCount/frameRate())   
  
    if(obstaclesGroup.isTouching(monkey)){
      gameState = END;
      ground.velocityX = 0;
      monkey.velocityY = 0;
      obstaclesGroup.setVelocityXEach(0);
      foodGroup.setVelocityXEach(0);
      obstaclesGroup.setLifetimeEach(-1);
      foodGroup.setLifetimeEach(-1);
        
      monkey.changeAnimation("stop", monkey_stop);
    }
 }

  
  stroke("black");
  textSize(20);
  fill("black");
  
  text("Survival Time: "+ survivalTime, 100,50);
  drawSprites();
}



function spawnFood() {
  //write code here to spawn the Food
  if (frameCount % 80 === 0) {
    banana = createSprite(600,250,40,10);
    banana.y = random(120,200);    
    banana.velocityX = -5;
    
     //assign lifetime to the variable
    banana.lifetime = 300;
    monkey.depth = banana.depth + 1;
    
    //add image of banana
     banana.addImage(bananaImage);
     banana.scale=0.05;
    
    //add each banana to the group
    foodGroup.add(banana);
  }
}

function spawnObstacles() {
  if(frameCount % 300 === 0) {
    obstacle = createSprite(800,320,10,40);
    obstacle.velocityX = -6;
    
    //add image to the obstacle 
    obstacle.addImage(obstaceImage);
    obstacle.scale=0.15;
    
    //lifetime to the obstacle     
    obstacle.lifetime = 300;
    
    //add each obstacle to the group
    obstaclesGroup.add(obstacle);
  }
}
