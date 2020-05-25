class SlotView extends eui.Component
{
    private scroller_view: eui.Scroller;
    private list_view: eui.List;

    private imgEUIArr: eui.ArrayCollection;
    private imgArr: Array<any>;

    private item_width: number = 126;
    private item_height: number = 94;
    private item_gap: number = 0;

    private stopId: number = -1;

    public constructor()
    {
        super();
        this.skinName = "resource/common/skins/slot_view.exml";

        this.imgArr = [
            {
                img: "5_png",
                id: 5
            },
            {
                img: "4_png",
                id: 4
            }, {
                img: "3_png",
                id: 3
            }, {
                img: "2_png",
                id: 2
            }, {
                img: "1_png",
                id: 1
            }]
    }
    protected createChildren()
    {

        this.scroller_view.scrollPolicyH = eui.ScrollPolicy.OFF;
        this.scroller_view.scrollPolicyV = eui.ScrollPolicy.ON;
        this.scroller_view.touchEnabled = false;
        this.scroller_view.touchChildren = false;

        let img_layout: eui.VerticalLayout = new eui.VerticalLayout();
        img_layout.gap = this.item_gap;
        this.list_view.layout = img_layout;

        this.imgEUIArr = new eui.ArrayCollection(this.imgArr);
        this.list_view.dataProvider = this.imgEUIArr;
        this.list_view.itemRenderer = SlotItem;

        this.scroller_view.visible = false;
    }

    initData()
    {
        let end = this.imgArr[this.imgArr.length - 1];
        this.imgArr.splice(0, 0, end);

        this.imgEUIArr = new eui.ArrayCollection(this.imgArr);
        this.list_view.dataProvider = this.imgEUIArr;

        this.scroller_view.height = this.imgArr.length * this.item_height;

        setTimeout(() =>
        {
            this.scroller_view.viewport = this.list_view;
            this.scroller_view.validateNow();
            this.scroller_view.viewport.scrollV = this.scroller_view.viewport.contentHeight - this.scroller_view.viewport.height - 20;

            this.scroller_view.visible = true

        }, 60);

    }


    public start()
    {
        this.scroll_anim();
    }


    public stop(id): void
    {
        this.stopId = id;
    }

    private scroll_anim()
    {

        egret.Tween.removeTweens(this.scroller_view.viewport);
        egret.Tween.get(this.scroller_view.viewport).to({ scrollV: -this.item_height - 20 }, 40).call(() =>
        {

            if (this.stopId > 0 && this.imgArr[this.imgArr.length - 3].id == this.stopId)
            {
                this.stopId = -1;
                return;
            }

            this.imgArr.splice(this.imgArr.length - 1, 1);

            let end = this.imgArr[this.imgArr.length - 1];
            this.imgArr.splice(0, 0, end);

            console.log(this.imgArr);

            this.imgEUIArr.replaceAll(this.imgArr);
            this.list_view.dataProvider = this.imgEUIArr;

            this.scroller_view.viewport = this.list_view;
            this.scroller_view.validateNow();
            this.scroller_view.viewport.scrollV = this.scroller_view.viewport.contentHeight - this.scroller_view.viewport.height - 20;
            this.scroll_anim();
        });
    }


    public destroy()
    {

    }


}

class SlotItem extends eui.ItemRenderer
{

    private img: eui.Image;

    public constructor()
    {
        super();

        this.skinName = `<?xml version="1.0" encoding="utf-8"?>
<e:Skin xmlns:e="http://ns.egret.com/eui" xmlns:w="http://ns.egret.com/wing" width="126" height="94">
</e:Skin>`;
        this.img = new eui.Image();
        this.img.width = 126;
        this.img.height = 94;
        this.verticalCenter = 0;
        this.horizontalCenter = 0;
        this.addChild(this.img);
    }

    protected dataChanged()
    {
        this.img.source = this.data.img;
    }

}