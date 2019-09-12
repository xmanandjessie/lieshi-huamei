class RewardListView extends egret.DisplayObjectContainer 
{
	private list:CustomScrollView;

	private container:egret.DisplayObjectContainer;

	private btnGetJuan:egret.Bitmap;

	public constructor()
	{
		super();

		this.init();
	}

	private closeTouchHandler():void
	{
		UIManager.instance.initGameView();
	}

	private init():void
	{
		var bg = new CustomImage("resource/assets/bg.png");//Global.createBitmapByName("main_bg1_png");
		bg.width = StageUtils.SW;
		bg.height = StageUtils.SH;
		this.addChild(bg);

		this.container = new egret.DisplayObjectContainer();
		this.addChild(this.container);

		var bg1 = new CustomImage("resource/assets/main_bg1.png");//Global.createBitmapByName("main_bg1_png");
		bg1.x = StageUtils.SW - 604 >> 1;
		bg1.y = StageUtils.SH - 921 >> 1;
		this.container.addChild(bg1);

		// egret.Tween.get(this.container,{loop:true}).to({skewX:0.3},2000,egret.Ease.quadOut).to({skewX:0},2000,egret.Ease.quadIn).to({skewX:-0.3},2000,egret.Ease.quadOut).to({skewX:0},2000,egret.Ease.quadIn);

		var close = Global.createBitmapByName("close_png");
		close.x = StageUtils.SW - close.width - 60;
		close.y = 110;
		this.container.addChild(close);
		close.touchEnabled = true;
		Global.setBut(close);
		close.addEventListener(egret.TouchEvent.TOUCH_TAP,this.closeTouchHandler,this);

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

		var title = Global.createBitmapByName("reward_list_title_png");
		title.x = StageUtils.SW - title.width >> 1;
		title.y = 370;
		this.container.addChild(title);

		this.list = new CustomScrollView();
		this.list.containerHeight = 485;
		// this.list.y = 350;
		this.container.addChild(this.list);
		var len = RewardManager.REWARD_LIST.length;
		var tempY = 430;
		for(var i = 0;i<len;i++)
		{
			var item = new RewardItemView();
			item.setData(RewardManager.REWARD_LIST[i]);
			item.x = 0;//StageUtils.SW - item.width >> 1;
			// item.y = 350 + i * 97;
			item.y = tempY;
			if(i == 2 || i == 3)
			{
				tempY += 126;
			}else
			{
				tempY += 97;
			}
			this.list.addItem(item,false);
		}

		var rect = new egret.Rectangle(0,430,640,485);
		this.list.mask = rect;

		this.btnGetJuan = Global.createBitmapByName("btn_get_juan_png");
		this.btnGetJuan.x = StageUtils.SW - this.btnGetJuan.width >> 1;
		this.btnGetJuan.y = StageUtils.SH - this.btnGetJuan.height - 10;
		this.container.addChild(this.btnGetJuan);

		Global.setBut(this.btnGetJuan);

		// if(RewardManager.instance.canGetCard)
		// {
			this.btnGetJuan.touchEnabled = true;
			this.btnGetJuan.addEventListener(egret.TouchEvent.TOUCH_TAP,this.getJuanTouchHandler,this);
			this.addEventListener(egret.Event.ENTER_FRAME,this.enterFrameHandler,this);
		// }else
		// {
		// 	this.addEventListener(egret.Event.ENTER_FRAME,this.enterFrameHandler,this);
		// 	this.btnGetJuan.filters = Global.grayFlilter;
		// }
	}

	private index:number = 5;
	private isAdd:boolean;
	private temp:number = 0;
	private enterFrameHandler():void
	{
		if(this.temp == 1)
		{
			this.temp = 0;
			return;
		}else
		{
			this.temp ++;
		}
		this.btnGetJuan.filters = [new egret.GlowFilter( 0xFFFF00, 1, this.index, this.index,2, egret.BitmapFilterQuality.HIGH, false, false )];
		if(this.isAdd)
		{
			this.index += 5;
			if(this.index > 30)
			{
				this.isAdd = false;
			}
		}else
		{
			this.index -= 5;
			if(this.index < 0)
			{
				this.index = 5;
				this.isAdd = true;
			}
		}
	} 

	private getJuanTouchHandler():void
	{
		console.log("card");
		if(Main.isTest) 
		{
			return;
		}
		var _this=this;
		$.ajax({
			url: Main.INFO_API,
			data: { ticket: Main.user_ticket,type:"card"},
			success: function(data)
			{
				if(data.result == "success")
				{
					if(data.c2ashed == "")
					{
						if(data.more.result == 0)
						{
							//成功
							window.location.href = Main.CARD;
						}else
						{
							PopManager.showPop("ErrorPop",ErrorCode.SYSTEM_ERROR);
						}
						RewardManager.instance.canGetCard = true;
					}else
					{
						RewardManager.instance.canGetCard = false;
						Global.showTips("已领过优惠券");
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
}