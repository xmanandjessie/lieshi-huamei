class ConfirmPop extends PopView
{
	private btnOK:egret.Bitmap;

	private btnReturn:egret.Bitmap;

	private icon:CustomImage;

	public constructor() 
	{
		super();
		this.init();
	}

	private init():void
	{
		this.initBg();

		var rewardBG = Global.createBitmapByName("reward_bg_png");
		rewardBG.x = StageUtils.SW - rewardBG.width >> 1;
		rewardBG.y = 300;
		this.container.addChild(rewardBG)

		this.btnOK = Global.createBitmapByName("btn_ok_png");
		this.btnOK.x = 90;
		this.btnOK.y = StageUtils.SH - 220;
		this.container.addChild(this.btnOK);

		this.btnReturn = Global.createBitmapByName("btn_return_png");
		this.btnReturn.x = StageUtils.SW - this.btnReturn.width - 90;
		this.btnReturn.y = StageUtils.SH - 220;
		this.container.addChild(this.btnReturn);

		this.btnOK.touchEnabled = true;
		this.btnReturn.touchEnabled = true;

		Global.setBut(this.btnOK);
		Global.setBut(this.btnReturn);

		this.btnOK.addEventListener(egret.TouchEvent.TOUCH_TAP,this.okTouchHandler,this);
		this.btnReturn.addEventListener(egret.TouchEvent.TOUCH_TAP,this.returnTouchHandler,this);
	}

	private okTouchHandler():void
	{
		PopManager.showPop("ExchangePop",this.data);
		PopManager.hidePop("ConfirmPop");
	}

	private returnTouchHandler():void
	{
		PopManager.hidePop("ConfirmPop");
	}

	public setData(data:any = null):void
	{
		this.data = data;
		if(data)
		{
			var self = this;
			this.icon = new CustomImage("resource/assets/reward/big/r"+data.id+".png",true,function(){
				self.icon.x = StageUtils.SW - self.icon.width >> 1;
				self.icon.y = 150;
			});
			this.container.addChild(this.icon);
		}
	}
}