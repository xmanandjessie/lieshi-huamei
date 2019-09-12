class RewardManager 
{
	
	public static REWARD_LIST = [
		{id:1,reward:"苹果",need:[1,2,3,4],rt:1},
		{id:2,reward:"迪士尼",need:[5,6,7,8],rt:1},
		{id:3,reward:"游轮",need:[9,10,11,12],rt:1},
		{id:4,reward:"飞利浦",need:[13,14,15,16],rt:1},
		{id:5,reward:"拔丝蛋糕",need:[18],rt:1},
		
		{id:6,reward:"加油卡",need:[19,20,21],rt:0},

		{id:7,reward:"流量包",need:[22],rt:0},
		{id:8,reward:"100元",need:[23,24],rt:0},
		{id:9,reward:"5元",need:[25],rt:0},
		{id:10,reward:"50元",need:[17],rt:0},
		{id:11,reward:"爱奇艺",need:[26,27],rt:0}
	];

	public static WORDS = "恭喜發財萬事如意笑口常开身體健康寶樂手气旺吉富貴满团圆";

	public static WORDS1 = [
								[
									{id:1,name:"恭"},
									{id:2,name:"喜"},
									{id:3,name:"發"},
									{id:4,name:"財"}
								],
								[
									{id:5,name:"萬"},
									{id:6,name:"事"},
									{id:7,name:"如"},
									{id:8,name:"意"}
								],
								[
									{id:9,name:"笑"},
									{id:10,name:"口"},
									{id:11,name:"常"},
									{id:12,name:"开"}
								],
								[
									{id:13,name:"身"},
									{id:14,name:"體"},
									{id:15,name:"健"},
									{id:16,name:"康"}
								],
								[
									{id:26,name:"团"},
									{id:27,name:"圆"},
									{id:17,name:"寶"},
									{id:18,name:"樂"}
								],
								[
									{id:23,name:"富"},
									{id:24,name:"貴"},
									{id:22,name:"吉"},
									{id:25,name:"滿"}
								],
								[
									{id:19,name:"手"},
									{id:20,name:"气"},
									{id:21,name:"旺"}
								]
							];

	public wordList:any = [];
	public wordList1:any = [];
	public wordList2:any = [];

	public name:string = "";

	public phone:string = "";

	public adress:string = "";

	public canGetCard:boolean;

	public curWord:number;

	public constructor()
	{
		
	}

	public refreshData(data):void
	{
		this.wordList1 = data.more.wordlist;
		this.wordList2 = data.more.wordlist1;
		this.wordList = [];
		
		if(data.more.wordlist)
		{
			for(var str in data.more.wordlist)
			{
				if(!this.wordList[str])
				{
					this.wordList[str] = 0;
				}
				this.wordList[str] += data.more.wordlist[str];
			}
		}
		if(data.more.wordlist1)
		{
			for(var str in data.more.wordlist1)
			{
				if(!this.wordList[str])
				{
					this.wordList[str] = 0;
				}
				this.wordList[str] += data.more.wordlist1[str];
			}
		}
	}

	public initData(data):void
	{
		if(data.c2ashed == "")
		{
			this.canGetCard = true;
		}else
		{
			this.canGetCard = false;
		}
		if(data.more.exchange)
		{
			if(data.more.exchange.name)
			{
				this.name = decodeURI(data.more.exchange.name);
			}
			if(data.more.exchange.mobile)
			{
				this.phone = decodeURI(data.more.exchange.mobile);
			}
			if(data.more.exchange.address)
			{
				this.adress = decodeURI(data.more.exchange.address);
			}
		}
		this.refreshData(data);
	}

	public canShareByID(id):boolean
	{
		// return true;
		if(this.wordList1["column"+id] > 0 && this.wordList["column"+id] > 0)
		{
			return true;
		}
		return false;
	}

	public addWord(id):void
	{
		var num = this.wordList["column"+id];
		if(num)
		{
			this.wordList["column"+id] = num + 1;
		}else
		{
			this.wordList["column"+id] = 1;
		}
		num = this.wordList1["column"+id];
		if(num)
		{
			this.wordList1["column"+id] = num + 1;
		}else
		{
			this.wordList1["column"+id] = 1;
		}
	}

	public getNumByID(id):number
	{
		if(Main.isTest)
		{
			return 1;
			// return Math.random() * 2 >1 ? 0 : 1;
		}
		if(this.wordList)
		{
			var num = this.wordList["column"+id]; 
			if(num)
			{
				return num;
			}
		}
		return 0;
	}

	public getNeedStrByID(need):string
	{
		var str = "";
		if(need)
		{
			str = RewardManager.WORDS[need-1];
			// var len = need.length;
			// for(var i = 0;i<len;i++)
			// {
			// 	str += RewardManager.WORDS[need[i]-1];
			// }
		}
		return str;
	}

	public updateWordNum(id,offset):void
	{
		if(this.wordList1[id])
		{
			this.wordList1[id] --;
		}

		if(this.wordList[id])
		{
			this.wordList[id] --;
		}
		
		UIManager.instance.updateWord(id,offset);
	}

	public share(uustr,id):void
	{
		var str = this.getNeedStrByID(id);
		var weixin = eval("wx");
		var self = this;
		if(weixin && eval("$.wxIsReady"))
		{

			weixin.onMenuShareTimeline({
				title: "拜年集福华美年，您的好友分享了一个'"+str+"'字印花",
				link:"http://0k6.cn/h/gotoshare$uustr="+uustr+"&prizenum="+id+"&actiontype=get",
				imgUrl:"http://res.leasiondata.cn/lstatic/h/share/share.jpg",
				success: function () {
					self.shareOK(uustr,id);
				},
				cancel: function () {
					// 用户取消分享后执行的回调函数
				}
			});

			//好友
			weixin.onMenuShareAppMessage(
				{
					title:"拜年集福华美年，您的好友分享了一个'"+str+"'字印花",
					desc: "拜年集福华美年",
					link:"http://0k6.cn/h/gotoshare$uustr="+uustr+"&prizenum="+id+"&actiontype=get",
					imgUrl:"http://res.leasiondata.cn/lstatic/h/share/share.jpg",
					success: function ()
					{
						self.shareOK(uustr,id);
					},
					cancel: function () 
					{

					}
				}
			);
		}
	}

	public shareOK(uustr,id):void
	{
		var _this=this;
		$.ajax({
			url: Main.SHARE_API,
			data: { ticket: Main.user_ticket,actiontype:"confirm",uustr:uustr,word:id},
			success: function(data)
			{
				if(data.status == 0)
				{
					//成功
					PopManager.hidePop("SharePop");
					_this.updateWordNum(id,-1);
					_this.shareEnd();
				}
				else
				{
					if(data.message == "readticketfail")
					{
						PopManager.showPop("ErrorPop",ErrorCode.TICKET_TIME_OUT);
					}else
					{
						Global.showTips(data.message+"");
					}
				}
			},
			error: function() {
				Global.showTips("error");
			},timeout: 8000,
			dataType: "json",async: true,type: "POST",
			complete: function(XMLHttpRequest,status) {
				if(status == 'timeout') {
					Global.showTips("time out");
				}
			}
		});
	}

	public shareEnd():void
	{
		var weixin = eval("wx");
		if(weixin && eval("$.wxIsReady"))
		{
			weixin.onMenuShareTimeline({
				title: "拜年集福华美年，参与活动兑好礼",
				link:"http://res.leasiondata.cn/lstatic/h/share/tips.html",
				imgUrl:"http://res.leasiondata.cn/lstatic/h/share/share.jpg",
				success: function () {
					
				},
				cancel: function () {
					// 用户取消分享后执行的回调函数
				}
			});
			//好友
			weixin.onMenuShareAppMessage(
				{
					title:"拜年集福华美年，参与活动兑好礼",
					desc: "拜年集福华美年",
					link:"http://res.leasiondata.cn/lstatic/h/share/tips.html",
					imgUrl:"http://res.leasiondata.cn/lstatic/h/share/share.jpg",
					success: function ()
					{

					},
					cancel: function () 
					{

					}
				}
			);
		}
	}

	private static _instance:RewardManager;

	public static get instance():RewardManager
	{
		if(!RewardManager._instance)
		{
			RewardManager._instance = new RewardManager();
		}
		return RewardManager._instance;
	}
}