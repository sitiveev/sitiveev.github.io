var _pageInfo;
var _textId = 0;
var aDiv = document.createElement("div");


function styleDivAccording(ele, arr,mlayer,size)
{
    var arrDis = arr

    if(mlayer=='true')
    {
        ele.style.width = layoutManager(size,"text") + "px";
    }
    else
    {
        if(arrDis.length == 2)
        {
            ele.style.width = layoutManager(arrDis[0],"text") + "px";
        }
    }
}
var audioPlaying = true;

function callNext(aNo, length, audioId, lengthCheck)
{
    //update_mathjax();
    $(".scrollablePage").customScrollbar();
    //alert(aNo,length)
    if(lengthCheck!=0)
        $(".scrollablePage").customScrollbar("scrollTo", $("#textDiv"+(aNo-1)));
    if(aNo < length)
    {
        $("#PreLoader").css("visibility","hidden")
        if(audioId!="null")
        {
            playSound(document.getElementById(audioId),aNo,length,false,"null",aDiv);
            return;
        }
        $("#PreLoader").css("visibility","visible")
        addTextAsLayout(aNo);
        update_mathjax();
    }
    else
    {
        if(audioId!="null")
        {
            playSound(document.getElementById(audioId),aNo,length,true,"null");
        }
        $("#PreLoader").css('visibility',"hidden");
        createEditableField(aDiv);
        audioPlaying = false;
        update_mathjax();
    }

}



var popArray ;
var feedbackInputCorrect = ""
var feedbackInputInCorrect = ""
var feedbackInputInSecondCorrect = ""
var addTextAsLayout = function (_textId)
{
    var pageInfoText = $(_pageInfo).find( "screenText" )[_textId];

    var pageRef = $(pageInfoText).attr('pageRef');
    var imageSrc = $(pageInfoText).attr('imageSrc');
    var texttoadd = $(pageInfoText).text();
    var anim = $(pageInfoText).attr('anim');
    var type = $(pageInfoText).attr('type');
    var fontDesc = $(pageInfoText).attr('fontDesc');
    var color = $(pageInfoText).attr('color');
    var inputType = $(pageInfoText).attr('inputType');
    if(inputType == "true")
    {
        feedbackInputCorrect = $(_pageInfo).find("feedBackCorrect")
        feedbackInputInCorrect = $(_pageInfo).find("feedBackInCorrect")
        feedbackInputInSecondCorrect = $(_pageInfo).find("feedBackInCorrectSecond")
    }
    popArray = [];
    var audioId = $(pageInfoText).attr('audioId');
    audioRefIdIOS = audioId;
    if($(pageInfoText).attr('imageMapClick')=="true")
    {
        var alen = $(_pageInfo).find( "popUp" ).length;
        for(var j=0;j<alen;j++)
        {
            popArray.push($(_pageInfo).find( "popUp" )[j])
        }
    }
    var ele = document.createElement("div");
    var elename = "textDiv" + _textId
    ele.id = elename;
    ele.innerHTML = texttoadd;
    ele.className = "textHigh"
    ele.style.paddingRight = 15 + "px";
    ele.style.textAlign = "justify";
    ele.style.display = "inline-block";
    update_mathjax();
    ele.style.verticalAlign = 'top';
    var arrDis = $(_pageInfo).attr('pageDis').split(',');
    if(arrDis[0]==0)
    {
        arrDis = $(pageInfoText).attr("pageDis").split(',');
    }
    styleDivAccording(ele,arrDis,$(_pageInfo).attr("multilayer"),$(pageInfoText).attr('contentSize'));
    if(texttoadd.length != 0)
    {
        aDiv.appendChild(ele);
        //$("#"+elename).textHighlighter({color: '#FF6666'});
    }
    if($(pageInfoText).attr('akordeon')=="true")
    {
        $( "#accordion" ).accordion();
    }

    else
    {
        ele.style.font = fontDesc;
        ele.style.color = color;
    }

    if($(_pageInfo).attr('interactiveDND')=="true")
    {
        createDNDAct(_pageInfo,aDiv);
    }
    if($(_pageInfo).attr('sortableDND')=="true")
    {
        sortableDND(_pageInfo,aDiv);
    }


    if($(pageInfoText).attr('scrollImage')=="customtrue")
    {
        var arrImagesScroll = $(pageInfoText).attr('imageArray').split(',');
        createScrollImage(ele,arrImagesScroll,pageRef)
    }
    if(imageSrc == 'null')
    {
        _textId++;
        callNext(_textId,$(_pageInfo).find( "screenText").length,audioId,texttoadd.length);
        if(type=="MCMS"||type=="MCSS")
        {
            //var pDiv = document.create
            ActivityAsType(type, currentHeight, 0, pageRef, aDiv,0,ele,arrDis);
        }

    }
    else if(imageSrc == 'video')
    {
        addVideo(aDiv,_pageInfo,layoutManager(arrDis[1]),false,_textId);
        _textId++;
        callNext(_textId,$(_pageInfo).find( "screenText").length,audioId,texttoadd.length);
    }
    else if(imageSrc == "videoInteractive")
    {
        add3dPopupLink(ele,_pageInfo);
        addVideo(aDiv,_pageInfo,layoutManager(arrDis[1]),true,_textId);
        _textId++;
        callNext(_textId,$(_pageInfo).find( "screenText").length,audioId,texttoadd.length);
    }
    else if(imageSrc=="imageWithDesc")
    {
        createImageWithDesc(aDiv,$(_pageInfo).find( "imageClickesc"),layoutManager(arrDis[1]));
        _textId++;
        callNext(_textId,$(_pageInfo).find( "screenText").length,audioId,texttoadd.length);
    }
    else
    {
        var imgDivEle = document.createElement('div');
        var imgid = "imageDivPage" + _textId
        imgDivEle.id = "imageDivPage" + _textId;
        imgDivEle.style.paddingRight = 10 + "px";
        imgDivEle.style.paddingTop = 6 + "px";
        imgDivEle.style.display = "inline-block";
        imgDivEle.style.verticalAlign = 'top';
        aDiv.appendChild(imgDivEle)
        var path = pageRef+"image/"+imageSrc;
        var dHeight;
        $('<img src="'+ path +'" class="map" usemap="#imageButton" >').load(function() {
            $(this).appendTo(imgDivEle);
            dHeight = $(this).height();
            if($(_pageInfo).attr("multilayer")=="true")
            {
                $(this).width(($(pageInfoText).attr('contentSize'),"image"));
            }
            else
            {
                $(this).width(layoutManager(arrDis[1]),"image");
            }
            if($(pageInfoText).attr('interactive3d')=="true")
            {
                var aLinkImage = document.createElement('div');
                aDiv.appendChild(aLinkImage);
                aLinkImage.id = "aLinkImage"
                aLinkImage.style.position = "absolute";
                aLinkImage.style.width = layoutManager(arrDis[1]) + "px";
                aLinkImage.style.height = dHeight + "px";
                aLinkImage.className = "tabRoundRectZero";
                aLinkImage.style.backgroundColor = "rgba(0,0,0,0)"
                aLinkImage.style.zIndex = 16;
                aLinkImage.style.cursor = "pointer";
                aLinkImage.style.left = imgDivEle.offsetLeft + "px";
                aLinkImage.style.top = imgDivEle.offsetTop + "px";
                var popInfo = $(_pageInfo).find( "popUpLink");
                $("#aLinkImage").bind('click',{name:$(popInfo).attr("name"),pageRef:$(popInfo).attr("pageRef"),imageSrc:$(popInfo).attr("images").split(",")},create3dPopup);
            }

            if($(pageInfoText).attr('imageMapClick')=="true")
            {
                var aHeight = $(this).height();
                var aWidth = $(this).width();
                var aImaPart = $(pageInfoText).attr('imagePart').split(',');
                var imageCoverd = 0;
                for(var i=0;i<aImaPart.length;i++)
                {
                    var startPointX = aWidth * imageCoverd;
                    var startPointY = 0;
                    var secondX = 0;
                    imageCoverd = imageCoverd + Number(aImaPart[i]);
                    if(i != 0)
                    {
                        secondX = aWidth * (imageCoverd);
                    }
                    else
                    {
                        secondX = aWidth * Number(aImaPart[i]);
                    }
                    //console.log(startPointX,startPointY,secondX,aHeight)
                    createImageToButton(startPointX,startPointY,secondX,aHeight,imgDivEle,"imgBtn"+i,i);
                }

            }
            _textId++;
            callNext(_textId,$(_pageInfo).find( "screenText").length,audioId,texttoadd.length);
        });
    }
    update_mathjax();

};

function interalonImageLoad()
{
    $(".scrollablePage").customScrollbar();
}


function createImageToButton(startPointX,startPointY,aWidth,aHeight,imgDivEle,aName,idPop)
{
    var aMap = document.createElement("map");
    aMap.name = "imageButton";
    aMap.id = "aMap";
    imgDivEle.appendChild(aMap);
    //href="javascript:void(0);" data-reveal-id="myModal"  onclick="showPagePopup(7,0);"
    var aStr = '<area id="'+aName+'" href="javascript:void(0);" data-reveal-id="myModal"  onclick="createImagePop('+String(idPop)+');" shape="rect" coords="' + String(startPointX) + ","+ String(startPointY) + "," + String(aWidth) + "," + String(aHeight) +'" alt="Octoface" data-maphilight="{"stroke":false,"fillColor":"ff0000","fillOpacity":0.6}" title="Link">';
    $('#aMap').append(aStr);
}

function createImagePop(idPop)
{
    createPopupMultiContent(popArray[Number(idPop)],"imagePopup","#006699")
}


var addImgDivGallery = 0;
function addImagesDiv(arrScrollImage, imgScrollDiv,pageRef)
{
    if(addImgDivGallery < arrScrollImage.length)
    {
        var path = pageRef + "image/" + arrScrollImage[addImgDivGallery];
        loadImageToScrollDiv(path,imgScrollDiv,arrScrollImage,pageRef);
    }
    else
    {
        $(".scrollableGallery").customScrollbar();
    }
}

function createScrollImage(aEle,arrScrollImage,pageRef)
{
    addImgDivGallery = 0;
    var imgScrollDiv = document.createElement("div");
    aEle.appendChild(imgScrollDiv);
    imgScrollDiv.style.position="relative";
    imgScrollDiv.id = "imgScrollDiv"
    imgScrollDiv.className = "imgScrollDiv default-skin scrollableGallery"
    imgScrollDiv.style.width = headerInfo[2] - 20 + "px";
    imgScrollDiv.style.paddingTop = 40 + "px";
    addImagesDiv(arrScrollImage,imgScrollDiv,pageRef);
}

function loadImageToScrollDiv(path,imgScrollDiv,arrScrollImage,pageRef)
{
    var imgFDiv = document.createElement('div');
    imgFDiv.style.position = "relative";
    imgFDiv.style.display = "table-cell";
    //imgFDiv.className = "overview";
    //imgFDiv.style.left = 10 + "px";
    if(addImgDivGallery!=0)
    {
        imgFDiv.style.paddingLeft = 10 + "px";
    }
    imgScrollDiv.appendChild(imgFDiv);
    $('<img src="'+ path +'">').load(function() {
        $(this).appendTo(imgFDiv);
        $(this).width((headerInfo[2]-20) *.75);
        console.log($(this).height())
        imgScrollDiv.style.height = $(this).height() + 6 + "px";
        addImgDivGallery++;
        addImagesDiv(arrScrollImage,imgScrollDiv,pageRef)
    });
}

function update_mathjax(){
    //console.log("dsas",MathJax.Hub)
    MathJax.Hub.Queue(['Typeset',MathJax.Hub]);
    MathJax.Hub.Config({
        "HTML-CSS": {
            preferredFont:null,
            webFont:"STIX-General",
            imageFont:null
        }
    });
    MathJax.Hub.Register.StartupHook("End",function () {
        //console.log(mathJaxNotUpdate,'sasasa')
        if(mathJaxNotUpdate>0)
        {
            $(".scrollablePage").customScrollbar();
        }
        mathJaxNotUpdate++;
    });
}

createPageaudio = function (pageInfo) {
    _pageInfo = pageInfo;
    aDiv = document.createElement("div");
    aDiv.id = "contDiv" + currentPageId;
    aDiv.className = "overview printable";
    aDiv.style.paddingLeft = 10 + "px";
    aDiv.style.height = heightDocument - headerInfo[3] - footerInfo[3];
    var audioArrayTag = $(pageInfo).find('audioArray');
    var audioArray = $(audioArrayTag).attr('array').split(',');
    var audioIdArray = $(audioArrayTag).attr('idArray').split(',');
    if(audioArray[0]=='null')
    {
        audioArray = [];
        audioIdArray = [];
    }
    var pageRef = $(pageInfo).attr('pageRef');
    //console.log(audioArray,"audioArray")

    currentHeight = 0;

    addContent(aDiv);

    var headerPage = document.createElement('div');
    headerPage.innerHTML = $(_pageInfo).attr('head');
    //headerPage.style.paddingLeft = 10 + "px";
    headerPage.style.font = $(_pageInfo).attr('fontDesc');
    headerPage.style.color = $(_pageInfo).attr('headColor');
    headerPage.style.paddingTop = 5 + "px";
    headerPage.style.paddingBottom = 25 + "px";
    aDiv.appendChild(headerPage);
    //alert($(_pageInfo).attr('head'));
    function frame() {
        clearInterval(id);
        loadAudioPage(pageRef,audioArray,audioIdArray,aDiv);

    }
    var id = setInterval(frame, 500)


}

function audioLoadedAll()
{
    if($(_pageInfo).attr('pageDisplayType') == "staticLayout")
    {
        addTextPlayAudio(_textId);
    }
    else
    {
        aDiv.style.display = "inline-block";
        addTextAsLayout(_textId);
    }
}

var currentHeight=0;

function addTextPlayAudio()
{
	var pageInfoText = $(_pageInfo).find( "screenText" )[_textId];

	if(pageInfoText != undefined)
	{
		addTextCont(pageInfoText);
	}
    else
    {

    }
}




addTextCont = function (pageInfoText) {
    var posX = $(pageInfoText).attr('posX');

    var posY = $(pageInfoText).attr('posY');
    var fontDesc = $(pageInfoText).attr('fontDesc');
    var color = $(pageInfoText).attr('color');
    var texttoadd = $(pageInfoText).text();
    var audio = $(pageInfoText).attr('audio');
    var size = $(pageInfoText).attr('size');
    var pageRef = $(pageInfoText).attr('pageRef');
    var imageSrc = $(pageInfoText).attr('imageSrc');
    var lineHeight = $(pageInfoText).attr('lineHeight');
    var anim = $(pageInfoText).attr('anim');
    var type = $(pageInfoText).attr('type');


    var ele = document.createElement("div");
    ele.id = "textDiv" + _textId;
    ele.innerHTML = texttoadd;
    //update_mathjax()
    ele.style.font = fontDesc;
    ele.style.color = color;

    addImagetoTarget(pageRef, imageSrc, posX, posY, size, anim, ele)
    aDiv.appendChild(ele);
    //update_mathjax()
    ele.style.position = "absolute";
    //ele.style.width = widthDocument-(widthDocument/50)-posX+"px";
    if (currentHeight == 0) {
        currentHeight = Number(posY) + initY;
    }

    ele.style.top = currentHeight + "px";
    //ele.style.left = 7.5 + "px";

    if (layout == "full") {
        //ele.style.left = -7.5 + (widthDocument - 994) / 2 + "px";
    }
    if (lineHeight != "") {
        ele.style.lineHeight = lineHeight;
    }
    if (size != 0) {

        if (layout == "full") {
            ele.style.maxWidth = size + "px";
            ele.style.textAlign = "justify";
            //ele.style.maxWidth = widthDocument - 30+"px";
        }
        else {
            ele.style.maxWidth = widthDocument - 30 + "px";
            ele.style.textAlign = "justify";
        }
    }
    var aHeight = document.getElementById("textDiv" + _textId).offsetHeight;
    var aY = document.getElementById("textDiv" + _textId).offsetTop;
    var aX = document.getElementById("textDiv" + _textId).offsetLeft;
    var aWidth = document.getElementById("textDiv" + _textId).offsetWidth;
    currentHeight = Number(aY) + Number(aHeight);
    var cWidth = Number(aX) + Number(size);

    ActivityAsType(type, currentHeight, aX, pageRef, aDiv,cWidth,ele);

    if (audio == "null") {
        _textId++;
        addTextPlayAudio();
    }
    else {
        playAudio(pageRef + "audio/" + audio);
    }

    update_mathjax();
};

ActivityAsType = function (type,currentHeight,aX,pageRef,aDiv,cwidth,CYUParent,arrDis) {
    switch (type)
    {
        case "chartBar":
            createChartBar(currentHeight,aX,pageRef,aDiv);
            break;
        case "staticSlider":
            createpagesevenact('',aDiv,currentHeight,aX,cwidth)
            break;
        case "staticAct":
            createStaticAct(aDiv,currentHeight,aX,cwidth);
            break;
        case "MCSS":
            createMCSSActivity(aDiv,currentHeight,aX,cwidth,_pageInfo,CYUParent,arrDis);
            break;
        case "MCMS":
            createMCMSActivity(aDiv,currentHeight,aX,cwidth,_pageInfo,CYUParent,arrDis);
            break;
    }
}


function addImagetoTarget(pageRef,imageSrc,posX,posY,size,anim,targetEle)
{
	if(imageSrc!="null")
	{
		var imgDiv = document.createElement('div')
		imgDiv.id ="imgDiv";
		$("#imgDiv").empty();
		if(anim!="true")
		{
			loadImage(pageRef+"image/"+imageSrc,Number(size)+30,15,imgDiv,anim);
		}
		else
		{
			loadBGAnimImage(pageRef+"image/"+imageSrc,posX, posY, imgDiv);
		}
		targetEle.appendChild(imgDiv);
	}
}

function loadBGAnimImage(path, posX, posY, target)
{
	 $('<img src="'+ path +'">').load(function() 
	 {
		 target.style.backgroundImage = 'url('+path+')';
		 target.style.width = 268.90+"px";
		 target.style.height = 165+"px";
		 if(layout=="full")
		 {
			imgDiv.style.position = "absolute";
			//ele.style.width = widthDocument-(widthDocument/50)-posX+"px";
			imgDiv.style.top = Number(posY)+"px";
			imgDiv.style.left = posX+"px";
		 }
		playImageAnimation()
	 });
}

function loadImage(path, posX, posY, target, anim) {
    $('<img src="'+ path +'">').load(function() {
      $(this).appendTo(target);
	  if(layout=="full")
	  {
		target.style.position = "absolute";
		//ele.style.width = widthDocument-(widthDocument/50)-posX+"px";
		target.style.top = Number(posY)+"px";
		target.style.left = posX + "px";
        var tempX = headerInfo[2]-posX;
          if(tempX<this.width)        $(this).width(headerInfo[2]-posX - 40)
	  }
	  else
	  {
		  var ratio = (widthDocument-30)*$(this).height()/$(this).width();
		  $(this).height(ratio);
		  $(this).width(widthDocument-30);
	  }
    });
}

function playImageAnimation()
{
	//console.log("animation playing")
	$('#imgDiv').sprite({
    fps: 24, 
    no_of_frames: 700, 
    on_first_frame: function(obj) {
        obj.spState(1); // change to state 1 (first row) on frame 1
    }, 
    on_last_frame: function(obj) {
        obj.spStop(); // stop the animation on the last frame
    },
    on_frame: { // note - on_frame is an object not a function
        12: function(obj) { // called on frame 8
            obj.spState(2); // change to state 2 (row 2) on frame 8
        },
        24: function(obj) { // called on frame 16
            obj.spState(3); // change to state 3 (row 3) on frame 16
        }
    }
});
	 $('#imgDiv').spStart();
}

playAudio = function(audio)
{
	//loadAudio(audio)
}