const WIDTH = 5;
// const HEIGHT = 6;
const STEP_X = 101;
const STEP_Y = 83;

// Enemies our player must avoid
var Enemy = function() {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
    this.x = -STEP_X;
    this.y = (Math.floor(Math.random()*3)) * STEP_Y + STEP_Y/2;
    this.speed = Math.floor(Math.random() * 200) + 100;
    // console.log(this.x, this.y);
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    this.x += this.speed*dt;

    if (this.x > STEP_X*WIDTH) {
        var i = allEnemies.indexOf(this);
        allEnemies.splice(i, 1);
        allEnemies.push(new Enemy());
    }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.

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
    console.log("You win! You now have " + this.points + " points.");
};

Player.prototype.lose = function () {
    this.points--;
    this.x = this.initialX;
    this.y = this.initialY;
    console.log("You lose! You now have " + this.points + " points.");
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
    // console.log(this.x, this.y);
    // console.log("y: "+this.y);
};

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
var allEnemies = [];
for (var i=0; i<3; i++) {
    allEnemies.push(new Enemy());
}
var player = new Player();


// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
