class ConfimPayPop extends PopView {
	private dic;

	private allCount = 0;
	private allPrice = 0;
	private idList = [];

	private couponkey;
	public constructor() {
		super();
		this.dic = {};
	}

	public setData(data): void {
		super.setData(data);

		var bg = new egret.Shape();
		bg.graphics.beginFill(0xffffff);
		bg.graphics.drawRect(0, 0, StageUtils.SW, StageUtils.SH);
		bg.graphics.endFill();
		this.addChild(bg);

		var btnBack = Global.createBitmapByName("back_png");
		btnBack.x = 20;
		btnBack.y = 20;
		this.addChild(btnBack);
		Global.setBut(btnBack);
		btnBack.addEventListener(egret.TouchEvent.TOUCH_TAP,()=>{
			PopManager.hidePop("ConfimPayPop");
			PopManager.showPop("ListPop");
		},this);

		var title = Global.createBitmapByName("confim_order_title_png");
		title.x = StageUtils.SW - title.width >> 1;
		title.y = 40;
		this.addChild(title);

		var len = data.length;
		for (var i = 0; i < len; i++) {
			var obj = data[i];
			if (obj) {
				this.couponkey = obj.couponkey;
				this.idList.push(obj.codekey);
				if (!this.dic[obj.name]) {
					this.dic[obj.name] = [];
				}
				this.dic[obj.name].push(obj);
			}
		}

		len = this.dic.length;

		var index = 0;
		for (var str in this.dic) {
			var item = new ConfimPayItem();
			item.x = StageUtils.SW - 600 >> 1;
			item.y = 105 + index * 147;
			item.setData(this.dic[str]);
			this.addChild(item);
			index++;
			this.allCount += item.len;
			// this.allPrice += item.price;
			this.allPrice = Global.numAdd(this.allPrice,item.price);
		}

		var downbg = Global.createBitmapByName("down_bg_png");
		downbg.x = 0;
		downbg.y = StageUtils.SH - downbg.height;
		this.addChild(downbg);

		var txtCount = new egret.TextField();
		txtCount.x = 30;
		txtCount.y = StageUtils.SH - 55;
		txtCount.text = "总量:" + this.allCount + "盒";
		txtCount.textColor = 0x0;
		txtCount.size = 22;
		this.addChild(txtCount);

		var txtTotal = new egret.TextField();
		txtTotal.x = 180;
		txtTotal.y = StageUtils.SH - 55;
		txtTotal.text = "总计:";
		txtTotal.textColor = 0x0;
		txtTotal.size = 22;
		this.addChild(txtTotal);

		var txtAll = new egret.TextField();
		txtAll.x = 230;
		txtAll.y = StageUtils.SH - 63;
		txtAll.text = "￥" + this.allPrice;
		txtAll.textColor = 0xff4900;
		txtAll.size = 33;
		this.addChild(txtAll);

		var btnPay = Global.createBitmapByName("btn_pay_1_png");
		btnPay.x = StageUtils.SW - btnPay.width;
		btnPay.y = StageUtils.SH - btnPay.height;
		this.addChild(btnPay);
		Global.setBut(btnPay);
		btnPay.addEventListener(egret.TouchEvent.TOUCH_TAP, this.payTouchHandler, this);
	}

	private payTouchHandler(): void {
		var postData: any = {};
		postData.scankey = Main.USER_TICKET;
		postData.loginkey = Main.LOGIN_KEY;
		postData.eid = Main.EID;
		postData.codekeys = this.idList;
		postData.couponkey = this.couponkey;

		Global.post("cs/topay", postData).then((data: any) => {
			if (data.payingnum != undefined) {
				if (data.payingnum == "0") {
					this.showPayError();
					console.log("支付冲突，请重新选择后再支付");
				} else {
					if (confirm("有" + data.payingnum + "张支付冲突\n点确定:继续支付其它券折后总价" + data.distotal + "元\n点取消:取消本次支付")) {
						this.sendPay(data.orderkey);
					} else {
						this.sendCancel(data.orderkey);
					}
				}
			} else {
				this.sendPay(data.orderkey);
			}
		}).catch((error) => {
			console.log("error:" + error);
			this.showPayError();
		});
	}

	private sendPay(orderkey) {
		if (Global.isinweixin()) {
			Global.post("wxp/" + Main.EID + "/" + orderkey, { scankey: Main.USER_TICKET, loginkey: Main.LOGIN_KEY, eid: Main.EID }).then((data: any) => {

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
						PopManager.hidePop("ConfimPayPop");
						PopManager.showPop("PayOKPop", { price: this.allPrice });
					}, fail: (res) => {
						alert("微信支付失败[" + res.err_msg + "]");
						this.sendCancel(orderkey)
						// this.backListPop();
					}, cancel: (res) => {
						this.sendCancel(orderkey)
					}
				});
			}).catch((error) => {

			});
		} else if (Global.isinzhifubao()) {
			window.location.href = Main.ROOT + "zfb/" + Main.EID + "/" + orderkey;
		}
	}

	private sendCancel(orderkey): void {
		Global.post("cs/cancel", { scankey: Main.USER_TICKET, loginkey: Main.LOGIN_KEY, eid: Main.EID, orderkey: orderkey }).then((data) => {
			console.log("订单已取消");
			this.backListPop();
		});
	}

	private backListPop(): void {
		PopManager.hidePop("ConfimPayPop");
		PopManager.showPop("ListPop");
	}

	private showPayError(): void {
		PopManager.showPop("TipsPop", {
			url: "tips_error_png", callback: () => {
				this.backListPop();
			}
		});
	}
}