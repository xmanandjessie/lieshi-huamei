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
var PersonalPop = (function (_super) {
    __extends(PersonalPop, _super);
    function PersonalPop() {
        return _super.call(this) || this;
    }
    PersonalPop.prototype.setData = function (data) {
        _super.prototype.setData.call(this, data);
        this.initView();
        setTimeout(function () {
            PopManager.showPop("MessagePop");
        }, 1000);
    };
    PersonalPop.prototype.infoHandler = function () {
        PopManager.hidePop("AddressPop");
        PopManager.showPop("InfoPop");
    };
    PersonalPop.prototype.initView = function () {
        var _this = this;
        document.getElementById("title").innerHTML = this.data.shortname + "-智能礼券支付";
        var bg = new CustomImage("resource/assets/asyn/moontype/1/" + Global.getTypeByName(this.data.name) + ".jpg", true, function () {
            bg.width = StageUtils.SW;
            bg.height = StageUtils.SH;
        });
        this.addChild(bg);
        var btnInfo = Global.createBitmapByName("btn_info_png");
        btnInfo.x = StageUtils.SW - btnInfo.width - 20;
        btnInfo.y = 20;
        this.addChild(btnInfo);
        Global.setBut(btnInfo);
        btnInfo.addEventListener(egret.TouchEvent.TOUCH_TAP, this.infoHandler, this);
        var btnDuihuan = new CustomImage("resource/assets/asyn/personal/btn_ok" + (this.data.status ? "1" : "") + ".png", true, function () {
            btnDuihuan.y = StageUtils.SH - btnDuihuan.height / 2 - 150;
            if (_this.data.list && _this.data.list.length > 0) {
                var btnOther = new CustomImage("resource/assets/asyn/personal/btn_other.png", true, function () {
                    btnOther.x = StageUtils.SW - btnOther.width - 50;
                    btnOther.y = StageUtils.SH - btnOther.height / 2 - 150;
                });
                _this.addChild(btnOther);
                Global.setBut(btnOther);
                btnOther.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.otherHandler, _this);
                btnDuihuan.x = 50;
            }
            else {
                btnDuihuan.x = StageUtils.SW - btnDuihuan.width >> 1;
            }
        });
        this.addChild(btnDuihuan);
        Global.setBut(btnDuihuan);
        btnDuihuan.addEventListener(egret.TouchEvent.TOUCH_TAP, this.duihuanHandler, this);
    };
    PersonalPop.prototype.duihuanHandler = function () {
        if (this.data.status == "offshelf") {
            PopManager.showPop("QueHuoPop");
            console.log("缺货");
        }
        else if (this.data.status == "iscoming") {
            PopManager.showPop("QueHuoPop");
            console.log("将于" + this.data.timeon + "隆重登场");
        }
        else if (this.data.status == "topay") {
            console.log("未激活");
            PopManager.showPop("HasGetBuyPop");
            PopManager.hidePop("PersonalPop");
        }
        else if (this.data.status == "exchanged") {
            console.log("已兑换");
            PopManager.showPop("HasGetInfoPop");
            PopManager.hidePop("PersonalPop");
        }
        else {
            PopManager.showPop("ExchangeConfirmPop", this.data);
        }
    };
    PersonalPop.prototype.otherHandler = function () {
        PopManager.showPop("OtherExchangePop", this.data);
    };
    PersonalPop.prototype.shareHandler = function () {
        if (this.data) {
            if (this.data.type == 0) {
                //纸卷
                var self = this;
                $.ajax({
                    url: Main.USER_INFO_API,
                    data: { type: "pshare", ticket: Main.USER_TICKET, ptype: this.data.ptype },
                    success: function (data) {
                        if (data.result == 0) {
                            PopManager.hidePop("PersonalPop");
                            PopManager.showPop("SharePop", { code: data.code });
                        }
                        else {
                            Message.show(data.result);
                        }
                    },
                    error: function () {
                    }, timeout: 8000,
                    dataType: "json", async: true, type: "POST",
                    complete: function (XMLHttpRequest, status) {
                        if (status == 'timeout') {
                            PopManager.showPop("ErrorPop", { url: "resource/assets/asyn/error/error_web.png" });
                        }
                    }
                });
            }
            else {
                //电子卷
                var self = this;
                $.ajax({
                    url: Main.USER_INFO_API,
                    data: { type: "eshare", ticket: Main.USER_TICKET, ptype: this.data.ptype },
                    success: function (data) {
                        if (data.result == 0) {
                            PopManager.hidePop("PersonalPop");
                            PopManager.showPop("SharePop", { eshareinfo: data.eshareinfo, time: data.sharetime });
                        }
                        else {
                            Message.show(data.result);
                        }
                    },
                    error: function () {
                    }, timeout: 8000,
                    dataType: "json", async: true, type: "POST",
                    complete: function (XMLHttpRequest, status) {
                        if (status == 'timeout') {
                            PopManager.showPop("ErrorPop", { url: "resource/assets/asyn/error/error_web.png" });
                        }
                    }
                });
            }
        }
    };
    return PersonalPop;
}(PopView));
__reflect(PersonalPop.prototype, "PersonalPop");
//# sourceMappingURL=PersonalPop.js.map