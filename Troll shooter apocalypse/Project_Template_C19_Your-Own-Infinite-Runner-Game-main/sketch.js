var brick, brickImg;
var gun, gunImg;
var troll, trollImg, trollGroup;
var wall;
var sandbag , sandbagImg;
var gamestate = "play";
var bullet,bulletImg,bulletGroup;
var reset, resetImg;

function preload(){
    resetImg = loadImage("reset.png");
    brickImg = loadImage("brickwalls.png");
    gunImg = loadImage("gun (1).png");
    trollImg = loadImage("troll (1).png");
    sandbagImg = loadImage("sandbags.png");
    bulletImg = loadImage("bullet.png")
}

function setup() {
 
 createCanvas(600,910);
 bulletGroup = new Group();
 trollGroup = new Group();
 sandbag = createSprite(300,630);
 sandbag.addImage(sandbagImg)
 sandbag.scale = 1.6
 wall = createSprite(300,700,1000,20);
 gun = createSprite(200,829);
 gun .addImage(gunImg)
 gun.scale = 0.35
 brick = createSprite(300,400,100,20);
 brick.addImage(brickImg);
 brick.scale = 1.5
 brick.velocityY = 1
}

function draw() {
    if (gamestate==="play"){
        if(brick.y >400){  
         brick.y = 300
        }
        if(frameCount%200===0){
            troll.velocityY = troll.velocityX +1
          }
        if (trollGroup.isTouching(wall)){
            gamestate = "end"
        }
        if(keyDown("E")){
        spawnbullets();
        }
        gun.depth = brick.depth + 1
        sandbag.depth = wall.depth + 1
        wall.depth = brick.depth + 1
        gun.x = World.mouseX
        
        drawSprites();
        spawntrolls();
      }


     if (gamestate==="end"){
        background("grey");
        textSize(60);
        fill("red");
        text("GAME OVER!",150,455);
        reset = createSprite(100,600,10,10);
        reset.addImage(resetImg);
        reset.scale = 1.5
        drawSprites();
      }
}

function spawntrolls(){
 
    if(bulletGroup.isTouching(trollGroup)){
        trollGroup.destroyEach();
        bullet.destroy();
        }

   if (frameCount%190===0){
troll = createSprite(300,-50,10,10);
troll.addImage(trollImg);
troll.x = Math.round(random(50,550));
troll.velocityY = 30
troll.scale = 0.05
trollGroup.add(troll)  
}

}

function spawnbullets(){
bullet = createSprite(300,800);
bullet.addImage(bulletImg);
bullet.scale = 3
bullet.depth = brick.depth + 1
bullet.scale = 0.1
bulletGroup.add(bullet);
bullet.x = gun.x-30;
gun.depth = bullet.depth + 1
bullet.velocityY = -3

}