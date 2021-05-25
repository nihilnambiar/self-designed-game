const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Body = Matter.Body;
const Render = Matter.Render;
const Constraint=Matter.Constraint;

var bg,bgimg,hero,heroimg,dragon,dragonimg,coin,coinimg,tressure,tressureimg,rock,rockimg,fire,fireimg,wall,wallimg,knife,knifeimg;
var jump,reset,resetimg;
var ground;
var kills=0
var dragon_array=[]
var obstacle_array=[]
var knife_array=[]
var gameState="PLAY"
var gameOver,gameOverimg;
var database;

function preload(){
  bgimg=loadImage("jungle.jpg");
  heroimg=loadAnimation("templerun/Run0.png","templerun/Run1.png","templerun/Run2.png","templerun/Run3.png","templerun/Run4.png","templerun/Run5.png",
  "templerun/Run6.png","templerun/Run7.png","templerun/Run8.png","templerun/Run9.png")
  jump=loadAnimation("templerun/Jump__000.png","templerun/Jump__001.png","templerun/Jump__002.png","templerun/Jump__003.png","templerun/Jump__004.png",
  "templerun/Jump__005.png","templerun/Jump__006.png","templerun/Jump__007.png","templerun/Jump__008.png","templerun/Jump__009.png");
  coinimg=loadImage("coinimage.png")
  rockimg=loadImage("rockimage.png")
  dragonimg=loadImage("dragonimage.png")
  tressureimg=loadImage("tressureimage.png")
  fireimg=loadImage("fireimage.png")
  wallimg=loadImage("wallimage.png")
  knifeimg=loadImage("knife.png")
  idle=loadAnimation("templerun/Idle__000.png")
  gameOverimg=loadImage("game_over.png")
  resetimg=loadImage("reset.png")
  }

function setup() {
  createCanvas(1300, 600);
  database=firebase.database();
  bg=createSprite(650,300,1300,600)
  bg.addImage(bgimg)
  bg.scale=0.3

  ground=createSprite(650,580,2600,10)
  ground.velocityX=-2
  ground.visible=false

  hero=createSprite(100,550,10,10)
  hero.addAnimation("running",heroimg)
  hero.addAnimation("jumping",jump)
  hero.addAnimation("idle",idle)
  hero.scale=0.3
  hero.debug=true
  hero.setCollider("rectangle",0,0,250,500)

  knife=createSprite(150,510,10,10)
  knife.addImage(knifeimg)
  knife.scale=0.07
  knife.rotation=-180

gameOver=createSprite(650,300,10,10)
gameOver.addImage(gameOverimg)
gameOver.visible=false

reset=createSprite(650,450,10,10)
reset.addImage(resetimg)
reset.visible=false

//console.log(hero.width)
//console.log(hero.height)
database.ref('kills').on("value",readKills)
}

function draw() {

  background(230);
  if(gameState==="PLAY"){

  
  hero.changeAnimation("running",heroimg)
  bg.velocityX=-4
  ground.velocityX=-4
  if(bg.x<330){
bg.x=650
  }
  
  if(ground.x<0){
    ground.x=ground.width/2
  }
  if(keyDown("space")){
    hero.velocityY=-10
    hero.changeAnimation("jumping",jump)
  }
  hero.velocityY=hero.velocityY+1
  knife.y=hero.y
  if(keyWentDown("t")){
    knife.velocityX=5
    //knife.velocityY=-7
    //console.log(knife.velocityY)
    knife_array.push(knife)
    knife=createSprite(150,510,10,10)
    knife.addImage(knifeimg)
    knife.scale=0.07
    knife.rotation=-180
  }
  
    
  

  for(var i=0;i<obstacle_array.length;i++){
    if(obstacle_array[i].isTouching(hero)){
     // obstacle_array[i].velocityX=0
     gameState="END"
    }
  }
  for(var i=0;i<dragon_array.length;i++){
    if(dragon_array[i].isTouching(hero)){
    //  dragon_array[i].velocityX=0
    gameState="END"
    }
  }
  for(var i=0;i<knife_array.length;i++){
    for(var j=0;j<dragon_array.length;j++){
    if(knife_array[i].isTouching(dragon_array[j])){
   dragon_array[j].destroy();
   knife_array[i].addImage(fireimg);
   knife_array[i].rotation=-360
   knife_array[i].lifetime=20
   kills=kills+1
   updateKills();
    }
  }
}

  spawnObstacles();
  spawnDragon();
}
  if(gameState==="END"){
    bg.velocityX=0
    for(var i=0;i<obstacle_array.length;i++){
       // obstacle_array[i].velocityX=0
       obstacle_array[i].velocityX=0
      
    }
    for(var i=0;i<dragon_array.length;i++){
       dragon_array[i].velocityX=0
      
    }
    hero.changeAnimation("idle",idle)
    gameOver.visible=true
    hero.velocityY=0;
    reset.visible=true
    reset.scale=0.1
    if (mousePressedOver(reset)){
      restart()
    }
  }
  hero.collide(ground)
  drawSprites();
  textSize(30)
  stroke("white")
  fill("black ")
  text("dragons killed: "+kills,900,100)
}
function readKills(data){
  kills=data.val()
}
function updateKills(){
  database.ref("/").update({
    kills:kills
  })
}

function restart(){
gameState="PLAY"
gameOver.visible=false
reset.visible=false
for(var i=0;i<dragon_array.length;i++){
  dragon_array[i].destroy()
 
}
for(var i=0;i<obstacle_array.length;i++){
  obstacle_array[i].destroy()
 
}
kills=0
updateKills();
}

function spawnObstacles(){
  if(frameCount%170===0){
var obstacle=createSprite(1300,550,10,10)
var rand=round(random(1,3))
switch(rand){
  case 1: obstacle.addImage(rockimg)
  obstacle.scale=0.5
  break;
  case 2: obstacle.addImage(fireimg)
  obstacle.scale=0.15
  break;
  case 3: obstacle.addImage(wallimg)
  obstacle.scale=0.3
  break;
}
obstacle.velocityX=-(5+2*kills/10);
//obstacle.lifetime=1300/obstacle.velocityX
obstacle_array.push(obstacle)
  }
}
function spawnDragon(){
  if(frameCount%150===0){
    var dragon=createSprite(1300,random(100,400))
    dragon.addImage(dragonimg)
    dragon.velocityX=-(6+1.5*kills/8)
    dragon.scale=0.1
    //dragon.lifetime=1300/dragon.velocityX
    dragon_array.push(dragon)
  }
}


