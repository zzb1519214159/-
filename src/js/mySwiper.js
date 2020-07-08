const SwiperCon = (function () {
    return {
        ele: null, //我们的div
        maxImgCount: 0,//box下li的长度初始变量
        palyIndex: 0,//ul下li的下标初始变量
        nextOl: null,//ol初始变量
        timer: 0,//计时器变量
        init(opt) {
            //接口,奖励可以自己配置opt 控制你的初始值
            Object.assign(this, opt);//获取box合并对象
            this.ele = document.querySelector(this.el);//el的值为#box,上面合并对象获取到的
            this.maxImgCount = this.ele.children[0].children.length//获取box下li的长度
            this.nextOl = this.ele.children[1];//获取box下子元素ol
            this.buent = this.ele.children[2];
            // 定时器里this 永远 window,就需要使用 bind改变this
            // this.timer = setInterval(this.autoPlay.bind(this), 1500)
            this.start();//执行计数器方法,循环轮播图
            this.selectClick();//ol下li点击事件方法
            this.buentClick();
            this.ele.addEventListener('mouseenter', this.pause.bind(this));//鼠标移入,轮播图停止循环
            this.ele.addEventListener('mouseleave', this.start.bind(this));//鼠标移出,轮播图继续循环
            return this;
        },
        autoPlay() {

     
            this.palyIndex++;
            //播放的下标,不能超过,现有的图片的张数
            if (this.palyIndex >= this.maxImgCount) {
                //回到第0张
                this.palyIndex = 0;
            }

            // 循环li,添加动画
            for (var i = 0; i < this.maxImgCount; i++) {
				//排异方法,将所有的li隐藏透明
                animate(this.ele.children[0].children[i], {
                    opacity: 0,
                })
				//排异方法,将所有的ol下li隐藏半透明
                animate(this.nextOl.children[i], {
                    opacity: 0.5,
                    backgroundColor:'#fff'
                })
   
            }
			//当前下标的图片显示 下标(palyIndex)
            animate(this.ele.children[0].children[this.palyIndex], {
                opacity: 1
            })
			//当前下标的图片显示 下标(palyIndex)
            animate(this.nextOl.children[this.palyIndex], {
                opacity: 1,
                backgroundColor:'#f5004b'
            })
        },
        //暂停清空计数器
        pause() {
            clearInterval(this.timer);
        },
        //开始播放
        start() {
            this.timer = setInterval(this.autoPlay.bind(this), 5000)
        },
        //选中的点击
        selectClick() {
            for (var i = 0; i < this.nextOl.children.length; i++) {
                this.nextOl.children[i].tempIndex = i;
                //DOM2 事件 不会被覆盖
                this.nextOl.children[i].addEventListener("click", (evt) => {
                    var e = evt || window.event;
                    var ele = (e.target || e.srcElement);
                    if (ele.nodeName != 'LI') {
                        return;
                    }
					//图片下标从1开始,所以需要-1
                    this.palyIndex = ele.tempIndex - 1;
                    this.autoPlay();
                })
            }
        },
        buentClick(){
            for (var i = 0; i < this.buent.children.length; i++) {
                //DOM2 事件 不会被覆盖
                this.buent.children[i].tempIndex = i;
                this.buent.children[i].addEventListener("click", (evt) => {
                    var e = evt || window.event;
                    var ele = (e.target || e.srcElement);
                    if (ele.nodeName != 'I') {
                        return;
                    } 
                   
                    if(ele.tempIndex ==0){
                        this.palyIndex = ele.tempIndex -1;
                       if(this.palyIndex == 0){
                        this.palyIndex = this.buent.children.length-1
                        console.log(this.palyIndex)
                       }
                    }
                    if(ele.tempIndex ==1){
                        this.palyIndex = ele.tempIndex +1;
                        if(this.palyIndex == this.buent.children.length-1){
                            this.palyIndex ==0 
                            console.log(this.palyIndex)
                      }
                    }
                    
                   
                   
                    this.autoPlay();
                })
            }
        }
    }
})();