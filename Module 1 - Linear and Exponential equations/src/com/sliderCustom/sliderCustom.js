/**
 * Created by admin on 4/3/14.
 */
var actDiv;
var diffHieght;
var createOtherAct = function (currentHeight,aX,cwidth) {
    actDiv.style.position = 'absolute';
    actDiv.id = 'actDiv';
    $('<img src="src/assets/page5/image/sliderbase.png">').load(function() {
            $(this).appendTo(actDiv)
    })

    if(layout!="full")
    {
        actDiv.style.left = aX+'px';
        actDiv.style.top = currentHeight+10+"px"
    }
    else
    {
        actDiv.style.left = cwidth+10+'px';
        actDiv.style.top = 50+"px"
    }

};
function createpagesevenact(state,aDiv,currentHeight,aX,cwidth)
{
    actDiv = document.createElement('div');
    var iSlider = document.createElement('div');
    iSlider.id = 'iSlider';
    iSlider.className = 'iSlider';
    iSlider.style.position = 'absolute';
    iSlider.style.top = 140+'px';
    iSlider.style.left = 30+'px';
    actDiv.appendChild(iSlider);
    aDiv.appendChild(actDiv);


    var iHandle = document.createElement('div');
    iHandle.className = "customHandle ui-slider-handle";
    var iBar = document.createElement('div');
    iBar.className = 'customBar ui-slider-track';
    $('.iSlider').append(iHandle);
    $('.iSlider').append(iBar);
    var barWidth;

    $('<img src="src/assets/page5/image/sliderKnob.png">').load(function() {
        $(this).appendTo(iHandle);
        diffHieght = $(this).height()+8;
        iHandle.style.marginTop = -$(this).height()+8+"px";
        $('<img src="src/assets/page5/image/sliderBar.png">').load(function() {
            $(this).appendTo(iBar);
            barWidth = $(this).width();
            iSlider.style.maxWidth = barWidth+'px';
            $(".iSlider").slider(
                {
                    max:14,
                    min:0,
                    step:.1,
                    orientation:state

                }
            )
            createOtherAct(currentHeight,aX,cwidth);
        });
    });


}
