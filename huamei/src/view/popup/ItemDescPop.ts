class ItemDescPop extends PopView
{
	private btnOK:egret.Bitmap;

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

		this.btnOK = Global.createBitmapByName("btn_return_png");
		this.btnOK.x = StageUtils.SW - this.btnOK.width >> 1;
		this.btnOK.y = StageUtils.SH - 220;
		this.container.addChild(this.btnOK);

		this.btnOK.touchEnabled = true;

		Global.setBut(this.btnOK);

		this.btnOK.addEventListener(egret.TouchEvent.TOUCH_TAP,this.okTouchHandler,this);
	}

	private okTouchHandler():void
	{
		PopManager.hidePop("ItemDescPop");
	}

	public setData(data:any = null):void
	{
		this.data = data;
		if(data)
		{
			var self = this;
			this.icon = new CustomImage("resource/assets/item_desc/i"+data.id+".png",true,function(){
				self.icon.x = StageUtils.SW - self.icon.width >> 1;
				self.icon.y = 150;
			});
			this.container.addChild(this.icon);
		}
	}
}