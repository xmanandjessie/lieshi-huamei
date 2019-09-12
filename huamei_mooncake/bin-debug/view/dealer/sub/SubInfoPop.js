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
var SubInfoPop = (function (_super) {
    __extends(SubInfoPop, _super);
    function SubInfoPop() {
        return _super.call(this) || this;
    }
    SubInfoPop.prototype.setData = function (data) {
        var _this = this;
        _super.prototype.setData.call(this, data);
        var share = new egret.Shape();
        share.graphics.beginFill(0xe6e6e6);
        share.graphics.drawRect(0, 0, StageUtils.stage.stageWidth, StageUtils.stage.stageHeight);
        share.graphics.endFill();
        this.addChild(share);
        var btnBack = Global.createBitmapByName("back_png");
        btnBack.x = 20;
        btnBack.y = 20;
        this.addChild(btnBack);
        Global.setBut(btnBack);
        btnBack.addEventListener(egret.TouchEvent.TOUCH_TAP, function () {
            PopManager.hidePop("SubInfoPop");
            if (_this.txtReset) {
                _this.txtReset.hide();
            }
        }, this);
        var title = new CustomImage("resource/assets/asyn/sub/title.png", true, function () {
            title.x = StageUtils.SW - title.width >> 1;
            title.y = 50;
        });
        this.addChild(title);
        var bg = new CustomImage("resource/assets/asyn/sub/sub_info_bg.png", true, function () {
            bg.x = StageUtils.SW - bg.width >> 1;
            bg.y = 110;
        });
        this.addChild(bg);
        var bg1 = new CustomImage("resource/assets/asyn/sub/input_bg.png", true, function () {
            bg1.x = 305;
            bg1.y = 215;
            _this.txtName.x = bg1.x + 20;
            _this.txtName.y = bg1.y;
        });
        this.addChild(bg1);
        var bg3 = new CustomImage("resource/assets/asyn/sub/input_bg.png", true, function () {
            bg3.x = 305;
            bg3.y = 350;
            _this.txtPhone.x = bg3.x + 20;
            _this.txtPhone.y = bg3.y;
        });
        this.addChild(bg3);
        this.txtName = new egret.TextField();
        this.txtName.width = 270;
        this.txtName.height = 39;
        this.txtName.verticalAlign = "middle";
        this.txtName.fontFamily = "微软雅黑";
        this.txtName.type = egret.TextFieldType.INPUT;
        this.txtName.size = 24;
        this.txtName.textColor = 0x0;
        this.txtName.maxChars = 20;
        this.addChild(this.txtName);
        this.txtID = new egret.TextField();
        this.txtID.width = 270;
        this.txtID.height = 39;
        this.txtID.verticalAlign = "middle";
        this.txtID.fontFamily = "微软雅黑";
        this.txtID.size = 24;
        this.txtID.textColor = 0x0;
        this.txtID.x = 325;
        this.txtID.y = 260;
        this.addChild(this.txtID);
        this.txtPhone = new egret.TextField();
        this.txtPhone.width = 270;
        this.txtPhone.height = 39;
        this.txtPhone.verticalAlign = "middle";
        this.txtPhone.fontFamily = "微软雅黑";
        this.txtPhone.type = egret.TextFieldType.INPUT;
        this.txtPhone.size = 24;
        this.txtPhone.maxChars = 11;
        this.txtPhone.restrict = "0-9";
        this.txtPhone.textColor = 0x0;
        this.addChild(this.txtPhone);
        var spStatus = new egret.Sprite();
        spStatus.width = 100;
        spStatus.height = 80;
        spStatus.x = 325;
        spStatus.y = 380;
        this.addChild(spStatus);
        this.txtStatus = new egret.TextField();
        this.txtStatus.height = 80;
        this.txtStatus.verticalAlign = egret.VerticalAlign.MIDDLE;
        this.txtStatus.fontFamily = "微软雅黑";
        this.txtStatus.textColor = 0x0;
        spStatus.addChild(this.txtStatus);
        var arrow = new CustomImage("resource/assets/asyn/sub/btn_arrow.png", true, function () {
            arrow.x = 70;
            arrow.y = 33;
        });
        spStatus.addChild(arrow);
        Global.setBut(spStatus);
        spStatus.addEventListener(egret.TouchEvent.TOUCH_TAP, function () {
            if (_this.txtStatus.text == "启用") {
                _this.txtStatus.text = "禁用";
            }
            else {
                _this.txtStatus.text = "启用";
            }
        }, this);
        this.btnAdd = new CustomImage("resource/assets/asyn/sub/btn_update.png", true, function () {
            _this.btnAdd.x = 70;
            _this.btnAdd.y = 455;
        });
        this.addChild(this.btnAdd);
        this.btnReset = new CustomImage("resource/assets/asyn/sub/btn_reset.png", true, function () {
            _this.btnReset.x = StageUtils.SW - _this.btnReset.width - 70;
            _this.btnReset.y = 455;
        });
        this.addChild(this.btnReset);
        Global.setBut(this.btnAdd);
        Global.setBut(this.btnReset);
        this.btnAdd.addEventListener(egret.TouchEvent.TOUCH_TAP, function () {
            var name = _this.txtName.text.trim();
            var phone = _this.txtPhone.text.trim();
            var status = _this.txtStatus.text == "启用" ? 1 : 0;
            if (!name || name == "请输入名称") {
                Message.show("请输入名称!");
            }
            else if (!phone || phone == "请输入电话") {
                Message.show("请输入电话!");
            }
            else if (phone.length != 11) {
                Message.show("电话号码格式不正确!");
            }
            else {
                Global.post("cs/msa", { subaccountkey: _this.data.subaccountkey, name: name, phone: phone, status: status }).then(function (data) {
                    Message.show("修改成功!");
                }).catch(function (error) {
                    Message.show("修改失败!");
                });
            }
        }, this);
        this.btnReset.addEventListener(egret.TouchEvent.TOUCH_TAP, function () {
            if (confirm("密码重置后，该账号下次登录时需使用新密码，确定重置吗？")) {
                Global.post("cs/rsap", { subaccountkey: _this.data.subaccountkey }).then(function (data) {
                    Message.show("重置成功!");
                    _this.txtReset = new HTMLText();
                    _this.txtReset.setValue("长按复制该子账号的新密码：" + data.pass);
                    _this.txtReset.setPosition(0, 550, StageUtils.SW, 80);
                    _this.txtReset.fontSize = 20;
                    _this.txtReset.show();
                }).catch(function (error) {
                    Message.show("重置失败!");
                });
            }
        }, this);
        this.txtName.text = this.data.name + "";
        this.txtID.text = this.data.user + "";
        this.txtPhone.text = this.data.phone + "";
        this.txtStatus.text = this.data.status == 1 ? "启用" : "禁用";
    };
    return SubInfoPop;
}(PopView));
__reflect(SubInfoPop.prototype, "SubInfoPop");
//# sourceMappingURL=SubInfoPop.js.map