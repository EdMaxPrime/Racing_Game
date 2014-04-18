//Variables
var canvas;
var ctx;
var lastTime;
var mousePressed;
var mouseX = 0;
var mouseY = 0;
var keyPressed;
var whenreleased;
var message = "(?,?)";
var ui;


//Game methods
$(document).ready(function() { //pre-init
    canvas = document.createElement('canvas'); //Create the canvas
    ctx = canvas.getContext("2d");
    canvas.width = 512;
    canvas.height = 480;
    
    document.getElementById("gameContainer").appendChild(canvas);
      var context = canvas.getContext('2d');

      canvas.addEventListener('mousemove', function(evt) {
        var mousePos = getMousePos(canvas, evt);
        mouseX = mousePos.x;
        mouseY = mousePos.y;
        message = "(" + mouseX + "," + mouseY + ")";
      }, false);
    setup();
    loop();
});
function setup() { //init()
    initCanvasUtils(ctx, {smode : 1});
    ui = new UserInterface(document.getElementById("gameContainer"), canvas);
    ui.showMenuBar = true;
    ui.body.addEventListener('mousemove', function(evt) {
        pos = getMousePos(ui.body, evt);
        cursor = document.getElementById('cursor');
        cursor.style.display = "";
    }, false);
    ui.body.addEventListener('mouseout', function(evt) {
        document.getElementById('cursor').style.display = "none";
    }, false);
    ui.addPlace("/menu/main.html", [{"background-color" : "#f26f21"}, "<b><h2 style='text-align:center;color:#FAEFCC'>Say What???</h2></b><br><br><br><a class='button'>Play</a><a class='button'>Continue Game</a><a class='button'>Help</a><a class='button'>Credits</a><br><br><br><span style='text-align:left;color:#FAEFCC;font-size:11pt;'>Version 0.9 Beta by EdMaxPrime (html5 and canvas)</span>"]);
    ui.addPlace("/menu/credits.html", [{"background-color" : "#f26f21"}, "<b><h2 style='text-align:center;color:#FAEFCC'>Credits</h2></b>"]);
    ui.redir("/menu/main.html");
}

function update() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.font = '18pt Calibri';
    ctx.fillStyle = '';
    ctx.fillText(message, 10, 25);
    rect(50, 50, 100, 50);
}

function loop() { //Keeps the game running
    var now = Date.now();
    var dt = (now - lastTime) / 1000.0;

    update(dt);

    lastTime = now;
    requestAnimFrame(loop);
}
var requestAnimFrame = (function(){
    return window.requestAnimationFrame       ||
        window.webkitRequestAnimationFrame ||
        window.mozRequestAnimationFrame    ||
        window.oRequestAnimationFrame      ||
        window.msRequestAnimationFrame     ||
        function(callback){
            window.setTimeout(callback, 1000 / 60);
        };
})();