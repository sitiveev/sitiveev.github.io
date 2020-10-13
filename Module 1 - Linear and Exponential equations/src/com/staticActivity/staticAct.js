/**
 * Created by admin on 10/3/14.
 */
createStaticAct = function (aDiv, currentHeight, aX, cwidth) {
    var oDiv = document.createElement('div');
    oDiv.id = 'staticAct';
    aDiv.appendChild(oDiv);
    var tDiv = document.createElement('div');
    tDiv.id = 'staticText';
    tDiv.innerHTML = "<p>Select group 1, 2, or 3 by clicking or tapping to view how amino group , carboxyl group and amino acid behave in different pH values.</p>";
    tDiv.style.color = "#FF6600";
    tDiv.style.fontFamily='calibribold_italic';
    var mW = 345;
    if(mW>widthDocument)
    {
        mW = widthDocument - 30;
    }
    tDiv.style.maxWidth = mW + "px";
    tDiv.style.fontSize = 14 + 'px';
    tDiv.style.textAlign = 'justify';
    oDiv.appendChild(tDiv);
    oDiv.style.maxWidth = mW + "px";
    var aY = 20;
    if(layout=="full")
    {
        oDiv.style.position = 'absolute';
        oDiv.style.left =  cwidth + 10 + "px";
        oDiv.style.top = 20 + "px";
    }
    else
    {
        oDiv.style.position = 'absolute';
        aY = currentHeight + 20;
        oDiv.style.top = currentHeight + 20 + "px";
    }

    var aImage = document.createElement('div');
    oDiv.appendChild(aImage);
    aImage.id = 'aImage';
    aImage.style.position = "absolute";
    var tempY;
    if(layout!='ShrinkVertical')
    {
        aImage.style.left = mW + 10 + "px";
        if(layout!='fullVertical')
        {
            tempY = aY;
            aImage.style.top = aY + "px";
        }
        else
        {
            tempY = 20;
            aImage.style.top = 20 + "px";
        }

    }
    assembleImage(aImage,aDiv,aY,aX);
};

function positionThis(divO, divId, posX, posY,refNo)
{
    divO.style.position = 'absolute';
    divO.style.left = posX + "px";
    divO.style.top = posY + "px";
    $("#" + divId).bind('click', {ref: refNo, oDiv: divO}, onClickSt);
}

function onClickSt(e)
{
    changeImage(e.data.ref);
}

var sliderPop;
var preVal = 0;
var sliderJump = [8.5,2.5,7];
var pText;
var popText = [
    ['<font face="calibriregular"  color="#006699">At higher pH, i.e. there are less protons in the solution, and the H<sup>+</sup> will leave the amino group so that it is mostly in the NH<sub>2</sub> form.</font><br><font face="calibribold_italic" size="-1" color="#ff6600">Drag the flask towards higher or lower pH on the scale and observe the change.</font>',
    '<font face="calibriregular"  color="#006699">The pKa of the amino group is about 8.5, meaning that at pH 8.5, about 50% of the group will be in the NH<sub>2</sub> form (deprotonated) and the other 50% will be in the NH<sub>3</sub><sup>+</sup> form (protonated).</font><br><font face="calibribold_italic" size="-1" color="#ff6600">Drag the flask towards higher or lower pH on the scale and observe the change.</font>',
    '<font face="calibriregular"  color="#006699">When the pH is lower than its pKa of 8.5, there are more protons (H<sup>+</sup>) in the solution to drive the amino group to assume mostly the NH<sub>3</sub><sup>+</sup> form.</font><br><font face="calibribold_italic" size="-1" color="#ff6600">Drag the flask towards higher or lower pH on the scale and observe the change.</font>'],

    ['<font face="calibriregular"  color="#006699">At higher pH, with less protons in the medium, the carboxyl group will assume the COO<sup>−</sup> form.</font><br><font face="calibribold_italic" size="-1" color="#ff6600">Drag the flask towards higher or lower pH on the scale and observe the change.</font>',
                    '<font face="calibriregular"  color="#006699">Let the pKa of the carboxyl group in this amino acid be 2.5.  At pH 2.5, 50% of the carboxyl group will be in the COOH form (protonated) and 50% will be in the COO<sup>−</sup> form (deprotonated).</font><br><font face="calibribold_italic" size="-1" color="#ff6600">Drag the flask towards higher or lower pH on the scale and observe the change.</font>',
                    '<font face="calibriregular"  color="#006699">At pH less than its pKa of 2.5, with a higher concentration of H<sup>+</sup> in the medium, the carboxyl group will mostly assume the COOH form (protonated).</font><br><font face="calibribold_italic" size="-1" color="#ff6600">Drag the flask towards higher or lower pH on the scale and observe the change.</font>'],

    ['<font face="calibriregular"  color="#006699">As pH of the solution is increased (above 7), more amino and carboxyl groups get deprotonated, there by making carboxyl group nagetively charged and converting amino group neutral.</font><br><font face="calibribold_italic" size="-1" color="#ff6600">Drag the flask towards higher or lower pH on the scale and observe the change.</font>',
                    '<font face="calibriregular"  color="#006699">At neutral pH (about 7), both the amino and the carboxyl groups are charged: a positive charge for the amino group and a negative charge for the carboxyl group.  The doubly charged molecule is referred to as a zwitter ion.</font><br><font face="calibribold_italic" size="-1" color="#ff6600">Drag the flask towards higher or lower pH on the scale and observe the change.</font>',
        '<font face="calibriregular"  color="#006699">As pH of the solution is lowered (below 7), more amino and carboxyl groups get protonated, there by making amino group positively charged and converting carboxyl group neutral.</font><br><font face="calibribold_italic" size="-1" color="#ff6600">Drag the flask towards higher or lower pH on the scale and observe the change.</font>']];


function jumptovalue(refNo)
{
    var aNo = 14 - sliderJump[refNo-1];
    $( ".iSlider" ).slider({ value: aNo });
    var value = $( ".iSlider" ).slider( "option", "value" );
    $( ".iSlider" ).slider( "option", "value", aNo );
    selectedId = refNo;
    rollPopup(14-aNo);
}

function rollPopup(val)
{
    var temppopupX;
    var aNo = sliderJump[selectedId-1];
    ratio = (widthPopup-30) * (14-val) / 14;
    temppopupX = - ratio ;
    popupBoxMoveable.style.marginLeft = temppopupX + "px";
    if(val < 10 )
    {
        iSlideText.style.left = 30 + "px";
    }
    else
    {
        iSlideText.style.left = 27 + "px";
    }
    iSlideText.innerHTML = val.toFixed(1);
    if(selectedId != -1)
    {
        pText.style.position = 'absolute';
        pText.style.width = widthPopup - 25 + 'px';

        pText.style.marginLeft = 10 + "px";
        pText.style.textAlign =  'justify';
        pText.style.lineHeight = "105%";

        if(val > aNo)
        {
            pText.innerHTML = popText[selectedId-1][0];
        }
        else if(val == aNo)
        {
            pText.innerHTML = popText[selectedId-1][1];
        }
        else
        {
            pText.innerHTML = popText[selectedId-1][2];
        }
        if(selectedId==3)
        {
            if(val == 8.5)
            {
                pText.innerHTML = '<font face="calibriregular"  color="#006699">As pH of the solution is increased to 8.5, almost all carboxyl groups are negatively charged and about 50% of amino groups are neutral, which means about 50% of amino acid molecules are still in zwitter ion state.</font><br><font face="calibribold_italic" size="-1" color="#ff6600">Drag the flask towards higher or lower pH on the scale and observe the change.</font>'
            }
            if(val > 8.5)
            {
                pText.innerHTML = '<font face="calibriregular"  color="#006699">As pH of the solution is increased above 8.5, almost all the amino and carboxyl group get deprotonated, converting the amino groups into neutral state and carboxyl groups into negetively charged ion.</font><br><font face="calibribold_italic" size="-1" color="#ff6600">Drag the flask towards higher or lower pH on the scale and observe the change.</font>'
            }
            if(val == 2.5)
            {
                pText.innerHTML = '<font face="calibriregular"  color="#006699">As pH of the solution is lowered to 2.5, almost all amino  groups are positively charged and 50% of carboxyl groups are neutral. Which means 50% of amino acid molecules are still in zwitter ion state.</font><br><font face="calibribold_italic" size="-1" color="#ff6600">Drag the flask towards higher or lower pH on the scale and observe the change.</font>'
            }
            if(val < 2.5)
            {
                pText.innerHTML = '<font face="calibriregular"  color="#006699">As pH of the solution is lowered below 2.5, almost all the amino and carboxyl group get protonated, converting the amino groups into positively charged and carboxyl groups into neutral state.</font><br><font face="calibribold_italic" size="-1" color="#ff6600">Drag the flask towards higher or lower pH on the scale and observe the change.</font>'
            }
        }
        pText.style.top =  popupBoxMoveable.offsetTop + (popupBoxMoveable.offsetHeight - pText.offsetHeight)/2 - 5  + 'px';
    }

}

var iSlideText;
var selectedId = -1;
function createSliderSt(oDiv,posY,aX)
{
    var iSlider = document.createElement('div');
    iSlider.id = 'iSlider';
    iSlider.className = 'iSlider';
    console.log(posY,'console');
    iSlider.style.position = 'absolute';
    var iTop = 0;
    if(layout=='ShrinkVertical')
    {
        iTop = 50;
    }

    iSlider.style.top = posY + iTop + 200 + 'px';
    iSlider.style.left = aX + 40 +'px';
    oDiv.appendChild(iSlider);

    sliderPop = document.createElement('div');
    sliderPop.id = "sliderPop";
    sliderPop.style.marginTop = -50 + "px";
    sliderPop.style.marginLeft = 32.5 + "px";
    sliderPop.style.maxWidth = widthDocument - 40 + "px";
    sliderPop.style.visibility = 'hidden';

    var iHandle = document.createElement('div');
    var iHandleInner = document.createElement('div');
    iHandle.appendChild(iHandleInner);
    iHandle.className = "customHandle ui-slider-handle";
    iHandle.style.marginLeft = -44+'px';

    iSlideText = document.createElement('div');
    iHandle.appendChild(iSlideText);
    iSlideText.innerHTML = '14.0';
    iSlideText.style.color = "#ffffff";
    iSlideText.style.fontFamily = "calibribold";
    iSlideText.style.fontSize = "18px";
    iSlideText.style.position = 'relative';
    iSlideText.style.top = - 140 + "px";
    iSlideText.style.left = 27 + "px";
    var iBar = document.createElement('div');
    iBar.className = 'customBar ui-slider-track';
    iBar.id = "iBar";
    $('.iSlider').append(iHandle);
    $('.iSlider').append(iBar);
    var barWidth;
    var headWidth;
    var aHeight;
    pText = document.createElement('div')
    $('<img src="src/assets/page4/image/sliderKnob.png">').load(function() {
        $(this).appendTo(iHandleInner);
        //diffHieght = $(this).height()+8;
        headWidth = 51;
        iHandle.style.marginTop = -$(this).height()/2-6+"px";

        $('<img src="src/assets/page4/image/sliderBar.png">').load(function() {
            $("#iBar").empty();
            $(this).appendTo(iBar);
            barWidth = $(this).width();
            if(barWidth>widthDocument)
            {
                barWidth = widthDocument-headWidth;
            }
            aHeight= $(this).height();
            $(this).width(barWidth - headWidth - 20)
            $(this).height(aHeight)
            iSlider.style.maxWidth = barWidth - headWidth -20 +'px';
            $(".iSlider").slider(
                {
                    max:14,
                    min:0,
                    step:.1,
                    value:0,
                    orientation:"",
                    slide:function(e,ui){
                        rollPopup(14-ui.value)
                    }
                }
            )
            preVal = 14;
            //createOtherAct(currentHeight,aX,cwidth);
        });
    });
    var knobSlid = document.createElement('div');
    popupBoxMoveable = document.createElement('div');
    $('<img src="src/assets/page4/image/SliderPopKnob.png">').load(function() {

        $(this).appendTo(knobSlid);
        knobSlid.style.position = 'relative';
        sliderPop.appendChild(popupBoxMoveable);
        sliderPop.insertBefore(knobSlid,popupBoxMoveable);
        //knobSlid.style.top = -141 + "px";
        knobSlid.style.zIndex = 10000;
        $('<img src="src/assets/page4/image/popbox.png">').load(function() {
            $(this).appendTo(popupBoxMoveable);
            popupBoxMoveable.appendChild(pText);
            popupBoxMoveable.style.marginTop = -22.5 + "px";
            popupBoxMoveable.style.marginLeft = 0 + "px";
            aHeight = $(this).height();
            if($(this).width()>widthDocument-120)
            {
                $(this).width(widthDocument - 60);
                $(this).height(aHeight + 60);
            }
            console.log('4th page scroll bar')
            //$(".scrollablePage").customScrollbar();
            widthPopup = $(this).width();
        });
    });
    iHandle.appendChild(sliderPop)
}

var popupBoxMoveable, initPopupX, widthPopup;





changeImage = function (refNo)
{
    $("#btn_1").unbind( "click" );
    $("#btn_2").unbind( "click" );
    $("#btn_3").unbind( "click" );
    jumptovalue(refNo);
    selectedId = refNo;
    sliderPop.style.visibility = 'visible';
    if(refNo==1)
    {
        $('<img src="src/assets/page4/image/imageDi1.png">').load(function() {
            $('#btn_1').empty();
            $(this).appendTo(divA);
        });
        $('<img src="src/assets/page4/image/imageEn2.png">').load(function() {
            $('#btn_2').empty();
            $(this).appendTo(divB);
        });
        $('<img src="src/assets/page4/image/imageEn3.png">').load(function() {
            $('#btn_3').empty();
            $(this).appendTo(divC);
        });
        //$("#btn_1").bind('click', {ref: 1, oDiv: divA}, onClickSt);
        $("#btn_2").bind('click', {ref: 2, oDiv: divB}, onClickSt);
        $("#btn_3").bind('click', {ref: 3, oDiv: divC}, onClickSt);
    }
    if(refNo==2)
    {
        $('<img src="src/assets/page4/image/imageEn1.png">').load(function() {
            $('#btn_1').empty();
            $(this).appendTo(divA);
        });
        $('<img src="src/assets/page4/image/imageDi2.png">').load(function() {
            $('#btn_2').empty();
            $(this).appendTo(divB);
        });
        $('<img src="src/assets/page4/image/imageEn3.png">').load(function() {
            $('#btn_3').empty();
            $(this).appendTo(divC);
        });
        $("#btn_1").bind('click', {ref: 1, oDiv: divA}, onClickSt);
        //$("#btn_2").bind('click', {ref: 2, oDiv: divB}, onClickSt);
        $("#btn_3").bind('click', {ref: 3, oDiv: divC}, onClickSt);
    }
    if(refNo==3)
    {
        $('<img src="src/assets/page4/image/imageEn1.png">').load(function() {
            $('#btn_1').empty();
            $(this).appendTo(divA);
        });
        $('<img src="src/assets/page4/image/imageEn2.png">').load(function() {
            $('#btn_2').empty();
            $(this).appendTo(divB);
        });
        $('<img src="src/assets/page4/image/imageDi3.png">').load(function() {
            $('#btn_3').empty();
            $(this).appendTo(divC);
        });
        $("#btn_1").bind('click', {ref: 1, oDiv: divA}, onClickSt);
        $("#btn_2").bind('click', {ref: 2, oDiv: divB}, onClickSt);
        //$("#btn_3").bind('click', {ref: 3, oDiv: divC}, onClickSt);
    }

};

var divA, divB, divC;

function assembleImage(aImage,oDiv,tempY,aX)
{

    $('<img src="src/assets/page4/image/image2.png">').load(function() {
        divB = document.createElement('a');
        divB.href = "#";
        divB.id = 'btn_2'
        $(this).appendTo(divB);
        aImage.appendChild(divB);
        positionThis(divB,"btn_2",0,23.95,2);
        $('<img src="src/assets/page4/image/image3.png">').load(function() {
            divC = document.createElement('a');
            divC.href = "#";
            $(this).appendTo(divC);
            divC.id = 'btn_3';
            aImage.appendChild(divC);
            positionThis(divC,"btn_3",65.40,-5.25,3);
            $('<img src="src/assets/page4/image/image1.png">').load(function() {
                divA = document.createElement('a');
                divA.href = "#";
                divA.id = 'btn_1';
                $(this).appendTo(divA);
                aImage.appendChild(divA);
                positionThis(divA,"btn_1",73.90,60.40,1);
                var oY = tempY + Number(document.getElementById('staticAct').offsetHeight);
                console.log(oY)
                createSliderSt(oDiv,oY,aX)
            });
        });
    });
}