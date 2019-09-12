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
var PayListPop = (function (_super) {
    __extends(PayListPop, _super);
    function PayListPop() {
        return _super.call(this) || this;
    }
    PayListPop.prototype.setData = function (data) {
        var _this = this;
        _super.prototype.setData.call(this, data);
        var btnBack = Global.createBitmapByName("back_png");
        btnBack.x = 20;
        btnBack.y = 20;
        this.addChild(btnBack);
        Global.setBut(btnBack);
        btnBack.addEventListener(egret.TouchEvent.TOUCH_TAP, function () {
            PopManager.hidePop("PayListPop");
            PopManager.showPop("SelfPop");
        }, this);
        var bg = new CustomImage("resource/assets/asyn/paylist/title.png", true, function () {
            bg.x = StageUtils.SW - bg.width >> 1;
            bg.y = 50;
        });
        this.addChild(bg);
        this.btnDai = new CustomImage("resource/assets/asyn/paylist/btn1.png", true, function () {
            _this.btnDai.x = 60;
            _this.btnDai.y = 120;
        });
        this.addChild(this.btnDai);
        this.btnYi = new CustomImage("resource/assets/asyn/paylist/btn2.png", true, function () {
            _this.btnYi.x = 215;
            _this.btnYi.y = 120;
        });
        this.addChild(this.btnYi);
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
        this.addChild(this.container);
        this.btnDai.addEventListener(egret.TouchEvent.TOUCH_TAP, function () {
            _this.changeStatus(0);
        }, this);
        this.btnYi.addEventListener(egret.TouchEvent.TOUCH_TAP, function () {
            _this.changeStatus(1);
        }, this);
        Global.setBut(this.btnDai);
        Global.setBut(this.btnYi);
        this.changeStatus(data);
    };
    PayListPop.prototype.changeStatus = function (status) {
        if (this.status == status) {
            return;
        }
        this.status = status;
        if (this.status == 0) {
            this.btnDai.reload("resource/assets/asyn/paylist/btn1_1.png");
            this.btnYi.reload("resource/assets/asyn/paylist/btn2.png");
            this.btnLine.x = 90;
            this.showList();
        }
        else {
            this.btnDai.reload("resource/assets/asyn/paylist/btn1.png");
            this.btnYi.reload("resource/assets/asyn/paylist/btn2_1.png");
            this.btnLine.x = 240;
            this.showDown();
        }
    };
    PayListPop.prototype.showList = function () {
        this.container.removeChildren();
        this.pageNum = 0;
        this.orderData = { couponum: 0, exnum: 0, pagedlist: [], paidnum: 0, totalitems: 0, totalpages: 0 };
        this.getData();
    };
    PayListPop.prototype.showListData = function () {
        var txtAll = new egret.TextField();
        txtAll.width = 400;
        txtAll.x = 130;
        txtAll.y = 225;
        txtAll.textColor = 0x0;
        txtAll.size = 26;
        this.container.addChild(txtAll);
        txtAll.text = "总张数:" + this.orderData.couponum;
        var txtJihuo = new egret.TextField();
        txtJihuo.width = 400;
        txtJihuo.x = 330;
        txtJihuo.y = 225;
        txtJihuo.textColor = 0x0;
        txtJihuo.size = 26;
        this.container.addChild(txtJihuo);
        txtJihuo.text = "已激活张数:" + this.orderData.paidnum;
        var txtDuihuan = new egret.TextField();
        txtDuihuan.width = 400;
        txtDuihuan.x = 330;
        txtDuihuan.y = 250;
        txtDuihuan.textColor = 0x0;
        txtDuihuan.size = 26;
        this.container.addChild(txtDuihuan);
        txtDuihuan.text = "已兑换张数:" + this.orderData.exnum;
        txtDuihuan.visible = false;
        var scrollContainer = new egret.DisplayObjectContainer();
        var scroll = new egret.ScrollView(scrollContainer);
        scroll.width = StageUtils.SW;
        scroll.height = 730;
        scroll.x = 0;
        scroll.y = 300;
        scroll.horizontalScrollPolicy = "off";
        this.container.addChild(scroll);
        var list = this.orderData.pagedlist;
        var len = list.length;
        var result = [];
        for (var i = 0; i < len; i++) {
            var obj = list[i];
            if (obj.status == 'd') {
                result.push(obj);
            }
        }
        len = result.length;
        var allPrice = 0;
        for (var i = 0; i < len; i++) {
            var item = new PayListItem();
            item.setData(result[i]);
            item.x = 20;
            item.y = 700 * i;
            scrollContainer.addChild(item);
        }
    };
    PayListPop.prototype.showDown = function () {
        this.container.removeChildren();
        var btnDown = new CustomImage("resource/assets/asyn/paylist/btn_down.png", true, function () {
            btnDown.x = StageUtils.SW - btnDown.width >> 1;
            btnDown.y = 310;
        });
        this.container.addChild(btnDown);
        Global.setBut(btnDown);
        btnDown.addEventListener(egret.TouchEvent.TOUCH_TAP, function () {
            if (Global.isinweixin()) {
                alert("请点击微信APP右上角的菜单，选择复制链接后用浏览器打开复制的链接即可下载(可能需要重新登录)");
                return;
            }
            if (Global.isinzhifubao()) {
                alert("请点击支付宝APP右上角的菜单，选择复制链接后用浏览器打开复制的链接即可下载(可能需要重新登录)");
                return;
            }
            window.open(Main.ROOT + "cs/dpo?loginkey=" + Main.LOGIN_KEY + "&eid=" + Main.EID + "&scankey=" + Main.USER_TICKET);
        }, this);
        var txtTips = new egret.TextField();
        txtTips.width = StageUtils.SW;
        txtTips.x = 0;
        txtTips.y = 390;
        txtTips.textAlign = "center";
        txtTips.textColor = 0xaaaaaa;
        txtTips.size = 26;
        this.container.addChild(txtTips);
        txtTips.text = "(每周一三五更新)";
    };
    PayListPop.prototype.getData = function () {
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
                _this.showListData();
            }
        });
    };
    return PayListPop;
}(PopView));
__reflect(PayListPop.prototype, "PayListPop");
//# sourceMappingURL=PayListPop.js.map