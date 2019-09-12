class OrderPop extends PopView
{
	private txtAll:egret.TextField;

	private txtAllPrice:egret.TextField;

	private btnDai:CustomImage;
	private btnYi:CustomImage;
	private btnShi:CustomImage;
	private btnLine:CustomImage;

	private container:egret.DisplayObjectContainer;

	private status;

	public constructor()
	{
		super();
	}

	public setData(data):void
	{
		super.setData(data);

		var btnBack = Global.createBitmapByName("back_png");
		btnBack.x = 20;
		btnBack.y = 20;
		this.addChild(btnBack);
		Global.setBut(btnBack);
		btnBack.addEventListener(egret.TouchEvent.TOUCH_TAP,()=>{
			PopManager.hidePop("OrderPop");
			PopManager.showPop("SelfPop");
		},this);


		var bg = new CustomImage("resource/assets/asyn/order/title.png",true,()=>{
			bg.x = StageUtils.SW - bg.width >> 1;
			bg.y = 50;
		});
		this.addChild(bg);


		this.btnDai = new CustomImage("resource/assets/asyn/order/btn1.png",true,()=>{
			this.btnDai.x = 60;
			this.btnDai.y = 120;
		});
		this.addChild(this.btnDai);

		this.btnYi = new CustomImage("resource/assets/asyn/order/btn2.png",true,()=>{
			this.btnYi.x = 215
			this.btnYi.y = 120;
		});
		this.addChild(this.btnYi);

		this.btnShi = new CustomImage("resource/assets/asyn/order/btn3.png",true,()=>{
			this.btnShi.x = 360
			this.btnShi.y = 120;
		});
		this.addChild(this.btnShi);

		this.btnLine = new CustomImage("resource/assets/asyn/order/line.png",true,()=>{
			this.btnLine.x = 90;
			this.btnLine.y = 170;
		});
		this.addChild(this.btnLine);

		var line = new CustomImage("resource/assets/asyn/order/line2.png",true,()=>{
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

		this.btnDai.addEventListener(egret.TouchEvent.TOUCH_TAP,()=>{
			this.changeStatus(0);
		},this);

		this.btnYi.addEventListener(egret.TouchEvent.TOUCH_TAP,()=>{
			this.changeStatus(1);
		},this);

		this.btnShi.addEventListener(egret.TouchEvent.TOUCH_TAP,()=>{
			this.changeStatus(2);
		},this);

		Global.setBut(this.btnDai);
		Global.setBut(this.btnYi);
		Global.setBut(this.btnShi);

		this.getData();
	}

	private changeStatus(status):void
	{
		if(this.status == status)
		{
			return;
		}
		this.status = status;
		if(this.status == 0)
		{
			this.btnDai.reload("resource/assets/asyn/order/btn1_1.png");
			this.btnYi.reload("resource/assets/asyn/order/btn2.png");
			this.btnShi.reload("resource/assets/asyn/order/btn3.png");
			this.btnLine.x = 90;
		}else if(this.status == 1)
		{
			this.btnDai.reload("resource/assets/asyn/order/btn1.png");
			this.btnYi.reload("resource/assets/asyn/order/btn2_1.png");
			this.btnShi.reload("resource/assets/asyn/order/btn3.png");
			this.btnLine.x = 240;
		}else
		{
			this.btnDai.reload("resource/assets/asyn/order/btn1.png");
			this.btnYi.reload("resource/assets/asyn/order/btn2.png");
			this.btnShi.reload("resource/assets/asyn/order/btn3_1.png");
			this.btnLine.x = 390;
		}
		this.refreshData();
	}

	private refreshData():void
	{
		this.container.removeChildren();
		
		var list = this.orderData.pagedlist;
		var len = list.length;

		var result = [];
		for(var i = 0;i<len;i++)
		{
			var obj = list[i];
			if((this.status == 0 && obj.status == 'i') || (this.status == 1 && obj.status == 'd') || (this.status == 2 && obj.status != 'i' && obj.status != 'd'))
			{
				result.push(obj);
			}
		}
		len = result.length;
		var allPrice = 0;
		for(var i = 0;i<len;i++){
			var item = new OrderItem();
			item.setData(result[i]);
			item.x = 20;
			item.y = 145 * i;
			this.container.addChild(item);
			allPrice += parseFloat(result[i].distotal);
		}

		this.txtAll.text = "总量:"+len+"盒  总计:";
		this.txtAllPrice.text = "￥"+allPrice.toFixed(2);
	}

	private orderData = {couponum:0,exnum:0,pagedlist:[],paidnum:0,totalitems:0,totalpages:0};
	private pageNum = 0;
	private getData():void
	{
		Global.post("cs/rhpo",{pagenum:this.pageNum}).then((data:any)=>{
			this.orderData.couponum = data.couponum;
			this.orderData.exnum = data.exnum;
			this.orderData.paidnum = data.paidnum;
			this.orderData.pagedlist = this.orderData.pagedlist.concat(data.pagedlist);

			if(data.totalpages > this.pageNum + 1)
			{
				this.pageNum ++;
				this.getData();
			}else
			{
				this.changeStatus(0);
			}
		});
	}
}