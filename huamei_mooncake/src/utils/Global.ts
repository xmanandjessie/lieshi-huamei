/**
 *
 * @author 
 *
 */
class Global {
    public constructor() {
    }
    public static createBitmapByRes(res: string, name: string): egret.Bitmap {
        var result: egret.Bitmap = new egret.Bitmap();
        var spriteSheet: egret.SpriteSheet = RES.getRes(res);
        console.log("name::" + name + "::" + res);
        result.texture = spriteSheet.getTexture(name);
        return result;
    }
    public static createBitmapByName(name: string, x = 0, y = 0): egret.Bitmap {
        var result: egret.Bitmap = new egret.Bitmap();
        var texture: egret.Texture = RES.getRes(name);
        result.texture = texture;
        result.x = x;
        result.y = y;
        return result;
    }
    public static fadeIn(m, d = 0, t = 500, sc = 1) {
        Global.tweenFrom(m, d, t, 0, 0, sc, egret.Ease.cubicOut);
    }
    public static fadeOut(m, d = 0, t = 500, sc = 1) {
        Global.tweenToHide(m, d, t, 0, 0, sc, egret.Ease.cubicOut);
    }
    public static zoomIn(m, d = 0, t = 500, sc = 0.6) {
        Global.tweenFrom(m, d, t, 0, 0, sc, egret.Ease.backOut);
    }
    public static zoomOut(m, d = 0, t = 500, sc = 1.5) {
        Global.tweenToHide(m, d, t, 0, 0, sc, egret.Ease.cubicIn);
    }
    public static tweenToHide(m, d, t, ox, oy, sc, ease, alpha = 0) {
        var tw = egret.Tween.get(m);
        var xx = m.x;
        var yy = m.y;
        //var w = m.width;
        //var h = m.height;

        xx = xx + ox;// + (1 - sc) / 2 * w;
        yy = yy + oy;// + (1 - sc) / 2 * h;
        tw.wait(d);
        tw.to({ alpha: alpha, scaleX: sc, scaleY: sc, x: xx, y: yy }, t, ease);
        tw.call(function () {
            if (m.parent) m.parent.removeChild(m);
        });

    }
    public static tweenTo(m, d, t, x, y, a = 1, sc = 1, ease = egret.Ease.cubicOut) {
        var tw = egret.Tween.get(m);
        tw.wait(d);
        if (ease) {
            tw.to({ alpha: a, scaleX: sc, scaleY: sc, x: x, y: y }, t, ease);
        } else {
            tw.to({ alpha: a, scaleX: sc, scaleY: sc, x: x, y: y }, t);
        }

    }
    public static tweenFrom(m, d, t, ox, oy, sc, ease) {
        var tw = egret.Tween.get(m);
        var xx = m.x;
        var yy = m.y;
        //var w = m.width;
        // var h = m.height;
        m.scaleX = m.scaleY = sc;
        m.x = xx + ox;// + (1 - sc) / 2 * w;
        m.y = yy + oy;// + (1 - sc) / 2 * h;
        tw.wait(d);
        tw.to({ alpha: 1, scaleX: 1, scaleY: 1, x: xx, y: yy }, t, ease);
    }

    public static createMc(json: string, png: string, lab: string): egret.MovieClip {
        var data = RES.getRes(json);//JSON  
        var texture: egret.Texture = RES.getRes(png);//Texture  
        var md: egret.MovieClipDataFactory = new egret.MovieClipDataFactory(data, texture);
        var result: egret.MovieClip = new egret.MovieClip(md.generateMovieClipData(lab));
        //result.play();
        return result;
    }
    public static remove(sp: egret.DisplayObject): void {
        if (sp && sp.parent) {
            sp.parent.removeChild(sp);
        }
    }

    public static setBut(sp: egret.DisplayObject): void {
        if (sp) {
            sp.touchEnabled = true;
            sp.addEventListener(egret.TouchEvent.TOUCH_BEGIN, function () { sp.alpha = 0.68; }, sp);
            sp.addEventListener(egret.TouchEvent.TOUCH_END, function () { sp.alpha = 1; }, sp);
            sp.addEventListener(egret.TouchEvent.TOUCH_RELEASE_OUTSIDE, function () { sp.alpha = 1; }, sp);
        }
    }
    public static getArrayItems(arr, num) {

        var temp_array = new Array();
        for (var index in arr) {
            temp_array.push(arr[index]);
        }

        var return_array = new Array();
        for (var i = 0; i < num; i++) {

            if (temp_array.length > 0) {
                var arrIndex = Math.floor(Math.random() * temp_array.length);
                return_array[i] = temp_array[arrIndex];
                temp_array.splice(arrIndex, 1);
            } else {
                break;
            }
        }
        return return_array;
    }

    private static grayMatrix = [
        0.3, 0.6, 0, 0, 0,
        0.3, 0.6, 0, 0, 0,
        0.3, 0.6, 0, 0, 0,
        0, 0, 0, 1, 0
    ];
    /**
     * 变灰滤镜
     */
    public static grayFlilter = [new egret.ColorMatrixFilter(Global.grayMatrix)];

    public static grayFlilter1 = [new egret.ColorMatrixFilter([
        0.1, 0.1, 0, 0, 200,
        0.1, 0.1, 0, 0, 0,
        0.1, 0.1, 0, 0, 0,
        0, 0, 0, 1, 0
    ])];

    public static DM_Filter = [new egret.GlowFilter(0x149340, 0.5, 30, 30, 2, 1)];

    public static GZ_Filter = [new egret.GlowFilter(0xB0D54C, 0.5, 30, 30, 2, 1)];

    public static JZ_Filter = [new egret.GlowFilter(0xD4C884, 0.5, 30, 30, 2, 1)];

    public static RP_Filter = [new egret.GlowFilter(0x4CBFFF, 0.5, 30, 30, 2, 1)];

    public static QP_Filter = [new egret.GlowFilter(0xA2A2A2, 0.5, 30, 30, 2, 1)];

    public static AI_Filter = [new egret.GlowFilter(0xCC0000, 0.5, 30, 30, 2, 1)];


    public static errorTips(data): void {
        if (data) {
            if (data.reason == "invalidticket") {
                //ticket过期
                PopManager.showPop("ErrorPop", ErrorCode.TICKET_TIME_OUT);
            } else if (data.reason == "invalidticketparam") {
                //无效ticket
                PopManager.showPop("ErrorPop", ErrorCode.NOT_FOUND);
            }
            else {
                //系统繁忙
                PopManager.showPop("ErrorPop", ErrorCode.SYSTEM_ERROR);
            }
        }
    }

    public static showTips(str): void {
        Message.show(str);
    }

    public static getQueryString(name) {
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
        var r = window.location.search.substr(1).match(reg);
        if (r != null) {
            return decodeURIComponent((r[2]));
        }
        return null;
    }

    public static setItem(key, value) {
        if (value == undefined || value == null || !key) {
            return;
        }
        localStorage.setItem('page_bridge_' + key, JSON.stringify(value))
    }
    public static getItem(key) {
        if (!key) {
            return;
        }
        let value;
        value = localStorage.getItem('page_bridge_' + key);
        if (value == undefined || value == null || value == "") {
            return;
        }
        return JSON.parse(value)
    }

    public static isinweixin() {
        if (/MicroMessenger/.test(window.navigator.userAgent)) {
            return true;
        } else {
            return false;
        }
    }
    public static isinzhifubao() {
        if (/AlipayClient/.test(window.navigator.userAgent)) {
            return true;
        } else {
            return false;
        }
    }

    /**
    * 复制到剪贴板
    */
    public static copyToClipboard(text: string) {
        try {
            let input = document.createElement("input");
            input.readOnly = true;
            input.value = text;
            document.body.appendChild(input);
            input.select();
            input.setSelectionRange(0, input.value.length);
            document.execCommand("Copy");
            document.body.removeChild(input);
        } catch (e) {
            console.log(e);
            console.log("copy error");
        }
    }

    public static post(url, data) {
        if (data) {
            data.scankey = Main.USER_TICKET;
            data.loginkey = Main.LOGIN_KEY;
            data.eid = Main.EID;
        }
        return new Promise((resolve, reject) => {
            $.ajax(
                {
                    url: Main.ROOT + url,
                    data: data,
                    success: (data) => {
                        if (data.state == "success") {
                            resolve(data.data);
                        } else {
                            Message.show(data.error)
                            reject(data.error);
                            // if (data.error == "已过期" || data.error == "已退出" || data.error == "账号未授权登录本控制台") {
                            //     logout();
                            // }
                        }
                    },
                    error: function () {
                        PopManager.showPop("ErrorPop", { url: "resource/assets/asyn/error/error_web.png" });
                    }, timeout: 8000,
                    dataType: "json", async: true, type: "POST",
                    complete: (XMLHttpRequest, status) => {
                        if (status == 'timeout') {
                            PopManager.showPop("ErrorPop", { url: "resource/assets/asyn/error/error_web.png" });
                        }
                    }
                });
        });
    }

    public static names = ["华玥佳礼","煌玥尊礼","星玥臻礼","珀玥臻礼","蛋黄橘皮月","福月嘉礼","福月心礼","福月臻礼","福月尊礼","华美大礼包138","华美大礼包188","华美大礼包238","华美大礼包288","华美大礼包398"];
    public static names1 = ["华玥佳礼","煌玥尊礼","星玥臻礼","珀玥臻礼","蛋黄橘皮月","福月嘉礼","福月心礼","福月臻礼","福月尊礼","华美大礼包","华美大礼包","华美大礼包","华美大礼包","华美大礼包"];
    public static getTypeByName(name):number
    {
        var len = Global.names.length;
        for(var i = 0;i<len;i++)
        {
            if(name.indexOf(Global.names[i]) != -1)
            {
                return i+1;
            }
        }
        return -1;
    }

    /** 
	* 加法运算，避免数据相加小数点后产生多位数和计算精度损失。 
	* @param num1加数1 | num2加数2 
	*/
	public static numAdd(num1, num2) {
		var baseNum, baseNum1, baseNum2;
		try {
			baseNum1 = num1.toString().split(".")[1].length;
		} catch (e) {
			baseNum1 = 0;
		}
		try {
			baseNum2 = num2.toString().split(".")[1].length;
		} catch (e) {
			baseNum2 = 0;
		}
		baseNum = Math.pow(10, Math.max(baseNum1, baseNum2));
		return (num1 * baseNum + num2 * baseNum) / baseNum;
	};
}
