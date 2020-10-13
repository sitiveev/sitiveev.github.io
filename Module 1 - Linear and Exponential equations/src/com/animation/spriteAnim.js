function playAnimation()
{
	var ss = new createjs.SpriteSheet({
		"animations":
		{
			"run": [0, 22, "jump"],
			"jump": [26, 60, "run"]},
			"images": ["src/assets/page1/anim/anim1.png"],
			"frames":
				{
					"height": 379,
					"width":427,
					"regX": 0,
					"regY": 0,
					"count": 60
				}
		});

	var grant = new createjs.Sprite(ss, "run");
	grant.x = 360;
	grant.y = 22;
	// Add Grant to the stage, and add it as a listener to Ticker to get updates each frame.
	stage.addChild(grant);
	createjs.Ticker.setFPS(24);
	createjs.Ticker.addEventListener("tick", stage);
}