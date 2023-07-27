var path, boy, cash, diamonds, jwellery, sword;
var pathImg, boyImg, cashImg, diamondsImg, jwelleryImg, swordImg;
var treasureCollection = 0;
var cashG, diamondsG, jwelleryG, swordGroup;

/*--------------------------------------------------------*/
var PLAY = 1;
var END = 0;
var WIN = 2;
var gameState = PLAY;

var espaco, foguete;

var planG, earthG, monstG, netunoG, estrelaG;

var space, monster1, monster2, monster3, nave, plan1, plan2, plan3;

var score = 0;
var star = 0;

var gameOver, restart;

function preload() {

  space = loadImage("space.avif");
  monster1 = loadImage("Monster.gif");
  monster2 = loadImage("Monster2.gif");
  monster3 = loadImage("Monster3.gif");
  fatality = loadImage("gameOver.png");
  restartImg = loadImage("resetar.png");
  nave = loadImage("foguete.gif");
  plan1 = loadImage("saturno.png");
  plan2 = loadImage("terra.png");
  plan3 = loadImage("netuno.png");
  starImg = loadImage("estrela.avif");
  coleSound = loadSound("coletando.mp3");
  gameOverSound = loadSound("gameOverSound.wav");
  starS = loadSound("starS.wav");
  resetS = loadSound("resetSound.wav");
}

function setup() {
  createCanvas(500, 850);

  espaco = createSprite(150, 300, 1200, 400);
  espaco.addImage("space.avif", space);
  espaco.scale = 1.5;
  espaco.velocityY = 2;

  foguete = createSprite(200, 700, 50, 50);
  foguete.addImage(nave);
  foguete.debug = false;
  foguete.setCollider("rectangle", -10, 0, 100, 350);
  foguete.scale = 0.5;

  invibleGround = createSprite(500, 10, 50, 1800);
  invibleGround.visible = false;

  invibleGround2 = createSprite(0, 10, 50, 1800);
  invibleGround2.visible = false;

  invibleGround3 = createSprite(0, 5, 965, 10);
  invibleGround3.visible = false;

  planG = new Group();
  earthG = new Group();
  netunoG = new Group();
  monstG = new Group();
  estrelaG = new Group();

}

function draw() {
  background("black");
  if (gameState === PLAY) {
    foguete.x = World.mouseX;
    foguete.y = World.mouseY;

    //createEdgeSprites nao tem numeros no ()
    //edges = createEdgeSprites(150, 200);

    foguete.collide(invibleGround);
    foguete.collide(invibleGround2);
    foguete.collide(invibleGround3);

   espaco.velocityY = Math.round(5 + (2 * score) / 70);


    if (espaco.y > 450) {
      espaco.y = height / 2;
    }

    createPlan();
    createEarth();
    createNetuno();
    createMonster();
    createMonster2();
    createMonster3();
    Star();

    planG.overlap(foguete, function (planeta, foguete) {
      planeta.destroy();
      score += 5;
      coleSound.play();
    });

    earthG.overlap(foguete, function (planeta, foguete) {
      planeta.destroy();
      score += 10;
      coleSound.play();
    });

    netunoG.overlap(foguete, function (planeta, foguete) {
      planeta.destroy();
      score += 5;
      coleSound.play();
    });

    estrelaG.overlap(foguete, function (estrela, foguete) {
      estrela.destroy();
      star += 1;
      starS.play();
    });


    if (monstG.isTouching(foguete)) {
      gameState = END;
      monstG.destroyEach();
      netunoG.destroyEach();
      planG.destroyEach();
      earthG.destroyEach();
      estrelaG.destroyEach();
      foguete.visible = false;
      espaco.velocityY = 0;
      gameOverSound.play();

      over = createSprite(250, 350, 50, 50);
      over.addImage(fatality);
      over.scale = 0.3;

      restart = createSprite(250, 500, 50, 50);
      restart.addImage(restartImg);
      restart.scale = 0.3;
    }
  } else if (gameState == END) {
    if (mousePressedOver(restart)) {
      reiniciar();
      foguete.visible = true;
      espaco.velocityY = 2;
      resetS.play();
    }
  }

  drawSprites();
  textSize(25);
  fill("white");
  text("Score: " + score, 10, 30);

  textSize(25);
  fill("yellow");
  text("Star: " + star, 10, 60);

  textSize(20);
  fill("blue");
  text("Don't touch the monsters!!", 200, 30);
}

function createPlan() {
  if (frameCount % 160 == 0) {
    var plan = createSprite(Math.round(random(10, 490), -150, 50, 50));
    plan.addImage(plan1);
    plan.scale = 0.07;
    plan.velocityY = 2;
    plan.lifetime = 500;
    planG.add(plan);
    plan.debug = false;
  }
}

function createEarth() {
  if (frameCount % 180 == 0) {
    var earth = createSprite(Math.round(random(10, 490), -150, 100, 100));
    earth.addImage(plan2);
    earth.scale = 0.1;
    earth.velocityY = 3;
    earth.lifetime = 500;
    earthG.add(earth);
    earth.debug = false;
  }
}

function createNetuno() {
  if (frameCount % 80 == 0) {
    var netu = createSprite(Math.round(random(10, 490), -150, 10, 10));
    netu.addImage(plan3);
    netu.scale = 0.1;
    netu.velocityY = 4;
    netu.lifetime = 500;
    netunoG.add(netu);
    netu.debug = false;
  }
}

function createMonster() {
  if (frameCount % 160 == 0) {
    var monst = createSprite(Math.round(random(10, 490), -150, 10, 10));
    monst.addImage(monster1);
    monst.scale = 0.25;
    monst.velocityY = 3;
    monst.lifetime = 500;
    monstG.add(monst);
    monst.debug = false;
    monst.setCollider("circle", 0, 0, 150);
  }
}

function createMonster2() {
  if (frameCount % 200 == 0) {
    var monst = createSprite(Math.round(random(10, 490), -150, 10, 10));
    monst.addImage(monster2);
    monst.scale = 0.6;
    monst.velocityY = 5;
    monst.lifetime = 500;
    monstG.add(monst);
    monst.debug = false;
    monst.setCollider("circle", 0, 0, 95);
  }
}

function createMonster3() {
  if (frameCount % 150 == 0) {
    var monst = createSprite(Math.round(random(10, 490), -150, 10, 10));
    monst.addImage(monster3);
    monst.scale = 0.4;
    monst.velocityY = 6;
    monst.lifetime = 500;
    monstG.add(monst);
    monst.debug = false;
    monst.setCollider("circle", 0, 0, 100);
  }
}

function reiniciar() {
  gameState = PLAY;
  over.visible = false;
  restart.visible = false;
  score = 0;
  star = 0;
}

function Star(){

  if(score > 0 && score % 50 === 0){
    var estrela = createSprite(250,250,10,10);
    estrela.addImage(starImg);
    estrela.scale = 0.1;
    estrela.velocityY = 5;
    estrela.lifetime = 500;
    estrelaG.add(estrela);
    estrela.debug = false;
    
}
}