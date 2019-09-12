class ShareRewardView extends egret.DisplayObjectContainer 
{
	private btnOk:egret.Bitmap;

	private tips:CustomImage;

	private tips1:CustomImage;

	public constructor() 
	{
		super();
		this.init();
	}

	private init():void
	{
		this.addChild(new CustomImage("resource/assets/bg.png"));

		var logo = Global.createBitmapByName("logo_png",20,20);
        this.addChild(logo);

        // var icon = Global.createBitmapByName("icon_png");
        // icon.x = StageUtils.SW - icon.width >> 1;
        // icon.y = 70;
        // this.addChild(icon);

        var title1 = Global.createBitmapByName("hengfu_png");
        title1.anchorOffsetX = title1.width >> 1;
        title1.anchorOffsetY = title1.height >> 1;
        title1.x = StageUtils.CW;
        title1.y = 350;
        this.addChild(title1);
        
        var title2 = Global.createBitmapByName("title_png");
		title2.scaleX = title2.scaleY = 0.8;
        title2.x = (StageUtils.SW - title2.width >> 1) + 54;
        title2.y = 100;
        this.addChild(title2);

		var tips = new CustomImage("resource/assets/async/share_tips1.png");
		tips.x = StageUtils.SW - 547 >> 1;
		tips.y = 450;
		this.addChild(tips);
		this.tips = tips;

		var tips1 = new CustomImage("resource/assets/async/share_tips2.png");
		tips1.x = StageUtils.SW - 508 >> 1;
		tips1.y = 850;
		this.addChild(tips1);
		this.tips1 = tips1;

		this.btnOk = Global.createBitmapByName("btn_chakan_png");
		this.btnOk.x = StageUtils.SW - this.btnOk.width >> 1;
		this.btnOk.y = 900;
		this.addChild(this.btnOk);

        this.showWord();
	}

	private showWord():void
	{
		var word = Main.get_word;
		if(word)
		{
			var arr = word.split(",");
			var len = arr.length;
			if(len == 1)
			{
				if(arr[0] == "0")
				{
					this.btnOk.touchEnabled = true;
					this.btnOk.addEventListener(egret.TouchEvent.TOUCH_TAP,this.touchHandler,this);

					if(this.tips && this.tips.parent)
					{
						this.tips.parent.removeChild(this.tips);
					}
					this.tips = null;
					this.tips = new CustomImage("resource/assets/async/share_tips_yiling.png");
					this.tips.x = StageUtils.SW - 547 >> 1;
					this.tips.y = 450;
					this.addChild(this.tips);

					this.tips1.y = 700;
				}else if(arr[0] == "-1")
				{
					this.btnOk.touchEnabled = true;
					this.btnOk.addEventListener(egret.TouchEvent.TOUCH_TAP,this.touchHandler,this);

					if(this.tips && this.tips.parent)
					{
						this.tips.parent.removeChild(this.tips);
					}
					this.tips = null;
					this.tips = new CustomImage("resource/assets/async/share_tips_yiling1.png");
					this.tips.x = StageUtils.SW - 287 >> 1;
					this.tips.y = 450;
					this.addChild(this.tips);

					this.tips1.y = 700;
				}else
				{
					var juan = Global.createBitmapByName("home_juanzhou_2_png");
					juan.anchorOffsetX = 132;
					juan.x = StageUtils.CW;
					juan.y = 600;
					juan.scaleX = 0.1;
					this.addChild(juan);

					var zhou1 = Global.createBitmapByName("home_juanzhou_1_png");
					zhou1.anchorOffsetX = 15;
					zhou1.x = StageUtils.CW - 20;
					zhou1.y = 570;
					this.addChild(zhou1);

					var zhou2 = Global.createBitmapByName("home_juanzhou_1_png");
					zhou2.anchorOffsetX = 15;
					zhou2.x = StageUtils.CW + 20;
					zhou2.scaleX = -1;
					zhou2.y = 570;
					this.addChild(zhou2);

					egret.Tween.get(zhou1).to({x:StageUtils.CW - 140},500);
					egret.Tween.get(zhou2).to({x:StageUtils.CW + 140},500);
					egret.Tween.get(juan).to({scaleX:1},500);

					var icon_text = new CustomImage("resource/assets/words/3/w3_"+arr[0]+".png");
					icon_text.x = StageUtils.SW - 114 >> 1;
					icon_text.y = 650;
					this.addChild(icon_text);

					icon_text.alpha = 0;

					egret.Tween.get(icon_text).wait(500).to({alpha:1},500).call(this.tweenEnd,this);

					this.btnOk.visible = false;
				}
			}else
			{
				var juan = Global.createBitmapByName("home_juanzhou_2_png");
				juan.anchorOffsetX = 132;
				juan.x = StageUtils.CW - 150;
				juan.y = 600;
				juan.scaleX = 0.1;
				this.addChild(juan);

				var zhou1 = Global.createBitmapByName("home_juanzhou_1_png");
				zhou1.anchorOffsetX = 15;
				zhou1.x = StageUtils.CW - 20 - 150;
				zhou1.y = 570;
				this.addChild(zhou1);

				var zhou2 = Global.createBitmapByName("home_juanzhou_1_png");
				zhou2.anchorOffsetX = 15;
				zhou2.x = StageUtils.CW + 20 - 150;
				zhou2.scaleX = -1;
				zhou2.y = 570;
				this.addChild(zhou2);

				egret.Tween.get(zhou1).to({x:StageUtils.CW - 140 - 150},500);
				egret.Tween.get(zhou2).to({x:StageUtils.CW + 140 - 150},500);
				egret.Tween.get(juan).to({scaleX:1},500);

				var icon_text = new CustomImage("resource/assets/words/3/w3_"+arr[0]+".png");
				icon_text.x = (StageUtils.SW - 114 >> 1) - 150;
				icon_text.y = 650;
				this.addChild(icon_text);

				icon_text.alpha = 0;

				egret.Tween.get(icon_text).wait(500).to({alpha:1},500).call(this.tweenEnd,this);


				var juan = Global.createBitmapByName("home_juanzhou_2_png");
				juan.anchorOffsetX = 132;
				juan.x = StageUtils.CW + 150;
				juan.y = 600;
				juan.scaleX = 0.1;
				this.addChild(juan);

				var zhou1 = Global.createBitmapByName("home_juanzhou_1_png");
				zhou1.anchorOffsetX = 15;
				zhou1.x = StageUtils.CW - 20 + 150;
				zhou1.y = 570;
				this.addChild(zhou1);

				var zhou2 = Global.createBitmapByName("home_juanzhou_1_png");
				zhou2.anchorOffsetX = 15;
				zhou2.x = StageUtils.CW + 20 + 150;
				zhou2.scaleX = -1;
				zhou2.y = 570;
				this.addChild(zhou2);

				egret.Tween.get(zhou1).to({x:StageUtils.CW - 140 + 150},500);
				egret.Tween.get(zhou2).to({x:StageUtils.CW + 140 + 150},500);
				egret.Tween.get(juan).to({scaleX:1},500);

				var icon_text = new CustomImage("resource/assets/words/3/w3_"+arr[1]+".png");
				icon_text.x = (StageUtils.SW - 114 >> 1) + 150;
				icon_text.y = 650;
				this.addChild(icon_text);

				icon_text.alpha = 0;

				egret.Tween.get(icon_text).wait(500).to({alpha:1},500);

				this.btnOk.visible = false;
			}
		}
	}

	private tweenEnd():void
	{
		this.btnOk.visible = true;

		this.btnOk.touchEnabled = true;

		this.btnOk.addEventListener(egret.TouchEvent.TOUCH_TAP,this.touchHandler,this);
	}

	private touchHandler():void
	{
		console.log("loadUser");
		if(Main.isTest) {
			UIManager.instance.initGameView();
			return;
		}
		var _this=this;
		$.ajax({
			url: Main.INFO_API,
			data: { ticket: Main.user_ticket,type:"info"},
			success: function(data)
			{
				if(data.result == "success")
				{
					RewardManager.instance.initData(data);
					if(data.more.result == 0)
					{
						UIManager.instance.initGameView();
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
}