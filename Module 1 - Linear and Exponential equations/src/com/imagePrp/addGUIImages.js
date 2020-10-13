



var bmp;
var loadingGUIImages = false;
var nextInSequence =[];

addImages = function (str, pWidth, pHeight, posStr,targetDiv) {
    nextInSequence.push([str, pWidth, pHeight, posStr, targetDiv]);
    addtoStage();
};

function addtoStage()
{
	if(!loadingGUIImages)
	{
		loadingGUIImages=true;
        var aTarget = document.getElementById(nextInSequence[0][4]);
        var target = document.createElement('div');
        $('<img src="'+ nextInSequence[0][0] +'">').load(function() {
            $(this).appendTo(target);
            aTarget.appendChild(target);
            target.style.position = 'fixed';
            var aHeight = $(this).height();
            var idImageDiv = nextInSequence[0][3] + "_BG";
            target.id = idImageDiv;
            var tempWidth = widthDocument;
            if(widthDocument>1024)
            {
                tempWidth = 1024;
            }
            if(nextInSequence[0][3]!='logo')
            {
                $(this).width(tempWidth);
                $(this).height(aHeight);
            }
            else
            {
                target.style.left = widthDocument/2 - tempWidth/2 + 15 + "px";
                target.style.top = 7 + "px";
                $(this).width($(this).width() *.95)
            }

            if(nextInSequence[0][3]=="footer")
            {
                target.style.left = widthDocument/2 - tempWidth/2 + "px";
                target.style.top = heightDocument - $(this).height()+'px';
                addInfo(footerInfo,document.getElementById(idImageDiv).offsetLeft,document.getElementById(idImageDiv).offsetTop,tempWidth,$(this).height());
            }
            if(nextInSequence[0][3]=="header")
            {
                initY = 10;
                target.style.left = widthDocument/2 - tempWidth/2 + "px";
                addInfo(headerInfo,document.getElementById(idImageDiv).offsetLeft,document.getElementById(idImageDiv).offsetTop,tempWidth,$(this).height());
            }

            nextInSequence.shift();
            loadingGUIImages = false;
            if (nextInSequence.length > 0) {
                addtoStage();
            } else {
                guiLoaded();
            }


           // console.log(widthDocument,heightDocument,$(this).width,$(this).height(),target.style.left,$(this).top)
        });
	}
}

addInfo = function (arr, _x, _y, _width, _height) {
    arr[0] = _x;
    arr[1] = _y;
    arr[2] = _width;
    arr[3] = _height;
};

this.tick = function () {
    stage.update();
};
