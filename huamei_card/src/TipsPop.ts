class TipsPop extends PopView
{
	private btnNext:egret.Bitmap;

	public constructor() 
	{
		super();

		var bg = Global.createBitmapByName("pop_bg2_png");
		bg.x = StageUtils.SW - bg.width >> 1;
		bg.y = StageUtils.SH - bg.height >> 1;
		this.addChild(bg);

		var bg1 = Global.createBitmapByName("pop_bg3_png");
		bg1.x = 400;
		bg1.y = 100;
		this.addChild(bg1);

		
		this.touchEnabled = true;
		this.addEventListener(egret.TouchEvent.TOUCH_TAP,this.nextHandler,this);
	}

	private nextHandler():void
	{
		// UIManager.instance.showText();
		PopManager.hidePop("TipsPop");
		// $(".wx").show();
	}
}