class ActivityDescPop extends PopView
{
	private btnConfrim:egret.Bitmap;

	private desc:CustomImage;

	private scroll:CustomScrollView;

	public constructor()
	{
		super();
		this.init();
	}

	private init():void
	{
		this.initBg();

		egret.Tween.removeTweens(this.container);

		var icon = Global.createBitmapByName("icon_png");
		icon.x = (StageUtils.SW - icon.width >> 1) + 38;
		icon.y = 140;
		icon.scaleX = icon.scaleY = 0.8;
		this.container.addChild(icon);

		this.btnConfrim = Global.createBitmapByName("btn_ok_png");
		this.btnConfrim.x = StageUtils.SW - this.btnConfrim.width >> 1;
		this.btnConfrim.y = StageUtils.SH - this.btnConfrim.height - 26;
		this.container.addChild(this.btnConfrim);

		this.btnConfrim.touchEnabled = true;
		Global.setBut(this.btnConfrim);

		this.btnConfrim.addEventListener(egret.TouchEvent.TOUCH_TAP,this.touchHandler,this);
	}

	private touchHandler():void
	{
		if(this.data == 1)
		{
			//抽奖
			if(RewardManager.instance.name)
			{
				Global.showTips("您已提交过信息\r系统会自动核实并直接发放奖励");
			}else
			{
				PopManager.showPop("SubmitPop",-1);
			}

			PopManager.hidePop("ActivityDescPop");
		}else
		{
			//活动
			PopManager.hidePop("ActivityDescPop");
		}
	}

	public setData(data:any):void
	{
		this.data = data;
		if(data == 1)
		{
			//抽奖
			var title = Global.createBitmapByName("lottery_title_png");
			title.x = StageUtils.SW - title.width >> 1;
			title.y = 360;
			this.container.addChild(title);

			this.desc = new CustomImage("resource/assets/async/lottery_desc.png");
			this.desc.x = StageUtils.SW - 438 >> 1;
			this.desc.y = 450;
			this.container.addChild(this.desc);
		}else
		{
			//规则
			var title = Global.createBitmapByName("activity_title_png");
			title.x = StageUtils.SW - title.width >> 1;
			title.y = 360;
			this.container.addChild(title);

			this.scroll = new CustomScrollView();
			this.scroll.containerHeight = 440;
			this.scroll.y = 450;
			this.container.addChild(this.scroll);

			this.desc = new CustomImage("resource/assets/async/activity_desc.png");
			this.desc.x = StageUtils.SW - 441 >> 1;
			this.scroll.addItem(this.desc,false);

			var arrow = Global.createBitmapByName("arrow_png");
			arrow.x = StageUtils.SW - arrow.width >> 1;
			arrow.y = StageUtils.SH - arrow.height - 111;
			this.container.addChild(arrow);

			var rect = new egret.Rectangle(0,0,640,440);
			this.scroll.mask = rect;
		}
	}
}