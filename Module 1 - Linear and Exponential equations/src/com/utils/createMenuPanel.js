/**
 * Created by admin on 13/3/14.
 */

var menuDiv;
var BtnDivWidth = 260;
var originStart = 30;
var hBox
function createBGBOX()
{
    hBox = document.createElement('div');
    hBox.className = "tabRoundRectZero overview";
    hBox.style.height = heightDocument - headerInfo[3] - footerInfo[3] + "px";
    hBox.style.width = BtnDivWidth + "px";
    hBox.style.backgroundColor = "#c0c0c0";
    menuDiv.style.left = headerInfo[0] + headerInfo[2] - BtnDivWidth -10 + "px";
    menuDiv.appendChild(hBox);
}

var allPageArray;
function createButtonMenuPanel(allButton)
{
    var maxNum = Math.round((heightDocument - headerInfo[3] - footerInfo[3] - originStart)/32);
    var len = allPageArray.length;
    if(len>maxNum)
    {
        hBox.style.height = 32 * len +"px";
    }
    for(var i=0;i<len;i++)
    {
        var btnId = document.createElement('div');
        btnId.className = "tabRoundRectZero";
        btnId.id = "menuBtn"+i;
        aMenuBtn.push("menuBtn"+i);
        btnId.style.backgroundColor = "#e8f4f1";
        btnId.style.width = BtnDivWidth + "px";
        btnId.style.height = 30 + "px";
        var tBtn = document.createElement('div');
        tBtn.innerHTML = "<font face='calibriregular' color='#002925' size='-.65'>"+allPageArray[i]+"</font>";
        btnId.style.top = 2 + "px";
        btnId.style.position = "absolute";
        btnId.style.top = (originStart+2) * i +"px";
        btnId.appendChild(tBtn);
        //tBtn.style.marginTop = 4 + "px";

        btnId.style.cursor = "pointer";
        allButton.appendChild(btnId);
        tBtn.style.top = 15 - tBtn.offsetHeight/2 + "px";
    }
    addEvent();
    $(".scrollablePane").customScrollbar();
    //$(".scrollablePane").customScrollbar("resize", true)
}

function updateMenuButton()
{
    for(var i=0;i<aMenuBtn.length;i++)
    {
        $("#"+aMenuBtn[i]).css("backgroundColor","#e8f4f1");
        $("#"+aMenuBtn[i]).css("color","#002925");
        $("#"+aMenuBtn[i]).css("fontFamily","calibriregular");
        $("#"+aMenuBtn[i]).css("font-weight","normal");

    }

    $("#"+aMenuBtn[currentPageId-1]).css("backgroundColor","#a4d4c6");
    $("#"+aMenuBtn[currentPageId-1]).css("color","#002925");
    $("#"+aMenuBtn[currentPageId-1]).css("font-weight","bold");
}

var aMenuBtn = [];
function changePageDirext(event) {
    currentPageId = event.data.pageId;
    audioPlaying = true;
    _textId = 0;
    pageNumInfo.innerHTML = currentPageId + "/" + (allPageArray.length-1);
    $("#PreLoader").css('visibility',"visible");
    openCloseMenu();
    removePrevious();
    createPage();

}
function addEvent()
{
    for(var i=0;i<aMenuBtn.length;i++)
    {
        $("#"+aMenuBtn[i]).bind('click',{pageId:i+1},changePageDirext);
    }
}
function removeEventMenu()
{
    for(var i=0;i<aMenuBtn.length;i++)
    {
        $("#"+aMenuBtn[i]).unbind('click');
    }
}

function addHeader()
{
    var headBox = document.createElement('div');
    headBox.style.position = "relative";
    headBox.className = "overview";
    menuDiv.appendChild(headBox);
    var allButton = document.createElement('div');
    allButton.style.position = "relative";
    allButton.style.maxHeight = heightDocument - headerInfo[3] - footerInfo[3] - originStart + "px";
    allButton.style.width = BtnDivWidth + "px";
    allButton.style.top = - 3 + "px";
    allButton.className = "overview";
    menuDiv.appendChild(allButton);

    $('<img src="src/assets/gui/headerImage.png">').load(function() {
        $(this).appendTo(headBox);
        $(this).width(BtnDivWidth);
        var aClose = document.createElement('a');
        aClose.innerHTML = "&#215;";
        aClose.className = "crossButton";
        aClose.id = "closeButton";
        headBox.appendChild(aClose);
        aClose.style.textAlign = "right";
        aClose.style.left = BtnDivWidth -20  + "px";

        createButtonMenuPanel(allButton);

    });
}

function createMenuPanel()
{
    menuDiv = document.getElementById('menuDiv');
    //menuDiv.style.position = "fixed"
    menuDiv.style.top = headerInfo[3]+"px";

    //menuDiv.style.width = BtnDivWidth/2 + "px";
    //menuDiv.style.maxHeight = heightDocument - headerInfo[3] - footerInfo[3] + "px";
    menuDiv.style.height = heightDocument - headerInfo[3] - footerInfo[3] + "px";

    menuDiv.className = "default-skin scrollablePane";
    createBGBOX();
    addHeader();
}