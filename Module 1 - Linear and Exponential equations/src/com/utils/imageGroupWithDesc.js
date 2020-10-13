
/**
 * Created by admin on 13/6/14.
 */
function createImageWithDesc(pDiv,infoImages,sizeWidth)
{
    var allImageDiv = document.createElement('div');
    allImageDiv.className = "tabRoundRect";
    allImageDiv.style.position = "relative"
    allImageDiv.style.width = headerInfo[2] - 20 + "px";
    var infoImageDesc = $(infoImages).find('infoImages')

    createImageCont(allImageDiv,infoImageDesc,sizeWidth,0)

    pDiv.appendChild(allImageDiv);
}

function createImageCont(allImageDiv, infoImageDesc, sizeWidth, number) {
    var aLength = infoImageDesc.length;
    if(number<aLength)
    {
        createImageDiv(allImageDiv,infoImageDesc,sizeWidth,number)
    }
}

function showImageDesc(currObject,childObject,childObjectTop,textHeight) {
    textHeight = childObject.offsetHeight;
    currObject.style.height = childObjectTop + textHeight + "px";
    childObject.style.top = childObjectTop + "px";
    var id = setInterval(resetScrollBar, 2000);
    childObject.style.visibility = "visible"


    function resetScrollBar()
    {
        clearInterval(id);
        $(".scrollablePage").customScrollbar();
    }
}
function createImageDiv(pDiv,fulldesc,sizeWidth,i) {
    var tabDiv  = document.createElement('div');
    tabDiv.className = "tabRoundRectTransit";
    var desc = fulldesc[i];
    var tabDivid = "imageAcc" + i ;
    tabDiv.id = tabDivid;
    tabDiv.style.zIndex = 16;
    tabDiv.style.position = "relative";
    tabDiv.style.display = "inline-block";
    tabDiv.style.margin = "10px";
    tabDiv.style.backgroundColor = "#e6e6e6";
    tabDiv.style.width = sizeWidth + 5 + 10 + "px";

    //tabDiv.style.boxShadow = "inset 0px 0px 5px #00000";
    pDiv.appendChild(tabDiv);
    tabDiv.style.cursor = "pointer";
    var textHeight;
    var textBox = document.createElement('div');

    textBox.className = "tabRoundRectTransitTwoSided";
    textBox.style.position = "absolute"
    textBox.style.width = sizeWidth  + "px";
    //textBox.style.height = 100 + "px";
    textBox.style.backgroundColor = "#cccccc";
    textBox.innerHTML = $(desc).text();
    textBox.style.fontFamily = "calibriregular";
    tabDiv.appendChild(textBox);;
    textBox.style.visibility = "hidden"
    textHeight = textBox.offsetHeight;
    console.log(textHeight,"textHeight")
    $('<img src="'+ $(desc).attr('linkName') +'" class="map" usemap="#imageButton" >').load(function() {
        $(this).appendTo(tabDiv);
        var ratio = $(this).height()/$(this).width();
        $(this).width(sizeWidth);
        $(this).height(sizeWidth*ratio)
        tabDiv.style.height = sizeWidth*ratio + 15 + "px";
        tabDiv.addEventListener("click", function(){showImageDesc(tabDiv,textBox,sizeWidth*ratio + 15,textHeight)},false);
        i++;
        createImageCont(pDiv, fulldesc, sizeWidth, i)
    });
    //$("#"+tabDivid).bind('click',{desc:desc,obj:tabDiv},showImageDesc);

}