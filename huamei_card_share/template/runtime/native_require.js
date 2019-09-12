
var game_file_list = [
    //以下为自动修改，请勿修改
    //----auto game_file_list start----
	"libs/modules/egret/egret.js",
	"libs/modules/egret/egret.native.js",
	"libs/modules/game/game.js",
	"libs/modules/res/res.js",
	"libs/modules/tween/tween.js",
	"libs/jquery.js",
	"libs/ls.js",
	"bin-debug/comp/PopView.js",
	"bin-debug/comp/PopManager.js",
	"bin-debug/LightText.js",
	"bin-debug/LoadingUI.js",
	"bin-debug/Main.js",
	"bin-debug/Play.js",
	"bin-debug/PointText.js",
	"bin-debug/TipsPop.js",
	"bin-debug/UIManager.js",
	"bin-debug/comp/CustomImage.js",
	"bin-debug/comp/CustomRadioButton.js",
	"bin-debug/comp/CustomScrollView.js",
	"bin-debug/comp/Message.js",
	"bin-debug/Game.js",
	"bin-debug/CustomPop.js",
	"bin-debug/utils/AssetsUtils.js",
	"bin-debug/utils/CountData.js",
	"bin-debug/utils/ErrorCode.js",
	"bin-debug/utils/EventName.js",
	"bin-debug/utils/EventObj.js",
	"bin-debug/utils/GameDispatcher.js",
	"bin-debug/utils/Global.js",
	"bin-debug/utils/HttpService.js",
	"bin-debug/utils/Middle.js",
	"bin-debug/utils/PopUp.js",
	"bin-debug/utils/SoundManager.js",
	"bin-debug/utils/StageUtils.js",
	//----auto game_file_list end----
];

var window = this;

egret_native.setSearchPaths([""]);

egret_native.requireFiles = function () {
    for (var key in game_file_list) {
        var src = game_file_list[key];
        require(src);
    }
};

egret_native.egretInit = function () {
    if(egret_native.featureEnable) {
        //控制一些优化方案是否开启
        var result = egret_native.featureEnable({
            
        });
    }
    egret_native.requireFiles();
    //egret.dom为空实现
    egret.dom = {};
    egret.dom.drawAsCanvas = function () {
    };
};

egret_native.egretStart = function () {
    var option = {
        //以下为自动修改，请勿修改
        //----auto option start----
		entryClassName: "Main",
		frameRate: 30,
		scaleMode: "exactFit",
		contentWidth: 640,
		contentHeight: 1030,
		showPaintRect: false,
		showFPS: false,
		fpsStyles: "x:0,y:0,size:12,textColor:0xffffff,bgAlpha:0.9",
		showLog: false,
		logFilter: "",
		maxTouches: 2,
		textureScaleFactor: 1
		//----auto option end----
    };

    egret.native.NativePlayer.option = option;
    egret.runEgret();
    egret_native.Label.createLabel("/system/fonts/DroidSansFallback.ttf", 20, "", 0);
    egret_native.EGTView.preSetOffScreenBufferEnable(true);
};