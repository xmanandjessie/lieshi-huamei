class ListPop extends PopView {
	private container: egret.DisplayObjectContainer;

	private itemList = [];

	private allSelect: egret.Sprite;

	private imgSelect: egret.Bitmap;

	private txtSelect: egret.TextField;

	public constructor() {
		super();
	}

	public setData(data): void {
		super.setData(data);

		var title = Global.createBitmapByName("list_title_png");
		title.x = StageUtils.SW - title.width >> 1;;
		title.y = 0;
		this.addChild(title);

		var btnHelp = Global.createBitmapByName("btn_help_png");
		btnHelp.x = 20;
		btnHelp.y = 38;
		this.addChild(btnHelp);
		Global.setBut(btnHelp);
		btnHelp.addEventListener(egret.TouchEvent.TOUCH_TAP, this.helpHandler, this);

		var btnContinue = Global.createBitmapByName("btn_continue_png");
		btnContinue.x = 46;
		btnContinue.y = StageUtils.SH - btnContinue.height - 75;
		this.addChild(btnContinue);
		Global.setBut(btnContinue);
		btnContinue.visible = false;

		var btnPay = Global.createBitmapByName("btn_pay_png");
		btnPay.x = StageUtils.SW - btnPay.width >> 1;
		btnPay.y = StageUtils.SH - btnPay.height - 75;
		this.addChild(btnPay);
		Global.setBut(btnPay);

		var btnLogout = Global.createBitmapByName("btn_logout_png");
		btnLogout.x = 170;
		btnLogout.y = StageUtils.SH - 50;
		this.addChild(btnLogout);
		Global.setBut(btnLogout);

		var btnSelf = Global.createBitmapByName("btn_center_png");
		btnSelf.x = StageUtils.SW - btnSelf.width - 170;
		btnSelf.y = StageUtils.SH - 50;
		this.addChild(btnSelf);
		Global.setBut(btnSelf);

		btnContinue.addEventListener(egret.TouchEvent.TOUCH_TAP, this.containerHandler, this);
		btnPay.addEventListener(egret.TouchEvent.TOUCH_TAP, this.payHandler, this);
		btnLogout.addEventListener(egret.TouchEvent.TOUCH_TAP, this.logoutHandler, this);
		btnSelf.addEventListener(egret.TouchEvent.TOUCH_TAP, this.selfHandler, this);

		this.container = new egret.DisplayObjectContainer();
		// this.addChild(this.container);

		var scroll: egret.ScrollView = new egret.ScrollView();
		scroll.setContent(this.container);
		scroll.horizontalScrollPolicy = "off";
		scroll.scrollSpeed = 0.5;
		this.addChild(scroll);
		scroll.x = 0;
		scroll.y = 93;
		scroll.width = StageUtils.SW;
		scroll.height = 700;

		this.allSelect = new egret.Sprite();
		this.allSelect.x = 127;
		this.allSelect.y = StageUtils.SH - 220;
		this.addChild(this.allSelect);
		this.allSelect.touchEnabled = true;
		this.allSelect.addEventListener(egret.TouchEvent.TOUCH_TAP, this.allSelectHandler, this);

		this.imgSelect = Global.createBitmapByName("check_no_png");
		this.allSelect.addChild(this.imgSelect);

		this.txtSelect = new egret.TextField();
		this.txtSelect.textColor = 0x2D3B56;
		this.txtSelect.text = "全选";
		this.txtSelect.size = 26;
		this.txtSelect.x = 35;
		this.allSelect.addChild(this.txtSelect);

		this.allSelect.graphics.beginFill(0xe6e6e6);
		this.allSelect.graphics.drawRect(0, 0, this.allSelect.width, this.allSelect.height);
		this.allSelect.graphics.endFill();

		var tips = new egret.TextField();
		tips.text = "注意：本月饼券暂不支持港澳台、内蒙古、西藏、青海和新疆地区兑换收货";
		tips.textColor = 0xFE3E55;
		tips.size = 18;
		// tips.x = 225;
		// tips.y = 836;

		tips.x = StageUtils.SW - tips.width >> 1;
		tips.y = 850;

		this.addChild(tips);
		tips.visible = false;

		GameDispatcher.instance.addEventListener("item_cancel", this.itemCancel, this);

		this.getData();
	}

	private itemCancel(): void {
		this.isAllSelect = false;
		this.imgSelect.texture = RES.getRes("check_no_png");
	}

	private helpHandler(): void {
		PopManager.showPop("TipsPop", { url: "tips_bg_png", callback: () => { } });
	}

	private isAllSelect = false;
	private allSelectHandler(): void {
		this.isAllSelect = !this.isAllSelect;
		if (this.isAllSelect) {
			this.imgSelect.texture = RES.getRes("check_ok_png");
		} else {
			this.imgSelect.texture = RES.getRes("check_no_png");
		}
		var len = this.itemList.length;
		for (var i = 0; i < len; i++) {
			var item = this.itemList[i];
			if (item && item.data.rest && item.data.status == "topay") {
				item.select = this.isAllSelect;
			}
		}
	}

	private logoutHandler(): void {
		//登出
		Global.setItem("login_key", "");
		PopManager.hidePop("ListPop");
		PopManager.showPop("LoginPop");
	}

	private containerHandler(): void {
		console.log("sdsfsd");

		var self = this;
		var weixin = eval("wx");
		weixin.scanQRCode({
			needResult: 1, // 默认为0，扫描结果由微信处理，1则直接返回扫描结果，
			scanType: ["qrCode", "barCode"], // 可以指定扫二维码还是一维码，默认二者都有
			success: function (res) {
				var result = res.resultStr; // 当needResult 为 1 时，扫码返回的结果
				var list = result.split("/");
				self.getDataByCode("h/" + list[list.length - 1]);
			},
			fail: function (res) {
				alert(JSON.stringify(res));
			}
		});
	}

	private payHandler(): void {

		if (Date.now() >= 1567958400000) {
			PopManager.showPop("ErrorPop1",{url:"resource/assets/asyn/error/end.png"});
			return;
		}

		var result = [];
		var len = this.itemList.length;
		for (var i = 0; i < len; i++) {
			var item = this.itemList[i];
			if (item && item.select) {
				result.push(item.data);
			}
		}
		if (result.length) {
			PopManager.hidePop("ListPop");
			PopManager.showPop("ConfimPayPop", result);
		} else {
			Message.show("请勾选要购买的物品!");
		}
		// var str = result.join(",");
		// if(str)
		// {
		// 	// PopManager.hidePop("ListPop");
		// 	// PopManager.showPop("PayPop",str);
		// }else
		// {
		// 	Message.show("请勾选要购买的物品!");
		// }
	}

	private itemDataList = [];

	private innerData(data): void {
		var list = data.list;
		var len = list.length;
		for (var i = 0; i < len; i++) {
			var item: any = {};
			item.couponid = data.couponid;
			item.couponkey = data.couponkey;
			item.discount = data.discount;
			item.discountedvalue = data.discountedvalue;
			item.name = data.name;
			item.scanedcodekey = data.scanedcodekey;
			item.shortname = data.shortname;
			item.value = data.value;
			item.code1 = data.list[i].code1;
			item.codekey = data.list[i].codekey;
			item.seq = data.list[i].seq;
			item.status = data.list[i].status;
			item.rest = 10;
			this.itemDataList.push(item);
		}
	}
	private refreshData(data): void {

		this.innerData(data);

		var list = this.itemDataList;
		this.itemList.length = 0;
		this.container.removeChildren();

		// for(var i = 0;i<100;i++)
		// {
		// 	var obj:any = {};
		// 	obj.name = "111111";
		// 	obj.value = "111";
		// 	obj.code1 = "111111";
		// 	obj.discount = "1";
		// 	obj.discountedvalue = "1";
		// 	obj.rest = 6;
		// 	obj.status = "topay"
		// 	list.push(obj);
		// }


		var len = list.length;
		for (var i = 0; i < len; i++) {
			var item = new ListItem();
			item.y = i * 53;
			item.setData(list[i]);
			this.container.addChildAt(item, 0);
			this.itemList.push(item);

			if (i == len - 1) {
				var line = Global.createBitmapByName("list_line2_png");
				line.x = 0;
				line.y = i * 53 + 89;
				this.container.addChildAt(line, 1);
			}
		}
	}

	private getData(): void {
		var self = this;
		$.ajax({
			url: Main.ROOT + "n/rgc",
			data: { eid: Main.EID, scankey: Main.USER_TICKET, loginkey: Main.LOGIN_KEY },
			success: function (data) {
				if (data.state == "success") {
					self.refreshData(data.data);
				} else {
					Message.show(data.error);
				}
			},
			error: function () {
			}, timeout: 8000,
			dataType: "json", async: true, type: "POST",
			complete: function (XMLHttpRequest, status) {
				if (status == 'timeout') {
				}
			}
		});
	}

	private getDataByCode(result): void {
		var self = this;
		$.ajax({
			url: Main.ROOT + "n/rgc",
			data: { eid: Main.EID, scankey: Main.USER_TICKET, loginkey: Main.LOGIN_KEY },
			success: function (data) {
				if (data.result == 0) {
					self.refreshData(data.list);
				} else if (data.result == 1) {
					Message.show("已支付!");
				}
				else {
					Message.show(data.result);
				}
			},
			error: function () {
			}, timeout: 8000,
			dataType: "json", async: true, type: "POST",
			complete: function (XMLHttpRequest, status) {
				if (status == 'timeout') {
					PopManager.showPop("ErrorPop", { url: "resource/assets/asyn/error/error_web.png" });
				}
			}
		});
	}

	private selfHandler(): void {
		PopManager.hidePop("ListPop");
		PopManager.showPop("SelfPop");
	}
}