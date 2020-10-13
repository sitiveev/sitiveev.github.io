// JavaScript Document

var _dataPreAssement;

var _quePreAssement = 0;

function loadPreAssesment()
{
    if(gameCurrentState==3)
    {
        _dataPreAssement = parseXML("src/assets/postassesment/postAssessment.xml");
        return;
    }
	_dataPreAssement = parseXML("src/assets/preassesment/preAssessment.xml");
}

loadPreAssementContent = function (id,data)
{
	_dataPreAssement = data;
	_quePreAssement = id;

	var currentData = $(this._dataPreAssement).find( "data" );
	var allQuestion = $(currentData).find( "questions" );

    loadQuestionsPreAssesment();
    $("#PreLoader").css('visibility',"hidden");
    return;


	
}

var preAssesmentAnswerExpected = [];
var preAssesmentAnswerGiven = [];
var preAssesmentAnswerGivenIndex = [];

loadQuestionsPreAssesment = function ()
{
	removePreviousObject();
	var currentData = $(this._dataPreAssement).find( "data" );
	var allQuestion = $(currentData).find( "questions" );
	loadQuestion(_quePreAssement,allQuestion);

}

function removePreviousObject()
{
    $("#innerCont").empty();
	$("#mcCont").unbind("click");
}

var dataLoadedOnPreAssesment = [];

addBG = function(bgSRC)
{
	addNormalImages(bgSRC,widthDocument-(widthDocument*1/100),heightDocument,0,"doneSave")
	//addNormalImages("src/assets/preassesment/images/mcBtnSet.png",widthDocument-(widthDocument/100),heightDocument,0,"saveData");
}
