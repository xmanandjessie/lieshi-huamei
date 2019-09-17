class MessagePop extends PopView
{
	private txtID:egret.TextField;

	private txtPW:egret.TextField;

	private txtNewID:egret.TextField;

	private btnSubmit:egret.Bitmap;

	public constructor()
	{
		super();
	}

	public show():void
	{
		var bg=new egret.Shape()
      
        bg.graphics.beginFill(0x0,0.7);
        bg.graphics.drawRect(0,0,StageUtils.stage.stageWidth,StageUtils.stage.stageHeight);
        bg.graphics.endFill();

        // this.view.scaleY = Main.scale;
        // this.view.x=600;
        // this.view.y=320;
        
        this.addChildAt(bg,0);
        bg.alpha=0;
        Global.fadeIn(bg);

		UIManager.instance.popLayer.addChild(this);
		this.touchEnabled = true;
	}

	public setData(data):void
	{
		super.setData(data);

		var bg = new CustomImage("resource/assets/asyn/personal/tips_bg1.png", true, () => {
			bg.x = StageUtils.SW - bg.width >> 1;
			bg.y = StageUtils.SH - bg.height >> 1;
		});
		this.addChild(bg);

		var btnClose = Global.createBitmapByName("btn_change_close_png");
		btnClose.x = 495;
		btnClose.y = 290;
		this.addChild(btnClose);
		Global.setBut(btnClose);
		btnClose.addEventListener(egret.TouchEvent.TOUCH_TAP,()=>{
			PopManager.hidePop("MessagePop");
		},this);

		var btnSubmit = new CustomImage("resource/assets/asyn/personal/btn_confirm.png", true, () => {
			btnSubmit.x = StageUtils.SW - btnSubmit.width >> 1;
			btnSubmit.y = (StageUtils.SH - btnSubmit.height >> 1) + 170;
		});
		this.addChild(btnSubmit);
		Global.setBut(btnSubmit);
		btnSubmit.addEventListener(egret.TouchEvent.TOUCH_TAP,()=>{
			PopManager.hidePop("MessagePop");
		},this);
		this.btnSubmit = btnSubmit;
	}
}