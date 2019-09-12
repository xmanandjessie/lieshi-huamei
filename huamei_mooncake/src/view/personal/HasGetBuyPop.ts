class HasGetBuyPop extends PopView
{
	public constructor()
	{
		super();
	}

	public setData(data):void
	{
		super.setData(data);

		var bg = new CustomImage("resource/assets/asyn/personal/tips_bg.jpg",true,()=>{
			bg.width = StageUtils.SW;
			bg.height = StageUtils.SH;
		});
		this.addChild(bg);

		var tips1 = new CustomImage("resource/assets/asyn/personal/tips2.png",true,()=>{
			tips1.x = StageUtils.SW - tips1.width >> 1;
			tips1.y = 250;
		});
		this.addChild(tips1);

		var btnDuihuan = new CustomImage("resource/assets/asyn/personal/btn_self.png",true,()=>{
			btnDuihuan.x = StageUtils.SW - btnDuihuan.width >> 1;
			btnDuihuan.y = 360;
		});
		this.addChild(btnDuihuan);
		Global.setBut(btnDuihuan);

		btnDuihuan.addEventListener(egret.TouchEvent.TOUCH_TAP,this.duihuanHandler,this);
	}

	private duihuanHandler():void
	{
		PopManager.hidePop("HasGetInfoPop");
		PopManager.showPop("InfoPop");
	}
}