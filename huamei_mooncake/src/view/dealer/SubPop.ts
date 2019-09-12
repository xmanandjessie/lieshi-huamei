class SubPop extends PopView
{
	private txtAll:egret.TextField;

	private txtAllPrice:egret.TextField;

	private btnAdd:CustomImage;
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
			PopManager.hidePop("SubPop");
			PopManager.showPop("SelfPop");
		},this);


		var title = new CustomImage("resource/assets/asyn/sub/title.png",true,()=>{
			title.x = StageUtils.SW - title.width >> 1;
			title.y = 50;
		});
		this.addChild(title);

		var bg = new CustomImage("resource/assets/asyn/sub/bg.png",true,()=>{
			bg.x = StageUtils.SW - bg.width >> 1;
			bg.y = 125;
		});
		this.addChild(bg);


		this.btnAdd = new CustomImage("resource/assets/asyn/sub/btn_add.png",true,()=>{
			this.btnAdd.x = StageUtils.SW - this.btnAdd.width >> 1;
			this.btnAdd.y = StageUtils.SH - this.btnAdd.height - 70;
		});
		this.addChild(this.btnAdd);
		Global.setBut(this.btnAdd);
		this.btnAdd.addEventListener(egret.TouchEvent.TOUCH_TAP,()=>{
			PopManager.showPop("CreateSubPop");
		},this);

		this.container = new egret.DisplayObjectContainer();
		
		var scroll = new egret.ScrollView(this.container);
		scroll.width = StageUtils.SW;
		scroll.height = 570;
		scroll.x = 0;
		scroll.y = 228;
		scroll.horizontalScrollPolicy = "off";
		this.addChild(scroll);

		this.getData();
	}

	private refreshData(list):void
	{
		this.container.removeChildren();
		
		var len = list.length;
		
		for(var i = 0;i<len;i++){
			var item = new SubItem();
			item.setData(list[i]);
			item.x = 20;
			item.y = 80 * i;
			this.container.addChild(item);
		}
	}

	private getData():void
	{
		Global.post("cs/rsas",{}).then((data:any)=>{
			this.refreshData(data);
		});
	}
}