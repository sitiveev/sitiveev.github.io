function add3DImage(aDiv) {
    var pageInfoText = $(_pageInfo).find( "screenText" )[0];
    var linkName = $(pageInfoText).attr('pageRef') + "anim/";//"src/assets/page1/anim/"
    var imgDiv = $(page)
    transTextDiv.innerHTML = $(pageInfoText).text();
    //$("#transScriptDiv").customScrollbar();
    $(".scrollablePage").customScrollbar();
    $("#PreLoader").css('visibility',"hidden");
    createEditableField(pDiv);
    $(".textHigh").textHighlighter({color: '#FF6666'});
}
create3dPage = function (pageInfo) {
    _pageInfo = pageInfo;
    aDiv = document.createElement("div");
    aDiv.id = "contDiv" + currentPageId;
    aDiv.className = "overview printable";
    aDiv.style.paddingLeft = 10 + "px";
    aDiv.style.height = heightDocument - headerInfo[3] - footerInfo[3];



    addContent(aDiv);


    add3DImage(aDiv);
    addVideoEvents();
}



/**
 * Created by admin on 29/5/14.
 */

createVideoPage = function (pageInfo) {
    _pageInfo = pageInfo;
    aDiv = document.createElement("div");
    aDiv.id = "contDiv" + currentPageId;
    aDiv.className = "overview printable";
    aDiv.style.paddingLeft = 10 + "px";
    aDiv.style.height = heightDocument - headerInfo[3] - footerInfo[3];



    addContent(aDiv);


    addVideo(aDiv,aDiv.id);

}
var colorRandom = ["#FE6566","#83B0FF","#5555fc"];

function close3dpop(event) {
    var contentArea = document.getElementById('3dpopup');
    var dpopup = event.data.rObject;
    contentArea.removeChild(dpopup);
    contentArea.style.visibility = "hidden";
}
var thumbWidth = 100, thumbHeight = 75;
function createThumbnail(string,tGrid,pageRef, imageSrc,thumbCount) {
    var thimbDiv = document.createElement('div');
    thimbDiv.style.border = "1px solid #e6e6e6";
    thimbDiv.style.margin = "5px";
    thimbDiv.style.position = "relative";
    $('<img src="'+ string +'">').load(function() {
        $(this).appendTo(thimbDiv);
        $(this).width(thumbWidth);
        $(this).height(thumbHeight);
        tGrid.appendChild(thimbDiv);
        thumbCount++;
        if(thumbCount<5)
        {
            createThumbnail(pageRef+"image/"+imageSrc[thumbCount*8],tGrid,pageRef, imageSrc,thumbCount);
        }
        thimbDiv.style.boxShadow = "0px 0px 4px #737373"
    });
}

function createThumbdiv(tGrid,pageRef, imageSrc,thumbCount) {
    createThumbnail(pageRef+"image/"+imageSrc[thumbCount],tGrid,pageRef, imageSrc,thumbCount);
}
function add3dImage(string, tGrid, pageRef, imageSrc, thumbCount,w,h) {
    var thimbDiv = document.createElement('div');
    thimbDiv.style.position = "absolute";
    thimbDiv.id = "3d_"+thumbCount;
    $('<img src="'+ string +'">').load(function() {
        $(this).appendTo(thimbDiv);
        $(this).width((h-40)*4/3);
        $(this).height(h-40 );
        tGrid.appendChild(thimbDiv);
        if(thumbCount>0)
        {
            $("#3d_"+(thumbCount-1)).css("visibility","hidden")
        }
        thumbCount++;
        if(thumbCount<imageSrc.length)
        {
            add3dImage(pageRef+"image/"+imageSrc[thumbCount],tGrid,pageRef, imageSrc,thumbCount,w,h);
        }
        else
        {
            $("#PreLoader").css('visibility',"hidden");
            add3dRotation((h-40)*4/3,h-40)
        }
        tGrid.style.left = thumbWidth + (w - (h-40)*4/3)/2 + "px";
        tGrid.style.height=(h-40)+"px";
        tGrid.style.width = (h-40)*4/3 + 'px'
        tGrid.style.border = "1px solid #e6e6e6";
        tGrid.style.boxShadow = "0px 0px 4px #737373"
    });


}
function add3dRotation(w,h)
{
    var pic_X=$('#interactiveDiv').offset().left;
    var pic_Y=$('#interactiveDiv').offset().top;
    var pic_W=w;
    var pic_H=h;
    var center_X=pic_X+pic_W;
    var center_Y=pic_Y+pic_H;
    var movestop=pic_W/19;
    console.log(pic_H,pic_W,pic_X,pic_Y)
    $('#interactiveDiv').mousemove(function(event){
        var mouse_X=event.pageX;
        var mouse_Y=event.pageY;
        if(mouse_X-center_X<=0){
            moveImg(mouse_X,mouse_Y,'left')
        }else{
            moveImg(mouse_X,mouse_Y)
        }
    });
    function moveImg(m_X,m_Y,dir){
        var index=Math.ceil(Math.abs(m_X-center_X)/movestop);
        console.log(index)
        for(var i=0;i<36;i++)
        {
            $("#3d_"+i).css('visibility',"hidden");
        }
        if(dir){
            index = index;
            //$('.list li').eq(index).show().siblings().hide();
        }else{
            index = 18-index;
            //$('.list li').eq(18-index).show().siblings().hide();
        }
        $("#3d_"+index).css('visibility',"visible")
    }

}
function create3ddiv(tGrid, pageRef, imageSrc, thumbCount,w,h) {
    add3dImage(pageRef+"image/"+imageSrc[thumbCount],tGrid,pageRef, imageSrc,thumbCount,w,h);
}
function create3dPopup(event) {
    var contentArea = document.getElementById('3dpopup');
    var bgPopUp = document.createElement('div');
    bgPopUp.className = "tabRoundRectZero";
    bgPopUp.style.backgroundColor = "rgba(0,0,0,0.4)";
    var dPopup = document.createElement('div');
    dPopup.style.backgroundColor = "rgba(255,255,255,0.95)";
    $("#PreLoader").css('visibility',"visible");
    var tempHeight = heightDocument-headerInfo[3]-footerInfo[3], tempWidth = headerInfo[2];
    if(tempHeight<500)
    {
        tempHeight = heightDocument;
    }
    bgPopUp.style.width = tempWidth + "px";
    bgPopUp.style.height = tempHeight + "px";
    dPopup.style.height = tempHeight -40 + 'px';
    dPopup.style.width = tempWidth -40 + 'px';
    dPopup.style.left = dPopup.style.top = 20 + "px";
    dPopup.className = "tabRoundRectZero";
    dPopup.style.zIndex = 16;
    contentArea.appendChild(bgPopUp);
    bgPopUp.appendChild(dPopup);
    contentArea.style.visibility = "visible";
    var xClose = document.createElement('div');
    xClose.id = "xClose";
    xClose.innerHTML = '&#215';
    xClose.className = "selectableNone closeButton";
    xClose.style.position = "absolute";
    xClose.style.right = 10+"px";
    dPopup.appendChild(xClose);
    var nameDiv = document.createElement('div');
    nameDiv.innerHTML = event.data.name;
    nameDiv.style.fontFamily = "calibribold";
    nameDiv.style.fontSize = "16px";
    dPopup.appendChild(nameDiv);
    nameDiv.style.left = nameDiv.style.top = "10px";
    nameDiv.style.position = "absolute";
    $('#xClose').bind('click',{rObject:bgPopUp},close3dpop);
    var tGrid = document.createElement('div');
    tGrid.style.position = "absolute";
    tGrid.style.top = "32px";
    dPopup.appendChild(tGrid);
    createThumbdiv(tGrid,event.data.pageRef,event.data.imageSrc,0);
    var interactiveDiv = document.createElement('div');
    interactiveDiv.id = "interactiveDiv";

    interactiveDiv.style.position = "absolute";
    interactiveDiv.style.top = "20px";
    interactiveDiv.style.left = thumbWidth+10+"px";
    dPopup.appendChild(interactiveDiv);
    create3ddiv(interactiveDiv,event.data.pageRef,event.data.imageSrc,0,tempWidth - thumbWidth -60,tempHeight - 40);
}
function add3dPopupLink(pDiv,pageInfo) {
    var popParent = document.createElement('div');
    pDiv.appendChild(popParent);
    var popInfo = $(_pageInfo).find( "popUpLink");
    var popCount = $(_pageInfo).find( "popUpLink").length;
    for(var a=0;a<popCount;a++)
    {
        var colorNo = Math.floor(Math.random()*colorRandom.length);
        var popId = "popLink_" + currentPageId + "_" + a;
        var popDiv = document.createElement('div');
        popDiv.className = "tabRoundRect";
        popDiv.style.position = "relative"
        popDiv.style.display = "inline-block"
        popDiv.style.marginRight = "10px";
        popDiv.style.marginBottom = "10px";
        popDiv.style.padding = "10px";
        popDiv.id = popId;
        popDiv.style.backgroundColor = colorRandom[colorNo];
        //popDiv.style.width = "100px";
        popDiv.style.height = "25px";
        popDiv.style.zIndex = 16;
        popDiv.innerHTML = $(popInfo).attr("name");
        popParent.appendChild(popDiv);
        $("#"+popId).bind('click',{name:$(popInfo).attr("name"),pageRef:$(popInfo).attr("pageRef"),imageSrc:$(popInfo).attr("images").split(",")},create3dPopup);
    }

}
function addVideo(pDiv,pageInfo,no,interactive,vidNo)
{
    var pageInfoText = $(pageInfo).find( "screenText" )[vidNo];
    var linkName = $(pageInfoText).attr('pageRef') + "anim/";//"src/assets/page1/anim/"
    var videoName = $(pageInfoText).attr('video');//"Disaccharides_03"
    var aName = linkName + videoName;
    //console.log(pageInfo,pageInfoText,"lll")
    var id = "video";
    var aHeight = 540;
    var aWidth = 720;
    //var ratio = no/(headerInfo[2]-40);
    if(aWidth>=headerInfo[2])
    {
        aWidth = headerInfo[2]-20;
    }
    else
    {

        aWidth = no - 10 ;
    }
    aHeight = (no - 10) * .75 ;
    var docVidHeight = heightDocument - headerInfo[3] - footerInfo[3];


    var videoDiv = document.createElement('div');
    videoDiv.id = "videoPlayerDiv";
    videoDiv.style.position = "relative";
    videoDiv.style.zIndex = "16";
    videoDiv.style.display = "inline-block";
    videoDiv.style.left = 10 + "px";
    var vidId = "video_" + currentPageId;
    var aStr = '<video class="mejs-ted" width="'+aWidth+'" height="'+aHeight+'" id="'+ vidId +'" poster="'+aName+'.png" controls="controls" preload="auto"><source type="video/mp4" src="'+aName+'.mp4" /><source type="video/webm" src="'+aName+'.webm" /><source type="video/ogg" src="'+aName+'.ogv" /><img src="'+aName+'.png" width="640" height="480" alt="Here we are"      title="No video playback capabilities" /></video>'
    pDiv.style.width = headerInfo[2];
    pDiv.appendChild(videoDiv);
    $("#videoPlayerDiv").append(aStr);
    update_mathjax();
    $('audio,video').mediaelementplayer({
        success: function(player, node) {
            $('#' + node.id + '-mode').html('mode: ' + player.pluginType);
            player.addEventListener('ended', function(e) {

            }, false);
        }
    });
    if(interactive)
    {

    }
}


