class Game extends egret.DisplayObjectContainer
{
	

	public static text1 = [
		"新春快乐\n阖家安康",
		"鸡年鸡极向上\n生鸡勃勃",
		"早日达成\n自己的小目标",
		"恭喜发财\n红包拿来",
		"鸡年好事多\n幸福喜颜开",
		"福星高照\n大吉大利",
		"财运亨通\n事事顺心",
		"天天好运道\n日日福星照"
		];
	public static text2 = [
		"福如东海\n寿比南山",
		"多福多寿\n笑口常开",
		"永葆青春\n越活越年轻",
		"步步高升\n万事如意"
	]

	public static text3 = [
		"一起走过\n鸡年的每一天",
		"你的购物车\n我来清空",
		"鸡年颜值爆表\n身材逆天",
		"鸡年拥有\n八块腹肌"
	]

	public static text4 = [
		"业绩长虹\n财源滚滚",
		"福享新春\n宏图大展",
		"幸福安康\n阖家欢乐",
		"吉祥如意\n万事如意"
	]

	private txtName:egret.TextField;

	private rb1:CustomRadioButton;
	private rb2:CustomRadioButton;
	private rb3:CustomRadioButton;
	private rb4:CustomRadioButton;

	private btnCustom:egret.Bitmap;

	private rb11:CustomRadioButton;
	private rb12:CustomRadioButton;

	private btnNext:egret.Bitmap;

	private imgText:CustomImage;

	private type1:number = 1;

	private type2:number = 1;

	private iconIndex:number = 1;

	public constructor()
	{
		super();
		this.init();
	}

	private init():void
	{
		var txtbg = Global.createBitmapByName("text_bg_png");
		txtbg.x = StageUtils.SW - txtbg.width >> 1;
		txtbg.y = 95;
		this.addChild(txtbg);

		this.txtName = new egret.TextField();
		this.txtName.type = egret.TextFieldType.INPUT;
		this.txtName.x = txtbg.x;
		this.txtName.y = txtbg.y + 25;
		// this.txtName.border = true;
		this.txtName.borderColor = 0x00ff00;
		this.txtName.size = 25;
		this.txtName.width = txtbg.width;
		this.txtName.height = txtbg.height;
		this.txtName.maxChars = 4;
		this.txtName.textColor = 0xf59f2c;
		this.txtName.textAlign = egret.HorizontalAlign.CENTER;
		this.txtName.text = "输入您的姓名(限4个汉字)";
		this.addChild(this.txtName);

		this.txtName.addEventListener(egret.FocusEvent.FOCUS_IN,this.focusInHandler,this);
		this.txtName.addEventListener(egret.FocusEvent.FOCUS_OUT,this.focusOutHandler,this);

		var type1Container = new egret.DisplayObjectContainer();
		this.addChild(type1Container);

		this.rb1 = new CustomRadioButton(2,1,true);
		type1Container.addChild(this.rb1);

		this.rb2 = new CustomRadioButton(2,2);
		this.rb2.x = 110;
		type1Container.addChild(this.rb2);

		this.rb3 = new CustomRadioButton(2,3);
		this.rb3.x = 220;
		type1Container.addChild(this.rb3);

		this.rb4 = new CustomRadioButton(2,4);
		this.rb4.x = 330;
		type1Container.addChild(this.rb4);

		type1Container.x = StageUtils.SW - type1Container.width >> 1;
		type1Container.y = 195;

		var left = Global.createBitmapByName("left_png");
		left.x = 20;
		left.y = 320;
		this.addChild(left);

		var right = Global.createBitmapByName("right_png");
		right.x = StageUtils.SW - right.width - 20;
		right.y = 320;
		this.addChild(right);

		left.touchEnabled = true;
		right.touchEnabled = true;

		left.addEventListener(egret.TouchEvent.TOUCH_TAP,this.leftHandler,this);
		right.addEventListener(egret.TouchEvent.TOUCH_TAP,this.rightHandler,this);

		this.btnCustom = Global.createBitmapByName("btn_custom_png");
		this.btnCustom.x = StageUtils.SW - this.btnCustom.width >> 1;
		this.btnCustom.y = 485;
		this.addChild(this.btnCustom);
		this.btnCustom.touchEnabled = true;
		this.btnCustom.addEventListener(egret.TouchEvent.TOUCH_TAP,this.customHandler,this);

		var tips = Global.createBitmapByName("tips_type_png");
		tips.x = StageUtils.SW - tips.width >> 1;
		tips.y = 585;
		this.addChild(tips);

		var type2Container = new egret.DisplayObjectContainer();
		this.addChild(type2Container);

		this.rb11 = new CustomRadioButton(1,1,true);
		type2Container.addChild(this.rb11);

		this.rb12 = new CustomRadioButton(1,2);
		this.rb12.x = 180;
		type2Container.addChild(this.rb12);


		type2Container.x = StageUtils.SW - type2Container.width >> 1;
		type2Container.y = 630;

		this.btnNext = Global.createBitmapByName("btn_next_png");
		this.btnNext.x = StageUtils.SW - this.btnNext.width >> 1;
		this.btnNext.y = 720;
		this.addChild(this.btnNext);
		this.btnNext.touchEnabled = true;
		this.btnNext.addEventListener(egret.TouchEvent.TOUCH_TAP,this.nextHandler,this);


		Global.setBut(this.btnNext);
		Global.setBut(this.btnCustom);

		this.rb1.touchEnabled = true;
		this.rb2.touchEnabled = true;
		this.rb3.touchEnabled = true;
		this.rb4.touchEnabled = true;
		this.rb11.touchEnabled = true;
		this.rb12.touchEnabled = true;

		this.rb1.addEventListener(egret.TouchEvent.TOUCH_TAP,this.type1Handler,this);
		this.rb2.addEventListener(egret.TouchEvent.TOUCH_TAP,this.type1Handler,this);
		this.rb3.addEventListener(egret.TouchEvent.TOUCH_TAP,this.type1Handler,this);
		this.rb4.addEventListener(egret.TouchEvent.TOUCH_TAP,this.type1Handler,this);

		this.rb11.addEventListener(egret.TouchEvent.TOUCH_TAP,this.type2Handler,this);
		this.rb12.addEventListener(egret.TouchEvent.TOUCH_TAP,this.type2Handler,this);


		var deng1 = Global.createBitmapByName("denglong_png");
		deng1.x = 20;
		deng1.y = 200;
		deng1.scaleX = deng1.scaleY = 0.5;
		this.addChild(deng1);

		var deng2 = Global.createBitmapByName("denglong_png");
		deng2.x = 500;
		deng2.y = 80;
		deng2.scaleX = deng2.scaleY = 0.8;
		this.addChild(deng2);

		var deng3 = Global.createBitmapByName("denglong_png");
		deng3.x = 50;
		deng3.y = 660;
		deng3.scaleX = deng3.scaleY = 0.5;
		this.addChild(deng3);

		var deng4 = Global.createBitmapByName("denglong_png");
		deng4.x = 510;
		deng4.y = 580;
		deng4.scaleX = deng4.scaleY = 0.5;
		this.addChild(deng4);


		this.setText();
	}

	public setCustomText(str):void
	{
		Play.isCustom = true;
		Play.username = this.txtName.text;
		Play.type = this.type1;
		Play.text = str;
		UIManager.instance.initPlayView();
	}

	private setText():void
	{
		console.log(this.type1,this.type2,this.iconIndex);
		if(this.imgText)
		{
			this.removeChild(this.imgText);
			this.imgText = null;
		}
		var self = this;
		this.imgText = new CustomImage("resource/assets/asyn/txt"+this.type1+"/txt_"+this.type1+"_"+this.type2+"_"+this.iconIndex+".png",true,function(){
			self.imgText.x = StageUtils.SW - self.imgText.width >> 1;
			self.imgText.y = 360 - self.imgText.height / 2;
		});
		this.addChild(this.imgText);
	}

	private type1Handler(e:egret.TouchEvent):void
	{
		this.rb1.select = false;
		this.rb2.select = false;
		this.rb3.select = false;
		this.rb4.select = false;
		e.target.select = true;
		this.type2 = e.target.index;

		var len = Game["text"+this.type2].length;
		if(this.iconIndex > len)
		{
			this.iconIndex = len;
		}

		this.setText();
	}

	private type2Handler(e:egret.TouchEvent):void
	{
		this.rb11.select = false;
		this.rb12.select = false;
		e.target.select = true;
		this.type1 = e.target.index;
		this.setText();
	}

	private nextHandler():void
	{
		var name = this.txtName.text;
		if(name && name != "输入您的姓名(限4个汉字)")
		{
			Play.isCustom = false;
			Play.username = name;
			Play.type = this.type1;
			Play.text = Game["text"+this.type2][this.iconIndex - 1];
			UIManager.instance.initPlayView();
		}else
		{
			Global.showTips("输入您的姓名");
		}
	}

	private customHandler():void
	{
		var name = this.txtName.text;
		if(name && name != "输入您的姓名(限4个汉字)")
		{
			PopManager.showPop("CustomPop");
		}else
		{
			Global.showTips("输入您的姓名");
		}
	}

	private leftHandler():void
	{
		if(this.iconIndex > 1)
		{
			this.iconIndex --;
		}else
		{
			var len = Game["text"+this.type2].length;
			this.iconIndex = len;
		}
		this.setText();
	}

	private rightHandler():void
	{
		var len = Game["text"+this.type2].length;
		if(this.iconIndex < len)
		{
			this.iconIndex ++;
		}else
		{
			this.iconIndex = 1;
		}
		this.setText();
	}



	private focusInHandler():void
	{
		if(this.txtName.text == "输入您的姓名(限4个汉字)")
		{
			this.txtName.text = "";
		}
	}

	private focusOutHandler():void
	{
		if(!this.txtName.text)
		{
			this.txtName.text = "输入您的姓名(限4个汉字)";
		}
	}

	
}