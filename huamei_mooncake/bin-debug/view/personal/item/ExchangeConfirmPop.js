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
var ExchangeConfirmPop = (function (_super) {
    __extends(ExchangeConfirmPop, _super);
    function ExchangeConfirmPop() {
        return _super.call(this) || this;
    }
    ExchangeConfirmPop.prototype.show = function () {
        var bg = new egret.Shape();
        bg.graphics.beginFill(0x0, 0.7);
        bg.graphics.drawRect(0, 0, StageUtils.stage.stageWidth, StageUtils.stage.stageHeight);
        bg.graphics.endFill();
        // this.view.scaleY = Main.scale;
        // this.view.x=600;
        // this.view.y=320;
        this.addChildAt(bg, 0);
        bg.alpha = 0;
        Global.fadeIn(bg);
        UIManager.instance.popLayer.addChild(this);
        this.touchEnabled = true;
    };
    ExchangeConfirmPop.prototype.setData = function (data) {
        var _this = this;
        _super.prototype.setData.call(this, data);
        var bg = new CustomImage("resource/assets/asyn/personal/exchange_confirm.png", true, function () {
            bg.x = StageUtils.SW - bg.width >> 1;
            bg.y = StageUtils.SH - bg.height >> 1;
        });
        this.addChild(bg);
        var btnClose = Global.createBitmapByName("btn_change_close_png");
        btnClose.x = 515;
        btnClose.y = 300;
        this.addChild(btnClose);
        Global.setBut(btnClose);
        btnClose.addEventListener(egret.TouchEvent.TOUCH_TAP, function () {
            PopManager.hidePop("ExchangeConfirmPop");
        }, this);
        var btnSubmit = new CustomImage("resource/assets/asyn/personal/btn_confirm.png", true, function () {
            btnSubmit.x = StageUtils.SW - btnSubmit.width >> 1;
            btnSubmit.y = (StageUtils.SH - btnSubmit.height >> 1) + 80;
        });
        this.addChild(btnSubmit);
        Global.setBut(btnSubmit);
        btnSubmit.addEventListener(egret.TouchEvent.TOUCH_TAP, function () {
            PopManager.hidePop("PersonalPop");
            PopManager.hidePop("ExchangeConfirmPop");
            _this.data.couponkeyfrom = _this.data.couponkey;
            _this.data.couponkeyto = _this.data.couponkey;
            PopManager.showPop("AddressPop", _this.data);
        }, this);
        this.btnSubmit = btnSubmit;
    };
    return ExchangeConfirmPop;
}(PopView));
__reflect(ExchangeConfirmPop.prototype, "ExchangeConfirmPop");
//# sourceMappingURL=ExchangeConfirmPop.js.map