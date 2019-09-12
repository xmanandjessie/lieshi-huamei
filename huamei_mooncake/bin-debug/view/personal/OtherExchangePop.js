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
var OtherExchangePop = (function (_super) {
    __extends(OtherExchangePop, _super);
    function OtherExchangePop() {
        return _super.call(this) || this;
    }
    OtherExchangePop.prototype.setData = function (data) {
        var _this = this;
        _super.prototype.setData.call(this, data);
        var bg = new CustomImage("resource/assets/asyn/personal/address_bg.jpg", true, function () {
            bg.width = StageUtils.SW;
            bg.height = StageUtils.SH;
        });
        this.addChild(bg);
        var btnDuihuan = new CustomImage("resource/assets/asyn/personal/btn_ok.png", true, function () {
            btnDuihuan.x = 75;
            btnDuihuan.y = StageUtils.SH - 125;
        });
        this.addChild(btnDuihuan);
        var btnBack = new CustomImage("resource/assets/asyn/personal/btn_back.png", true, function () {
            btnBack.x = StageUtils.SW - btnBack.width - 75;
            btnBack.y = StageUtils.SH - 125;
        });
        this.addChild(btnBack);
        Global.setBut(btnDuihuan);
        Global.setBut(btnBack);
        btnDuihuan.addEventListener(egret.TouchEvent.TOUCH_TAP, function () {
            if (BuySendItem.selectItem) {
                _this.data.couponkeyfrom = _this.data.couponkey;
                _this.data.couponkeyto = BuySendItem.selectItem.data.couponkey; //新的//this.data.couponkey;
                _this.data.name = BuySendItem.selectItem.data.name;
                PopManager.showPop("AddressPop", _this.data);
            }
        }, this);
        btnBack.addEventListener(egret.TouchEvent.TOUCH_TAP, function () {
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
    };
    return OtherExchangePop;
}(PopView));
__reflect(OtherExchangePop.prototype, "OtherExchangePop");
//# sourceMappingURL=OtherExchangePop.js.map