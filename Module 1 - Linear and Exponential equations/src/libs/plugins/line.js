/* © 2009 ROBO Design
* http://www.robodesign.ro
*/

// Keep everything in anonymous function, called on window load.

var canvas, context, canvaso, contexto;
var canvasID //= "editableCanvas" + currentPageId;
// The active tool instance.
var tool;
var tool_default = 'line';
var canvasAvl = false;
var objArray = [];
var aErasablecanvas;
var eraseableAval = false;
var posArray;

function createNewErasingCanvas() {
    //removeEraseCanvas();
    if(!eraseableAval)
    {
        eraseableAval = true;
        aErasablecanvas = document.createElement('canvas');
        aErasablecanvas.id = 'aErasablecanvas';
        var container = canvaso.parentNode;
        container.appendChild(aErasablecanvas);
        aErasablecanvas.width  = canvaso.width;
        aErasablecanvas.height = canvaso.height;
        aErasablecanvas.style.position = "absolute";
        aErasablecanvas.style.left = "0px";
        aErasablecanvas.style.top = "0px";
        aErasablecanvas.style.zIndex = 16;
        var curSelectedObjects = currentCanvasEditable.getObjects();
        posArray = [];
        for (var i = 0; i < curSelectedObjects.length; i++){
            posArray.push([]);
            posArray[posArray.length-1][0] = curSelectedObjects[i].getLeft();
            posArray[posArray.length-1][1] = curSelectedObjects[i].getTop();
            posArray[posArray.length-1][2] = curSelectedObjects[i].getWidth();
            posArray[posArray.length-1][3] = curSelectedObjects[i].getHeight();
        }
        var cid = "editableCanvas" + currentPageId;
        var sourceCanvas = document.getElementById(cid);
        for(var j=0;j<posArray.length;j++)
        {
            copyAllDatatoEraseableCanvas(posArray[j],aErasablecanvas,sourceCanvas);
        }
        currentCanvasEditable.clear();
    }
}

function copyAllDatatoEraseableCanvas(pos,toCanvas,sourceCanvas) {
    var image = new Image();
    var ctxL = sourceCanvas.getContext('2d');
    var ctxS = toCanvas.getContext("2d");
    var imgData = ctxL.getImageData(pos[0],pos[1],pos[2],pos[3]);
    ctxS.putImageData(imgData,pos[0],pos[1]);
}

deleteSelectedObject = function()
{
    console.log(currentCanvasEditable.getActiveGroup(),currentCanvasEditable.getActiveObject())
    if(currentCanvasEditable.getActiveGroup()){
        currentCanvasEditable.getActiveGroup().forEachObject(function(o){ currentCanvasEditable.remove(o) });
        //currentCanvasEditable.discardActiveGroup().renderAll();
    } else {
        currentCanvasEditable.remove(currentCanvasEditable.getActiveObject());
    }
};

function getDataBack(i)
{
    var img = convertCanvasToImage(aErasablecanvas,posArray[i][0],posArray[i][1],posArray[i][2],posArray[i][3]);
    console.log(aErasablecanvas,posArray[i][0],posArray[i][1],posArray[i][2],posArray[i][3]);
    fabric.Image.fromURL(img.src, function(oImg) {
        oImg.set('left',posArray[i][0])
        oImg.set('top',posArray[i][1]);
        currentCanvasEditable.add(oImg);
        i++;
        if(i<posArray.length)
        {
            getDataBack(i);
        }
        else
        {
            var container = canvaso.parentNode;
            container.removeChild(aErasablecanvas);
            eraseableAval = false;
        }
    });
}

function removeEraseCanvas()
{
    if(eraseableAval)
    {
        var i = 0;
        getDataBack(i);

    }
}

function removetools()
{
    if(canvasAvl)
    {
        canvas.removeEventListener(mouseDownString, ev_canvas, false);
        canvas.removeEventListener(mouseMoveString, ev_canvas, false);
        canvas.removeEventListener(mouseUPString,   ev_canvas, false);
        var container = canvaso.parentNode;
        container.removeChild(canvas);
        canvasAvl = false;
    }


}

function convertCanvasToImage(canvas,x,y,w,h) {
    var image = new Image();
    var ctxH = canvas.getContext('2d');
    var imgData = ctxH.getImageData(x,y,w,h);
    var dCanvas = document.createElement('canvas');
    var container = canvas.parentNode;
    var dCtx = dCanvas.getContext('2d');
    dCanvas.width  = w;
    dCanvas.height = h;
    dCanvas.style.position = "absolute";
    dCanvas.style.left = x+"px";
    dCanvas.style.top = y+"px";
    dCanvas.style.zIndex = 17;
    container.appendChild(dCanvas);
    dCtx.putImageData(imgData,0,0);
    image.src = dCanvas.toDataURL("image/png");
    dCtx.clearRect(x,y,w,h);
    container.removeChild(dCanvas);
    return image;
}

var canvasEditTemp;

function toolinit () {
// Find the canvas element.
    canvasID = "editableCanvas" + currentPageId;
    canvaso = document.getElementById(canvasID);
    canvasAvl = true;
    if (!canvaso) {
        alert('Error: I cannot find the canvas element!');
        return;
    }

    if (!canvaso.getContext) {
        alert('Error: no canvas.getContext!');
        return;
    }

    // Get the 2D canvas context.
    contexto = canvaso.getContext('2d');
    if (!contexto) {
        alert('Error: failed to getContext!');
        return;
    }

    // Add the temporary canvas.
    var container = canvaso.parentNode;
    canvas = document.createElement('canvas');
    if (!canvas) {
        alert('Error: I cannot create a new canvas element!');
        return;
    }

    canvas.id     = 'imageTemp';
    canvas.width  = canvaso.width;
    canvas.height = canvaso.height;
    canvas.style.position = "absolute";
    canvas.style.left = "0px";
    canvas.style.top = "0px";
    canvas.style.zIndex = 17;
    container.appendChild(canvas);
    //canvasEditTemp = new fabric.Canvas('imageTemp');
    //canvasEditTemp.selection = false;
    context = canvas.getContext('2d');

    // Get the tool select input.
    /*var tool_select = document.getElementById('dtool');
    if (!tool_select) {
        alert('Error: failed to get the dtool element!');
        return;
    }*/
    //tool_select.addEventListener('change', ev_tool_change, false);
    //tool = new tools['line']();
    //tool_select.value = tool_default;
    // Activate the default tool.

    if (tools[tool_default]) {

        tool = new tools[tool_default]();

        //tool_select.value = tool_default;
    }


    // Attach the mousedown, mousemove and mouseup event listeners.
    canvas.addEventListener(mouseDownString, ev_canvas, false);
    canvas.addEventListener(mouseMoveString, ev_canvas, false);
    canvas.addEventListener(mouseUPString,   ev_canvas, false);
}

var selectedtool = 'line'

// The general-purpose event handler. This function just determines the mouse
// position relative to the canvas element.
function ev_canvas (ev) {
if (ev.layerX || ev.layerX == 0) { // Firefox
    ev._x = ev.layerX;
    ev._y = ev.layerY;
} else if (ev.offsetX || ev.offsetX == 0) { // Opera
    ev._x = ev.offsetX;
    ev._y = ev.offsetY;
}

// Call the event handler of the tool.
var func = tool[ev.type];
if (func) {
    func(ev);
}
}

// The event handler for any changes made to the tool selector.
function ev_tool_change (ev) {
if (tools[this.value]) {
    tool = new tools[this.value]();
}
}

// This function draws the #imageTemp canvas on top of #imageView, after which
// #imageTemp is cleared. This function is called each time when the user
// completes a drawing operation.
function img_update () {
contexto.drawImage(canvas, 0, 0);
context.clearRect(0, 0, canvas.width, canvas.height);
}

// This object holds the implementation of each drawing tool.
var tools = {};

// The drawing pencil.
tools.pencil = function () {
var tool = this;
this.started = false;

// This is called when you start holding down the mouse button.
// This starts the pencil drawing.
this.mousedown = function (ev) {
    context.beginPath();
    context.moveTo(ev._x, ev._y);
    context.strokeColor = _colorPicked;
    tool.started = true;
    tool.pArray = [];
    tool.pArray.push([ev._x,ev._y]);
};

// This function is called every time you move the mouse. Obviously, it only
// draws if the tool.started state is set to true (when you are holding down
// the mouse button).
this.mousemove = function (ev) {
    if (tool.started) {
        context.lineTo(ev._x, ev._y);
        tool.pArray.push([ev._x,ev._y]);
        context.stroke();
    }
};

// This is called when you release the mouse button.
this.mouseup = function (ev) {
    if (tool.started) {
        tool.mousemove(ev);
        tool.started = false;

        var xArray = [];
        var yArray = [];
        xArray.push(tool.pArray[0][0]);
        yArray.push(tool.pArray[0][1]);

        for(var i=0; i<tool.pArray.length-1;i++)
        {
            var x = Math.min(tool.pArray[i][0],  tool.pArray[i+1][0]),
                y = Math.min(tool.pArray[i][1],  tool.pArray[i+1][1]),
                w = Math.max(tool.pArray[i][0],  tool.pArray[i+1][0]),
                h = Math.max(tool.pArray[i][1],  tool.pArray[i+1][1]);
            xArray.push(tool.pArray[i+1][0]);
            yArray.push(tool.pArray[i+1][1]);
        }
        var gleft = Array.min(xArray);
        var gTop = Array.min(yArray);
        var widthL = Math.abs(Array.max(xArray) - gleft);
        var heightL = Math.abs(Array.max(yArray) - gTop);
        console.log(gleft,gTop)
        var img = convertCanvasToImage(canvas,gleft,gTop,widthL,heightL);
        fabric.Image.fromURL(img.src, function(oImg) {
            //oImg.originX = gleft;
            oImg.set('left',gleft)
            oImg.set('top',gTop);
            currentCanvasEditable.add(oImg);
            console.log(oImg);
        });
        context.clearRect(0, 0, canvas.width, canvas.height);
    }
};
};

// The rectangle tool.
tools.rect = function () {
var tool = this;
this.started = false;

this.mousedown = function (ev) {
    tool.started = true;
    tool.x0 = ev._x;
    tool.y0 = ev._y;
};

this.mousemove = function (ev) {
    if (!tool.started) {
        return;
    }

    var x = Math.min(ev._x,  tool.x0),
        y = Math.min(ev._y,  tool.y0),
        w = Math.abs(ev._x - tool.x0),
        h = Math.abs(ev._y - tool.y0);

    context.clearRect(0, 0, canvas.width, canvas.height);

    if (!w || !h) {
        return;
    }

    context.strokeRect(x, y, w, h);
};

this.mouseup = function (ev) {
    if (tool.started) {
        tool.mousemove(ev);
        tool.started = false;
        //img_update();
        var x = Math.min(ev._x,  tool.x0),
            y = Math.min(ev._y,  tool.y0),
            w = Math.abs(ev._x - tool.x0),
            h = Math.abs(ev._y - tool.y0);
        context.clearRect(0, 0, canvas.width, canvas.height);

        var rect = new fabric.Rect({
            width: w, height: h, left: x, top: y,
            stroke: _colorPicked, strokeWidth: 5,
            fill: 'rgba(0,0,200,0)'
        });

// "add" rectangle onto canvas
        currentCanvasEditable.add(rect);
        //currentCanvasEditable.renderAll();
    }
};
};

//Circle
tools.circle = function () {
    var tool = this;
    this.started = false;
    this.mousedown = function (ev) {
        tool.started = true;
        context.strokeStyle = _colorPicked;
        context.lineWidth = _sizePicked;
        tool.x0 = ev._x;
        tool.y0 = ev._y;
    };

    this.mousemove = function (ev) {
        if (!tool.started) {
            return;
        }

        context.clearRect(0, 0, canvas.width, canvas.height);

        ev.preventDefault();
        ev.stopPropagation();
        var mouseX=parseInt(ev._x);
        var mouseY=parseInt(ev._y);
        drawOvalLine(mouseX,mouseY,tool.x0,tool.y0,context) ;
    };

    this.mouseup = function (ev) {
        if (tool.started) {
            tool.mousemove(ev);
            tool.started = false;
            context.clearRect(0, 0, canvas.width, canvas.height);
            var x = Math.min(ev._x,  tool.x0),
                y = Math.min(ev._y,  tool.y0),
                h = Math.abs(ev._y -  tool.y0),
                w = Math.abs(ev._x - tool.x0);
            var myEllipse = new fabric.Ellipse({
                top: y,
                left: x,
                rx: w/2,
                ry: h/2,
                fill: 'rgba(0,0,200,0)',
                stroke: _colorPicked,
                strokeWidth: 2
            });
            currentCanvasEditable.add(myEllipse);

        }
    };



};


//Erase

tools.erase = function () {
    var tool = this;
    this.started = false;
    this.mousedown = function (ev) {
        createNewErasingCanvas();
        tool.started = true;
        console.log('set start')
    };

    this.mousemove = function (ev) {
        if (!tool.started) {
            return;
        }
        ev.preventDefault();
        ev.stopPropagation();

        //var canLocal = document.getElementById("aErasablecanvas");
        var ctxLocal = aErasablecanvas.getContext("2d");
        ctxLocal.clearRect(ev._x-(_sizePicked*5/2),
            ev._y-(_sizePicked*5/2),
            5*_sizePicked,
            5*_sizePicked);
    };

    this.mouseup = function (ev) {
        if (tool.started) {
            tool.started = false;
        }
    };



};

// The line tool.
tools.line = function () {
var tool = this;
this.started = false;
var beginX,beginY,endX,endY;
this.mousedown = function (ev) {
    tool.started = true;

    tool.x0 = ev._x;
    tool.y0 = ev._y;
};

this.mousemove = function (ev) {
    if (!tool.started) {
        return;
    }

    context.clearRect(0, 0, canvas.width, canvas.height);

    context.beginPath();
    context.moveTo(tool.x0, tool.y0);
    context.lineTo(ev._x,   ev._y);

    context.strokeStyle = _colorPicked;
    context.lineWidth = _sizePicked;
    context.stroke();
    context.closePath();



};

this.mouseup = function (ev) {
    //console.log(tool.x0, tool.y0, ev._x, ev._y,"sdadsadadasdsdas");
    if (tool.started) {
        tool.mousemove(ev);
        tool.started = false;
        context.clearRect(0, 0, canvas.width, canvas.height);
        //console.log(tool.x0, tool.y0, ev._x, ev._y,"sdadsadadasdsdas");
        var x = Math.min(ev._x,  tool.x0),
            y = Math.min(ev._y,  tool.y0),
            w = Math.max(ev._x, tool.x0),
            h = Math.max(ev._y, tool.y0);
        console.log(_colorPicked)
        var line = new fabric.Line([tool.x0,tool.y0,ev._x,ev._y], {
            fill: _colorPicked,
            stroke: _colorPicked,
            strokeWidth: 2,
            hasControls: true,
            hasRotatingPoint: true,
            padding: 0,
            left: x,
            top: y,
            scaleX: 1,
            scaleY: 1
        });
        currentCanvasEditable.add(line);
        if(arrowline)
        {

            // create a new line object
            //console.log(ev.x,ev.y,endX,endY)
            var line=new Line(tool.x0,tool.y0,ev._x,ev._y);
            // draw the line
            line.drawWithArrowheads(context);

        }

        //img_update();
    }
};



};
function Line(x1,y1,x2,y2){
    this.x1=x1;
    this.y1=y1;
    this.x2=x2;
    this.y2=y2;
}
Line.prototype.drawWithArrowheads=function(ctx){

    // arbitrary styling
    //ctx.strokeStyle=_colorPicked;
    //ctx.fillStyle="blue";
    //ctx.lineWidth=1;

    // draw the line
    //ctx.beginPath();
    //ctx.moveTo(this.x1,this.y1);
    //ctx.lineTo(this.x2,this.y2);
    //ctx.stroke();

    // draw the starting arrowhead
    if(!singlesidearrow)
    {
        var startRadians=Math.atan((this.y2-this.y1)/(this.x2-this.x1));
        startRadians+=((this.x2>this.x1)?-90:90)*Math.PI/180;
        this.drawArrowhead(ctx,this.x1,this.y1,startRadians);
    }

    // draw the ending arrowhead
    var endRadians=Math.atan((this.y2-this.y1)/(this.x2-this.x1));
    endRadians+=((this.x2>this.x1)?90:-90)*Math.PI/180;
    this.drawArrowhead(ctx,this.x2,this.y2,endRadians);


}
Line.prototype.drawArrowhead=function(ctx,x,y,radians){
    ctx.save();
    ctx.beginPath();
    ctx.translate(x,y);
    ctx.rotate(radians);
    ctx.moveTo(0,0);
    ctx.lineTo(5,20);
    ctx.lineTo(-5,20);
    ctx.closePath();
    ctx.restore();
    ctx.fill();
}

function drawOvalLine(x,y,startX,startY,ctx){
    ctx.clearRect(0,0,canvas.width,canvas.height);
    ctx.beginPath();
    ctx.moveTo(startX, startY + (y-startY)/2);
    ctx.strokeWidth = 2;
    ctx.strokeColor = _colorPicked;
    ctx.bezierCurveTo(startX, startY, x, startY, x, startY + (y-startY)/2);
    ctx.bezierCurveTo(x, y, startX, y, startX, startY + (y-startY)/2);
    ctx.closePath();
    ctx.stroke();
}
// vim:set spell spl=en fo=wan1croql tw=80 ts=2 sw=2 sts=2 sta et ai cin fenc=utf-8 ff=unix:

Array.min = function( array ){
    return Math.min.apply( Math, array );
};

Array.max = function( array ){
    return Math.max.apply( Math, array );
};