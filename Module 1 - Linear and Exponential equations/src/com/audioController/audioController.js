var queueAudio = 0;
var displayStatus;
var audioRefPage,audioRefArray,audioRefIdArray;
loadAudioPage = function(pageRef,audioArr,audioIdArray,aDiv)
{
    audioArray = [];
    audioRefPage = pageRef;
    audioRefArray = audioArr;
    audioRefIdArray = audioIdArray;
    //alert(audioArr)
    if(audioArr.length == 0)
    {
        audioLoadedAll();
        return;
    }
    loadAudio(pageRef + "audio/" +audioArr[queueAudio],1,audioIdArray[queueAudio],aDiv);

}

function stopAllAudio()
{
    if(gameCurrentState==2)
    {
        for(var i=0;i<audioRefIdArray.length;i++)
        {
            var audio = document.getElementById(audioRefIdArray[i]);
            //audio.pause();
        }
        if(_globalCurrentAudio!="null")
        {
            _globalCurrentAudio.pause();
        }
        $("#audioParent").empty();
        audioPlayingOnPage = false;
        _globalCurrentAudio = "null";
    }

}

var _tempAno,_tempLength,statusPageLoad;

function playSound(audio,aNo,length,boolen,str,aDiv) {

    audio.play();
    _globalCurrentAudio = audio;
    _tempAno = aNo;
    _tempLength = length;
    statusPageLoad = boolen;
    audioPlayingOnPage = true;
    audio.addEventListener("ended", audioEnded, false);
}
var audioPlayingOnPage = false;
function audioEnded()
{
    audioPlayingOnPage = false;
    _globalCurrentAudio = "null"

    if(!statusPageLoad)
    {
        //alert(_tempAno+'ss'+_tempLength+'audioEneded');

        if(isMobile.iOS())
        {
            createTapButton(aDiv,false);
            return;
        }
        callNext(_tempAno,_tempLength,'null');

    }

}

var audioRefIdIOS;
var _globalCurrentAudio = "null";

function playAudioIOSSyncAudio(e)
{
    e.data.pObj.removeChild(btnCreateSound);
    audioPlayingOnPage = true;
    statusPageLoad = false;
    callNext(_tempAno,_tempLength,'null');
    var currentAudiotemp = document.getElementById(audioRefIdIOS);
    currentAudiotemp.play();
    _globalCurrentAudio = currentAudiotemp;
    currentAudiotemp.addEventListener("ended", audioEnded, false);
}
function playAudioIOS(e) {

    //alert(_tempAno+" sa "+ _tempLength)
    e.data.pObj.removeChild(btnCreateSound);
    audioLoadedAll();
    audioPlayingOnPage = true;
    statusPageLoad = false;
    var currentAudiotemp = document.getElementById(audioRefIdIOS);
    currentAudiotemp.play();
    _globalCurrentAudio = currentAudiotemp;
    currentAudiotemp.addEventListener("ended", audioEnded, false);
}
var btnCreateSound;
function createTapButton(aDiv,bool) {

    $("#PreLoader").css("visibility","hidden");
    btnCreateSound = document.createElement('div');
    aDiv.appendChild(btnCreateSound);
    btnCreateSound.style.position = "relative";
    btnCreateSound.style.zIndex = "16";
    btnCreateSound.style.cursor = "pointer";
    btnCreateSound.innerHTML = '<div style="position: absolute"><img src="src/assets/gui/taptoview.png"></div>'
    if(bool)
        $(btnCreateSound).bind('click',{pObj:aDiv},playAudioIOS)
    else
        $(btnCreateSound).bind('click',{pObj:aDiv},playAudioIOSSyncAudio)

    $(".scrollablePage").customScrollbar();
    $(".scrollablePage").customScrollbar("scrollTo", $(btnCreateSound));
}
var currentIOSAudioNo = 0;
function audioloaded(aDiv){
    queueAudio++;
    //alert(queueAudio)
    if(queueAudio < audioRefArray.length)
    {
        loadAudio(audioRefPage + "audio/" +audioRefArray[queueAudio],1,audioRefIdArray[queueAudio],aDiv);
    }
    else
    {
        //$("#PreLoader").css('visibility',"hidden");
        queueAudio = 0;
        if(isMobile.iOS())
        {
            createTapButton(aDiv,true);
            //audioLoadedAll();
        }
        else
        {
            audioLoadedAll();
        }

    }

}

var support = {};
function audioSupport() {
    var a = document.createElement('audio');
    var ogg = !!(a.canPlayType && a.canPlayType('audio/ogg; codecs="vorbis"').replace(/no/, ''));
    if (ogg) return 'ogg';
    var mp3 = !!(a.canPlayType && a.canPlayType('audio/mpeg;').replace(/no/, ''));
    if (mp3) return 'mp3';
    else return 0;
}

var audioArray = [];
var currentAudio = null;
function loadAudio(url, vol,audioId,aDiv){

    var audioUrl = url + "." + audioSupport();
    var subStr;

    if(audioSupport()!='ogg')
    {
        subStr = '<source src="'+audioUrl+'" type="audio/mpeg">'
    }
    else
    {
        subStr = '<source src="'+audioUrl+'" type="audio/ogg">'
    }

    var strAudio = '<audio class="pageAudio" id="'+ audioId +'" onloadeddata="audioloaded()">'+ subStr +'</audio>';

    $("#audioParent").append(strAudio);
    //$("#"+audioId).load();

    currentAudio = document.getElementById(audioId)
    if(isMobile.iOS()){
        currentIOSAudioNo = 0;
        audioloaded(aDiv);
    }
    $(currentAudio).bind("loadstart", function(e) {


    })

}
