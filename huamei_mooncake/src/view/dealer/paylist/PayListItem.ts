class PayListItem extends egret.Sprite
{
	public data;

	public len;
	public price;
	public constructor()
	{
		super();
	}

	public setData(data):void
	{
		this.data = data;

		this.graphics.beginFill(0xffffff);
		this.graphics.drawRoundRect(0,0,600,680,20);
		this.graphics.endFill();

		var txt1 = new egret.TextField();
		txt1.textColor = 0xaaaaaa;
		txt1.text = "系统订单号:";
		txt1.size = 20;
		txt1.x = 30;
		txt1.y = 30;
		this.addChild(txt1);

		var txt1_1 = new egret.TextField();
		txt1_1.textColor = 0xaaaaaa;
		txt1_1.text = "" + this.data.orderkey;
		txt1_1.x = 230;
		txt1_1.y = 30;
		txt1_1.size = 16;
		this.addChild(txt1_1);

		var txt1 = new egret.TextField();
		txt1.textColor = 0xaaaaaa;
		txt1.text = "礼卷张数:";
		txt1.size = 20;
		txt1.x = 30;
		txt1.y = 80;
		this.addChild(txt1);

		var txt1_1 = new egret.TextField();
		txt1_1.textColor = 0xaaaaaa;
		txt1_1.text = "" + this.data.couponum;
		txt1_1.x = 230;
		txt1_1.y = 80;
		txt1_1.size = 20;
		this.addChild(txt1_1);

		var txt1 = new egret.TextField();
		txt1.textColor = 0xaaaaaa;
		txt1.text = "支付方式:";
		txt1.size = 20;
		txt1.x = 30;
		txt1.y = 130;
		this.addChild(txt1);

		var txt1_1 = new egret.TextField();
		txt1_1.textColor = 0xaaaaaa;
		txt1_1.text = "" + this.data.from == "z" ? "支付宝" : "微信";
		txt1_1.x = 230;
		txt1_1.y = 130;
		txt1_1.size = 20;
		this.addChild(txt1_1);

		var txt1 = new egret.TextField();
		txt1.textColor = 0xaaaaaa;
		txt1.text = "经销商名称:";
		txt1.size = 20;
		txt1.x = 30;
		txt1.y = 180;
		this.addChild(txt1);

		var txt1_1 = new egret.TextField();
		txt1_1.textColor = 0xaaaaaa;
		txt1_1.text = "" + this.data.agentcompany;
		txt1_1.x = 230;
		txt1_1.y = 180;
		txt1_1.size = 20;
		this.addChild(txt1_1);

		var txt1 = new egret.TextField();
		txt1.textColor = 0xaaaaaa;
		txt1.text = "经销商支付账号:";
		txt1.size = 20;
		txt1.x = 30;
		txt1.y = 230;
		this.addChild(txt1);

		var txt1_1 = new egret.TextField();
		txt1_1.textColor = 0xaaaaaa;
		txt1_1.text = "" + this.data.accountuser;
		txt1_1.x = 230;
		txt1_1.y = 230;
		txt1_1.size = 20;
		this.addChild(txt1_1);

		var txt1 = new egret.TextField();
		txt1.textColor = 0xaaaaaa;
		txt1.text = "支付金额:";
		txt1.size = 20;
		txt1.x = 30;
		txt1.y = 280;
		this.addChild(txt1);

		var txt1_1 = new egret.TextField();
		txt1_1.textColor = 0xaaaaaa;
		txt1_1.text = "" + this.data.distotal;
		txt1_1.x = 230;
		txt1_1.y = 280;
		txt1_1.size = 20;
		this.addChild(txt1_1);

		var txt1 = new egret.TextField();
		txt1.textColor = 0xaaaaaa;
		txt1.text = "支付状态:";
		txt1.size = 20;
		txt1.x = 30;
		txt1.y = 330;
		this.addChild(txt1);

		var txt1_1 = new egret.TextField();
		txt1_1.textColor = 0xaaaaaa;
		txt1_1.text = "" + this.data.status == "d" ? "已支付" : "未支付";
		txt1_1.x = 230;
		txt1_1.y = 330;
		txt1_1.size = 20;
		this.addChild(txt1_1);

		var txt1 = new egret.TextField();
		txt1.textColor = 0xaaaaaa;
		txt1.text = "折扣:";
		txt1.size = 20;
		txt1.x = 30;
		txt1.y = 380;
		this.addChild(txt1);

		var txt1_1 = new egret.TextField();
		txt1_1.textColor = 0xaaaaaa;
		txt1_1.text = parseFloat(this.data.discount) / 10 + "折";
		txt1_1.x = 230;
		txt1_1.y = 380;
		txt1_1.size = 20;
		this.addChild(txt1_1);

		var txt1 = new egret.TextField();
		txt1.textColor = 0xaaaaaa;
		txt1.text = "礼卷名称:";
		txt1.size = 20;
		txt1.x = 30;
		txt1.y = 430;
		this.addChild(txt1);

		var txt1_1 = new egret.TextField();
		txt1_1.textColor = 0xaaaaaa;
		txt1_1.text = this.data.couponname + "";
		txt1_1.x = 230;
		txt1_1.y = 430;
		txt1_1.size = 20;
		this.addChild(txt1_1);

		var txt1 = new egret.TextField();
		txt1.textColor = 0xaaaaaa;
		txt1.text = "礼卷ID:";
		txt1.size = 20;
		txt1.x = 30;
		txt1.y = 480;
		this.addChild(txt1);

		var txt1_1 = new egret.TextField();
		txt1_1.textColor = 0xaaaaaa;
		txt1_1.text = this.data.couponid + "";
		txt1_1.x = 230;
		txt1_1.y = 480;
		txt1_1.size = 20;
		this.addChild(txt1_1);

		var txt1 = new egret.TextField();
		txt1.textColor = 0xaaaaaa;
		txt1.text = "下单时间:";
		txt1.size = 20;
		txt1.x = 30;
		txt1.y = 530;
		this.addChild(txt1);

		var txt1_1 = new egret.TextField();
		txt1_1.textColor = 0xaaaaaa;
		txt1_1.text = this.data.createtime + "";
		txt1_1.x = 230;
		txt1_1.y = 530;
		txt1_1.size = 20;
		this.addChild(txt1_1);

		var txt1 = new egret.TextField();
		txt1.textColor = 0xaaaaaa;
		txt1.text = "支付时间:";
		txt1.size = 20;
		txt1.x = 30;
		txt1.y = 580;
		this.addChild(txt1);

		var txt1_1 = new egret.TextField();
		txt1_1.textColor = 0xaaaaaa;
		txt1_1.text = this.data.lastupdatime + "";
		txt1_1.x = 230;
		txt1_1.y = 580;
		txt1_1.size = 20;
		this.addChild(txt1_1);

		var txt1 = new egret.TextField();
		txt1.textColor = 0xaaaaaa;
		txt1.text = "用户昵称:";
		txt1.size = 20;
		txt1.x = 30;
		txt1.y = 630;
		this.addChild(txt1);

		var txt1_1 = new egret.TextField();
		txt1_1.textColor = 0xaaaaaa;
		txt1_1.text = this.data.usernick + "";
		txt1_1.x = 230;
		txt1_1.y = 630;
		txt1_1.size = 20;
		this.addChild(txt1_1);
	}
}