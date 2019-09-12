class UIManager extends egret.DisplayObjectContainer 
{
	public static _instance:UIManager;

	public static get instance():UIManager
	{
		if(!UIManager._instance)
		{
			UIManager._instance = new UIManager();
		}
		return UIManager._instance;
	}

	public mainUILayer:egret.DisplayObjectContainer;

	public popLayer:egret.DisplayObjectContainer;

	public topLayer:egret.DisplayObjectContainer;

	public constructor()
	{
		super();
		this.initLayer();
	}

	private initLayer():void
	{
		this.mainUILayer = new egret.DisplayObjectContainer();
		this.addChild(this.mainUILayer);

		this.popLayer = new egret.DisplayObjectContainer();
		this.addChild(this.popLayer);

		this.topLayer = new egret.DisplayObjectContainer();
		this.addChild(this.topLayer);
	}

	private gameView:GameView;

	private rewardView:RewardListView;

	private shareRewardView:ShareRewardView;

	public initGameView():void
	{
		if(this.shareRewardView && this.shareRewardView.parent)
		{
			this.mainUILayer.removeChild(this.shareRewardView);
			this.shareRewardView = null;
		}
		if(this.rewardView && this.rewardView.parent)
		{
			this.mainUILayer.removeChild(this.rewardView);
			this.rewardView = null;
		}
		if(this.gameView && this.gameView.parent)
		{
			this.mainUILayer.removeChild(this.gameView);
			this.gameView = null;
		}
		this.gameView = new GameView();
		this.mainUILayer.addChild(this.gameView);
	}

	public initRewardView():void
	{
		if(this.shareRewardView && this.shareRewardView.parent)
		{
			this.mainUILayer.removeChild(this.shareRewardView);
			this.shareRewardView = null;
		}
		if(this.gameView && this.gameView.parent)
		{
			this.mainUILayer.removeChild(this.gameView);
			this.gameView = null;
		}
		if(this.rewardView && this.rewardView.parent)
		{
			this.mainUILayer.removeChild(this.rewardView);
			this.rewardView = null;
		}
		this.rewardView = new RewardListView();
		this.mainUILayer.addChild(this.rewardView);
	}

	public initShareRewardView():void
	{
		if(this.rewardView && this.rewardView.parent)
		{
			this.mainUILayer.removeChild(this.rewardView);
			this.rewardView = null;
		}
		if(this.gameView && this.gameView.parent)
		{
			this.mainUILayer.removeChild(this.gameView);
			this.gameView = null;
		}
		if(this.shareRewardView && this.shareRewardView.parent)
		{
			this.mainUILayer.removeChild(this.shareRewardView);
			this.shareRewardView = null;
		}
		this.shareRewardView = new ShareRewardView();
		this.mainUILayer.addChild(this.shareRewardView);
	}

	public updateWord(id,offset):void
	{
		this.gameView.updateWord(id,offset);
	}
}