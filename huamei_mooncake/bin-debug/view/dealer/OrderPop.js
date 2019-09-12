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
var OrderPop = (function (_super) {
    __extends(OrderPop, _super);
    function OrderPop() {
        var _this = _super.call(this) || this;
        _this.orderData = { couponum: 0, exnum: 0, pagedlist: [], paidnum: 0, totalitems: 0, totalpages: 0 };
        _this.pageNum = 0;
        return _this;
    }
    OrderPop.prototype.setData = function (data) {
        var _this = this;
        _super.prototype.setData.call(this, data);
        var btnBack = Global.createBitmapByName("back_png");
        btnBack.x = 20;
        btnBack.y = 20;
        this.addChild(btnBack);
        Global.setBut(btnBack);
        btnBack.addEventListener(egret.TouchEvent.TOUCH_TAP, function () {
            PopManager.hidePop("OrderPop");
            PopManager.showPop("SelfPop");
        }, this);
        var bg = new CustomImage("resource/assets/asyn/order/title.png", true, function () {
            bg.x = StageUtils.SW - bg.width >> 1;
            bg.y = 50;
        });
        this.addChild(bg);
        this.btnDai = new CustomImage("resource/assets/asyn/order/btn1.png", true, function () {
            _this.btnDai.x = 60;
            _this.btnDai.y = 120;
        });
        this.addChild(this.btnDai);
        this.btnYi = new CustomImage("resource/assets/asyn/order/btn2.png", true, function () {
            _this.btnYi.x = 215;
            _this.btnYi.y = 120;
        });
        this.addChild(this.btnYi);
        this.btnShi = new CustomImage("resource/assets/asyn/order/btn3.png", true, function () {
            _this.btnShi.x = 360;
            _this.btnShi.y = 120;
        });
        this.addChild(this.btnShi);
        this.btnLine = new CustomImage("resource/assets/asyn/order/line.png", true, function () {
            _this.btnLine.x = 90;
            _this.btnLine.y = 170;
        });
        this.addChild(this.btnLine);
        var line = new CustomImage("resource/assets/asyn/order/line2.png", true, function () {
            line.width = StageUtils.SW;
            line.y = 174;
        });
        this.addChild(line);
        this.container = new egret.DisplayObjectContainer();
        var scroll = new egret.ScrollView(this.container);
        scroll.width = StageUtils.SW;
        scroll.height = 590;
        scroll.x = 0;
        scroll.y = 190;
        scroll.horizontalScrollPolicy = "off";
        this.addChild(scroll);
        this.txtAll = new egret.TextField();
        this.txtAll.width = 400;
        this.txtAll.x = 50;
        this.txtAll.y = 815;
        this.txtAll.textColor = 0xaaaaaa;
        this.txtAll.size = 26;
        this.addChild(this.txtAll);
        this.txtAll.text = "总量:-盒  总计:";
        this.txtAllPrice = new egret.TextField();
        this.txtAllPrice.width = 400;
        this.txtAllPrice.x = 240;
        this.txtAllPrice.y = 807;
        this.txtAllPrice.textColor = 0xC09352;
        this.txtAllPrice.size = 40;
        this.addChild(this.txtAllPrice);
        this.txtAllPrice.text = "￥-";
        this.btnDai.addEventListener(egret.TouchEvent.TOUCH_TAP, function () {
            _this.changeStatus(0);
        }, this);
        this.btnYi.addEventListener(egret.TouchEvent.TOUCH_TAP, function () {
            _this.changeStatus(1);
        }, this);
        this.btnShi.addEventListener(egret.TouchEvent.TOUCH_TAP, function () {
            _this.changeStatus(2);
        }, this);
        Global.setBut(this.btnDai);
        Global.setBut(this.btnYi);
        Global.setBut(this.btnShi);
        this.getData();
    };
    OrderPop.prototype.changeStatus = function (status) {
        if (this.status == status) {
            return;
        }
        this.status = status;
        if (this.status == 0) {
            this.btnDai.reload("resource/assets/asyn/order/btn1_1.png");
            this.btnYi.reload("resource/assets/asyn/order/btn2.png");
            this.btnShi.reload("resource/assets/asyn/order/btn3.png");
            this.btnLine.x = 90;
        }
        else if (this.status == 1) {
            this.btnDai.reload("resource/assets/asyn/order/btn1.png");
            this.btnYi.reload("resource/assets/asyn/order/btn2_1.png");
            this.btnShi.reload("resource/assets/asyn/order/btn3.png");
            this.btnLine.x = 240;
        }
        else {
            this.btnDai.reload("resource/assets/asyn/order/btn1.png");
            this.btnYi.reload("resource/assets/asyn/order/btn2.png");
            this.btnShi.reload("resource/assets/asyn/order/btn3_1.png");
            this.btnLine.x = 390;
        }
        this.refreshData();
    };
    OrderPop.prototype.refreshData = function () {
        this.container.removeChildren();
        var list = this.orderData.pagedlist;
        var len = list.length;
        var result = [];
        for (var i = 0; i < len; i++) {
            var obj = list[i];
            if ((this.status == 0 && obj.status == 'i') || (this.status == 1 && obj.status == 'd') || (this.status == 2 && obj.status != 'i' && obj.status != 'd')) {
                result.push(obj);
            }
        }
        len = result.length;
        var allPrice = 0;
        for (var i = 0; i < len; i++) {
            var item = new OrderItem();
            item.setData(result[i]);
            item.x = 20;
            item.y = 145 * i;
            this.container.addChild(item);
            allPrice += parseFloat(result[i].distotal);
        }
        this.txtAll.text = "总量:" + len + "盒  总计:";
        this.txtAllPrice.text = "￥" + allPrice.toFixed(2);
    };
    OrderPop.prototype.getData = function () {
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
                _this.changeStatus(0);
            }
        });
    };
    return OrderPop;
}(PopView));
__reflect(OrderPop.prototype, "OrderPop");
//# sourceMappingURL=OrderPop.js.map