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
var jungle, jungleImage;

function preload(){
  //loading animation for monkey, banana, rock, background
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png");
  monkey_collided = loadAnimation("sprite_1.png");
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
  jungleImage = loadImage("jungle.jpg");
}

function setup() {
  //creating canvas 
  createCanvas(windowWidth, windowHeight);
  
  //creating jungle background
  jungle = createSprite(width,height-310,900,10);
  jungle.addImage(jungleImage);
  jungle.scale = 1;
  jungle.x = jungle.width/2;
  jungle.velocityX = -5;
  
  //creating monkey
  monkey = createSprite(80,height-80,20,20);
  monkey.addAnimation("monkeyRun", monkey_running);
  monkey.addAnimation("monkeyCollide",monkey_collided);
  monkey.scale = 0.14;
  //monkey.debug = true;
  
  //creating ground
  ground = createSprite(width,height-80,900,10);
  ground.x = ground.width/2;
  ground.velocityX = -5;
  ground.visible = false;
    
  //declaring the groups
  foodGroup = createGroup();
  obstacleGroup = createGroup();
  
  //reset icon
  box = createSprite(width/2,height/2,40,40);
  
  //score and survivaltime
  survivaltime = 0;
  score = 0;
}

function draw() {
  //giving background colour
  background(235);
  
  //making monkey collide with the ground
  monkey.collide(ground);
  
  
  //displaying the sprites
  drawSprites();
  
  if(gameState === 1) {
      box.visible = false;
    
      //making the monkey jump after pressing space
      if(keyDown("space") && monkey.y >= 280 || touches.length > 0) {
        monkey.velocityY = -12;
        touches = [];
      }

      //giving gravity to game
      monkey.velocityY = monkey.velocityY + 0.6;

      //making the infinite ground
      if(ground.x > 0) {
        ground.x = ground.width/2;
      }
    
      //making the infinite background
      if(jungle.x > 0) {
        jungle.x = jungle.width/2;
      }
    
      switch(score) {
          case 7: monkey.scale = 0.16;
          break;
          
          case 14: monkey.scale = 0.18;
          break;
          
          case 21: monkey.scale = 0.2;
          break;
          
          case 28: monkey.scale = 0.22;
          break;
          
          case 35: monkey.scale = 0.24;
          break;
          
          default: break;
      }

      stroke("black");
      textSize(20);
      fill("blue");
      text("SCORE: "+score,5*width/8, height/8);
      survivaltime = Math.round(frameCount / frameRate());
      text("SURVIVAL TIME: "+survivaltime,4*width/7, height/4);

      //declaring the function food and function obstacle
      food();
      obstacles();
    
      if(monkey.isTouching(foodGroup)) {
        score = score + 1;
        foodGroup.destroyEach();
      }
    
      if(monkey.scale > 0.14 && obstacleGroup.isTouching(monkey)) {
        monkey.scale = 0.14;
        obstacleGroup.destroyEach();
      }
      else
      if(monkey.scale === 0.14 && monkey.isTouching(obstacleGroup)) {
        gameState = 0;
      }
  } 
  else if(gameState === 0) {
    //changing animation of monkey
    monkey.changeAnimation("monkeyCollide", monkey_collided);
    
    //making the monkey and groung stop
    monkey.velocityY = 0;
    ground.velocityX = 0;
    jungle.velocityX = 0;
    
     //set lifetime of the game objects so that they are never destroyed
     obstacleGroup.setLifetimeEach(-1);
     foodGroup.setLifetimeEach(-1);
    
     //setting up an velocity for food and obstacle
     obstacleGroup.setVelocityXEach(0);
     foodGroup.setVelocityXEach(0);  
    
    box.visible = true;
    
    stroke("blue");
    textSize(20);
    fill("red");
    text("GAME OVER",3*width/8,100);
    text("PRESS THE BOX TO RESTART",3*width/12, 150);
  }
  
  if(mousePressedOver(box) || touches.length > 0) {
    reset();
    touches = [];
  }
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
  monkey.scale = 0.14;
}

function food() {
  if(frameCount % 120 === 0) {
    banana = createSprite(width,height,20,20);
    banana.y = Math.round(random(height-180, height-300));
    banana.addImage(bananaImage);
    banana.scale = 0.1;
    //banana.debug = true;
    banana.velocityX = -5;
    banana.lifetime = 500;
    foodGroup.add(banana);
  }
}

function obstacles() {
  if(frameCount %160 === 0) {
    obstacle = createSprite(width,height-120,20,20);
    obstacle.addImage(obstacleImage);
    obstacle.scale = 0.2;
    obstacle.setCollider("circle",0,0,230);
    //obstacle.debug = true;
    obstacle.velocityX = -7;
    obstacle.lifetime = 500;
    obstacleGroup.add(obstacle);
  }
}




