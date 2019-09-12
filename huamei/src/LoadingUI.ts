class LoadingUI extends egret.Sprite 
{

    private deng3Container:egret.DisplayObjectContainer;

    private btnMusic:egret.Bitmap;

    public constructor() 
    {
        super();
        this.loadBg();
    }

    public setProgress(current:number, total:number):void 
    {
        // this.textField.text = `Loading...${current}/${total}`;
    }

    public setComplete():void
    {
        var btnContainue:egret.Bitmap = Global.createBitmapByName("skep_png");
        btnContainue.x = StageUtils.stage.stageWidth - btnContainue.width - 20;
        btnContainue.y = StageUtils.stage.stageHeight - btnContainue.height - 20;
        this.addChild(btnContainue);
        Global.setBut(btnContainue);
        btnContainue.touchEnabled = true;
        btnContainue.once(egret.TouchEvent.TOUCH_TAP,this.containueHandler,this);

        this.setLoadComp();
    }

    private deng3ClickHandler():void
    {
        egret.Tween.get(this.deng3Container).to({rotation:-1},100).to({rotation:1},100).to({rotation:-1},100).to({rotation:1},100).to({rotation:0},100);
    }

    

    public setFlash():void
    {
        var logo = Global.createBitmapByName("logo_png",20,20);
        this.addChild(logo);

        var firework = Global.createBitmapByName("firework_png");
        firework.anchorOffsetX = firework.width >> 1;
        firework.anchorOffsetY = firework.height >> 1;
        firework.x = 540;
        firework.y = 280;
        this.addChild(firework);
        firework.alpha = 0;
        firework.scaleX = firework.scaleY = 0;

        egret.Tween.get(firework,{loop:true}).wait(550).to({scaleX:0.7,scaleY:0.7,alpha:1,y:280},200).wait(200).to({y:310,alpha:0},500).to({y:500,scaleX:0,scaleY:0,alpha:0},0);

        var firework1 = Global.createBitmapByName("firework1_png");
        firework1.anchorOffsetX = firework1.width >> 1;
        firework1.anchorOffsetY = firework1.height >> 1;
        firework1.x = 100;
        firework1.y = 250;
        this.addChild(firework1);
        firework1.alpha = 0;
        firework1.scaleX = firework1.scaleY = 0;

        egret.Tween.get(firework1,{loop:true}).wait(100).to({scaleX:0.3,scaleY:0.3,alpha:0.5,y:250},200).wait(200).to({y:280,alpha:0},500).to({y:500,scaleX:0,scaleY:0,alpha:0},0);

        var icon = Global.createBitmapByName("icon_png");
        icon.x = StageUtils.SW - icon.width >> 1;
        icon.y = 70;
        this.addChild(icon);

        // var deng1 = Global.createBitmapByName("deng_png");
        // deng1.scaleX = -1;
        // deng1.x = deng1.width >> 1;
        // deng1.y = -50;
        // this.addChild(deng1);

        // var deng2 = Global.createBitmapByName("deng_png");
        // deng2.x = StageUtils.SW - (deng2.width >> 1);
        // deng2.y = -50;
        // this.addChild(deng2);

        // egret.Tween.get(deng1,{loop:true}).to({rotation:5},3000).to({rotation:0},3000);

        // egret.Tween.get(deng2,{loop:true}).to({rotation:-5},1500).to({rotation:0},1500);

        
       

        // var deng3 = Global.createBitmapByName("deng2_png");
        // deng3.x = StageUtils.SW - deng3.width >> 1;
        // deng3.y = 645;
        // this.deng3Container.addChild(deng3);

        // egret.Tween.get(deng3,{loop:true}).to({rotation:-5},1500).to({rotation:0},1500);

        // deng3.touchEnabled = true;
        // deng3.addEventListener(egret.TouchEvent.TOUCH_TAP,this.deng3ClickHandler,this);

        var title1 = Global.createBitmapByName("hengfu_png");
        title1.anchorOffsetX = title1.width >> 1;
        title1.anchorOffsetY = title1.height >> 1;
        title1.x = StageUtils.CW;
        title1.y = 610;
        this.addChild(title1);
        
        title1.scaleX = 0;
        title1.scaleY = 0;


        egret.Tween.get(title1).to({scaleX:1,scaleY:1},750,egret.Ease.backOut);

        var title2 = Global.createBitmapByName("title_png");
        title2.x = StageUtils.SW - title2.width >> 1;
        title2.y = -200;
        this.addChild(title2);


        egret.Tween.get(title2).wait(650).to({y:340},500,egret.Ease.backIn).call(this.titleEnd,this);

        this.btnMusic = Global.createBitmapByName("music_png");
        this.btnMusic.x = StageUtils.SW - this.btnMusic.width - 20;
        this.btnMusic.y = 20;
        this.addChild(this.btnMusic);

        this.btnMusic.touchEnabled = true;
        Global.setBut(this.btnMusic);

        this.btnMusic.addEventListener(egret.TouchEvent.TOUCH_TAP,this.musicTouchHandler,this);

        this.deng3Container = new egret.DisplayObjectContainer();
        this.addChild(this.deng3Container); 

        var ren = Global.createBitmapByName("ren_png");
        ren.x = StageUtils.SW - ren.width >> 1;
        ren.y = StageUtils.SH - ren.height - 20;
        

        var hands = Global.createBitmapByName("hands_png");
        hands.anchorOffsetX = 7;
        hands.anchorOffsetY = 38;
        hands.x = ren.x + 200;
        hands.y = ren.y + 140;
        this.deng3Container.addChild(hands);
        this.deng3Container.addChild(ren);

        egret.Tween.get(hands,{loop:true}).to({rotation:30},250).to({rotation:0},250);


        this.deng3Container.rotation = 25;
        this.deng3Container.x = -100;
        this.deng3Container.scaleX = this.deng3Container.scaleY = 1.3;
        egret.Tween.get(this.deng3Container).to({x:100,y:-250},300).wait(500).to({x:-100,y:0},300).call(this.renEnd,this);
       
        this.timer = new egret.Timer(5000,1);
        this.timer.addEventListener(egret.TimerEvent.TIMER_COMPLETE,this.timerEndHandler,this);
        this.timer.start();
    }

    private renEnd():void
    {
        this.deng3Container.scaleX = -1.5;
        this.deng3Container.rotation = -25;
        this.deng3Container.x = 740;
        this.deng3Container.y = -300;

        egret.Tween.get(this.deng3Container).to({x:650,y:-450},300).wait(500).to({x:740},300).call(this.renEnd1,this);
    }

    private renEnd1():void
    {
        this.deng3Container.scaleX = 1;
        this.deng3Container.rotation = 0;
        this.deng3Container.x = -30;
        this.deng3Container.y = 200;
        this.deng3Container.scaleX = this.deng3Container.scaleY = 1;
         egret.Tween.get(this.deng3Container).to({y:0},300,egret.Ease.quadOut);
    }

    private titleLight:egret.Bitmap;
    private titleRect:egret.Rectangle;

    private titleEnd():void
    {
        this.titleLight = Global.createBitmapByName("title_light_png");
        this.titleLight.x = StageUtils.SW - this.titleLight.width >> 1;
        this.titleLight.y = 340;
        this.addChild(this.titleLight);

        this.titleRect = new egret.Rectangle(0,0,30,190);
        
        this.titleLight.mask = this.titleRect;

        egret.Tween.get(this.titleRect,{onChange:this.titleChange,onChangeObj:this}).to({x:this.titleLight.x + 550},500,egret.Ease.circIn);
    }

    private titleChange():void
    {
        this.titleLight.mask = this.titleRect;
    }

    private musicTouchHandler():void
    {
        Main.musicPlay();
        if(!Main.musicIsPlay)
        {
            this.btnMusic.filters = Global.grayFlilter;
            this.btnMusic.texture = RES.getRes("music_close_png");
        }else
        {
            this.btnMusic.filters = [];
            this.btnMusic.texture = RES.getRes("music_png");
        }
    }

    private loadBg(): void
    {
        this.addChild(new CustomImage("resource/assets/bg.png"));
    }

    private timerEndHandler()
    {
        this.setTimeComp();
    }

    private containueHandler():void
    {
        this.timer.stop();
        this.setTimeComp();
    }

    private timer:egret.Timer;

    private isLoadComp:boolean;

    private isTimeComp:boolean;

    public setLoadComp()
    {
        this.isLoadComp = true;
        this.checkComp();
    }

    public setTimeComp()
    {
        this.isTimeComp = true;
        this.checkComp();
    }

    public checkComp()
    {
        if(this.isLoadComp && this.isTimeComp)
        {
            if(ErrorPop.IsError)
            {
                Main.instance.createGameScene1();
            }else
            {
                Main.instance.createGameScene();
            }
        }
    }
}
