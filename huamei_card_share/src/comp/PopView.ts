class PopView extends egret.DisplayObjectContainer 
{
	public data:any;

	protected container:egret.DisplayObjectContainer;

	public constructor() 
	{
		super();
	}

	public show():void
	{
		var bg=new egret.Shape()
      
        bg.graphics.beginFill(0x0,0.8);
        bg.graphics.drawRect(0,0,StageUtils.stage.stageWidth,StageUtils.stage.stageHeight);
        bg.graphics.endFill();
		bg.touchEnabled = true;

        // this.view.scaleY = Main.scale;
        // this.view.x=600;
        // this.view.y=320;
        
        this.addChildAt(bg,0);
        bg.alpha=0;
        Global.fadeIn(bg);

		UIManager.instance.popLayer.addChild(this);
	}

	public hide():void
	{
		UIManager.instance.popLayer.removeChild(this);
	}

	public setData(data:any = null):void
	{
		this.data = data;
	}

	protected initBg():void
	{
		this.container = new egret.DisplayObjectContainer();
		this.addChild(this.container);

		var bg1 = new CustomImage("resource/assets/main_bg1.png");//Global.createBitmapByName("main_bg1_png");
		bg1.x = StageUtils.SW - 604 >> 1;
		bg1.y = StageUtils.SH - 921 >> 1;
		this.container.addChild(bg1);

		egret.Tween.get(this.container,{loop:true}).to({skewX:0.3},2000,egret.Ease.quadOut).to({skewX:0},2000,egret.Ease.quadIn).to({skewX:-0.3},2000,egret.Ease.quadOut).to({skewX:0},2000,egret.Ease.quadIn);
	}

	protected initTitle():void
	{
		var title2 = Global.createBitmapByName("title1_png");
        title2.x = StageUtils.SW - title2.width >> 1;
        title2.y = 140;
        this.container.addChild(title2);

		var title = Global.createBitmapByName("hengfu_png");
		title.x = StageUtils.SW - title.width >> 1;
		title.y = 170;
		this.container.addChild(title);
	}

	protected initClose():void
	{
		var close = Global.createBitmapByName("close_png");
		close.x = StageUtils.SW - close.width - 60;
		close.y = 110;
		this.container.addChild(close);
		close.touchEnabled = true;
		Global.setBut(close);
		close.addEventListener(egret.TouchEvent.TOUCH_TAP,this.closeTouchHandler,this);
	}

	protected closeTouchHandler():void
	{
		
	}
}