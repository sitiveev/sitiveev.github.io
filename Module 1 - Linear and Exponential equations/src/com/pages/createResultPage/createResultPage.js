function removeFeedPop(event) {
    var cont = document.getElementById('innerCont');
    cont.removeChild(event.data.obj);
}
function showFeedQuestionPopup(event) {
    //console.log(event.data.dataXML);
    innerContHeight = heightDocument - headerInfo[3] - footerInfo[3];
    var popUp = document.createElement('div');
    popUp.id = "feedbackPopup";
    popUp.className = "tabRoundRectZero";
    popUp.style.position = "absolute"
    popUp.style.top = "0px";
    popUp.style.backgroundColor = "rgba(0,0,0,0.5)";
    popUp.style.width = headerInfo[2] + 'px';
    popUp.style.height =  innerContHeight + "px";

    $("#innerCont").append(popUp);

    var closeButton = document.createElement('div');
    closeButton.className = "closeButton";
    closeButton.innerHTML = "&#215;";


    closeButton.style.right = "10px"
    closeButton.style.top = "10px";

    $(closeButton).bind('click',{obj:popUp},removeFeedPop);

    var boxDesign = document.createElement('div');
    boxDesign.className = "tabRoundRectZero default-skin";
    boxDesign.id = "innerPopup";
    boxDesign.style.position = "relative"
    boxDesign.style.width = headerInfo[2] * 0.75 + "px";
    boxDesign.style.backgroundColor = "#ffffff";
    boxDesign.style.left = headerInfo[2]/2 - (headerInfo[2] * 0.75/2) + "px";
    boxDesign.style.maxHeight = (innerContHeight)*.75 + "px";


    popUp.appendChild(boxDesign);

    var questionDiv = document.createElement('div');
    questionDiv.style.margin = "10px";
    questionDiv.style.width = (headerInfo[2] * 0.75) - 20 + "px";

    var xmlDATA = event.data.dataXML;

    var op = xmlDATA.getElementsByTagName('options')[0];
    var correctansXML = $(op).attr('answer').split(',');
    var stem = op.getElementsByTagName('option');

    var len = stem.length;

    var headDiv = document.createElement('div');
    headDiv.style.maxWidth = headerInfo[2] * 0.75 - 35 + "px"
    var optionDiv = document.createElement('div');
    headDiv.innerHTML = (event.data.queNo + 1) + ". " + xmlDATA.getElementsByTagName('stem')[0].textContent;
    headDiv.style.fontFamily = "calibribold";

    //headDiv.style.margin = "10px";
    //boxDesign.style.padding = "10px";
    questionDiv.appendChild(headDiv);

    optionDiv.textAlign = "center";
    optionDiv.id = "optionDivFeed";
    optionDiv.style.fontSize = "18px";
    headDiv.style.fontSize = "18px";
    optionDiv.maxWidth = 400 + "px";
    optionDiv.style.position = "relative";
    questionDiv.appendChild(optionDiv);
    var type = $(xmlDATA).attr('type');
    var imageType;
    var wrongImage = "<img align='middle' hspace='10.5' width='20px' height='22px' src='src/assets/preassesment/images/worng.png'>";
    var rightImage = "<img align='middle' hspace='10.5' width='20px' height='22px' src='src/assets/preassesment/images/right.png'>";
    if(type == "MCSS")
    {
        for(var i=0;i<len;i++)
        {
            var textOp = stem[i].textContent;
            if(correctansXML[i]==0)
            {
                imageType = wrongImage;
            }
            else
            {
                imageType = rightImage;
            }
            $(optionDiv).append('<div style="position: relative; font-family: calibriregular; margin: 20px;  left: 10px; z-index:16">'+ imageType +'<input tabindex="3" type="radio" id="input_'+ i +'" name="radioButtons"><label for="input-'+ i +'" style="position: relative; margin-bottom: 10px; margin-right: 10px; top:2px; left:20px;">'+ textOp +'</label></div>');
        }
    }
    else
    {
        for(var j=0;j<len;j++)
        {
            if(correctansXML[j]==0)
            {
                imageType = wrongImage;
            }
            else
            {
                imageType = rightImage;
            }
            var textOp = stem[j].textContent;
            $(optionDiv).append('<div style="position: relative; font-family: calibriregular; margin: 10px; left: 10px;">'+imageType+'<input tabindex="3" type="checkbox" id="input_'+ j +'" name="radioButtons"><label for="input-'+ j +'" style="position: relative; margin-right: 10px; top:2px; left:20px;">'+ textOp +'</label></div>');
        }

    }
    questionDiv.className = "tabRoundRectZeroLeft overview";
    boxDesign.appendChild(questionDiv)
    boxDesign.appendChild(closeButton);

    $('input').iCheck({
        checkboxClass: 'icheckbox_flat-blue',
        radioClass: 'iradio_flat-blue'
    });
    $('input').iCheck('disable');
    var selectedIndex = event.data.selectedAns;

    for(var k=0;k<selectedIndex.length;k++)
    {
        if(selectedIndex[k]!= -1)
        {
            $("#input_"+selectedIndex[k]).iCheck('check');
        }
    }
    $("#innerPopup").customScrollbar();
    boxDesign.style.top = (innerContHeight)/2 -  (document.getElementById('innerPopup').offsetHeight)/2 + "px";
}






function showQuestionMarking(resultBox, allQue) {
    //background-image: url("../../src/assets/preassesment/images/worng.png");
    var wrongImage = "<img align='middle' width='20px' height='22px' hspace='10.5' src='src/assets/preassesment/images/worng.png'>";
    var rightImage = "<img align='middle' width='20px' height='22px' hspace='10.5' src='src/assets/preassesment/images/right.png'>";

    //console.log(allQue)
    //QuesDiv.style.width
    var contDiv = document.createElement('div');
    contDiv.id = "quesContFeed"
    //contDiv.id = "overview"
    resultBox.appendChild(contDiv);
    for(var i=0;i<preAssesmentAnswerGivenIndex.length;i++)
    {
        var QuesDiv = document.createElement('div');
        QuesDiv.style.margin = "10px";

        QuesDiv.style.position = "relative";
        QuesDiv.style.display = "inline-block";
        var str = i+1
        if(i+1<10)
        {
            str = "0" + str;
        }
        if(preAssesmentAnswerGiven[i])
        {
            QuesDiv.innerHTML = '<font face="calibriregular"  color="#006699">'+'<b>Assessment Question: </b> '+ str  + rightImage +'</font>';
        }
        else
        {
            QuesDiv.innerHTML = '<font face="calibriregular" color="#006699">'+'<b>Assessment Question: </b> '+ str  + wrongImage +'</font>';
        }
        contDiv.appendChild(QuesDiv);
        QuesDiv.style.cursor = "pointer";
        var question = $(allQue).find( "question" )[i];
        //console.log(question,i,preAssesmentAnswerGivenIndex[i])
        $(QuesDiv).bind('click',{dataXML:question,queNo:i,selectedAns:preAssesmentAnswerGivenIndex[i]},showFeedQuestionPopup)
        $("#resultBox").customScrollbar();
    }


}
function showQuestionResult(boxDesign, allQue,width) {
    var correctAns = 0;
    for(var i=0;i<preAssesmentAnswerGiven.length;i++)
    {
        if(preAssesmentAnswerGiven[i])
        {
            correctAns++;
        }
    }
    var scoreDiv = document.createElement('div');
    scoreDiv.style.paddingLeft = "47px";
    scoreDiv.style.paddingTop = "10px";
    scoreDiv.style.paddingBottom = "10px";
    scoreDiv.innerHTML = '<font face="calibriregular" size="4px" color="#444444">'+'<b>Score:</b> '+ correctAns +'</font>';
    boxDesign.appendChild(scoreDiv);

    var resultBox = document.createElement('div');
    resultBox.className = "tabRoundRectLeft default-skin scrollablePage";
    resultBox.id = 'resultBox';
    resultBox.style.minHeight = ((heightDocument - headerInfo[3] - footerInfo[3])) * .38 + "px";
    resultBox.style.maxHeight = ((heightDocument - headerInfo[3] - footerInfo[3])) * .52 + "px";
    //resultBox.innerHTML = '<font face="calibriregular" size="4px" color="#444444">'+'<b>Score:</b> '+ correctAns +'</font>';
    resultBox.style.marginLeft = "47px";
    resultBox.style.marginTop = "10px";
    resultBox.style.marginBottom = "10px";
    resultBox.style.position = "relative"
    resultBox.style.backgroundColor = "#e6e6e6";

    resultBox.style.maxWidth = width - 94 + "px";
    boxDesign.appendChild(resultBox);
    //resultBox.style.height = 1000 + "px";
    showQuestionMarking(resultBox,allQue);


    var nextButton = document.createElement('div');

    nextButton.style.padding = "11px";
    nextButton.style.marginLeft = "47px";
    nextButton.style.marginTop = "10px";
    nextButton.style.marginBottom = "10px";
    //nextButton.style.marginBottom = "38px";
    nextButton.className = "tabRoundRect";
    nextButton.style.maxWidth = "78px";
    nextButton.style.position = "relative"
    nextButton.style.backgroundColor = "#444444";
    nextButton.innerHTML = '<font face="calibriregular" size="4px" color="#ffffff">Next</font>';
    if(gameCurrentState==3)
    {
        nextButton.style.visibility = "hidden"
    }
    boxDesign.appendChild(nextButton);
    nextButton.style.cursor = "pointer";
    $(nextButton).bind('click',{},clickedLoadPages)

    var dummyC = document.createElement('div');
    dummyC.style.margin = "19px";
    dummyC.style.position = "relative";
    dummyC.style.height = "1px"
    boxDesign.appendChild(dummyC);


}

function clickedLoadPages(e)
{
    //console.log('clicked')
    _currentQueId++;
    loadNextQuestion();
}

/**
 * Created by admin on 8/7/14.
 */
function createResultPage(qDiv,allQue) {
    var pageDesign = document.createElement('div');
    pageDesign.className = "tabRoundRectZero overview";
    pageDesign.style.backgroundColor = "#cccccc";
    pageDesign.style.width = headerInfo[2] + "px";
    pageDesign.style.height = heightDocument + "px";
    var headDivPre = document.createElement('div');
    headDivPre.innerHTML = '<font face="calibriregular" size="6px" color="#006699">Pre Assessment</font>';
    if(gameCurrentState==3)
    {
        headDivPre.innerHTML = '<font face="calibriregular" size="6px" color="#006699">Post Assessment</font>';
    }
    pageDesign.appendChild(headDivPre);
    headDivPre.style.margin = "10px";
    var upperBoxDesign = document.createElement('div');
    upperBoxDesign.className = "tabRoundRectZeroLeft";
    upperBoxDesign.style.backgroundColor = "#006699";
    upperBoxDesign.style.height = "40px"
    upperBoxDesign.style.position = "relative"

    var boxDesign = document.createElement('div');
    boxDesign.className = "tabRoundRectZeroLeft";
    boxDesign.style.backgroundColor = "#ffffff";
    boxDesign.style.position = "relative"
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
    upperBoxDesign.style.width = headerInfo[2] - 40 - moreMargin + "px"
    boxDesign.style.width = headerInfo[2] - 40 - moreMargin + 'px';
    boxDesign.style.left = headerInfo[2]/2   - (headerInfo[2] - 40 - moreMargin)/2 + 'px';
    upperBoxDesign.style.left = headerInfo[2]/2  - (headerInfo[2] - 40 - moreMargin)/2 + 'px';

    var aName = document.createElement('div');
    aName.innerHTML = '<font face="calibribold" size="4px" color="#e6e6e6">Result</font>';
    aName.style.padding = "7px";
    aName.style.marginLeft = "40px";
    upperBoxDesign.appendChild(aName)
    pageDesign.appendChild(upperBoxDesign);
    pageDesign.appendChild(boxDesign);
    qDiv.appendChild(pageDesign);



    showQuestionResult(boxDesign,allQue,headerInfo[2] - 40 - moreMargin);

    //$(qDiv).customScrollbar()
}