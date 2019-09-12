class CreateSubPop extends PopView
{
	private btnAdd:CustomImage;

	private txtNewPW:egret.TextField;

	private txtNewPW1:egret.TextField;

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

		var bg = new CustomImage("resource/assets/asyn/sub/create_bg.png",true,()=>{
			bg.x = StageUtils.SW - bg.width >> 1;
			bg.y = StageUtils.SH - bg.height >> 1;
		});
		this.addChild(bg);

		var btnClose = Global.createBitmapByName("btn_change_close_png");
		btnClose.x = 515;
		btnClose.y = 210;
		this.addChild(btnClose);
		Global.setBut(btnClose);
		btnClose.addEventListener(egret.TouchEvent.TOUCH_TAP,()=>{
			PopManager.hidePop("CreateSubPop");
		},this);

		this.btnAdd = new CustomImage("resource/assets/asyn/sub/btn_create.png",true,()=>{
			this.btnAdd.x = StageUtils.SW - this.btnAdd.width >> 1;  
			this.btnAdd.y = (StageUtils.SH - this.btnAdd.height >> 1) + 120;
		});
		this.addChild(this.btnAdd);
		Global.setBut(this.btnAdd);
		this.btnAdd.addEventListener(egret.TouchEvent.TOUCH_TAP,()=>{
			var newpw = this.txtNewPW.text.trim();
			var newpw1 = this.txtNewPW1.text.trim();
			
			if(!newpw || newpw == "请输入名称")
			{
				Message.show("请输入名称!");
			}else if(!newpw1 || newpw1 == "请输入电话")
			{
				Message.show("请输入电话!");
			}else if(newpw1.length != 11)
			{
				Message.show("电话号码格式不正确!");
			}
			else
			{
				Global.post("cs/csa",{name:newpw,phone:newpw1}).then((data)=>{
					Message.show("创建成功!");
					PopManager.hidePop("CreateSubPop");
					PopManager.hidePop("SubPop");
					PopManager.showPop("SubPop");
				}).catch((error)=>{
					Message.show("创建失败!");
				});
			}
		},this);

		var bg1 = new CustomImage("resource/assets/asyn/sub/input_bg.png",true,()=>{
			bg1.x = 300;
			bg1.y = (StageUtils.SH - bg1.height >> 1) - 35;
			this.txtNewPW.x = bg1.x + 20;
			this.txtNewPW.y = bg1.y;
		});
		this.addChild(bg1);
		var bg2 = new CustomImage("resource/assets/asyn/sub/input_bg.png",true,()=>{
			bg2.x = 300;
			bg2.y = (StageUtils.SH - bg2.height >> 1) + 30;
			this.txtNewPW1.x = bg2.x + 20;
			this.txtNewPW1.y = bg2.y;
		});
		this.addChild(bg2);

		this.txtNewPW = new egret.TextField();
		this.txtNewPW.width = 270;
		this.txtNewPW.height = 39;
		this.txtNewPW.verticalAlign = "middle";
		this.txtNewPW.fontFamily = "微软雅黑";
		this.txtNewPW.type = egret.TextFieldType.INPUT;
		this.txtNewPW.text = "请输入名称";
		this.txtNewPW.size = 24;
		this.txtNewPW.textColor = 0xC3C5C6;
		this.txtNewPW.maxChars = 20;
		
		this.addChild(this.txtNewPW);
		this.txtNewPW.addEventListener(egret.FocusEvent.FOCUS_IN,this.newIDFocusInHandler,this);
		this.txtNewPW.addEventListener(egret.FocusEvent.FOCUS_OUT,this.newIDFocusOutHandler,this);

		this.txtNewPW1 = new egret.TextField();
		this.txtNewPW1.width = 270;
		this.txtNewPW1.height = 39;
		this.txtNewPW1.verticalAlign = "middle";
		this.txtNewPW1.fontFamily = "微软雅黑";
		this.txtNewPW1.type = egret.TextFieldType.INPUT;
		this.txtNewPW1.text = "请输入电话";
		this.txtNewPW1.size = 24;
		this.txtNewPW1.maxChars = 11;
		this.txtNewPW1.restrict = "0-9";
		this.txtNewPW1.textColor = 0xC3C5C6;
		
		this.addChild(this.txtNewPW1);
		this.txtNewPW1.addEventListener(egret.FocusEvent.FOCUS_IN,this.newID1FocusInHandler,this);
		this.txtNewPW1.addEventListener(egret.FocusEvent.FOCUS_OUT,this.newID1FocusOutHandler,this);
	}

	private newIDFocusInHandler():void
	{
		if(this.txtNewPW.text == "请输入名称")
		{
			this.txtNewPW.text = "";
		}else
		{
		}
	}

	private newIDFocusOutHandler():void
	{
		if(this.txtNewPW.text == "")
		{
			this.txtNewPW.text = "请输入名称";
		}else
		{
		}
	}

	private newID1FocusInHandler():void
	{
		if(this.txtNewPW1.text == "请输入电话")
		{
			this.txtNewPW1.text = "";
		}else
		{
		}
	}

	private newID1FocusOutHandler():void
	{
		if(this.txtNewPW1.text == "")
		{
			this.txtNewPW1.text = "请输入电话";
		}else
		{
		}
	}
}