// Add Qustion 
var _allQuestionSet;
var _currentQueId;
var totalQuestionPreAssesment = 10;
loadQuestion = function(id,allQuestion)
{
	_currentQueId = id;
	_allQuestionSet = allQuestion;
    var allQueSet =  $(_allQuestionSet).find( "question" );
    totalQuestionPreAssesment = allQueSet.length;
    if(_currentQueId==totalQuestionPreAssesment)
    {
        addQuestion(true);
    }
    else
    {
        addQuestion(false)
    }

}

function addQuestion(resultPage)
{
    var allQueSet =  $(_allQuestionSet).find( "question" );
    var qDiv = document.createElement('div');
    qDiv.className = "default-skin";
    qDiv.style.height = heightDocument - headerInfo[3] - footerInfo[3] + "px";
    //qDiv.style.padding = 10 + "px";
    qDiv.style.fontFamily = "calibriregular"
    addContent(qDiv);
    if(resultPage)
    {
        createResultPage(qDiv,_allQuestionSet);
        return;
    }
    totalQuestionPreAssesment = allQueSet.length;
	var currentQusetion = allQueSet[_currentQueId];
    //console.log(currentQusetion)
	var type = $(currentQusetion).attr('type');

	switch (type)
	{
		case 'MCSS':
            createPreMCSSAct(currentQusetion,qDiv);
		break;
        case 'MCMS':
            createPreMCMSActivity(currentQusetion,qDiv);
        break;
	}
}

function loadNextQuestion()
{
    $("#innerCont").empty();
    var aBool = false;
    //console.log(_currentQueId,totalQuestionPreAssesment)
    if(_currentQueId <= totalQuestionPreAssesment)
    {
        if(_currentQueId == totalQuestionPreAssesment)
            aBool = true;
        addQuestion(aBool);

    }
    else
    {
        _currentQueId = 0
        gameCurrentState = 2;
        $("#PreLoader").css('visibility',"visible")
        loadPageAfterPre();
    }

}