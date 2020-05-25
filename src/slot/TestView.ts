class TestView extends eui.Component
{
    textField: egret.TextField;
    result: eui.Label;

    btn: eui.Image;

    private slotView01: SlotView;
    private slotView02: SlotView;
    private slotView03: SlotView;

    constructor()
    {
        super();

        let bg: eui.Image = new eui.Image();
        bg.width = 640;
        bg.height = 1136;
        bg.verticalCenter = 0;
        bg.horizontalCenter = 0;
        this.addChild(bg);
        bg.source = "bg_png";

        this.btn = new eui.Image();
        this.btn.width = 246;
        this.btn.height = 153;
        this.btn.bottom = 140;
        this.btn.horizontalCenter = 0;
        this.addChild(this.btn);
        this.btn.source = "button_png";

        this.slotView01 = new SlotView();
        this.addChild(this.slotView01);
        this.slotView01.width = 128;
        this.slotView01.height = 260;
        this.slotView01.verticalCenter = -33;
        this.slotView01.horizontalCenter = -150;

        this.slotView02 = new SlotView();
        this.addChild(this.slotView02);
        this.slotView02.width = 128;
        this.slotView02.height = 260;
        this.slotView02.verticalCenter = -33;
        this.slotView02.horizontalCenter = 5;

        this.slotView03 = new SlotView();
        this.addChild(this.slotView03);
        this.slotView03.width = 128;
        this.slotView03.height = 260;
        this.slotView03.verticalCenter = -33;
        this.slotView03.horizontalCenter = 160;

        this.slotView01.initData();
        this.slotView02.initData();
        this.slotView03.initData();

        this.result = new eui.Label();
        this.addChild(this.result);
        this.result.size = 22;
        this.result.textAlign = "center";
        this.result.verticalAlign = egret.VerticalAlign.MIDDLE;
        this.result.top = 50;
        this.result.horizontalCenter = 0;
        this.result.width = 400;
        this.result.height = 200;
        this.result.textColor = 0xFFFFFF;
        this.result.text = "最后结束的位置：";
        this.result.background = true;
        this.result.backgroundColor = 0x73b7c4;

        this.btn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.btn_click, this);

    }

    //====== 初始化 ======//

    /**
     * 只晚于构造函数，甚至初始化的参数都还未传递进来
     * 视图被添加到显示树上就会立即调用
     */
    public attached_to_display_tree(view_param: any): void
    {

    }

    /**
     * 正式初始化前，接到外部传递的初始化参数后
     */
    protected _view_before_init(): void
    {

    }

    /**
     * 正式进行初始化
     */
    protected _view_start_init(): void
    {

    }

    //====== 销毁 ======//

    /**
     * 当视图马上要从显示树上移除（但是还未发生）时，会调用这个方法
     * 这个方法在 _view_before_destroy 方法之前被调用
     */
    public detaching_from_display_tree(view_param: any = null): void
    {

    }
    /**
     * 模块退出，销毁自身用到的资源
     */
    protected _view_before_destroy(): void
    {

    }

    private btn_click()
    {
        this.slotView01.start();
        setTimeout(() =>
        {
            this.slotView02.start();
        }, 30);
        setTimeout(() =>
        {
            this.slotView03.start();
        }, 60);



        let randomNum = 0;
        setTimeout(() =>
        {
            randomNum = Math.ceil(Math.random() * 125);
            this.success(randomNum);
        }, 3000);
    }

    success(id)
    {
        let slot_json = RES.getRes("slot_json");
        let slot = slot_json[id];

        let str = "最后结束的位置：";
        str += slot.IconA;
        this.result.text = str;
        this.slotView01.stop(slot.IconA);

        setTimeout(() =>
        {
            str += ", " + slot.IconB;
            this.result.text = str;
            this.slotView02.stop(slot.IconB);
        }, 1000);

        setTimeout(() =>
        {
            str += ", " + slot.IconC;
            this.result.text = str;
            this.slotView03.stop(slot.IconC);
        }, 2000);

        setTimeout(() =>
        {
            str += "\n 奖励：" + this.getBonus(slot.IconA, slot.IconB, slot.IconC);
            this.result.text = str;
        }, 2000);


    }

    getBonus(iconA, iconB, iconC)
    {
        let bonus_json = RES.getRes("slot_reward_json");

        let arr: any = [];

        let oo: any = bonus_json;
        let keys: Array<string> = Object.keys(oo);

        for (let i: number = 0; i < keys.length; i++)
        {
            console.log(keys[i]);
            let oi: any = oo[keys[i]];

            let bb: Array<string> = Object.keys(oi);
            for (let j: number = 0; j < bb.length; j++)
            {
                let bi: any = oi[bb[j]];
                let tA = bi.IconA;
                let tB = bi.IconB;
                let tC = bi.IconC;

                let aFlag = false;
                let bFlag = false;
                let cFlag = false;

                if (tA == "*")
                {
                    aFlag = true;
                } else
                {
                    if (tA == iconA)
                    {
                        aFlag = true;
                    } else
                    {
                        continue;
                    }
                }

                if (tB == "*")
                {
                    bFlag = true;
                } else
                {
                    if (tB == iconB)
                    {
                        bFlag = true;
                    } else
                    {
                        continue;
                    }
                }

                if (tC == "*")
                {
                    cFlag = true;
                } else
                {
                    if (tC == iconC)
                    {
                        cFlag = true;
                    } else
                    {
                        continue;
                    }
                }

                if (aFlag && bFlag && cFlag)
                {
                    return bi.reward;
                }
            }
        }

        return "没有奖品";
    }
}