/**
 * Created by admin on 8/5/14.
 */

var selectableCanvas;

var context;


var numShapes;
var shapes = [];
var dragIndex;
var dragging;
var mouseX;
var mouseY;
var dragHoldX;
var dragHoldY;
var timer;
var targetX;
var targetY;
var easeAmount;


function startSelection()
{

    var curObjects = currentCanvasEditable.getObjects();

    currentCanvasEditable.discardActiveGroup();
    for (var i = 0; i < curObjects.length; i++)
    {
        curObjects[i].selectable = true;
        curObjects[i].perPixelTargetFind = true;
    }
}

function stopSelection()
{
    //selectableCanvas.removeEventListener("mousedown", mouseDownListener, false);
}

function mouseDownListener(evt) {
    var i;

    //getting mouse position correctly
    var bRect = selectableCanvas.getBoundingClientRect();
    mouseX = (evt.clientX - bRect.left)*(selectableCanvas.width/bRect.width);
    mouseY = (evt.clientY - bRect.top)*(selectableCanvas.height/bRect.height);

    /*
     Below, we find if a shape was clicked. Since a "hit" on a square or a circle has to be measured differently, the
     hit test is done using the hitTest() function associated to the type of particle. This function is an instance method
     for both the SimpleDiskParticle and SimpleSqureParticle classes we have defined with the external JavaScript sources.
     */
    for (i=0; i < shapes.length; i++) {
        if (shapes[i].hitTest(mouseX, mouseY)) {
            dragging = true;
            //the following variable will be reset if this loop repeats with another successful hit:
            dragIndex = i;
        }
    }

    if (dragging) {
        window.addEventListener("mousemove", mouseMoveListener, false);

        //place currently dragged shape on top
        shapes.push(shapes.splice(dragIndex,1)[0]);

        //shapeto drag is now last one in array
        dragHoldX = mouseX //- shapes[numShapes-1].x;
        dragHoldY = mouseY //- shapes[numShapes-1].y;

        //The "target" position is where the object should be if it were to move there instantaneously. But we will
        //set up the code so that this target position is approached gradually, producing a smooth motion.
        targetX = mouseX - dragHoldX;
        targetY = mouseY - dragHoldY;

        //start timer
        timer = setInterval(onTimerTick, 1000/30);
    }
    selectableCanvas.removeEventListener("mousedown", mouseDownListener, false);
    window.addEventListener("mouseup", mouseUpListener, false);

    //code below prevents the mouse down from having an effect on the main browser window:
    if (evt.preventDefault) {
        evt.preventDefault();
    } //standard
    else if (evt.returnValue) {
        evt.returnValue = false;
    } //older IE
    return false;
}

function onTimerTick() {
    //because of reordering, the dragging shape is the last one in the array.
    shapes[numShapes-1].x = shapes[numShapes-1].x + easeAmount*(targetX - shapes[numShapes-1].x);
    shapes[numShapes-1].y = shapes[numShapes-1].y + easeAmount*(targetY - shapes[numShapes-1].y);

    //stop the timer when the target position is reached (close enough)
    if ((!dragging)&&(Math.abs(shapes[numShapes-1].x - targetX) < 0.1) && (Math.abs(shapes[numShapes-1].y - targetY) < 0.1)) {
        shapes[numShapes-1].x = targetX;
        shapes[numShapes-1].y = targetY;
        //stop timer:
        clearInterval(timer);
    }
    drawScreen();
}

function mouseUpListener(evt) {
    selectableCanvas.addEventListener("mousedown", mouseDownListener, false);
    window.removeEventListener("mouseup", mouseUpListener, false);
    if (dragging) {
        dragging = false;
        window.removeEventListener("mousemove", mouseMoveListener, false);
    }
}

function mouseMoveListener(evt) {
    var posX;
    var posY;
    var shapeRad = 0;//shapes[numShapes-1].radius;
    var minX = shapeRad;
    var maxX = selectableCanvas.width - shapeRad;
    var minY = shapeRad;
    var maxY = selectableCanvas.height - shapeRad;

    //getting mouse position correctly
    var bRect = selectableCanvas.getBoundingClientRect();
    mouseX = (evt.clientX - bRect.left)*(selectableCanvas.width/bRect.width);
    mouseY = (evt.clientY - bRect.top)*(selectableCanvas.height/bRect.height);

    //clamp x and y positions to prevent object from dragging outside of canvas
    posX = mouseX - dragHoldX;
    posX = (posX < minX) ? minX : ((posX > maxX) ? maxX : posX);
    posY = mouseY - dragHoldY;
    posY = (posY < minY) ? minY : ((posY > maxY) ? maxY : posY);

    targetX = posX;
    targetY = posY;
}