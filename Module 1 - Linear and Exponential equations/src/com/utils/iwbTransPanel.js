function addVolumeSlider() {
    var vSlide = document.createElement('div');
    $("#buttonPanelDiv").append(vSlide);
    vSlide.className = "tabRoundRectZero";
    vSlide.style.position = "absolute";
    vSlide.style.backgroundColor = "#000000"
    vSlide.style.color = "#000000"
    var aWid = 50, aHeig = 140;
    vSlide.style.width = aWid + "px";
    vSlide.style.height = aHeig + "px";
    vSlide.style.left = footerInfo[0] + 110 +'px';
    vSlide.style.top = footerInfo[1] - aHeig + 'px';


    var aSlider = document.createElement('input');
    aSlider.id = "audioSlider";
    aSlider.style.width = "120px";
    aSlider.type = "range";
    aSlider.min = 0;
    aSlider.max = 1;
    aSlider.step = 0.1;
    aSlider.value = 1;
    aSlider.className = "iVideoSliderVertical"
    vSlide.appendChild(aSlider);
    aSlider.style.position = "absolute";

    aSlider.style.left = -60 + document.getElementById('audioSlider').offsetHeight * 2 + "px";
    aSlider.style.top = 70 + "px";
    sliderChangeLive(aSlider);
    vSlide.style.visibility = "hidden";

    var volumeBar = document.getElementById("audioSlider");
    volumeBar.addEventListener("change", function() {
        // Update the video volume
        //video.volume = volumeBar.value;
        sliderChangeLive(volumeBar)
    });
}

sliderChangeLive =function(item)
{
    var  value = (item.value - item.min)/(item.max - item.min);
    item.style.backgroundImage = [
        '-webkit-gradient(',
        'linear, ',
        'left top, ',
        'right top, ',
        'color-stop(' + value + ', red), ',
        'color-stop(' + value + ', blue)',
        ')'
    ].join('');
}



var transOn = true;
function toggleMenuTrans(event)
{
    var ele = event.data.obj;
    var changeTop = event.data.changeTop
    var atop, vtop;
    if(transOn)
    {
        atop = ele.Xtop+changeTop;
        vtop = aVideoSlider.Xtop+changeTop;
    }
    else
    {
        atop = ele.Xtop-changeTop;
        vtop = aVideoSlider.Xtop-changeTop;

    }
    ele.style.top = atop + "px";
    aVideoSlider.style.top = vtop + "px";
    aVideoSlider.Xtop = vtop; ele.Xtop = atop;
    transOn = !transOn;
}

var settingOff = false;
function visibleIWBPANEL() {
    $(".subMenu").css("visibility","hidden");
    $("#accessMenu").css("z-index",16);
    $("#buttonPanelDiv").css("zIndex", 17);


    if(!settingOff)
    {
        var atop = - iwbtransFactor ;
        $("#iwbDiv").css("visibility","visible");
        $("#iwbMenu").bind('click',{obj:iwbDiv,changeTop:changeTop},toggleMenu);
        $("#iwbMenu").css('poiner-events',"all")
        $("#iwbMenu").css('width',headerInfo[2]+"px")
    }
    else
    {
        var atop =  iwbtransFactor ;
        $("#iwbDiv").css("visibility","hidden");
        $("#iwbMenu").unbind('click',toggleMenu)
        $("#iwbMenu").css('width',"0px")
        if(iwbOn)
        {
            moveVertical(iwbDiv,iwbDiv.Xtop+46);
            iwbOn = false;
        }
    }

    settingOff = !settingOff;
}

var iwbOn = false;
function toggleMenu(event)
{
    var ele = event.data.obj;
    var changeTop = event.data.changeTop
    if(iwbOn)
    {
        moveVertical(ele,ele.Xtop+changeTop);
    }
    else
    {
        moveVertical(ele,ele.Xtop-changeTop);
    }
    iwbOn = !iwbOn;
}

/**
 * Created by admin on 2/6/14.
 */
var iwbDiv ;
var transScriptDiv;

var iwbDivCont;
var iwbtransFactor = 21;
var changeTop, transTextDiv,totalButtonNo = 19;
function addIwbPanel() {
    iwbDiv = document.createElement('div');
    iwbDiv.id = "iwbDiv";
    var lineNo = 1;
    var innerHeight = heightDocument - headerInfo[3] - footerInfo[3];
    lineNo = 2;//Math.floor((totalButtonNo*50)/innerHeight) + 1;
    //console.log(lineNo,"lineNO",innerHeight,(totalButtonNo*50))
    iwbDiv.className = "tabRoundRectZero gradGray";
    iwbDiv.style.left = headerInfo[0] + "px";
    //iwbDiv.style.height = 240 + "px";
    iwbDiv.style.width = 50 * lineNo + "px";
    iwbDiv.style.position = "absolute";

    iwbDivCont = document.createElement('div');
    iwbDivCont.id = "iwbDivCont";
    iwbDivCont.className = "tabRoundRectZero";
    iwbDivCont.style.width = 50 * lineNo + "px";
    iwbDivCont.style.backgroundColor = "#000000";
    iwbDivCont.style.position = "relative";
    iwbDiv.style.top = headerInfo[3] + "px";
    //iwbDivCont.style.top = 20 + "px";
    iwbDivCont.style.maxHeight = innerHeight - 20 + "px";
    //iwbDivCont.style.height = innerHeight - 20 + "px";

    iwbDiv.style.visibility = "hidden";

    var headIwb = document.createElement('div');
    headIwb.className = "tabRoundRectZero gradGray";
    headIwb.style.position = "relative";
    headIwb.style.dispaly = "inline-block";
    iwbDiv.appendChild(headIwb);
    headIwb.innerHTML = '<font face="calibribold" size="3.5" color="#000000">IWB</font>'

    iwbDiv.appendChild(iwbDivCont);

    $("#accessMenu").append(iwbDiv);
    createIWBBtnGrp(true);
    $('#iwbDiv').draggable({containment: $('#innerCont')});
    sliderSize(iwbDiv,50 * lineNo);

    shapeMenu = createShapeMenu();
    shapeMenu.style.top = 30 + "px"
    shapeMenu.style.left = 50 * lineNo + "px"
    iwbDiv.appendChild(shapeMenu);
    shapeMenu.style.visibility = "hidden";
    $('#'+"iwbDiv").bind('dragstart', function(event, ui) {
        $(".subMenu").css("visibility","hidden")


    });
}
var shapeMenu, shapeMenuVisible;
createShapeMenu=function()
{

    var shapeDiv = document.createElement('div');
    shapeDiv.className = "tabRoundRectZero subMenu";
    shapeDiv.style.backgroundColor = "#000000";
    shapeDiv.style.position = "absolute";
    shapeMenuVisible = true;
    shapeDiv.appendChild(createNavigation("customButtonVertical","oval","src/assets/gui/iwb/oval.png"));
    shapeDiv.appendChild(createNavigation("customButtonVertical","rectangle","src/assets/gui/iwb/rectangle.png"));
    shapeDiv.appendChild(createNavigation("customButtonVertical","double_headed_line","src/assets/gui/iwb/double_headed_line.png"));
    shapeDiv.appendChild(createNavigation("customButtonVertical","single_headed_line","src/assets/gui/iwb/single_headed_line.png"));
    shapeDiv.appendChild(createNavigation("customButtonVertical","line","src/assets/gui/iwb/line.png"));
    return shapeDiv;
}

function createNavigation(cls,name,bgImage)
{
    var iBtn = document.createElement('div');
    iBtn.id = name;
    iBtn.style.position = "relative";
    iBtn.style.display = "inline-block";

    $('<img src="'+ bgImage +'">').load(function() {
        $(this).appendTo(iBtn);
        iBtn.style.paddingRight = "2px";
        if(name=="sound")
        {
            var volumeSlider = document.createElement('div')
            volumeSlider.id = "volumcontroller";
            volumeSlider.style.position = "relative"
            volumeSlider.style.display = "inline-block"
            iBtn.appendChild(volumeSlider)
            drawvolumecontroller(10,35,0);
        }

    });
    buttonArrayName.push(name);
    iBtn.value = name;
    iBtn.style.cursor = "pointer"
    if(name!="Menu")
    {
        $("#"+name).bind('click',{name:name},onTouchClick);
    }

    return iBtn;
}

var btnIWBArray = [["pencil"],['selectable'],["eraser"],['shapeMenu'],["marker"],['sizeMenu'],['print'],['delete'],["colorPicker"]];

var btnIWBWidthArray = [[40],[40],[40],[40],[40],[40],[40],[40],[40],[40],[40],[40],[40],[40],[40],[40],[40]];
var btnI = 0;
var btnJ = 0;
var btnIWBArrayName = [];
var bGroup;
var bDiv;
function createIWBBtnGrp(newGroup)
{
    if(newGroup)
    {
        if(btnIWBArray.length>btnI)
        {
            bGroup = document.createElement('div');
            bGroup.id = "btnGroup_" + btnI + "_" + btnJ;
            iwbDivCont.appendChild(bGroup);
            bGroup.style.position = "relative";
            bGroup.style.display = "inline-block";
            bGroup.style.marginTop = "2px";
        }
        else
        {
            return;
        }

    }
    addIWBButtons(bGroup,"src/assets/gui/iwb/"+btnIWBArray[btnI][btnJ]+".png",btnIWBArray[btnI][btnJ]);
}

function addIWBButtons(pDiv,bgImage,btnName)
{
    var iBtn = document.createElement('div');
    iBtn.id = btnName;

    iBtn.style.display = "inline-block";
    if(btnName=="selectable")
    {
        //iBtn.style.marginLeft = "-12px";
    }
    $('<img src="'+ bgImage +'">').load(function() {
        btnIWBArrayName.push(btnName);
        iBtn.value = btnName;
        iBtn.style.cursor = "pointer";
        pDiv.appendChild(iBtn);

        if(btnName=="colorPicker")
        {
            iBtn.style.width = "80px"
            iBtn.style.height = "40px"
            $('#'+btnName).jPicker(
                {
                    window:
                    {
                        expandable: true
                    }
                });
        }
        else
        {
            $(this).appendTo(iBtn);
        }

        $("#"+btnName).bind('click',{name:btnName},onTouchClick);

        if(btnIWBArray[btnI].length-1<=btnJ)
        {
            btnI++;
            btnJ = 0;
            if(btnI!=btnIWBWidthArray.length)
            {
                createIWBBtnGrp(true);
            }
        }
        else
        {
            btnJ++;
            createIWBBtnGrp(false);
        }

    });

}
var sactDiv,sactDivVisible;

function sliderSize(aDiv,left)
{
    sactDiv= document.createElement('div');
    sactDiv.style.position = "absolute";
    sactDiv.style.top = 65 + "px";
    sactDiv.style.left = left+"px";
    sactDiv.className = "tabRoundRectZero subMenu";
    sactDiv.style.visibility = "hidden";
    sactDivVisible = false;
    var iSlider = document.createElement('div');
    iSlider.id = 'iSlider';
    iSlider.className = 'iSlider';

    iSlider.style.position = 'absolute';
    iSlider.style.left = 10 +'px';
    iSlider.style.top = 35 +'px';
    sactDiv.appendChild(iSlider);
    aDiv.appendChild(sactDiv);


    var iHandle = document.createElement('div');
    iHandle.className = "customHandle ui-slider-handle";
    var iBar = document.createElement('div');
    iBar.className = 'customBar ui-slider-track';
    $('.iSlider').append(iHandle);
    $('.iSlider').append(iBar);
    var barWidth;
    $('<img src="src/assets/gui/iwb/BgBox.png">').load(function() {
        $(this).appendTo(sactDiv)

        $('<img src="src/assets/gui/iwb/sliderKnob.png">').load(function() {
            $(this).appendTo(iHandle);
            diffHieght = $(this).height();
            iHandle.style.marginTop = -$(this).height()/4+"px";
            //iHandle.style.marginLeft = -$(this).height()/2 + 3 +"px";
            $('<img src="src/assets/gui/iwb/sliderBar.png">').load(function() {
                $(this).appendTo(iBar);
                barWidth = $(this).width();
                iSlider.style.width = barWidth - 18 +'px';
                $(".iSlider").slider(
                    {
                        max:6,
                        min:1,
                        step:1,
                        slide: function( event, ui ) {
                            _sizePicked = ui.value * 2;
                        }
                    }
                )

            });
        });

    });
}
