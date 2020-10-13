



var bmpNormal;
var loadingNormalImages = false;
var nextInSequenceNormal =[];

addNormalImages = function(str,pWidth,pHeight,posStr,status)
{
	nextInSequenceNormal.push([str,pWidth,pHeight,posStr,status]);
	addtomcContainer();
}

function addtomcContainer()
{
	
	if(loadingNormalImages==false)
	{
		loadingNormalImages=true;
		//bmpNormal = new createjs.Bitmap(nextInSequenceNormal[0][0]);
        $('<img src="'+ nextInSequenceNormal[0][0] +'">').load(function() {
            $(this).appendTo("#innerCont");
            $(this).width(nextInSequenceNormal[0][1])
            nextInSequenceNormal.shift();
            //mcContainer.update();
            if(nextInSequenceNormal.length>0)
            {
                addtomcContainer();
            }
            else
            {
                startPreAssesmet();
                $("#PreLoader").css("visibility","hidden")
            }
        });

	}
}


