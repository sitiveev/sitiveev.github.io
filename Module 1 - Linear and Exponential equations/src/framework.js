// For NTU Production

var stage;
var myCanvas = $("#NtuGui").get(0);
var widthDocument;
var heightDocument;
var currentX;
var currentY;
var initY = 0 ;
var headerInfo=[];
var footerInfo=[];
var mcContainer;
var gameCurrentState = 1;
var currentPageId = 1;
var currentQuestionId = 1;
var mathJaxNotUpdate = 0;



var isMobile = {
    Android: function() {
        return navigator.userAgent.match(/Android/i);
    },
    BlackBerry: function() {
        return navigator.userAgent.match(/BlackBerry/i);
    },
    iOS: function() {
        return navigator.userAgent.match(/iPhone|iPad|iPod/i);
    },
    Opera: function() {
        return navigator.userAgent.match(/Opera Mini/i);
    },
    Windows: function() {
        return navigator.userAgent.match(/IEMobile/i);
    },
    any: function() {
        return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows());
    }
};
var mouseMoveString = "mousemove";
var mouseDownString = "mousedown";
var mouseUPString = "mouseup";

var mobileTrue = false;


function ignorePrintSecreen() {
    //document.getElementById('body').onkeydown = khandle
    //document.getElementById('body').onkeyup = khandle
    //document.getElementById('body').onkeypress = khandle


}

function khandle(e) {
    console.log("e")
    e = e || event
    e.preventDefault ? e.preventDefault() : (e.returnValue = false)

    return

}

var _dataPageList ;

function init()
{
    mobileTrue = isMobile.any();


    if(mobileTrue)
    {
        //return;
        mouseMoveString = "touchmove";
        mouseUPString = "touchend";
        mouseDownString = "touchstart";
    }
    if(window.addEventListener)
    {
        window.addEventListener('resize', resize, false);
    }
    else
    {
        window.attachEvent('resize', resize);
    }
    _currentQueId = 0;
    getPageList('src/PageList.xml')


    update_mathjax()



	//createPage();
	//
	//playAnimation();
	// Define a spritesheet. Note that this data was exported by Zoë.

}

getPageList=function (str)
{
    $.ajax({
        type: "GET",
        crossDomain: true,
        url: encodeURI(str),
        dataType: "xml",
        success: startBuilding
    });
}
var allPageList;
startBuilding = function(data)
{
    _dataPageList = data;
    allPageList = $(_dataPageList).find( "page")[0];
    allPageArray = $(allPageList).attr('name').split(',');


    storeWidth();
    var pHold = document.getElementById('canvasHold');
    pHold.style.width=widthDocument+"px";
    layoutRatio();
    addPermanentMember();
    ignorePrintSecreen();

}

function saveCanvasAndPage()
{

}


var introPage = true;

var canvasArray = [];
var pageArray = [];
var currentCanvasID ;
var canvasPrepared = false;
var currentCanvasEditable ;
function createEditableField(iDiv)
{
    var zindex = 15;
    var canvasID = "editableCanvas" + currentPageId;
    //console.log(iDiv)
    if(pageArray[currentPageId-1]==undefined)
    {
        pageArray.push(iDiv);
        $("#pre")
    }
    //console.log(iDiv,iDiv.offsetWidth)
    currentCanvasID = canvasID;
    if(canvasArray[currentPageId-1] == undefined)
    {
        var canvas = document.createElement("canvas");
        //canvas.className = 'canvases';

        canvas.id = canvasID;
        canvas.style.zIndex = zindex;
        canvas.style.position = "absolute";
        canvas.style.left = "0px";
        canvas.style.top = "0px";
        var aHeight = iDiv.offsetHeight;

        var tHeight = heightDocument - headerInfo[3] - footerInfo[3];
        if(aHeight<tHeight)
        {
            aHeight = tHeight;
        }
        canvas.width = headerInfo[2];//iDiv.offsetWidth;
        canvas.height = aHeight;

        zindex++;
        canvasPrepared = false;
        //shapes.push()
        iDiv.appendChild(canvas);
        currentCanvasEditable = new fabric.Canvas(canvasID);
        fabric.Object.prototype.transparentCorners = false;
        canvasArray.push(canvas);
        menuDiv.style.zIndex = zindex + 1;
        var aMenu = document.getElementById('accessMenu')
        //aMenu.style.zIndex = zindex + 2;
        $(".iwbParControls").css('z-index',zindex + 2)
    }
    else
    {
        canvasPrepared = true;
        currentCanvasEditable = canvasArray[currentPageId-1]
        iDiv.appendChild(canvasArray[currentPageId-1])
    }
    $("#" + canvasID).css('pointerEvents',"none");
    WhiteboardUi.init($("#" + canvasID));


    //$("#innerCont").append('<div class="info-box"><ul><li>Select any text in the grey box below to highlight it.</li><li>Change highlight color:<div id="color-picker"><div class="color" style="background-color: #FF6666"></div><div class="color" style="background-color: #66FF66"></div><div class="color" style="background-color: #6666FF"></div></div></li></ul></div>')
}

dataLoaded = function (data) {
    //_data = data;
    switch (gameState(gameCurrentState)) {
        case preAsse:
            loadPreAssementContent(_currentQueId, data);
            break;
        case postAsse:
            loadPreAssementContent(_currentQueId, data);
            break;
        case learningModule:
            loadPageContent(0, data);
            addModuleEvent();
            break;
    }
};

var moduleloaded = false;
function addModuleEvent()
{
	 
	 //console.log("event added");
    if(!moduleloaded)
    {
        addSwipeEvents();
        moduleloaded = true;
    }

// Callback function references the event target and adds the 'swipe' class to it

}


function swipeHandler( event )
{
	//console.log("event added")
	removePrevious();
	changePage();
}


function resizeCurrentCanvas() {

}

function guiLoaded()
{
	storeContSize();
	storeClip();
    if(gameCurrentState == 1)
    {
        if(introPage)
        {
            createIntroPage($(allPageList).find('courseHead').text());
        }
        else
        {
            loadPreAssesment();
        }

    }
	else if(gameCurrentState == 2)
    {
        //add Page
        addPageNumber();
        addButtonpanel();
        createPage();

        createMenuPanel();
        pageNumInfo.innerHTML = currentPageId + "/" + (allPageArray.length-1);
        console.log(allPageArray.length)
        resizeCurrentCanvas();
    }
    else
    {
        loadPreAssesment();
    }


    //openCloseMenu();
	//addLogo();
	//
}



function loadPageAfterPre()
{
    addButtonpanel();
    createPage();
    createMenuPanel();
    addPageNumber();
}

function storeClip()
{
}
var pageNumInfo;
function addPageNumber() {
    pageNumInfo = document.createElement('div');
    pageNumInfo.style.color = "#ffffff";
    pageNumInfo.style.fontFamily = "calibriregular";
    pageNumInfo.style.left = headerInfo[0] +  headerInfo[2] - 50 + "px"
    pageNumInfo.style.top =  headerInfo[3] - 25 + "px"
    pageNumInfo.style.position = "absolute"

    $("#headerLogo").append(pageNumInfo);

}
function addLogo()
{
    var logoDiv;
    logoDiv = document.getElementById("headerLogo");
	$("#headerLogo").append('<img src="src/assets/gui/logo.png">');

}

var popupHeight;
var popupWidth;
function storeContSize()
{
    var iCont = document.getElementById('innerCont');
	$("#innerCont").height(heightDocument-headerInfo[3]-footerInfo[3]);
	$("#innerCont").width(headerInfo[2]);
	iCont.style.top = headerInfo[3]+'px';
    iCont.style.left = headerInfo[0]+"px";
    var popup3d = document.getElementById('3dpopup');
    popup3d.style.left = headerInfo[0]+"px";
    if(heightDocument>500)
    {
        popup3d.style.top = headerInfo[3]+"px";
    }

    var widthA = 800 * headerInfo[2]/1024;
    var leftA = -20 + 800 * headerInfo[2]/1024;
    popupWidth = widthA;
    $("#popupCont").css('maxWidth',popupWidth+"px");
    //console.log('lay',layout,widthA)
    if(layout!='full')
    {
        //widthA = headerInfo[2] - 20;
        leftA = widthA;
        //console.log(widthA,widthDocument);
        $("#popupCont").css('width',widthA+"px");
        $("#popupCont").css('marginRight',"0px");
    }else
    {
        $("#popupCont").css('width',widthA  + "px");
        $("#popupCont").css('marginRight',"-10px");
    }

    popupHeight = document.getElementById('popupCont').offsetHeight;
    //console.log(popupHeight,"pop")
    //$(".reveal-modal").css('top',heightDocument/2-document.getElementById('popupCont')/2-68+"px");
    $("#popupCont").css('left',widthDocument/2-leftA/2-5+"px");

}

function addPermanentMember()
{
    //console.log('resizing doc');
    addImages("src/assets/gui/base.png",widthDocument,0,"footer","buttonPanelDiv");
    addImages("src/assets/gui/header.png",widthDocument,0,"header","headerLogo");
    addImages("src/assets/gui/LOGO.png",0,0,"logo","headerLogo");
    //addImages("src/assets/gui/iwb/pencilmenu.png",0,0,"logo","headerLogo");
}

function showPagePopup(event)
{
	createPopup('',
				"#ff9900",
				'#006699',
                "",
				'<font size="4" face="calibribold">Note:<br></font><font face="calibriregular">WIP<br></font>',
				"#ffffff",
				'#006699',
				'src/assets/page7/image/page1.png',
				'240px',
				"");
}

function startPreAssesmet()
{
	$("#mcCont").click(function(e) {
        loadPreAssesment();
    });
}

addContent = function (aDiv) {
    $("#innerCont").append(aDiv);

    if (layout == "full") {
        //$("#innerCont").left = (widthDocument - 990) / 2 + "px";
    }
    //console.log($("#innerCont").height("1000px"))
    //$("#innerCont").height(aDiv.style.height);
};






function storeWidth()
{
	widthDocument = window.innerWidth;
	if(widthDocument>1024)
	{
		widthDocument=widthDocument - 30;
	}
	heightDocument = window.innerHeight;
	//stage.canvas.width = window.innerWidth;
	//stage.canvas.height = window.innerHeight;
}

function removeMenuPanel() {
    $("#menuDiv").empty();
}
var fullScreenHit = false;
function resize()
{
    var id = setInterval(resizeEvent, 300)
    console.log(fullScreenHit,"fullscreenhit")
    function resizeEvent() {
        clearInterval(id);
        if(!fullScreenHit)
        {

            _textId = 0;
            $(".scrollablePage").customScrollbar('remove');
            //$("#transTextDiv").customScrollbar("remove");
            //transTextDiv.innerHTML = "";
            removePrevious();
            removeButtonEvent();
            storeClip();
            storeWidth();
            layoutRatio();
            removePermanetMember();
            removeMenuPanel();
            addPermanentMember();
        }

    }
}

function removePermanetMember()
{
    //$('#buttonPanelDiv').empty();
    $('#headerLogo').empty();
    removeButtonEvent();
    $("#buttonPanelDiv").empty();
    $("#headerLogo").empty();
    $("#accessMenu").empty();
    canvasArray = [];
}

