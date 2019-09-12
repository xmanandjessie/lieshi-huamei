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
var ConfimPayPop = (function (_super) {
    __extends(ConfimPayPop, _super);
    function ConfimPayPop() {
        var _this = _super.call(this) || this;
        _this.allCount = 0;
        _this.allPrice = 0;
        _this.idList = [];
        _this.dic = {};
        return _this;
    }
    ConfimPayPop.prototype.setData = function (data) {
        _super.prototype.setData.call(this, data);
        var bg = new egret.Shape();
        bg.graphics.beginFill(0xffffff);
        bg.graphics.drawRect(0, 0, StageUtils.SW, StageUtils.SH);
        bg.graphics.endFill();
        this.addChild(bg);
        var btnBack = Global.createBitmapByName("back_png");
        btnBack.x = 20;
        btnBack.y = 20;
        this.addChild(btnBack);
        Global.setBut(btnBack);
        btnBack.addEventListener(egret.TouchEvent.TOUCH_TAP, function () {
            PopManager.hidePop("ConfimPayPop");
            PopManager.showPop("ListPop");
        }, this);
        var title = Global.createBitmapByName("confim_order_title_png");
        title.x = StageUtils.SW - title.width >> 1;
        title.y = 40;
        this.addChild(title);
        var len = data.length;
        for (var i = 0; i < len; i++) {
            var obj = data[i];
            if (obj) {
                this.couponkey = obj.couponkey;
                this.idList.push(obj.codekey);
                if (!this.dic[obj.name]) {
                    this.dic[obj.name] = [];
                }
                this.dic[obj.name].push(obj);
            }
        }
        len = this.dic.length;
        var index = 0;
        for (var str in this.dic) {
            var item = new ConfimPayItem();
            item.x = StageUtils.SW - 600 >> 1;
            item.y = 105 + index * 147;
            item.setData(this.dic[str]);
            this.addChild(item);
            index++;
            this.allCount += item.len;
            // this.allPrice += item.price;
            this.allPrice = Global.numAdd(this.allPrice, item.price);
        }
        var downbg = Global.createBitmapByName("down_bg_png");
        downbg.x = 0;
        downbg.y = StageUtils.SH - downbg.height;
        this.addChild(downbg);
        var txtCount = new egret.TextField();
        txtCount.x = 30;
        txtCount.y = StageUtils.SH - 55;
        txtCount.text = "总量:" + this.allCount + "盒";
        txtCount.textColor = 0x0;
        txtCount.size = 22;
        this.addChild(txtCount);
        var txtTotal = new egret.TextField();
        txtTotal.x = 180;
        txtTotal.y = StageUtils.SH - 55;
        txtTotal.text = "总计:";
        txtTotal.textColor = 0x0;
        txtTotal.size = 22;
        this.addChild(txtTotal);
        var txtAll = new egret.TextField();
        txtAll.x = 230;
        txtAll.y = StageUtils.SH - 63;
        txtAll.text = "￥" + this.allPrice;
        txtAll.textColor = 0xff4900;
        txtAll.size = 33;
        this.addChild(txtAll);
        var btnPay = Global.createBitmapByName("btn_pay_1_png");
        btnPay.x = StageUtils.SW - btnPay.width;
        btnPay.y = StageUtils.SH - btnPay.height;
        this.addChild(btnPay);
        Global.setBut(btnPay);
        btnPay.addEventListener(egret.TouchEvent.TOUCH_TAP, this.payTouchHandler, this);
    };
    ConfimPayPop.prototype.payTouchHandler = function () {
        var _this = this;
        var postData = {};
        postData.scankey = Main.USER_TICKET;
        postData.loginkey = Main.LOGIN_KEY;
        postData.eid = Main.EID;
        postData.codekeys = this.idList;
        postData.couponkey = this.couponkey;
        Global.post("cs/topay", postData).then(function (data) {
            if (data.payingnum != undefined) {
                if (data.payingnum == "0") {
                    _this.showPayError();
                    console.log("支付冲突，请重新选择后再支付");
                }
                else {
                    if (confirm("有" + data.payingnum + "张支付冲突\n点确定:继续支付其它券折后总价" + data.distotal + "元\n点取消:取消本次支付")) {
                        _this.sendPay(data.orderkey);
                    }
                    else {
                        _this.sendCancel(data.orderkey);
                    }
                }
            }
            else {
                _this.sendPay(data.orderkey);
            }
        }).catch(function (error) {
            console.log("error:" + error);
            _this.showPayError();
        });
    };
    ConfimPayPop.prototype.sendPay = function (orderkey) {
        var _this = this;
        if (Global.isinweixin()) {
            Global.post("wxp/" + Main.EID + "/" + orderkey, { scankey: Main.USER_TICKET, loginkey: Main.LOGIN_KEY, eid: Main.EID }).then(function (data) {
                var weixin = eval("wx");
                weixin.chooseWXPay({
                    appId: data.wxpayjsparams.appId,
                    timestamp: data.wxpayjsparams.timeStamp,
                    nonceStr: data.wxpayjsparams.nonceStr,
                    package: data.wxpayjsparams.package,
                    signType: 'HMACSHA256',
                    paySign: data.wxpayjsparams.paySign,
                    success: function (res) {
                        // 支付成功后的回调函数
                        PopManager.hidePop("ConfimPayPop");
                        PopManager.showPop("PayOKPop", { price: _this.allPrice });
                    }, fail: function (res) {
                        alert("微信支付失败[" + res.err_msg + "]");
                        _this.sendCancel(orderkey);
                        // this.backListPop();
                    }, cancel: function (res) {
                        _this.sendCancel(orderkey);
                    }
                });
            }).catch(function (error) {
            });
        }
        else if (Global.isinzhifubao()) {
            window.location.href = Main.ROOT + "zfb/" + Main.EID + "/" + orderkey;
        }
    };
    ConfimPayPop.prototype.sendCancel = function (orderkey) {
        var _this = this;
        Global.post("cs/cancel", { scankey: Main.USER_TICKET, loginkey: Main.LOGIN_KEY, eid: Main.EID, orderkey: orderkey }).then(function (data) {
            console.log("订单已取消");
            _this.backListPop();
        });
    };
    ConfimPayPop.prototype.backListPop = function () {
        PopManager.hidePop("ConfimPayPop");
        PopManager.showPop("ListPop");
    };
    ConfimPayPop.prototype.showPayError = function () {
        var _this = this;
        PopManager.showPop("TipsPop", {
            url: "tips_error_png", callback: function () {
                _this.backListPop();
            }
        });
    };
    return ConfimPayPop;
}(PopView));
__reflect(ConfimPayPop.prototype, "ConfimPayPop");
//# sourceMappingURL=ConfimPayPop.js.map