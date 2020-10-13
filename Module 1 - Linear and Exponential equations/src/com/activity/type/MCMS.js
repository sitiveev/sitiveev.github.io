// JavaScript Document
function addQuestionHeaderMCMS(stem,qdiv) {
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

var wrongFeedBackMCMS;
var rightFeedBackMCMS;
var feedSMCMS;
var ansArray = [1,2];
var selectedIdMCMS = [];

function array_compare(a, b)
{
    // if lengths are different, arrays aren't equal
    //console.log(a,b);
    if(a.length != b.length)
        return false;

    for(i = 0; i < a.length; i++)
        if(a[i] != b[i])
            return false;

    return true;
}

function showfeedBackMCMS()
{
    //console.log(selectedIdMCMS);
    ansArray = [];
    for(var i=0;i<ansXML.length;i++)
    {
        if(Number(ansXML[i])==1)
        {
            ansArray.push(i);
        }
    }

    ansArray.sort();
    selectedIdMCMS = unique(selectedIdMCMS);
    var bool = array_compare(ansArray,selectedIdMCMS);
    preAssesmentAnswerExpected.push(ansArray);
    preAssesmentAnswerGiven.push(bool);
    preAssesmentAnswerGivenIndex.push(selectedIdMCMS);
    console.log(ansArray,ansXML,selectedIdMCMS)
    if(gameCurrentState==2)
    {
        feedSMCMS.style.visibility = "visible"
        if(bool==true)
        {
            feedSMCMS.innerHTML= rightFeedBackMCMS;
        }
        else
        {
            feedSMCMS.innerHTML= wrongFeedBackMCMS;
        }
    }
    else
    {
        callNextPre(bool);
    }

}

function callNextPre(bool)
{
    _currentQueId++;
    loadNextQuestion();
}


function clickedLocalMCMS(event)
{
    switch(event.currentTarget.id)
    {
        case "SubmitMCMS":
            showfeedBackMCMS();
            break;
    }
}

var ansXML;

function createSubmitButtonMCMS(aDiv) {
    var boxH = document.createElement('div');
    //boxH.style.maxHeight = "50px";
    boxH.id = "SubmitMCMS"
    boxH.style.width = "100px";
    //boxH.style.minWidth = "75px";
    boxH.style.cursor = 'pointer';
    boxH.className = "tabRoundRect";
    boxH.style.position = "relative";
    boxH.style.height = "30px";
    boxH.style.paddingTop = "10px";
    //boxH.style.marginTop = "50px";
    //boxH.style.marginLeft = "10px";
    //boxH.style.top = "20px";
    boxH.style.backgroundColor = "#006699";
    boxH.style.color = "#ffffff";
    boxH.style.fontFamily = "calibribold"
    boxH.style.fontSize = "12px";
    boxH.innerHTML = "SUBMIT";
    boxH.style.zIndex = 16;
    aDiv.appendChild(boxH);
    $("#SubmitMCMS").bind('click',{},clickedLocalMCMS)
}
createMCMSActivity = function(aDiv,currentHeight,aX,cwidth,options,CYUParent,arrDis)
{
    var op = options.getElementsByTagName('options')[0];
    var stem = op.getElementsByTagName('option');
    wrongFeedBackMCMS = options.getElementsByTagName('FeedbackIncorrect')[0].textContent
    rightFeedBackMCMS = options.getElementsByTagName('FeedbackCorrect')[0].textContent
    var len = stem.length;
    //console.log(stem.length,stem)
    var optionDiv = document.createElement('div');
    CYUParent.appendChild(optionDiv);
    optionDiv.textAlign = "center";
    optionDiv.id = "optionDiv";
    optionDiv.maxWidth = 400+"px";
    optionDiv.style.position = "relative";
    optionDiv.style.left = aX + "px";
    optionDiv.style.top = currentHeight - 15 + "px";
    feedSMCMS = document.createElement('div');
    feedSMCMS.style.position = "relative";

    feedSMCMS.className = "tabRoundRect";
    feedSMCMS.style.backgroundColor = "#cccccc";;
    feedSMCMS.style.textAlign = "left"
    feedSMCMS.style.padding = "20px";
    feedSMCMS.style.display = "inline-block";
    feedSMCMS.style.visibility = "hidden"
    ansXML = $(op).attr('answer').split(',');
    aDiv.appendChild(feedSMCMS);
    var omWidth;
    if(headerInfo[2]>768)
    {
        feedSMCMS.style.left = 10 + "px";
        feedSMCMS.style.width = headerInfo[2]*arrDis[1] - 60 +"px";
        CYUParent.style.width = headerInfo[2]*arrDis[0] - 40 +"px";
        omWidth = headerInfo[2]*arrDis[0] - 130;
    }
    else
    {
        feedSMCMS.style.width = headerInfo[2] - 60 +"px";
        CYUParent.style.width = headerInfo[2] - 20 +"px";
    }
    var denoHead = "", arrDeno = ["(A)","(B)","(C)","(D)","(E)","(F)"];
    for(var i=0;i<len;i++)
    {
        var textOp = stem[i].textContent;
        denoHead = '<div class="relativeInline" style="width: 20px; font-family: calibribold">' + arrDeno[i] + '</div>';
        $("#optionDiv").append('<div style="z-index:16;position: relative; margin: 10px; top: 5px; left: 10px;"><input tabindex="3" type="checkbox" id="'+ i +'" name="radioButtons"><label for="input-'+ i +'" style="position: relative; margin-right: 10px; top:2px; left:20px;">'+ denoHead +'<div class="relativeInline" style="margin-left: 10px; text-align:justify; width:75%">'+ textOp +'</div></label></div>');
    }
    $('input').iCheck({
        checkboxClass: 'icheckbox_flat-blue'

    });
    $('input').on('ifChecked', function(event){
        //console.log(event.type + event.target.id + ' callback');
        selectedIdMCMS.push(Number(event.target.id)) ;
    });
    $('input').on('ifUnchecked', function(event){
        //console.log(event.type + event.target.id + ' callback');
        var index = selectedIdMCMS.indexOf(Number(event.target.id));
        if(index>-1)
        {
            selectedIdMCMS.splice(index, 1);
        }
    });


    createSubmitButtonMCMS(CYUParent);
    $(".scrollablePage").customScrollbar()
}

function unique(array) {
    var unique = [];

    array.forEach(function (value) {
        if (unique.indexOf(value) === -1) {
            unique.push(value);
        }
    });

    return unique;
}

createPreMCMSActivity = function(qSet,qDiv)
{

    var pageDesign = document.createElement('div');
    pageDesign.className = "tabRoundRectZero overview";
    pageDesign.style.minHeight = heightDocument - headerInfo[3] - footerInfo[3] + "px";
    pageDesign.style.backgroundColor = "#cccccc";

    pageDesign.style.width = headerInfo[2] + "px";

    var headDivPre = document.createElement('div');
    headDivPre.innerHTML = '<font face="calibriregular" size="20px" color="#006699">Pre Assessment</font>';
    if(gameCurrentState==3)
    {
        headDivPre.innerHTML = '<font face="calibriregular" size="20px" color="#006699">Post Assessment</font>';
    }

    pageDesign.appendChild(headDivPre);
    headDivPre.style.margin = "10px";
    var boxDesign = document.createElement('div');
    boxDesign.className = "tabRoundRectZeroLeft";
    boxDesign.style.position = "relative";
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
    var bWidth = headerInfo[2] - 40 - moreMargin
    boxDesign.style.width =  bWidth + 'px';
    boxDesign.style.left = headerInfo[2]/2 - 10   - (headerInfo[2] - 40 - moreMargin)/2 + 'px';
    pageDesign.appendChild(boxDesign);


    var op = qSet.getElementsByTagName('options')[0];
    ansXML = $(op).attr('answer').split(',');

    var stem = op.getElementsByTagName('option');
    var len = stem.length;
    qDiv.appendChild(pageDesign);
    var optionDiv = document.createElement('div');

    var mWidth = bWidth - 24 - 30;

    var headDiv = document.createElement('div');
    headDiv.innerHTML = '<div class="relativeInline" style="margin-right: 10px;">'+ (_currentQueId + 1) + ". </div>" + '<div class="relativeInline" style="max-width: '+mWidth+'px;">' +  qSet.getElementsByTagName('stem')[0].textContent; + '</div>';
    headDiv.style.fontFamily = "calibriregular";
    boxDesign.appendChild(headDiv);
    boxDesign.appendChild(optionDiv);
    headDiv.style.margin = "10px";
    boxDesign.style.padding = "10px";
    optionDiv.textAlign = "center";
    optionDiv.id = "optionDiv";
    optionDiv.maxWidth = 400+"px";
    optionDiv.style.position = "relative";

    var omWidth = mWidth - 36;
    var denoHead = "", arrDeno = ["(A)","(B)","(C)","(D)","(E)","(F)"];

    for(var i=0;i<len;i++)
    {
        var textOp = stem[i].textContent;
        denoHead = '<div class="relativeInline">' + arrDeno[i] + '</div>';
        $("#optionDiv").append('<div style="position: relative; margin: 20px; top: 5px; left: 10px;"><input tabindex="3" type="checkbox" id="'+ i +'" name="radioButtons"><label for="input-'+ i +'" style="position: relative; margin-right: 10px; top:2px; left:20px;">'+ denoHead +'<div class="relativeInline" style="margin-left: 10px; max-width:'+ omWidth +'px;">'+ textOp +'</div></label></div>');
    }
    $('input').iCheck({
        checkboxClass: 'icheckbox_flat-blue'

    });
    $('input').on('ifChecked', function(event){
        //console.log(event.type + event.target.id + ' callback');
        selectedIdMCMS.push(Number(event.target.id) + 1) ;
    });
    $('input').on('ifUnchecked', function(event){
        //console.log(event.type + event.target.id + ' callback');
        var index = selectedIdMCMS.indexOf(Number(event.target.id) + 1);
        if(index>-1)
        {
            selectedIdMCMS.splice(index, 1);
        }
    });


    createSubmitButtonMCMS(boxDesign);

    $(qDiv).customScrollbar()

}