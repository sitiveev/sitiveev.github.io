// JavaScript Document
function addQuestionHeader(stem,qdiv) {
    var qHeader = document.createElement('div');
    qHeader.className = "tabRoundRectQuestion";
    qHeader.style.maxWidth = "500px";
    qHeader.style.backgroundColor = "#c0c0c0"
    qHeader.style.minHeight = "40px";
    qHeader.innerHTML = stem.textContent;
    var iI = document.createElement('input');
    iI.type = "radio";
    //iI.innerHTML = stem.textContent;
    iI.name = "iCheck"
    qdiv.appendChild(iI);

}

var wrongFeedBack;
var rightFeedBack;
var feedS;
var selectedId = -1;
function showfeedBack()
{
    feedS.style.visibility = "visible";
    var correctAns;
    for(var i=0;i<ansXML.length;i++)
    {
        if(ansXML[i]==1)
        {
            correctAns = i+1;
        }
    }
    if(selectedId==correctAns)
    {
        feedS.innerHTML= rightFeedBack;
    }
    else
    {
        feedS.innerHTML= wrongFeedBack;
    }
    update_mathjax();
}

function storeData() {
    ansArray = [];
    for(var i=0;i<ansXML.length;i++)
    {
        if(Number(ansXML[i])==1)
        {
            ansArray.push(i);
        }
    }
    //console.log(ansArray,[selectedId-1]);
    var bool = array_compare(ansArray,[selectedId-1]);
    preAssesmentAnswerExpected.push(ansArray);
    preAssesmentAnswerGiven.push(bool);
    preAssesmentAnswerGivenIndex.push([selectedId-1]);
}
function clickedLocal(event)
{

    switch(event.currentTarget.id)
    {
        case "Submit":
            if(gameCurrentState==2)
            {
                showfeedBack();
            }
            else
            {
                storeData()
                _currentQueId++;
                loadNextQuestion();
            }

            break;
    }
}

function createSubmitButton(aDiv) {
    var boxH = document.createElement('div');
    //boxH.style.maxHeight = "50px";
    boxH.id = "Submit"
    boxH.style.maxWidth = "78px";
    //boxH.style.minWidth = "75px";
    boxH.style.cursor = 'pointer';
    boxH.className = "tabRoundRect";
    boxH.style.position = "relative";
    //boxH.style.top = "270px";
    boxH.style.backgroundColor = "#006699";
    boxH.style.color = "#ffffff";
    boxH.style.fontFamily = "calibribold"
    boxH.style.fontSize = "18px";
    //boxH.style.padding = "2px";
    boxH.style.marginTop = "50px";
    boxH.style.marginBottom = "10px";
    boxH.style.padding = "11px";
    boxH.style.marginLeft = "10px";
    boxH.style.zIndex = 16;
    boxH.innerHTML = "SUBMIT";
    aDiv.appendChild(boxH);
    selectedId = 0;
    console.log(document.getElementById("Submit").offsetWidth)
    $("#Submit").bind('click',{},clickedLocal);

}


createMCSSActivity = function(aDiv,currentHeight,aX,cwidth,options,CYUParent,arrDis)
{
    //console.log(options);
    var parentDiv = document.createElement('div');
    parentDiv.className = "tabRoundRectLeft";
    parentDiv.style.display = "inline-block";
    parentDiv.style.position = "relative";
    //parentDiv.style.height = innerContHeight  + "px";
    //CYUParent.appendChild(parentDiv);
    var op = options.getElementsByTagName('options')[0];
    var stem = op.getElementsByTagName('option');
    var tableType = $(op).attr('type')
    wrongFeedBack = options.getElementsByTagName('FeedbackIncorrect')[0].textContent;
    rightFeedBack = options.getElementsByTagName('FeedbackCorrect')[0].textContent;
    var len = stem.length;
    selectedId = 0;
    var optionDiv = document.createElement('div');
    CYUParent.appendChild(optionDiv);
    var originTop = 0;
    if(tableType=="table")
    {
        var bgDiv = document.createElement('div');
        bgDiv.style.position = "absolute";
        bgDiv.style.height = "120%"
        bgDiv.style.width = "100%"
        //bgDiv.style.backgroundColor = "#c0edec";
        optionDiv.appendChild(bgDiv);
        var pHeadDiv = document.createElement('div');
        pHeadDiv.className = "tabRoundRectTransitTwoSidedDown"
        pHeadDiv.style.position = "relative";
        pHeadDiv.style.backgroundColor = $(op).attr('headDivBGCOLOR');
        pHeadDiv.style.fontFamily = "calibriregular";
        pHeadDiv.style.color = "#ffffff";
        var headDiv1 = document.createElement('div');
        headDiv1.id = "headDivtableMCSS"
        headDiv1.className = "tabRoundRectZero";
        headDiv1.style.position = "relative";
        headDiv1.style.display = "inline-block";
        headDiv1.style.paddingBottom = "5px"
        headDiv1.style.paddingTop = "5px"
        headDiv1.innerHTML = $(op).attr('headDiv1');

        var headDiv2 = document.createElement('div');
        headDiv2.className = "tabRoundRectZero";
        headDiv2.style.position = "relative";
        headDiv2.style.display = "inline-block";
        headDiv2.style.paddingBottom = "5px"
        headDiv2.style.paddingTop = "5px"
        headDiv2.innerHTML = $(op).attr('headDiv2');

        bgDiv.appendChild(pHeadDiv);
        pHeadDiv.appendChild(headDiv1);
        pHeadDiv.appendChild(headDiv2);
        originTop = document.getElementById('headDivtableMCSS').offsetHeight;
    }
    optionDiv.textAlign = "Left";
    optionDiv.id = "optionDiv";
    optionDiv.maxWidth = 400+"px";
    optionDiv.style.position = "relative";
    //optionDiv.style.position = "inline-block";
    //optionDiv.style.left = aX + "px";
    //optionDiv.style.top = currentHeight - 15 + "px";
    feedS = document.createElement('div');
    feedS.style.position = "relative";
    feedS.style.display = "inline-block";
    feedS.className = "tabRoundRect";
    feedS.style.backgroundColor = "#cccccc";;
    feedS.style.textAlign = "left"
    feedS.style.padding = "20px";
    //feedS.style.marginTop = "40px";
    //feedS.style.marginLeft = "40px";
    feedS.style.display = "inline-block";
    feedS.style.visibility = "hidden"
    ansXML = $(op).attr('answer').split(',');
    var omWidth
    if(headerInfo[2]>768)
    {
        feedS.style.left = 10 + "px";
        feedS.style.width = headerInfo[2]*arrDis[1] - 60 +"px";
        CYUParent.style.width = headerInfo[2]*arrDis[0] - 40 +"px";
        omWidth = headerInfo[2]*arrDis[0] - 130;
    }
    else
    {
        feedS.style.width = headerInfo[2] - 60 +"px";
        CYUParent.style.width = headerInfo[2] - 20 +"px";
        omWidth = headerInfo[2] - 130;
    }
    var marginHor = 10 ;
    var marginVer = 10 ;
    var topA = 2

    var denoHead = "", arrDeno = ["(A)","(B)","(C)","(D)","(E)","(F)"];
    for(var i=0;i<len;i++)
    {
        var textOp = stem[i].textContent;
        if(tableType=="table")
        {
            marginVer = 0
            topA = 0;
            denoHead = '<div class="relativeInline" style="width: 20px; font-family: calibribold">' + arrDeno[i] + '</div>';
            $("#optionDiv").append('<div class="tabRoundRectZeroLeft " style="z-index:16;position: relative; margin-left: 10px; margin-right: 10px; margin-top:'+ marginVer +'px; margin-bottom:'+ marginVer +'px; top:'+ originTop +'px; left: 10px;"><input tabindex="3" type="radio" id="'+ i +'" name="radioButtons"><label for="input-'+ i +'" style="position: relative; margin-right: 10px; top:0px; left:20px;">'+ denoHead +'<div class="relativeInline" style="margin-left: 10px; text-align:justify; width:75%">'+ textOp +'</div></label></div>');

        }
        else
        {
            denoHead = '<div class="relativeInline" style="width: 20px; font-family: calibribold">' + arrDeno[i] + '</div>';
            $("#optionDiv").append('<div class="tabRoundRectZeroLeft " style="z-index:16;position: relative; margin-left: 10px; margin-right: 10px; margin-top:'+ marginVer +'px; margin-bottom:'+ marginVer +'px; top:'+ originTop +'px; left: 10px;"><input tabindex="3" type="radio" id="'+ i +'" name="radioButtons"><label for="input-'+ i +'" style="position: relative; margin-right: 10px; top:0px; left:20px;">'+ denoHead +'<div class="relativeInline" style="margin-left: 10px; text-align:justify; max-width:'+ omWidth +'px;">'+ textOp +'</div></label></div>');
        }



    }

    var mHeight = 0;
    var mWidth = 0;

    if(tableType=="table")
    {
        var lengthTable = $(op).attr("totalRowCount");

        for(var j=0;j<lengthTable;j++)
        {
            if(mHeight<document.getElementById('tableMCSS1_'+(j+1)).offsetHeight)
            {
                mHeight = document.getElementById('tableMCSS1_'+(j+1)).offsetHeight
            }
            if(mHeight<document.getElementById('tableMCSS2_'+(j+1)).offsetHeight)
            {
                mHeight = document.getElementById('tableMCSS2_'+(j+1)).offsetHeight
            }
            if(mWidth<document.getElementById('tableMCSS1_'+(j+1)).offsetWidth)
            {
                mWidth=document.getElementById('tableMCSS1_'+(j+1)).offsetWidth
            }
            if(mWidth<document.getElementById('tableMCSS2_'+(j+1)).offsetWidth)
            {
                mWidth=document.getElementById('tableMCSS2_'+(j+1)).offsetWidth
            }
        }
        for(var k=0;k<lengthTable;k++)
        {
            document.getElementById('tableMCSS1_'+(k+1)).style.height = mHeight - 4 + "px"
            document.getElementById('tableMCSS2_'+(k+1)).style.height = mHeight - 4 + "px"
            document.getElementById('tableMCSS1_'+(k+1)).style.width = mWidth - 4 + "px"
            document.getElementById('tableMCSS2_'+(k+1)).style.width = mWidth - 4 + "px"
        }
    }
    //console.log(mWidth,mHeight)
    if(tableType=="table")
    {
        headDiv1.style.width = mWidth + "px";
        headDiv2.style.width = mWidth + "px";
        pHeadDiv.style.width = mWidth + mWidth + 3 + "px";
        pHeadDiv.style.left = document.getElementById('tableMCSS1_1').offsetLeft + 90 + "px";
    }
    $('input').iCheck({
        radioClass: 'iradio_flat-blue'
    });
    $('input').on('ifChecked', function(event){
        //console.log(event.type + event.target.id + ' callback');
        selectedId = Number(event.target.id) + 1;
    });

    createSubmitButton(CYUParent);
    aDiv.appendChild(feedS);

    $("#innerCont").customScrollbar();
    update_mathjax();
}

function createPreMCSSAct(QueSet,qDiv)
{
    var pageDesign = document.createElement('div');
    pageDesign.className = "tabRoundRect overview";
    pageDesign.style.backgroundColor = "#cccccc";
    pageDesign.style.position = "absolute";
    pageDesign.style.width = headerInfo[2] + "px";
    pageDesign.style.minHeight = heightDocument - headerInfo[3] - footerInfo[3] + "px";
    var headDivPre = document.createElement('div');

    headDivPre.innerHTML = '<font face="calibriregular" size="6px" color="#006699">Pre Assessment</font>';

    if(gameCurrentState==3)
    {
        headDivPre.innerHTML = '<font face="calibriregular" size="6px" color="#006699">Post Assessment</font>';
    }

    pageDesign.appendChild(headDivPre);
    headDivPre.style.margin = "10px";

    var boxDesign = document.createElement('div');
    boxDesign.className = "tabRoundRectLeft";
    boxDesign.style.position = "relative";
    boxDesign.style.borderRadius = "8px";
    boxDesign.style.backgroundColor = "#ffffff";

    var moreMargin = 200
    var boxHeight = 400;


    if(headerInfo[2]<=768)
    {
        moreMargin = 0;
    }
    if(headerInfo[3]>768)
    {
        //boxDesign.style.height= boxHeight + 'px';
    }
    var bWidth = headerInfo[2] - 40 - moreMargin;
    boxDesign.style.width =  bWidth + 'px';
    boxDesign.style.left = headerInfo[2]/2 - 10  - (headerInfo[2] - 40 - moreMargin)/2 + 'px';
    pageDesign.appendChild(boxDesign);

    var op = QueSet.getElementsByTagName('options')[0];
    ansXML = $(op).attr('answer').split(',');
    var stem = op.getElementsByTagName('option');

    var len = stem.length;
    var optionDiv = document.createElement('div');
    var headDiv = document.createElement('div');
    var mWidth = bWidth - 24 - 30;
    headDiv.innerHTML = '<div class="relativeInline" style="margin-right: 10px;">'+ (_currentQueId + 1) + ". </div>" + '<div class="relativeInline" style="max-width: '+mWidth+'px;">' + QueSet.getElementsByTagName('stem')[0].textContent + '</div>';
    headDiv.style.fontFamily = "calibriregular";
    boxDesign.appendChild(headDiv);
    boxDesign.appendChild(optionDiv);
    headDiv.style.margin = "10px";
    boxDesign.style.padding = "10px";
    qDiv.appendChild(pageDesign);
    optionDiv.textAlign = "center";
    optionDiv.id = "optionDiv";
    optionDiv.maxWidth = 400 + "px";
    optionDiv.fontFamily = "calibriregular"
    optionDiv.style.position = "relative";
    var omWidth = mWidth - 50;
    var denoHead = "", arrDeno = ["(A)","(B)","(C)","(D)","(E)","(F)"];
    for(var i=0;i<len;i++)
    {
        var textOp = stem[i].textContent;
        denoHead = '<div class="relativeInline" style="width: 20px;">' + arrDeno[i] + '</div>';
        $("#optionDiv").append('<div style="position: relative;  margin: 20px; top: 5px;  z-index:16"><input tabindex="3" type="radio" id="'+ i +'" name="radioButtons"><label for="input-'+ i +'" style="position: relative; margin-right: 10px; top:0px; left:20px;">'+ denoHead +'<div class="relativeInline" style="margin-left: 10px; max-width:'+ omWidth +'px;">'+ textOp +'</div></label></div>');
    }
    $('input').iCheck({
        radioClass: 'iradio_flat-blue'
    });
    $('input').on('ifChecked', function(event){
        //console.log(event.type + event.target.id + ' callback');
        selectedId = Number(event.target.id) + 1;
    });
    createSubmitButton(boxDesign);
    function ScrollBoxDesign(evt) {
        //console.log('increasing')
        $(evt.data.obj).customScrollbar()
    }
    boxDesign.addEventListener('resize',ScrollBoxDesign)
    //$(boxDesign).bind('resize',{obj:qDiv},ScrollBoxDesign)
    $(qDiv).customScrollbar()
    update_mathjax();
}