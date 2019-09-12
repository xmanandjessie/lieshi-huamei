class MailSelectPop extends PopView {
	public constructor() {
		super();
	}

	private txtState: egret.TextField;

	private txtName: egret.TextField;

	private txtTime: egret.TextField;

	private container: egret.DisplayObjectContainer;

	public show(): void {
		var bg = new egret.Shape()

		bg.graphics.beginFill(0x0, 0.7);
		bg.graphics.drawRect(0, 0, StageUtils.stage.stageWidth, StageUtils.stage.stageHeight);
		bg.graphics.endFill();

		this.addChildAt(bg, 0);
		bg.alpha = 0;
		Global.fadeIn(bg);

		UIManager.instance.popLayer.addChild(this);
		this.touchEnabled = true;
	}

	public setData(data): void {
		super.setData(data);

		var bg = new CustomImage("resource/assets/asyn/personal/wuliu_bg.png", true, () => {
			bg.x = StageUtils.SW - bg.width >> 1;
			bg.y = StageUtils.SH - bg.height >> 1;
		});
		this.addChild(bg);

		var btnClose = Global.createBitmapByName("btn_change_close_png");
		btnClose.x = 538;
		btnClose.y = 100;
		this.addChild(btnClose);
		Global.setBut(btnClose);
		btnClose.addEventListener(egret.TouchEvent.TOUCH_TAP, () => {
			PopManager.hidePop("MailSelectPop");
		}, this);

		var tips1: egret.TextField = new egret.TextField();
		tips1.text = "快递公司:" + this.data.delcomname;
		tips1.textColor = 0x002a88;
		tips1.size = 24;
		tips1.x = 110;
		tips1.y = 280;
		this.addChild(tips1);

		var tips2: egret.TextField = new egret.TextField();
		tips2.text = "运单号:" + this.data.delid;
		tips2.textColor = 0x002a88;
		tips2.size = 24;
		tips2.x = 110;
		tips2.y = 315;
		this.addChild(tips2);

		var line = new CustomImage("resource/assets/asyn/order/line2.png", true, () => {
			line.width = 465;
			line.x = StageUtils.SW - line.width >> 1;
			line.y = 350;
		});
		this.addChild(line);

		this.loadData(data);
	}

	private loadData(data): void {

		// var res = [
		// 	{ time: "2019/01/10 19:00:00", address: "哈哈哈路1", remark: "已签收" },
		// 	{ time: "2019/01/10 19:00:00", address: "哈哈哈路2", remark: "已签收" },
		// 	{ time: "2019/01/10 19:00:00", address: "哈哈哈路3", remark: "已签收" },
		// 	{ time: "2019/01/10 19:00:00", address: "哈哈哈路1", remark: "已签收" },
		// 	{ time: "2019/01/10 19:00:00", address: "哈哈哈路2", remark: "已签收" },
		// 	{ time: "2019/01/10 19:00:00", address: "哈哈哈路3", remark: "已签收" },
		// 	{ time: "2019/01/10 19:00:00", address: "哈哈哈路1", remark: "已签收" },
		// 	{ time: "2019/01/10 19:00:00", address: "哈哈哈路2", remark: "已签收" },
		// 	{ time: "2019/01/10 19:00:00", address: "哈哈哈路3", remark: "已签收" }
		// ];
		// this.container = new egret.DisplayObjectContainer();

		// var scroll = new egret.ScrollView(this.container);
		// scroll.width = StageUtils.SW;
		// scroll.height = 470;
		// scroll.x = 0;
		// scroll.y = 360;
		// scroll.horizontalScrollPolicy = "off";
		// this.addChild(scroll);

		// var len = res.length;
		// for (var i = 0; i < len; i++) {
		// 	var obj = res[i];
		// 	if (obj) {
		// 		var item = new MailItem();
		// 		item.setData(i, obj);
		// 		item.y = 90 * i;
		// 		this.container.addChild(item);
		// 	}
		// }
		// return;
		Global.post("n/logi", data).then((res: any) => {

			this.container = new egret.DisplayObjectContainer();

			var scroll = new egret.ScrollView(this.container);
			scroll.width = StageUtils.SW;
			scroll.height = 470;
			scroll.x = 0;
			scroll.y = 350;
			scroll.horizontalScrollPolicy = "off";
			this.addChild(scroll);

			res.reverse();
			var len = res.length;
			var lastY = 0;
			for (var i = 0; i < len; i++) {
				var obj = res[i];
				if (obj) {
					var item = new MailItem();
					item.setData(i, obj);
					item.y = lastY;
					this.container.addChild(item);
					lastY += item.height + 20;
				}
			}
		});
	}
}