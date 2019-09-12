class WordView extends egret.DisplayObjectContainer
{
	private word:egret.Bitmap;

	private icon:egret.Bitmap;

	private txtCount:egret.TextField;

	private id:number;

	private num:number;

	public constructor() 
	{
		super();

		this.touchEnabled = true;
		this.addEventListener(egret.TouchEvent.TOUCH_TAP,this.touchHandler,this);
	}

	private touchHandler():void
	{
		if(this.id)
		{
			if(RewardManager.instance.wordList["column"+this.id] > 0)
			{
				if(RewardManager.instance.wordList1["column"+this.id] > 0)
				{
					PopManager.showPop("SharePop",this.id);
				}else
				{
					Global.showTips("印花来自分享，不可再次分享");
				}
			}
		}
	}

	public init(id,num):void
	{
		this.id = id;
		this.num = num;
		var bg = Global.createBitmapByName("word_bg_png");
		this.addChild(bg);
		this.word = Global.createBitmapByName("w1_"+id+"_png");
		this.word.scaleX = this.word.scaleY = 0.65;
		StageUtils.centerInParent(this.word,23,23,this);
		this.addChild(this.word);

		if(num > 0)
		{
			this.icon = Global.createBitmapByName("word_point_png");
			this.icon.x = 100;
			this.icon.y = 100;
			this.addChild(this.icon);

			this.txtCount = new egret.TextField();
			this.txtCount.x = 112;
			this.txtCount.y = 106;
			this.txtCount.textAlign = egret.HorizontalAlign.CENTER;
			this.txtCount.size = 24;
			this.addChild(this.txtCount);

			this.txtCount.text = num + "";
		}else
		{
			// this.word.filters = Global.grayFlilter1;
			this.word.alpha = 0.3;
		}
	}

	public updateNum(offset):void
	{
		this.num += offset;
		this.txtCount.text = this.num + "";
	}
}