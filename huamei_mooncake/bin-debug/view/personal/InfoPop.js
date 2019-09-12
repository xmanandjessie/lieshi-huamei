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
var InfoPop = (function (_super) {
    __extends(InfoPop, _super);
    function InfoPop() {
        return _super.call(this) || this;
    }
    InfoPop.prototype.setData = function (data) {
        _super.prototype.setData.call(this, data);
        var bg = new egret.Shape();
        bg.graphics.beginFill(0xe6e6e6);
        bg.graphics.drawRect(0, 0, StageUtils.SW, StageUtils.SH);
        bg.graphics.endFill();
        this.addChildAt(bg, 0);
        var title = new CustomImage("resource/assets/asyn/personal/title.png", true, function () {
            title.width = StageUtils.SW;
        });
        this.addChild(title);
        var dingdan = new CustomImage("resource/assets/asyn/personal/btn_wode.png", true, function () {
            dingdan.x = 40;
            dingdan.y = 130;
        });
        this.addChild(dingdan);
        var line = Global.createBitmapByName("p_line_2_png");
        line.x = 0;
        line.y = 105 - 5;
        this.addChild(line);
        this.loadData();
    };
    InfoPop.prototype.showPage = function (index) {
        if (index == 1) {
            this.initOrder();
        }
        else if (index == 2) {
            this.initCard();
        }
        else {
            this.initBuy();
        }
    };
    InfoPop.prototype.initBuy = function () {
        this.buyPage = new BuySendPop();
        this.addChild(this.buyPage);
    };
    InfoPop.prototype.initCard = function () {
        if (this.card) {
            this.cardPage = new egret.DisplayObjectContainer();
            this.addChild(this.cardPage);
            var bg = new egret.Shape();
            bg.graphics.beginFill(0xffffff);
            bg.graphics.drawRect(0, 106, StageUtils.SW, StageUtils.SH - 106);
            bg.graphics.endFill();
            this.cardPage.addChild(bg);
            var tips = Global.createBitmapByName("btn_tips_1_png");
            tips.x = StageUtils.SW - tips.width >> 1;
            tips.y = 130;
            this.cardPage.addChild(tips);
            Global.setBut(tips);
            tips.addEventListener(egret.TouchEvent.TOUCH_TAP, function () {
                PopManager.showPop("TipsPop", { url: "personal_tips_bg2_png", callback: function () { } });
            }, this);
            var container = new egret.DisplayObjectContainer();
            var scroll = new egret.ScrollView(container);
            scroll.width = StageUtils.SW;
            scroll.height = StageUtils.SH - 175;
            scroll.x = 0;
            scroll.y = 175;
            scroll.horizontalScrollPolicy = "off";
            this.cardPage.addChild(scroll);
            var h = 0;
            var tips1 = Global.createBitmapByName("card_type_buy_png");
            tips1.x = StageUtils.SW - tips1.width >> 1;
            container.addChild(tips1);
            h += tips1.height;
            var len = this.card.length;
            for (var i = 0; i < len; i++) {
                //{type:i+1,num:i+4}
                if (this.card[i]) {
                    var item = new InfoCardItem(this.card[i], i + 1, 0);
                    item.y = h + 25;
                    container.addChild(item);
                    h += 296;
                }
            }
            var tips2 = Global.createBitmapByName("card_type_get_png");
            tips2.x = StageUtils.SW - tips2.width >> 1;
            tips2.y = h + 25;
            container.addChild(tips2);
            h += tips2.height + 25;
            var len = this.esharedlist.length;
            for (var i = 0; i < len; i++) {
                //{type:i+1,num:i+4}
                if (this.esharedlist[i]) {
                    if (this.esharedInfo) {
                        var temp = this.esharedInfo[i];
                        if (temp && temp.length) {
                            var item = new InfoCardItem(this.esharedlist[i], i + 1, 1, temp[0]);
                            item.y = h + 25;
                            container.addChild(item);
                            h += 296;
                        }
                    }
                }
            }
            var tips3 = Global.createBitmapByName("card_type_out_png");
            tips3.x = StageUtils.SW - tips3.width >> 1;
            tips3.y = h + 25;
            container.addChild(tips3);
            h += tips3.height + 25;
            var len = this.esharelist.length;
            for (var i = 0; i < len; i++) {
                //{type:i+1,num:i+4}
                if (this.esharelist[i]) {
                    var item = new InfoCardItem(this.esharelist[i], i + 1, 2);
                    item.y = h + 25;
                    container.addChild(item);
                    h += 285;
                }
            }
            var bg = new egret.Shape();
            bg.graphics.beginFill(0x0, 0.001);
            bg.graphics.drawRect(0, 0, StageUtils.SW, h);
            bg.graphics.endFill();
            container.addChildAt(bg, 0);
        }
    };
    InfoPop.prototype.initOrder = function () {
        if (this.exchange) {
            this.orderPage = new egret.DisplayObjectContainer();
            this.addChild(this.orderPage);
            var container = new egret.DisplayObjectContainer();
            var scroll = new egret.ScrollView(container);
            scroll.width = StageUtils.SW;
            scroll.height = 815;
            scroll.x = 22;
            scroll.y = 175;
            scroll.horizontalScrollPolicy = "off";
            this.orderPage.addChild(scroll);
            var block = new egret.Shape();
            block.graphics.beginFill(0x0, 0.001);
            block.graphics.drawRect(0, 0, 30, 30);
            block.graphics.endFill();
            container.addChild(block);
            var len = this.exchange.length;
            for (var i = 0; i < len; i++) {
                var item = new InfoOrderItem(this.exchange[i]);
                item.y = 0 + 368 * i;
                container.addChild(item);
            }
        }
    };
    InfoPop.prototype.duihuanHandler = function () {
        PopManager.hidePop("InfoPop");
        PopManager.showPop("BuySendPop");
    };
    InfoPop.prototype.loadData = function () {
        var _this = this;
        Global.post("n/rheo", { pagenum: 0 }).then(function (res) {
            _this.exchange = res.pagedlist;
            _this.initOrder();
        });
    };
    return InfoPop;
}(PopView));
__reflect(InfoPop.prototype, "InfoPop");
//# sourceMappingURL=InfoPop.js.map