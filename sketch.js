var helicopterIMG, helicopterSprite, packageSprite,packageIMG;
var packageBody,ground,zombiegroup;
const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Body = Matter.Body;

function preload()
{
	helicopterIMG=loadImage("helicopter.png")
	packageIMG=loadImage("package.png")
	zombie_jpg=loadImage("download.jpg")
}

function setup() {
	createCanvas(800, 700);
	rectMode(CENTER);
	
	

	packageSprite=createSprite(width/2, 80, 10,10);
	packageSprite.addImage(packageIMG)
	packageSprite.scale=0.2

	helicopterSprite=createSprite(width/2, 200, 10,10);
	helicopterSprite.addImage(helicopterIMG)
	helicopterSprite.scale=0.6

	groundSprite=createSprite(width/2, height-35, width,10);
	groundSprite.shapeColor=color(255)


	engine = Engine.create();
	world = engine.world;

	packageBody = Bodies.circle(width/2 , 200 , 5 , {restitution:0.7, isStatic:true});
	World.add(world, packageBody);
	

	//Create a Ground
	ground = Bodies.rectangle(width/2, 650, width, 10 , {isStatic:true} );
 	World.add(world, ground);


	Engine.run(engine);

	zombiegroup = createGroup();

	
  
}


function draw() {
  rectMode(CENTER);
  background(0);
  packageSprite.x= packageBody.position.x 
  packageSprite.y= packageBody.position.y 

  if (zombiegroup.isTouching(packageSprite)){
	Body.setStatic(packageBody,true);
	zombiegroup.setVelocityXEach(0);
	packageSprite.visible = false;
	
}

  if (packageSprite.isTouching(groundSprite)){
	  zombiegroup.setVelocityXEach(0);
	zombiegroup.setLifetimeEach(-1);
  }

  text ("MAKE THE PACKAGE TOUCH THE GROUND IF IT TOUCCHES ZOMBIE YOU WOULD LOSE",200,350);
  
  drawSprites();

  keyPressed();

  zombie();
 
}

function keyPressed() {
 if (keyCode === DOWN_ARROW) {
    // Look at the hints in the document and understand how to make the package body fall only on
    Body.setStatic(packageBody,false);
  }
}

function zombie(){
	if (frameCount % 70 === 0){
	  var zombie = createSprite(300,620,20,20);
	zombie.addImage(zombie_jpg);
	zombie.velocityX = 2;
	 zombie.scale = 0.3;
	zombie.lifetime = 400;
	zombie.addToGroup(zombiegroup);
	
	}
  }
  

