const WIDTH = 5;
const STEP_X = 101;
const STEP_Y = 83;

var landscape = [
    'images/stone-block.png',
    'images/water-block.png',
    'images/grass-block.png',
    'images/enemy-bug.png',
    'images/Star2.png'
];
var chars = [
    'images/char-boy.png',
    'images/char-cat-girl.png',
    'images/char-horn-girl.png',
    'images/char-pink-girl.png',
    'images/char-princess-girl.png'
];

// Class Player
var Player = function () {
    this.avatar = 'images/char-boy.png';
    this.x = this.initialX;
    this.y = this.initialY;
    this.level = 1;
    this.points = 0;
};

Player.prototype.initialX = STEP_X * 2;
Player.prototype.initialY = STEP_Y*4 + STEP_Y/2;

Player.prototype.update = function() {
    if (this.x < 0) {
        this.x = 0;
    } else if (this.x > STEP_X * (WIDTH -1)) {
        this.x = STEP_X * (WIDTH -1);
    }

    if (this.y > this.initialY) {
        this.y = this.initialY;
    } else if (this.y < STEP_Y/2) {
        this.win();
    }
};

Player.prototype.win = function () {
    this.x = this.initialX;
    this.y = this.initialY;

    if (this.points >= 9) {
        this.level++;
        this.points = 0;
    } else {
        this.points++;
    }
};

Player.prototype.lose = function () {
    this.points--;
    this.x = this.initialX;
    this.y = this.initialY;

    if (this.points < 0) {
        if (this.level <= 1) {
            this.level = 1;
            this.points = 0;
        } else {
            this.level--;
            this.points = 9;
        }
    }
};

Player.prototype.render = function () {
    ctx.drawImage(Resources.get(this.avatar), this.x, this.y);
};

Player.prototype.levelRender = function () {
    for (var i = 0; i<this.level; i++) {
        ctx.drawImage(Resources.get('images/Star2.png'), STEP_X/2 *i, 0);
    }
    ctx.font = "40px Times";
    ctx.fillText(this.points.toString(), 15, 95)
};

Player.prototype.handleInput = function (dir) {
    switch (dir) {
        case 'left':
            this.x -= STEP_X;
            break;
        case 'right':
            this.x += STEP_X;
            break;
        case 'up':
            this.y -= STEP_Y;
            break;
        case 'down':
            this.y += STEP_Y;
    }
};

// Class Enemy
var Enemy = function() {
    this.sprite = 'images/enemy-bug.png';
    this.x = -STEP_X;
    this.y = (Math.floor(Math.random()*3)) * STEP_Y + STEP_Y/2;
    this.speed = Math.floor(Math.random() * 200 * player.level) + 100;
};

// Update the enemy's position
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    this.x += this.speed*dt;

    if (this.x > STEP_X*WIDTH) {
        var i = allEnemies.indexOf(this);
        allEnemies.splice(i, 1);
        allEnemies.push(new Enemy());
    }
};

Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};


// Instantiation of the player and of enemies
var player = new Player();
var allEnemies = [];
for (var i=0; i<3; i++) {
    allEnemies.push(new Enemy());
}


// This listens for key presses and sends the keys to your
// Player.handleInput() method.
document.addEventListener('keydown', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});