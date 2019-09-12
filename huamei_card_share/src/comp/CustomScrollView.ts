class CustomScrollView extends egret.DisplayObjectContainer
{
	private container:egret.DisplayObjectContainer;

	private _containerHeight:number = StageUtils.SH;

	private maskBg:egret.Shape;

	public constructor()
	{
		super();
		this.maskBg = new egret.Shape();
		this.maskBg.graphics.beginFill(0x000000,0);
		this.maskBg.graphics.drawRect(0,0,StageUtils.SW,StageUtils.SH);
		this.maskBg.graphics.endFill();
		this.addChild(this.maskBg);

		this.container = new egret.DisplayObjectContainer();
		this.addChild(this.container);

		this.touchEnabled = true;
		this.addEventListener(egret.TouchEvent.TOUCH_BEGIN,this.touchBegin,this);
		this.addEventListener(egret.TouchEvent.TOUCH_MOVE,this.touchMove,this);
		this.addEventListener(egret.TouchEvent.TOUCH_TAP,this.touchEnd,this,true);
		this.addEventListener(egret.TouchEvent.TOUCH_RELEASE_OUTSIDE,this.touchEnd,this);
	}

	public set containerHeight(val)
	{
		this._containerHeight = val;
	}

	public get containerHeight()
	{
		return this._containerHeight;
	}

	private touchBegin(evt:egret.TouchEvent):void
	{
		this.beginStageY = 0;
		this.isMove = false;
	}

	private beginStageY:number;
	private isMove:boolean;
	private touchMove(evt:egret.TouchEvent):void
	{
		if(this.beginStageY)
		{
			var tempY = evt.stageY;
			var temp = tempY - this.beginStageY;
			this.container.y += temp;
		}
		this.isMove = true;
		this.beginStageY = evt.stageY;
	}

	private touchEnd(evt:egret.TouchEvent):void
	{
		if(this.container.y > 0)
		{
			egret.Tween.get(this.container).to({y:0},500,egret.Ease.circOut);
		}else if(this.container.y + this.container.height < this.containerHeight)
		{
			if(this.container.height > this.containerHeight)
			{
				egret.Tween.get(this.container).to({y:this.containerHeight - this.container.height},500,egret.Ease.circOut);
			}else
			{
				egret.Tween.get(this.container).to({y:0},500,egret.Ease.circOut);
			}
		}
		if(this.isMove)
		{
			evt.stopImmediatePropagation();
			evt.stopPropagation();
		}
	}

	public addItem(child,vpos:boolean = true):void
	{
		if(vpos)
		{
			child.y = this.container.height;
		}
		this.container.addChild(child);
	}
}