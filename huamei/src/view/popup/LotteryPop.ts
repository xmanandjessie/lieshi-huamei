class LotteryPop extends PopView 
{
	private btnNext:egret.Bitmap;

	public constructor() 
	{
		super();
		this.init();
	}

	private init():void
	{
		this.initBg();
		this.initTitle();

		var desc = Global.createBitmapByName("lottery_desc_png");
		desc.x = (StageUtils.SW - desc.width >> 1) - 5;
		desc.y = 350;
		this.container.addChild(desc);

		this.btnNext = Global.createBitmapByName("btn_ok_png");
		this.btnNext.x = StageUtils.SW - this.btnNext.width >> 1;
		this.btnNext.y = StageUtils.SH - this.btnNext.height - 10;
		this.addChild(this.btnNext);

		this.btnNext.touchEnabled = true;
		this.btnNext.addEventListener(egret.TouchEvent.TOUCH_TAP,this.touchHandler,this);

		Global.setBut(this.btnNext);
	}

	private touchHandler():void
	{
		PopManager.hidePop("LotteryPop");
	}
}