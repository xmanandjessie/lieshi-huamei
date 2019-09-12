class LoadingUI extends egret.Sprite {

    private btnInto:egret.Bitmap;

    public constructor() {
        super();
        this.createView();
    }

    private container:egret.DisplayObjectContainer;

    private createView():void
    {
        var logo = Global.createBitmapByName("logo_png");
        logo.x = 20;
        logo.y = 20;
        this.addChild(logo);

        var mc = Global.createMc("yanhua_json","yanhua_png","");
        this.addChild(mc);
        mc.play();
        egret.Tween.get(mc,{loop:true}).wait(1000).call(function(){
            mc.gotoAndPlay(0);
            mc.x += (Math.random() * 50) - 25;
            mc.y += (Math.random() * 50) - 25;
        });

        var icon = Global.createBitmapByName("icon_png");
        icon.x = StageUtils.SW - icon.width >> 1;
        icon.y = - icon.height;
        this.addChild(icon);
        egret.Tween.get(icon).to({y:50},1000,egret.Ease.circIn);

        this.container = new egret.DisplayObjectContainer();
        this.addChild(this.container);

        var car = Global.createBitmapByName("car_png");
        car.anchorOffsetX = car.width >> 1;
        car.anchorOffsetY = car.height >> 1;
        
        car.x = 670;
        car.y = StageUtils.SH - car.height + 100;
        this.container.addChild(car);

         var carButtom = Global.createBitmapByName("car_buttom_png");
        carButtom.x = car.x - 68.5;
        carButtom.y = car.y - 12.5;
        this.container.addChild(carButtom);

        egret.Tween.get(car,{loop:true}).to({rotation:360},5000);

        var lou1 = Global.createBitmapByName("lou1_png");
        lou1.x = 0;
        lou1.y = StageUtils.SH - lou1.height;
        this.container.addChild(lou1);

        var lou2 = Global.createBitmapByName("lou2_png");
        lou2.x = lou1.x + lou1.width + 40;
        lou2.y = StageUtils.SH - lou2.height;
        this.container.addChild(lou2);

        var lou3 = Global.createBitmapByName("lou3_png");
        lou3.x = lou2.x + lou2.width;
        lou3.y = StageUtils.SH - lou3.height;
        this.container.addChild(lou3);

        var self = this;
        egret.Tween.get(this.container).to({x:-1590 + 640},3000).call(function(){
            var deng = Global.createBitmapByName("deng_png");
            deng.x = StageUtils.SW - deng.width - 70;
            deng.y = StageUtils.SH - deng.height - 65;
            deng.anchorOffsetX = 69;
            self.addChild(deng);
            egret.Tween.get(deng,{loop:true}).to({rotation:8},500).to({rotation:0},500).to({rotation:-8},500).to({rotation:0},500);
            self.setTimeOK();
        });

        this.btnInto = Global.createBitmapByName("btn_ok_png");
        this.btnInto.x = StageUtils.SW - this.btnInto.width >> 1;
        this.btnInto.y = StageUtils.SH - this.btnInto.height - 50;
        this.addChild(this.btnInto);
        this.btnInto.visible = false;
        this.btnInto.touchEnabled = true;
        this.btnInto.addEventListener(egret.TouchEvent.TOUCH_TAP,this.intoHandler,this);
    }

    private intoHandler():void
    {
        var sound:egret.Sound = RES.getRes("bg_mp3");
        sound.play();
        this.parent.removeChild(this);
        UIManager.instance.initProBg();


        var url = window.location.href.split("?")[1];
        url = url.split("=")[0];
        var ut;
        if(url)
        {
            ut = url.split(",");
            Play.text = decodeURI(ut[0]);
            Play.type = ut[1];
            Play.username = decodeURI(ut[2]);
            var cus = ut[3].split("&")[0];
            Play.isCustom = cus == "false" ? false : true;
            UIManager.instance.initPlayView();
        }
    }

    public setProgress(current:number, total:number):void 
    {
        // this.textField.text = `Loading...${current}/${total}`;
    }

    private resOK:boolean;

    private timeOK:boolean;

    public setResOK():void
    {
        this.resOK = true;
        this.check();
    }

    public setTimeOK():void
    {
        this.timeOK = true;
        this.check();
    }

    private check():void
    {
        if(this.resOK && this.timeOK)
        {
            this.btnInto.visible = true;
        }
    }
}
