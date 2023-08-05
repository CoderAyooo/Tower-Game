var PLAY = 1;
var END = 0;
var gameState = PLAY;

var Player;
var enemiesGroup, enemy1, enemy2, enemy3;
var cloudsGroup, cloud;
var backGroundImg;
var invisibleGround;

var score = 0;

var gameOver, restart;

function preload() {
    Player = loadImage("Player.png");
    enemy1Img = loadImage("Enemy 1.png");
    enemy2Img = loadImage("Enemy 2.png");
    enemy3Img = loadImage("Enemy 3.png");
    backGroundImg = loadImage("Background Image.avif");
    cloud = loadImage("Cloud.png");
}

function setup() {
    createCanvas(200, 600);

    Player = createSprite(200, 600);
    Player.addImage("playing",Player);
    Player.scale = 0.5;

    var ground = createSprite(200,180,400,20);
    invisibleGround = createSprite(200,190,400,10);
    invisibleGround.visible = false;

    gameOver.visible = false;
    restart.visible = false;

    enemiesGroup = new Group();
    cloudsGroup = new Group();

    score = 0;
}

function draw() {

    background(255) 
    text("Score : " + score, 500, 50);

    if (gameState == PLAY) {
        score = score + Math.round(getFrameRate()/60);

    }

    if (keyDown("space") && Player.y > 159) {
        Player.velocity = -12
    }

    Player.velocityY = player.velocityY + 0.8;

    if(ground.x < 0) {
        ground.x = ground.width/2;
    }

    Player.collide(invisibleGround);

    if(enemiesGroup.isTouching(Player)) {
        gameState = END;
    }
    else if (gameState == END) {
        gameOver.visible = true;
        restart.visible = true;
    }

    Player.velocityY = 0;
    ground.velocityX = 0;

    enemiesGroup.setVelocityYEach(0);
    cloudsGroup.setVelocityYEach(0);

    cloudsGroup.setLifeTimeEach(-1);
    enemiesGroup.setLifeTimeEach(-1);

    if (mousePressedOver(restart)) {
        reset();
    }
}

    function reset() {
        gameState = PLAY;
        gameOver.visible = false;
        restart.visible = false;

        enemiesGroup.destroyEach();
        cloudsGroup.destroyEach();
        score = 0;
    }

    function spawnClouds() {
        if (FrameCount% 60 === 0 ) {
            var cloud = createSprite(600,120,40,10);
            cloud.y = Math.round(random(80,120));
            cloud.addImage(cloudImage);
            cloud.scale = 0.5;
            cloud.velocityX = -3;

            cloud.lifetime = 200;
            cloud.depth = Player.depth;
            Player.depth = Player.depth + 1;

            cloudsGroup.add(cloud);
        }
    }

    function spawnEnemies() {
        if (FrameCount% 60 === 0) {
            var enemy1 = createSprite(600,165,10,40);
            var enemy2 = createSprite(600,165,10,40);
            var enemy3 = createSprite(600,165,10,40);

            enemy1.velocityY = -(6 + 3*score/100);
            enemy2.velocityY = -(6 + 3*score/100);
            enemy3.velocityY = -(6 + 3*score/100);

            var rand = Math.round(random(1,3));
            switch(rand) {
                case 1: enemy1.addImage(enemy1Img);
                        break;
                case 1: enemy2.addImage(enemy2Img);
                        break;
                case 1: enemy3.addImage(enemy3Img);
                        break;
            }
            enemy1.scale = 0.5;
            enemy2.scale = 0.5;
            enemy3.scale = 0.5;
            enemiesGroup.add(enemy1, enemy2, enemy3);
        }
        }
    