
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
    document.getElementById("game").removeChild(document.getElementById("start"));
    var rowMain = document.getElementById("rowMain");
    rowMain.removeChild(document.getElementById("instructions"));
    rowMain.removeChild(document.getElementById("characters"));

    var title = document.getElementById("title");
    title.classList.remove("display-1");
    title.classList.add("display-4");

    Engine(global);
});