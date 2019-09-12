class OtherExchangePop extends PopView {
	public constructor() {
		super();
	}

	public setData(data): void {
		super.setData(data);

		var bg = new CustomImage("resource/assets/asyn/personal/address_bg.jpg", true, () => {
			bg.width = StageUtils.SW;
			bg.height = StageUtils.SH;
		});
		this.addChild(bg);

		var btnDuihuan = new CustomImage("resource/assets/asyn/personal/btn_ok.png", true, () => {
			btnDuihuan.x = 75;
			btnDuihuan.y = StageUtils.SH - 125;
		});
		this.addChild(btnDuihuan);

		var btnBack = new CustomImage("resource/assets/asyn/personal/btn_back.png", true, () => {
			btnBack.x = StageUtils.SW - btnBack.width - 75;
			btnBack.y = StageUtils.SH - 125;
		});
		this.addChild(btnBack);

		Global.setBut(btnDuihuan);
		Global.setBut(btnBack);

		btnDuihuan.addEventListener(egret.TouchEvent.TOUCH_TAP, () => {
			if (BuySendItem.selectItem) {
				this.data.couponkeyfrom = this.data.couponkey;
				this.data.couponkeyto = BuySendItem.selectItem.data.couponkey;//新的//this.data.couponkey;
				this.data.name = BuySendItem.selectItem.data.name;
				PopManager.showPop("AddressPop", this.data);
			}
		}, this);
		btnBack.addEventListener(egret.TouchEvent.TOUCH_TAP, () => {
			PopManager.hidePop("OtherExchangePop");
		}, this);

		var container = new egret.DisplayObjectContainer();

		var scroll = new egret.ScrollView(container);

		scroll.width = StageUtils.SW;
		scroll.height = 820;
		scroll.x = 0;
		scroll.y = 50;
		scroll.horizontalScrollPolicy = "off";
		this.addChild(scroll);

		if (this.data.list) {
			var len = this.data.list.length;
			for (var i = 0; i < len; i++) {
				var item = new BuySendItem(this.data.list[i]);
				item.y = 142 + 280 * i;
				item.x = 283.5 + 36.5;
				container.addChild(item);
			}
		}
	}
}