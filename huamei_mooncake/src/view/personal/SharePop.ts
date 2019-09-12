class SharePop extends PopView
{
	public constructor()
	{
		super();
	}

	public setData(data):void
	{
		super.setData(data);

		Main.showShare();

		var bg = new CustomImage("resource/assets/asyn/share_bg.png",true,()=>{
			bg.width = StageUtils.SW;
			bg.height = StageUtils.SH;
		});
		this.addChild(bg);

		if(data)
		{
			if(data.code)
			{
				Main.share(data.code);
			}else
			{
				Main.share("http://lsid.me/h/esharecode$eshareinfo="+data.eshareinfo,data.eshareinfo,data.time);
			}
		}
	}
}