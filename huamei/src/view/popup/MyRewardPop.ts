class MyRewardPop extends PopView 
{
	private btnReturn:egret.Bitmap;

	private list:CustomScrollView;

	private tips:CustomImage;

	// private timer:egret.Timer;

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

		var title = Global.createBitmapByName("my_reward_title_png");
		title.x = StageUtils.SW - title.width >> 1;
		title.y = 370;
		this.container.addChild(title);

		this.btnReturn = Global.createBitmapByName("btn_return_png");
		this.btnReturn.x = StageUtils.SW - this.btnReturn.width >> 1;
		this.btnReturn.y = StageUtils.SH - this.btnReturn.height - 20;
		this.container.addChild(this.btnReturn);

		this.btnReturn.touchEnabled = true;
		this.btnReturn.addEventListener(egret.TouchEvent.TOUCH_TAP,this.touchHandler,this);

		var arrow = Global.createBitmapByName("arrow_png");
		arrow.x = StageUtils.SW - arrow.width >> 1;
		arrow.y = StageUtils.SH - arrow.height - 105;
		this.container.addChild(arrow);

		Global.setBut(this.btnReturn);

		this.tips = new CustomImage("resource/assets/async/reward_list_tips.png");
        this.tips.x = StageUtils.SW - 478 >> 1;
        this.tips.y = 250;
        this.addChild(this.tips);

		this.tips.touchEnabled = true;
		this.tips.addEventListener(egret.TouchEvent.TOUCH_TAP,this.tipsTouchHandler,this);

		// this.timer = new egret.Timer(1500,1);
        // this.timer.addEventListener(egret.TimerEvent.TIMER_COMPLETE,this.timerEndHandler,this);
        // this.timer.start();
	}

	private tipsTouchHandler():void
	{
		// this.timer.stop();
		egret.Tween.get(this.tips).to({alpha:0},500).call(this.tipsEnd,this);
	}

	private timerEndHandler()
    {
        this.tipsTouchHandler();
    }

	private tipsEnd():void
	{
		if(this.tips && this.tips.parent)
		{
			this.tips.parent.removeChild(this.tips);
		}
		this.tips = null;
	}

	private touchHandler():void
	{
		PopManager.hidePop("MyRewardPop");
	}

	public setData(data:any):void
	{
		if(Main.isTest)
		{
			this.showList([{prizeid:1,aqyacount:"111"},{prizeid:11,aqyacount:"111"},{prizeid:2,aqyacount:"111"},{prizeid:3,aqyacount:"111"},{prizeid:4,aqyacount:"111"},{prizeid:5,aqyacount:"111"},{prizeid:6,aqyacount:"111"}]);
			return;
		}
		var _this=this;
		$.ajax({
			url: Main.INFO_API,
			data: { ticket: Main.user_ticket,type:"gift"},
			success: function(data)
			{
				if(data.result == "success")
				{
					if(data.more.result == 0)
					{
						//成功
						_this.showList(data.more.prizes);
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
	}

	private showList(list):void
	{
		if(list)
		{
			this.list = new CustomScrollView();
			this.list.containerHeight = 440;
			this.container.addChild(this.list);

			var len = list.length;
			for(var i = 0;i<len;i++)
			{
				var item = new MyRewardItemView();
				item.setData(list[i]);
				item.x = 26;
				item.y = 450+i * 150;
				this.list.addItem(item,false);
			}

			var rect = new egret.Rectangle(0,450,640,440);
			this.list.mask = rect;
		}
	}
}