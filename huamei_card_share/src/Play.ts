class Play extends egret.DisplayObjectContainer
{
	public static isCustom:boolean;

	public static username:string;

	public static type:number;

	public static text:string;

	private container:egret.DisplayObjectContainer;

	private btnReturn:egret.Bitmap;

	public constructor()
	{
		super();

		this.container = new egret.DisplayObjectContainer();
		this.addChild(this.container);

		// var tip = Global.createBitmapByName("tips1_png");
		// tip.x = StageUtils.SW - tip.width >> 1;
		// tip.y = 200;
		// this.container.addChild(tip);

		// var huan = Global.createBitmapByName("huan_png");
		// huan.x = StageUtils.SW - huan.width >> 1;
		// huan.y = StageUtils.SH - huan.height >> 1;
		// this.container.addChild(huan);

		// var text = Global.createBitmapByName("num3_png");
		// text.x = StageUtils.SW - text.width >> 1;
		// text.y = StageUtils.SH - text.height >> 1;
		// this.container.addChild(text);

		// egret.Tween.get(text).wait(1000).call(function(){
		// 	text.texture = RES.getRes("num2_png");
		// }).wait(1000).call(function(){
		// 	text.texture = RES.getRes("num1_png");
		// }).wait(1000).call(this.showFlash,this);

		// egret.Tween.get(this).wait(1000).call(this.showFlash,this);

		this.showFlash();

	}

	private showFlash():void
	{
		this.removeChild(this.container);
		this.container = null;

		var logo = Global.createBitmapByName("logo_png");
        logo.x = 20;
        logo.y = 20;
        this.addChild(logo);

		var txt = new egret.TextField();
		txt.text = Play.username + "";
		txt.size = 50;
		txt.x = StageUtils.SW - txt.textWidth >> 1;
		txt.y = 120;
		this.addChild(txt);

		var zhu = Global.createBitmapByName("tips2_png");
		zhu.x = StageUtils.SW - zhu.width >> 1;
		zhu.y = 180;
		this.addChild(zhu);

		var ma = Global.createBitmapByName("ma_png");
		ma.x = StageUtils.SW - ma.width >> 1;
		ma.y = 550;
		this.addChild(ma);

		this.btnReturn = Global.createBitmapByName("btn_add_png");
		this.btnReturn.x = StageUtils.SW - this.btnReturn.width >> 1;
		this.btnReturn.y = 800;
		this.addChild(this.btnReturn);
		this.btnReturn.touchEnabled = true;
		this.btnReturn.addEventListener(egret.TouchEvent.TOUCH_TAP,this.returnHandler,this);
		Global.setBut(this.btnReturn);
		this.btnReturn.visible = false;
		var self = this;
		egret.Tween.get(this.btnReturn).wait(3000).call(function(){
			self.btnReturn.visible = true;
		});

		var size;
		var tempY;
		if(Play.isCustom)
		{
			var len = Play.text.length;
			if(len > 7)
			{
				size = 60;
				tempY = 350;
			}else
			{
				size = 80;
				tempY = 300;
			}
		}else
		{
			size = 80;
			tempY = 300;
		}

		if(Play.type == 1)
		{
			
			var lt = new LightText(Play.text,size);
			this.addChild(lt);
			lt.x = StageUtils.SW - lt.width >> 1;
			lt.y = tempY;
		}else
		{
			var self = this;
			var mc = Global.createMc("yanhua_json","yanhua_png","");
			this.addChild(mc);
			mc.play();
			egret.Tween.get(mc,{loop:true}).wait(1000).call(function(){
				mc.gotoAndPlay(0);
				mc.x += (Math.random() * 50) - 25;
				mc.y += (Math.random() * 50) - 25;
			});
			this.mc1 = mc;

			this.mc2 = Global.createMc("yanhua_json","yanhua_png","");
			this.addChild(this.mc2);
			this.mc2.x = 200;
			this.mc2.y = 100;
			this.mc2.play();
			egret.Tween.get(this.mc2,{loop:true}).wait(1200).call(function(){
				self.mc2.gotoAndPlay(0);
				self.mc2.x += (Math.random() * 50) - 25;
				self.mc2.y += (Math.random() * 50) - 25;
			});

			this.mc3 = Global.createMc("yanhua_json","yanhua_png","");
			this.addChild(this.mc3);
			this.mc3.play();
			this.mc3.x = 100;
			this.mc3.y = 100;
			egret.Tween.get(this.mc3,{loop:true}).wait(1400).call(function(){
				self.mc3.gotoAndPlay(0);
				self.mc3.x += (Math.random() * 50) - 25;
				self.mc3.y += (Math.random() * 50) - 25;
			});

			var pt = new PointText(Play.text,size);
			this.addChild(pt);
			pt.y = tempY;
		}
	}

	private mc1;
	private mc2;
	private mc3;

	private returnHandler():void
	{
		window.location.href = "http://res.leasiondata.cn/lstatic/h/card/index.html";
	}

	public static share():void
	{
		var weixin = eval("wx");
		var self = this;
		if(weixin)
		{
			if(Play.text)
			{
				weixin.onMenuShareTimeline({
					title: "拜年集福华美年，您的好友分享了一个字印花",
					link:"http://res.leasiondata.cn/lstatic/h/card/index.html",
					imgUrl:"http://res.leasiondata.cn/lstatic/h/share/share.jpg",
					success: function () {
						
					},
					cancel: function () {
						// 用户取消分享后执行的回调函数
					}
				});

				//好友
				weixin.onMenuShareAppMessage(
					{
						title:"拜年集福华美年，您的好友分享了一个字印花",
						desc: "拜年集福华美年",
						link:"http://res.leasiondata.cn/lstatic/h/card/index.html",
						imgUrl:"http://res.leasiondata.cn/lstatic/h/share/share.jpg",
						success: function ()
						{
							
						},
						cancel: function () 
						{

						}
					}
				);
			}else
			{
				weixin.onMenuShareTimeline({
					title: "拜年集福华美年，您的好友分享了一个字印花",
					link:"http://res.leasiondata.cn/lstatic/h/card/index.html",
					imgUrl:"http://res.leasiondata.cn/lstatic/h/share/share.jpg",
					success: function () {
						
					},
					cancel: function () {
						// 用户取消分享后执行的回调函数
					}
				});

				//好友
				weixin.onMenuShareAppMessage(
					{
						title:"拜年集福华美年，您的好友分享了一个字印花",
						desc: "拜年集福华美年",
						link:"http://res.leasiondata.cn/lstatic/h/card/index.html",
						imgUrl:"http://res.leasiondata.cn/lstatic/h/share/share.jpg",
						success: function ()
						{
							
						},
						cancel: function () 
						{

						}
					}
				);
			}
		}
	}
}