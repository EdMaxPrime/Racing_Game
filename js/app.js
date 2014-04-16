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
var place = "/index";


//Game methods
$(document).ready(function() { //pre-init
    canvas = document.createElement('canvas'); //Create the canvas
    ctx = canvas.getContext("2d");
    canvas.width = 512;
    canvas.height = 480;
    
    document.getElementById("gameContainer").appendChild(canvas);
      function getMousePos(canvas, evt) {
        var rect = canvas.getBoundingClientRect();
        return {
          x: evt.clientX - rect.left,
          y: evt.clientY - rect.top
        };
      }
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