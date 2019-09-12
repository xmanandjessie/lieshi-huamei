class IqiyiPop extends PopView 
{
	private btnNext:egret.Bitmap;

	public constructor() 
	{
		super();
		this.init();
	}

	private init():void
	{
		var bg = new CustomImage("resource/assets/async/iqiyi_tiaozhuan.png");
		bg.x = StageUtils.SW - 499 >> 1;
		bg.y = StageUtils.SH - 734 >> 1;
		this.addChild(bg);

		this.btnNext = Global.createBitmapByName("btn_ok_png");
		this.btnNext.x = StageUtils.SW - this.btnNext.width >> 1;
		this.btnNext.y = StageUtils.SH - this.btnNext.height - 200;
		this.addChild(this.btnNext);

		this.btnNext.touchEnabled = true;
		this.btnNext.addEventListener(egret.TouchEvent.TOUCH_TAP,this.touchHandler,this);

		Global.setBut(this.btnNext);
	}

	private touchHandler():void
	{
		if(this.data)
		{
			window.location.href = Main.IQIYI;
		}else
		{
			PopManager.hidePop("IqiyiPop");
		}
	}

	public setData(data:any):void
	{
		this.data = data;
		if(data)
		{
			
		}
	}
}