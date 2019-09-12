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
var SubItem = (function (_super) {
    __extends(SubItem, _super);
    function SubItem() {
        return _super.call(this) || this;
    }
    SubItem.prototype.setData = function (data) {
        var _this = this;
        this.data = data;
        var line = new CustomImage("resource/assets/asyn/order/line2.png", true, function () {
            line.width = 600;
            line.y = 0;
        });
        this.addChild(line);
        var txtName = new egret.TextField();
        txtName.x = 0;
        txtName.y = 0;
        txtName.width = 200;
        txtName.height = 80;
        txtName.textAlign = "center";
        txtName.verticalAlign = egret.VerticalAlign.MIDDLE;
        txtName.textColor = 0x07308B;
        this.addChild(txtName);
        var txtCount = new egret.TextField();
        txtCount.x = 200;
        txtCount.y = 0;
        txtCount.width = 200;
        txtCount.height = 80;
        txtCount.textAlign = "center";
        txtCount.verticalAlign = egret.VerticalAlign.MIDDLE;
        txtCount.textColor = 0x07308B;
        this.addChild(txtCount);
        var spPoint = new egret.Sprite();
        spPoint.width = 80;
        spPoint.height = 80;
        spPoint.x = 520;
        this.addChild(spPoint);
        var point = new CustomImage("resource/assets/asyn/sub/btn_point.png", true, function () {
            point.x = 26;
            point.y = 37.5;
        });
        spPoint.addChild(point);
        Global.setBut(spPoint);
        spPoint.addEventListener(egret.TouchEvent.TOUCH_TAP, function () {
            console.log("1111");
            PopManager.showPop("SubInfoPop", _this.data);
        }, this);
        var spStatus = new egret.Sprite();
        spStatus.width = 100;
        spStatus.height = 80;
        spStatus.x = 450;
        this.addChild(spStatus);
        var txtStatus = new egret.TextField();
        txtStatus.x = 0;
        txtStatus.y = 0;
        txtStatus.height = 80;
        txtStatus.verticalAlign = egret.VerticalAlign.MIDDLE;
        txtStatus.textColor = 0x07308B;
        spStatus.addChild(txtStatus);
        this.txtStatus = txtStatus;
        var arrow = new CustomImage("resource/assets/asyn/sub/btn_arrow.png", true, function () {
            arrow.x = 60;
            arrow.y = 33;
        });
        spStatus.addChild(arrow);
        Global.setBut(spStatus);
        spStatus.addEventListener(egret.TouchEvent.TOUCH_TAP, function () {
            if (txtStatus.text == "启用") {
                _this.update(0);
            }
            else {
                _this.update(1);
            }
        }, this);
        txtName.text = this.data.name + "";
        txtCount.text = this.data.user + "";
        this.refreshStatus(this.data.status);
    };
    SubItem.prototype.refreshStatus = function (status) {
        if (status == 1) {
            this.txtStatus.text = "启用";
        }
        else {
            this.txtStatus.text = "禁用";
        }
    };
    SubItem.prototype.update = function (status) {
        var _this = this;
        Global.post("cs/msa", { status: status, subaccountkey: this.data.subaccountkey, name: this.data.name, phone: this.data.phone }).then(function (data) {
            _this.data.status = status;
            _this.refreshStatus(status);
        });
    };
    return SubItem;
}(egret.Sprite));
__reflect(SubItem.prototype, "SubItem");
//# sourceMappingURL=SubItem.js.map