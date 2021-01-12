const Engine = Matter.Engine;
const World= Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;

var engine, world;
var box1, pig1,pig3;
var backgroundImg,platform;
var bird, slingshot;

var gameState = "onSling";
var bg = "sprites/bg1.png";
var score = 0;

function preload() {
  
    getBackgroundImg();
}

function setup(){
    var canvas = createCanvas(1200,400);
    engine = Engine.create();
    world = engine.world;


    ground = new Ground(600,height+10,1200,20);
    platform = new Ground(150, 305, 300, 170);

    box1 = new Box(800,350,70,70);
    box2 = new Box(1020,350,70,70);
    pig1 = new Pig(910, 350);
    log1 = new Log(910,290,300, PI/2);

    box3 = new Box(800,260,70,70);
    box4 = new Box(1020,260,70,70);
    pig3 = new Pig(910, 260);

    log3 =  new Log(910,200,300, PI/2);

    box5 = new Box(910,190,70,70);
    log4 = new Log(860,140,150, PI/7);
    log5 = new Log(970,140,150, -PI/7);

    bird = new Bird(330,100);

    //log6 = new Log(230,180,80, PI/2);
    slingshot = new SlingShot(bird.body,{x:330, y:100});
}

function draw(){
    if(backgroundImg)
        background(backgroundImg);
    
        noStroke();
        textSize(35)
        fill("black")
        text("Score  " + score, width-300, 50)
        //text(mouseX+":"+mouseY,mouseX,mouseY);
    
    Engine.update(engine);
    //strokeWeight(4);
    box1.display();
    box2.display();
    //ground.display();
    pig1.display();
    pig1.score();
    log1.display();

    box3.display();
    box4.display();
    pig3.display();
    pig3.score();
    log3.display();

    box5.display();
    log4.display();
    log5.display();

    bird.display();
    //platform.display();
    //log6.display();
    slingshot.display();
    //console.log(bird.body.speed);    
}

function mouseDragged(){
    if (gameState!=="launched" ){
        Matter.Body.setPosition(bird.body, {x: mouseX , y: mouseY});
        bird.trajectory = [];
    }
}


function mouseReleased(){
    slingshot.fly();
    gameState = "launched";
}

function keyPressed()
{
    if(keyCode === 32 && bird.body.speed < 1){
       bird.trajectory = [];
       Matter.Body.setPosition(bird.body,{x:336, y:120});
       slingshot.attach(bird.body);
       gameState = "onSling"
    }
}

 function getBackgroundImg()
 {
    var currentdate = new Date();
    console.log(currentdate)
    var hour = currentdate.getHours();
    console.log(hour);
    if(hour>=06 && hour<=19)
    {
        bg = "sprites/bg1.png";
    }
    else{
        bg = "sprites/bg2.jpg";
    }

    backgroundImg = loadImage(bg);
    console.log(backgroundImg);
}
