class ErrorPop extends PopView
{
	private btnNext:egret.Bitmap;

	public static IsError:boolean;

	private tips:CustomImage;

	public constructor()
	{
		super();
		this.init();
	}

	private init():void
	{
		this.initBg();

		var sign = new CustomImage("resource/assets/error/error_bg.png");
		sign.x = StageUtils.SW - 204 >> 1;
		sign.y = 250;
		this.container.addChild(sign);

		this.btnNext = Global.createBitmapByName("btn_yinhua_png");
		this.btnNext.x = StageUtils.SW - this.btnNext.width >> 1;
		this.btnNext.y = 700;
		this.container.addChild(this.btnNext);

		this.btnNext.touchEnabled = true;
		this.btnNext.addEventListener(egret.TouchEvent.TOUCH_TAP,this.touchHandler,this);

		Global.setBut(this.btnNext);
	}

	private touchHandler():void
	{
		ErrorPop.IsError = true;
		if(RES.isGroupLoaded("preload"))
		{
			UIManager.instance.initGameView();
		}else
		{
			RES.loadGroup("preload");
		}
		// UIManager.instance.initGameView();
		PopManager.hidePop("ErrorPop");
	}

	public setData(data:any):void
	{
		console.log(data);
		this.data = data;
		if(data)
		{
			if(this.tips && this.tips.parent)
			{
				this.tips.parent.removeChild(this.tips);
			}
			this.tips = null;
			if(data == ErrorCode.RECEIVED_SELF)
			{
				this.tips = new CustomImage("resource/assets/error/error_self_yiling.png");
				this.tips.x = StageUtils.SW - 430 >> 1;
				this.tips.y = 500;
				this.container.addChild(this.tips);
			}else if(data == ErrorCode.NOT_FOUND)
			{
				this.tips = new CustomImage("resource/assets/error/error_no_ticket.png");
				this.tips.x = StageUtils.SW - 470 >> 1;
				this.tips.y = 500;
				this.container.addChild(this.tips);

				this.btnNext.visible = false;
			}else if(data == ErrorCode.TIME_OUT || data == ErrorCode.TICKET_TIME_OUT)
			{
				this.tips = new CustomImage("resource/assets/error/error_time_out.png");
				this.tips.x = StageUtils.SW - 422 >> 1;
				this.tips.y = 500;
				this.container.addChild(this.tips);

				this.btnNext.visible = false;
			}else  if(data == ErrorCode.SYSTEM_ERROR)
			{
				this.tips = new CustomImage("resource/assets/error/error_system_error.png");
				this.tips.x = StageUtils.SW - 332 >> 1;
				this.tips.y = 500;
				this.container.addChild(this.tips);

				this.btnNext.visible = false;
			}else if(data == ErrorCode.RECEIVED_ERROR)
			{
				this.tips = new CustomImage("resource/assets/error/error_time_yiling2.png");
				this.tips.x = StageUtils.SW - 424 >> 1;
				this.tips.y = 500;
				this.container.addChild(this.tips);

				this.btnNext.visible = false;
			}
		}
	}
}