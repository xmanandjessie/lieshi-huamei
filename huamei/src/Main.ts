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

class Main extends egret.DisplayObjectContainer {

    public static instance:Main;

    public static isTest:boolean = false;

    public static musicIsPlay:boolean = false;

    public static user_ticket:string = "";

    public static status_ticket:string = "";

    public static uustr:string = "";

    public static prizenum:number = 0;

    public static get_word:string = "";

    public static special:number = 0;

    public static INFO_API:string = "http://leasiondata.cn/info";

    public static PLAY_API:string = "http://leasiondata.cn/play";

    public static SHARE_API:string = "http://123.59.89.56:81/newwxakouter/wxshareword";

    public static IQIYI:string = "http://vip.iqiyi.com/order.html?serviceCode=lyksc7aq36aedndk&pid=a0226bd958843452&fc=a988b1d4503873af";

    public static CARD:string = "https://shop13300156.wxrrd.com/coupon/get_code/42585";

    public static SHOP:string = "https://shop13300156.wxrrd.com/";

    /**
     * 加载进度界面
     * Process interface loading
     */
    private loadingView:LoadingUI;

    public constructor() {
        super();
        this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
    }

    private onAddToStage(event:egret.Event) 
    {
        Main.instance = this;
        StageUtils.registStage(this.stage);

        this.addChild(UIManager.instance);
        //设置加载进度界面
        //Config to load process interface
        this.loadingView = new LoadingUI();
        UIManager.instance.mainUILayer.addChild(this.loadingView);

        this.loadConfig();
    }

    public static musicPlay():void
    {
        Main.musicIsPlay = !Main.musicIsPlay;
        if(!Main.musicIsPlay)
        {
            if(Main.soundChannel)
            {
                Main.soundChannel.stop();
                Main.soundChannel = null;
            }
        }else
        {
            if(Main.sound)
            {
                Main.soundChannel = Main.sound.play();
            }
        }
    }

    private loadConfig():void
    {
        //初始化Resource资源加载库
        //initiate Resource loading library
        RES.addEventListener(RES.ResourceEvent.CONFIG_COMPLETE, this.onConfigComplete, this);
        RES.loadConfig("resource/default.res.json", "resource/");
    }

    private getShare()
    {
        var arr = window.location.href.split("#");
        if(arr.length == 1)
        {
            return false;
        }

        var arr1 = arr[1].split("?");
        var share = arr1[0];
        var ticket = arr1[1];

        var arr2 = share.split("&");
        Main.uustr = arr2[0].split("=")[1];
        Main.prizenum = parseInt(arr2[1].split("=")[1]);

        var ut = ticket.split(",");
        Main.user_ticket = ut[0];
        Main.status_ticket = ut[1];
        console.log(Main.user_ticket,Main.status_ticket);

        return true;
        
        // if(Main.isTest) 
        // {
        //     return true;  
        // } 

        //http://0k6.cn/h/gotoshare$
        //uustr=7c2487c8d5574578b8ec5f00e5be17fc
        //&
        //prizenum=1
        //&
        //actiontype=get

        //uustr=7c2487c8d5574578b8ec5f00e5be17fc&prizenum=1&actiontype=get

        //http://0k6.cn/h/gotoshare$uustr=7c2487c8d5574578b8ec5f00e5be17fc&prizenum=1&actiontype=get?ticket1,ticket2

        //http://res.leasiondata.cn/lstatic/h/test.html?7116589c213c4273bc4219054e99d5d7,e91dad73378e47dd852d1657d3922372
    }

    private getData()
    {
        var url = window.location.href.split("?")[1];
        var ut;
        console.log("loadUser");
        
        if(Main.isTest) 
        {
            return true;  
        } 
        //Main.api ="test.json";
        if(url && url.length>20){
            ut = url.split(",");
            Main.user_ticket = ut[0];
            Main.status_ticket = ut[1];
            console.log(Main.user_ticket,Main.status_ticket);
            return true;
        }else{
            return false;
        }
    }

    private loadShare():void
    {
        var _this=this;
        $.ajax({
            url: Main.SHARE_API,
            data: { ticket: Main.user_ticket,actiontype:"get",uustr:Main.uustr,word:Main.prizenum},
            success: function(data)
            {
                if(data.status == 0)
                {
                    Main.get_word = data.word;
                    RES.loadGroup("preload");
                }else
                {
                    if(data.message == "readticketfail")
                    {
                        PopManager.showPop("ErrorPop",ErrorCode.TICKET_TIME_OUT);
                    }else if(data.message == "user has get this word once")
                    {
                        Main.get_word = "0";
                        RES.loadGroup("preload");
                    }else if(data.message == "word has been received")
                    {
                        Main.get_word = "-1";
                        RES.loadGroup("preload");
                    }
                    else if(data.message == "no word left")
                    {
                        Global.showTips("已被领取");
                    }else
                    {
                        Global.showTips(data.message+"");
                    }
                }
            },
            error: function() {
                PopManager.showPop("ErrorPop",ErrorCode.NOT_FOUND);
            },timeout: 8000,
            dataType: "json",async: true,type: "POST",
            complete: function(XMLHttpRequest,status) {
                if(status == 'timeout') {
                    PopManager.showPop("ErrorPop",ErrorCode.TIME_OUT);
                }
            }
        });
    }

    private loadUser(): void
    {
        console.log("loadUser");
        if(Main.isTest) {
            // Main.user = { "nickname": "jeff","headimgurl": "http://wx.qlogo.cn/mmopen/6BD2qP9V7sout0oux0ts55Pns1xtEpOl7icGF5GV68YdruILNBBCJvMMFCy0Wbbl7zFiaibjfibaIlKFcYIhRM6ntCU37lhk8amY/0" };
            this.intoGame();
            return;
        }
        var _this=this;
        $.ajax({
            url: Main.INFO_API,
            data: { ticket: Main.user_ticket,type:"info"},
            success: function(data)
            {
                if(data.result == "success")
                {
                    RewardManager.instance.initData(data);
                    if(data.c1ashed == "")
                    {
                        if(data.more.result == 0)
                        {
                            Main.special = data.more.special;
                            _this.intoGame();
                        }else
                        {
                            PopManager.showPop("ErrorPop",ErrorCode.SYSTEM_ERROR);
                        }
                    }else
                    {
                        var hasWord = true;
                        if(data.more.isfirst == 0)
                        {
                            hasWord = false;
                        }
                        // for (var word in RewardManager.instance.wordList)
                        // {
                        //     hasWord = true;
                        //     break;
                        // }
                        if(hasWord)
                        {
                            PopManager.showPop("ErrorPop",ErrorCode.RECEIVED_SELF);
                        }else
                        {
                            //已被领奖,无法进入游戏
                            PopManager.showPop("ErrorPop",ErrorCode.RECEIVED_ERROR);
                        }
                    }
                }else
                {
                    Global.errorTips(data);
                    // PopManager.showPop("ErrorPop",ErrorCode.SYSTEM_ERROR);
                }
            },
            error: function() {
                PopManager.showPop("ErrorPop",ErrorCode.NOT_FOUND);
            },timeout: 8000,
            dataType: "json",async: true,type: "POST",
            complete: function(XMLHttpRequest,status) {
                if(status == 'timeout') {
                    PopManager.showPop("ErrorPop",ErrorCode.TIME_OUT);
                }
            }
        });
    }

    private intoGame():void
    {
        RES.loadGroup("preload");
    }

    /**
     * 配置文件加载完成,开始预加载preload资源组。
     * configuration file loading is completed, start to pre-load the preload resource group
     */
    private onConfigComplete(event:RES.ResourceEvent):void {
        RES.removeEventListener(RES.ResourceEvent.CONFIG_COMPLETE, this.onConfigComplete, this);
        RES.addEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onResourceLoadComplete, this);
        RES.addEventListener(RES.ResourceEvent.GROUP_LOAD_ERROR, this.onResourceLoadError, this);
        RES.addEventListener(RES.ResourceEvent.GROUP_PROGRESS, this.onResourceProgress, this);
        RES.addEventListener(RES.ResourceEvent.ITEM_LOAD_ERROR, this.onItemLoadError, this);
        RES.loadGroup("global");
    }

    public static PreloadComp:boolean;
    /**
     * preload资源组加载完成
     * Preload resource group is loaded
     */
    private onResourceLoadComplete(event:RES.ResourceEvent):void {
        if (event.groupName == "preload") {
            // this.stage.removeChild(this.loadingView);
            Main.PreloadComp = true;
            this.loadingView.setComplete();
            RES.removeEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onResourceLoadComplete, this);
            RES.removeEventListener(RES.ResourceEvent.GROUP_LOAD_ERROR, this.onResourceLoadError, this);
            RES.removeEventListener(RES.ResourceEvent.GROUP_PROGRESS, this.onResourceProgress, this);
            RES.removeEventListener(RES.ResourceEvent.ITEM_LOAD_ERROR, this.onItemLoadError, this);
            // this.createGameScene();
        }else if(event.groupName == "loading")
        {
            RES.loadGroup("loading_music");

            this.loadingView.setFlash();

            if(this.getShare())
            {
                this.loadShare();
            }else if(this.getData())
            {
                this.loadUser();
            }else{
                PopManager.showPop("ErrorPop",ErrorCode.NOT_FOUND);
            }
            CountData.instance.init(StageUtils.stage,Main.user_ticket);
        }else if(event.groupName == "global")
        {
            RES.loadGroup("loading");
        }else if(event.groupName == "loading_music")
        {
            Main.sound = RES.getRes("music_mp3");
            Main.soundChannel = Main.sound.play();
            Main.musicIsPlay = true;
        }
    }

    public static soundChannel:egret.SoundChannel;

    public static sound:egret.Sound;

    /**
     * 资源组加载出错
     *  The resource group loading failed
     */
    private onItemLoadError(event:RES.ResourceEvent):void {
        console.warn("Url:" + event.resItem.url + " has failed to load");
    }

    /**
     * 资源组加载出错
     *  The resource group loading failed
     */
    private onResourceLoadError(event:RES.ResourceEvent):void {
        //TODO
        console.warn("Group:" + event.groupName + " has failed to load");
        //忽略加载失败的项目
        //Ignore the loading failed projects
        this.onResourceLoadComplete(event);
    }

    /**
     * preload资源组加载进度
     * Loading process of preload resource group
     */
    private onResourceProgress(event:RES.ResourceEvent):void {
        if (event.groupName == "preload") {
            this.loadingView.setProgress(event.itemsLoaded, event.itemsTotal);
        }
    }

    /**
     * 创建游戏场景
     * Create a game scene
     */
    public createGameScene():void 
    {
        if(this.loadingView && this.loadingView.parent)
        {
            this.loadingView.parent.removeChild(this.loadingView);
        }
        this.loadingView = null;


        // if(Main.soundChannel)
        // {
        //     Main.soundChannel.stop();
        //     Main.soundChannel = null;
        // }
        // if(Main.sound)
        // {
        //     Main.sound.close();
        //     Main.sound = null;
        // }

        RES.destroyRes("loading");
        // RES.destroyRes("loading_music");

        

        // UIManager.instance.initShareRewardView();
        // return;
        if(Main.get_word)
        {
            UIManager.instance.initShareRewardView();
        }else
        {
            if(Main.special == 0)
            {
                PopManager.showPop("HomePop");
            }else
            {
                UIManager.instance.initGameView();
            }
        }
        
        // UIManager.instance.initGameView();

        // UIManager.instance.initRewardView();
    }

    /**
     * 创建游戏场景
     * Create a game scene
     */
    public createGameScene1():void
    {
        if(this.loadingView && this.loadingView.parent)
        {
            this.loadingView.parent.removeChild(this.loadingView);
        }
        this.loadingView = null;


        // if(Main.soundChannel)
        // {
        //     Main.soundChannel.stop();
        //     Main.soundChannel = null;
        // }
        // if(Main.sound)
        // {
        //     Main.sound.close();
        //     Main.sound = null;
        // }

        RES.destroyRes("loading");
        // RES.destroyRes("loading_music");

        

        UIManager.instance.initGameView();
        // UIManager.instance.initGameView();

        // UIManager.instance.initRewardView();
    }


}