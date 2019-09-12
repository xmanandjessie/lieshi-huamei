class CustomPop extends PopView
{
	private btnNext:egret.Bitmap;

	private txtName:egret.TextField;

	public constructor() 
	{
		super();

		var bg = Global.createBitmapByName("pop_bg1_png");
		bg.x = StageUtils.SW - bg.width >> 1;
		bg.y = StageUtils.SH - bg.height >> 1;
		this.addChild(bg);

		this.btnNext = Global.createBitmapByName("btn_next_png");
		this.btnNext.x = StageUtils.SW - this.btnNext.width >> 1;
		this.btnNext.y = 565;
		this.addChild(this.btnNext);
		this.btnNext.touchEnabled = true;
		this.btnNext.addEventListener(egret.TouchEvent.TOUCH_TAP,this.nextHandler,this);
		Global.setBut(this.btnNext);

		this.txtName = new egret.TextField();
		this.txtName.type = egret.TextFieldType.INPUT;
		this.txtName.x = 100;
		this.txtName.y = (StageUtils.SH - this.txtName.height >> 1) - 10;
		this.txtName.borderColor = 0x00ff00;
		this.txtName.size = 35;
		this.txtName.width = 430;
		this.txtName.height = 50;
		this.txtName.maxChars = 10;
		this.txtName.textColor = 0xf59f2c;
		this.txtName.textAlign = egret.HorizontalAlign.CENTER;
		this.txtName.text = "点击输入";
		this.addChild(this.txtName);

		this.txtName.addEventListener(egret.FocusEvent.FOCUS_IN,this.focusInHandler,this);
		this.txtName.addEventListener(egret.FocusEvent.FOCUS_OUT,this.focusOutHandler,this);

		var close = Global.createBitmapByName("close_png");
		close.x = StageUtils.SW - 120;
		close.y = 300;
		this.addChild(close);
		close.touchEnabled = true;
		close.addEventListener(egret.TouchEvent.TOUCH_TAP,this.closeHandler,this);

		Global.setBut(close);
	}

	private closeHandler():void
	{
		PopManager.hidePop("CustomPop");
	}

	private focusInHandler():void
	{
		if(this.txtName.text == "点击输入")
		{
			this.txtName.text = "";
		}
	}

	private focusOutHandler():void
	{
		if(!this.txtName.text)
		{
			this.txtName.text = "点击输入";
		}
	}

	private nextHandler():void
	{
		var str = this.txtName.text;
		if(str && str != "点击输入")
		{
			PopManager.hidePop("CustomPop");

			// var len = str.length;
			// str = this.insert_flg(str,"\n",Math.ceil(len / 2));
			UIManager.instance.setCustomText(str);
		}else
		{
			Global.showTips("输入您的祝福语");
		}
	}

	private insert_flg(str,flg,sn)
	{
		var s1 = str.substring(0,sn);
		var s2 = str.substring(sn);
		
		return s1+flg+s2;
	}
}