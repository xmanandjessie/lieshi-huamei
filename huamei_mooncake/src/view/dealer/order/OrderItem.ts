class OrderItem extends egret.Sprite
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
		this.graphics.drawRoundRect(0,0,600,133,20)
		this.graphics.endFill();

		var txtName = new egret.TextField();
		txtName.x = 30;
		txtName.y = 30;
		txtName.textColor = 0x072a47;
		this.addChild(txtName);

		var txtCount = new egret.TextField();
		txtCount.x = 250;
		txtCount.y = 30;
		txtCount.textColor = 0xff4900;
		this.addChild(txtCount);

		var xiaoji = new egret.TextField();
		xiaoji.x = 30;
		xiaoji.y = 80;
		xiaoji.textColor = 0x072a47;
		xiaoji.text = "小计：";
		xiaoji.size = 24;
		this.addChild(xiaoji);

		var txtPrice = new egret.TextField();
		txtPrice.x = 100;
		txtPrice.y = 80;
		txtPrice.textColor = 0xff4900;
		txtPrice.size = 24;
		this.addChild(txtPrice);

		txtName.text = data.couponname + "";
		txtCount.text = "X"+data.couponum;
		txtPrice.text = "￥"+data.distotal;

		var btnDetail;
		
		if(this.data.status == 'i')
		{
			btnDetail = new CustomImage("resource/assets/asyn/order/btn_pay.png",true,()=>{
				btnDetail.x = this.width - 144 - 30;
				btnDetail.y = 20;
				btnDetail.width = 144;
				btnDetail.height = 40;
			});
			var btnCancel = new CustomImage("resource/assets/asyn/order/btn_cancel.png",true,()=>{
				btnCancel.x = this.width - 144 - 30;
				btnCancel.y = 70;
				btnCancel.width = 144;
				btnCancel.height = 40;
			});
			this.addChild(btnCancel);
			Global.setBut(btnCancel);

			btnCancel.addEventListener(egret.TouchEvent.TOUCH_TAP,()=>{
				this.sendCancel(this.data.orderkey);
			},this);
		}else
		{
			btnDetail = Global.createBitmapByName("btn_detail_png");
			btnDetail.x = this.width - btnDetail.width - 30;
			btnDetail.y = 46;
			btnDetail.visible = false;
		}
		
		this.addChild(btnDetail);
		Global.setBut(btnDetail);
		btnDetail.addEventListener(egret.TouchEvent.TOUCH_TAP,this.detailHandler,this);
	}

	private detailHandler():void
	{
		if(this.data)
		{
			if(this.data.status == 'i')
			{
				this.sendPay(this.data.orderkey);
			}else
			{
				PopManager.showPop("PayDetailPop",this.data);
			}
		}
	}

	private sendPay(orderkey) {
		Global.post("wxp/" + Main.EID + "/" + orderkey, {}).then((data: any) => {
			var weixin = eval("wx");
			weixin.chooseWXPay({
				appId: data.wxpayjsparams.appId,
				timestamp: data.wxpayjsparams.timeStamp, // 支付签名时间戳，注意微信jssdk中的所有使用timestamp字段均为小写。但最新版的支付后台生成签名使用的timeStamp字段名需大写其中的S字符
				nonceStr: data.wxpayjsparams.nonceStr, // 支付签名随机串，不长于 32 位
				package: data.wxpayjsparams.package, // 统一支付接口返回的prepay_id参数值，提交格式如：prepay_id=***）
				signType: 'HMACSHA256', // 签名方式，默认为'SHA1'，使用新版支付需传入'MD5'
				paySign: data.wxpayjsparams.paySign, // 支付签名
				success: (res) => {
					// 支付成功后的回调函数
					PopManager.hidePop("OrderPop");
					PopManager.showPop("PayOKPop", { price: this.data.distotal });
				}, fail: (res) => {
					alert("微信支付失败[" + res.err_msg + "]");
					// this.sendCancel(orderkey)
					// this.backListPop();
				}, cancel: (res) => {
					// this.sendCancel(orderkey)
				}
			});
		}).catch((error) => {

		});
	}

	private sendCancel(orderkey): void {
		Global.post("cs/cancel", { scankey: Main.USER_TICKET, loginkey: Main.LOGIN_KEY, eid: Main.EID, orderkey: orderkey }).then((data) => {
			console.log("订单已取消");
			Message.show("订单已取消");
			PopManager.hidePop("OrderPop");
			PopManager.showPop("OrderPop");
		});
	}
}