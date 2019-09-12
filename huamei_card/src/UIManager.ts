class UIManager extends egret.DisplayObjectContainer 
{
	public static _instance:UIManager;

	public static get instance():UIManager
	{
		if(!UIManager._instance)
		{
			UIManager._instance = new UIManager();
		}
		return UIManager._instance;
	}

	public mainUILayer:egret.DisplayObjectContainer;

	public popLayer:egret.DisplayObjectContainer;

	public topLayer:egret.DisplayObjectContainer;

	public constructor()
	{
		super();
		
		this.initLayer();
	}

	private initLayer():void
	{
		this.mainUILayer = new egret.DisplayObjectContainer();
		this.addChild(this.mainUILayer);

		this.popLayer = new egret.DisplayObjectContainer();
		this.addChild(this.popLayer);

		this.topLayer = new egret.DisplayObjectContainer();
		this.addChild(this.topLayer);
	}

	public initBg():void
	{
		var bg = new CustomImage("resource/assets/asyn/loading_bg.png");
        this.mainUILayer.addChild(bg);
	}

	public initProBg():void
	{
		var car = Global.createBitmapByName("car_png");
        car.anchorOffsetX = car.width >> 1;
        car.anchorOffsetY = car.height >> 1;
		car.scaleX = car.scaleY = 0.5;
        
        car.x = 200;
        car.y = StageUtils.SH - car.height + 200;
        this.mainUILayer.addChild(car);

         var carButtom = Global.createBitmapByName("car_buttom_png");
        carButtom.x = car.x - 68.5 / 2;
        carButtom.y = car.y - 12.5 / 2;
		carButtom.scaleX = carButtom.scaleY = 0.5;
        this.mainUILayer.addChild(carButtom);

        egret.Tween.get(car,{loop:true}).to({rotation:360},5000);

		var lou1 = Global.createBitmapByName("lou1_png");
        lou1.x = -150;
        lou1.y = StageUtils.SH - lou1.height / 2;
		lou1.scaleX = lou1.scaleY = 0.5;
        this.mainUILayer.addChild(lou1);

        var lou2 = Global.createBitmapByName("lou2_png");
        lou2.x = lou1.x + lou1.width / 2 + 40;
        lou2.y = StageUtils.SH - lou2.height / 2;
		lou2.scaleX = lou2.scaleY = 0.5;
        this.mainUILayer.addChild(lou2);

        var lou3 = Global.createBitmapByName("lou3_png");
        lou3.x = lou2.x + lou2.width / 2;
        lou3.y = StageUtils.SH - lou3.height / 2;
		lou3.scaleX = lou3.scaleY = 0.5;
        this.mainUILayer.addChild(lou3);

		var deng = Global.createBitmapByName("deng_png");
		deng.x = StageUtils.SW - deng.width / 2 - 10;
		deng.y = StageUtils.SH - deng.height / 2 - 35;
		deng.anchorOffsetX = 69;
		deng.scaleX = deng.scaleY = 0.5;
		this.mainUILayer.addChild(deng);
		egret.Tween.get(deng,{loop:true}).to({rotation:8},500).to({rotation:0},500).to({rotation:-8},500).to({rotation:0},500);
	}

	private gameView:Game;

	private playView:Play;

	// private shareRewardView:ShareRewardView;

	public initGameView():void
	{
		if(this.playView && this.playView.parent)
		{
			this.mainUILayer.removeChild(this.playView);
			this.playView = null;
		}
		if(this.gameView && this.gameView.parent)
		{
			this.mainUILayer.removeChild(this.gameView);
			this.gameView = null;
		}
		this.gameView = new Game();
		this.mainUILayer.addChild(this.gameView);
	}

	public initPlayView():void
	{
		if(this.playView && this.playView.parent)
		{
			this.mainUILayer.removeChild(this.playView);
			this.playView = null;
		}
		if(this.gameView && this.gameView.parent)
		{
			this.mainUILayer.removeChild(this.gameView);
			this.gameView = null;
		}
		this.playView = new Play();
		this.mainUILayer.addChild(this.playView);
	}

	// public initShareRewardView():void
	// {
	// 	if(this.rewardView && this.rewardView.parent)
	// 	{
	// 		this.mainUILayer.removeChild(this.rewardView);
	// 		this.rewardView = null;
	// 	}
	// 	if(this.gameView && this.gameView.parent)
	// 	{
	// 		this.mainUILayer.removeChild(this.gameView);
	// 		this.gameView = null;
	// 	}
	// 	if(this.shareRewardView && this.shareRewardView.parent)
	// 	{
	// 		this.mainUILayer.removeChild(this.shareRewardView);
	// 		this.shareRewardView = null;
	// 	}
	// 	this.shareRewardView = new ShareRewardView();
	// 	this.mainUILayer.addChild(this.shareRewardView);
	// }

	public setCustomText(str):void
	{
		this.gameView.setCustomText(str);
	}

	public showText():void
	{
		var txt = new egret.TextField();
        // this.txtContent3.textAlign = egret.HorizontalAlign.CENTER;
		txt.text = "长按图片保存或转发给好友";//"蒸蒸日上\n阖家安康";
        // txt.size = this.size;
        txt.fontFamily = "黑体";
		txt.textColor = 0x2f2f2f;
		txt.x = StageUtils.SW - txt.textWidth >> 1;
		txt.y = StageUtils.SH - 300;
		this.parent.addChild(txt);
	}
}