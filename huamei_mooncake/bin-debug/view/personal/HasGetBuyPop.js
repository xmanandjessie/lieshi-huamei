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
var HasGetBuyPop = (function (_super) {
    __extends(HasGetBuyPop, _super);
    function HasGetBuyPop() {
        return _super.call(this) || this;
    }
    HasGetBuyPop.prototype.setData = function (data) {
        _super.prototype.setData.call(this, data);
        var bg = new CustomImage("resource/assets/asyn/personal/tips_bg.jpg", true, function () {
            bg.width = StageUtils.SW;
            bg.height = StageUtils.SH;
        });
        this.addChild(bg);
        var tips1 = new CustomImage("resource/assets/asyn/personal/tips2.png", true, function () {
            tips1.x = StageUtils.SW - tips1.width >> 1;
            tips1.y = 250;
        });
        this.addChild(tips1);
        var btnDuihuan = new CustomImage("resource/assets/asyn/personal/btn_self.png", true, function () {
            btnDuihuan.x = StageUtils.SW - btnDuihuan.width >> 1;
            btnDuihuan.y = 360;
        });
        this.addChild(btnDuihuan);
        Global.setBut(btnDuihuan);
        btnDuihuan.addEventListener(egret.TouchEvent.TOUCH_TAP, this.duihuanHandler, this);
    };
    HasGetBuyPop.prototype.duihuanHandler = function () {
        PopManager.hidePop("HasGetInfoPop");
        PopManager.showPop("InfoPop");
    };
    return HasGetBuyPop;
}(PopView));
__reflect(HasGetBuyPop.prototype, "HasGetBuyPop");
//# sourceMappingURL=HasGetBuyPop.js.map