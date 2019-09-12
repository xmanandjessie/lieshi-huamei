class RewardItemView extends egret.DisplayObjectContainer 
{
	private btnReward:egret.Bitmap;

	private icon:CustomImage;

	private data:any;

	private txtNeed:egret.TextField;

	public constructor()
	{
		super();
		this.init();
	}

	private init():void
	{
		this.touchEnabled = true;
		this.addEventListener(egret.TouchEvent.TOUCH_TAP,this.allTouchHandler,this);

		
	}

	private allTouchHandler():void
	{
		if(this.data)
		{
			PopManager.showPop("ItemDescPop",this.data);
		}
	}

	private touchHandler(evt:egret.TouchEvent):void
	{
		if(this.data)
		{
			PopManager.showPop("ConfirmPop",this.data);
		}
		evt.stopImmediatePropagation();
		evt.stopPropagation();
	}

	public setData(data):void
	{
		this.data = data;
		if(data)
		{
			

			this.icon = new CustomImage("resource/assets/reward/small/rw"+data.id+".png");
			this.icon.x = 80;
			this.addChild(this.icon);


			this.txtNeed = new egret.TextField();
			this.txtNeed.x = 280;
			this.txtNeed.size = 25;
			// this.txtNeed.stroke = 1;
			// this.txtNeed.strokeColor = 0xFFFF00;
			
			

			var text_bg = "";
			var text_y = 0;
			if(data.id == 3 || data.id == 4)
			{
				this.btnReward = Global.createBitmapByName("btnReward_png");
				this.txtNeed.y = 75;
				
				text_y = 72;
			}else
			{
				this.btnReward = Global.createBitmapByName("btnReward1_png");
				this.txtNeed.y = 45;
				
				text_y = 42;
			}
			this.btnReward.x = 510;
			this.addChild(this.btnReward);
			this.btnReward.addEventListener(egret.TouchEvent.TOUCH_TAP,this.touchHandler,this);

			var ok:boolean = true;
			//富文本
			var flow = new Array<egret.ITextElement>();
			var len = data.need.length;
			for(var i = 0;i<len;i++)
			{
				var id = data.need[i];
				if(id)
				{
					var str = RewardManager.WORDS[id - 1];
					if(str)
					{
						if(RewardManager.instance.getNumByID(id))
						{
							//有
							flow.push({text: str+"  ", style: {"textColor": 0xa60115}});
							text_bg = "text_bg1_png";
						}else
						{
							//没有
							flow.push({text: str+"  ", style: {"textColor": 0xc68065}});
							text_bg = "text_bg2_png";
							ok = false;
						}
						var txt_bg = Global.createBitmapByName(text_bg);
						txt_bg.x = 276 + i * 39;
						txt_bg.y = text_y;
						this.addChild(txt_bg);
					}
				}
			}
			this.txtNeed.textFlow = flow;
			this.addChild(this.txtNeed);

			if(ok)
			{
				this.btnReward.touchEnabled = true;
			}else
			{
				this.btnReward.touchEnabled = false;
				this.btnReward.filters = Global.grayFlilter;
			}
		}
	}
}