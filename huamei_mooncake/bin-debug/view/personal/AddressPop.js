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
var AddressPop = (function (_super) {
    __extends(AddressPop, _super);
    function AddressPop() {
        return _super.call(this) || this;
    }
    AddressPop.prototype.setData = function (data) {
        var _this = this;
        _super.prototype.setData.call(this, data);
        var moon = new CustomImage("resource/assets/asyn/moontype/2/" + Global.getTypeByName(this.data.name) + ".jpg", true, function () {
            moon.width = StageUtils.SW;
            moon.height = StageUtils.SH;
        });
        this.addChild(moon);
        var btnDuihuan = new CustomImage("resource/assets/asyn/personal/btn_submit.png", true, function () {
            btnDuihuan.x = StageUtils.SW - btnDuihuan.width >> 1;
            btnDuihuan.y = StageUtils.SH - 130;
        });
        this.addChild(btnDuihuan);
        Global.setBut(btnDuihuan);
        btnDuihuan.addEventListener(egret.TouchEvent.TOUCH_TAP, this.duihuanHandler, this);
        var address = new CustomImage("resource/assets/asyn/personal/exchange_bg.png", true, function () {
            address.x = StageUtils.SW - address.width >> 1;
            address.y = 470 + 67;
        });
        this.addChild(address);
        this.textBg = new CustomImage("resource/assets/asyn/personal/exchange_bg1.png", true, function () {
            _this.textBg.x = StageUtils.SW - _this.textBg.width >> 1;
            _this.textBg.y = 560;
        });
        this.addChild(this.textBg);
        this.btnDai = new CustomImage("resource/assets/asyn/personal/btn1_1.png", true, function () {
            _this.btnDai.x = StageUtils.CW - _this.btnDai.width;
            _this.btnDai.y = 470;
        });
        this.addChild(this.btnDai);
        this.btnYi = new CustomImage("resource/assets/asyn/personal/btn2.png", true, function () {
            _this.btnYi.x = StageUtils.CW;
            _this.btnYi.y = 470;
        });
        this.addChild(this.btnYi);
        this.btnDai.addEventListener(egret.TouchEvent.TOUCH_TAP, function () {
            _this.changeStatus(0);
        }, this);
        this.btnYi.addEventListener(egret.TouchEvent.TOUCH_TAP, function () {
            _this.changeStatus(1);
        }, this);
        Global.setBut(this.btnDai);
        Global.setBut(this.btnYi);
        this.container = new egret.DisplayObjectContainer();
        this.addChild(this.container);
        var btnInfo = Global.createBitmapByName("btn_info_png");
        btnInfo.x = StageUtils.SW - btnInfo.width - 20;
        btnInfo.y = 20;
        this.addChild(btnInfo);
        Global.setBut(btnInfo);
        btnInfo.addEventListener(egret.TouchEvent.TOUCH_TAP, this.infoHandler, this);
        this.changeStatus(0);
    };
    AddressPop.prototype.changeStatus = function (status) {
        if (this.status == status) {
            return;
        }
        this.status = status;
        if (this.status == 0) {
            this.btnDai.reload("resource/assets/asyn/personal/btn1_1.png");
            this.btnYi.reload("resource/assets/asyn/personal/btn2.png");
            this.showOther();
        }
        else {
            this.btnDai.reload("resource/assets/asyn/personal/btn1.png");
            this.btnYi.reload("resource/assets/asyn/personal/btn2_1.png");
            this.showSelf();
        }
    };
    AddressPop.prototype.showOther = function () {
        var _this = this;
        this.container.removeChildren();
        this.textBg.reload("resource/assets/asyn/personal/exchange_bg1.png");
        this.txtName = new egret.TextField();
        this.txtName.type = egret.TextFieldType.INPUT;
        this.txtName.x = 230;
        this.txtName.y = 560;
        this.txtName.width = 150;
        this.txtName.height = 50;
        this.txtName.maxChars = 10;
        this.container.addChild(this.txtName);
        // this.txtName.border = true;
        this.txtPhone = new egret.TextField();
        this.txtPhone.type = egret.TextFieldType.INPUT;
        this.txtPhone.x = 440;
        this.txtPhone.y = 570;
        this.txtPhone.width = 150;
        this.txtPhone.height = 50;
        this.txtPhone.maxChars = 20;
        this.txtPhone.restrict = "0-9";
        this.txtPhone.inputType = egret.TextFieldInputType.TEL;
        this.txtPhone.size = 20;
        this.container.addChild(this.txtPhone);
        // this.txtPhone.border = true;
        this.txtSheng = new egret.TextField();
        this.txtSheng.type = egret.TextFieldType.INPUT;
        this.txtSheng.x = 230;
        this.txtSheng.y = 630;
        this.txtSheng.width = 80;
        this.txtSheng.height = 30;
        this.txtSheng.maxChars = 50;
        this.txtSheng.size = 20;
        this.container.addChild(this.txtSheng);
        // this.txtSheng.border = true;
        this.txtShi = new egret.TextField();
        this.txtShi.type = egret.TextFieldType.INPUT;
        this.txtShi.x = 380;
        this.txtShi.y = 630;
        this.txtShi.width = 45;
        this.txtShi.height = 30;
        this.txtShi.maxChars = 10;
        this.txtShi.size = 20;
        this.container.addChild(this.txtShi);
        // this.txtShi.border = true;
        this.txtXian = new egret.TextField();
        this.txtXian.type = egret.TextFieldType.INPUT;
        this.txtXian.x = 440;
        this.txtXian.y = 630;
        this.txtXian.width = 80;
        this.txtXian.height = 30;
        this.txtXian.maxChars = 10;
        this.txtXian.size = 20;
        this.container.addChild(this.txtXian);
        // this.txtXian.border = true;
        this.txtAddress = new egret.TextField();
        this.txtAddress.type = egret.TextFieldType.INPUT;
        this.txtAddress.x = 230;
        this.txtAddress.y = 670;
        this.txtAddress.width = 350;
        this.txtAddress.height = 30;
        this.txtAddress.maxChars = 100;
        this.txtAddress.size = 20;
        this.container.addChild(this.txtAddress);
        // this.txtAddress.border = true;
        // this.txtAddress = new egret.TextField();
        // this.txtAddress.type = egret.TextFieldType.INPUT;
        // this.txtAddress.x = 230;
        // this.txtAddress.y = 630;
        // this.txtAddress.width = 350;
        // this.txtAddress.height = 75;
        // this.txtAddress.maxChars = 100;
        // this.txtAddress.size = 20;
        // this.txtAddress.multiline = true;
        // this.txtAddress.lineSpacing = 20;
        // this.container.addChild(this.txtAddress);
        // this.txtAddress.border = true;
        this.txtZhuFu = new egret.TextField();
        // this.txtZhuFu.type = egret.TextFieldType.INPUT;
        this.txtZhuFu.x = 230;
        this.txtZhuFu.y = 730;
        this.txtZhuFu.width = 250;
        this.txtZhuFu.height = 50;
        this.txtZhuFu.maxChars = 50;
        this.txtZhuFu.size = 20;
        this.container.addChild(this.txtZhuFu);
        // this.txtZhuFu.border = true;
        this.txtName1 = new egret.TextField();
        this.txtName1.type = egret.TextFieldType.INPUT;
        this.txtName1.x = 230;
        this.txtName1.y = 820;
        this.txtName1.width = 150;
        this.txtName1.height = 50;
        this.txtName1.maxChars = 10;
        this.txtName1.size = 20;
        this.container.addChild(this.txtName1);
        // this.txtName1.border = true;
        this.txtPhone1 = new egret.TextField();
        this.txtPhone1.type = egret.TextFieldType.INPUT;
        this.txtPhone1.x = 440;
        this.txtPhone1.y = 820;
        this.txtPhone1.width = 150;
        this.txtPhone1.height = 50;
        this.txtPhone1.maxChars = 20;
        this.txtPhone1.restrict = "0-9";
        this.txtPhone1.inputType = egret.TextFieldInputType.TEL;
        this.txtPhone1.size = 20;
        this.container.addChild(this.txtPhone1);
        // this.txtPhone1.border = true;
        var btnSelect = new CustomImage("resource/assets/asyn/personal/btn_select.png", true, function () {
            btnSelect.x = 486;
            btnSelect.y = 730;
        });
        this.container.addChild(btnSelect);
        Global.setBut(btnSelect);
        btnSelect.addEventListener(egret.TouchEvent.TOUCH_TAP, function () {
            PopManager.showPop("AddressSelectPop", function (res) {
                _this.txtZhuFu.text = res + "";
            });
        }, this);
        this.txtZXS = new egret.TextField();
        this.txtZXS.x = 328;
        this.txtZXS.y = 635;
        this.txtZXS.width = 100;
        this.txtZXS.height = 30;
        this.txtZXS.size = 16;
        this.txtZXS.textColor = 0x6B3A06;
        this.txtZXS.text = "/直辖市";
        this.container.addChild(this.txtZXS);
    };
    AddressPop.prototype.showSelf = function () {
        this.container.removeChildren();
        this.textBg.reload("resource/assets/asyn/personal/exchange_bg2.png");
        this.txtName = new egret.TextField();
        this.txtName.type = egret.TextFieldType.INPUT;
        this.txtName.x = 180;
        this.txtName.y = 555;
        this.txtName.width = 380;
        this.txtName.height = 50;
        this.txtName.maxChars = 10;
        this.container.addChild(this.txtName);
        // this.txtName.border = true;
        this.txtPhone = new egret.TextField();
        this.txtPhone.type = egret.TextFieldType.INPUT;
        this.txtPhone.x = 180;
        this.txtPhone.y = 745;
        this.txtPhone.width = 380;
        this.txtPhone.height = 50;
        this.txtPhone.maxChars = 20;
        this.txtPhone.restrict = "0-9";
        this.txtPhone.inputType = egret.TextFieldInputType.TEL;
        this.txtPhone.size = 30;
        this.container.addChild(this.txtPhone);
        // this.txtPhone.border = true;
        this.txtSheng = new egret.TextField();
        this.txtSheng.type = egret.TextFieldType.INPUT;
        this.txtSheng.x = 180;
        this.txtSheng.y = 630;
        this.txtSheng.width = 65;
        this.txtSheng.height = 30;
        this.txtSheng.maxChars = 50;
        this.txtSheng.size = 20;
        this.container.addChild(this.txtSheng);
        // this.txtSheng.border = true;
        this.txtShi = new egret.TextField();
        this.txtShi.type = egret.TextFieldType.INPUT;
        this.txtShi.x = 330;
        this.txtShi.y = 630;
        this.txtShi.width = 65;
        this.txtShi.height = 30;
        this.txtShi.maxChars = 10;
        this.txtShi.size = 20;
        this.container.addChild(this.txtShi);
        // this.txtShi.border = true;
        this.txtXian = new egret.TextField();
        this.txtXian.type = egret.TextFieldType.INPUT;
        this.txtXian.x = 423;
        this.txtXian.y = 630;
        this.txtXian.width = 100;
        this.txtXian.height = 30;
        this.txtXian.maxChars = 10;
        this.txtXian.size = 20;
        this.container.addChild(this.txtXian);
        // this.txtXian.border = true;
        this.txtAddress = new egret.TextField();
        this.txtAddress.type = egret.TextFieldType.INPUT;
        this.txtAddress.x = 180;
        this.txtAddress.y = 695;
        this.txtAddress.width = 380;
        this.txtAddress.height = 30;
        this.txtAddress.maxChars = 100;
        this.txtAddress.size = 20;
        this.container.addChild(this.txtAddress);
        // this.txtAddress.border = true;
    };
    AddressPop.prototype.infoHandler = function () {
        PopManager.hidePop("AddressPop");
        PopManager.showPop("InfoPop");
    };
    AddressPop.prototype.sendExchange = function (data) {
        Global.post("n/exchange", data).then(function (res) {
            alert("兑换成功，可在个人中心里查看发货状态");
        });
    };
    AddressPop.prototype.duihuanHandler = function () {
        if (this.status == 0) {
            var selfName = this.txtName1.text;
            var selfPhone = this.txtPhone1.text;
            var sheng = this.txtSheng.text;
            var shi = this.txtShi.text;
            var xian = this.txtXian.text;
            var address = this.txtAddress.text;
            var hello = this.txtZhuFu.text;
            var otherName = this.txtName.text;
            var otherPhone = this.txtPhone.text;
            if (!otherName) {
                Message.show("收件人姓名 不能为空!");
            }
            else if (!otherPhone) {
                Message.show("收件人手机号码 不能为空!");
            }
            else if (!sheng) {
                Message.show("省份 不能为空!");
            }
            else if (!shi) {
                Message.show("市 不能为空!");
            }
            else if (!xian) {
                Message.show("县 不能为空!");
            }
            else if (!address) {
                Message.show("详细地址 不能为空!");
            }
            else if (!selfName) {
                Message.show("寄件人姓名 不能为空!");
            }
            else if (!selfPhone) {
                Message.show("寄件人手机号码 不能为空!");
            }
            else {
                sheng = sheng.replace("广西", "广西壮族自治区");
                if (this.checkoutAddress(sheng) && this.checkoutAddress(shi) && this.checkoutAddress(xian)) {
                }
                else {
                    Message.show("港澳台、西藏、新疆、甘肃、青海、内蒙古、宁夏除外");
                    return;
                }
                if (confirm("确定用以下信息兑换[" + this.data.name + "]吗？" +
                    "\n您的姓名：" + selfName +
                    "\n您的手机号：" + selfPhone +
                    "\n您写给收货人的祝福语：" + hello +
                    "\n收货地址：" + sheng + " " + shi + " " + xian + " " + address +
                    "\n收货人姓名：" + otherName +
                    "\n收货人手机号：" + otherPhone)) {
                    var obj = {};
                    obj.recprov = sheng;
                    obj.recity = shi;
                    obj.recounty = xian;
                    obj.recstreet = address;
                    obj.recontact = otherName;
                    obj.recphone = otherPhone;
                    obj.couponkeyfrom = this.data.couponkey;
                    obj.couponkeyto = this.data.couponkey;
                    obj.usermobile = selfPhone;
                    obj.helloer = selfName;
                    obj.hello = hello;
                    this.sendExchange(obj);
                }
            }
        }
        else {
            var selfName = this.txtName.text;
            var selfPhone = this.txtPhone.text;
            var sheng = this.txtSheng.text;
            var shi = this.txtShi.text;
            var xian = this.txtXian.text;
            var address = this.txtAddress.text;
            var hello = "";
            var otherName = this.txtName.text;
            var otherPhone = this.txtPhone.text;
            if (!otherName) {
                Message.show("收件人姓名 不能为空!");
            }
            else if (!otherPhone) {
                Message.show("收件人手机号码 不能为空!");
            }
            else if (!sheng) {
                Message.show("省份 不能为空!");
            }
            else if (!shi) {
                Message.show("市 不能为空!");
            }
            else if (!xian) {
                Message.show("县 不能为空!");
            }
            else if (!address) {
                Message.show("详细地址 不能为空!");
            }
            else {
                sheng = sheng.replace("广西", "广西壮族自治区");
                if (this.checkoutAddress(sheng) && this.checkoutAddress(shi) && this.checkoutAddress(xian)) {
                }
                else {
                    Message.show("港澳台、西藏、新疆、甘肃、青海、内蒙古、宁夏除外");
                    return;
                }
                if (confirm("确定用以下信息兑换[" + this.data.name + "]吗？" +
                    "\n您的姓名：" + selfName +
                    "\n您的手机号：" + selfPhone +
                    "\n收货地址：" + sheng + " " + shi + " " + xian + " " + address)) {
                    var obj = {};
                    obj.recprov = sheng;
                    obj.recity = shi;
                    obj.recounty = xian;
                    obj.recstreet = address;
                    obj.recontact = otherName;
                    obj.recphone = otherPhone;
                    obj.couponkeyfrom = this.data.couponkey;
                    obj.couponkeyto = this.data.couponkey;
                    obj.usermobile = selfPhone;
                    obj.helloer = selfName;
                    obj.hello = hello;
                    this.sendExchange(obj);
                }
            }
        }
    };
    AddressPop.prototype.checkoutAddress = function (name) {
        var arr = ["香港", "澳门", "台湾", "西藏", "新疆", "甘肃", "青海", "内蒙古", "宁夏"];
        for (var i = 0; i < arr.length; i++) {
            if (name.indexOf(arr[i]) != -1) {
                return false;
            }
        }
        return true;
    };
    return AddressPop;
}(PopView));
__reflect(AddressPop.prototype, "AddressPop");
//# sourceMappingURL=AddressPop.js.map