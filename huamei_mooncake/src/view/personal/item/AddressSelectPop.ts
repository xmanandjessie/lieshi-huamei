class AddressSelectPop extends PopView
{
	public constructor()
	{
		super();
	}

	public show():void
	{
		var bg=new egret.Shape()
      
        bg.graphics.beginFill(0x0,0.7);
        bg.graphics.drawRect(0,0,StageUtils.stage.stageWidth,StageUtils.stage.stageHeight);
        bg.graphics.endFill();

        // this.view.scaleY = Main.scale;
        // this.view.x=600;
        // this.view.y=320;
        
        this.addChildAt(bg,0);
        bg.alpha=0;
        Global.fadeIn(bg);

		UIManager.instance.popLayer.addChild(this);
		this.touchEnabled = true;
	}

	public setData(data):void
	{
		super.setData(data);

		var btnClose = Global.createBitmapByName("btn_change_close_png");
		btnClose.x = StageUtils.SW - btnClose.width - 30;
		btnClose.y = 30;
		this.addChild(btnClose);
		Global.setBut(btnClose);
		btnClose.addEventListener(egret.TouchEvent.TOUCH_TAP,()=>{
			PopManager.hidePop("AddressSelectPop");
		},this);

		Global.post("n/wish",{}).then((res:any)=>{
			if(res)
			{
				var len = res.length;
				for(var i = 0;i<len;i++)
				{
					var txt:any = new egret.TextField();
					txt.width = StageUtils.SW;
					txt.height = 30;
					txt.textAlign = "center";
					txt.verticalAlign = egret.VerticalAlign.MIDDLE;
					txt.text = res[i].name;
					txt.value = res[i].value;
					txt.size = 24;
					txt.x = 0;
					txt.y = 100 + i * 34;
					this.addChildAt(txt,1);

					Global.setBut(txt);
					txt.addEventListener(egret.TouchEvent.TOUCH_TAP,(e:egret.TouchEvent)=>{
						if(e.target)
						{
							if(e.target.value)
							{
								this.data && this.data(e.target.value);
								PopManager.hidePop("AddressSelectPop");
							}
						}
					},this);
				}
			}
		});

		
	}
}