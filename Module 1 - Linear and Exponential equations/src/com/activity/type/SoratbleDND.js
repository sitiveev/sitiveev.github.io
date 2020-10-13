
/**
 * Created by admin on 14/7/14.
 */
var correctAnsSort
var ansData
var exampleDataSort;
var sortableDNDBoolen ;
function sortableDND(pageInfo,aDiv)
{
    sortableDNDBoolen = true;
    var sortData = $(pageInfo).find("sortableData")[0];
    var queData = $(sortData).find('Questions');
    ansData = $(sortData).find('Answers');
    exampleDataSort = $(sortData).find('Examples');

    correctAnsSort = $(sortData).attr("correctAns").split(',')


    var sDiv = document.createElement('div');
    aDiv.appendChild(sDiv);
    sDiv.id = "sortableDiv";
    sDiv.className = "tabRoundRectTransitTwoSidedDown";
    sDiv.style.position = "relative"
    sDiv.style.display = "inline-block";

    sDiv.style.backgroundColor = "#e6f0f5";

    sDiv.style.margin = "10px";
    var hDivWidth
    var boxBg = document.createElement('div');
    boxBg.style.position = "absolute";
    boxBg.className = "tabRoundRectZero"



    //boxBg.style.backgroundColor = "#ffffff"
    if(headerInfo[2]<700)
    {
        hDivWidth = headerInfo[2]  - 40
        sDiv.style.width = headerInfo[2] - 40 + "px";
    }
    else
    {
        hDivWidth = (headerInfo[2])*.7 - 40
        sDiv.style.width = (headerInfo[2])*.7 - 40 + "px";
    }
    boxBg.style.width = hDivWidth + "px"
    sDiv.style.fontFamily = "calibriregular";
    sDiv.style.fontsize = "10px";
    sDiv.style.color = "e6e6e6";


    var topDiv = document.createElement('div');
    topDiv.style.position = "relative";
    topDiv.id = "topDivSort"
    topDiv.style.width = hDivWidth + "px";
    topDiv.style.display = "inline-block"
    topDiv.style.margin = marginAll + "px";
    topDiv.className = "tabRoundRectTransitTwoSidedDown"
    topDiv.style.backgroundColor = "#006699"
    topDiv.style.color = "#ffffff";
    sDiv.appendChild(topDiv);

    var frstHead = document.createElement('div');
    var scndHead = document.createElement('div');
    frstHead.style.position = scndHead.style.position = "relative";
    frstHead.style.display = scndHead.style.display ="inline-block"
    frstHead.style.padding = scndHead.style.padding ="10px";
    frstHead.style.borderRight  = "solid #ffffff";
    //frstHead.style.marginRight = marginAll + "px";
    frstHead.style.width = hDivWidth*.7 - 22 + "px";
    scndHead.style.width = hDivWidth*.25 - 20 + "px";
    frstHead.className="tabRoundRectZeroLeft"; scndHead.className ="tabRoundRect";
    topDiv.appendChild(frstHead)
    topDiv.appendChild(scndHead)
    frstHead.innerHTML = "Situation "
    scndHead.innerHTML = "Values "
    sDiv.appendChild(boxBg);
    var questionDiv = document.createElement('div');
    questionDiv.id = "qSort"
    questionDiv.style.position = "relative";
    questionDiv.style.display = "inline-block"
    questionDiv.style.borderRight  = "solid #ffffff";
    questionDiv.className = "tabRoundRectZero"
    questionDiv.style.width = "70%"
    sDiv.appendChild(questionDiv);

    boxBg.style.top = document.getElementById('topDivSort').offsetHeight + "px";
    var answerCont = document.createElement('div');
    //answerCont.style.position = "relative";
    answerCont.className = "connectedSortable"
    answerCont.style.display = "inline-block"
    answerCont.style.verticalAlign = "top"
    answerCont.style.width = "25%";
    sDiv.appendChild(answerCont);
    var arrayAll = [];
    var mHeight = 0;


    for(var i=0;i<$(queData).find('que').length;i++)
    {
        var parentQuestion = document.createElement('div');
        questionDiv.appendChild(parentQuestion);
        parentQuestion.style.position = "relative";
        parentQuestion.className = "tabRoundRectZero"
        //parentQuestion.style.backgroundColor = "#006699"
        //if(i!=0)
        //parentQuestion.style.borderTop  = "solid #ffffff";

        var eDiv = document.createElement('div');
        eDiv.id = "eDiv" + i;
        eDiv.style.verticalAlign = "middle";
        eDiv.style.display = "inline-block";
        eDiv.style.position = "relative";
        eDiv.className = "tabRoundRect";
        eDiv.style.padding = "10px";
        eDiv.style.backgroundColor = "#ff9900";
        eDiv.style.color = "#ffffff";
        eDiv.innerHTML = "EXAMPLE";
        eDiv.style.zIndex = 16;
        eDiv.style.cursor = "pointer";
        eDiv.style.selectable = "none";
        eDiv.style.visibility = "hidden";
        $(eDiv).bind("click",{exampleId:i},onExampleClick)

        var qDiv = document.createElement('div');
        qDiv.style.position = "relative";
        parentQuestion.appendChild(qDiv);
        parentQuestion.appendChild(eDiv);
        var aWide = document.getElementById('eDiv'+i).offsetWidth;
        var tWidth = document.getElementById('qSort').offsetWidth;

        qDiv.id = "qDiv" + i;
        qDiv.style.display = "inline-block"
        qDiv.className = "tabRoundRectZeroLeft";
        //qDiv.style.verticalAlign = "center";
        qDiv.style.padding = "10px";
        qDiv.style.marginBottom = marginAll+ "px";
        qDiv.style.marginLeft = marginAll+ "px";
        qDiv.style.marginRight = marginAll+ "px";
        qDiv.style.width = tWidth - aWide - 40 + "px";
        //console.log(aWide,tWidth);
        //qDiv.style.backgroundColor = "#006699";
        //qDiv.style.color = "#ffffff";
        qDiv.innerHTML = '<div style="vertical-align:middle">'+ $(queData).find('que')[i].textContent + "</div>";
        //qDiv.style.maxWidth = '75%';
        arrayAll.push(qDiv);
        var tempHeight = document.getElementById("qDiv"+i).offsetHeight;
        if(mHeight<tempHeight)
        {
            mHeight = tempHeight;
        }
    }


    for(var j=0;j<$(ansData).find('ans').length;j++)
    {

        var aD = document.createElement('div');
        aD.id = "answerDiv" + j;
        aD.style.position = "relative"
        aD.style.zIndex = 16;
        //aD.style.display = "inline-block"
        //aD.className = "tabRoundRect"
        aD.style.minWidth = "50px";
        aD.style.padding = "10px"
        aD.style.top = "-10px"
        //if(j!=0)
        //aD.style.borderTop  = "solid #ffffff";
        aD.style.marginBottom = marginAll+ "px";
        aD.style.marginLeft = marginAll+ "px";
        aD.style.marginRight = marginAll+ "px";
        aD.style.textAlign = "top"
        //aD.style.backgroundColor = "#ff9900";
        //aD.style.color = "#ffffff";
        //aD.style.verticalAlign = "center";
        aD.innerHTML = '<div style="vertical-align:middle">'+ $(ansData).find('ans')[j].textContent + "</div>"
        aD.style.cursor = "pointer";
        //aD.style.height = mHeight - 20  + "px"
        arrayAll.push(aD);
        answerCont.appendChild(aD);
        var tempHeight = document.getElementById("answerDiv"+j).offsetHeight;
        if(mHeight<tempHeight)
        {
            mHeight = tempHeight;
        }

    }

    for(var k=0;k<arrayAll.length;k++)
    {
        arrayAll[k].style.height = mHeight - 20 - 1   + "px";
    }


    $( ".connectedSortable" ).sortable({
        connectWith: ".connectedSortable"
    }).disableSelection();


    boxBg.style.height = document.getElementById('sortableDiv').offsetHeight - document.getElementById('topDivSort').offsetHeight + "px";

    for(var j=0;j<$(ansData).find('ans').length-1;j++)
    {
        var downS = document.createElement('div');
        downS.style.position = "relative";
        downS.style.height = (document.getElementById('sortableDiv').offsetHeight - document.getElementById('topDivSort').offsetHeight - $(ansData).find('ans').length*1 -20)/ ($(ansData).find('ans').length ) + "px";
        downS.style.borderBottom = "solid #ffffff"
        boxBg.appendChild(downS);
    }
    //console.log(document.getElementById('sortableDiv').offsetHeight - document.getElementById('topDivSort').offsetHeight);
    var submitButton = document.createElement('div');
    submitButton.className = "tabRoundRect"
    submitButton.style.padding = "10px"
    submitButton.style.backgroundColor = "#006699"
    submitButton.style.margin = "10px"
    submitButton.style.color = "#ffffff"
    submitButton.style.zIndex = 16;
    submitButton.style.cursor = "pointer";
    submitButton.style.selectable = "none";
    submitButton.innerHTML = "<font face='calibribold'>SUBMIT</font>";
    aDiv.appendChild(submitButton);
    $(submitButton).bind('click',{name:"null"},rearrngeAndRemove);

    var dummyDiv =  document.createElement('div');
    dummyDiv.style.height = "100px";
    dummyDiv.style.width = "100px";
    aDiv.appendChild(dummyDiv);

    update_mathjax();
}


var marginAll = 1;
var paddingAll = 5;

function createSortPopup(data, audioId) {

    var contentData = '<div class="close-reveal-modal" id="xBox" style="padding: 10px; z-index:16; font-family: calibriregular; color:#000000; text-align: right; right: 25px; width:100%; position: relative; cursor: pointer;">'+"&#215;" + '</div>'+'<div class="tabRoundRect" style="padding: 10px; font-family: calibriregular; text-align:justify; position: relative; ">' + data + "</div>";
    createPopup('','','','',contentData,'','#000000','',headerInfo[2] *.5,'');
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
    var audio = document.getElementById(audioId)
    audio.play();

    xbox.style.selectable = "none";
    $(xbox).bind('click',{},closePopSort)
    update_mathjax();
}

function closePopSort(e)
{
    $('#reveal-modal').trigger('reveal:close');
}

function onExampleClick(e)
{
    var data, audioId;
    var dataEx = $(exampleDataSort).find('ex')[e.data.exampleId]
    data = dataEx.textContent;
    audioId = $(dataEx).attr('audioId');
    createSortPopup(data,audioId)

}


function rearrngeAndRemove(e) {

    $(".connectedSortable").sortable( "destroy" )
    for(var i=0;i<$(ansData).find("ans").length;i++)
    {
        var ansDiv = document.getElementById("answerDiv"+i);
        ansDiv.innerHTML = $(ansData).find("ans")[correctAnsSort[i]].textContent;
        $("#eDiv" + i).css("visibility","visible")
    }
    update_mathjax();

}