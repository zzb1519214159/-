function getStyle(oEle, attr) {
    if (window.getComputedStyle) {
        return window.getComputedStyle(oEle, null)[attr];
    }
    return oEle.currentStyle[attr];
}


function animate(oEle, json, callback) {
    //清楚上一次的定时器
    clearInterval(oEle.timer);
    //开启新的定时器
    oEle.timer = setInterval(function () {
        var flag = true;
        for (var attr in json) {
            var current = 0;
            //当前的值
            var target = 0;
            //目标的值
            //当attr元素等于透明属性时,透明属性值为0-1的小数,需要放大100倍
            if (attr == "opacity") {
                current = parseFloat(getStyle(oEle, attr)) * 100;
                target = parseFloat(json[attr]) * 100;
            } else {
                current = parseFloat(getStyle(oEle, attr));
                target = parseFloat(json[attr]);
            }
            

            //步长
             var step = (target - current) / 10; //有除法就会有小数点
            //处理小数点
            step = step > 0 ? Math.ceil(step) : Math.floor(step);
            //核心公式,新的位置=当前位置+步长
            if (attr == "opacity") {
                //google
                oEle.style.opacity = (current + step) / 100;
                //ie 8 透明度兼容写法
                oEle.style.filter = 'alpha(opacity=' + (current + step) + ')';
            } else if (attr == 'zIndex') {
                //zIndex 不参与动画,直接给到目标值即可
                oEle.style.zIndex = target;
            }else if(attr == 'backgroundColor'){
              
                oEle.style.backgroundColor = json.backgroundColor;
            } else {
                oEle.style[attr] = current + step + "px";
            }
            //如果某一个属性没有完成,就不能清空定时器
            if (current != target) {
                flag = false;
            }
        }
        if (flag) {
            clearInterval(oEle.timer);
            //看一下是否有第三个参数,并且是一个函数,就执行该函数
            if (typeof (callback) == "function") {
                callback();
            }
        }
    }, 10)
}