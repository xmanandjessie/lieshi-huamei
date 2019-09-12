class SubmitEndPop extends PopView 
{
	public constructor() 
	{
		super();
		this.init();
	}

	private init():void
	{
		this.initBg();
		this.initClose();

		var title = Global.createBitmapByName("icon_png");
		title.scaleX = title.scaleY = 0.8;
        title.x = (StageUtils.SW - title.width >> 1) + 38;
        title.y = 150;
        this.container.addChild(title);

		var ren = Global.createBitmapByName("ren_png");
        ren.x = 50;
        ren.y = 280;
        

        var hands = Global.createBitmapByName("hands_png");
        hands.anchorOffsetX = 7;
        hands.anchorOffsetY = 38;
        hands.x = ren.x + 100;
        hands.y = ren.y + 70;

		ren.scaleX = ren.scaleY = hands.scaleX = hands.scaleY = 0.5;

        this.container.addChild(hands);
        this.container.addChild(ren);

		var title = Global.createBitmapByName("submit_end_title_png");
		title.x = StageUtils.SW - title.width >> 1;
		title.y = 370;
		this.container.addChild(title);
	}

	protected closeTouchHandler():void
	{
		PopManager.hidePop("SubmitEndPop");
		if(this.data && this.data != -1)
		{
			UIManager.instance.initRewardView();
		}
	}

	public setData(data:any):void
	{
		this.data = data;
		if(data)
		{
			if(data == -1)
			{
				//抽奖
				var bg = new CustomImage("resource/assets/async/submit_end_1.png");
				bg.x = StageUtils.SW - 396 >> 1;
				bg.y = 450;
				this.container.addChild(bg);
				var ok = new CustomImage("resource/assets/async/submit_end_ok.png");
				ok.x = StageUtils.SW - 206 >> 1;
				ok.y = 660;
				this.container.addChild(ok);
			}else
			{
				//实物
				if(data.rt == 0)
				{
					var bg = new CustomImage("resource/assets/async/submit_end_1.png");
					bg.x = StageUtils.SW - 396 >> 1;
					bg.y = 450;
					this.container.addChild(bg);
					var ok = new CustomImage("resource/assets/async/submit_end_ok.png");
					ok.x = StageUtils.SW - 206 >> 1;
					ok.y = 660;
					this.container.addChild(ok);
				}else
				{
					var bg = new CustomImage("resource/assets/async/submit_end_2.png");
					bg.x = StageUtils.SW - 440 >> 1;
					bg.y = 450;
					this.container.addChild(bg);

					var ok = new CustomImage("resource/assets/async/submit_end_ok.png");
					ok.x = StageUtils.SW - 206 >> 1;
					ok.y = 660;
					this.container.addChild(ok);
				}
				
			}
		}
	}
}