var express = require("express");
var router = express.Router();
var path = require("path"); //系统路径模块
var fs = require("fs");
var bodyParser = require("body-parser");
var urlencodedParser = bodyParser.urlencoded({ extended: false });

const crypto = require("crypto");
const cookieParser = require("cookie-parser");

var MongoClient = require("mongodb").MongoClient;
const { runInNewContext } = require("vm");
var url = "mongodb://zy:zy3280@localhost:27017/";


router.post("/find_control_logs", urlencodedParser, function (req, res) {
  //console.log("req: " + req.body.filecontrol_id+","+req.body.control_id+","+req.body.pwd);
  //res.send('post successfully!'+req.body);

  MongoClient.connect(url, function (err, db) {
    if (err) throw err;
    var dbo = db.db("api"); //数据库名字
    var whereStr = { sensor_id: req.body.sensor_id };
    dbo
      .collection("control_logs")
      .find(whereStr)
      .toArray(function (err, result) {
        // 返回集合中所有数据
        if (err) throw err;
        console.log(result);
        db.close();
        res.send(result);
      });
  });
});

router.post("/find_control_logs_All", urlencodedParser, function (req, res) {
  //console.log("req: " + req.body.filecontrol_id+","+req.body.control_id+","+req.body.pwd);
  //res.send('post successfully!'+req.body);

  MongoClient.connect(url, function (err, db) {
    if (err) throw err;
    var dbo = db.db("api"); //数据库名字
    dbo
      .collection("control_logs")
      .find({})
      .toArray(function (err, result) {
        // 返回集合中所有数据
        if (err) throw err;
        console.log(result);
        db.close();
        res.send(result);
      });
  });
});

router.post("/control", urlencodedParser, function (req, res) {
  console.log(
    "control_id: " +
      req.body.control_id +
      ",sensor_id:" +
      req.body.id +
      ",intensity" +
      req.body.intensity
  );
  //res.send('post successfully!'+req.body);

  MongoClient.connect(url, function (err, db) {
    //插入操作数据库

    if (err) throw err;
    var dbo = db.db("api"); // 数据库名

    //update control数据集
    var whereStr = {
      control_id: req.body.control_id,
      sensor_id: req.body.sensor_id,
    }; // 查询条件
    var updaapir = { $set: { intensity: req.body.intensity } };

    dbo
      .collection("control")
      .updateOne(whereStr, updaapir, function (err, res) {
        if (err) throw err;
        console.log("All更新成功");
        db.close();
      });

    //insert control_log数据集
    var query_control_logs = {
      control_id: req.body.control_id,
      sensor_id: req.body.sensor_id,
      intensity: req.body.intensity,
    };
    dbo
      .collection("control_logs")
      .insertOne(query_control_logs, function (err, result) {
        //插入操作记录数据库
        db.close;
        console.log("stage2_ok");
        res.send("All_stage_ok");
      });
  });
});

//////////////////////////////////////////////////////////////////////////////////////////////操作模块

//控制          /////////////////////////////////////////////////////////////////
/*          传入的json格式                                
            {
                操作名称   "control_id":
                传感器Id   "sensor_id":
            }
 */
router.get("/sensor/control", function (req, res) {
  var sensor__id = req.query["sensor_id"]; //var sensor__id = req.body.sensor_id;
  var temperature_intensity = 0;
  var humidity_intensity = 0;
  var light_intensity = 0;
  var ph_intensity = 0;
  var wind_intensity = 0;
  var baojing;

  var temperature = 0;
  var humidity = 0;
  var light = 0;
  var ph = 0;
  var wind = 0;

  for (var i = 0; i < 8; i++) {
    switch (i) {
      case 0:
        //温度
        MongoClient.connect(url, function (err, db) {
          var dbo = db.db("api");
          var whereStr = { sensor_id: sensor__id, control_id: "0" }; // 查询条件，不需要条件时 写{}即可
          dbo.collection("control").findOne(whereStr, function (err, result) {
            if (err) throw err;
            var later_intensity = result.intensity;
            temperature_intensity = parseInt(later_intensity);
            console.log(temperature_intensity);

            temperature = GetRandomNum(10, 40) + temperature_intensity;
            console.log("更改温度为" + temperature);

            whereStr = { sensor_id: sensor__id };
            var updaapir = { $set: { temperature: temperature } };

            dbo
              .collection("sensor")
              .updateOne(whereStr, updaapir, function (err, result) {
                if (err) throw err;
                console.log(
                  "更改sensor数据库: " + "temperature： " + temperature
                );

                //res.send("设备更新成功")

                console.log("end");

                db.close();
              });

            if (temperature > 38) {
              warnMsg1 = "温度过高";
              MongoClient.connect(url, function (err, db) {
                if (err) throw err;
                var dbo = db.db("api");

                var whereStr = {
                  id: sensor__id,
                  warnMsg: warnMsg1,
                  name: "temperature",
                  num: temperature,
                };

                dbo
                  .collection("warning")
                  .insertOne(whereStr, function (err, result) {
                    db.close();
                  });
              });
            } else if (temperature < 12) {
              warnMsg1 = "温度过低";
              MongoClient.connect(url, function (err, db) {
                if (err) throw err;
                var dbo = db.db("api");

                var whereStr = {
                  id: sensor__id,
                  warnMsg: warnMsg1,
                  name: "temperature",
                  num: temperature,
                };

                dbo
                  .collection("warning")
                  .insertOne(whereStr, function (err, result) {
                    db.close();
                  });
              });
            }
          });
        });
        break;
      case 1:
        //湿度
        MongoClient.connect(url, function (err, db) {
          var dbo = db.db("api");
          var whereStr = { sensor_id: sensor__id, control_id: "1" }; // 查询条件，不需要条件时 写{}即可
          dbo.collection("control").findOne(whereStr, function (err, result) {
            if (err) throw err;
            var later_intensity = result.intensity;
            humidity_intensity = parseInt(later_intensity);
            console.log(humidity_intensity);
            var x = GetRandomNum(0, 100);

            humidity = x + humidity_intensity;
            console.log("更改humidity为" + humidity);

            whereStr = { sensor_id: sensor__id };
            var updaapir = { $set: { humidity: humidity } };

            dbo
              .collection("sensor")
              .updateOne(whereStr, updaapir, function (err, result) {
                if (err) throw err;
                console.log("更改sensor数据库: " + "humidity： " + humidity);

                //res.send("设备更新成功")

                console.log("end");

                db.close();
              });

            if (humidity > 70) {
              warnMsg1 = "湿度过高";
              MongoClient.connect(url, function (err, db) {
                if (err) throw err;
                var dbo = db.db("api");

                var whereStr = {
                  id: sensor__id,
                  warnMsg: warnMsg1,
                  name: "humidity",
                  num: humidity,
                };

                dbo
                  .collection("warning")
                  .insertOne(whereStr, function (err, result) {
                    db.close();
                  });
              });
            } else if (humidity < 30) {
              warnMsg1 = "湿度过低";
              MongoClient.connect(url, function (err, db) {
                if (err) throw err;
                var dbo = db.db("api");

                var whereStr = {
                  id: sensor__id,
                  warnMsg: warnMsg1,
                  name: "humidity",
                  num: humidity,
                };

                dbo
                  .collection("warning")
                  .insertOne(whereStr, function (err, result) {
                    db.close();
                  });
              });
            }
          });
        });
        break;
      case 2:
        //光照
        MongoClient.connect(url, function (err, db) {
          if (err) throw err;
          var dbo = db.db("api");

          var whereStr = { control_id: "2", sensor_id: sensor__id }; // 查询条件，不需要条件时 写{}即可

          dbo.collection("control").findOne(whereStr, function (err, result) {
            var later_intensity = result.intensity;

            light_intensity = parseInt(later_intensity);
            console.log(light_intensity);

            light = GetRandomNum(20, 30) + light_intensity;
            console.log("更改光照为" + light);

            whereStr = { sensor_id: sensor__id };
            var updaapir = { $set: { light: light } };

            dbo
              .collection("sensor")
              .updateOne(whereStr, updaapir, function (err, result) {
                if (err) throw err;
                console.log("更改sensor数据库: " + "light： " + light);

                //res.send("设备更新成功")

                console.log("end");

                db.close();
              });

            //光照报警
            if (light > 28) {
              warnMsg3 = "光照过强";
              MongoClient.connect(url, function (err, db) {
                if (err) throw err;
                var dbo = db.db("api");

                var whereStr = {
                  id: sensor__id,
                  warnMsg: warnMsg3,
                  name: "light",
                  num: light,
                }; // 查询条件，不需要条件时 写{}即可

                dbo
                  .collection("warning")
                  .insertOne(whereStr, function (err, result) {
                    db.close();
                  });
              });
            } else if (light < 22) {
              warnMsg3 = "光照过低";
              MongoClient.connect(url, function (err, db) {
                if (err) throw err;
                var dbo = db.db("api");

                var whereStr = {
                  id: sensor__id,
                  warnMsg: warnMsg3,
                  name: "light",
                  num: light,
                }; // 查询条件，不需要条件时 写{}即可

                dbo
                  .collection("warning")
                  .insertOne(whereStr, function (err, result) {
                    db.close();
                  });
              });
            }
          });
        });
        break;
      case 3:
        //ph值
        MongoClient.connect(url, function (err, db) {
          if (err) throw err;
          var dbo = db.db("api");

          var whereStr = { control_id: "3", sensor_id: sensor__id }; // 查询条件，不需要条件时 写{}即可

          dbo.collection("control").findOne(whereStr, function (err, result) {
            var later_intensity = result.intensity;

            ph_intensity = parseInt(later_intensity);
            console.log(ph_intensity);

            ph = GetRandomNum(5, 9) + ph_intensity;
            console.log("更改ph为" + ph);

            whereStr = { sensor_id: sensor__id };
            var updaapir = { $set: { ph: ph } };

            dbo
              .collection("sensor")
              .updateOne(whereStr, updaapir, function (err, result) {
                if (err) throw err;
                console.log("更改sensor数据库: " + "ph： " + ph);

                //res.send("设备更新成功")

                console.log("end");

                db.close();
              });

            //ph报警
            if (ph > 8) {
              warnMsg4 = "PH过碱";
              MongoClient.connect(url, function (err, db) {
                if (err) throw err;
                var dbo = db.db("api");

                var whereStr = {
                  id: sensor__id,
                  warnMsg: warnMsg4,
                  name: "ph",
                  num: ph,
                }; // 查询条件，不需要条件时 写{}即可

                dbo
                  .collection("warning")
                  .insertOne(whereStr, function (err, result) {
                    db.close();
                  });
              });
            } else if (ph < 6) {
              warnMsg4 = "PH过酸";
              MongoClient.connect(url, function (err, db) {
                if (err) throw err;
                var dbo = db.db("api");

                var whereStr = {
                  id: sensor__id,
                  warnMsg: warnMsg4,
                  name: "ph",
                  num: ph,
                }; // 查询条件，不需要条件时 写{}即可

                dbo
                  .collection("warning")
                  .insertOne(whereStr, function (err, result) {
                    db.close();
                  });
              });
            }
          });
        });
        break;
      case 4:
        //风速
        MongoClient.connect(url, function (err, db) {
          if (err) throw err;
          var dbo = db.db("api");

          var whereStr = { control_id: "4", sensor_id: sensor__id }; // 查询条件，不需要条件时 写{}即可

          dbo.collection("control").findOne(whereStr, function (err, result) {
            var later_intensity = result.intensity;

            wind_intensity = parseInt(later_intensity);
            console.log(wind_intensity);

            wind = GetRandomNum(1, 5) + wind_intensity;
            console.log("更改风速为" + wind);

            whereStr = { sensor_id: sensor__id };
            var updaapir = { $set: { wind: wind } };
            dbo
              .collection("sensor")
              .updateOne(whereStr, updaapir, function (err, result) {
                if (err) throw err;
                console.log("更改sensor数据库: " + "wind： " + wind);

                //res.send("设备更新成功")

                console.log("end");

                db.close();
              });

            //风速报警
            if (wind > 4) {
              warnMsg5 = "风速过高";
              MongoClient.connect(url, function (err, db) {
                if (err) throw err;
                var dbo = db.db("api");

                var whereStr = {
                  id: sensor__id,
                  warnMsg: warnMsg5,
                  name: "wind",
                  num: wind,
                }; // 查询条件，不需要条件时 写{}即可

                dbo
                  .collection("warning")
                  .insertOne(whereStr, function (err, result) {
                    db.close();
                  });
              });
            }
          });
        });
        break;
      case 5:
        //插入自己本身的数据库中，作为日志保存
        MongoClient.connect(url, function (err, db) {
          if (err) throw err;
          var dbo = db.db("api");
          var whereStr = { sensor_id: sensor__id };
          dbo.collection("sensor").findOne(whereStr, function (err, result) {
            //这个查询没啥用，但是下边的FindStr读到了更改后的值，莫名其妙解决了异步问题。所以不要删掉这个Find操作

            var FindStr = {
              sensor_id: sensor__id,
              temperature: temperature,
              humidity: humidity,
              light: light,
              wind: wind,
              ph: ph,
            };
            dbo
              .collection("sensor_logs")
              .insertOne(FindStr, function (err, result) {
                var whereStr = {};

                //查询传感器记录所有数据
                dbo
                  .collection("sensor_logs")
                  .find(whereStr)
                  .toArray(function (err, result) {
                    res.send(result);
                    db.close();
                  });
              });
          });
        });
        break;
    }
  }


  function GetRandomNum(Min, Max) {
    var Range = Max - Min;
    var Rand = Math.random();

    return Min + Math.round(Rand * Range);
  }

});

//查询传感器记录所有数据
router.get("/sensor_logs/find", function (req, res) {
  var sensor_id = req.query["sensor_id"];
  MongoClient.connect(url, function (err, db) {
    if (err) throw err;
    var dbo = db.db("api");

    //var whereStr = { "id": sensor__id, "temp": temperature, "humidity": humidity, "light": light, "ph": ph, "wind": wind };  // 查询条件，不需要条件时 写{}即可
    var whereStr = { sensor_id: sensor_id };
    dbo
      .collection("sensor_logs")
      .find(whereStr)
      .toArray(function (err, result) {
        db.close();
        res.json(result);
      });
  });
});

//////////////////////////////////////////////////////////////////////////////////////////////报警模块
//查报警日志
router.get("/warn", function (req, res) {
  MongoClient.connect(url, function (err, db) {
    if (err) throw err;
    var dbo = db.db("api");

    var whereStr = {}; // 查询条件，不需要条件时 写{}即可

    dbo
      .collection("warning")
      .find(whereStr)
      .toArray(function (err, result) {
        if (result != 0) {
          res.json(result);
        } else {
          res.json("没有数据");
        }
      });
  });
});

//查询传感器的数据

router.get("/sensor/find", function (req, res) {
  MongoClient.connect(url, function (err, db) {
    if (err) throw err;
    var dbo = db.db("api");

    var whereStr = {}; // 查询条件，不需要条件时 写{}即可

    dbo
      .collection("sensor")
      .find(whereStr)
      .toArray(function (err, result) {
        if (result != 0) {
          res.json(result);
          //res.send(result);
        } else {
          res.json("没有数据");
        }
      });
  });
});

//删除传感器
router.get("/sensor/delete", function (req, res) {
  var sensor_id = req.query.sensor_id;
  // console.log(sensor_id);
  MongoClient.connect(url, function (err, db) {
    if (err) throw err;
    var dbo = db.db("api");

    var whereStr = { sensor_id: sensor_id }; // 查询条件，不需要条件时 写{}即可

    dbo.collection("sensor").deleteOne(whereStr, function (err, obj) {
      db.close();
    });
    whereStr = { sensor_id: sensor_id, control_id: "0" };
    dbo.collection("control").deleteOne(whereStr, function (err, obj) {
      db.close();
    });
    whereStr = { sensor_id: sensor_id, control_id: "1" };
    dbo.collection("control").deleteOne(whereStr, function (err, obj) {
      db.close();
    });
    whereStr = { sensor_id: sensor_id, control_id: "2" };
    dbo.collection("control").deleteOne(whereStr, function (err, obj) {
      db.close();
    });
    whereStr = { sensor_id: sensor_id, control_id: "3" };
    dbo.collection("control").deleteOne(whereStr, function (err, obj) {
      db.close();
    });
    whereStr = { sensor_id: sensor_id, control_id: "4" };
    dbo.collection("control").deleteOne(whereStr, function (err, obj) {
      db.close();
      res.send("删除成功");
    });
  });
});

//登录
// @validate('')
router.post("/login", function (req, res) {
  let { username, password } = req.body;
  password = crypto.createHmac("md5", "cyl").update(password).digest("hex");
  MongoClient.connect(url, function (err, db) {
    if (err) throw err;
    var dbo = db.db("api");
    var whereStr = { username: username };
    dbo.collection("users").findOne(whereStr, function (err, doc) {
      if (err) throw err;
      if (doc) {
        if (doc.password == password) {
          res.cookie("username", username);
          res.send("ok");
          db.close();
        } else {
          res.send("defate");
        }
      } else {
        res.send("user is not found");
      }

      db.close();
    });
  });
});
//注册
router.post("/register", function (req, res) {
  let { username, password, level } = req.body;
  const crypto = require("crypto");
  password = crypto.createHmac("md5", "cyl").update(password).digest("hex");
  MongoClient.connect(url, function (err, db) {
    if (err) throw err;
    var dbo = db.db("api");
    var myobj = { username: username, password: password, level: level };
    dbo.collection("users").insertOne(myobj, function (err) {
      //res.cookie("username", username)
      res.send("register ok");
      db.close;
    });
  });
});

//传感新建
router.post("/sensor/new", function (req, res) {
  let { sensor_id, name, place } = req.body;
  var status = 1;
  var power = 80;
  var temperature = 0;
  var humidity = 0;
  var light = 0;
  var wind = 0;
  var ph = 7;
  MongoClient.connect(url, function (err, db) {
    if (err) throw err;
    var dbo = db.db("api");
    var mysensor = {
      sensor_id: sensor_id,
      name: name,
      status: status,
      power: power,
      place: place,
      temperature: temperature,
      humidity: humidity,
      light: light,
      wind: wind,
      ph: ph,
    };
    dbo.collection("sensor").insertOne(mysensor, function (err, doc) {
      res.send("新建传感器成功");
    });
    dbo.collection("control").insertMany([
      { sensor_id: sensor_id, control_id: "0", intensity: "0" },
      { sensor_id: sensor_id, control_id: "1", intensity: "0" },
      { sensor_id: sensor_id, control_id: "2", intensity: "0" },
      { sensor_id: sensor_id, control_id: "3", intensity: "0" },
      { sensor_id: sensor_id, control_id: "4", intensity: "0" },
    ]);
  });
});

//传感编辑
router.get("/sensor/edit", function (req, res) {
  var sensor_id = req.body.sensor_id;
  console.log(sensor_id);
  MongoClient.connect(url, function (err, db) {
    var dbo = db.db("api");
    var mysensor_id = { sensor_id: sensor_id };
    dbo.collection("sensor").findOne(mysensor_id, function (err, doc) {
      if (err) throw err;
      console.log(doc);
      res.send(doc);
    });
  });
});


router.post("/sensor/edit", function (req, res) {
  let { sensor_id, name, status, place } = req.body;
  var mysensor = { $set: { name: name, status: status, place: place } };
  var myid = { sensor_id: sensor_id };
  MongoClient.connect(url, function (err, db) {
    if (err) throw err;
    var dbo = db.db("api");
    dbo.collection("sensor").updateOne(myid, mysensor, function (err, doc) {
      db.close();
      res.send("ok");
    });
  });
});

module.exports = router;
