class PayOKPop extends PopView
{
	public constructor()
	{
		super();
	}

	private htmlCode:QRCode;

	public setData(data):void
	{
		super.setData(data);

		var bg = new CustomImage("resource/assets/asyn/pay_complete_bg.png",true,()=>{
			bg.width = StageUtils.SW;
			bg.height = StageUtils.SH;
		});
		this.addChild(bg);

		var btn = Global.createBitmapByName("btn_complete_png");
		btn.x = StageUtils.SW - btn.width >> 1;
		btn.y = 300;
		this.addChild(btn);
		Global.setBut(btn);
		btn.addEventListener(egret.TouchEvent.TOUCH_TAP,this.btnHandler,this);

		var txtPrice = new egret.TextField();
		txtPrice.width = 400;
		txtPrice.textAlign = egret.HorizontalAlign.CENTER;
		txtPrice.x = StageUtils.SW - 400 >> 1;
		txtPrice.y = 175;
		txtPrice.textColor = 0xffffff;
		txtPrice.size = 40;
		this.addChild(txtPrice);
		txtPrice.text = "￥"+data.price;

		this.htmlCode = new QRCode("resource/assets/asyn/pay_send_ok_code.png");
		this.htmlCode.setPosition(70, 433, 171, 175);
		this.htmlCode.showHtmlCode();
	}

	private btnHandler():void
	{
		if(this.data)
		{
			this.htmlCode.destroy();
			PopManager.hidePop("PayOKPop");
			PopManager.showPop("SelfPop");
		}
	}
}