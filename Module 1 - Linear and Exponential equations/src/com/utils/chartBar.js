// JavaScript Document


startChartBar = function (data) {
    _chartData = data;
    groupId = 0;
    loadChartAct();
};

parseXMLChartBar = function (str) {
    $.ajax({
        type: "GET",
        crossDomain: false,
        url: encodeURI(str),
        dataType: "xml",
        success: startChartBar
    });
};

/*
	Chart Bar XML Parsing Section 
*/

var _target;
var _chartData;
var _pageRef;
var _posChartX;
var _posChartY = 0;
var _defaultX;

function createChartBar(posY,aX,pageRef,target)
{
	_target = target;
	_pageRef = pageRef;
	_posChartX = aX;
    _defaultX = aX;
	//_posChartY = posY;
    var url = "src/assets/page" + currentPageId + "/chartBar/chartBar.xml";
	parseXMLChartBar(url);
    chartDiv = document.createElement('div');
    _target.appendChild(chartDiv);
    chartDiv.style.position = 'relative';
    chartDiv.style.top = posY  + "px";
    chartDiv.style.maxWidth = widthDocument - 30 + "px";
}


var groupId = 0;
var xSub = 0;
var chartDiv;
var maxHeight = 0;

function loadChartAct()
{
	var _group = _chartData.getElementsByTagName("Group");
	if(groupId < _group.length)
	{
		createGroup(_group[groupId]);
	}
    //console.log(chartDiv.offsetWidth,"as")
}

createGroup = function (group) {
    var groupDiv = document.createElement("div");
    groupDiv.id = "groupDiv" + groupId;
    groupDiv.style.position = "absolute";
    groupDiv.style.top = _posChartY + "px";
    groupDiv.style.left = _posChartX + "px";
    if(layout=="ShrinkVertical")
    {
        if(groupId!=0)  groupDiv.style.left = _posChartX + 62 + "px";
    }
    groupDiv.style.fontFamily = "calibriregular";
    groupDiv.style.textJustify = "auto";
    groupDiv.style.fontSize = "14px";
    chartDiv.appendChild(groupDiv);
    groupDiv.style.maxWidth = 265 + "px";
    var head = document.createElement("div");
    head.id = "head" + groupId;
    head.style.color = "#006699";
    groupDiv.appendChild(head);
    if(groupId==3)
    {
        //head.style.backgroundColor=$(group).attr("bgColor");
        var aWB = 170;
        var aWH = 50;
        if(layout=='fullVertical')
        {
            aWB = 668;
        }
        head.style.width = aWB+"px";
        var boxH = document.createElement('div');
        groupDiv.insertBefore(boxH,head);
        boxH.id = "boxH";
        boxH.style.width = aWB + "px";
        boxH.style.height = aWH + "px";
        boxH.className = "tabRoundRect";
        boxH.style.backgroundColor = $(group).attr("bgColor");
        console.log(boxH);
        boxH.innerHTML = group.getElementsByTagName("head")[0].textContent;
        head.innerHTML = group.getElementsByTagName("head")[0].textContent;
        head.style.textAlign = "center";

    }

    ySub = document.getElementById('head'+groupId).offsetTop + document.getElementById('head'+groupId).offsetHeight ;
    var image = $(group).attr('image');
    var imageDiv = document.createElement('div');
    imageDiv.id = "imageDiv";
    if (image == "true") {
        $('<img src="' + _pageRef + 'chartBar/sideBar.png">').load(function () {
            $(this).appendTo(imageDiv);

            groupDiv.appendChild(imageDiv);
            xSub = $(this).width() + document.getElementById('imageDiv').offsetLeft + 10;
            createTabs(group, groupDiv);
        });
    }
    else {
        xSub = 0;
        createTabs(group, groupDiv,ySub);
    }
};
var preLength = 0;
createTabs = function (group, groupDiv,ySub) {
    var footerName;
    var footer;
    preLength = 0
    var subGroup = group.getElementsByTagName("subGroup");
    for (var i = 0; i < subGroup.length; i++) {

        var subGroupDiv = document.createElement("div");
        subGroupDiv.id = "subGroupDiv" + groupId + "_" + i;
        subGroupDiv.style.position = "absolute";
        subGroupDiv.style.top = 0 + "px";
        if(layout != "fullVertical")
        {
            if(i>0)
            {
                subGroupDiv.style.top = document.getElementById("subGroupDiv" + groupId + "_" + (i-1)).offsetTop + document.getElementById("subGroupDiv" + groupId + "_" + (i-1)).offsetHeight + 10 + "px";
            }
            else
            {
                if(groupId==3)
                {
                    subGroupDiv.style.top =  40 + "px";
                }
            }
        }
        if(layout == "fullVertical")
        {
            subGroupDiv.style.left = 180 * i + marginAll * i + "px";
            subGroupDiv.style.top =  0 + "px";
            var aYT = - preLength * 25 + 25 ;
            if(aYT==25) aYT = 29;
            if(groupId==3)
            {
                subGroupDiv.style.top =  aYT + "px";
            }
        }



        groupDiv.appendChild(subGroupDiv);
        var tab = subGroup[i].getElementsByTagName("tab");
        preLength = preLength + tab.length;
        for (var j = 0; j < tab.length; j++) {

            var btnName = $(tab[j]).attr("name");
            createButtonByName(btnName, subGroupDiv, subGroup, tab[j], i, j);
        }
    }
    footerName = "footer" + groupId;
    footer = document.createElement("div");
    footer.style.color = "#006699";
    footer.id = footerName;
    footer.style.position = 'relative';
    footer.style.top =  -6 + "px";
    footer.style.textAlign = "left";
    var diff = 200;
    if(layout!="full")
    {
        diff = 30;
    }
    footer.style.maxWidth = headerInfo[2] - diff + "px";
    if(groupId==0)    footer.style.width = headerInfo[2] - diff + "px";
    footer.innerHTML = group.getElementsByTagName("footer")[0].textContent;
    groupDiv.appendChild(footer);
    calcRelativeDiv(groupDiv);


    groupId++;
    loadChartAct();
};

function calcRelativeDiv(groupDiv) {

    var footerA = "footer"+groupId;
    if(groupId!=0)
    {
        var gName = "groupDiv0"//+(groupId-1)
       // console.log(groupId,document.getElementById(gName).offsetHeight,document.getElementById(gName).offsetTop)
    }

    var sub2 = _posChartY  + ySub + document.getElementById(footerA).offsetHeight + 10;
    //console.log(maxHeight,maxHeight)
    if(sub2 > maxHeight)
    {
        maxHeight = sub2;
    }
	if(layout=="ShrinkVertical")
	{
		_posChartY = sub2;
	}
	else
	{
        var sub = _posChartX + xSub + lastTabWidth + lastTabWidth + marginAll;
        if(sub > widthDocument)
        {
            _posChartY = maxHeight;
            if(layout=='fullVertical')
            {
                _posChartY = 314;
            }

            _posChartX = _defaultX + marginAll/2;
            return;
        }
		_posChartX = _posChartX + xSub + lastTabWidth + marginAll;
	}
}

var marginAll = 65 ;
var ySub = 0;
var lastTabWidth = 0;

createButtonByName = function (aName, subGroupDiv, subGroup, tabX, _i, _j) {
    var aHeight = $(subGroup).attr("tabHeight");
    var aWidth = $(subGroup).attr("tabWidth");
    var bgColor = $(tabX).attr("bgColor");
    var fontColor = $(tabX).attr("textColor");
    var buttonType = $(tabX).attr('link');
    var tabName = "tabS" + "_" + groupId + "_" + _i + "_" + _j;
    var tab = document.createElement("div");
    tab.id = tabName;
    tab.style.marginTop = "1px";
    tab.style.backgroundColor = bgColor;
    tab.style.color = fontColor;
    tab.style.alignmentBaseline = "middle";
    tab.className = "tabRoundRect";
    tab.style.width = aWidth;
    tab.style.height = aHeight;
    tab.style.left = xSub + 'px';
    tab.style.top = ySub + "px";
    tab.style.cursor = "pointer";
    var tTab = document.createElement('div')
    tTab.innerHTML = aName;
    tTab.style.marginTop = "2px";
    tab.appendChild(tTab);
    subGroupDiv.appendChild(tab);
    var popUpContent = tabX.getElementsByTagName("popUp")[0]
    //console.log(popUpContent)
    if (buttonType == 'true') {
        $("#" + tabName).bind('click',
            {name: tabName,oXml:popUpContent,oColor:bgColor,fColor:"#FFFFFF"}
        , loadPopup);
    }
    lastTabWidth = document.getElementById(tabName).offsetWidth;
    ySub = document.getElementById(tabName).offsetTop + document.getElementById(tabName).offsetHeight + 1;
};

function loadPopup(event)
{
    //console.log(event.data.name,event.data.oXml);
    createPopupMultiContent(event.data.oXml,event.data.oColor,event.data.fColor)
	/*createPopup('<p>Note:</p>',
				"#ff9900",
				'#ffffff',
				'<p>The molecular form with both the amino and the carboxyl groups in uncharged form does not exist when the amino acid is in solution.</p>',
				"#ffffff",
				'#000000',
				null,
				'240px',
				"Calibri 14px");*/
}
