//////////////////////////////////////////////////////////////////////////////////////
//
//  Copyright (c) 2014-present, Egret Technology.
//  All rights reserved.
//  Redistribution and use in source and binary forms, with or without
//  modification, are permitted provided that the following conditions are met:
//
//     * Redistributions of source code must retain the above copyright
//       notice, this list of conditions and the following disclaimer.
//     * Redistributions in binary form must reproduce the above copyright
//       notice, this list of conditions and the following disclaimer in the
//       documentation and/or other materials provided with the distribution.
//     * Neither the name of the Egret nor the
//       names of its contributors may be used to endorse or promote products
//       derived from this software without specific prior written permission.
//
//  THIS SOFTWARE IS PROVIDED BY EGRET AND CONTRIBUTORS "AS IS" AND ANY EXPRESS
//  OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES
//  OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED.
//  IN NO EVENT SHALL EGRET AND CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT,
//  INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT
//  LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;LOSS OF USE, DATA,
//  OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF
//  LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
//  NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE,
//  EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
//
//////////////////////////////////////////////////////////////////////////////////////
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
var Main = (function (_super) {
    __extends(Main, _super);
    function Main() {
        var _this = _super.call(this) || this;
        _this.addEventListener(egret.Event.ADDED_TO_STAGE, _this.onAddToStage, _this);
        return _this;
    }
    Object.defineProperty(Main, "USER_INFO_API", {
        get: function () {
            return Main.ROOT + "info?" + Math.random();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Main, "PLAY_API", {
        get: function () {
            return Main.ROOT + "play?" + Math.random();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Main, "LOGIN_KEY", {
        get: function () {
            return Global.getItem("login_key");
        },
        enumerable: true,
        configurable: true
    });
    Main.prototype.onAddToStage = function (event) {
        StageUtils.registStage(this.stage);
        this.addChild(UIManager.instance);
        //设置加载进度界面
        //Config to load process interface
        this.loadingView = new LoadingUI();
        this.stage.addChild(this.loadingView);
        //初始化Resource资源加载库
        //initiate Resource loading library
        RES.addEventListener(RES.ResourceEvent.CONFIG_COMPLETE, this.onConfigComplete, this);
        RES.loadConfig("resource/default.res.json", "resource/");
    };
    /**
     * 配置文件加载完成,开始预加载preload资源组。
     * configuration file loading is completed, start to pre-load the preload resource group
     */
    Main.prototype.onConfigComplete = function (event) {
        RES.removeEventListener(RES.ResourceEvent.CONFIG_COMPLETE, this.onConfigComplete, this);
        RES.addEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onResourceLoadComplete, this);
        RES.addEventListener(RES.ResourceEvent.GROUP_LOAD_ERROR, this.onResourceLoadError, this);
        RES.addEventListener(RES.ResourceEvent.GROUP_PROGRESS, this.onResourceProgress, this);
        RES.addEventListener(RES.ResourceEvent.ITEM_LOAD_ERROR, this.onItemLoadError, this);
        RES.loadGroup("main");
    };
    /**
     * preload资源组加载完成
     * Preload resource group is loaded
     */
    Main.prototype.onResourceLoadComplete = function (event) {
        if (event.groupName == "preload") {
            RES.loadGroup("select");
        }
        else if (event.groupName == "select") {
            this.stage.removeChild(this.loadingView);
            RES.removeEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onResourceLoadComplete, this);
            RES.removeEventListener(RES.ResourceEvent.GROUP_LOAD_ERROR, this.onResourceLoadError, this);
            RES.removeEventListener(RES.ResourceEvent.GROUP_PROGRESS, this.onResourceProgress, this);
            RES.removeEventListener(RES.ResourceEvent.ITEM_LOAD_ERROR, this.onItemLoadError, this);
            this.createGameScene();
        }
        else if (event.groupName == "main") {
            this.stage.removeChild(this.loadingView);
            RES.removeEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onResourceLoadComplete, this);
            RES.removeEventListener(RES.ResourceEvent.GROUP_LOAD_ERROR, this.onResourceLoadError, this);
            RES.removeEventListener(RES.ResourceEvent.GROUP_PROGRESS, this.onResourceProgress, this);
            RES.removeEventListener(RES.ResourceEvent.ITEM_LOAD_ERROR, this.onItemLoadError, this);
            this.createGameScene();
        }
    };
    /**
     * 资源组加载出错
     *  The resource group loading failed
     */
    Main.prototype.onItemLoadError = function (event) {
        console.warn("Url:" + event.resItem.url + " has failed to load");
    };
    /**
     * 资源组加载出错
     *  The resource group loading failed
     */
    Main.prototype.onResourceLoadError = function (event) {
        //TODO
        console.warn("Group:" + event.groupName + " has failed to load");
        //忽略加载失败的项目
        //Ignore the loading failed projects
        this.onResourceLoadComplete(event);
    };
    /**
     * preload资源组加载进度
     * Loading process of preload resource group
     */
    Main.prototype.onResourceProgress = function (event) {
        if (event.groupName == "preload") {
            this.loadingView.setProgress(event.itemsLoaded, event.itemsTotal);
        }
    };
    /**
     * 创建游戏场景
     * Create a game scene
     */
    Main.prototype.createGameScene = function () {
        if (this.getData()) {
            // 0   经销商  
            // 1   个人
            // 2   固定码经销商
            // 3   固定码个人
            if (Global.getQueryString("page") == "3") {
                PopManager.showPop("InfoPop");
            }
            else if (Global.getQueryString("page") == "1") {
                Global.post("n/rcec", {}).then(function (res) {
                    if (res.status == "exchanged") {
                        PopManager.showPop("HasGetInfoPop");
                    }
                    else if (res.status == "topay") {
                        PopManager.showPop("HasGetBuyPop");
                    }
                    else {
                        PopManager.showPop("PersonalPop", res);
                    }
                });
            }
            else if (Global.getQueryString("page") == "0") {
                var loginKey = Global.getItem("login_key");
                if (loginKey) {
                    // PopManager.showPop("SelfPop");
                    PopManager.showPop("ListPop");
                }
                else {
                    PopManager.showPop("LoginPop");
                }
            }
            else if (Global.getQueryString("page") == "2") {
                var loginKey = Global.getItem("login_key");
                if (loginKey) {
                    PopManager.showPop("SelfPop");
                }
                else {
                    PopManager.showPop("LoginPop");
                }
            }
        }
        // if (this.getData()) {
        //     // PopManager.showPop("SelectListPop");
        //     // return;
        //     var self = this;
        //     $.ajax({
        //         url: Main.USER_INFO_API,
        //         data: { type: "first", ticket: Main.USER_TICKET },
        //         success: function (data) {
        //             if (data.result == 0) {
        //                 if (data.page == 1) {
        //                     PopManager.showPop("LoginPop");
        //                 } else if (data.page == 2) {
        //                     PopManager.showPop("ListPop");
        //                 } else if (data.page == 3) {
        //                     PopManager.showPop("SelectLoginPop");
        //                 } else if (data.page == 4) {
        //                     PopManager.showPop("SelectPop");
        //                 } else if (data.page == 5) {
        //                     // PopManager.showPop("IntoSharePop",{producttype:1,sharelist:[1,2,3,4],payorder:"123123123213123123"});
        //                     PopManager.showPop("PersonalPop", { type: 0, ptype: data.producttype });
        //                     // PopManager.showPop("InfoPop");
        //                 } else if (data.page == 6) {
        //                     PopManager.showPop("IntoSharePop", { producttype: data.producttype, sharelist: data.sharelist, payorder: data.payorder });
        //                 } else if (data.page == 7) {
        //                     //经销商  已激活
        //                     PopManager.showPop("ErrorPop", { url: "resource/assets/asyn/error/error_yijihuo.png", qr: 1, x: 140, y: 395 });
        //                 } else if (data.page == 8) {
        //                     //消费者扫支付码
        //                     PopManager.showPop("ErrorPop", { url: "resource/assets/asyn/error/error_guama.png" });
        //                 } else if (data.page == 9) {
        //                     //已被兑换（该ID从未兑换过）
        //                     PopManager.showPop("HasGetBuyPop");
        //                 } else if (data.page == 10) {
        //                     //已被兑换（该ID兑换过）
        //                     PopManager.showPop("HasGetInfoPop");
        //                 } else if (data.page == 11) {
        //                     //已被兑换（该ID兑换过）
        //                     PopManager.showPop("HasGetInfoPop");
        //                 } else if (data.page == 12) {
        //                     //二维码异常
        //                     PopManager.showPop("ErrorPop", { url: "resource/assets/asyn/error/error_code.png" });
        //                 } else if (data.page == 13) {
        //                     //分享的领取界面
        //                     PopManager.showPop("GetShareOKPop", { payorder: data.payorder });
        //                 } else if (data.page == 14) {
        //                     //活动火爆
        //                     PopManager.showPop("ErrorPop", { url: "resource/assets/asyn/error/error_huobao.png" });
        //                 } else if (data.page == 15) {
        //                     //网络超时
        //                     PopManager.showPop("ErrorPop", { url: "resource/assets/asyn/error/error_web.png" });
        //                 } else if (data.page == 16) {
        //                     //二次进入分享界面，显示分享的已被领取
        //                     PopManager.showPop("HasGetPop");
        //                 } else if (data.page == 17) {
        //                     //个人中心
        //                     PopManager.showPop("InfoPop");
        //                 } else if (data.page == 18) {
        //                     //支付失败，等待
        //                     PopManager.showPop("ErrorPop", { url: "resource/assets/asyn/error/error_pay.png" });
        //                 } else if (data.page == 19) {
        //                     //经销商支付断线重连
        //                     PopManager.showPop("ConfimPayPop", data.paylist);
        //                 } else if (data.page == 20) {
        //                     //分享的连接过期
        //                     PopManager.showPop("ErrorPop", { url: "resource/assets/asyn/share_end.png" });
        //                 } else if (data.page == 21) {
        //                     //活动未开始
        //                     PopManager.showPop("ErrorPop", { url: "resource/assets/asyn/error/error_no_open.png" });
        //                 }
        //             } else {
        //                 PopManager.showPop("ErrorPop", { url: "resource/assets/asyn/error/error_web.png" });
        //             }
        //         },
        //         error: function () {
        //         }, timeout: 8000,
        //         dataType: "json", async: true, type: "POST",
        //         complete: function (XMLHttpRequest, status) {
        //             if (status == 'timeout') {
        //                 PopManager.showPop("ErrorPop", { url: "resource/assets/asyn/error/error_web.png" });
        //             }
        //         }
        //     });
        // } else {
        // }
    };
    Main.prototype.getData = function () {
        Main.USER_TICKET = Global.getQueryString("scankey");
        Main.EID = Global.getQueryString("eid");
        return Main.USER_TICKET ? true : false;
    };
    Main.share = function (url, eshareinfo, time) {
        if (eshareinfo === void 0) { eshareinfo = null; }
        if (time === void 0) { time = null; }
        if (eval("$.wxIsReady")) {
            var weixin = eval("wx;");
            if (weixin) {
                // weixin.onMenuShareTimeline({
                //     title:"送你一份心意",
                //     link:url,
                //     imgUrl:"http://res.leasiondata.cn/lstatic/h/share/share_new.jpg",
                //     success: function () {
                //     },
                //     cancel: function () {
                //         // 用户取消分享后执行的回调函数
                //     }
                // });
                weixin.onMenuShareAppMessage({
                    title: "送你一份心意",
                    desc: "点击领取好友送您的月饼与祝福,该月饼券 " + time + " 日前领取有效",
                    link: url,
                    imgUrl: "http://res.leasiondata.cn/lstatic/h/share/share_new.jpg",
                    success: function () {
                        Main.sendShareOK(eshareinfo);
                    },
                    cancel: function () {
                    }
                });
            }
        }
        else {
            setTimeout(function () {
                Main.share(url, eshareinfo, time);
            }, 100);
        }
    };
    Main.sendShareOK = function (eshareinfo) {
        var self = this;
        $.ajax({
            url: Main.USER_INFO_API,
            data: { type: "esharesuccess", ticket: Main.USER_TICKET, eshareinfo: eshareinfo },
            success: function (data) {
                if (data.result == 0) {
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
    };
    Main.showShare = function () {
        var weixin = eval("wx");
        if (weixin) {
            weixin.showMenuItems({
                menuList: ["menuItem:share:appMessage"] // 要隐藏的菜单项，只能隐藏“传播类”和“保护类”按钮，所有menu项见附录3
            });
        }
    };
    Main.hideShare = function () {
        var weixin = eval("wx");
        if (weixin) {
            weixin.hideMenuItems({
                menuList: ["menuItem:share:timeline", "menuItem:share:qq", "menuItem:share:weiboApp", "menuItem:share:facebook", "menuItem:share:QZone", "menuItem:favorite", "menuItem:openWithQQBrowser", "menuItem:openWithSafari", "menuItem:share:email"] // 要隐藏的菜单项，只能隐藏“传播类”和“保护类”按钮，所有menu项见附录3
            });
        }
    };
    Main.USER_TICKET = "";
    Main.EID = "";
    Main.ROOT = "https://data.jedge.cn/";
    return Main;
}(egret.DisplayObjectContainer));
__reflect(Main.prototype, "Main");
//# sourceMappingURL=Main.js.map