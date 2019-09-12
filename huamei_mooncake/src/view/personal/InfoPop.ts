class InfoPop extends PopView
{
	public constructor()
	{
		super();
	}

	public setData(data):void
	{
		super.setData(data);

		var bg=new egret.Shape()
        bg.graphics.beginFill(0xe6e6e6);
        bg.graphics.drawRect(0,0,StageUtils.SW,StageUtils.SH);
        bg.graphics.endFill();
        this.addChildAt(bg,0);

		var title = new CustomImage("resource/assets/asyn/personal/title.png", true, () => {
			title.width = StageUtils.SW;
		});
		this.addChild(title);

		var dingdan = new CustomImage("resource/assets/asyn/personal/btn_wode.png", true, () => {
			dingdan.x = 40;
			dingdan.y = 130;
		});
		this.addChild(dingdan);


		var line = Global.createBitmapByName("p_line_2_png");
		line.x = 0;
		line.y = 105 - 5;
		this.addChild(line);

		this.loadData();
	}

	

	private showPage(index):void
	{
		if(index == 1)
		{
			this.initOrder();
		}else if(index == 2)
		{
			this.initCard();
		}else
		{
			this.initBuy();
		}
	}

	private buyPage:BuySendPop;

	private initBuy():void
	{
		this.buyPage = new BuySendPop();
		this.addChild(this.buyPage);
	}

	private cardPage:egret.DisplayObjectContainer;

	//我购买的
	private card;
	//我分享的
	private esharelist;
	//我领取的
	private esharedlist;

	private esharedInfo;

	private initCard():void
	{
		if(this.card)
		{
			this.cardPage = new egret.DisplayObjectContainer();
			this.addChild(this.cardPage);

			var bg = new egret.Shape();
			bg.graphics.beginFill(0xffffff);
			bg.graphics.drawRect(0,106,StageUtils.SW,StageUtils.SH - 106);
			bg.graphics.endFill();
			this.cardPage.addChild(bg);

			var tips = Global.createBitmapByName("btn_tips_1_png");
			tips.x = StageUtils.SW - tips.width >> 1;
			tips.y = 130;
			this.cardPage.addChild(tips);
			Global.setBut(tips);
			tips.addEventListener(egret.TouchEvent.TOUCH_TAP,()=>{
				PopManager.showPop("TipsPop",{url:"personal_tips_bg2_png",callback:()=>{}});
			},this);

			var container = new egret.DisplayObjectContainer();
			var scroll = new egret.ScrollView(container);
			scroll.width = StageUtils.SW;
			scroll.height = StageUtils.SH - 175;
			scroll.x = 0;
			scroll.y = 175;
			scroll.horizontalScrollPolicy = "off";
			this.cardPage.addChild(scroll);

			var h = 0;
			var tips1 = Global.createBitmapByName("card_type_buy_png");
			tips1.x = StageUtils.SW - tips1.width >> 1;
			container.addChild(tips1);

			h += tips1.height;

			var len = this.card.length;
			for(var i = 0;i<len;i++)
			{
				//{type:i+1,num:i+4}
				if(this.card[i])
				{
					var item = new InfoCardItem(this.card[i],i+1,0);
					item.y = h + 25;
					container.addChild(item);
					h += 296;
				}
			}

			var tips2 = Global.createBitmapByName("card_type_get_png");
			tips2.x = StageUtils.SW - tips2.width >> 1;
			tips2.y = h + 25;
			container.addChild(tips2);
			h += tips2.height + 25;

			var len = this.esharedlist.length;
			for(var i = 0;i<len;i++)
			{
				//{type:i+1,num:i+4}
				if(this.esharedlist[i])
				{
					if(this.esharedInfo)
					{
						var temp = this.esharedInfo[i];
						if(temp && temp.length)
						{
							var item = new InfoCardItem(this.esharedlist[i],i+1,1,temp[0]);
							item.y = h + 25;
							container.addChild(item);
							h += 296;
						}
					}
				}
			}

			var tips3 = Global.createBitmapByName("card_type_out_png");
			tips3.x = StageUtils.SW - tips3.width >> 1;
			tips3.y = h + 25;
			container.addChild(tips3);
			h += tips3.height + 25;

			var len = this.esharelist.length;
			for(var i = 0;i<len;i++)
			{
				//{type:i+1,num:i+4}
				if(this.esharelist[i])
				{
					var item = new InfoCardItem(this.esharelist[i],i+1,2);
					item.y = h + 25;
					container.addChild(item);
					h += 285;
				}
			}

			var bg = new egret.Shape();
			bg.graphics.beginFill(0x0,0.001);
			bg.graphics.drawRect(0,0,StageUtils.SW,h);
			bg.graphics.endFill();
			container.addChildAt(bg,0);
		}
	}

	private orderPage:egret.DisplayObjectContainer;

	private exchange;
	
	private initOrder():void
	{
		if(this.exchange)
		{
			this.orderPage = new egret.DisplayObjectContainer();
			this.addChild(this.orderPage);
			var container = new egret.DisplayObjectContainer();
			var scroll = new egret.ScrollView(container);
			scroll.width = StageUtils.SW;
			scroll.height = 815;
			scroll.x = 22;
			scroll.y = 175;
			scroll.horizontalScrollPolicy = "off";
			this.orderPage.addChild(scroll);

			var block = new egret.Shape();
			block.graphics.beginFill(0x0,0.001);
			block.graphics.drawRect(0,0,30,30);
			block.graphics.endFill();
			container.addChild(block);
			
			var len = this.exchange.length;
			for(var i = 0;i<len;i++)
			{
				var item = new InfoOrderItem(this.exchange[i]);
				item.y = 0 + 368 * i;
				container.addChild(item);
			}
		}
	}

	private duihuanHandler():void
	{
		PopManager.hidePop("InfoPop");
		PopManager.showPop("BuySendPop");
	}

	private loadData():void
	{
		Global.post("n/rheo",{pagenum:0}).then((res:any)=>{
			this.exchange = res.pagedlist;
			this.initOrder();
		});
	}
}