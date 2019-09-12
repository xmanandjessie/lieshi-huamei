class PersonalPop extends PopView {
	public constructor() {
		super();
	}

	public setData(data): void {
		super.setData(data);

		this.initView();
	}

	private infoHandler(): void {
		PopManager.hidePop("AddressPop");
		PopManager.showPop("InfoPop");
	}

	private initView(): void {
		document.getElementById("title").innerHTML = this.data.shortname + "-智能礼券支付";
		var bg = new CustomImage("resource/assets/asyn/moontype/1/" + Global.getTypeByName(this.data.name) + ".jpg", true, () => {
			bg.width = StageUtils.SW;
			bg.height = StageUtils.SH;
		});
		this.addChild(bg);

		var btnInfo = Global.createBitmapByName("btn_info_png");
		btnInfo.x = StageUtils.SW - btnInfo.width - 20;
		btnInfo.y = 20;
		this.addChild(btnInfo);
		Global.setBut(btnInfo);
		btnInfo.addEventListener(egret.TouchEvent.TOUCH_TAP, this.infoHandler, this);


		var btnDuihuan = new CustomImage("resource/assets/asyn/personal/btn_ok" + (this.data.status ? "1" : "") + ".png", true, () => {
			btnDuihuan.y = StageUtils.SH - btnDuihuan.height / 2 - 150;

			if (this.data.list && this.data.list.length > 0) {
				var btnOther = new CustomImage("resource/assets/asyn/personal/btn_other.png", true, () => {
					btnOther.x = StageUtils.SW - btnOther.width - 50;
					btnOther.y = StageUtils.SH - btnOther.height / 2 - 150;
				});
				this.addChild(btnOther);
				Global.setBut(btnOther);
				btnOther.addEventListener(egret.TouchEvent.TOUCH_TAP, this.otherHandler, this);

				btnDuihuan.x = 50;

			} else {
				btnDuihuan.x = StageUtils.SW - btnDuihuan.width >> 1;
			}
		});
		this.addChild(btnDuihuan);
		Global.setBut(btnDuihuan);
		btnDuihuan.addEventListener(egret.TouchEvent.TOUCH_TAP, this.duihuanHandler, this);
	}

	private duihuanHandler(): void {
		if (this.data.status == "offshelf") {
			PopManager.showPop("QueHuoPop");
			console.log("缺货");
		} else if (this.data.status == "iscoming") {
			PopManager.showPop("QueHuoPop");
			console.log("将于" + this.data.timeon + "隆重登场");
		} else if (this.data.status == "topay") {
			console.log("未激活");
			PopManager.showPop("HasGetBuyPop");
			PopManager.hidePop("PersonalPop");
		} else if (this.data.status == "exchanged") {
			console.log("已兑换");
			PopManager.showPop("HasGetInfoPop");
			PopManager.hidePop("PersonalPop");
		} else {
			PopManager.showPop("ExchangeConfirmPop", this.data);
		}
	}

	private otherHandler(): void {
		PopManager.showPop("OtherExchangePop",this.data);
	}

	private shareHandler(): void {
		if (this.data) {
			if (this.data.type == 0) {
				//纸卷
				var self = this;
				$.ajax({
					url: Main.USER_INFO_API,
					data: { type: "pshare", ticket: Main.USER_TICKET, ptype: this.data.ptype },
					success: function (data) {
						if (data.result == 0) {
							PopManager.hidePop("PersonalPop");
							PopManager.showPop("SharePop", { code: data.code });
						} else {
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
			} else {
				//电子卷
				var self = this;
				$.ajax({
					url: Main.USER_INFO_API,
					data: { type: "eshare", ticket: Main.USER_TICKET, ptype: this.data.ptype },
					success: function (data) {
						if (data.result == 0) {
							PopManager.hidePop("PersonalPop");
							PopManager.showPop("SharePop", { eshareinfo: data.eshareinfo, time: data.sharetime });
						} else {
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
		}
	}
}