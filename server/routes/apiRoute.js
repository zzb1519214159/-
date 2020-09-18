 const express = require("express");//路由
const moment = require("moment");//导入moment 生成日期
const md5 = require("md5");//导入md5插件 将密码加密
const db = require("./../lib/DBhelper");//导入数据库连接
const jwt = require("jsonwebtoken"); // 
const secret = require("./../config").secret;
const fs = require("fs");

let apiRouter = express.Router();

// apiRouter.all("*",function (request,response,next) {

// })

apiRouter.all("/test",function (request,response,next) {
response.end("欧克");
})

//注册接口
apiRouter.post("/register", async (request, response, next) => {
    let udate = moment().format("YYYY-MM-DD HH:mm:ss");//获取当前日期
    let {
        uname,
        upwd,
        usex,
        uphone,
        uemail
    } = request.body;
    //针对于密码 特殊处理 进行md5加密,md5的2次..3次..4次..
    upwd = md5(upwd);

    //准sql语句
    let sql = "INSERT INTO `userinfo` (`uName`,`uPwd`,uSex,`uPhone`,`uEmail`,`uData`) VALUES(?,?,?,?,?,?);"
    //params代表sql内的站位元素 +85    
    let params = [uname, upwd, usex, uphone, uemail, udate];

    let result = await db.execAsync(sql, params);//异步执行sql语句
    //affectedRows如果为1就说明执行成功
    if (result && result.affectedRows >= 1) {
        response.json({
            msg: "注册成功",
            status: 1
        })
    } else {
        response.json({
            msg: "注册失败",
            status: -1
        })
    }
})



//登录接口
// 用户名和密码匹配上,就把 当前的登录人的信息发送到前端
// 并且 加入到jwt  json web token  令牌
// session+cookie  不能跨域
apiRouter.post("/login", async (request, response, next) => {
    let {
        uname,
        upwd
    } = request.body;
    //把密码加密
    upwd = md5(upwd);

    let sql = "SELECT `uId`,`uName`,`uPhone`,`uEmail`,`uSex`,`uType`,`uData` FROM `userinfo` WHERE ";
    sql += "uStatus=1 AND uName=? AND uPwd=? ;"

    let parmas = [uname, upwd];
    let result = await db.execAsync(sql, parmas);
 
    if (result && result.length >= 1) {

        var token = jwt.sign(JSON.parse(JSON.stringify(result[0])), secret, {
            expiresIn: 60 * 60 * 24 //一天有效
        })
        response.json({
            msg: "登陆成功",
            status: 1,
            data: result[0],
            token //发送到前端
        })
    } else {
        response.json({
            msg: "登陆失败",
            status: -1
        })
    }
});

apiRouter.get("/puctrone", function (request, response, next) {
    response.json({
        msg: "查询成功",
        status: 1,
        data: JSON.parse(fs.readFileSync("./data/goodslist.json").toString())
    })
})
apiRouter.get("/index", function (request, response, next) {
    response.json({
        msg: "查询成功",
        status: 1,
        data: JSON.parse(fs.readFileSync("./data/goodslist.json").toString())
    })
})
//jsonp
apiRouter.get("/commodity", function (request, response, next) {
    let gid = request.query.gid;
    let callback = request.query.cb1;
    var data =JSON.parse(fs.readFileSync("./data/goodslist.json").toString());
    var result = [...data].filter(function (el) {
        return el.id == gid
    })
    response.type("text/javascript");
    response.send(";" + callback + "(" + JSON.stringify(result[0]) + ");")
})


// apiRouter.get("/getinfo", function (request, response, next) {
//     let gid = request.query.gid;
//     var data = JSON.parse(fs.readFileSync("./data/goodslist.json").toString());
//     var result = [...data].filter(function (el) {
//         return el.id == gid
//     })

//     response.json(result[0]);
// })

//加入购车

apiRouter.post("/cart", async function (request, response, next) {

    // id: "1"
    // name: "手机"
    // price: 998
    // img: "./images/1.jpg"
    // num: "1"
    // uid: 19

    var {
        id: gid,
        name,
        price,
        img,
        num,
        uid
    } = request.body;
    //1.先查询数据库释放存在,
    let querySql = 'SELECT*FROM `carts` WHERE uid=? AND gid=? and gStatus=1;';
    let queryPrams = [uid, gid]

    let queryResult = await db.execAsync(querySql, queryPrams);
    if (queryResult && queryResult.length >= 1) {
        //如果存在就只做数量和总金额的修改
        let updateSql = "UPDATE carts SET gNumer=gNumer+?,gTotal=gNumer*gPrice WHERE `gId`=? AND `uId`=? and gStatus=1 ;";
        let updatePrams = [num, gid, uid];
        let udapteResult = await db.execAsync(updateSql, updatePrams);

        if (udapteResult && udapteResult.affectedRows >= 1) {
            response.json({
                msg: "加入购车成功u",
                status: 1
            })
        } else {
            response.json({
                msg: "加入购车失败u",
                status: -1
            })
        }
    } else {
        //否则数据库没有,就做插入
        let insertSql = 'INSERT INTO `carts` (`gId`,`uId`,`gName`,`gPrice`,`gNumer`,`gImg`,gTotal,gtime)';
        insertSql += 'VALUES(?,?,?,?,?,?,?,?);';
        //购买时间
        let gtime = moment().format('YYYY-MM-DD HH:mm:ss');
        let insertPrams = [gid, uid, name, price, num, img, price * num, gtime];
        console.log(insertPrams)
        let insertReuslt = await db.execAsync(insertSql, insertPrams);
        if (insertReuslt && insertReuslt.affectedRows >= 1) {
            response.json({
                msg: "加入购车成功i",
                status: 1
            })
        } else {
            response.json({
                msg: "加入购车失败i",
                status: -1
            })
        }

    }



})


//显示购物车
apiRouter.post("/getCart", async (request, response, next) => {
    //谁看谁的购物车

    let {
        uid
    } = request.body;

    let sql = "SELECT*FROM carts WHERE uid=? and gStatus=1;";
    let parmas = [uid];
    var result = await db.execAsync(sql, parmas);

    if (result && result.length >= 1) {
        response.json({
            msg: "查询成功",
            status: 1,
            data: result
        })

    } else {
        response.json({
            msg: "查询失败",
            status: 0
        })
    }
})

//修改数量
apiRouter.post("/changeCartNum", async (request, response, next) => {
    let {
        cid,
        gnumer
    } = request.body;
    let sql = 'UPDATE carts SET gNumer=?,gTotal=gNumer*gPrice WHERE cid=? and gStatus=1';
    let params = [gnumer, cid];
    let result = await db.execAsync(sql, params);

    if (result && result.affectedRows >= 1) {
        response.json({
            msg: "修改成功",
            status: 1
        })
    } else {
        response.json({
            msg: "修改失败",
            status: -1
        })
    }
})
//删除 ,不能进行物理,软删除,修改状态
apiRouter.post("/delete", async (request, response, next) => {
    let {
        cid
    } = request.body;
    let sql = 'UPDATE carts SET gStatus=0 WHERE cid=? ;';
    let params = [cid];
    let result = await db.execAsync(sql, params);

    if (result && result.affectedRows >= 1) {
        response.json({
            msg: "删除成功",
            status: 1
        })
    } else {
        response.json({
            msg: "删除失败",
            status: -1
        })
    }
})







//只有保安大爷
module.exports = apiRouter;