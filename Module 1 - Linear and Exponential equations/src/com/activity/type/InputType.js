/**
 * Created by admin on 8/9/14.
 */
function validate(evt) {
    var theEvent = evt || window.event;
    var key = theEvent.keyCode || theEvent.which;
    key = String.fromCharCode( key );
    var regex = /[0-9]|\./;
    var regEx1 = /^(\d+)?(?:\.\d{1,3})?$/;
    if( !regex.test(key) ) {
        theEvent.returnValue = false;
        if(theEvent.preventDefault) theEvent.preventDefault();
    }
}
function showCorrecrAnsImput(regExp, ansArray)
{
    for(var i=0;i<ansArray.length;i++)
    {
        var textField = document.getElementById('InputText'+(i+1));
        textField.value = ansArray[i];
    }
}
var totalSubmitCount = 0;
function showResultInputType(regExp, ansArray)
{
    //console.log(regExp,ansArray)
    totalSubmitCount++;
    var ansBoolean = true;
    for(var i=0;i<ansArray.length;i++)
    {
        var textField = document.getElementById('InputText'+(i+1));
        if(textField.value.length !=0)
        {
            var ratio = Math.abs(Number(textField.value)-Number(ansArray[i]))/Number(ansArray[i]) * 100;
            if(ratio>4)
            {
                ansBoolean = false;
            }
        }
        else
        {
            ansBoolean = false;
        }
    }
    if(ansBoolean)
    {
        showPopfeedBackInput($(feedbackInputCorrect).text());
    }
    else
    {
        if(totalSubmitCount>2)
        {
            showPopfeedBackInput($(feedbackInputInSecondCorrect).text())
        }
        else
        {
            showPopfeedBackInput($(feedbackInputInCorrect).text())
        }
    }

}

function showPopfeedBackInput(data) {


    var contentData = '<div class="close-reveal-modal" id="xBox" style="padding: 10px; z-index:16; font-family: calibriregular; color:#000000; text-align: right; right: 25px; width:100%; position: relative; cursor: pointer;">'+"&#215;" + '</div>'+'<div class="tabRoundRect" style="padding: 10px; font-family: calibriregular; text-align:justify; position: relative; ">' + data + "</div>";
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