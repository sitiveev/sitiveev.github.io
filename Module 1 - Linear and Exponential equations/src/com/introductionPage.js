/**
 * Created by admin on 13/7/14.
 */
var innerContHeight;
function createIntroPage(textContent)
{
    innerContHeight = heightDocument - headerInfo[3] - footerInfo[3];
    //$("#innerCont").css('height',innerContHeight+'px');
    var introDiv = document.createElement('div');

    //introDiv.style.height = innerContHeight + "px";
    introDiv.style.width = headerInfo[2] + "px";
    introDiv.className = "tabRoundRectZero overview";




    var headDiv = document.createElement('div');
    headDiv.style.width = headerInfo[2] + "px";
    headDiv.className = "tabRoundRectZero";
    headDiv.style.paddingTop = "20px";
    headDiv.innerHTML = '<font face="calibriregular" size="5" color="#006699">'+'<b>INTRODUCTION</b> '+'</font>';
    headDiv.style.position = "relative"
    introDiv.appendChild(headDiv);


    var boxDesign = document.createElement('div');
    boxDesign.className = "tabRoundRect"
    boxDesign.style.backgroundColor = "#cae2fa";
    boxDesign.id = "boxDesign"
    boxDesign.style.marginLeft = "40px";
    boxDesign.style.marginRight = "40px";
    boxDesign.style.marginTop = "20px";
    boxDesign.style.width = headerInfo[2] - 80 + "px";
    boxDesign.style.position = "relative"




    var localWidth = headerInfo[2] * .5;
    if(headerInfo[2]<=768)
    {
        localWidth = headerInfo[2] - 120;
    }

    var contenthead = document.createElement('div');
    contenthead.id = "contentHead";
    contenthead.style.margin = "20px";
    contenthead.style.width = localWidth + "px";
    contenthead.style.padding = "20px";
    contenthead.innerHTML = textContent;
    contenthead.style.position = "relative";
    contenthead.style.left = (headerInfo[2] - 120)/2 - localWidth/2 + "px";
    contenthead.style.textAlign = "centre";
    boxDesign.appendChild(contenthead);

    var buttonToContinue = document.createElement('div');
    buttonToContinue.id = "buttonToContinue";
    buttonToContinue.className = "tabRoundRect";
    buttonToContinue.style.padding = "10px";
    buttonToContinue.style.width = "150px";
    buttonToContinue.style.left = (headerInfo[2]-120)/2 - 70 + "px";
    buttonToContinue.style.cursor = "pointer"
    buttonToContinue.style.backgroundColor = "#cccccc";
    buttonToContinue.style.position = "relative"
    buttonToContinue.innerHTML = '<font face="calibriregular" size="4" color="#000000">'+'<b>School of Biological Science</b>'+'</font>';
    boxDesign.appendChild(buttonToContinue);

    var cTC = document.createElement('div');
    cTC.className = "tabRoundRect";
    cTC.id = "cTC";
    cTC.style.paddingBottom = "40px";
    cTC.style.width = localWidth + "px";
    cTC.style.left = (headerInfo[2] - 80)/2 - localWidth/2 + "px";
    cTC.style.position = "relative";
    cTC.innerHTML = '<font face="calibriregular" size="3" color="#000000">'+'Click to Continue'+'</font>';
    boxDesign.appendChild(cTC);

    introDiv.appendChild(boxDesign);

    $("#innerCont").append(introDiv);
    $("#PreLoader").css("visibility","hidden");
    function gameStart(event) {
        introPage = false;
        $("#innerCont").empty();
        stopAllAudio();
        $("#PreLoader").css("visibility","visible")
        loadPreAssesment();
    }

    boxDesign.style.height = document.getElementById("boxDesign").offsetHeight + "px"
    $(buttonToContinue).bind('click',{},gameStart)
    $(cTC).bind('click',{},gameStart)
    $(".innerContDiv").customScrollbar();
}
