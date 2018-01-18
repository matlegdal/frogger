const WIDTH = 5;
const STEP_X = 101;
const STEP_Y = 83;

var level = 1;

// Enemies our player must avoid
var Enemy = function() {
    this.sprite = 'images/enemy-bug.png';
    this.x = -STEP_X;
    this.y = (Math.floor(Math.random()*3)) * STEP_Y + STEP_Y/2;
    this.speed = Math.floor(Math.random() * 200 * level) + 100;
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


// Class Player
var Player = function () {
    this.avatar = 'images/char-boy.png';
    this.x = this.initialX;
    this.y = this.initialY;
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
    this.points++;
    this.x = this.initialX;
    this.y = this.initialY;

    if (this.points >= 10) {
        level++;
        this.points = 0;
    }
    console.log("You win! Level: " + level + " Points: " + this.points);
};

Player.prototype.lose = function () {
    this.points--;
    this.x = this.initialX;
    this.y = this.initialY;

    if (this.points < 0) {
        if (level <= 1) {
            level = 1;
            this.points = 0;
        } else {
            level--;
            this.points = 9;
        }

    }
    console.log("You lose! Level: " + level + " Points: " + this.points);
};

Player.prototype.render = function () {
    ctx.drawImage(Resources.get(this.avatar), this.x, this.y);
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

var allEnemies = [];
for (var i=0; i<3; i++) {
    allEnemies.push(new Enemy());
}
var player = new Player();


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
