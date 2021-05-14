const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Body = Matter.Body;
const Render = Matter.Render;
const Constraint=Matter.Constraint;

var bg,bgimg,hero,heroimg,dragon,dragonimg,coin,coinimg,tressure,tressureimg,rock,rockimg,fire,fireimg;
var ground;


function preload(){
  bgimg=loadImage("jungle.jpg");
  heroimg=loadAnimation("templerun/Run0.png","templerun/Run1.png","templerun/Run2.png","templerun/Run3.png","templerun/Run4.png","templerun/Run5.png",
  "templerun/Run6.png","templerun/Run7.png","templerun/Run8.png","templerun/Run9.png")
  coinimg=loadImage("coin image.png")
  rockimg=loadImage("rocks image.png")
  dragonimg=loadImage("dragon image.png")
  tressureimg=loadImage("tressure image.png")
  fireimg=loadImage("fire image.png")
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
  hero.scale=0.5

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
  drawSprites();
}


