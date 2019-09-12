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

		this.btnNext = Global.createBitmapByName("btn_zhidao_png");
		this.btnNext.x = StageUtils.SW - this.btnNext.width >> 1;
		this.btnNext.y = 650;
		this.addChild(this.btnNext);
		this.btnNext.touchEnabled = true;
		this.btnNext.addEventListener(egret.TouchEvent.TOUCH_TAP,this.nextHandler,this);
		Global.setBut(this.btnNext);
	}

	private nextHandler():void
	{
		// UIManager.instance.showText();
		PopManager.hidePop("TipsPop");
		// $(".wx").show();
	}
}