
chars.forEach(function (char) {
    var img = new Image();
    img.src = char;
    img.classList.add("img");

    if (char === player.avatar) {
        img.classList.add("selected");
    }

    img.addEventListener("click", function () {
        player.avatar = char;
        var images = document.getElementsByClassName("img");
        for (var i = 0; i<images.length; i++) {
            images[i].classList.remove("selected");
        }
        this.classList.add("selected")
    });
    document.getElementById("characters").appendChild(img);
});

var global = this;
document.getElementById("start").addEventListener("click", function () {
    var rowMain = document.getElementById("rowMain");
    var game = document.getElementById("game");

    var level = document.createElement("DIV");
    level.classList.add("col-2");
    level.innerHTML='<h5>Level: <span id=\"level\">1</span></h5>';
    rowMain.insertBefore(level, game);

    var points = document.createElement("DIV");
    points.classList.add("col-2");
    points.innerHTML='<h5>Points: <span id="points">0</span></h5>';
    rowMain.insertBefore(points, game);

    game.removeChild(document.getElementById("start"));
    rowMain.removeChild(document.getElementById("instructions"));
    rowMain.removeChild(document.getElementById("characters"));
    Engine(global);
});