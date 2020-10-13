var strictWidth = 350;
var strictHeight = 0;
var maxValue;
var tableMargin = 1;
var allObjectDND = [];
function createAnswer(ansCont, find, ver,_color) {
    var allAns = $(find).find('Answers');
    var ansArr = $(allAns).find('ans');
    var len = ansArr.length;

    //ansCont.style.position = "relative";
    //console.log(ver, dropWidth)

    var mHeight = heightDocument-headerInfo[3]-footerInfo[3]-20;
    //console.log(mHeight)
    var ansInnerCont = document.createElement('div');
    ansInnerCont.id = "ansInnerDND"
    ansInnerCont.className = "tabRoundRectLeftZero default-skin";
    ansInnerCont.style.position = "relative"
    ansInnerCont.style.display = "inline-block";
    ansCont.appendChild(ansInnerCont)
    var ansInnerCont1 = document.createElement('div');
    ansInnerCont1.className = "tabRoundRectLeftZero";
    ansInnerCont1.style.position = "relative"
    ansInnerCont1.style.display = "inline-block";
    ansInnerCont.appendChild(ansInnerCont1)
    var verSpace = 5
    if(mHeight>450)
    {
        mHeight = mHeight *.6;
    }

    if(ver)
    {
        //ansCont.style.width = dropWidth + 20 + "px"
        ansCont.style.maxHeight = mHeight +"px";
        ansCont.className = "tabRoundRectTransitTwoSidedLeft";
    }
    else
    {
        verSpace = 0;
        //ansInnerCont.style.width = headerInfo[2]-20 + "px";
        ansCont.style.maxWidth = headerInfo[2]-20+"px";

        ansCont.className = "tabRoundRectTransitTwoSidedUp default-skin";
        ansCont.style.top = "10px"
    }


    ansCont.style.backgroundColor = "#cccccc"

    for(var i = 0; i< len; i++)
    {
        var ansDiv = document.createElement('div');
        ansDiv.dragged = 0;
        ansDiv.ansId = i;
        ansInnerCont1.appendChild(ansDiv);
        var aAnsTemp = ansArr[i];
        ansDiv.className = "tabRoundRect options";
        ansDiv.style.backgroundColor = _color;
        ansDiv.style.position = "relative";
        if(!ver)
            ansDiv.style.display = "inline-block";
        ansDiv.style.verticalAlign = "middle"
        var ansID = 'ansDiv' + i;
        ansDiv.id = ansID;
        ansDiv.style.padding = internalPadding + "px";
        ansDiv.style.marginTop = tableMargin + "px";
        ansDiv.style.marginBottom = tableMargin + "px";
        ansDiv.style.width = dropWidth - internalPadding * 2 - verSpace + "px";
        //ansDiv.innerHTML = $(aAnsTemp).text();
        var texAnsDiv = document.createElement('div');
        texAnsDiv.style.verticalAlign = "middle";
        texAnsDiv.id = "textAns" + i;
        texAnsDiv.className = "tabRoundRectZero";
        texAnsDiv.style.width = dropWidth - internalPadding * 2  + "px";
        texAnsDiv.style.position = "relative";
        texAnsDiv.style.verticalAlign = "middle";
        texAnsDiv.style.display = "table-cell";
        texAnsDiv.innerHTML = $(aAnsTemp).text();
        ansDiv.appendChild(texAnsDiv)
        ansDiv.style.zIndex = "16";
        ansDiv.style.cursor = "pointer";
        ansDiv.parentANSID = ansID;

        var allQues = $(find).find('Questions');
        var queArr = $(allQues).find('que');
        var len = queArr.length;
        var multiPle = $(find).attr('multiple');
        maxValue = 1;
        var tempHeight = document.getElementById('ansDiv' + i).offsetHeight;
        if(!ver)
        {
            ansDiv.style.margin = "1px";
        }
        if(tempHeight > dropHeight)
        {
            dropHeight = tempHeight;
        }

        if(multiPle == "true")
        {
            maxValue = len;
        }
        $('#'+ansID).draggable({helper: "clone",appendTo: "body",containment: $('#DNDCont')});
        ansDiv.dropPlace = "invalid"
        $('#'+ansID).bind('dragstart', function(event, ui) {
            draggingOriginal = true;
            //$(this).css("z-index", 10000);
            pAnsId = this.ansId;
            pDragged = this.dragged;
            //$(ui.helper).css("z-index",16)
            parentANSNAME = this.parentANSID;
        });
        $('#'+ansID).bind('dragstop', function(event, ui) {
            var cloneDiv = $(ui.helper).clone();
            var cloneDivId = "cloneDiv" + this.ansId + "_" + this.dragged
            cloneDiv.id = cloneDivId;
            cloneDiv.ansId = this.ansId;
            cloneDiv.parentANS = this;
            cloneDiv.dragged = 0;
        });

    }
    if(!ver)
    {
        ansCont.style.maxHeight = dropHeight + document.getElementById('headDivDND3').offsetHeight + 10 + "px";
        ansInnerCont.style.maxHeight = dropHeight + document.getElementById('headDivDND3').offsetHeight + 10 + "px";
        ansInnerCont.style.width = headerInfo[2]-20 + 'px';
        ansInnerCont1.style.width = (dropWidth + 2)*len + 'px';
    }
    else
    {
        var mHe = heightDocument - headerInfo[3] - footerInfo[3] - 100;//(dropHeight+2)*len//document.getElementById('queMainCont').offsetHeight
        ansCont.style.maxHeight =  heightDocument - headerInfo[3] - footerInfo[3] - 100 + "px";
        //console.log(mHe);
        ansInnerCont.style.maxHeight = heightDocument - headerInfo[3] - footerInfo[3] - 100 - document.getElementById('headDivDND3').offsetHeight+ "px";
        ansInnerCont.style.width = dropWidth + 'px';
        ansInnerCont1.style.width = dropWidth + 'px';
    }

}


var draggingOriginal = true;
var pAnsId;
var pDragged;
var parentANSNAME;
var internalPadding = 10
var borderRadius = 5;
var maxHeightDND = 0;
function createQuestion(DNDCont, find, ver,_color,_color1) {
    var allQues = $(find).find('Questions');
    var queArr = $(allQues).find('que');
    var len = queArr.length;
    var verSpace = 5;
    if(!ver)
    {
        verSpace = 0
    }
    var queContArray = [];
    var contHeight = 0;
    var queInnerCont = document.createElement('div');
    queInnerCont.id = "queInnerDND"
    queInnerCont.className = "tabRoundRectLeftZero default-skin";
    queInnerCont.style.position = "relative"
    queInnerCont.style.display = "inline-block";
    DNDCont.appendChild(queInnerCont)
    var queInnerCont1 = document.createElement('div');
    //queInnerCont1.className = "tabRoundRectLeftZero";
    queInnerCont1.style.textAlign = "left"
    queInnerCont1.style.position = "relative"
    queInnerCont1.style.display = "inline-block";
    queInnerCont.appendChild(queInnerCont1)
    for(var i = 0; i< len; i++)
    {
        var queCont = document.createElement('div');
        queCont.style.position = "relative"
        //queCont.className = "tabRoundRectZeroLeft"
        queCont.style.display = "inline-block";
        queCont.style.marginTop = "1px";
        //queCont.style.marginBottom = "1px";
        queContArray.push(queCont)
        queCont.id = "queCont" + i;

        var quesDiv = document.createElement('div');
        quesDiv.id = "quesDiv" + i;
        queInnerCont1.appendChild(queCont);
        queCont.appendChild(quesDiv);

        var aQueTemp = queArr[i];
        quesDiv.className = "tabRoundRect";
        quesDiv.style.backgroundColor = _color
        quesDiv.style.position = "relative";
        quesDiv.style.display = "inline-block";
        quesDiv.style.padding =  internalPadding + "px";
        allObjectDND.push(quesDiv);

        quesDiv.style.width = questionWidth - internalPadding * 2 - verSpace - 7 + "px";
        // 11 px --- 10 px of left option cont/2 and 3 px padding of each side

        quesDiv.style.verticalAlign = "top"
        var texQuesDiv = document.createElement('div');
        texQuesDiv.style.verticalAlign = "middle";
        texQuesDiv.className = "tabRoundRectLeft";
        texQuesDiv.style.height = dropHeight -  internalPadding * 2 + tableMargin/2 + "px"
        texQuesDiv.style.position = "relative";
        texQuesDiv.style.verticalAlign = "middle";
        texQuesDiv.style.display = "table-cell";
        texQuesDiv.innerHTML = $(aQueTemp).text();
        quesDiv.appendChild(texQuesDiv);
        var tempHeight = document.getElementById("quesDiv"+i).offsetHeight;
        //console.log(tempHeight,dropHeight)
        maxHeightDND = dropHeight;
        if(tempHeight<dropHeight)
            quesDiv.style.height = dropHeight - internalPadding * 2 + tableMargin/2  + "px";
            contHeight = tempHeight;
            maxHeightDND = tempHeight;

        var dropArea = document.createElement('div');
        dropArea.className = "tabRoundRect";
        dropArea.style.backgroundColor = _color1;
        var dropAreaid = "dropArea" + i;
        dropArea.id = dropAreaid;
        dropArea.style.position = "relative"
        dropArea.style.display = "inline-block";
        dropArea.style.verticalAlign = "middle"
        dropArea.style.width = dropWidth - verSpace  + "px";
        dropArea.style.height = dropHeight + tableMargin/2  + "px";
        allObjectDND.push(dropArea);
        dropArea.droppedObjet = 0;
        dropArea.droppeObjectId = "";
        dropArea.droppeObjectParentId = "";
        dropArea.style.marginLeft = tableMargin + "px";

        queCont.style.height = dropHeight + tableMargin  + "px";
        queCont.appendChild(dropArea);

        $( "#"+ dropAreaid ).droppable({
            accept: ".options",
            drop: function(ev, ui) {
                if(this.droppedObjet>=1)
                {
                    var childObject = document.getElementById(this.droppeObjectId);
                    this.removeChild(childObject);
                    var parentObject = document.getElementById(this.droppeObjectParentId);
                    parentObject.dragged--;
                    this.droppedObjet--;
                    $(parentObject).draggable( "enable" )
                }
                var cloneDiv = $(ui.draggable).clone();
                var cloneDivId = "cloneDiv" + pAnsId + "_" + pDragged;
                $(cloneDiv).attr('id',cloneDivId);
                $(cloneDiv).attr('ansId',pAnsId);
                $(cloneDiv).attr('parentANSID',parentANSNAME);
                $(cloneDiv).css('margin', "0px");
                $(cloneDiv).attr("dropPlace", $(this).attr('id'));

                if(draggingOriginal)
                {
                    var parentDiv = document.getElementById(parentANSNAME);

                    parentDiv.dragged++;
                    if(parentDiv.dragged>=maxValue)
                    {
                        $(parentDiv).draggable( "disable" )
                    }
                }



                this.droppeObjectId = cloneDivId;
                cloneDiv.parentANS = document.getElementById(cloneDiv.attr('id'));
                //condition has
                //console.log(this.droppeObjectParentId,parentANSNAME)
                $(this).append(cloneDiv);
                this.droppedObjet++;

                this.droppeObjectId = cloneDivId;
                this.droppeObjectParentId = parentANSNAME;
                $(cloneDiv).bind('dragstart', function(event, ui) {
                    //console.log(this.attr('dropplace'))
                    draggingOriginal = false;
                    var dPlaceId = $(this).attr('dropplace');
                    var dPlace = document.getElementById(dPlaceId);
                    var childObject = document.getElementById(dPlace.droppeObjectId);
                    pAnsId = this.ansId;
                    pDragged = this.dragged;
                    parentANSNAME = this.parentANSID;
                    dPlace.removeChild(childObject);
                    dPlace.droppedObjet--
                    dPlace.droppeObjectId="";
                });
                cloneDiv.draggable({helper: "clone",containment: $('#DNDCont'),revertDuration: 0,
                    revert: function(valid) {
                        if(valid) {
                        }
                        else {
                            var parentEle = document.getElementById($(this).attr("parentANSID"))
                            parentEle.dragged--;
                            $(parentEle).draggable( "enable" )
                            $(cloneDiv).remove();
                        }
                        return !valid;
                    }});
            }
        });
    }
    if(ver && headerInfo[2]>768)
    {
        queInnerCont.style.maxHeight = heightDocument - headerInfo[3] - footerInfo[3] - document.getElementById('headDivDND3').offsetHeight - 100 - 7 + "px";
        queInnerCont.style.width = '100%';
    }
    else
    {
        queInnerCont.style.maxHeight = heightDocument - headerInfo[3] - footerInfo[3] - document.getElementById('headDivDND3').offsetHeight -document.getElementById('ansContainerDND').offsetHeight - 100 - 7 + "px";
        queInnerCont.style.width = '100%';
    }

    for(var k=0;k<queContArray.length;k++)
    {
        //queContArray[k].style.height = maxHeightDND + 1 + "px"
    }
    for(var j=0;j<len;j++)
    {
        var ansID = 'ansDiv' + j;
        var texansID = 'textAns' + j;
        var ansDivDummy = document.getElementById(ansID);
        var texansDivDummy = document.getElementById(texansID);
        ansDivDummy.style.height = dropHeight - internalPadding * 2  + 1 + "px";
        texansDivDummy.style.height = dropHeight - internalPadding * 2 + "px";
    }
    var id = setInterval(createChildScroll,100)
    function createChildScroll()
    {
        update_mathjax();
        clearInterval(id);
        $("#ansInnerDND").customScrollbar();
        $("#queInnerDND").customScrollbar();
        //$(".scrollablePage").customScrollbar();

    }
    //$("#ansContainerDND").customScrollbar()
}
/**
 * Created by admin on 30/6/14.
 */

var mainMargin = 10, boxWidth = 0, columnNo = 0, queDragRatio = 0, interMargin = 10,questionWidth = 0, dropWidth = 0, dragWidth = 0, dropAreaAllign = "Hor", dropAreaContAllign = "Hor",dropHeight=0;
var feedbackCorrect
var feedbackInCorrect


function createDNDAct(infoXML,pDiv)
{
    var DNDCont = document.createElement('div');
    DNDCont.id = "DNDCont"
    DNDCont.style.position = "relative";
    DNDCont.className = "tabRoundRect";
    allObjectDND = [];

    pDiv.appendChild(DNDCont);
    //DNDCont.style.margin = 20 + "px";s
    //DNDCont.style.maxHeight = heigh + "px"
    var DND = $(infoXML).find( "DND" )[0];
    feedbackCorrect = $(DND).find( "feedBackCorrect" )[0];
    feedbackInCorrect = $(DND).find( "feedBackInCorrect" )[0];

    columnNo = $(DND).attr('columnNo');
    queDragRatio = $(DND).attr('queAnsRatio');
    dropAreaAllign = $(DND).attr('queAreaAllign');
    dropAreaContAllign = $(DND).attr('dropAreaAllign');

    var dragAreaColor = $(DND).attr('dragColor');
    var dropAreaColor = $(DND).attr('dropColor');
    var dragQuesAreaColor = $(DND).attr('dragQuesColor');
    boxWidth = (headerInfo[2] - 36)*$(DND).attr('totalRatio');

    if(headerInfo[2]<768)
    {
        boxWidth = headerInfo[2] - 20; //+ 36;
    }

    questionWidth = (boxWidth-(columnNo*2+1)*interMargin)*queDragRatio/columnNo ;
    dropWidth =  (boxWidth - questionWidth)/2 //((boxWidth-(columnNo*2+1)*interMargin)*(1-queDragRatio)/columnNo) - borderRadius * 2;
    if(dropWidth < 150)
    {
        questionWidth = questionWidth + dropWidth * 2 - 150;
        dropWidth = 150;
    }
    DNDCont.style.width = boxWidth + "px";
    if(dropAreaContAllign=="Ver" && headerInfo[2]>768)
    {
        DNDCont.style.width = boxWidth + "px";
    }
    else
    {
        DNDCont.style.width = headerInfo[2] - 20 + "px"
    }




    var queMainCont = document.createElement('div');
    queMainCont.id = "queMainCont"
    var ansCont = document.createElement('div');
    DNDCont.appendChild(queMainCont);
    DNDCont.appendChild(ansCont);


    queMainCont.style.backgroundColor = $(DND).attr('dndBackColor');
    queMainCont.style.position = "relative";

    ansCont.style.position = "relative";
    ansCont.style.verticalAlign = "top";
    ansCont.id = "ansContainerDND";

    var headDiv1= document.createElement('div');
    var headDiv2= document.createElement('div');
    var headDiv3= document.createElement('div');
    headDiv1.style.backgroundColor = headDiv2.style.backgroundColor = headDiv3.style.backgroundColor =  $(DND).attr('headcolumncolor');
    headDiv1.style.color = headDiv2.style.color = headDiv3.style.color =  $(DND).attr('headcolumnTextcolor');
    headDiv1.className = headDiv2.className = headDiv3.className =  "tabRoundRect";
    //headDiv1.style.marginLeft = "-3px"
    headDiv2.style.marginLeft = "1px"
    headDiv1.style.position = headDiv2.style.position = headDiv3.style.position =  "relative";
    headDiv1.style.paddingTop = headDiv2.style.paddingTop = headDiv3.style.paddingTop =  "10px";
    headDiv1.style.paddingBottom = headDiv2.style.paddingBottom = headDiv3.style.paddingBottom =  "10px";
    headDiv1.style.paddingLeft = headDiv2.style.paddingLeft = headDiv3.style.paddingLeft =  "3px";
    headDiv1.style.paddingRight = headDiv2.style.paddingRight = headDiv3.style.paddingRight =  "3px";
    headDiv1.style.fontFamily = headDiv2.style.fontFamily = headDiv3.style.fontFamily =  "calibriregular";
    headDiv1.style.marginBottom = headDiv2.style.marginBottom = headDiv3.style.marginBottom =  "1px";
    headDiv1.style.display = headDiv2.style.display = headDiv3.style.display =  "inline-block";
    queMainCont.appendChild(headDiv1);
    queMainCont.appendChild(headDiv2);
    ansCont.appendChild(headDiv3);
    headDiv1.innerHTML = $(DND).attr('headcolumn1');
    headDiv2.innerHTML = $(DND).attr('headcolumn2');
    headDiv3.innerHTML = $(DND).attr('headcolumn3');
    headDiv3.id = "headDivDND3"
    //headDiv3.style.position = "fixed";


    if(dropAreaContAllign =="Ver" && headerInfo[2]>768)
    {
        ansCont.style.display = "inline-block";
        ansCont.style.width = dropWidth - 6 + "px";
        ansCont.style.display = "inline-block";
        queMainCont.style.display = "inline-block";
        queMainCont.className = "tabRoundRectTransitTwoSidedRight";
        createAnswer(ansCont,DND,true,dragAreaColor);
        createQuestion(queMainCont,DND,true,dropAreaColor,dragQuesAreaColor);
        queMainCont.style.width = questionWidth + dropWidth + 1 - 10 + "px";

        headDiv3.style.width =  dropWidth - 11 + "px";
        headDiv1.style.width = questionWidth -7- 11 + "px";
        headDiv2.style.width = dropWidth - 11 + "px";
        // 11 px --- 10 px of left option cont/2 and 3 px padding of each side
        ansCont.style.left = "10px"
    }
    else
    {
        queMainCont.className = "tabRoundRectTransitTwoSidedDown";
        createAnswer(ansCont,DND,false,dragAreaColor);
        headDiv1.style.width = questionWidth - 6 -7 + "px";
        headDiv2.style.width = dropWidth - 6 + "px";
        queMainCont.style.width = boxWidth + 3 + "px";
        //console.log(boxWidth)
        ansCont.style.width = boxWidth + "px";
        headDiv3.style.width =  boxWidth - 6 + "px";
        createQuestion(queMainCont,DND,false,dropAreaColor,dragQuesAreaColor);
    }

    ansArray = $(DND).attr('answer').split(',');
    var btnSubmit = document.createElement('div');
    btnSubmit.style.position = "relative";
    btnSubmit.style.display = "inline-block";
    btnSubmit.style.backgroundColor = "#009900"
    btnSubmit.style.color = "#ffffff"
    btnSubmit.innerHTML = '<font face="calibriregular">Submit</font>';
    btnSubmit.className = "tabRoundRect"
    btnSubmit.style.padding = "10px";
    btnSubmit.style.width = "100px"
    btnSubmit.style.marginTop = "30px";
    btnSubmit.style.zIndex = 16;
    $(btnSubmit).bind('click',{},onSubmitClickDND);
    pDiv.appendChild(btnSubmit);

}

var ansArray;
function showPopfeedBack(resultBoolean) {
    var data;
    if(resultBoolean)
    {
        data = $(feedbackCorrect).text();
    }
    else
    {
        data = $(feedbackInCorrect).text()
    }
    //console.log(data);

    var contentData = '<div class="tabRoundRectZeroLeft" style="width:100%; position:relative; background-color:#009900; color: #FFFFFF; font-family: calibriregular; padding-left:10px; ">FEEDBACK<div align="right" class="close-reveal-modal" id="xBox" style=" z-index:16; width:75%; vertical-align: middle ; font-family: calibriregular; color:#ffffff; text-align: end;  position: relative; display:inline-block; cursor: pointer;">'+"  &#215;" + '</div></div>'+'<div class="tabRoundRect" style="padding: 10px; font-family: calibriregular; text-align:justify; position: relative; ">' + data + "</div>";
    createPopup('','','','',contentData,data,'#000000','',headerInfo[2] *.5,'');
    var xbox = document.getElementById('xBox')
    var pops = document.getElementById('popCont')
    var widthPop ;
    if(headerInfo[2]>400)
    {
        widthPop = 350;
    }
    else
    {
        widthPop = headerInfo[2];
    }
    popupCont.style.width = widthPop + "px";
    console.log(headerInfo[2] * .35 )
    popupCont.style.left = widthDocument/2-widthPop/2 + "px";

    xbox.style.selectable = "none";
    $(xbox).bind('click',{},closePopSort)
}
function showCorrecrAnsDND(arr)
{
    var dropId = "dropArea" + i;
    var droppedObject = document.getElementById(dropId);

}
function onSubmitClickDND(event)
{
    var resultBoolean = true;
    for(var i=0;i<ansArray.length;i++)
    {
        var dropId = "dropArea" + i;
        var droppedObject = document.getElementById(dropId).droppeObjectId;
        var ansId = -1;
        ansId = $("#"+droppedObject).attr('ansId')//document.getElementById(droppedObject).ansId;
        if(Number(ansArray[i])!=ansId)
        {
            resultBoolean = false;
        }
    }
    showPopfeedBack(resultBoolean);
}