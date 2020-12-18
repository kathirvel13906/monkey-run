//gamestates
var PLAY = 1;
var END = 0;
var gameState = PLAY; 

//global var
var monkey, monkey_running, monkey_collided;
var banana, bananaImage;
var obstacle, obstacleImage;
var foodGroup, obstacleGroup;
var ground;
var score;
var survivaltime;
var box;

function preload(){
  //loading animation for monkey, banana, rock
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png");
  monkey_collided = loadAnimation("sprite_1.png");
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
}

function setup() {
  //creating canvas 
  createCanvas(400, 400);
  
  //creating monkey
  monkey = createSprite(80,315,20,20);
  monkey.addAnimation("monkeyRun", monkey_running);
  monkey.addAnimation("monkeyCollide",monkey_collided);
  monkey.scale = 0.13;
  //monkey.debug = true;
  
  //creating ground
  ground = createSprite(400,350,900,10);
  ground.x = ground.width/2;
  ground.velocityX = -4;
  
  //declaring the groups
  foodGroup = createGroup();
  obstacleGroup = createGroup();
  
  //reset icon
  box = createSprite(200,200,40,40);
  
  //score and survivaltime
  survivaltime = 0;
  score = 0;
  
}

function draw() {
  //giving background colour
  background(235);
  
  //making monkey collide with the ground
  monkey.collide(ground);
  
  
  if(gameState === 1) {
      box.visible = false;
    
      //making the monkey jump after pressing space
      if(keyDown("space") && monkey.y >= 280) {
        monkey.velocityY = -12;
      }

      //giving gravity to game
      monkey.velocityY = monkey.velocityY + 0.6;

      //making the infinite ground
      if(ground.x > 0) {
        ground.x = ground.width/2;
      }

      stroke("black");
      textSize(20);
      fill("blue");
      text("SCORE: "+score, 260,30);
      survivaltime = Math.round(frameCount / frameRate());
      text("SURVIVAL TIME: "+survivaltime,200,60);

      //declaring the function food and function obstacle
      food();
      obstacles();
    
      if(monkey.isTouching(foodGroup)) {
        score = score + 1;
        foodGroup.destroyEach();
      }
    
      if(monkey.isTouching(obstacleGroup)) {
        gameState = 0;
      }
  } 
  else if(gameState === 0) {
    //changing animation of monkey
    monkey.changeAnimation("monkeyCollide", monkey_collided);
    
    //making the monkey and groung stop
    monkey.velocityY = 0;
    ground.velocityX = 0;
    
     //set lifetime of the game objects so that they are never destroyed
     obstacleGroup.setLifetimeEach(-1);
     foodGroup.setLifetimeEach(-1);
    
     //setting up an velocity for food and obstacle
     obstacleGroup.setVelocityXEach(0);
     foodGroup.setVelocityXEach(0);  
    
    box.visible = true;
    
    stroke("blue");
    textSize(20);
    fill("green");
    text("GAME OVER",140,80);
    text("PRESS THE BOX TO RESTART",60,150);
  }
  
  if(mousePressedOver(box)) {
    reset();
  }
  
  //displaying the sprites
  drawSprites();
  
}

function reset() {
  gameState = 1;
  score = 0;
  survivaltime = 0;
  box.visible = false;
  obstacleGroup.destroyEach();
  foodGroup.destroyEach();
  //changing animation of monkey
  monkey.changeAnimation("monkeyRun", monkey_running);
}

function food() {
  if(frameCount % 80 === 0) {
    banana = createSprite(500,Math.round(random(120,200)),20,20);
    banana.addImage(bananaImage);
    banana.scale = 0.1;
    //banana.debug = true;
    banana.velocityX = -4;
    banana.lifetime = 150;
    foodGroup.add(banana);
  }
}

function obstacles() {
  if(frameCount %160 === 0) {
    obstacle = createSprite(500,310,20,20);
    obstacle.addImage(obstacleImage);
    obstacle.scale = 0.2;
    obstacle.setCollider("circle",0,0,230);
    //obstacle.debug = true;
    obstacle.velocityX = -6;
    obstacle.lifetime = 100;
    obstacleGroup.add(obstacle);
  }
}




