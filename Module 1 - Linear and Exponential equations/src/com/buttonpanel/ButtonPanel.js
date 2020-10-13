// JavaScript Document
//function s

var _colorPicked="ffcc00",_sizePicked=2;
function onColorClick(event)
{
    $(".subMenu").css("visibility","hidden");
    _colorPicked = event.data.name;
    Whiteboard.setStrokeStyle(_colorPicked);
    $('.textHigh').getHighlighter().setColor(_colorPicked);
}

var arrowline = false;
var singlesidearrow = false;

function onTouchClick(event)
{
    var canvasID = "editableCanvas" + currentPageId;
    stopSelection();
    stopDrawingLine();
    menuDiv.style.visibility = 'hidden';
    removeEraseCanvas();
    switch(event.data.name)
    {
        case "delete":
            if(audioPlaying)
            {
                return;
            }
            deleteSelectedObject();
            break;
        case "Next":
            $(".subMenu").css("visibility","hidden");
            changePage(1);
            break;
        case "Previous":
            $(".subMenu").css("visibility","hidden");
            changePage(-1);
            break;

        case "button_iwb":
            $(".subMenu").css("visibility","hidden");
            readyCanvas();
            break;
        case "mainMenu":
            visibleIWBPANEL();
            break;
        case "pencil":
            if(audioPlaying)
            {
                return;
            }
            tool_default = "pencil";
            startDrawingLine();
            break;
        case "marker":
            $("#"+canvasID).css("pointerEvents","none");
            $(".textHigh").textHighlighter({color: "#ffffff"});
            break;
        case "rectangle":
            if(audioPlaying)
            {
                return;
            }
            audioPlaying
            tool_default = "rect";
            startDrawingLine();
            break;
        case "oval":
            if(audioPlaying)
            {
                return;
            }
            tool_default = "circle";
            startDrawingLine();
            break;
        case "print":
            printPage();
            break;
        case "line":
            if(audioPlaying)
            {
                return;
            }
            tool_default = "line";
            arrowline = false;
            WhiteboardUi.changeTool();
            $("#"+canvasID).css("pointerEvents","all");
            startDrawingLine();
            break;
        case "double_headed_line":
            if(audioPlaying)
            {
                return;
            }
            arrowline = true;
            tool_default = "line";
            singlesidearrow = false;
            WhiteboardUi.changeTool();
            $("#"+canvasID).css("pointerEvents","all");
            startDrawingLine();
            break;
        case "single_headed_line":
            if(audioPlaying)
            {
                return;
            }
            arrowline = true;
            tool_default = "line";
            singlesidearrow = true;
            WhiteboardUi.changeTool();
            $("#"+canvasID).css("pointerEvents","all");
            startDrawingLine();
            break;
        case "selectable":
            if(audioPlaying)
            {
                return;
            }
            WhiteboardUi.changeTool();
            $("#"+canvasID).css("pointerEvents","all");
            startSelection();
            break;
        case "eraser":
            if(audioPlaying)
            {
                return;
            }
            tool_default = "erase";
            createNewErasingCanvas();
            startDrawingLine();
            stopSelection();
            break;

        case "sizeMenu":
            $(".subMenu").css("visibility","hidden");
            var iwbDivLeft = getOffset(document.getElementById("iwbDiv")).left;
            if(iwbDivLeft>headerInfo[2]+headerInfo[0]-300)
            {
                var diffSact = iwbDivLeft + 10 - (headerInfo[2] + headerInfo[0] - 300)
                iwbDiv.style.left = iwbDivLeft - diffSact + "px";
            }
            if(sactDivVisible)
            {
                sactDiv.style.visibility = "hidden";
            }
            else
            {
                sactDiv.style.visibility = "visible";
            }
            sactDivVisible = !sactDivVisible;
            break;

        case "shapeMenu":
            $(".subMenu").css("visibility","hidden");
            var iwbDivLeft = getOffset(document.getElementById("iwbDiv")).left;
            if(iwbDivLeft>headerInfo[2]+headerInfo[0]-150)
            {
                var diffSact = iwbDivLeft + 10 - (headerInfo[2] + headerInfo[0] - 150)
                iwbDiv.style.left = iwbDivLeft - diffSact + "px";
            }
            if(shapeMenuVisible)
            {
                shapeMenu.style.visibility = "hidden";
            }
            else
            {
                shapeMenu.style.visibility = "visible";
            }
            shapeMenuVisible = !shapeMenuVisible;
            break;

        case "play-pause":
            playPause();
            break;


    }

}

function getOffset( el ) {
    var _x = 0;
    var _y = 0;
    while( el && !isNaN( el.offsetLeft ) && !isNaN( el.offsetTop ) ) {
        _x += el.offsetLeft - el.scrollLeft;
        _y += el.offsetTop - el.scrollTop;
        el = el.offsetParent;
    }
    return { top: _y, left: _x };
}

var playpause = false;
var pageFinsihed = false;
function playPause()
{
    var customDiv = document.createElement('div');
    var btnPlay = document.getElementById('play-pause')
    if(playpause)
    {
        playpause = false;
        $(btnPlay).empty();
        if(_globalCurrentAudio!="null")
        {
            _globalCurrentAudio.pause()
        }
        btnPlay.innerHTML = "<img src='src/assets/gui/pause.png'>"
    }
    else
    {
        playpause = true;
        if(_globalCurrentAudio!="null")
        {
            _globalCurrentAudio.play();
        }
        btnPlay.innerHTML = "<img src='src/assets/gui/play.png'>"
    }
    if(pageFinsihed)
    {
        btnPlay.innerHTML = "<img src='src/assets/gui/replay.png'>"
    }
}


function printPage()
{
    var coDiv = document.createElement('div');
    coDiv.id = "coDiv";
    coDiv.className = "printable";
    coDiv.style.display = "inlne-block";
    coDiv.style.position = "relative";
    coDiv.style.width = headerInfo[2] + "px";
    //coDiv.style.height =  9999999 + "px";
    var pDiv = document.getElementById('printDiv');
    $("#printDiv").empty();
    pDiv.style.width = headerInfo[2] + "px";
    pDiv.style.height = heightDocument + "px";
    pDiv.style.backgroundColor = "rgba(0,0,0,.5)"
    pDiv.className = "tabRoundRectZero";
    pDiv.style.visibility = "visible";
    pDiv.style.left = headerInfo[0] + "px";
    pDiv.style.zIndex = 18;
    var aHead = document.createElement('div');
    aHead.id = "printHead"
    aHead.innerHTML = "Select Pages to Print";
    aHead.style.fontFamily = "calibribold";
    aHead.style.fontSize = "20px";
    aHead.style.color = "#ffffff";
    pDiv.appendChild(aHead);
    pDiv.appendChild(createPrintButton('Select All'));
    pDiv.appendChild(createPrintButton('Clear Selection'));
    pDiv.appendChild(createPrintButton('Print'));
    pDiv.appendChild(createPrintButton('Cancel'));
    aHead.style.left = headerInfo[2]/2 - document.getElementById('printHead').offsetWidth/2 + "px";
    for(var i = 0; i<pageArray.length;i++)
    {
        var rId = pageArray[i].getAttribute('id');
        coDiv.appendChild(pageArray[i]);
        //$("#innerCont").append(pDiv);
    }
    //$("#coDiv").print();
    
}

function createPrintButton(str)
{
    var idName = str.replace(" ", "");
    var bpDiv = document.createElement('div');
    bpDiv.id = idName;
    bpDiv.className = 'tabRoundRect';
    bpDiv.innerHTML = str;
    bpDiv.style.display = "inline-block";
    bpDiv.style.position = "relative"
    bpDiv.style.cursor = "pointer";
    bpDiv.style.fontFamily = "calibribold";
    bpDiv.style.fontSize = "14px";
    bpDiv.style.color = "#ffffff";
    bpDiv.style.paddingTop = bpDiv.style.paddingBottom = "10px";
    bpDiv.style.paddingLeft = bpDiv.style.paddingRight = "20px";
    bpDiv.style.margin = "20px";
    bpDiv.style.backgroundColor = "#006699";
    $("#"+idName).bind('click',{name:idName},onTouchPrintClick);
    return bpDiv;
}

function onTouchPrintClick(event)
{
    switch(event.data.name)
    {
        case "Cancel":
            $("#printDiv").css("visibility","hidden");
            break;

        case "SelectAll":
            break;

        case "Print":
            break;

        case "ClearSlection":
            break;
    }
}



//Creator

function createMenuPanelButton()
{

}
var aBtn2;
var penSubMenu,shapeMenu, mSubMenu, colorPanel, sizePanel;




function createImageToButtonTrans(startPointX,startPointY,aWidth,aHeight,imgDivEle,aName,idPop)
{
    var buttonUp = document.createElement('div');
    buttonUp.id = "transDummyDiv";
    buttonUp.style.width = aWidth + "px";
    buttonUp.style.height = aHeight + "px";
    buttonUp.style.position = "absolute";
    buttonUp.style.top = startPointX + "px";
    buttonUp.style.left = startPointY + "px";
    buttonUp.style.cursor = "pointer";
    imgDivEle.appendChild(buttonUp);
    console.log(imgDivEle,idPop)
    $("#transDummyDiv").bind('click',{obj:imgDivEle,changeTop:idPop},toggleMenuTrans);
}






function addButtonpanel()
{
    var aBtn1 = document.createElement("div");
    aBtn1.id = "BtnGrp1";
    aBtn1.className = "ui-grid-d center";



    var aBtn3 = document.createElement("div");
    aBtn3.id = "BtnGrp3";
    aBtn3.className = "ui-grid-d center";

	var posY = footerInfo[1];

    aBtn1.appendChild(createNavigation("customButton","mainMenu","src/assets/gui/iwb/wrench.png"));
    aBtn1.appendChild(addSep(-5));
    var volumeBtn = createNavigation("customButton","sound","src/assets/gui/mcVolume.png")
    aBtn1.appendChild(volumeBtn);

    aBtn1.appendChild(addSep(-5));
    aBtn1.appendChild(createNavigation("customButton","play-pause","src/assets/gui/play.png"));



    aBtn1.appendChild(addSep(-5));


    addIwbPanel();



    aBtn3.appendChild(addSep());
    aBtn3.appendChild(createNavigation("customButton","Previous","src/assets/gui/mcLeft.png"));
    aBtn3.appendChild(addSep());
	aBtn3.appendChild(createNavigation("customButton","Next","src/assets/gui/mcRight.png"));
    aBtn3.appendChild(addSep());
    aBtn3.appendChild(createNavigation("customButton","Menu","src/assets/gui/btnMenu.png"));

	aBtn1.style.position = aBtn3.style.position = "fixed";
	aBtn1.style.overflow = aBtn3.style.overflow =	"hidden";
    $("#buttonPanelDiv").append(aBtn1);

    aBtn1.style.top =  posY  + "px";
    aBtn3.style.top = posY  + "px";




    $("#button_sticky").stickynote(
        {
            size 			 : 'large'
        }
    );

	$("#buttonPanelDiv").append(aBtn3);


    //addVolumeSlider()
	aBtn1.style.left = footerInfo[0] + 2 + "px";
	aBtn3.style.left = footerInfo[0] +  footerInfo[2] - 145 - 2  + "px";
	//aBtn3.style.top = posY  + "px";


    createMenuPanelButton();


	for(var i=0;i<buttonArrayName.length;i++)
	{
        if(buttonArrayName[i]=="Menu")
        {
            $("#"+buttonArrayName[i]).bind('click',{name:buttonArrayName[i]},openMenuSeprate);
        }
        else
        {
            $("#"+buttonArrayName[i]).bind('click',{name:buttonArrayName[i]},onTouchClick);
        }
	}
}
function drawvolumecontroller(length,height,nowselected){
    document.getElementById("volumcontroller").innerHTML = "";
    for (var i=0;i<length;i++){
        var magassag = 10 //+ Math.round((1.4)*(length - i));
        var margintop =height/2-magassag/2;
        if (margintop <= 0) {margintop=0;}
        if (i >= nowselected){
            document.getElementById("volumcontroller").innerHTML =
                document.getElementById("volumcontroller").innerHTML +
                    '<div  onmouseup="volumecontrolchanged(' + i +
                    ')" style="background-color:#898989;height:' + magassag +
                    'px;margin-top:'+margintop+'px;" class="volumecontrollerbar"></div>';
        } else {
            document.getElementById("volumcontroller").innerHTML =
                document.getElementById("volumcontroller").innerHTML +
                    '<div  onmouseup="volumecontrolchanged(' + i +
                    ')" style="height:'+magassag+'px;margin-top:' + margintop +
                    'px;"class="volumecontrollerbar"></div>';
        }
    }
}
var _systemVolume
function volumecontrolchanged(newvolume){
    drawvolumecontroller(10,35,newvolume);
    _systemVolume = 1 - newvolume*10/100;
    console.log(_systemVolume)
    if(_globalCurrentAudio!="null")
    {
        $(_globalCurrentAudio).prop('volume',_systemVolume)
    }
}

function openMenuSeprate(event)
{
    settingOff = false;
    $("#iwbDiv").css("visibility","hidden");
    openCloseMenu();
}


function stopSelection()
{
    /*var curObjects = currentCanvasEditable.getObjects();

    currentCanvasEditable.discardActiveGroup();
    for (var i = 0; i < curObjects.length; i++)
    {
        curObjects[i].selectable = false;
    }*/
}


function stopDrawingLine()
{
    removetools();
}


function startDrawingLine()
{
    toolinit();
}

createSliderPanel=function(posY)
{
    var cPanel = document.createElement('div');
    cPanel.id = "sizePanel"
    cPanel.style.position = "absolute";
    var iCont = document.createElement('div');
    iCont.style.position = "absolute";

    var bgImage = "src/assets/gui/iwb/SubMenuBG.png";
    $('<img src="'+ bgImage +'">').load(function() {
        $(this).appendTo(iCont);
        cPanel.appendChild(iCont);

        var cCont = document.createElement("div");
        var dCont = document.createElement('div');
        var rDiv = document.createElement('div');
        dCont.style.position = cCont.style.position = rDiv.style.position = "inherit";
        rDiv.style.color = "#000000";
        dCont.style.width = cCont.style.width = rDiv.style.width = "282px";
        rDiv.innerHTML = "SELECT SIZE";
        rDiv.style.fontFamily = "calibriregular";
        cPanel.appendChild(rDiv);
        rDiv.style.left = cCont.style.left = "14px";
        cCont.style.top = "40px";
        rDiv.style.marginLeft = "4px";
        rDiv.style.top = "15px";
        cPanel.appendChild(cCont);
        // add Slider Here


        for(var i=0;i<7;i++)
        {
            var dot = document.createElement('div');
            dot.className = "tabRoundRect";
            dot.style.backgroundColor = "#000000";
            dot.style.display = "inline-block";
            dot.style.position = "relative";
            dot.style.marginLeft = "20px";
            dot.style.width = dot.style.height = i * 2 + 2 + "px";
            dCont.appendChild(dot);
        }
        cPanel.appendChild(dCont);
        dCont.style.top = "65px";
        dCont.style.left = "6px";
        cPanel.style.top = posY - 85 + "px";
    });

    return cPanel;
}



createColorPanel=function(posY)
{
    var cPanel = document.createElement('div');
    cPanel.id = "colorPanel"
    cPanel.style.position = "absolute";
    var iCont = document.createElement('div');
    iCont.style.position = "absolute";

    var bgImage = "src/assets/gui/iwb/SubMenuBG.png";
    $('<img src="'+ bgImage +'">').load(function() {
        $(this).appendTo(iCont);
        cPanel.appendChild(iCont);

        var cArray = ["#000000","#0004F7","#01FFFF","#08FC00","#FFFD0C","#FF00FF","#F40600"];
        var cCont = document.createElement("div");

        var rDiv = document.createElement('div');
        cCont.style.position = rDiv.style.position = "inherit";
        rDiv.style.color = "#000000";
        rDiv.style.width = "282px"
        cCont.style.width = "282px"
        rDiv.innerHTML = "SELECT COLOR";
        rDiv.style.fontFamily = "calibriregular";
        cPanel.appendChild(rDiv);
        rDiv.style.left = cCont.style.left = "14px";
        cCont.style.top = "50px";
        rDiv.style.marginLeft = "4px";
        rDiv.style.top = "15px";
        cPanel.appendChild(cCont);
        for(var i = 0 ; i < cArray.length; i++)
        {
            var cDiv = document.createElement('div');
            cDiv.id = "color" + i;
            cDiv.className = "tabRoundRectZero";
            cDiv.style.backgroundColor = cArray[i];
            cDiv.style.marginLeft = "3px"
            cDiv.style.width = cDiv.style.height = 25 + "px";
            cDiv.style.display = "inline-block";
            cDiv.style.position = "relative";
            cCont.appendChild(cDiv);
            $("#color"+i).bind('click',{name:cArray[i]},onColorClick);
        }
        cPanel.style.top = posY - 85 + "px";
    });

    return cPanel;
}

createPencilMenu=function()
{
    var pSubMenu = document.createElement('div');
    pSubMenu.style.position = "absolute";
    pSubMenu.appendChild(createNavigation("customButtonVertical","button_pencil","src/assets/gui/iwb/pencil.png"));
    pSubMenu.appendChild(createNavigation("customButtonVertical","button_marker","src/assets/gui/iwb/marker.png"));
    return pSubMenu;
}

createMainSubMenu=function()
{
    var mainSubDiv = document.createElement('div');
    mainSubDiv.style.position = "absolute";
    mainSubDiv.appendChild(createNavigation("customButtonVertical","button_iwb","src/assets/gui/iwb/rectangle.png"));
    mainSubDiv.appendChild(createNavigation("customButtonVertical","button_print","src/assets/gui/iwb/oval.png"));
    return mainSubDiv;
}





function removeButtonEvent()
{
    for(var i=0;i<buttonArrayName.length;i++)
    {
        $("#"+buttonArrayName[i]).unbind('click');
    }
    $("#mBtnDiv").unbind('click');
    buttonArrayName = []
}

var buttonArrayName = [];
function addSep(no)
{
    var sep = document.createElement('div');
    sep.style.position = "relative"
    sep.style.top = no + "px";
    sep.style.paddingRight = "2px"
    sep.style.display = "inline-block";
    $('<img src="src/assets/gui/menuSepreator.png">').load(function() {
        $(this).appendTo(sep);
    });
    return sep;
}





var closed = true;
var preZIndex;
function openMenu() {

    $('#menuDiv').css('visibility', "visible");
    preZIndex = $("#canvasHolder").css('z-index');
   // console.log(preZIndex,"dasdd")
    $("#innerCont").bind('click',{name:"Menu"},onTouchClick);
    $("#closeButton").bind('click',{name:"Menu"},onTouchClick);
}
function closeMenu()
{
    $('#menuDiv').css('visibility', "hidden");
    $("#closeButton").unbind('click');
    $("#innerCont").unbind('click')
}
function openCloseMenu() {
    var canvasID = "editableCanvas" + currentPageId;
    updateMenuButton();
    if($('#menuDiv').css('visibility')=="hidden")
    {
        openMenu();
        closed = false;
    }
    else
    {
        closeMenu();
        closed = true;
        $("#"+canvasID).css("pointerEvents","none");
    }
}


function readyCanvas()
{
    if(aBtn2.style.visibility=="visible")
    {
        aBtn2.style.visibility = "hidden";
    }
    else
    {
        aBtn2.style.visibility = "visible";
    }
}

function changePage(no)
{
	//console.log(currentPageId);
	_textId = 0;
    saveCanvasAndPage();
    var tempNum = Number(currentPageId) + no;
    console.log(tempNum,tempNum>1, tempNum<10);
    audioPlaying = true;
    if(tempNum>=1 && tempNum<allPageArray.length)
    {
        $("#PreLoader").css('visibility',"visible");
        currentPageId = tempNum;
        removePrevious();
        updateMenuButton();
        pageNumInfo.innerHTML = currentPageId + "/" + (allPageArray.length-1);
        createPage();
    }
    if(tempNum>=allPageArray.length-1)
    {
        //removePrevious();
    }
}



function removePrevious()
{
	$("#innerCont").empty();
    stopAllAudio();
    _posChartX = 0;
    _posChartY = 0;
    ySub = 0;
}

function rearrangebuttonPanel()
{
	
}

function removeButtonPanel()
{
	
}