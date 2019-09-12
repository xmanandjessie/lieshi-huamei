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
var OrderItem = (function (_super) {
    __extends(OrderItem, _super);
    function OrderItem() {
        return _super.call(this) || this;
    }
    OrderItem.prototype.setData = function (data) {
        var _this = this;
        this.data = data;
        this.graphics.beginFill(0xffffff);
        this.graphics.drawRoundRect(0, 0, 600, 133, 20);
        this.graphics.endFill();
        var txtName = new egret.TextField();
        txtName.x = 30;
        txtName.y = 30;
        txtName.textColor = 0x072a47;
        this.addChild(txtName);
        var txtCount = new egret.TextField();
        txtCount.x = 250;
        txtCount.y = 30;
        txtCount.textColor = 0xff4900;
        this.addChild(txtCount);
        var xiaoji = new egret.TextField();
        xiaoji.x = 30;
        xiaoji.y = 80;
        xiaoji.textColor = 0x072a47;
        xiaoji.text = "小计：";
        xiaoji.size = 24;
        this.addChild(xiaoji);
        var txtPrice = new egret.TextField();
        txtPrice.x = 100;
        txtPrice.y = 80;
        txtPrice.textColor = 0xff4900;
        txtPrice.size = 24;
        this.addChild(txtPrice);
        txtName.text = data.couponname + "";
        txtCount.text = "X" + data.couponum;
        txtPrice.text = "￥" + data.distotal;
        var btnDetail;
        if (this.data.status == 'i') {
            btnDetail = new CustomImage("resource/assets/asyn/order/btn_pay.png", true, function () {
                btnDetail.x = _this.width - 144 - 30;
                btnDetail.y = 20;
                btnDetail.width = 144;
                btnDetail.height = 40;
            });
            var btnCancel = new CustomImage("resource/assets/asyn/order/btn_cancel.png", true, function () {
                btnCancel.x = _this.width - 144 - 30;
                btnCancel.y = 70;
                btnCancel.width = 144;
                btnCancel.height = 40;
            });
            this.addChild(btnCancel);
            Global.setBut(btnCancel);
            btnCancel.addEventListener(egret.TouchEvent.TOUCH_TAP, function () {
                _this.sendCancel(_this.data.orderkey);
            }, this);
        }
        else {
            btnDetail = Global.createBitmapByName("btn_detail_png");
            btnDetail.x = this.width - btnDetail.width - 30;
            btnDetail.y = 46;
            btnDetail.visible = false;
        }
        this.addChild(btnDetail);
        Global.setBut(btnDetail);
        btnDetail.addEventListener(egret.TouchEvent.TOUCH_TAP, this.detailHandler, this);
    };
    OrderItem.prototype.detailHandler = function () {
        if (this.data) {
            if (this.data.status == 'i') {
                this.sendPay(this.data.orderkey);
            }
            else {
                PopManager.showPop("PayDetailPop", this.data);
            }
        }
    };
    OrderItem.prototype.sendPay = function (orderkey) {
        var _this = this;
        Global.post("wxp/" + Main.EID + "/" + orderkey, {}).then(function (data) {
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
                    PopManager.hidePop("OrderPop");
                    PopManager.showPop("PayOKPop", { price: _this.data.distotal });
                }, fail: function (res) {
                    alert("微信支付失败[" + res.err_msg + "]");
                    // this.sendCancel(orderkey)
                    // this.backListPop();
                }, cancel: function (res) {
                    // this.sendCancel(orderkey)
                }
            });
        }).catch(function (error) {
        });
    };
    OrderItem.prototype.sendCancel = function (orderkey) {
        Global.post("cs/cancel", { scankey: Main.USER_TICKET, loginkey: Main.LOGIN_KEY, eid: Main.EID, orderkey: orderkey }).then(function (data) {
            console.log("订单已取消");
            Message.show("订单已取消");
            PopManager.hidePop("OrderPop");
            PopManager.showPop("OrderPop");
        });
    };
    return OrderItem;
}(egret.Sprite));
__reflect(OrderItem.prototype, "OrderItem");
//# sourceMappingURL=OrderItem.js.map