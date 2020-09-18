const mysql = require("mysql");
let db = mysql.createConnection(require("./../../config/index").config)

module.exports = class DBHelper {
    //打开链接
    static async open() {
        db.connect(function (err) {
            if (err) {
                console.log("连接失败:" + err.message);
            }
        });
    }
    //非异步
    static async exec(sql, params, callback) {
        DBHelper.open();
        db.query(sql, params, function (err, result) {
            callback(err, result)
            DBHelper.close();
        });

    }

    //异步
    static async execAsync(sql, params) {
        return new Promise(function (resolve, reject) {
                // DBHelper.open();
                db.query(sql, params, function (err, result) {//执行sql语句
                    if (err) {//判断是否连接成功
                        reject(err.message);
                    }
                    resolve(result);
                })
            }).catch(function (err) {
                Promise.reject(err);
            })
            .finally(function (err) {//不管成功还是失败,都执行
                DBHelper.close();
            });
    }
    //关闭链接
    static async close() {
        db.resume(); //释放
    }
}