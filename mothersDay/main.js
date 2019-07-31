
// import { ListView } from 'phaser-list-view'

/**
 * 图片资源初始化
 */
//背景
const bgList = { name: 'bg', url: './images/BG/BG-', length: 9 };
const bgIconsList = { name: 'bgIcons', url: './images/BG-icons/BG-icons-', length: 9 };
//帽子
const capList = { name: 'cap', url: './images/CAP/cap-', length: 7 };
const capIconsList = { name: 'capIcons', url: './images/CAP-icons/cap-icons-', length: 7 };

//眼镜
const glassesList = { name: 'glasses', url: './images/GLASSES/glasses-', length: 7 };
const glassesIconsList = { name: 'glassesIcons', url: './images/GLASSES-icons/glasses-icons-', length: 7 };

//装饰品
const goodsList = { name: 'goods', url: './images/GOODS/goods-', length: 12 };
const goodsIconsList = { name: 'goodsIcons', url: './images/GOODS-icons/goods-icons-', length: 12 };

//头发
const hairList = { name: 'hair', url: './images/HAIR/hair-', length: 18 };
const hairIconsList = { name: 'hairIcons', url: './images/HAIR-icons/hair-icons-', length: 18 };

//上衣
const topsList = { name: 'tops', url: './images/TOPS/tops-', length: 21 };
const topsIconsList = { name: 'topsIcons', url: './images/TOPS-icons/tops-icons-', length: 21 };

//裤子
const pantsList = { name: 'pants', url: './images/PANTS/pants-', length: 21 };
const pantsIconsList = { name: 'pantsIcons', url: './images/PANTS-icons/pants-icons-', length: 21 };

//按钮
const btnArray = [//active为是否点击激活状态，select为是否是选择项的按钮，x为偏移的位置
    { name: 'btnScale', url: './images/BUTTON/btn-scale.png' },
    { name: 'btnDelete', url: './images/BUTTON/btn-delete.png' },
    { name: 'btnCamera', url: './images/BUTTON/btn-camera.png', top: true, index: 0 },
    { name: 'btnMum', url: './images/BUTTON/btn-mum.png', select: true, x: -20 },
    { name: 'btnChild', url: './images/BUTTON/btn-child.png', select: true, x: -120 },
    { name: 'btnGoods', url: './images/BUTTON/btn-goods.png', select: true, x: -220 },
    { name: 'btnbg', url: './images/BUTTON/btn-bg.png', select: true, x: -320 },
    { name: 'btnHideSelect', url: './images/BUTTON/btn-hide.png', select: true, right: true, x: -20 },
    { name: 'btnMumActive', url: './images/BUTTON/btn-mum-active.png', select: true, active: true, index: 1, x: -20 },
    { name: 'btnChildActive', url: './images/BUTTON/btn-child-active.png', select: true, active: false, index: 2, x: -120 },
    { name: 'btnGoodsActive', url: './images/BUTTON/btn-goods-active.png', select: true, active: false, index: 3, x: -220 },
    { name: 'btnbgActive', url: './images/BUTTON/btn-bg-active.png', select: true, active: false, index: 4, x: -320 },
    { name: 'btnHideSelectActive', url: './images/BUTTON/btn-hide-active.png', select: true, active: false, right: true, index: 5, x: -20 },
];

//其他
const loading = './images/PRELOAD/preloader.png';
const loadingWhite = './images/PRELOAD/preloader-white.png';
const imgStart = './images/PRELOAD/img-start.png';
const btnStart = './images/PRELOAD/btn-start.png';
const person = './images/OTHER/empty-person.png';
const goods = './images/OTHER/empty-goods.png';
const result = './images/OTHER/result-content.png';


/**
 * 配置文件
 */
let config = {
    maxWidth: 414,
    minWidth: 320,
    maxHeight: 812,
    minHeight: 480,
    bgColor: '#F76C65'
}


/**
 * 工具函数
 */
//设置canvas的style为屏幕1倍像素
let windowWidth = window.innerWidth; //用于存储 超过414px宽度的设备宽度
let width = document.documentElement.clientWidth || document.body.clientWidth;
let height = document.documentElement.clientHeight || document.body.clientHeight;

if (width > 414) {
    width = 414
}
if (height > 812) {
    height = 812
}

//px比例转换
const pxRadio = width / 375;
console.log('pxRadio', pxRadio);
function rfuc (n) {
    return n * pxRadio;
}

const gameWrap = document.getElementById('game')
gameWrap.style.width = width + 'px'
gameWrap.style.height = height + 'px'
gameWrap.style.left = '0'
gameWrap.style.marginLeft = (windowWidth / 2) - (width / 2) + 'px'


function setCanvasStyle () {
    let canvas = document.getElementsByTagName('canvas')[0]
    canvas.style.width = width + 'px'
    canvas.style.height = height + 'px'
    // canvas.style.position = 'absolute'
    // canvas.style.top = '0'
    // canvas.style.left = '0'

    canvas.style.zIndex = 9
    gameWrap.appendChild(canvas)
    console.log('~~！！~~canvas:', canvas, width, height)
}

/**
 * 创建游戏实例
 */
let game = new Phaser.Game(width * 2, height * 2, Phaser.CANVAS, '#game');

//允许捕获数据流，以便存储图片
game.preserveDrawingBuffer = true

// 定义场景
let states = {
    //预加载场景
    boot () {
        this.preload = function () {
            game.load.image('loading', loading); //加载进度条图片资源
            game.load.image('loadingWhite', loadingWhite); //加载进度条图片资源
            game.load.image('imgStart', imgStart); //加载进度条图片资源
        };
        this.create = function () {
            game.state.start('preload'); //加载完成后，调用preload场景
        };
    },
    // 加载场景
    preload () {
        this.preload = function () {
            // 缩放控制: Phaser.ScaleManager
            // 三种模式: EXACT_FIT 缩放到父元素的大小,SHOW_ALL, USER_SCALE自定义缩放,RESIZE,NO_SCALE
            game.scale.scaleMode = Phaser.ScaleManager.EXACT_FIT;
            game.scale.setMinMax(config.minWidth, config.minHeight, config.maxWidth, config.maxHeight)
            // game.scale.forceOrientation(false, true);
            setCanvasStyle()

            // 设置背景
            game.stage.backgroundColor = config.bgColor;
            // 解决图片资源跨域问题
            game.load.crossOrigin = 'anonymous';
            // 加载游戏资源
            function loadImg (list) {
                for (let index = 1; index <= list.length; index++) {
                    if (index < 10) {
                        index = '0' + index;
                    }
                    game.load.image(list.name + index, list.url + index + '.png');
                }
            }
            loadImg(bgList); //背景资源
            loadImg(bgIconsList); //背景资源Icons
            loadImg(goodsList); //装饰资源
            loadImg(goodsIconsList); //装饰资源Icons
            loadImg(capList); //帽子资源
            loadImg(capIconsList); //帽子资源Icons
            loadImg(glassesList); //眼镜资源
            loadImg(glassesIconsList); //眼镜资源Icons
            loadImg(hairList); //头发资源
            loadImg(hairIconsList); //头发资源Icons
            loadImg(topsList); //上衣资源
            loadImg(topsIconsList); //上衣资源Icons
            loadImg(pantsList); //裤子资源
            loadImg(pantsIconsList); //裤子资源Icons

            //按钮资源
            function loadBtn (array) {
                for (const iterator of array) {
                    game.load.image(iterator.name, iterator.url);
                }
            }
            loadBtn(btnArray)

            //其他资源
            game.load.image('person', person);
            game.load.image('goods', goods);
            game.load.image('result', result);
            game.load.image('btnStart', btnStart);


            let preload = game.add.sprite(0, 0, 'loading');
            let preloadWhite = game.add.sprite(0, 0, 'loadingWhite');
            let bgPreload = game.add.sprite(0, 0, 'imgStart');
            bgPreload.width = rfuc(bgPreload.width)
            bgPreload.height = rfuc(bgPreload.height)
            bgPreload.x = game.world.centerX - bgPreload.width / 2
            bgPreload.y = game.world.centerY - bgPreload.height / 2 - rfuc(100)

            preloadWhite.addChild(preload)
            preloadWhite.alignTo(bgPreload, Phaser.BOTTOM_CENTER, 0, rfuc(80))

            //动态显示进度条
            game.load.setPreloadSprite(preload);

            //监听加载完毕事件
            game.load.onLoadComplete.add(onLoad);
            // 加载完毕回调方法
            function onLoad () {
                //绘制开始按钮
                preloadWhite.alpha = 0
                let btnStart = game.add.button(game.world.centerX, game.world.centerY + rfuc(300), 'btnStart', startGame);
                btnStart.alignTo(preloadWhite, Phaser.BOTTOM_CENTER)
            }

            //开始游戏
            function startGame () {
                game.state.start('main');
            }
        }
    },
    // 游戏场景
    main () {
        this.create = function () {

            // 添加背景
            game.stage.backgroundColor = config.bgColor;
            let mainBgGroup = game.add.group();
            mainBgGroup.width = rfuc(750);
            mainBgGroup.height = rfuc(1334);
            let childBg = '';
            function hideBtn (sprite, pointer, hideAll) {
                mother.parent.getChildAt(5).visible = false
                child.parent.getChildAt(5).visible = false
                let array = allMoveElementGroup.children
                for (const iterator of array) {
                    if (iterator.name === 'goods') {
                        iterator.children[0].children[0].visible = false
                    }
                }
                if (hideAll) {
                    game.add.tween(selectContainer).to({ alpha: 0 }, 300, Phaser.Easing.Linear.None, true);
                    game.add.tween(selectContainer).to({ y: 1000 }, 100, Phaser.Easing.Linear.None, true);
                }
            }

            function setBg (part, index) {
                if (childBg) {
                    mainBgGroup.removeChildAt(0)
                }
                let bg = part + index
                childBg = game.add.sprite(0, 0, bg);
                childBg.width = rfuc(750);
                childBg.height = rfuc(1334);
                childBg.inputEnabled = true;
                childBg.events.onInputDown.add(hideBtn, this)
                mainBgGroup.addChildAt(childBg, 0);
            }
            setBg('bg', '01');


            //建立放所有课移动拖拽的元素组，以便切换显示层级
            let allMoveElementGroup = game.add.group()

            //饰品类
            class goods {
                constructor(props) {
                    this.config = {
                        name: 'goods',
                        tagName: 'goods01',
                        position: {
                            x: game.world.centerX,
                            y: game.world.centerY,
                        },
                        maxScale: 3,
                        minScale: 0.5,
                        originalScale: 1,
                    }
                    this.config = Object.assign(this.config, props)
                    this.varyingScale = this.config.originalScale
                    this.tageName = this.config.tagName
                    this.isMove = false
                    this.moveX = 0
                    this.moveY = 0
                }
                createMain () {
                    this.goodsGroup = game.add.group();
                    this.goodsGroup.name = this.config.name;
                    this.parent = game.add.sprite(0, 0, 'goods');
                    this.parent.anchor.set(0.5);
                    this.parent.scale.set(this.config.originalScale);
                    this.parent.position.set(this.config.position.x, this.config.position.y);
                    this.parent.setScaleMinMax(this.config.minScale, this.config.maxScale);
                    this.parent.inputEnabled = true;
                    this.parent.input.enableDrag(false, true);
                    //绘制装饰品
                    this.goods = game.make.sprite(0, 0, this.tageName);
                    this.goods.anchor.set(0.5);
                    //存放按钮组
                    this.btnGroup = game.add.group()
                    //绘制缩放按钮
                    this.btnScale = game.make.sprite(this.goods.width / 2 - rfuc(10), -this.goods.height / 2, 'btnScale');
                    this.btnScale.data.name = this.config.name;
                    this.btnScale.setScaleMinMax(1, 1);
                    this.btnScale.inputEnabled = true;
                    //绘制删除按钮
                    this.btnDelete = game.make.sprite(-this.goods.width / 2, this.goods.height / 2 - rfuc(20), 'btnDelete');
                    this.btnDelete.data.name = this.config.name;
                    this.btnDelete.setScaleMinMax(1, 1);
                    this.btnDelete.inputEnabled = true;
                    //事件绑定
                    this.btnScale.events.onInputDown.add(this.onDown, this);
                    this.btnScale.events.onInputUp.add(this.onUp, this);
                    game.input.addMoveCallback(this.onMove, this);
                    this.btnDelete.events.onInputDown.add(this.deleteItem, this);
                    this.parent.events.onInputDown.add(this.showBtn, this);
                    //将按钮加入父级中
                    this.btnGroup.addChild(this.btnScale)
                    this.btnGroup.addChild(this.btnDelete)
                    this.parent.addChild(this.btnGroup)
                    this.parent.addChild(this.goods)
                    this.goodsGroup.addChildAt(this.parent, 0)
                    allMoveElementGroup.addChild(this.goodsGroup)
                }
                deleteItem (sprite) {
                    this.parent.kill()
                }
                showBtn (sprite) {
                    this.btnGroup.visible = true
                    allMoveElementGroup.bringToTop(this.goodsGroup)
                }
                //按钮点击按下事件
                onDown () {
                    this.isMove = true
                    this.moveStartX = 0
                    this.moveStartY = 0
                }
                //鼠标或触摸移动事件
                onMove (pointer) {
                    if (this.isMove) {
                        this.moveX = pointer.clientX;
                        this.moveY = pointer.clientY;
                        this.varyingScale = parseFloat(this.varyingScale);
                        const addScale = (this.moveX > this.moveStartX || this.moveY < this.moveStartY) && this.varyingScale < this.config.maxScale;
                        const minusScale = (this.moveX < this.moveStartX || this.moveY > this.moveStartY) && this.varyingScale > this.config.minScale;
                        if (addScale) {
                            this.varyingScale += 0.03;
                        } else if (minusScale) {
                            this.varyingScale -= 0.03;
                        }
                        this.parent.scale.set(this.varyingScale)
                        this.moveStartX = this.moveX
                        this.moveStartY = this.moveY
                    }
                }
                //按钮点击松开事件
                onUp () {
                    this.isMove = false
                }
                init () {
                    this.createMain()
                }
            }


            //人物模型
            class person {
                constructor(props) {
                    this.config = {
                        name: 'person',
                        body: {
                            curPants: 'pants01',
                            curTops: 'tops01',
                            curHair: 'hair01',
                            curGlasses: 'glasses01',
                            curCap: 'cap01',
                        },
                        position: {
                            x: game.world.centerX - rfuc(100),
                            y: game.world.centerY,
                        },
                        maxScale: 2.5,
                        minScale: 0.3,
                        originalScale: 0.8,
                    }
                    this.config = Object.assign(this.config, props)
                    this.varyingScale = this.config.originalScale
                    this.isMove = false
                    this.moveX = 0
                    this.moveY = 0
                }
                //创建人物主体
                createMain () {
                    /**
                    * 建立人物组，来方便显示层级的控制,建立组的顺序就是显示层级顺序，
                    * 或者通过 game.world.bringToTop(group);
                    * 或者 不建立组 使用 sprite.input.priorityID = 0、1、2...;来控制优先级
                    */
                    this.personGroup = game.add.group();
                    this.personGroup.name = this.config.name;
                    this.parent = game.add.sprite(0, 0, 'person');
                    this.parent.anchor.set(0.5);
                    this.parent.scale.set(this.config.originalScale);
                    this.parent.position.set(this.config.position.x, this.config.position.y);
                    this.parent.setScaleMinMax(this.config.minScale, this.config.maxScale);
                    this.parent.inputEnabled = true;
                    this.parent.input.enableDrag(false, true);
                    //绘制缩放按钮
                    this.btnScale = game.make.sprite(120, -450, 'btnScale');
                    this.btnScale.data.name = this.config.name;
                    this.btnScale.setScaleMinMax(1, 1);
                    this.btnScale.inputEnabled = true;
                    //事件绑定
                    this.btnScale.events.onInputDown.add(this.onDown, this);
                    this.btnScale.events.onInputUp.add(this.onUp, this);
                    game.input.addMoveCallback(this.onMove, this);
                    this.parent.events.onInputDown.add(this.showBtn, this);
                    //将按钮加入形象中
                    this.parent.addChild(this.btnScale)
                    this.personGroup.addChildAt(this.parent, 0)
                    this.createPart()
                    allMoveElementGroup.addChild(this.personGroup)
                }
                showBtn (sprite) {
                    this.parent.getChildAt(5).visible = true
                    allMoveElementGroup.bringToTop(this.personGroup)
                }
                //创建身上衣物
                createPart () {
                    let bodyArray = Object.values(this.config.body)
                    bodyArray.forEach((element, index) => {
                        this.addPart(this.parent, element, index)
                    })
                }
                //添加衣物
                addPart (parent, spriteName, index) {
                    let spirte = game.make.sprite(0, 0, spriteName)
                    spirte.anchor.set(0.5)
                    parent.addChildAt(spirte, index);
                }
                //按钮点击按下事件
                onDown () {
                    this.isMove = true
                    this.moveStartX = 0
                    this.moveStartY = 0
                }
                //鼠标或触摸移动事件
                onMove (pointer) {
                    if (this.isMove) {
                        this.moveX = pointer.clientX;
                        this.moveY = pointer.clientY;
                        this.varyingScale = parseFloat(this.varyingScale);
                        const addScale = (this.moveX > this.moveStartX || this.moveY < this.moveStartY) && this.varyingScale < this.config.maxScale;
                        const minusScale = (this.moveX < this.moveStartX || this.moveY > this.moveStartY) && this.varyingScale > this.config.minScale;
                        if (addScale) {
                            this.varyingScale += 0.03;
                        } else if (minusScale) {
                            this.varyingScale -= 0.03;
                        }
                        this.parent.scale.set(this.varyingScale)
                        this.moveStartX = this.moveX
                        this.moveStartY = this.moveY
                    }
                }
                //按钮点击松开事件
                onUp () {
                    this.isMove = false
                }
                //换装
                changeClothes (part, newClothes) {
                    let setInfo = (index) => {
                        this.parent.removeChildAt(index);
                        let newPart = game.make.sprite(0, 0, newClothes);
                        newPart.anchor.set(0.5);
                        this.parent.addChildAt(newPart, index);
                    }
                    switch (part) {
                        case 'cap':
                            setInfo(4)
                            this.config.body.curCap = newClothes
                            break;
                        case 'glasses':
                            setInfo(3)
                            this.config.body.curGlasses = newClothes
                            break;
                        case 'hair':
                            setInfo(2)
                            this.config.body.curHair = newClothes
                            break;
                        case 'tops':
                            setInfo(1)
                            this.config.body.curTops = newClothes
                            break;
                        case 'pants':
                            setInfo(0)
                            this.config.body.curPants = newClothes
                            break;
                    }
                }
                init () {
                    this.createMain()
                }

            }

            //绘制母亲 
            let mother = new person({
                name: 'mother',
                body: {
                    curPants: 'pants01',
                    curTops: 'tops01',
                    curHair: 'hair01',
                    curGlasses: '',
                    curCap: '',
                },
                position: {
                    x: game.world.centerX - rfuc(80),
                    y: game.world.centerY + rfuc(30)
                },
                originalScale: 0.9
            });
            mother.init();

            //绘制孩子
            let child = new person(
                {
                    name: 'child',
                    body: {
                        curPants: 'pants15',
                        curTops: 'tops08',
                        curHair: 'hair05',
                        curGlasses: 'glasses02',
                        curCap: 'cap03',
                    },
                    position: {
                        x: game.world.centerX + rfuc(150),
                        y: game.world.centerY + rfuc(70)
                    }
                }
            );
            child.init();


            //建立选项组，来方便显示层级的控制
            let selectContainer = game.add.group()
            //选项组置于最顶层
            game.world.bringToTop(selectContainer)
            let boxHight = rfuc(560)
            let selectBox = game.add.graphics(0, game.world.height - boxHight)
            selectBox.beginFill(0xF3F3F3);
            selectBox.drawRect(0, 0, game.world.width, boxHight);
            selectBox.endFill();
            selectContainer.addChildAt(selectBox, 0)

            //侧边栏选项组
            let selectLeftMotherGroup = game.add.group();
            let selectLeftChildGroup = game.add.group();
            let selectLeftBar = game.add.graphics(0, 0)
            selectLeftBar.beginFill(0xFAFAFA);
            selectLeftBar.drawRect(0, 0, rfuc(110), rfuc(600));
            selectLeftBar.endFill();
            selectLeftBar.alignIn(selectBox, Phaser.TOP_LEFT)

            selectContainer.addChildAt(selectLeftBar, 1)

            let motherTextArray = [
                { name: '发型', part: 'hair', active: true, type: 'mum' },
                { name: '上衣', part: 'tops', active: false, type: 'mum' },
                { name: '裤子', part: 'pants', active: false, type: 'mum' },
                { name: '眼镜', part: 'glasses', active: false, type: 'mum' },
                { name: '帽子', part: 'cap', active: false, type: 'mum' }
            ]
            let childTextArray = [
                { name: '发型', part: 'hair', active: true, type: 'child' },
                { name: '上衣', part: 'tops', active: false, type: 'child' },
                { name: '裤子', part: 'pants', active: false, type: 'child' },
                { name: '眼镜', part: 'glasses', active: false, type: 'child' },
                { name: '帽子', part: 'cap', active: false, type: 'child' }
            ]

            //按钮数组化，以便于遍历，赋值active
            let selectLeftMotherBtnArray = []
            let selectLeftChildBtnArray = []
            let selectLeftBtn = {}
            function addSelectLeftBtn (group, textArray, btnArray) {
                for (let index = 1; index <= textArray.length; index++) {
                    const item = textArray[index - 1];
                    selectLeftBtn[item.name] = game.make.text(0, 0, item.name, { font: "28px Arial", fill: '#D4D4D4' });
                    if (item.active) {
                        selectLeftBtn[item.name].fill = '#FF232D';
                    }
                    selectLeftBtn[item.name].data.name = item.part
                    selectLeftBtn[item.name].data.active = item.active
                    selectLeftBtn[item.name].data.type = item.type
                    selectLeftBtn[item.name].data.index = index

                    let rectangle = new Phaser.Rectangle(rfuc(10), rfuc(80) * index, rfuc(60), rfuc(80))
                    selectLeftBtn[item.name].alignIn(rectangle, Phaser.CENTER);
                    selectLeftBtn[item.name].inputEnabled = true;
                    selectLeftBtn[item.name].events.onInputDown.add(onClickSelectLeftBtn, this);
                    group.addChild(selectLeftBtn[item.name])
                }
                group.alignIn(selectLeftBar, Phaser.TOP_CENTER, 0, rfuc(-140))
                if (btnArray === 'mum') {
                    selectLeftMotherBtnArray = Object.values(selectLeftBtn)
                } else {
                    selectLeftChildBtnArray = Object.values(selectLeftBtn)
                }
                game.world.bringToTop(group);
            }
            addSelectLeftBtn(selectLeftMotherGroup, motherTextArray, 'mum')
            addSelectLeftBtn(selectLeftChildGroup, childTextArray, 'child')

            selectLeftChildGroup.visible = false

            selectContainer.addChildAt(selectLeftChildGroup, 2)
            selectContainer.addChildAt(selectLeftMotherGroup, 2)


            //顶栏选项组
            let selectTopGroup = game.add.group();
            let selectTopBar = game.add.graphics(0, 0)
            let topBarHeight = rfuc(120)
            selectTopBar.beginFill(0xFFFFFF);
            selectTopBar.drawRect(0, 0, game.world.width, topBarHeight);
            selectTopBar.endFill();
            selectTopBar.alignIn(selectBox, Phaser.TOP_LEFT)

            selectContainer.addChildAt(selectTopBar, 3)


            let selectTopBtn = {}
            function addSelectTopBtn (group) {
                for (const item of btnArray) {
                    if (item.select) {
                        selectTopBtn[item.name] = game.add.sprite(0, 0, item.name);
                        selectTopBtn[item.name].width = rfuc(80)
                        selectTopBtn[item.name].height = rfuc(80)
                        selectTopBtn[item.name].data.index = item.index || 0
                        if (item.active === true) {
                            selectTopBtn[item.name].alpha = 1
                            selectTopBtn[item.name].data.active = true
                        } else if (item.active === false) {
                            selectTopBtn[item.name].alpha = 0
                            selectTopBtn[item.name].data.active = false
                        }
                        selectTopBtn[item.name].alignIn(selectBox, Phaser.TOP_LEFT, item.x, rfuc(-20))
                        selectTopBtn[item.name].inputEnabled = true;

                        if (item.right) {
                            selectTopBtn[item.name].data.name = item.name
                            selectTopBtn[item.name].alignIn(selectBox, Phaser.TOP_RIGHT, item.x, rfuc(-20))
                            selectTopBtn[item.name].events.onInputDown.add(onClickHideSelectTopBar, this);
                        } else {
                            selectTopBtn[item.name].events.onInputDown.add(onClickSelectTopBtn, this);
                        }
                        group.addChild(selectTopBtn[item.name]);

                    } else if (item.top) {
                        //相机拍照按钮
                        selectTopBtn[item.name] = game.add.sprite(0, 0, item.name);
                        selectTopBtn[item.name].width = rfuc(94)
                        selectTopBtn[item.name].height = rfuc(94)
                        selectTopBtn[item.name].data.index = item.index
                        selectTopBtn[item.name].alignTo(selectBox, Phaser.TOP_RIGHT, rfuc(-20), rfuc(20))
                        selectTopBtn[item.name].inputEnabled = true;
                        selectTopBtn[item.name].events.onInputDown.add(onClickTakePhoto, this);
                        group.addChildAt(selectTopBtn[item.name], 0);
                    }
                }
                game.world.bringToTop(group);
            }
            addSelectTopBtn(selectTopGroup)
            selectContainer.addChildAt(selectTopGroup, 4)
            //按钮数组化，以便于遍历，赋值active
            let selectTopBtnArray = Object.values(selectTopBtn)

            //滚动选择
            // const parent = game.world
            // const bounds = new Phaser.Rectangle(selectBox.x + rfuc(110), selectBox.y + rfuc(100), selectBox.width - rfuc(110), selectBox.height - rfuc(100))
            // const options = {
            //     direction: 'y',
            //     overflow: 100,
            //     padding: 10
            // }

            // const listView = new ListView(game, parent, bounds, options)
            // const items = motherClothesGroup // [Graphics, Image, Sprite, Group]
            // listView.addMultiple(...items)
            // const newItem = this.createGroup();
            // newItem.nominalHeight = 120;
            // listView.add(newItem)

            // var maskW = selectBox.width;
            // var maskH = 200;
            // var boxW = maskW;
            // var boxH = 50;
            // for (var i = 0; i < 500; i++) {
            //     let color = Phaser.Color.getRandomColor();
            //     let group = this.game.make.group(null);
            //     let g = this.game.add.graphics(0, 0, group);
            //     let h = boxH + Math.floor(Math.random() * 100);
            //     g.beginFill(color).drawRect(0, 0, boxW, h);

            //     let txt = this.game.add.text(
            //         boxW / 2,
            //         h / 2,
            //         i,
            //         { font: '40px Arial', fill: '#000' },
            //         group
            //     );
            //     txt.anchor.set(0.5);
            //     let img = this.game.add.image(0, 0, group.generateTexture());
            //     listView.add(img);
            // }


            //母亲服饰组
            let motherClothesGroup = game.add.group();
            let mcIconsSpriteArray = [
                { part: 'hair', width: 90, height: 90, length: 12, type: 'mum', active: true },
                { part: 'tops', width: 90, height: 90, length: 15, type: 'mum', active: false },
                { part: 'pants', width: 90, height: 90, length: 15, type: 'mum', active: false },
                { part: 'glasses', width: 90, height: 90, length: 7, type: 'mum', active: false },
                { part: 'cap', width: 90, height: 90, length: 7, type: 'mum', active: false }
            ]

            //孩子服饰组
            let childClothesGroup = game.add.group();
            let ccIconsSpriteArray = [
                { part: 'hair', width: 90, height: 90, length: 18, type: 'child', active: true },
                { part: 'tops', width: 90, height: 90, length: 21, type: 'child', active: false },
                { part: 'pants', width: 90, height: 90, length: 21, type: 'child', active: false },
                { part: 'glasses', width: 90, height: 90, length: 7, type: 'child', active: false },
                { part: 'cap', width: 90, height: 90, length: 7, type: 'child', active: false }
            ]
            //装饰品组
            let goodsGroup = game.add.group();
            let gcIconsSpriteArray = [
                { part: 'goods', width: 106, height: 106, length: 12, type: 'goods', active: true }
            ]
            //背景组
            let bgGroup = game.add.group();
            let bgIconsSpriteArray = [
                { part: 'bg', width: 106, height: 106, length: 9, type: 'bg', active: true }
            ]

            //创建选项icons
            var createSelectIconsGrop = (group, array, hide, fullScreen) => {
                for (const item of array) {
                    if (item.length) {
                        let scale = 0.5
                        let partGroup = game.add.group()
                        partGroup.name = item.part
                        for (let index = 1; index <= item.length; index++) {
                            if (index < 10) {
                                index = '0' + index;
                            }
                            let sprite = game.add.sprite(0, 0, item.part + 'Icons' + index)
                            // sprite.scale.set(scale)
                            sprite.data.part = item.part
                            sprite.data.type = item.type
                            sprite.data.width = rfuc(item.width)
                            sprite.data.height = rfuc(item.height)
                            sprite.data.index = index
                            sprite.inputEnabled = true;//没有这句，无法调用group事件绑定，inputEnableChildren貌似无效
                            partGroup.addChild(sprite)
                            // listView.add(sprite)
                            // listView.scroller.events.onInputDown.add(onClickSelectDown, this)
                        }

                        let gridWidth = rfuc(item.width)
                        let gridHeight = rfuc(item.height)
                        if (fullScreen) {
                            gridWidth += 30
                            gridHeight += 30
                            partGroup.align(5, -1, gridWidth, gridHeight);
                        } else {
                            gridWidth += 15
                            gridHeight += 15
                            partGroup.align(6, -1, gridWidth, gridHeight);
                        }

                        // partGroup.inputEnableChildren = true;
                        partGroup.onChildInputDown.add(onClickSelectDown, this);

                        if (!item.active) {
                            partGroup.visible = false
                        }
                        group.addChild(partGroup)
                    }
                }
                if (fullScreen) {
                    group.alignIn(selectBox, Phaser.LEFT, rfuc(10), rfuc(-130));
                } else {
                    group.alignIn(selectBox, Phaser.LEFT, rfuc(50), rfuc(-130));
                }

                if (hide) {
                    group.visible = false
                }
            }
            createSelectIconsGrop(motherClothesGroup, mcIconsSpriteArray, false)
            createSelectIconsGrop(childClothesGroup, ccIconsSpriteArray, true)
            createSelectIconsGrop(goodsGroup, gcIconsSpriteArray, true, true)
            createSelectIconsGrop(bgGroup, bgIconsSpriteArray, true, true)


            //添加装饰品
            function addGoods (part, name) {
                let newGoods = new goods({ tagName: name })
                newGoods.init()
            }

            //选择服饰
            function onClickSelectDown (sprite) {
                const index = sprite.data.index
                const type = sprite.data.type
                const part = sprite.data.part
                let name = part + sprite.data.index

                if ((part === 'cap' || part === 'glasser') && index === '01') {
                    name = ''
                }
                switch (type) {
                    case 'mum':
                        mother.changeClothes(part, name)
                        break;
                    case 'child':
                        child.changeClothes(part, name)
                        break;
                    case 'goods':
                        addGoods(part, name)
                        break;
                    case 'bg':
                        setBg(part, index)
                        break;
                }
            }

            function changePartIconsContent (type, name) {
                function setVisible (group) {
                    group.setAllChildren('visible', false);
                    let child = group.getByName(name);
                    child.visible = true;
                    child.setAllChildren('visible', true)
                }
                if (type === 'mum') {
                    setVisible(motherClothesGroup);
                } else if (type === 'child') {
                    setVisible(childClothesGroup);
                }
            }

            function onClickSelectLeftBtn (text) {
                const name = text.data.name
                const active = text.data.active
                const type = text.data.type
                function setActive () {
                    let btnLeftArray = [];
                    if (!active) {

                        if (type === 'mum') {
                            btnLeftArray = selectLeftMotherBtnArray
                        } else {
                            btnLeftArray = selectLeftChildBtnArray
                        }

                        for (const element of btnLeftArray) {
                            if (element.data.active) {
                                element.data.active = false
                                element.fill = '#D4D4D4';
                            }
                        }
                        text.data.active = true
                        text.fill = '#FF232D';
                        //切换显示内容
                        changePartIconsContent(type, name)
                    }

                }
                switch (name) {
                    case 'hair':
                        setActive(name)
                        break;
                    case 'tops':
                        setActive(name)
                        break;
                    case 'pants':
                        setActive(name)
                        break;
                    case 'glasses':
                        setActive(name)
                        break;
                    case 'cap':
                        setActive(name)
                        break;
                }
            }

            let selectOptsDown = false
            function onClickHideSelectTopBar (sprite) {
                let childArray = selectTopGroup.children
                let btnDown = ''
                let btnUp = ''
                for (const iterator of childArray) {
                    if (iterator.key === 'btnHideSelect') {
                        btnDown = iterator
                    } else if (iterator.key === 'btnHideSelectActive') {
                        btnUp = iterator
                    }
                }

                let down = boxHight - topBarHeight;
                if (!selectOptsDown) {
                    selectOptsDown = true
                    btnDown.alpha = 0
                    btnUp.alpha = 1
                    game.add.tween(selectContainer).to({ y: down }, 300, Phaser.Easing.Linear.None, true);
                } else {
                    selectOptsDown = false
                    btnDown.alpha = 1
                    btnUp.alpha = 0
                    down = 0;
                    game.add.tween(selectContainer).to({ y: down }, 300, Phaser.Easing.Linear.None, true);
                }
            }


            //整体分组，便于显示隐藏
            let mumGroup = game.add.group()
            mumGroup.addChildAt(motherClothesGroup, 0)
            mumGroup.addChildAt(selectLeftMotherGroup, 1)

            let childGroup = game.add.group()
            childGroup.addChildAt(childClothesGroup, 0)
            childGroup.addChildAt(selectLeftChildGroup, 1)

            //添加进组
            selectContainer.addChildAt(mumGroup, 4)
            selectContainer.addChildAt(childGroup, 5)
            selectContainer.addChildAt(goodsGroup, 6)
            selectContainer.addChildAt(bgGroup, 7)


            function onClickSelectTopBtn (sprite) {
                const index = sprite.data.index
                const active = sprite.data.active
                function setAllVisible (index, a, b, c, d) {
                    mumGroup.setAll('visible', a);
                    childGroup.setAll('visible', b);
                    goodsGroup.visible = c;
                    bgGroup.visible = d;

                    if (index === 3 || index === 4) {
                        selectLeftBar.visible = false
                    } else {
                        selectLeftBar.visible = true
                    }
                }
                function setActive (index) {
                    if (!active) {
                        for (const element of selectTopBtnArray) {
                            if (element.data.active) {
                                element.data.active = false
                                element.alpha = 0
                            }
                        }
                        sprite.data.active = true
                        sprite.alpha = 1
                        //切换显示内容
                        switch (index) {
                            case 1:
                                setAllVisible(index, true, false, false, false)
                                break;
                            case 2:
                                setAllVisible(index, false, true, false, false)
                                break;
                            case 3:
                                setAllVisible(index, false, false, true, false)
                                break;
                            case 4:
                                setAllVisible(index, false, false, false, true)
                                break;
                        }
                        if (selectOptsDown) {
                            onClickHideSelectTopBar()
                        }
                    }
                }
                switch (index) {
                    case 1:
                        setActive(index)
                        break;
                    case 2:
                        setActive(index)
                        break;
                    case 3:
                        setActive(index)
                        break;
                    case 4:
                        setActive(index)
                        break;
                    case 5:
                        setActive(index)
                        break;
                }

            }


            //拍照保存
            function onClickTakePhoto (sprite, pointer) {
                hideBtn(sprite, pointer, true)
                drawResult()
            }

            //绘制结果展示  
            let resultGroup = game.add.group()

            function drawResult () {

                function drawLine (width, height, x = 0, y = 0) {
                    let graphics = game.add.graphics(0, 0)
                    graphics.beginFill(0xFFFFFF);
                    graphics.drawRect(x, y, width, height);
                    graphics.endFill();
                    return graphics
                }
                let screen = drawLine(game.world.width, game.world.height)
                // 拍照闪光动画
                game.add.tween(screen).to({ alpha: 0 }, 300, Phaser.Easing.Linear.None, true);

                // let lineWidth = rfuc(20)

                // let topLine = drawLine(game.world.width, lineWidth)
                // let leftLine = drawLine(lineWidth, game.world.height)
                // let rightLine = drawLine(lineWidth, game.world.height, game.world.width - lineWidth)


                let result = game.add.sprite(0, 0, 'result')
                result.width = game.world.width
                result.height = rfuc(result.height)

                result.alignIn(screen, Phaser.BOTTOM_LEFT)

                // resultGroup.addChildAt(leftLine, 0)
                // resultGroup.addChildAt(rightLine, 1)
                // resultGroup.addChildAt(topLine, 2)
                resultGroup.addChildAt(result, 0)
                resultGroup.addChildAt(screen, 1)
                resultGroup.inputEnableChildren = false
                //禁止所有输入事件
                game.input.destroy()

                //文字提示toast
                let toast = document.getElementById("toast")
                toast.style.display = 'block';
                toast.style.width = width + 'px';
                toast.style.position = 'absolute'
                toast.style.bottom = 0
                toast.style.left = 0
                toast.style.marginLeft = (windowWidth / 2) - (width / 2) + 'px'
                toast.innerHTML = '长按保存到相册'
                toast.setAttribute('class', 'toast hideToast')

                function loadImg (params) {

                    // 创建图片，以便微信可以长按保存
                    let img = document.createElement("img")
                    let imgUrl = game.canvas.toDataURL();
                    gameWrap.appendChild(img)
                    img.setAttribute('src', imgUrl);
                    window.open(game.canvas.toDataURL());
                    img.onload = function () {
                        // 确保要保存的图片都加载完成再执行canvas.toDataURL('image/png') 
                        img.style.position = 'absolute'
                        img.style.top = 0
                        img.style.left = 0
                        img.style.width = width + 'px';
                        img.style.height = height + 'px';
                        img.style.marginLeft = (windowWidth / 2) - (width / 2) + 'px'
                        img.style.zIndex = 999;
                        let a = document.createElement("a");
                        a.href = img.src
                        a.download = 'Mothers Day';
                        a.click();
                    }
                }
                setTimeout(() => {
                    loadImg()
                }, 1200)
            }

            game.world.bringToTop(resultGroup)

        }
        this.update = function () { }
        this.render = function () { }
    }
};

// 添加场景到游戏示例中
Object.keys(states).map(function (key) {
    game.state.add(key, states[key]);
});

// 启动游戏
game.state.start('boot');
