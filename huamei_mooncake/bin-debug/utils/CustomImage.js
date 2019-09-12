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
var CustomImage = (function (_super) {
    __extends(CustomImage, _super);
    function CustomImage(_url, _isEase, _compFunc) {
        if (_isEase === void 0) { _isEase = true; }
        if (_compFunc === void 0) { _compFunc = null; }
        var _this = _super.call(this) || this;
        _this.url = _url;
        _this.isEase = _isEase;
        _this.compFunc = _compFunc;
        _this.loadBg();
        return _this;
    }
    CustomImage.prototype.reload = function (_url, _isEase) {
        if (_isEase === void 0) { _isEase = false; }
        if (this.url == _url) {
            return;
        }
        this.url = _url;
        this.isEase = _isEase;
        this.loadBg();
    };
    CustomImage.prototype.loadBg = function () {
        RES.getResByUrl(this.url, this.onLoadComplete, this, RES.ResourceItem.TYPE_IMAGE);
    };
    CustomImage.prototype.onLoadComplete = function (tex) {
        // //获取加载到的纹理对象
        this.texture = tex;
        if (this.isEase) {
            this.alpha = 0;
            egret.Tween.get(this).to({ alpha: 1 }, 1000);
        }
        if (this.compFunc) {
            this.compFunc();
        }
    };
    return CustomImage;
}(egret.Bitmap));
__reflect(CustomImage.prototype, "CustomImage");
//# sourceMappingURL=CustomImage.js.map