// JavaScript Document
var layout;
var ratioLayout;
function layoutRatio()
{
	if(widthDocument>=1024)
	{
		layout = "full";
	}
	else if(widthDocument>=675)
	{
		layout = "fullVertical"
	}
	else
	{
		layout = "ShrinkVertical";
		ratioLayout = widthDocument/1024;
	}
}