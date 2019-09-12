class ExchangePop extends PopView 
{
	private btnNext:egret.Bitmap;

	private btnIqiyi:egret.Bitmap;

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

		var ren = Global.createBitmapByName("ren_png");
        ren.x = 50;
        ren.y = 280;
        

        var hands = Global.createBitmapByName("hands_png");
        hands.anchorOffsetX = 7;
        hands.anchorOffsetY = 38;
        hands.x = ren.x + 100;
        hands.y = ren.y + 70;

		ren.scaleX = ren.scaleY = hands.scaleX = hands.scaleY = 0.5;

        this.container.addChild(hands);
        this.container.addChild(ren);

		var title = Global.createBitmapByName("exchange_title_png");
		title.x = StageUtils.SW - title.width >> 1;
		title.y = 370;
		this.container.addChild(title);

		this.btnNext = Global.createBitmapByName("btn_next_png");
		this.btnNext.x = StageUtils.SW - this.btnNext.width >> 1;
		this.btnNext.y = StageUtils.SH - this.btnNext.height - 26;
		this.container.addChild(this.btnNext);

		this.btnNext.touchEnabled = true;
		this.btnNext.addEventListener(egret.TouchEvent.TOUCH_TAP,this.touchHandler,this);

		Global.setBut(this.btnNext);
	}

	private touchHandler():void
	{
		if(this.data)
		{
			if(this.data.id == 11)
			{
				
			}else
			{
				PopManager.showPop("SubmitPop",this.data);
			}
		}
		PopManager.hidePop("ExchangePop");
	}

	public setData(data:any):void
	{
		this.data = data;
		if(data)
		{
			if(data.id == 11)
			{
				var bg = new CustomImage("resource/assets/async/iqiyi_bg.png");
				bg.x = StageUtils.SW - 435 >> 1;
				bg.y = 500;
				this.container.addChild(bg);

				this.btnIqiyi = new CustomImage("resource/assets/async/btn_iqiyi.png");
				this.btnIqiyi.x = StageUtils.SW - 298 >> 1;
				this.btnIqiyi.y = 800;
				this.container.addChild(this.btnIqiyi);

				Global.setBut(this.btnIqiyi);
				this.btnIqiyi.touchEnabled = true;
				

				this.btnNext.visible = false;

				

				var _this=this;
				$.ajax({
					url: Main.INFO_API,
					data: { ticket: Main.user_ticket,type:"exprize",prizetype:0,prizeid:11},
					success: function(data)
					{
						if(data.result == "success")
						{
							if(data.more.result == 0)
							{
								//aqyacount
								$('.wx').show();
								$('#iqiyi').html(data.more.aqycode+"");
								_this.btnIqiyi.addEventListener(egret.TouchEvent.TOUCH_TAP,_this.iqiyiHandler,_this);
							}else
							{
								PopManager.showPop("ErrorPop",ErrorCode.SYSTEM_ERROR);
							}
						}else
						{
							Global.errorTips(data);
						}
					},
					error: function() {
						PopManager.showPop("ErrorPop",ErrorCode.NOT_FOUND);
					},timeout: 8000,
					dataType: "json",async: true,type: "POST",
					complete: function(XMLHttpRequest,status) {
						if(status == 'timeout') {
							PopManager.showPop("ErrorPop",ErrorCode.TIME_OUT);
						}
					}
				});
			}else
			{
				var url = "";
				var tempX = 0;
				if(data.rt == 0)
				{
					url = "resource/assets/async/exchange_1.png";
					tempX = StageUtils.SW - 415 >> 1;
				}else
				{
					url = "resource/assets/async/exchange_2.png";
					tempX = StageUtils.SW - 468 >> 1;
				}
				var bg = new CustomImage(url);
				bg.x = tempX;
				bg.y = 430;
				this.container.addChild(bg);
			}
		}
	}

	private iqiyiHandler():void
	{
		$('.wx').hide();
		PopManager.showPop("IqiyiPop",this.data);
	}
}