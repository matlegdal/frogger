
var insertChars = (function () {
    chars.forEach(function (char) {
        var img = new Image();
        img.src = char;
        img.classList.add("img");
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
})();

var global = this;
document.getElementById("start").addEventListener("click", function () {
    document.getElementById("rowPoints").innerHTML='<div class="col-6 text-center">Level: <span id="level">1</span></div><div class="col-6 text-center">Points: <span id="points">0</span></div>';
    document.getElementById("game").removeChild(document.getElementById("start"));
    document.getElementById("rowMain").removeChild(document.getElementById("characters"));
    Engine(global);
});