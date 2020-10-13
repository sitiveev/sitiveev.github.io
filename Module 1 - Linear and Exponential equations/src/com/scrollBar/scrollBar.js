function createScrollBar()
{
	$("#innerCont").mCustomScrollbar({
	scrollButtons:{
		set_width:"85%",
		enable:true
	},
	callbacks:{
		onScrollStart:function(){ OnScrollStart(); },
		onScroll:function(){ OnScroll(); },
		onTotalScroll:function(){ OnTotalScroll(); },
		onTotalScrollBack:function(){ OnTotalScrollBack(); },
		onTotalScrollOffset:40,
		onTotalScrollBackOffset:20,
		whileScrolling:function(){ WhileScrolling(); } 
		}
	});
	
	$(".innerCont a").click(function(e){
		e.preventDefault();
		var $this=$(this),
			rel=$this.attr("rel"),
			target=$this.parent().find("."+rel);
		target.add($this).toggleClass("hidden");
	});
}

function OnScrollStart(){
		console.log('game','ha')
	$(".innerContDiv .onScrollStart").stop(true,true).css("display","inline-block").delay(500).fadeOut(500);
}
function OnScroll(){
	$(".innerContDiv .onScroll").stop(true,true).css("display","inline-block").delay(500).fadeOut(500);
}
function OnTotalScroll(){
	$(".innerContDiv .onTotalScroll").stop(true,true).css("display","inline-block").delay(500).fadeOut(500);
}
function OnTotalScrollBack(){
	$(".innerContDiv .onTotalScrollBack").stop(true,true).css("display","inline-block").delay(500).fadeOut(500);
}
function WhileScrolling(){

	$(".innerContDiv .whileScrolling").stop(true,true).css("display","inline-block").fadeOut(500);
	$(".info .content-position").text(mcs.top);
	$(".info .dragger-position").text(mcs.draggerTop);
	$(".info .scroll-pct").text(mcs.topPct+"%");
}