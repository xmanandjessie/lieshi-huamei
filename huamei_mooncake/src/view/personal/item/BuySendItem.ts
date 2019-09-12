class BuySendItem extends egret.DisplayObjectContainer {
	public num = 0;
	private txtNum: egret.TextField;

	public data;

	public constructor(data) {
		super();
		this.data = data;
		var type = Global.getTypeByName(data.name);

		//567   284

		var bg = new CustomImage("resource/assets/asyn/moontype/3/" + type + ".png", true, () => {
			// bg.x = StageUtils.SW - bg.width >> 1;
			// bg.x = -283.5;
			// bg.y = -142;
		});
		bg.anchorOffsetX = 283.5;
		bg.anchorOffsetY = 142;
		this.addChild(bg);

		this.txtNum = new egret.TextField();
		this.txtNum.x = 32 - 283.5;
		this.txtNum.y = 20 - 142;
		this.txtNum.textColor = 0x6E3C0A;
		this.addChild(this.txtNum);

		this.txtNum.text = Global.names[type - 1] + "月饼";

		Global.setBut(this);

		this.addEventListener(egret.TouchEvent.TOUCH_TAP, () => {
			if (BuySendItem.selectItem) {
				BuySendItem.selectItem.zoomOut();
			}
			BuySendItem.selectItem = this;
			this.zoom();
		}, this);
	}

	public zoom(): void {
		this.scaleX = 1.1;
		this.scaleY = 1.1;
	}

	public zoomOut(): void {
		this.scaleX = 1;
		this.scaleY = 1;
	}

	public static selectItem;
}