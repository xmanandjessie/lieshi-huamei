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
var AddressSelectPop = (function (_super) {
    __extends(AddressSelectPop, _super);
    function AddressSelectPop() {
        return _super.call(this) || this;
    }
    AddressSelectPop.prototype.show = function () {
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
    AddressSelectPop.prototype.setData = function (data) {
        var _this = this;
        _super.prototype.setData.call(this, data);
        var btnClose = Global.createBitmapByName("btn_change_close_png");
        btnClose.x = StageUtils.SW - btnClose.width - 30;
        btnClose.y = 30;
        this.addChild(btnClose);
        Global.setBut(btnClose);
        btnClose.addEventListener(egret.TouchEvent.TOUCH_TAP, function () {
            PopManager.hidePop("AddressSelectPop");
        }, this);
        Global.post("n/wish", {}).then(function (res) {
            if (res) {
                var len = res.length;
                for (var i = 0; i < len; i++) {
                    var txt = new egret.TextField();
                    txt.width = StageUtils.SW;
                    txt.height = 30;
                    txt.textAlign = "center";
                    txt.verticalAlign = egret.VerticalAlign.MIDDLE;
                    txt.text = res[i].name;
                    txt.value = res[i].value;
                    txt.size = 24;
                    txt.x = 0;
                    txt.y = 100 + i * 34;
                    _this.addChildAt(txt, 1);
                    Global.setBut(txt);
                    txt.addEventListener(egret.TouchEvent.TOUCH_TAP, function (e) {
                        if (e.target) {
                            if (e.target.value) {
                                _this.data && _this.data(e.target.value);
                                PopManager.hidePop("AddressSelectPop");
                            }
                        }
                    }, _this);
                }
            }
        });
    };
    return AddressSelectPop;
}(PopView));
__reflect(AddressSelectPop.prototype, "AddressSelectPop");
//# sourceMappingURL=AddressSelectPop.js.map