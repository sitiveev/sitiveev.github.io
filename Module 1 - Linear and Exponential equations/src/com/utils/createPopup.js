// JavaScript Document

function createPopup(head,headBase,headColor,headTextFont,content,contentColor,contentTextColor,contentImage,maxW,fontDesc)
{
    var contentArea = document.getElementById('popupContent');
    //contentArea.style.font = fontDesc;
    contentArea.style.color = contentTextColor;
    contentArea.innerHTML = content;
    contentArea.style.textAlign = 'left';

    contentArea.style.maxHeight = heightDocument / 2.5 + 'px';
    //contentArea.style.maxHeight = 320+ 'px';
    var maxWidth = document.getElementById('popupContent').offsetWidth;
    var imgDiv = document.createElement('div');
    contentArea.appendChild(imgDiv)
    imgDiv.style.position = 'relative';
    //imgDiv.style.top = + 10;
    imgDiv.style.top = 10 + "px";
    if(contentImage!=null)
    {
        $('<img src="'+ contentImage +'">').load(function() {
            $(this).appendTo(imgDiv);

            $(this).width(maxWidth-10);
        });
    }

    popupHeight = document.getElementById('popupCont').offsetHeight;
    $('#'+'popupCont').reveal($(this).data());

}

function createImagePopup()
{

}

var cId = 0;
var aRatio = .96;
function addPopupContent(contentType, contentData, headBool)
{
    var maxWidth = document.getElementById('popupContent').offsetWidth;
    var contentArea = document.getElementById('popupContent');
    if(layout!="ShrinkVertical")
    {
        contentArea.style.minHeight = 450*headerInfo[2]/1024 + 'px';
        contentArea.style.maxHeight = 580*headerInfo[2]/1024 + 'px';
    }
    else
    {
        contentArea.style.minHeight = heightDocument - 200 + 'px';
        contentArea.style.maxHeight = heightDocument -150 + 'px';
    }


    if(contentType!="text")
    {
        var imgDiv = document.createElement('div');
        contentArea.appendChild(imgDiv);
        imgDiv.style.position = 'relative';
        //imgDiv.style.top = 5 + "px";

        imgDiv.style.display = "inline-block";
        //imgDiv.style.verticalAlign = "middle";
        imgDiv.style.left = 15 +'px';
        imgDiv.style.marginLeft = "2px";
        imgDiv.style.zIndex = 0;
        $('<img src="'+ contentType +'">').load(function() {
            $(this).appendTo(imgDiv);
            if(layout!="ShrinkVertical")
            {
                $(this).width(this.width *.96 * headerInfo[2]/1024);
            }
            if(this.width>maxWidth)
            {
                $(this).width(maxWidth-32);
            }
            cId++;
            createPopupLoop();
        });
    }
    else
    {

        var tDiv = document.createElement('div');
        tDiv.style.position = 'relative';
        var hWidth = 0;
        if(layout=="full")
        {
            hWidth = -0
        }
        var marginRight = 0
        tDiv.style.maxWidth = popupWidth + hWidth + "px";
        tDiv.style.width = popupWidth + hWidth + "px";
        if(headBool=="head")
        {
            tDiv.id = "headDiv"
            tDiv.style.backgroundColor =_oColor;

            tDiv.style.color = "#FFFFFF";
            tDiv.style.height = 30 + "px";
            tDiv.className = "tabRoundRectZero";
        }
        else
        {
            tDiv.style.backgroundColor ="#e6e6e6";
            tDiv.className = "tabRoundRectZero";

        }
        tDiv.style.textAlign = "left"
        if(headBool=="head")
        {
            var aClose = document.createElement('a');
            aClose.innerHTML = "&#215;";
            aClose.className = "close-reveal-modal";
            aClose.style.display = "inline-block";
            tDiv.appendChild(aClose);
            aClose.style.textAlign = "right";
            aClose.style.left = popupWidth - 40 + "px";
            //aClose.style.position = "relative"
        }
        else
        {
            tDiv.style.top = -5  + "px";
        }
        var cDiv = document.createElement('div');
        cDiv.innerHTML = contentData;
        cDiv.style.display = "inline-block";
        cDiv.style.left = 16 + "px";
        cDiv.style.top = 2+"px"
        cDiv.style.position = "relative";;
        cDiv.style.maxWidth = popupWidth - 30 + "px";
        cDiv.style.textAlign = 'left'
        tDiv.appendChild(cDiv);
        contentArea.appendChild(tDiv);
        cId++;
        createPopupLoop();
    }
}

var _contentXMLDATA;
function createPopupLoop()
{
    var len = _contentXMLDATA.getElementsByTagName("content").length;
    if(cId<len)
    {
        var content = _contentXMLDATA.getElementsByTagName("content")[cId];
        var contentType = $(content).attr('image');
        var headBool = $(content).attr('type')
        var contentData = content.textContent;
        if(_oColor!="imagePopup")
        {
            addPopupContent(contentType,contentData,headBool);
        }
        else
        {
            addImagePopup(contentData,content);
        }

    }
    else
    {
        popupHeight = document.getElementById('popupCont').offsetHeight;
        console.log("popHeight", popupHeight)
        $('#'+'popupCont').reveal($(this).data());
        //$('#'+'popupContent').css("height",popupHeight+"px");
        $('#'+'popupContent').customScrollbar();
    }
}


function addImagePopup(contentData,content)
{
    var maxWidth = document.getElementById('popupContent').offsetWidth;
    var contentArea = document.getElementById('popupContent');
    var imageUrl = $(content).attr('imageUrl');
    var ratioArray = $(content).attr('popUpRatio').split(",");
    var imageFirst = $(content).attr('imageFirst')
    if(layout!="ShrinkVertical")
    {
        //contentArea.style.minHeight = 450*headerInfo[2]/1024 + 'px';
        contentArea.style.maxHeight = 580*headerInfo[2]/1024 + 'px';
        //contentArea.style.height = 580*headerInfo[2]/1024 + 'px';
    }
    else
    {
        //contentArea.style.minHeight = heightDocument - 200 + 'px';
        contentArea.style.maxHeight = heightDocument - 150 + 'px';
        //contentArea.style.height = heightDocument - 150 + 'px';
    }

    var tDiv = document.createElement('div');
    tDiv.style.position = 'relative';
    tDiv.className = "overview";
    tDiv.style.paddingLeft = 10 + "px";
    var hDiv = document.createElement('div');
    if($(content).attr('headerPop')=="true")
    {
        hDiv.innerHTML = $(content).attr('head');
        hDiv.style.width = popupWidth - 20 + "px";
        hDiv.style.fontFamily = "calibribold"
        hDiv.style.color = "#333333";
        tDiv.appendChild(hDiv);
    }
    if(imageFirst!="true")
    {
        addPopupText(tDiv,contentData,ratioArray,imageFirst)
        addPopupImage(tDiv,contentArea,contentData,imageFirst,ratioArray,imageUrl)
    }
    else
    {
        addPopupImage(tDiv,contentArea,contentData,imageFirst,ratioArray,imageUrl)
    }




}

function addPopupText(tDiv,contentData,ratioArray,imageFirst)
{
    var cDiv = document.createElement('div');
    cDiv.innerHTML = contentData;
    cDiv.style.display = "inline-block";
    cDiv.style.verticalAlign = "top";
    if(imageFirst!=10)
    {
        cDiv.style.paddingRight = 10 + "px";
    }

    cDiv.style.position = "relative";
    cDiv.style.maxWidth = layoutPopupManager(ratioArray[0],popupWidth)  + "px";
    cDiv.style.textAlign = 'justify';
    tDiv.appendChild(cDiv);
}

function addPopupImage(tDiv,contentArea,contentData,imageFirst,ratioArray,imageUrl)
{
    var imgDiv = document.createElement('div');
    imgDiv.style.display = "inline-block";

    imgDiv.style.verticalAlign = "top";
    $('<img src="'+ imageUrl +'" class="map" usemap="#imageButton" >').load(function() {
        $(this).appendTo(imgDiv);
        $(this).width(layoutPopupManager(ratioArray[1],popupWidth));
        tDiv.appendChild(imgDiv);

        if(imageFirst=="true")
        {
            imgDiv.style.paddingRight = 10 + "px"
            addPopupText(tDiv,contentData,ratioArray,imageFirst);
        }
        contentArea.appendChild(tDiv);
        cId++;
        createPopupLoop();
    });
}

var _oColor,_fColor;
function createPopupMultiContent(xmlData,oColor,fColor)
{
    cId = 0;
    _oColor = oColor;
    _fColor = fColor;
    _contentXMLDATA = xmlData;
    createPopupLoop();
}