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
var DownView = (function (_super) {
    __extends(DownView, _super);
    function DownView() {
        var _this = _super.call(this) || this;
        var tips = Global.createBitmapByName("select_tips1_png");
        _this.addChild(tips);
        var bg = Global.createBitmapByName("select_down_bg_png");
        bg.x = 0;
        bg.y = 130;
        _this.addChild(bg);
        // var btnDown = Global.createBitmapByName("btn_select_phone_png");
        // btnDown.x = 100;
        // btnDown.y = 220;
        // this.addChild(btnDown);
        // Global.setBut(btnDown);
        // btnDown.addEventListener(egret.TouchEvent.TOUCH_TAP,this.downHandler,this);
        var btnSend = Global.createBitmapByName("btn_select_sendmail_png");
        btnSend.x = 316;
        btnSend.y = 263;
        _this.addChild(btnSend);
        Global.setBut(btnSend);
        btnSend.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.sendHandler, _this);
        _this.txtMail = new egret.TextField();
        _this.txtMail.width = 260;
        _this.txtMail.fontFamily = "微软雅黑";
        _this.txtMail.type = egret.TextFieldType.INPUT;
        _this.txtMail.x = 40;
        _this.txtMail.y = 283;
        _this.txtMail.text = "请输入邮箱帐号";
        _this.txtMail.size = 24;
        _this.txtMail.textColor = 0xC3C5C6;
        _this.txtMail.maxChars = 50;
        _this.addChild(_this.txtMail);
        _this.txtMail.addEventListener(egret.FocusEvent.FOCUS_IN, _this.mailFocusInHandler, _this);
        _this.txtMail.addEventListener(egret.FocusEvent.FOCUS_OUT, _this.mailFocusOutHandler, _this);
        return _this;
    }
    DownView.prototype.downHandler = function () {
        // window.location.href = "http://res.leasiondata.cn/lstatic/h/v70/resource/assets/asyn/aaa.xlsx";
        // window.open("http://res.leasiondata.cn/lstatic/h/v70/resource/assets/asyn/aaa.xlsx");
        // this.downloadFile("http://res.leasiondata.cn/lstatic/h/v70/resource/assets/asyn/info_bg.png");
    };
    DownView.prototype.downloadFile = function (url) {
        try {
            var elemIF = document.createElement("iframe");
            elemIF.src = url;
            elemIF.style.display = "none";
            document.body.appendChild(elemIF);
        }
        catch (e) {
        }
    };
    DownView.prototype.sendHandler = function () {
        var str = this.txtMail.text;
        if (str && str != "请输入邮箱帐号") {
            Message.show("即将发送!");
        }
        else {
            Message.show("请输入邮箱帐号!");
        }
    };
    DownView.prototype.mailFocusInHandler = function () {
        if (this.txtMail.text == "请输入邮箱帐号") {
            this.txtMail.text = "";
        }
    };
    DownView.prototype.mailFocusOutHandler = function () {
        if (this.txtMail.text == "") {
            this.txtMail.text = "请输入邮箱帐号";
        }
    };
    return DownView;
}(egret.DisplayObjectContainer));
__reflect(DownView.prototype, "DownView");
//# sourceMappingURL=DownView.js.map