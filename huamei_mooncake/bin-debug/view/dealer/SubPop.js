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
var SubPop = (function (_super) {
    __extends(SubPop, _super);
    function SubPop() {
        return _super.call(this) || this;
    }
    SubPop.prototype.setData = function (data) {
        var _this = this;
        _super.prototype.setData.call(this, data);
        var btnBack = Global.createBitmapByName("back_png");
        btnBack.x = 20;
        btnBack.y = 20;
        this.addChild(btnBack);
        Global.setBut(btnBack);
        btnBack.addEventListener(egret.TouchEvent.TOUCH_TAP, function () {
            PopManager.hidePop("SubPop");
            PopManager.showPop("SelfPop");
        }, this);
        var title = new CustomImage("resource/assets/asyn/sub/title.png", true, function () {
            title.x = StageUtils.SW - title.width >> 1;
            title.y = 50;
        });
        this.addChild(title);
        var bg = new CustomImage("resource/assets/asyn/sub/bg.png", true, function () {
            bg.x = StageUtils.SW - bg.width >> 1;
            bg.y = 125;
        });
        this.addChild(bg);
        this.btnAdd = new CustomImage("resource/assets/asyn/sub/btn_add.png", true, function () {
            _this.btnAdd.x = StageUtils.SW - _this.btnAdd.width >> 1;
            _this.btnAdd.y = StageUtils.SH - _this.btnAdd.height - 70;
        });
        this.addChild(this.btnAdd);
        Global.setBut(this.btnAdd);
        this.btnAdd.addEventListener(egret.TouchEvent.TOUCH_TAP, function () {
            PopManager.showPop("CreateSubPop");
        }, this);
        this.container = new egret.DisplayObjectContainer();
        var scroll = new egret.ScrollView(this.container);
        scroll.width = StageUtils.SW;
        scroll.height = 570;
        scroll.x = 0;
        scroll.y = 228;
        scroll.horizontalScrollPolicy = "off";
        this.addChild(scroll);
        this.getData();
    };
    SubPop.prototype.refreshData = function (list) {
        this.container.removeChildren();
        var len = list.length;
        for (var i = 0; i < len; i++) {
            var item = new SubItem();
            item.setData(list[i]);
            item.x = 20;
            item.y = 80 * i;
            this.container.addChild(item);
        }
    };
    SubPop.prototype.getData = function () {
        var _this = this;
        Global.post("cs/rsas", {}).then(function (data) {
            _this.refreshData(data);
        });
    };
    return SubPop;
}(PopView));
__reflect(SubPop.prototype, "SubPop");
//# sourceMappingURL=SubPop.js.map