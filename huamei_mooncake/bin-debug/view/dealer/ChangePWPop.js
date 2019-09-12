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
var ChangePWPop = (function (_super) {
    __extends(ChangePWPop, _super);
    function ChangePWPop() {
        return _super.call(this) || this;
    }
    ChangePWPop.prototype.setData = function (data) {
        var _this = this;
        _super.prototype.setData.call(this, data);
        var btnBack = Global.createBitmapByName("back_png");
        btnBack.x = 20;
        btnBack.y = 20;
        this.addChild(btnBack);
        Global.setBut(btnBack);
        btnBack.addEventListener(egret.TouchEvent.TOUCH_TAP, function () {
            PopManager.hidePop("ChangePWPop");
            PopManager.showPop("SelfPop");
        }, this);
        var title = new CustomImage("resource/assets/asyn/pwd/title.png", true, function () {
            title.x = StageUtils.SW - title.width >> 1;
            title.y = 50;
        });
        this.addChild(title);
        var bg = new CustomImage("resource/assets/asyn/pwd/bg.png", true, function () {
            bg.x = StageUtils.SW - bg.width >> 1;
            bg.y = 150;
            icon.x = bg.x + 50;
            icon.y = bg.y + 18;
            _this.txtNewPW.x = bg.x + 100;
            _this.txtNewPW.y = bg.y;
        });
        this.addChild(bg);
        var bg1 = new CustomImage("resource/assets/asyn/pwd/bg.png", true, function () {
            bg1.x = StageUtils.SW - bg1.width >> 1;
            bg1.y = 250;
            icon1.x = bg1.x + 50;
            icon1.y = bg1.y + 18;
            _this.txtNewPW1.x = bg1.x + 100;
            _this.txtNewPW1.y = bg1.y;
        });
        this.addChild(bg1);
        var icon = new CustomImage("resource/assets/asyn/pwd/icon.png", true, function () {
            // icon.x = bg.x + 50;
            // icon.y = bg.y + 18;
        });
        this.addChild(icon);
        var icon1 = new CustomImage("resource/assets/asyn/pwd/icon.png", true, function () {
            // icon1.x = bg1.x + 50;
            // icon1.y = bg1.y + 18;
        });
        this.addChild(icon1);
        var btnSubmit = new CustomImage("resource/assets/asyn/pwd/btn_ok.png", true, function () {
            btnSubmit.x = StageUtils.SW - btnSubmit.width >> 1;
            btnSubmit.y = 350;
        });
        this.addChild(btnSubmit);
        Global.setBut(btnSubmit);
        btnSubmit.addEventListener(egret.TouchEvent.TOUCH_TAP, this.submitHandler, this);
        this.btnSubmit = btnSubmit;
        this.txtNewPW = new egret.TextField();
        this.txtNewPW.width = 270;
        this.txtNewPW.height = 67;
        this.txtNewPW.verticalAlign = "middle";
        this.txtNewPW.fontFamily = "微软雅黑";
        this.txtNewPW.type = egret.TextFieldType.INPUT;
        this.txtNewPW.text = "请输入新密码";
        this.txtNewPW.size = 24;
        this.txtNewPW.textColor = 0xC3C5C6;
        this.txtNewPW.maxChars = 20;
        this.txtNewPW.inputType = egret.TextFieldInputType.PASSWORD;
        this.addChild(this.txtNewPW);
        this.txtNewPW.addEventListener(egret.FocusEvent.FOCUS_IN, this.newIDFocusInHandler, this);
        this.txtNewPW.addEventListener(egret.FocusEvent.FOCUS_OUT, this.newIDFocusOutHandler, this);
        this.txtNewPW1 = new egret.TextField();
        this.txtNewPW1.width = 270;
        this.txtNewPW1.height = 67;
        this.txtNewPW1.verticalAlign = "middle";
        this.txtNewPW1.fontFamily = "微软雅黑";
        this.txtNewPW1.type = egret.TextFieldType.INPUT;
        this.txtNewPW1.text = "请再次输入新密码";
        this.txtNewPW1.size = 24;
        this.txtNewPW1.textColor = 0xC3C5C6;
        this.txtNewPW1.maxChars = 20;
        this.txtNewPW1.inputType = egret.TextFieldInputType.PASSWORD;
        this.addChild(this.txtNewPW1);
        this.txtNewPW1.addEventListener(egret.FocusEvent.FOCUS_IN, this.newID1FocusInHandler, this);
        this.txtNewPW1.addEventListener(egret.FocusEvent.FOCUS_OUT, this.newID1FocusOutHandler, this);
    };
    ChangePWPop.prototype.newIDFocusInHandler = function () {
        if (this.txtNewPW.text == "请输入新密码") {
            this.txtNewPW.text = "";
            this.txtNewPW.displayAsPassword = true;
        }
        else {
            this.txtNewPW.displayAsPassword = false;
        }
    };
    ChangePWPop.prototype.newIDFocusOutHandler = function () {
        if (this.txtNewPW.text == "") {
            this.txtNewPW.text = "请输入新密码";
            this.txtNewPW.displayAsPassword = false;
        }
        else {
            this.txtNewPW.displayAsPassword = true;
        }
    };
    ChangePWPop.prototype.newID1FocusInHandler = function () {
        if (this.txtNewPW1.text == "请再次输入新密码") {
            this.txtNewPW1.text = "";
            this.txtNewPW1.displayAsPassword = true;
        }
        else {
            this.txtNewPW1.displayAsPassword = false;
        }
    };
    ChangePWPop.prototype.newID1FocusOutHandler = function () {
        if (this.txtNewPW1.text == "") {
            this.txtNewPW1.text = "请再次输入新密码";
            this.txtNewPW1.displayAsPassword = false;
        }
        else {
            this.txtNewPW1.displayAsPassword = true;
        }
    };
    ChangePWPop.prototype.closeHandler = function () {
        PopManager.hidePop("ChangePWPop");
    };
    ChangePWPop.prototype.submitHandler = function () {
        var _this = this;
        var newpw = this.txtNewPW.text.trim();
        var newpw1 = this.txtNewPW1.text.trim();
        if (!newpw || newpw == "请输入新密码") {
            Message.show("请输入新密码!");
        }
        else if (!newpw1 || newpw1 == "请再次输入新密码") {
            Message.show("请再次输入新密码!");
        }
        else if (newpw != newpw1) {
            Message.show("两次密码不一致!");
            // this.txtNewPW.text = "";
            // this.txtNewPW1.text = "";
            // this.txtNewPW.setFocus();
        }
        else {
            Global.post("cs/cp", { newpass: newpw }).then(function (data) {
                _this.txtNewPW.text = "";
                _this.txtNewPW1.text = "";
                Message.show("修改密码成功!");
            }).catch(function (error) {
                Message.show("修改密码失败!");
            });
        }
    };
    return ChangePWPop;
}(PopView));
__reflect(ChangePWPop.prototype, "ChangePWPop");
//# sourceMappingURL=ChangePWPop.js.map