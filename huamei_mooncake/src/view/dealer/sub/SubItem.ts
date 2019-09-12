class SubItem extends egret.Sprite
{
	public data;

	private txtStatus:egret.TextField;

	public constructor()
	{
		super();
	}

	public setData(data):void
	{
		this.data = data;

		var line = new CustomImage("resource/assets/asyn/order/line2.png",true,()=>{
			line.width = 600;
			line.y = 0;
		});
		this.addChild(line);

		var txtName = new egret.TextField();
		txtName.x = 0;
		txtName.y = 0;
		txtName.width = 200;
		txtName.height = 80;
		txtName.textAlign = "center";
		txtName.verticalAlign = egret.VerticalAlign.MIDDLE;
		txtName.textColor = 0x07308B;
		this.addChild(txtName);

		var txtCount = new egret.TextField();
		txtCount.x = 200;
		txtCount.y = 0;
		txtCount.width = 200;
		txtCount.height = 80;
		txtCount.textAlign = "center";
		txtCount.verticalAlign = egret.VerticalAlign.MIDDLE;
		txtCount.textColor = 0x07308B;
		this.addChild(txtCount);

		var spPoint = new egret.Sprite();
		spPoint.width = 80;
		spPoint.height = 80;
		spPoint.x = 520;
		this.addChild(spPoint);
		var point = new CustomImage("resource/assets/asyn/sub/btn_point.png",true,()=>{
			point.x = 26;
			point.y = 37.5;
		});
		spPoint.addChild(point);
		Global.setBut(spPoint);
		spPoint.addEventListener(egret.TouchEvent.TOUCH_TAP,()=>{
			console.log("1111");
			PopManager.showPop("SubInfoPop",this.data);
		},this);

		var spStatus = new egret.Sprite();
		spStatus.width = 100;
		spStatus.height = 80;
		spStatus.x = 450;
		this.addChild(spStatus);

		var txtStatus = new egret.TextField();
		txtStatus.x = 0;
		txtStatus.y = 0;
		txtStatus.height = 80;
		txtStatus.verticalAlign = egret.VerticalAlign.MIDDLE;
		txtStatus.textColor = 0x07308B;
		spStatus.addChild(txtStatus);
		this.txtStatus = txtStatus;

		var arrow = new CustomImage("resource/assets/asyn/sub/btn_arrow.png",true,()=>{
			arrow.x = 60;
			arrow.y = 33;
		});
		spStatus.addChild(arrow);

		Global.setBut(spStatus);
		spStatus.addEventListener(egret.TouchEvent.TOUCH_TAP,()=>{
			if(txtStatus.text == "启用")
			{
				this.update(0);
			}else
			{
				this.update(1);
			}
		},this);

		txtName.text = this.data.name + "";
		txtCount.text = this.data.user + "";
		this.refreshStatus(this.data.status);
	}

	private refreshStatus(status):void
	{
		if(status == 1)
		{
			this.txtStatus.text = "启用";
		}else
		{
			this.txtStatus.text = "禁用";
		}
	}

	private update(status) {
		Global.post("cs/msa", {status:status,subaccountkey:this.data.subaccountkey,name:this.data.name,phone:this.data.phone}).then((data: any) => {
			this.data.status = status;
			this.refreshStatus(status);
		});
	}
}