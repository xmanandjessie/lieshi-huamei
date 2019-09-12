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
var SelfPop = (function (_super) {
    __extends(SelfPop, _super);
    function SelfPop() {
        var _this = _super.call(this) || this;
        _this.orderData = { couponum: 0, exnum: 0, pagedlist: [], paidnum: 0, totalitems: 0, totalpages: 0 };
        _this.pageNum = 0;
        return _this;
    }
    SelfPop.prototype.setData = function (data) {
        _super.prototype.setData.call(this, data);
        var bg = new CustomImage("resource/assets/asyn/self/bg.png", true, function () {
            bg.width = StageUtils.SW;
        });
        this.addChild(bg);
        this.txtAll = new egret.TextField();
        this.txtAll.width = 400;
        this.txtAll.x = 130;
        this.txtAll.y = 275;
        this.txtAll.textColor = 0xffffff;
        this.txtAll.size = 26;
        this.addChild(this.txtAll);
        this.txtAll.text = "总张数:-";
        this.txtJihuo = new egret.TextField();
        this.txtJihuo.width = 400;
        this.txtJihuo.x = 330;
        this.txtJihuo.y = 275;
        this.txtJihuo.textColor = 0xffffff;
        this.txtJihuo.size = 26;
        this.addChild(this.txtJihuo);
        this.txtJihuo.text = "已激活张数:-";
        this.txtDuihuan = new egret.TextField();
        this.txtDuihuan.width = 400;
        this.txtDuihuan.x = 330;
        this.txtDuihuan.y = 300;
        this.txtDuihuan.textColor = 0xffffff;
        this.txtDuihuan.size = 26;
        this.addChild(this.txtDuihuan);
        this.txtDuihuan.text = "已兑换张数:-";
        this.txtDuihuan.visible = false;
        var btnWode = new CustomImage("resource/assets/asyn/self/self_wode.png", true, function () {
            btnWode.x = 60;
            btnWode.y = 485;
        });
        this.addChild(btnWode);
        var btnSub = new CustomImage("resource/assets/asyn/self/self_sub.png", true, function () {
            btnSub.x = StageUtils.SW - btnSub.width - 60;
            btnSub.y = 485;
        });
        this.addChild(btnSub);
        var btnList = new CustomImage("resource/assets/asyn/self/self_list.png", true, function () {
            btnList.x = 60;
            btnList.y = 700;
        });
        this.addChild(btnList);
        var btnDown = new CustomImage("resource/assets/asyn/self/self_download.png", true, function () {
            btnDown.x = StageUtils.SW - btnDown.width - 60;
            btnDown.y = 700;
        });
        this.addChild(btnDown);
        var btnBackList = new CustomImage("resource/assets/asyn/self/btn_list.png", true, function () {
            btnBackList.x = 170;
            btnBackList.y = 950;
        });
        this.addChild(btnBackList);
        var btnPwd = new CustomImage("resource/assets/asyn/self/btn_changepwd.png", true, function () {
            btnPwd.x = StageUtils.SW - btnPwd.width - 170;
            btnPwd.y = 950;
        });
        this.addChild(btnPwd);
        Global.setBut(btnWode);
        Global.setBut(btnSub);
        Global.setBut(btnList);
        Global.setBut(btnDown);
        Global.setBut(btnBackList);
        Global.setBut(btnPwd);
        btnWode.addEventListener(egret.TouchEvent.TOUCH_TAP, function () {
            PopManager.hidePop("SelfPop");
            PopManager.showPop("OrderPop");
        }, this);
        btnSub.addEventListener(egret.TouchEvent.TOUCH_TAP, function () {
            PopManager.hidePop("SelfPop");
            PopManager.showPop("SubPop");
        }, this);
        btnList.addEventListener(egret.TouchEvent.TOUCH_TAP, function () {
            PopManager.hidePop("SelfPop");
            PopManager.showPop("PayListPop", 0);
        }, this);
        btnDown.addEventListener(egret.TouchEvent.TOUCH_TAP, function () {
            PopManager.hidePop("SelfPop");
            PopManager.showPop("PayListPop", 1);
        }, this);
        btnBackList.addEventListener(egret.TouchEvent.TOUCH_TAP, function () {
            PopManager.hidePop("SelfPop");
            PopManager.showPop("ListPop");
        }, this);
        btnPwd.addEventListener(egret.TouchEvent.TOUCH_TAP, function () {
            PopManager.hidePop("SelfPop");
            PopManager.showPop("ChangePWPop");
        }, this);
        this.getData();
    };
    SelfPop.prototype.getData = function () {
        var _this = this;
        Global.post("cs/rhpo", { pagenum: this.pageNum }).then(function (data) {
            _this.orderData.couponum = data.couponum;
            _this.orderData.exnum = data.exnum;
            _this.orderData.paidnum = data.paidnum;
            _this.orderData.pagedlist = _this.orderData.pagedlist.concat(data.pagedlist);
            if (data.totalpages > _this.pageNum + 1) {
                _this.pageNum++;
                _this.getData();
            }
            else {
                _this.showData();
            }
        });
    };
    SelfPop.prototype.showData = function () {
        this.txtAll.text = "总张数:" + this.orderData.couponum;
        this.txtJihuo.text = "已激活张数:" + this.orderData.paidnum;
        this.txtDuihuan.text = "已兑换张数:" + this.orderData.exnum;
    };
    SelfPop.prototype.btnHandler = function () {
    };
    return SelfPop;
}(PopView));
__reflect(SelfPop.prototype, "SelfPop");
//# sourceMappingURL=SelfPop.js.map