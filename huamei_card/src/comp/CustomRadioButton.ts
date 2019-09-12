class CustomRadioButton extends egret.DisplayObjectContainer
{
	public index:number;

	private _select:boolean;

	private icon:egret.Bitmap;

	public static CHANGE:string = "change";

	public constructor(_type,_res,select = false)
	{
		super();
		this._select = select;
		this.index = _res;
		this.init(_type,_res);
	}

	private init(type,res):void
	{
		var bg = Global.createBitmapByName("quan"+type+"_png");
		this.addChild(bg);

		this.icon = Global.createBitmapByName("liangdian_png");
		StageUtils.centerInParent(this.icon,0,0,bg);
		this.addChild(this.icon);
		this.icon.visible = this._select;

		var txt = Global.createBitmapByName("rb_"+type+"_"+res+"_png");
		txt.x = bg.width - 8;
		txt.y = bg.height - txt.height >> 1;
		this.addChild(txt);
	}

	public set select(val)
	{
		if(this._select != val)
		{
			this._select = val;
			if(this._select)
			{
				this.icon.visible = true;
			}else
			{
				this.icon.visible = false;
			}
			this.dispatchEventWith(CustomRadioButton.CHANGE);
		}
	}
}