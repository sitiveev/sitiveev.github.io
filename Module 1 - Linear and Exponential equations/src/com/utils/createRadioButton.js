// JavaScript Document

createInput = function(currentQuestion)
{
	var stem = $(currentQuestion).find("stem").text();
	var allOptions = $(currentQuestion).find("options");
	var cont =  document.getElementById("mcCont");
	var ele = document.createElement("ol");
	ele.setAttribute("id","selectable");
	ele.innerHTML = stem;
	
	cont.appendChild(ele);
	ele.style.position = "absolute"
	ele.style.top = "10px";
	ele.style.left = "10px";
	var i = 0;
	var len = $(allOptions).find("option").length;
	while (i < len)
	{
		var grpEle = document.createElement("li");
		grpEle.setAttribute("class","ui-widget-content");
		var option = $(allOptions).find("option")[i];
		grpEle.innerHTML = $(option).text();
		ele.appendChild(grpEle);
		i++;
	}
	$(function() {
    $( "#selectable" ).selectable();
  });
  
  
}