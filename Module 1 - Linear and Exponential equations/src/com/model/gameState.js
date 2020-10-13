var preAsse = "PRE_ASSESMENT"
var postAsse = "POST_ASSESMENT"
var learningModule = "LEARNING_MODULE"
gameState = function(no)
{
	switch (no)
	{
		case 1:
			return preAsse;
			break;
		case 3:
			return postAsse;
			break;
		case 2:
			return learningModule;
			break;
	}
}