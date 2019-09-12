class SelfPop extends PopView
{
	private txtAll:egret.TextField;

	private txtJihuo:egret.TextField;

	private txtDuihuan:egret.TextField;

	public constructor()
	{
		super();
	}

	public setData(data):void
	{
		super.setData(data);

		
		var bg = new CustomImage("resource/assets/asyn/self/bg.png",true,()=>{
			bg.width = StageUtils.SW
		});
		this.addChild(bg);

		this.txtAll = new egret.TextField();
		this.txtAll.width = 400;
		this.txtAll.x = 130;
		this.txtAll.y = 275;
		this.txtAll.textColor = 0xffffff;
		this.txtAll.size = 26;
		this.addChild(this.txtAll);
		this.txtAll.text = "总张数:-";
 
		this.txtJihuo = new egret.TextField();
		this.txtJihuo.width = 400;
		this.txtJihuo.x = 330;
		this.txtJihuo.y = 275;
		this.txtJihuo.textColor = 0xffffff;
		this.txtJihuo.size = 26;
		this.addChild(this.txtJihuo);
		this.txtJihuo.text = "已激活张数:-";

		this.txtDuihuan = new egret.TextField();
		this.txtDuihuan.width = 400;
		this.txtDuihuan.x = 330;
		this.txtDuihuan.y = 300;
		this.txtDuihuan.textColor = 0xffffff;
		this.txtDuihuan.size = 26;
		this.addChild(this.txtDuihuan);
		this.txtDuihuan.text = "已兑换张数:-";
		this.txtDuihuan.visible = false;

		var btnWode = new CustomImage("resource/assets/asyn/self/self_wode.png",true,()=>{
			btnWode.x = 60;
			btnWode.y = 485;
		});
		this.addChild(btnWode);
		var btnSub = new CustomImage("resource/assets/asyn/self/self_sub.png",true,()=>{
			btnSub.x = StageUtils.SW - btnSub.width - 60;
			btnSub.y = 485;
		});
		this.addChild(btnSub);
		var btnList = new CustomImage("resource/assets/asyn/self/self_list.png",true,()=>{
			btnList.x = 60;
			btnList.y = 700;
		});
		this.addChild(btnList);
		var btnDown = new CustomImage("resource/assets/asyn/self/self_download.png",true,()=>{
			btnDown.x = StageUtils.SW - btnDown.width - 60;
			btnDown.y = 700;
		});
		this.addChild(btnDown);

		var btnBackList = new CustomImage("resource/assets/asyn/self/btn_list.png",true,()=>{
			btnBackList.x = 170;
			btnBackList.y = 950;
		});
		this.addChild(btnBackList);

		var btnPwd = new CustomImage("resource/assets/asyn/self/btn_changepwd.png",true,()=>{
			btnPwd.x = StageUtils.SW - btnPwd.width - 170;
			btnPwd.y = 950;
		});
		this.addChild(btnPwd);

		Global.setBut(btnWode);
		Global.setBut(btnSub);
		Global.setBut(btnList);
		Global.setBut(btnDown);
		Global.setBut(btnBackList);
		Global.setBut(btnPwd);

		btnWode.addEventListener(egret.TouchEvent.TOUCH_TAP,()=>{
			PopManager.hidePop("SelfPop");
			PopManager.showPop("OrderPop");
		},this);

		btnSub.addEventListener(egret.TouchEvent.TOUCH_TAP,()=>{
			PopManager.hidePop("SelfPop");
			PopManager.showPop("SubPop");
		},this);

		btnList.addEventListener(egret.TouchEvent.TOUCH_TAP,()=>{
			PopManager.hidePop("SelfPop");
			PopManager.showPop("PayListPop",0);
		},this);

		btnDown.addEventListener(egret.TouchEvent.TOUCH_TAP,()=>{
			PopManager.hidePop("SelfPop");
			PopManager.showPop("PayListPop",1);
		},this);

		btnBackList.addEventListener(egret.TouchEvent.TOUCH_TAP,()=>{
			PopManager.hidePop("SelfPop");
			PopManager.showPop("ListPop");
		},this);

		btnPwd.addEventListener(egret.TouchEvent.TOUCH_TAP,()=>{
			PopManager.hidePop("SelfPop");
			PopManager.showPop("ChangePWPop");
		},this);

		this.getData();
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
				this.showData();
			}
		});
	}

	private showData():void
	{
		this.txtAll.text = "总张数:"+this.orderData.couponum;
		this.txtJihuo.text = "已激活张数:"+this.orderData.paidnum;
		this.txtDuihuan.text = "已兑换张数:"+this.orderData.exnum;
	}

	private btnHandler():void
	{
		
	}
}