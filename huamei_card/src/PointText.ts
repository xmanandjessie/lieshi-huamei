class PointText extends egret.DisplayObjectContainer
{
	private _text:string;
	public size:number;

	private txtContent:egret.TextField;

	private container:egret.DisplayObjectContainer;

	public constructor(str,_size=100) 
	{
		super();
		this._text = str;
		this.size = _size;
		this.init();
	}

	public set text(val)
	{
		this._text = val;
		this.init();
	}

	public get text()
	{
		return this._text;
	}

	private init():void
	{
		this.removeChildren();
		var txt = new egret.TextField();
        txt.textAlign = egret.HorizontalAlign.CENTER;
        txt.text = this._text;//"蒸蒸日上\n阖家安康";
        txt.size = this.size;
        txt.x = StageUtils.SW - txt.width >> 1;
        txt.y = 10000;//this.stage.stageHeight - txt.height >> 1;
        txt.fontFamily = "黑体";
        // this.addChild(txt);
		this.txtContent = txt;
        
        var rt = new egret.RenderTexture();
        rt.drawToTexture(txt);

        var list = [];

        var row = rt.textureWidth;
        var col = rt.textureHeight;
		console.log(row,col);

		this.x = StageUtils.SW - row >> 1;
		
		console.log(egret.getTimer());
		var a = 0;
        for(var j = 0;j<col;j++)
        {
            for(var i = 0;i<row;i++)
            {
                if(i % 4 == 0 && j % 3 == 0)
                {
					
					a++;
                    if(rt.getPixel32(i,j)[0] != 0)
                    {
                        list.push({x:i,y:(col-j)});
                    }

					// if(rt.getPixel32(i,j))
                    // {
                    //     list.push({x:i,y:(col-j)});
                    // }
                }
            }
        }
		console.log(a);
		
		console.log(egret.getTimer());
        this.container = new egret.DisplayObjectContainer();
		this.container.blendMode = egret.BlendMode.ADD;
        this.addChild(this.container);

		this.showFlash(list);
        
        // var len = list.length;
        // console.log(len);
		// var a = egret.getTimer();
        // for(var i = 0;i<len;i++)
        // {
        //     var obj = list[i];
        //     if(obj)
        //     {
        //         var num = Math.random() * 1 + 0.5;
		// 		// var point = Global.createBitmapByName("point_png");
		// 		// point.x = obj.x * 1.0;
		// 		// point.y = obj.y * 1.0;
		// 		// point.width = point.height = num;
		// 		// container.addChild(point);
        //         var shape:egret.Shape = new egret.Shape();
        //         shape.graphics.beginFill(0xffff00);
        //         shape.graphics.drawCircle(obj.x * 1.0 ,obj.y * 1.0 ,num);
        //         shape.graphics.endFill();
        //         this.container.addChild(shape);
        //     }
        // }

		// console.log(egret.getTimer() - a);
		
        // container.x = StageUtils.SW - container.width >> 1;
        // container.y = 230;
        

        // var vr:egret.RenderTexture = new egret.RenderTexture();
        // vr.drawToTexture(this.container);
        // var bitmap = new egret.Bitmap();
        // bitmap.texture = vr;
        // this.addChild(bitmap);
        // bitmap.x = this.container.x;
        // bitmap.y = this.container.y;

        // var bf = new egret.BlurFilter(3,3);
        // bitmap.filters = [bf];
        // bitmap.blendMode = egret.BlendMode.ADD;
	}

	private list;
	private showFlash(_list):void
	{
		this.list = _list;
		this.addEventListener(egret.Event.ENTER_FRAME,this.enterFrameHandler,this);
	}

	private enterFrameHandler():void
	{
		var len = this.list.length;
		if(len)
		{
			for(var i = 0;i<60;i++)
			{
				if(this.list.length)
				{
					var obj = this.list.pop();
					if(obj)
					{
						var num = Math.random() * 1 + 0.7;
						var point = Global.createBitmapByName("point_png");
						point.x = obj.x * 1.0;
						point.y = obj.y * 1.0;
						point.width = point.height = num / 2 * 3;
						this.container.addChild(point);
					}
				}else
				{
					this.removeEventListener(egret.Event.ENTER_FRAME,this.enterFrameHandler,this);

					var vr:egret.RenderTexture = new egret.RenderTexture();
					vr.drawToTexture(this.container);
					var bitmap = new egret.Bitmap();
					bitmap.texture = vr;
					this.addChild(bitmap);
					bitmap.x = this.container.x;
					bitmap.y = this.container.y;

					var bf = new egret.BlurFilter(3,3);
					bitmap.filters = [bf];
					bitmap.blendMode = egret.BlendMode.ADD;
					return;
				}
			}
			// for(var i = 0;i<len;i++)
			// {
			// 	var obj = this.list[i];
			// 	if(obj)
			// 	{
			// 		var num = Math.random() * 1 + 0.5;
			// 		// var point = Global.createBitmapByName("point_png");
			// 		// point.x = obj.x * 1.0;
			// 		// point.y = obj.y * 1.0;
			// 		// point.width = point.height = num;
			// 		// container.addChild(point);
			// 		var shape:egret.Shape = new egret.Shape();
			// 		shape.graphics.beginFill(0xffff00);
			// 		shape.graphics.drawCircle(obj.x * 1.0 ,obj.y * 1.0 ,num);
			// 		shape.graphics.endFill();
			// 		this.container.addChild(shape);
			// 	}
			// }

			
			// var obj = this.list.pop();
			// if(obj)
			// {
			// 	var num = Math.random() * 1 + 0.5;
			// 	// var point = Global.createBitmapByName("point_png");
			// 	// point.x = obj.x * 1.0;
			// 	// point.y = obj.y * 1.0;
			// 	// point.width = point.height = num;
			// 	// container.addChild(point);
			// 	var shape:egret.Shape = new egret.Shape();
			// 	shape.graphics.beginFill(0xffff00);
			// 	shape.graphics.drawCircle(obj.x * 1.0 ,obj.y * 1.0 ,num);
			// 	shape.graphics.endFill();
			// 	this.container.addChild(shape);
			// }
		}else
		{
			this.removeEventListener(egret.Event.ENTER_FRAME,this.enterFrameHandler,this);

			// var vr:egret.RenderTexture = new egret.RenderTexture();
			// vr.drawToTexture(this.container);
			// var bitmap = new egret.Bitmap();
			// bitmap.texture = vr;
			// this.addChild(bitmap);
			// bitmap.x = this.container.x;
			// bitmap.y = this.container.y;

			// var bf = new egret.BlurFilter(3,3);
			// bitmap.filters = [bf];
			// bitmap.blendMode = egret.BlendMode.ADD;
		}
	}
}