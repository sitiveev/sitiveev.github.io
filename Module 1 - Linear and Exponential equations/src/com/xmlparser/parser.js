parseXML=function (str)
{
	$.ajax({
			type: "GET",
			crossDomain: true,
			url: encodeURI(str),
			dataType: "xml",
			success: initMenu
		});
}

initMenu = function(data)
{
	dataLoaded(data);
}

getElementsByAttribute=function(d,e)
{for(var c=[],b=document.getElementsByTagName("*"),a=0,f=b.length;a<f;a++)b[a].hasAttribute(d)&&(e?b[a].getAttribute(d)===e&&c.push(b[a]):c.push(b[a]));return c};