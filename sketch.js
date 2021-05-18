const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Body = Matter.Body;
const Render = Matter.Render;
const Constraint=Matter.Constraint;

var bg,bgimg,hero,heroimg,dragon,dragonimg,coin,coinimg,tressure,tressureimg,rock,rockimg,fire,fireimg,wall,wallimg,knife,knifeimg;
var ground;


function preload(){
  bgimg=loadImage("jungle.jpg");
  heroimg=loadAnimation("templerun/Run0.png","templerun/Run1.png","templerun/Run2.png","templerun/Run3.png","templerun/Run4.png","templerun/Run5.png",
  "templerun/Run6.png","templerun/Run7.png","templerun/Run8.png","templerun/Run9.png")
  coinimg=loadImage("coinimage.png")
  rockimg=loadImage("rockimage.png")
  dragonimg=loadImage("dragonimage.png")
  tressureimg=loadImage("tressureimage.png")
  fireimg=loadImage("fireimage.png")
  wallimg=loadImage("wallimage.png")
  knifeimg=loadImage("knife.png")
  }

function setup() {
	createCanvas(1300, 600);
  bg=createSprite(650,300,1300,600)
  bg.addImage(bgimg)
  bg.scale=0.3

  ground=createSprite(650,580,2600,10)
  ground.velocityX=-2
  ground.visible=false

  hero=createSprite(100,550,10,10)
  hero.addAnimation("running",heroimg)
  hero.scale=0.3

  knife=createSprite(150,510,10,10)
  knife.addImage(knifeimg)
  knife.scale=0.07
  knife.rotation=-150


}

function draw() {

  background(230);
  bg.velocityX=-4
  ground.velocityX=-4
  if(bg.x<330){
bg.x=650
  }
  hero.collide(ground)
  if(ground.x<0){
    ground.x=ground.width/2
  }
  spawnObstacles();
  spawnDragon();
  drawSprites();
}
function spawnObstacles(){
  if(frameCount%170===0){
var obstacle=createSprite(1300,530,10,10)
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
obstacle.velocityX=-5;
  }
}
function spawnDragon(){
  if(frameCount%150===0){
    var dragon=createSprite(1300,random(100,400))
    dragon.addImage(dragonimg)
    dragon.velocityX=-6
    dragon.scale=0.1
  }
}


