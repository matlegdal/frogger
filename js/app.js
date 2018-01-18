// Enemies our player must avoid
var Enemy = function() {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
    this.x = -101;
    this.y = (Math.floor(Math.random()*3)) * 83 + 41;
    this.speed = Math.floor(Math.random() * 100) + 100;
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.x += this.speed*dt;


    if (this.x > 505) {
        var i = allEnemies.indexOf(this);
        allEnemies.splice(i, 1);
        allEnemies.push(new Enemy());
    }
    // console.log("enemy at ("+this.x+ " " +this.y+")")
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
    this.x = 202;
    this.y = 332+41;
    this.speedx = 101;
    this.speedy = 83;
};

Player.prototype.update = function() {

};

Player.prototype.render = function () {
    ctx.drawImage(Resources.get(this.avatar), this.x, this.y);
};

Player.prototype.handleInput = function (dir) {
    switch (dir) {
        case 'left':
            this.x -= this.speedx;
            break;
        case 'right':
            this.x += this.speedx;
            break;
        case 'up':
            this.y -= this.speedy;
            break;
        case 'down':
            this.y += this.speedy;
    }
    console.log("x: "+this.x);
    console.log("y: "+this.y);

};

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
var allEnemies = [];
for (var i=0; i<3; i++) {
    allEnemies.push(new Enemy());
    console.log(allEnemies[i].speed)
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
