class MailItem extends egret.DisplayObjectContainer {
	private txtContent: egret.TextField;

	private txtTime: egret.TextField;

	private line;

	public constructor() {
		super();

		var txtPoint = new egret.TextField();
		txtPoint.textColor = 0x565656;
		txtPoint.size = 20;
		txtPoint.x = 110;
		txtPoint.y = 15;
		txtPoint.text = "●  ";
		this.addChild(txtPoint);

		this.txtContent = new egret.TextField();
		this.txtContent.textColor = 0x565656;
		this.txtContent.size = 20;
		this.txtContent.x = 133;
		this.txtContent.y = 15;
		this.txtContent.text = "";
		this.txtContent.width = 400;
		this.txtContent.lineSpacing = 10;
		this.addChild(this.txtContent);

		this.txtTime = new egret.TextField();
		this.txtTime.textColor = 0x565656;
		this.txtTime.size = 20;
		this.txtTime.x = 133;

		this.txtTime.text = "";
		this.addChild(this.txtTime);

		var line = new CustomImage("resource/assets/asyn/order/line2.png", true, () => {
			line.width = 410;
			line.x = 125;
		});
		this.addChild(line);
		this.line = line;
	}

	public setData(index, data): void {
		if (index == 0) {
			this.txtContent.textColor = 0x002a88;
		} else {
			this.txtContent.textColor = 0x565656;
		}
		this.txtContent.text = data.address + " " + data.remark;
		this.txtTime.text = data.time + "";

		this.txtTime.y = this.txtContent.y + this.txtContent.height + 10;
		this.line.y = this.txtTime.y + this.txtTime.height + 10;
	}
}