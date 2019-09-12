class SubmitPop extends PopView 
{
	private btnSubmit:egret.Bitmap;

	private txtName:egret.TextField;

	private txtPhone:egret.TextField;

	private txtAdress:egret.TextField;

	private txtSF:egret.TextField;

	public constructor() 
	{
		super();
		this.init();
	}

	private init():void
	{
		this.initBg();
		this.initClose();

		var title = Global.createBitmapByName("icon_png");
		title.scaleX = title.scaleY = 0.8;
        title.x = (StageUtils.SW - title.width >> 1) + 38;
        title.y = 150;
        this.container.addChild(title);

		var ren = Global.createBitmapByName("ren_png");
        ren.x = 50;
        ren.y = 280;
        

        var hands = Global.createBitmapByName("hands_png");
        hands.anchorOffsetX = 7;
        hands.anchorOffsetY = 38;
        hands.x = ren.x + 100;
        hands.y = ren.y + 70;

		ren.scaleX = ren.scaleY = hands.scaleX = hands.scaleY = 0.5;

        this.container.addChild(hands);
        this.container.addChild(ren);

		var title = Global.createBitmapByName("submit_title_png");
		title.x = StageUtils.SW - title.width >> 1;
		title.y = 370;
		this.container.addChild(title);

		this.initSubmit();
	}

	protected closeTouchHandler():void
	{
		PopManager.hidePop("SubmitPop");
	}

	private initSubmit():void
	{
		this.btnSubmit = Global.createBitmapByName("btn_submit_png");
		this.btnSubmit.x = StageUtils.SW - this.btnSubmit.width >> 1;
		this.btnSubmit.y = StageUtils.SH - this.btnSubmit.height - 120;
		this.container.addChild(this.btnSubmit);

		this.btnSubmit.touchEnabled = true;
		this.btnSubmit.addEventListener(egret.TouchEvent.TOUCH_TAP,this.submitTouchHandler,this);

		Global.setBut(this.btnSubmit);
	}

	private submitTouchHandler():void
	{
		if(this.txtPhone)
		{
			var telep = this.txtPhone.text;
		}
		if(this.txtAdress)
		{
			var address = this.txtAdress.text;
		}
		if(this.txtName)
		{
			var name = this.txtName.text;
		}
		var sf = "";
		if(this.txtSF)
		{
			var sf = this.txtSF.text;
		}
		if(this.data == -1)
		{
			console.log("exchange");
			if(Main.isTest) 
			{
				PopManager.showPop("SubmitEndPop",-1);
				return;
			}

			if(telep && address && name)
			{
				var _this=this;
				$.ajax({
					url: Main.INFO_API,
					data: { ticket: Main.user_ticket,type:"exchange",telephone:telep,address:address,name:name},
					success: function(data)
					{
						if(data.result == "success")
						{
							if(data.more.result == 0)
							{
								//成功
								PopManager.showPop("SubmitEndPop",-1);
								RewardManager.instance.name = name;
								RewardManager.instance.phone = telep;
								RewardManager.instance.adress = address;
							}else
							{
								Global.showTips("提交失败:"+data.more.result);
								// PopManager.showPop("ErrorPop",ErrorCode.SYSTEM_ERROR);
							}
						}else
						{
							Global.errorTips(data);
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
				PopManager.hidePop("SubmitPop");
			}else
			{
				Global.showTips("请填写完整信息");
			}
		}else if(this.data.prizeid)
		{
			//telephone:telep,address:address,name:name
			var _this=this;
			$.ajax({
				url: Main.INFO_API,
				data: { ticket: Main.user_ticket,type:"giftinfo",id:_this.data.id,telephone:telep,address:address,name:name},
				success: function(data)
				{
					if(data.result == "success")
					{
						if(data.more.result == 0)
						{
							// RewardManager.instance.refreshData(data);
							//成功
							PopManager.hidePop("SubmitPop");
							_this.data.telephone = telep;
							_this.data.address = address;
							_this.data.name = name;
						}else
						{
							PopManager.showPop("ErrorPop",ErrorCode.SYSTEM_ERROR);
						}
					}else
					{
						Global.errorTips(data);
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
		else
		{
			console.log("exprize");
			if(Main.isTest) 
			{
				PopManager.showPop("SubmitEndPop",1);
				return;
			}
			var obj;
			if(this.data.id == 7)
			{
				//流量
				if(!telep)
				{
					Global.showTips("请填写完整信息");
					return;
				}
				obj =  { ticket: Main.user_ticket,type:"exprize",telephone:telep,prizetype:0,prizeid:this.data.id};
			}else if(this.data.id == 8 || this.data.id == 9)
			{
				//红包
				obj =  { ticket: Main.user_ticket,type:"exprize",desc:"抽中红包",prizetype:0,prizeid:this.data.id};
			}else if(this.data.id == 10)
			{
				//话费
				if(!telep)
				{
					Global.showTips("请填写完整信息");
					return;
				}
				obj =  { ticket: Main.user_ticket,type:"exprize",telephone:telep,prizetype:0,prizeid:this.data.id};
			}
			else
			{
				//实物
				if(telep && address && name)
				{
					if(this.data.id == 6)
					{
						if(!sf)
						{
							Global.showTips("请填写完整信息");
							return;
						}
					}
					obj =  { ticket: Main.user_ticket,type:"exprize",telephone:telep,address:address,name:name,prizetype:1,prizeid:this.data.id,province:sf};
				}else
				{
					Global.showTips("请填写完整信息");
					return;
				}
			}
			
			var _this=this;
			$.ajax({
				url: Main.INFO_API,
				data: obj,
				success: function(data)
				{
					if(data.result == "success")
					{
						if(data.more.result == 0)
						{
							RewardManager.instance.refreshData(data);
							//成功
							PopManager.showPop("SubmitEndPop",_this.data);
							// if(name)
							// {
							// 	RewardManager.instance.name = name;
							// }
							// if(telep)
							// {
							// 	RewardManager.instance.phone = telep;
							// }
							// if(address)
							// {
							// 	RewardManager.instance.adress = address;
							// }
							PopManager.hidePop("SubmitPop");
						}else
						{
							PopManager.showPop("ErrorPop",ErrorCode.SYSTEM_ERROR);
						}
					}else
					{
						Global.errorTips(data);
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
	}

	public setData(data:any):void
	{
		this.data = data;
		if(data)
		{
			if(data == -1)
			{
				var bg = new CustomImage("resource/assets/async/submit_lottery.png");
				bg.x = StageUtils.SW - 396 >> 1;
				bg.y = 450;
				this.container.addChild(bg);

				this.txtName = new egret.TextField();
				this.txtName.type = egret.TextFieldType.INPUT;
				this.txtName.width = 400;
				this.txtName.maxChars = 20;
				this.txtName.x = 220;
				this.txtName.y = 508;
				this.txtName.text = RewardManager.instance.name+"";
				this.container.addChild(this.txtName);

				this.txtPhone = new egret.TextField();
				this.txtPhone.type = egret.TextFieldType.INPUT;
				this.txtPhone.width = 400;
				this.txtPhone.maxChars = 11;
				this.txtPhone.x = 220;
				this.txtPhone.y = 570;
				this.txtPhone.text = RewardManager.instance.phone+"";
				this.txtPhone.restrict = "0-9";
				this.container.addChild(this.txtPhone);

				this.txtAdress = new egret.TextField();
				this.txtAdress.type = egret.TextFieldType.INPUT;
				this.txtAdress.width = 260;
				this.txtAdress.height = 80;
				this.txtAdress.wordWrap = true;
				this.txtAdress.multiline = true;
				this.txtAdress.x = 220;
				this.txtAdress.y = 630;
				this.txtAdress.text = RewardManager.instance.adress+"";
				this.container.addChild(this.txtAdress);
			}else if(data.prizeid)
			{
				if(data.prizeid == 6)
				{
					//telephone:telep,address:address,name:name
					var bg = new CustomImage("resource/assets/async/submit_shiyou.png");
					bg.x = StageUtils.SW - 424 >> 1;
					bg.y = 450;
					this.container.addChild(bg);

					this.txtName = new egret.TextField();
					this.txtName.type = egret.TextFieldType.INPUT;
					this.txtName.width = 400;
					this.txtName.maxChars = 20;
					this.txtName.x = 220;
					this.txtName.y = 508;
					this.txtName.text = decodeURI(data.name)+"";
					this.container.addChild(this.txtName);

					this.txtPhone = new egret.TextField();
					this.txtPhone.type = egret.TextFieldType.INPUT;
					this.txtPhone.width = 400;
					this.txtPhone.maxChars = 11;
					this.txtPhone.x = 220;
					this.txtPhone.y = 580;
					this.txtPhone.text = decodeURI(data.telephone)+"";
					this.txtPhone.restrict = "0-9";
					this.container.addChild(this.txtPhone);

					this.txtAdress = new egret.TextField();
					this.txtAdress.type = egret.TextFieldType.INPUT;
					this.txtAdress.width = 260;
					this.txtAdress.height = 80;
					this.txtAdress.x = 220;
					this.txtAdress.y = 650;
					this.txtAdress.text = decodeURI(data.address)+"";
					this.container.addChild(this.txtAdress);

					this.txtSF = new egret.TextField();
					this.txtSF.type = egret.TextFieldType.INPUT;
					this.txtSF.width = 260;
					this.txtSF.height = 80;
					this.txtSF.x = 220;
					this.txtSF.y = 720;
					this.txtSF.text = decodeURI(data.province)+"";
					this.container.addChild(this.txtSF);

					

					this.btnSubmit.y = StageUtils.SH - this.btnSubmit.height - 26;
				}
				else
				{
					//实物
					var bg = new CustomImage("resource/assets/async/submit_shiwu.png");
					bg.x = StageUtils.SW - 404 >> 1;
					bg.y = 450;
					this.container.addChild(bg);

					this.txtName = new egret.TextField();
					this.txtName.type = egret.TextFieldType.INPUT;
					this.txtName.width = 400;
					this.txtName.maxChars = 20;
					this.txtName.x = 220;
					this.txtName.y = 508;
					this.txtName.text = RewardManager.instance.name+"";
					this.container.addChild(this.txtName);

					this.txtPhone = new egret.TextField();
					this.txtPhone.type = egret.TextFieldType.INPUT;
					this.txtPhone.width = 400;
					this.txtPhone.maxChars = 11;
					this.txtPhone.x = 220;
					this.txtPhone.y = 570;
					this.txtPhone.text = RewardManager.instance.phone+"";
					this.txtPhone.restrict = "0-9";
					this.container.addChild(this.txtPhone);

					this.txtAdress = new egret.TextField();
					this.txtAdress.type = egret.TextFieldType.INPUT;
					this.txtAdress.width = 260;
					this.txtAdress.height = 80;
					this.txtAdress.wordWrap = true;
					this.txtAdress.multiline = true;
					this.txtAdress.x = 220;
					this.txtAdress.y = 630;
					this.txtAdress.text = RewardManager.instance.adress+"";
					this.container.addChild(this.txtAdress);

					this.btnSubmit.y = StageUtils.SH - this.btnSubmit.height - 26;
				}
			}else
			{
				if(data.id == 7)
				{
					//流量
					var bg = new CustomImage("resource/assets/async/submit_liuliang.png");
					bg.x = StageUtils.SW - 439 >> 1;
					bg.y = 450;
					this.container.addChild(bg);

					this.txtPhone = new egret.TextField();
					this.txtPhone.type = egret.TextFieldType.INPUT;
					this.txtPhone.width = 400;
					this.txtPhone.maxChars = 11;
					this.txtPhone.x = 220;
					this.txtPhone.y = 686;
					this.txtPhone.text = RewardManager.instance.phone+"";
					this.txtPhone.restrict = "0-9";
					this.container.addChild(this.txtPhone);

				}else if(data.id == 8 || data.id == 9)
				{
					//红包
					var bg = new CustomImage("resource/assets/async/submit_hb"+data.id+".png");
					bg.x = StageUtils.SW - 422 >> 1;
					bg.y = 450;
					this.container.addChild(bg);
				}else if(data.id == 10)
				{
					//话费
					var bg = new CustomImage("resource/assets/async/submit_huafei.png");
					bg.x = StageUtils.SW - 439 >> 1;
					bg.y = 450;
					this.container.addChild(bg);

					this.txtPhone = new egret.TextField();
					this.txtPhone.type = egret.TextFieldType.INPUT;
					this.txtPhone.width = 400;
					this.txtPhone.maxChars = 11;
					this.txtPhone.x = 220;
					this.txtPhone.y = 686;
					this.txtPhone.text = RewardManager.instance.phone+"";
					this.txtPhone.restrict = "0-9";
					this.container.addChild(this.txtPhone);
				}else if(data.id == 6)
				{
					var bg = new CustomImage("resource/assets/async/submit_shiyou.png");
					bg.x = StageUtils.SW - 424 >> 1;
					bg.y = 450;
					this.container.addChild(bg);

					this.txtName = new egret.TextField();
					this.txtName.type = egret.TextFieldType.INPUT;
					this.txtName.width = 400;
					this.txtName.maxChars = 20;
					this.txtName.x = 220;
					this.txtName.y = 508;
					this.txtName.text = RewardManager.instance.name+"";
					this.container.addChild(this.txtName);

					this.txtPhone = new egret.TextField();
					this.txtPhone.type = egret.TextFieldType.INPUT;
					this.txtPhone.width = 400;
					this.txtPhone.maxChars = 11;
					this.txtPhone.x = 220;
					this.txtPhone.y = 580;
					this.txtPhone.text = RewardManager.instance.phone+"";
					this.txtPhone.restrict = "0-9";
					this.container.addChild(this.txtPhone);

					this.txtAdress = new egret.TextField();
					this.txtAdress.type = egret.TextFieldType.INPUT;
					this.txtAdress.width = 260;
					this.txtAdress.height = 80;
					this.txtAdress.x = 220;
					this.txtAdress.y = 655;
					this.txtAdress.text = "";
					this.container.addChild(this.txtAdress);

					this.txtSF = new egret.TextField();
					this.txtSF.type = egret.TextFieldType.INPUT;
					this.txtSF.width = 260;
					this.txtSF.height = 80;
					this.txtSF.x = 220;
					this.txtSF.y = 730;
					this.txtSF.text = "";
					this.container.addChild(this.txtSF);

					this.btnSubmit.y = StageUtils.SH - this.btnSubmit.height - 26;
				}
				else
				{
					//实物
					var bg = new CustomImage("resource/assets/async/submit_shiwu.png");
					bg.x = StageUtils.SW - 404 >> 1;
					bg.y = 450;
					this.container.addChild(bg);

					this.txtName = new egret.TextField();
					this.txtName.type = egret.TextFieldType.INPUT;
					this.txtName.width = 400;
					this.txtName.maxChars = 20;
					this.txtName.x = 220;
					this.txtName.y = 508;
					this.txtName.text = RewardManager.instance.name+"";
					this.container.addChild(this.txtName);

					this.txtPhone = new egret.TextField();
					this.txtPhone.type = egret.TextFieldType.INPUT;
					this.txtPhone.width = 400;
					this.txtPhone.maxChars = 11;
					this.txtPhone.x = 220;
					this.txtPhone.y = 570;
					this.txtPhone.text = RewardManager.instance.phone+"";
					this.txtPhone.restrict = "0-9";
					this.container.addChild(this.txtPhone);

					this.txtAdress = new egret.TextField();
					this.txtAdress.type = egret.TextFieldType.INPUT;
					this.txtAdress.width = 260;
					this.txtAdress.height = 80;
					this.txtAdress.wordWrap = true;
					this.txtAdress.multiline = true;
					this.txtAdress.x = 220;
					this.txtAdress.y = 630;
					this.txtAdress.text = RewardManager.instance.adress+"";
					this.container.addChild(this.txtAdress);

					this.btnSubmit.y = StageUtils.SH - this.btnSubmit.height - 26;
				}
			}
		}
	}
}