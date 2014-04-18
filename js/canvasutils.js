var ctx;
var smode;

function initCanvasUtils(context, opts) {
    ctx = context;
    smode = opts.rmode || 1;
}

function size(width, height) {
    if (width == undefined && height == undefined) {
        return [ctx.canvas.width, ctx.canvas.height];
    }
    else if (height != undefined) {
        ctx.canvas.height = parseInt(height);
        return height;
    } else {
        ctx.canvas.width = parseInt(width);
        return width;
    }
}

function shapeMode(mode) {
    if (mode === "xywh" || mode === 1) {
        smode = 1;
    }
    else if (mode === "xyrr" || mode === 2) {
        smode = 2;
    }
    else if (mode === "xyxy" || mode === 3) {
        smode = 3;
    }
    else if (mode === "p*" || mode === 4) {
        smode = 4;
    }
    else {
        smode = 1;
    }
}

function rect(param1, param2, param3, param4) {
    ctx.beginPath();
    switch (smode) {
        case 2:
            param1 = param1 - param3;
            param2 = param2 - param4;
            param3 *= 2;
            param4 *= 2;
            break;
        case 3:
            param3 -= param1;
            param4 -= param2;
            break;
        case 4:
            var x = parseInt(param1.split(",")[0]);
            var y = parseFloat(param1.split(",")[1]);
            var w = parseFloat(param4.split(",")[0]) - x;
            var h = parseFloat(param4.split(",")[1]) - y;
            param1 = x; param2 = y; param3 = w; param4 = h;
            break;
        default:
            break;
    }
    if (param3 < 0) {
        param3 *= -1;
        param1 -= param3;
    }
    if (param4 < 0) {
        param4 *= -1;
        param2 -= param4;
    }
    if (param1 < 0) {
        param3 -= param1;
        param1 = 0;
    }
    if (param2 < 0) {
        param4 -= param2;
        param2 = 0;
    }
    ctx.rect(param1, param2, param3, param4);
    ctx.closePath();
    ctx.stroke();
    ctx.fill();
}
function getMousePos(elem, evt) {
        var rect = elem.getBoundingClientRect();
        return {
          x: evt.clientX - rect.left,
          y: evt.clientY - rect.top
        };
}

function UserInterface(container, oldelem) {
    this.parent = container;
    this.sibling = oldelem;
    this.historyindex = 0;
    this.history = ["about:blank"];
    this.showMenuBar = false;
    this.body = document.createElement("div");
    this.places = new Array();
    this.places["about:blank"] = [{"background-color" : "#ffffff"}, "about:blank"];
    container.appendChild(this.body);
    if (window.jquery) {
        $(this.body).css({
            "width" : "100%",
            "height" : "100%",
            "background-color" : "#ffffff",
            "margin" : "0 auto"
                         });
        $(this.body).hide();
        $(this.sibling).show();
    }
    /*
    * @param url The String that refers to this particular screen
    * @param things [css, innerHTML]
    */
    this.addPlace = function(url, things) {
        this.places[url] = things;
    }
    this.onredir = function(url) { console.log("Redirecting to: " + url); }
    this.redir = function(url) {
        if (url === "" || url === undefined || url === null) {
            this.onredir();
            return;
        }
        this.historyindex = this.history.length;
        this.history.push(url);
        this.body.innerHTML = "";
        if (this.showMenuBar === true) {
            this.body.innerHTML = "<div id='adressbar' class='windowTop' style='background-color:#eeeeee;margin:0;width:100%;height:2em'><a href='#' class='smallButton'>Back</a>|<a href='#' class='smallButton'>Forward</a>&nbsp;&nbsp;<input type='text' style='height:1.2em;font-size:0.9em;width:50%;font-family:\"Ubuntu Mono\";' id='adress' value='"+ url +"' disabled='disabled'></div>";
        }
        this.places[url][0].height = "100%";
        $(this.body).css(this.places[url][0]);
        this.body.innerHTML += this.places[url][1];
        $(this.sibling).hide();
        $(this.body).show();
    }
}