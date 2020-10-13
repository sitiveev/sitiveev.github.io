// JavaScript Document
var _data;
var _index = 0;
var url;
function createPage()
{
	url = "src/assets/page"+currentPageId+"/page.xml";
	_data = parseXML(url);
}



loadPageContent = function (id,data)
{
	_index = id;
	_data = data;
	var currentData = $(this._data).find( "index" )[id];
	var type = $(currentData).attr('type');
	switch (type)
	{
		case 'audio': 
			createPageaudio(currentData);
		break;
        case "video":
            createVideoPage(currentData);
            break;
        case "3dInteractive":
            create3dPage(currentData);
        case "MCSS":
            createMCSSActivity(currentData);
            break;
	}
}