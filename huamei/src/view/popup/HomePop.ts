class HomePop extends PopView
{
	private btnJuan:egret.Bitmap;

	private btnYinHua:egret.Bitmap;

	private icon_bg:egret.Bitmap;

	private icon_text:egret.Bitmap;

	private icon_tips:egret.Bitmap;

	private icon_text1:CustomImage;

	private juan1:egret.Bitmap;

	private zhou1:egret.Bitmap;

	private zhou2:egret.Bitmap;

	public constructor()
	{
		super();
		this.init();
	}

	private init():void
	{
		var bg = new CustomImage("resource/assets/bg.png",false);//Global.createBitmapByName("main_bg1_png");
		bg.width = StageUtils.SW;
		bg.height = StageUtils.SH;
		bg.alpha = 0.5;
		this.addChildAt(bg,0);

		this.initBg();

		this.icon_bg = Global.createBitmapByName("home_yinhua_bg_png");
		StageUtils.centerInParent(this.icon_bg,0,-200);
		this.container.addChild(this.icon_bg);

		var juan = Global.createBitmapByName("home_juanzhou_2_png");
		juan.anchorOffsetX = 132;
		juan.x = StageUtils.CW;
		juan.y = 200;
		juan.scaleX = 0.1;
		this.container.addChild(juan);

		var zhou1 = Global.createBitmapByName("home_juanzhou_1_png");
		zhou1.anchorOffsetX = 15;
		zhou1.x = StageUtils.CW - 20;
		zhou1.y = 170;
		this.container.addChild(zhou1);

		var zhou2 = Global.createBitmapByName("home_juanzhou_1_png");
		zhou2.anchorOffsetX = 15;
		zhou2.x = StageUtils.CW + 20;
		zhou2.scaleX = -1;
		zhou2.y = 170;
		this.container.addChild(zhou2);

		this.juan1 = juan;
		this.zhou1 = zhou1;
		this.zhou2 = zhou2;

		

		this.icon_tips = Global.createBitmapByName("home_yinhua_text_png");
		StageUtils.centerInParent(this.icon_tips,0,90);
		this.container.addChild(this.icon_tips);

		this.icon_tips.alpha = 0;

		// this.btnJuan = Global.createBitmapByName("btn_juan_png");
		// StageUtils.centerInParent(this.btnJuan,-100,0);
		// this.addChild(this.btnJuan);

		this.btnYinHua = Global.createBitmapByName("btn_yinhua_png");
		StageUtils.centerInParent(this.btnYinHua,0,330);
		this.container.addChild(this.btnYinHua);

		// Global.setBut(this.btnJuan);
		Global.setBut(this.btnYinHua);

		// this.btnJuan.touchEnabled = true;
		this.btnYinHua.touchEnabled = true;
		this.btnYinHua.alpha = 0;

		// this.btnJuan.addEventListener(egret.TouchEvent.TOUCH_TAP,this.juanTouchHandler,this);

		// this.btnYinHua.addEventListener(egret.TouchEvent.TOUCH_TAP,this.yinHuaTouchHandler,this);

		this.container.visible = false;
		this.loadPlay();
	}

	private juanTouchHandler():void
	{
		
	}

	private yinHuaTouchHandler():void
	{
		this.intoGame();
	}

	private intoGame():void
	{
		UIManager.instance.initGameView();
		PopManager.hidePop("HomePop");
	}

	private loadPlay():void
    {
        console.log("loadPlay");
        if(Main.isTest) {
            // Main.user = { "nickname": "jeff","headimgurl": "http://wx.qlogo.cn/mmopen/6BD2qP9V7sout0oux0ts55Pns1xtEpOl7icGF5GV68YdruILNBBCJvMMFCy0Wbbl7zFiaibjfibaIlKFcYIhRM6ntCU37lhk8amY/0" };
			this.btnYinHua.addEventListener(egret.TouchEvent.TOUCH_TAP,this.yinHuaTouchHandler,this);

			RewardManager.instance.curWord = 10;
			this.showWord();
            return;
        }
        var _this=this;
        $.ajax({
            url: Main.PLAY_API,
            data: { ticket: Main.status_ticket },
            success: function(data) 
            {
                if(data.result == "success")
                {
                    if(data.more.result == 0)
                    {
						RewardManager.instance.curWord = data.more.prize;
						RewardManager.instance.addWord(data.more.prize);
						_this.showWord();
						_this.btnYinHua.addEventListener(egret.TouchEvent.TOUCH_TAP,_this.yinHuaTouchHandler,_this);
                    }else if(data.more.result == 3)
					{
						PopManager.hidePop("HomePop");
						PopManager.showPop("ErrorPop",ErrorCode.RECEIVED_SELF);
					}else
                    {
                        //具体错误
						// alert("错误:"+data.more.result);
						PopManager.hidePop("HomePop");
						PopManager.showPop("ErrorPop",ErrorCode.SYSTEM_ERROR);
                    }
                }else
                {
					Global.errorTips(data);
					// if(data.reason == "invalidticket")
					// {
					// 	PopManager.showPop("ErrorPop",ErrorCode.TICKET_TIME_OUT);
					// }else
					// {
                    // 	//系统繁忙
					// 	PopManager.showPop("ErrorPop",ErrorCode.SYSTEM_ERROR);
					// }
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

	private showWord():void
	{
		this.container.visible = true;
		egret.Tween.get(this.zhou1).to({x:StageUtils.CW - 140},500);
		egret.Tween.get(this.zhou2).to({x:StageUtils.CW + 140},500);
		egret.Tween.get(this.juan1).to({scaleX:1},500);

		var word = RewardManager.instance.curWord;
		this.icon_text = Global.createBitmapByName("w1_"+word+"_png")
		StageUtils.centerInParent(this.icon_text,0,0);
		this.icon_text.x = StageUtils.SW - 132 >> 1;
		this.icon_text.y = 240;
		this.container.addChild(this.icon_text);

		this.icon_text.alpha = 0;
		egret.Tween.get(this.icon_text).wait(500).to({alpha:1},500).call(this.showWordEnd,this);
	}

	private showWordEnd():void
	{
		this.icon_tips.alpha = 1;

		var word = RewardManager.instance.curWord;
		this.icon_text1 = new CustomImage("resource/assets/words/2/w2_"+word+".png");

		this.icon_text1.x = (StageUtils.SW - 55 >> 1) - 24;
		this.icon_text1.y = 530;
		this.container.addChild(this.icon_text1);

		this.btnYinHua.alpha = 1;
	}
}