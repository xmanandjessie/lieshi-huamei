class GameView extends egret.DisplayObjectContainer 
{
	private btnShop:egret.Bitmap;

	private btnDesc:egret.Bitmap;

	private btnMusic:egret.Bitmap;

	private btnReward:egret.Bitmap;

	private btnLottery:egret.Bitmap;

	private btnMyReward:egret.Bitmap;

	private wordContainer:CustomScrollView;

	private wordList:any;

	public constructor()
	{
		super();
		this.initView();
	}

	private initView():void
	{
		var bg = new CustomImage("resource/assets/bg.png");//Global.createBitmapByName("main_bg1_png");
		bg.width = StageUtils.SW;
		bg.height = StageUtils.SH;
		this.addChild(bg);

		var logo = Global.createBitmapByName("logo_png");
		logo.x = 20;
		logo.y = 20;
		logo.scaleX = logo.scaleY = 0.8;
		this.addChild(logo);

		var title1 = Global.createBitmapByName("hengfu_png");
		// title1.scaleX = title1.scaleY = 0.9;
        title1.anchorOffsetX = title1.width >> 1;
        title1.anchorOffsetY = title1.height >> 1;
        title1.x = StageUtils.CW;
        title1.y = 340;
        this.addChild(title1);
        
        var title2 = Global.createBitmapByName("title_png");
		title2.scaleX = title2.scaleY = 0.9;
		title2.anchorOffsetX = title2.width >> 1;
        title2.anchorOffsetY = title2.height >> 1;
        title2.x = StageUtils.CW;
        title2.y = 160;
        this.addChild(title2);

		

		this.wordContainer = new CustomScrollView();
		this.wordContainer.containerHeight = 480;
		this.addChild(this.wordContainer);
		var list = RewardManager.WORDS1;
		var len = list.length;

		this.wordList = {};
		for(var i = 0;i<len;i++)
		{
			var itemList = list[i];
			if(itemList)
			{
				var itemLen = itemList.length;
				for(var j = 0;j<itemLen;j++)
				{
					var obj = itemList[j];
					if(obj)
					{
						var word = new WordView();
						word.init(obj.id,RewardManager.instance.getNumByID(obj.id));
						word.x = 50 + j * 135;
						word.y = 420 + i * 135;
						this.wordContainer.addItem(word,false);
						this.wordList[obj.id] = word;
					}
				}
			}
		}

		var rect = new egret.Rectangle(0,420,640,500);

		this.wordContainer.mask = rect;

		var bg1 = Global.createBitmapByName("game_bg_buttom_png");
		bg1.width = StageUtils.SW;
		bg1.y = StageUtils.SH - bg1.height;
		this.addChild(bg1);

		this.btnDesc = Global.createBitmapByName("btn_desc_png");
		this.btnDesc.x = (StageUtils.SW - this.btnDesc.width >> 1) - 70;
		this.btnDesc.y = (StageUtils.SH - this.btnDesc.height >> 1) - 130;
		this.addChild(this.btnDesc);

		this.btnShop = Global.createBitmapByName("btn_shop_png");
		this.btnShop.x = (StageUtils.SW - this.btnShop.width >> 1) + 70;
		this.btnShop.y = (StageUtils.SH - this.btnShop.height >> 1) - 130;;
		this.addChild(this.btnShop);

		this.btnMusic = Global.createBitmapByName("music_png");
		this.btnMusic.x = StageUtils.SW - this.btnMusic.width - 20;
		this.btnMusic.y = 20;
		this.addChild(this.btnMusic);

		if(!Main.musicIsPlay)
        {
            this.btnMusic.filters = Global.grayFlilter;
        }else
        {
            this.btnMusic.filters = [];
        }

		this.btnReward = Global.createBitmapByName("btn_open_reward_png");
		this.btnReward.x = 15;
		this.btnReward.y = StageUtils.SH - this.btnReward.height - 20;
		this.addChild(this.btnReward);

		this.btnLottery = Global.createBitmapByName("btn_lottery_png");
		this.btnLottery.x = StageUtils.SW - this.btnLottery.width >> 1;
		this.btnLottery.y = StageUtils.SH - this.btnLottery.height - 20;
		this.addChild(this.btnLottery);

		this.btnMyReward = Global.createBitmapByName("btn_my_reward_png");
		this.btnMyReward.x = StageUtils.SW - this.btnMyReward.width - 15;
		this.btnMyReward.y = StageUtils.SH - this.btnMyReward.height - 20;
		this.addChild(this.btnMyReward);

		this.btnReward.touchEnabled = true;
		this.btnReward.addEventListener(egret.TouchEvent.TOUCH_TAP,this.rewardClickHandler,this);

		this.btnDesc.touchEnabled = true;
		this.btnDesc.addEventListener(egret.TouchEvent.TOUCH_TAP,this.descClickHandler,this);

		this.btnMusic.touchEnabled = true;
		this.btnMusic.addEventListener(egret.TouchEvent.TOUCH_TAP,this.musicClickHandler,this);

		this.btnLottery.touchEnabled = true;
		this.btnLottery.addEventListener(egret.TouchEvent.TOUCH_TAP,this.lotteryClickHandler,this);

		this.btnMyReward.touchEnabled = true;
		this.btnMyReward.addEventListener(egret.TouchEvent.TOUCH_TAP,this.myRewardClickHandler,this);

		this.btnShop.touchEnabled = true;
		this.btnShop.addEventListener(egret.TouchEvent.TOUCH_TAP,this.shopClickHandler,this);

		Global.setBut(this.btnReward);
		Global.setBut(this.btnDesc);
		Global.setBut(this.btnMusic);
		Global.setBut(this.btnLottery);
		Global.setBut(this.btnMyReward);
		Global.setBut(this.btnShop);


		this.tips = Global.createBitmapByName("game_view_tips_png");
        this.tips.x = StageUtils.SW - this.tips.width >> 1;
        this.tips.y = 370;
        this.addChild(this.tips);

		this.tips.touchEnabled = true;
		this.tips.addEventListener(egret.TouchEvent.TOUCH_TAP,this.tipsTouchHandler,this);

		this.timer = new egret.Timer(1500,1);
        this.timer.addEventListener(egret.TimerEvent.TIMER_COMPLETE,this.timerEndHandler,this);
        this.timer.start();

	}

	private timerEndHandler()
    {
        this.tipsTouchHandler();
    }

	private timer:egret.Timer;

	private tips:egret.Bitmap;

	private tipsTouchHandler():void
	{
		this.timer.stop();
		egret.Tween.get(this.tips).to({alpha:0},500).call(this.tipsEnd,this);
	}

	private tipsEnd():void
	{
		if(this.tips && this.tips.parent)
		{
			this.tips.parent.removeChild(this.tips);
		}
		this.tips = null;
	}

	public updateWord(id,offset):void
	{
		var word = this.wordList[id];
		if(word)
		{
			word.updateNum(offset);
		}
	}

	private shopClickHandler():void
	{
		window.location.href = Main.SHOP;
	}

	private myRewardClickHandler():void
	{
		PopManager.showPop("MyRewardPop");
	}

	private rewardClickHandler():void
	{
		UIManager.instance.initRewardView();
	}

	private descClickHandler():void
	{
		PopManager.showPop("ActivityDescPop",0);
	}

	private musicClickHandler():void
	{
		 Main.musicPlay();
        if(!Main.musicIsPlay)
        {
            this.btnMusic.filters = Global.grayFlilter;
			this.btnMusic.texture = RES.getRes("music_close_png");
        }else
        {
            this.btnMusic.filters = [];
			this.btnMusic.texture = RES.getRes("music_png");
        }
	}

	private lotteryClickHandler():void
	{
		// PopManager.showPop("LotteryPop");
		PopManager.showPop("ActivityDescPop",1);
	}
}