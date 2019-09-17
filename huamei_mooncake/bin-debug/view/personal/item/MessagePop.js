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
var MessagePop = (function (_super) {
    __extends(MessagePop, _super);
    function MessagePop() {
        return _super.call(this) || this;
    }
    MessagePop.prototype.show = function () {
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
    MessagePop.prototype.setData = function (data) {
        _super.prototype.setData.call(this, data);
        var bg = new CustomImage("resource/assets/asyn/personal/tips_bg1.png", true, function () {
            bg.x = StageUtils.SW - bg.width >> 1;
            bg.y = StageUtils.SH - bg.height >> 1;
        });
        this.addChild(bg);
        var btnClose = Global.createBitmapByName("btn_change_close_png");
        btnClose.x = 495;
        btnClose.y = 290;
        this.addChild(btnClose);
        Global.setBut(btnClose);
        btnClose.addEventListener(egret.TouchEvent.TOUCH_TAP, function () {
            PopManager.hidePop("MessagePop");
        }, this);
        var btnSubmit = new CustomImage("resource/assets/asyn/personal/btn_confirm.png", true, function () {
            btnSubmit.x = StageUtils.SW - btnSubmit.width >> 1;
            btnSubmit.y = (StageUtils.SH - btnSubmit.height >> 1) + 170;
        });
        this.addChild(btnSubmit);
        Global.setBut(btnSubmit);
        btnSubmit.addEventListener(egret.TouchEvent.TOUCH_TAP, function () {
            PopManager.hidePop("MessagePop");
        }, this);
        this.btnSubmit = btnSubmit;
    };
    return MessagePop;
}(PopView));
__reflect(MessagePop.prototype, "MessagePop");
//# sourceMappingURL=MessagePop.js.map