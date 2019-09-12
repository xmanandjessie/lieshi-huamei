class MyRewardItemView extends egret.DisplayObjectContainer 
{
	private icon:CustomImage;

	private txtKey:egret.TextField;

	private data:any;

	public constructor()
	{
		super();
		this.init();
	}

	private init():void
	{
		
	}

	public setData(data):void
	{
		this.data = data;
		if(data)
		{	
			//{  “prizeid”：“1”,aqyacount:"111"}
			this.icon = new CustomImage("resource/assets/reward/my/re"+data.prizeid+".png");
			this.icon.x = 80;
			this.addChild(this.icon);
			if(data.prizeid == 11)
			{
				this.txtKey = new egret.TextField();
				this.txtKey.size = 20;
				this.txtKey.textColor = 0x000000;
				this.txtKey.text = data.aqycode + "";
				this.txtKey.x = 235;
				this.txtKey.y = 78;
				this.addChild(this.txtKey);
			}
			if(data.prizeid == 7 || data.prizeid == 8 || data.prizeid == 9 || data.prizeid == 10)
			{

			}else
			{
				this.touchEnabled = true;
				this.addEventListener(egret.TouchEvent.TOUCH_TAP,this.touchHandler,this);
				Global.setBut(this);
			}
		}
	}

	private touchHandler():void
	{
		if(this.data)
		{
			if(this.data.prizeid == 11)
			{
				window.location.href = Main.IQIYI;
			}else
			{
				// PopManager.showPop("SubmitPop",this.data);
			}
		}
	}
}