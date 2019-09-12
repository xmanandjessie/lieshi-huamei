class SharePop extends PopView 
{
	private btnOK:egret.Bitmap;

	private btnCancel:egret.Bitmap;

	public constructor() 
	{
		super();
		this.init();
	}

	private init():void
	{
		this.initBg();

		var title = Global.createBitmapByName("icon_png");
		title.scaleX = title.scaleY = 0.8;
        title.x = (StageUtils.SW - title.width >> 1) + 38;
        title.y = 150;
        this.container.addChild(title);

		var confirm = new CustomImage("resource/assets/async/share_confirm.png");
		confirm.x = StageUtils.SW - 392 >> 1;
		confirm.y = 450;
		this.container.addChild(confirm);

		this.btnOK = Global.createBitmapByName("btn_ok_png");
		this.btnOK.x = 100;
		this.btnOK.y = 800;
		this.container.addChild(this.btnOK);

		this.btnCancel = Global.createBitmapByName("btn_return_png");
		this.btnCancel.x = 330;
		this.btnCancel.y = 800;
		this.container.addChild(this.btnCancel);

		Global.setBut(this.btnOK);
		Global.setBut(this.btnCancel);

		this.btnOK.touchEnabled = true;
		this.btnCancel.touchEnabled = true;

		this.btnOK.addEventListener(egret.TouchEvent.TOUCH_TAP,this.okTouchHandler,this);
		this.btnCancel.addEventListener(egret.TouchEvent.TOUCH_TAP,this.cancelTouchHandler,this);
	}

	private okTouchHandler():void
	{

		if(this.data)
		{
			var _this=this;
			$.ajax({
				url: Main.SHARE_API,
				data: { ticket: Main.user_ticket,actiontype:"shareone",word:this.data},
				success: function(data)
				{
					if(data.status == 0)
					{
						//成功
						_this.showShare();
						RewardManager.instance.share(data.uustr,data.word);
					}else
					{
						if(data.message == "readticketfail")
						{
							PopManager.showPop("ErrorPop",ErrorCode.TICKET_TIME_OUT);
						}else
						{
							Global.showTips(data.message+"");
						}
					}
				},
				error: function() {
					Global.showTips("error");
				},timeout: 8000,
				dataType: "json",async: true,type: "POST",
				complete: function(XMLHttpRequest,status) {
					if(status == 'timeout') {
						Global.showTips("time out");
					}
				}
			});
		}
	}

	private showShare():void
	{
		this.removeChild(this.container);

		var bg = new CustomImage("resource/assets/async/share_tips.png");
		bg.x = StageUtils.SW - 512 >> 1;
		bg.y = 300;
		this.addChild(bg);

		this.touchEnabled = true;
		this.addEventListener(egret.TouchEvent.TOUCH_TAP,this.touchHandler,this);
	}

	private touchHandler():void
	{
		PopManager.hidePop("SharePop");
		RewardManager.instance.shareEnd();
	}

	private cancelTouchHandler():void
	{
		PopManager.hidePop("SharePop");
	}

	public setData(data:any):void
	{
		this.data = data;
		if(data)
		{
			var icon_text1 = new CustomImage("resource/assets/words/2/w2_"+data+".png");
			icon_text1.x = (StageUtils.SW - 55 >> 1) - 45;
			icon_text1.y = 510;
			this.container.addChild(icon_text1);
		}
	}
}