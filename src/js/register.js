$(function () {

    $.idcode.setCode(); //加载生成验证码方法

    //自定义规则
    //addMethod("规则名称",回调函数,"message");
    $.validator.addMethod("checkPhone", function (val, ele, params) {
        //value 输入的值
        //ele 那个元素
        return /^[1][3-9]\d{9}$/.test($(ele).val())
        // console.log(arguments);
    }, "手机号不合法");

    //添加邮箱规则
    $.validator.addMethod("checkEmail", function (val, ele, params) {
        //value 输入的值
        //ele 那个元素
        return /^\w+(\.\w+)*@\w+(\.\w+)*\.\w+$/.test($(ele).val())
        // console.log(arguments);
    }, "邮箱号不合法");

    //添加用户名校验规则
    $.validator.addMethod("checkUser", function (val, ele, params) {
        //value 输入的值
        //ele 那个元素
        return /^[A-Za-z]\w{5,17}$/.test($(ele).val())
        // console.log(arguments);
    }, "用户名不合法");

    $("form").validate({
        //规则
        rules: {
            uname: {
                required: true,
                rangelength: [6, 18],
                checkUser: true,
              
            },
            upwd: {
                required: true,
                rangelength: [6, 18]
            },
            upwd2: {
                equalTo: "#upwd"
            },
            uphone: {
                checkPhone: true, //开启
            },
            uemail: {
                checkEmail: true
            },
            code:{
                required: true,
            }
        },
        //消息提示
        messages: {
            uname: {
                required: "用户名必填哦~亲",
                rangelength: "用户名必须是{0}-{1}之间",
                remote: "该用户名已注册!"
            },
            upwd: {
                required: "密码必填~亲",
                rangelength: "密码必须是{0}-{1}之间"
            },
            upwd2: {
                equalTo: "2次密码不一致哦"
            },
            uphone: {
                checkPhone: "亲,手机号不对哦~"
            }
        },
        errorPlacement: function (error, element) {
            error.appendTo(element.parent());

        },
        errorElement: "span",
        //提交 等价于 onsubmit
        submitHandler(from) {

            var dataStr = $(from).serialize();
            

            var IsBy = $.idcode.validateCode()
            if (!IsBy) {
                layer.msg('验证码错误,请重新输入');
                return false;
            }

            axios.defaults.baseUrl = "localhost";

                var data = $(from).serialize();
                axios({
                    url: "/api/register",
                    method: "post",
                    data: data
                }).then(function (res) {
                 
                    if (res.data.status) {
                        localStorage.setItem("token", res.data.token);
                        localStorage.setItem("user", JSON.stringify(res.data.data));
                    }
                    if(res.data.status == 1){
                        console.log("注册成功")
                        layer.open({
                            type: 1,
                            title: false,
                            closeBtn: 0,
                            area: ['auto'],
                            skin: 'layui-layer-nobg', //没有背景色
                            shadeClose: true,
                            content: $('#tong')
                          });
                    }else{
                        layer.msg('注册失败,请重新输入');
                    }
                })

                return false;
       
        }
    })


})