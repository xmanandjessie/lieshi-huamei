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
var SharePop = (function (_super) {
    __extends(SharePop, _super);
    function SharePop() {
        return _super.call(this) || this;
    }
    SharePop.prototype.setData = function (data) {
        _super.prototype.setData.call(this, data);
        Main.showShare();
        var bg = new CustomImage("resource/assets/asyn/share_bg.png", true, function () {
            bg.width = StageUtils.SW;
            bg.height = StageUtils.SH;
        });
        this.addChild(bg);
        if (data) {
            if (data.code) {
                Main.share(data.code);
            }
            else {
                Main.share("http://lsid.me/h/esharecode$eshareinfo=" + data.eshareinfo, data.eshareinfo, data.time);
            }
        }
    };
    return SharePop;
}(PopView));
__reflect(SharePop.prototype, "SharePop");
//# sourceMappingURL=SharePop.js.map