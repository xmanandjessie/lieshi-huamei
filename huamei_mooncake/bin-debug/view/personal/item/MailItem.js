var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var MailItem = (function (_super) {
    __extends(MailItem, _super);
    function MailItem() {
        var _this = _super.call(this) || this;
        var txtPoint = new egret.TextField();
        txtPoint.textColor = 0x565656;
        txtPoint.size = 20;
        txtPoint.x = 110;
        txtPoint.y = 15;
        txtPoint.text = "●  ";
        _this.addChild(txtPoint);
        _this.txtContent = new egret.TextField();
        _this.txtContent.textColor = 0x565656;
        _this.txtContent.size = 20;
        _this.txtContent.x = 133;
        _this.txtContent.y = 15;
        _this.txtContent.text = "";
        _this.txtContent.width = 400;
        _this.txtContent.lineSpacing = 10;
        _this.addChild(_this.txtContent);
        _this.txtTime = new egret.TextField();
        _this.txtTime.textColor = 0x565656;
        _this.txtTime.size = 20;
        _this.txtTime.x = 133;
        _this.txtTime.text = "";
        _this.addChild(_this.txtTime);
        var line = new CustomImage("resource/assets/asyn/order/line2.png", true, function () {
            line.width = 410;
            line.x = 125;
        });
        _this.addChild(line);
        _this.line = line;
        return _this;
    }
    MailItem.prototype.setData = function (index, data) {
        if (index == 0) {
            this.txtContent.textColor = 0x002a88;
        }
        else {
            this.txtContent.textColor = 0x565656;
        }
        this.txtContent.text = data.address + " " + data.remark;
        this.txtTime.text = data.time + "";
        this.txtTime.y = this.txtContent.y + this.txtContent.height + 10;
        this.line.y = this.txtTime.y + this.txtTime.height + 10;
    };
    return MailItem;
}(egret.DisplayObjectContainer));
__reflect(MailItem.prototype, "MailItem");
//# sourceMappingURL=MailItem.js.map