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
var BuySendItem = (function (_super) {
    __extends(BuySendItem, _super);
    function BuySendItem(data) {
        var _this = _super.call(this) || this;
        _this.num = 0;
        _this.data = data;
        var type = Global.getTypeByName(data.name);
        //567   284
        var bg = new CustomImage("resource/assets/asyn/moontype/3/" + type + ".png", true, function () {
            // bg.x = StageUtils.SW - bg.width >> 1;
            // bg.x = -283.5;
            // bg.y = -142;
        });
        bg.anchorOffsetX = 283.5;
        bg.anchorOffsetY = 142;
        _this.addChild(bg);
        _this.txtNum = new egret.TextField();
        _this.txtNum.x = 32 - 283.5;
        _this.txtNum.y = 20 - 142;
        _this.txtNum.textColor = 0x6E3C0A;
        _this.addChild(_this.txtNum);
        _this.txtNum.text = Global.names[type - 1] + "月饼";
        Global.setBut(_this);
        _this.addEventListener(egret.TouchEvent.TOUCH_TAP, function () {
            if (BuySendItem.selectItem) {
                BuySendItem.selectItem.zoomOut();
            }
            BuySendItem.selectItem = _this;
            _this.zoom();
        }, _this);
        return _this;
    }
    BuySendItem.prototype.zoom = function () {
        this.scaleX = 1.1;
        this.scaleY = 1.1;
    };
    BuySendItem.prototype.zoomOut = function () {
        this.scaleX = 1;
        this.scaleY = 1;
    };
    return BuySendItem;
}(egret.DisplayObjectContainer));
__reflect(BuySendItem.prototype, "BuySendItem");
//# sourceMappingURL=BuySendItem.js.map