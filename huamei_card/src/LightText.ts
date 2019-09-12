class LightText extends egret.DisplayObjectContainer
{
	private _text:string;

	public size:number;

	private txtContent:egret.TextField;

	private txtContent1:egret.TextField;

	private txtContent2:egret.TextField;

	private txtContent3:egret.TextField;

	private container:egret.DisplayObjectContainer;

	public constructor(str,_size=80) 
	{
		super();
		this._text = str;
		this.size = _size;
		this.init();
	}

	public set text(val)
	{
		this._text = val;
		this.init();
	}

	public get text()
	{
		return this._text;
	}

	private init():void
	{
		this.removeChildren();

		this.txtContent = new egret.TextField();
        this.txtContent.textAlign = egret.HorizontalAlign.CENTER;
        // this.txtContent.text = this._text;//"蒸蒸日上\n阖家安康";
        this.txtContent.size = this.size;
        this.txtContent.fontFamily = "黑体";
		this.txtContent.textColor = 0xffff7c;
		// this.txtContent.width = 600;

		this.txtContent1 = new egret.TextField();
        this.txtContent1.textAlign = egret.HorizontalAlign.CENTER;
		// this.txtContent1.text = this._text;//"蒸蒸日上\n阖家安康";
        this.txtContent1.size = this.size;
        this.txtContent1.fontFamily = "黑体";
		this.txtContent1.textColor = 0xc8102d;
		var bf = new egret.BlurFilter(2,2);
		this.txtContent1.filters = [bf];
		this.txtContent1.x  = this.txtContent.x +5;
		this.txtContent1.y  = this.txtContent.y +10;
		// this.txtContent1.width = 600;

		this.txtContent2 = new egret.TextField();
        this.txtContent2.textAlign = egret.HorizontalAlign.CENTER;
		// this.txtContent2.text = this._text;//"蒸蒸日上\n阖家安康";
        this.txtContent2.size = this.size;
        this.txtContent2.fontFamily = "黑体";
		this.txtContent2.textColor = 0xd40d26;
		this.txtContent2.stroke = 8;
		this.txtContent2.strokeColor = 0xd40d26;
		var bf = new egret.BlurFilter(15,15);
		this.txtContent2.filters = [bf];
		// this.txtContent2.width = 600;

		this.txtContent3 = new egret.TextField();
        this.txtContent3.textAlign = egret.HorizontalAlign.CENTER;
		this.txtContent3.text = this._text;//"蒸蒸日上\n阖家安康";
        this.txtContent3.size = this.size;
        this.txtContent3.fontFamily = "黑体";
		this.txtContent3.textColor = 0x2f2f2f;
		// this.txtContent3.width = 600;

		this.addChild(this.txtContent3);
		this.addChild(this.txtContent2);
		this.addChild(this.txtContent1);
        this.addChild(this.txtContent);

		var timer = new egret.Timer(100,this.text.length);
		timer.addEventListener(egret.TimerEvent.TIMER,this.timerHandler,this);
		timer.start();

		this.index = 0;
	}

	private index:number;

	private timerHandler(e:egret.TimerEvent):void
	{
		var str = this.text.substr(0,this.index + 1);
		this.txtContent.text = str;
		this.txtContent1.text = str;
		this.txtContent2.text = str;
		this.index ++;

		if(this.index == this.text.length)
		{
			var timer = new egret.Timer(100,this.text.length);
			timer.addEventListener(egret.TimerEvent.TIMER,this.timerHandler1,this);
			timer.start();
		}
	}

	private timerHandler1():void
	{
		var str = this.text.substr(0,this.index - 1);
		this.txtContent.text = str;
		this.txtContent1.text = str;
		this.txtContent2.text = str;
		this.index --;

		if(this.index <= 0)
		{
			var self = this;
			egret.Tween.get(this).wait(200).call(function(){
				self.txtContent.text = self.text;
				self.txtContent1.text = self.text;
				self.txtContent2.text = self.text;
			}).wait(100).call(function(){
				self.txtContent.text = "";
				self.txtContent1.text = "";
				self.txtContent2.text = "";
			}).wait(100).call(function(){
				self.txtContent.text = self.text;
				self.txtContent1.text = self.text;
				self.txtContent2.text = self.text;
			}).call(function(){
				self.end();
			});
		}
	}

	private end():void
	{
		
	}
}