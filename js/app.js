
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
    level.innerHTML='Level: <span id=\"level\">1</span>';
    rowMain.insertBefore(level, game);

    var points = document.createElement("DIV");
    points.classList.add("col-2");
    points.innerHTML='Points: <span id="points">0</span>';
    rowMain.insertBefore(points, game);

    document.getElementById("game").removeChild(document.getElementById("start"));
    document.getElementById("rowMain").removeChild(document.getElementById("characters"));
    Engine(global);
});