
## 登录

1. 接口名：登录

2. 请求路径url:http://localhost:9000/api/login

3. 请求方式：POST

4. 参数类型

   | 参数     | 是否必选 | 类型   | 说明   |
   | -------- | -------- | ------ | ------ |
   | username | yes      | string | 用户名 |
   | password | yes      | string | 密码   |

5. 返回示例： 密码正确                               ![image-20210527115731214](C:\Users\sx291\AppData\Roaming\Typora\typora-user-images\image-20210527115731214.png)                                                                                                                                                                                                                                   密码错误                                     ![image-20210527115534128](C:\Users\sx291\AppData\Roaming\Typora\typora-user-images\image-20210527115534128.png)                                         用户不存在                                                                                                                ![image-20210527115909291](C:\Users\sx291\AppData\Roaming\Typora\typora-user-images\image-20210527115909291.png)                                                                                                                                                                                                     

6. 返回参数：执行成功，密码正确则返回String ok，密码错误则返回String defate，如果username不存在则返回String user is not found。其他无返回值

7. 备注: 如果登录成功返回ok，这时要求前端跳转到主页面也就是传感器控制页面

   如果密码错误则放回defate

   如果username不存在则返回user is not found

   已经将用户名保存到cookie中，测试登录成功后请打开console控制台

   输入document.cookie命令 查看username的cookie是否存在

 

作者：曹添然

 

 

 
## 注册

1. 接口名：注册

2. 请求路径url：http://localhost:9000/api/register

3. 请求方式：POST

4. 参数类型

   | 参数     | 是否必选 | 类型   | 说明     |
   | -------- | -------- | ------ | -------- |
   | username | yes      | string | 用户名   |
   | password | yes      | string | 密码     |
   | level    | yes      | number | 权限等级 |

5. 返回示例：

![image-20210527115218303](C:\Users\sx291\AppData\Roaming\Typora\typora-user-images\image-20210527115218303.png)

1. 返回参数: 执行成功则返回 String register ok 否则无返回值
2. 备注: 如果返回正确结果 则返回登录页面，如果无返回值就alert一个注册失败联系技术人员



作者：曹添然

 

 
## 新增传感器

1. 接口名：新增传感器

2. 请求路径url：http://localhost:9000/api/sensor/new

3. 请求方式：POST

4. 参数类型

   | 参数      | 是否必选 | 类型   | 说明       |
   | --------- | -------- | ------ | ---------- |
   | sensor_id | yes      | string | 传感器id   |
   | name      | yes      | string | 传感器名称 |
   | place     | yes      | string | 传感器地点 |

5. 返回示例：                            ![image-20210527120146037](C:\Users\sx291\AppData\Roaming\Typora\typora-user-images\image-20210527120146037.png)

6. 返回参数: 如果执行成功 返回 string 新增传感器成功

7. 备注: 如果执行成功则返回到传感器管理页面 如果失败则无返回值



作者：曹添然

 

## 编辑传感器（用于页面回显）

1. 接口名：编辑传感器（用于页面回显）

2. 请求路径url：http://localhost:9000/api/sensor/edit

3. 请求方式：GET

4. 参数类型

   | 参数      | 是否必选 | 类型   | 说明     |
   | --------- | -------- | ------ | -------- |
   | sensor_id | yes      | string | 传感器id |

5. 返回示例：                                    ![image-20210527120301226](C:\Users\sx291\AppData\Roaming\Typora\typora-user-images\image-20210527120301226.png)

6. 返回参数: 

   | 参数        | 类型          | 说明           |
   | ----------- | ------------- | -------------- |
   | sensor_id   | string        | 传感器id       |
   | name        | string        | 传感器名称     |
   | status      | number/String | 传感器状态     |
   | power       | number        | 传感器电量     |
   | place       | string        | 传感器放置地点 |
   | temperature | number        | 温度           |
   | humidity    | number        | 湿度           |
   | light       | number        | 光照           |
   | wind        | number        | 风速           |
   | ph          | number        | ph值           |

   

7. 备注: 如果执行成功则返回传感器id对应的传感器数据库记录





作者：曹添然

 

 

## 编辑传感器

1. 接口名：编辑传感器

2. 请求路径url：http://localhost:9000/api/sensor/edit

3. 请求方式：POST

4. 参数类型

   | 参数      | 是否必选 | 类型          | 说明       |
   | --------- | -------- | ------------- | ---------- |
   | sensor_id | yes      | string        | 传感器id   |
   | name      | yes      | string        | 传感器名称 |
   | status    | yes      | number/string | 传感器状态 |
   | place     | yes      | string        | 传感器地点 |

5. 返回示例：                                                                  ![image-20210527120753417](C:\Users\sx291\AppData\Roaming\Typora\typora-user-images\image-20210527120753417.png)

6. 返回参数: 如果成功则返回 String ok

7. 备注: 



作者：曹添然

 

## 删除传感器

1. 接口名：删除传感器

2. 请求路径url：http://localhost:9000/api/sensor/delete

3. 请求方式：GET

4. 参数类型

   | 参数      | 是否必选 | 类型   | 说明     |
   | --------- | -------- | ------ | -------- |
   | sensor_id | yes      | string | 传感器id |

5. 返回示例：                                            ![image-20210527121847382](C:\Users\sx291\AppData\Roaming\Typora\typora-user-images\image-20210527121847382.png)

6. 返回参数: String 删除成功

7. 备注: 此接口为删除传感器数据库中该传感器所有数据



作者：贺响

 
 

## 查找数据库所有传感器

1. 接口名：查找数据库所有传感器

2. 请求路径url：http://localhost:9000/api/sensor/find

3. 请求方式：GET

4. 参数类型

   | 参数      | 是否必选 | 类型   | 说明     |
   | --------- | -------- | ------ | -------- |
   | sensor_id | yes      | string | 传感器id |

5. 返回示例：                                                 ![image-20210527121933380](C:\Users\sx291\AppData\Roaming\Typora\typora-user-images\image-20210527121933380.png)

6. 返回参数:    此接口作用为获取传感器数据库中该所有数据，有几条返回几条 

   | 参数        | 类型          | 说明           |
   | ----------- | ------------- | -------------- |
   | sensor_id   | string        | 传感器id       |
   | name        | string        | 传感器名称     |
   | status      | number/String | 传感器状态     |
   | power       | number        | 传感器电量     |
   | place       | string        | 传感器放置地点 |
   | temperature | number        | 温度           |
   | humidity    | number        | 湿度           |
   | light       | number        | 光照           |
   | wind        | number        | 风速           |
   | ph          | number        | ph值           |

7. 备注: 此接口作用为获取传感器数据库中该所有数据

   




作者：贺响

 

## 控制模拟传感器节点（随机产生数据）

1. 接口名：（温度，湿度，ph。。。等等）控制模拟传感器节点（随机产生数据）

2. 请求路径url：http://localhost:9000/api/sensor/control

3. 请求方式：GET

4. 参数类型

   | 参数      | 是否必选 | 类型   | 说明     |
   | --------- | -------- | ------ | -------- |
   | sensor_id | yes      | string | 传感器id |

5. 返回示例：                                               ![image-20210527123327604](C:\Users\sx291\AppData\Roaming\Typora\typora-user-images\image-20210527123327604.png)

6. 返回参数:返回多个传感器的值，有几个返回几个。里边的数据格式

   | 参数      | 类型   | 说明     |
   | --------- | ------ | -------- |
   | sensor_id | string | 传感器id |
   | temp      | number | 温度     |
   | humidity  | number | 湿度     |
   | light     | number | 光照     |
   | wind      | number | 风速     |
   | ph        | number | ph值     |

7. 备注: 此接口作用为获取传感器的id，从操作记录的数据库中获取对应的操作强度。自动生成温度、湿度、光照、ph、风速的值，并将传感器的数据修改为操作强度后的最新数据。判断随机生成的值，如果超过警戒则插入到warning数据库中。

   注意返回的值是从sensor_logs数据库读的

作者：贺响



 

## 传感器产生的记录

1. 接口名：传感器产生的记录

2. 请求路径url：http://localhost:9000/api/sensor_logs/find

3. 请求方式：GET

4. 参数类型: 无

   | 参数      | 是否必选 | 类型   | 说明     |
   | --------- | -------- | ------ | -------- |
   | sensor_id | yes      | string | 传感器id |

5. 返回示例：                                 ![image-20210527123611866](C:\Users\sx291\AppData\Roaming\Typora\typora-user-images\image-20210527123611866.png)

6. 返回参数: 

   | 参数      | 类型   | 说明     |
   | --------- | ------ | -------- |
   | sensor_id | string | 传感器id |
   | temp      | number | 温度     |
   | humidity  | number | 湿度     |
   | light     | number | 光照     |
   | wind      | number | 风速     |
   | ph        | number | ph值     |

7. 备注: 此接口作用为获取传感器记录数据库中的参数值





作者：贺响





## 报警日志

1. 接口名：报警日志

2. 请求路径url：http://localhost:9000/api/warn

3. 请求方式：GET

4. 参数类型: 无

   | 参数      | 是否必选 | 类型   | 说明     |
   | --------- | -------- | ------ | -------- |
   | sensor_id | yes      | string | 传感器id |

5. 返回示例：                              ![image-20210527123726589](C:\Users\sx291\AppData\Roaming\Typora\typora-user-images\image-20210527123726589.png)

6. 返回参数:  此接口作用为获取所有的报警记录，有几个返回几个

   | 参数    | 类型   | 说明         |
   | ------- | ------ | ------------ |
   | id      | string | 传感器id     |
   | warnMsg | string | 报警信息     |
   | name    | string | 报警属性名称 |
   | num     | number | 报警属性的值 |

   

7. 备注: 此接口作用为获取所有的报警记录





作者：贺响

 

 

 

## **控制**

1. 接口名：控制

2. 请求路径url：http://localhost:9000/api/control

3. 请求方式：POST

4. 参数类型: 

   | 参数       | 是否必选 | 类型   | 说明                                       |
   | ---------- | -------- | ------ | ------------------------------------------ |
   | sensor_id  | yes      | string | 传感器id                                   |
   | control_id | yes      | string | 0为温度，1为湿度，2为光照，3为Ph， 4为风速 |
   | intensity  | yes      | string | 强度                                       |

5. 返回示例：                          ![image-20210527123220415](C:\Users\sx291\AppData\Roaming\Typora\typora-user-images\image-20210527123220415.png)

6. 返回参数: string All_stage_ok

7. 备注:  此接口最终效果为更新control数据库的值



作者：张珺淼



## **返回所有控制记录**

1. 接口名：返回所有控制记录

2. 请求路径url：http://localhost:9000/api/find_control_logs_All

3. 请求方式：POST

4. 参数类型: 无

5. 返回示例：                           ![image-20210527124008024](C:\Users\sx291\AppData\Roaming\Typora\typora-user-images\image-20210527124008024.png)

6. 返回参数: 返回所有操作记录，有几个返回几个

   | 参数       | 类型   | 说明       |
   | ---------- | ------ | ---------- |
   | control_id | string | 控制的属性 |
   | sensor_id  | string | 传感器id   |
   | intensity  | string | 强度       |

7. 备注:  返回所有操作记录



作者：张珺淼



## **返回指定传感器控制记录**

1. 接口名：返回指定传感器控制记录

2. 请求路径url：http://localhost:9000/api/find_control_logs

3. 请求方式：POST

4. 参数类型: 

   | 参数      | 是否必选 | 类型   | 说明     |
   | --------- | -------- | ------ | -------- |
   | sensor_id | yes      | string | 传感器id |

5. 返回示例：                                                ![image-20210527124433988](C:\Users\sx291\AppData\Roaming\Typora\typora-user-images\image-20210527124433988.png)

6. 返回参数: 返回多个传感器记录，有几个返回几个

   | 参数       | 类型   | 说明       |
   | ---------- | ------ | ---------- |
   | control_id | string | 控制的属性 |
   | sensor_id  | string | 传感器id   |
   | intensity  | string | 强度       |

7. 备注:  返回多个传感器记录

 

作者：张珺淼





## 返回所有用户数据

1. 接口名：返回所有用户数据

2. 请求路径url：http://localhost:9000/api/users/findAll

3. 请求方式：GET

4. 参数类型: 无

5. 返回示例：![image-20210528234107465](C:\Users\sx291\AppData\Roaming\Typora\typora-user-images\image-20210528234107465.png)                                    

6. 返回参数: 返回所有用户数据，有几个返回几个

   | 参数     | 类型   | 说明                        |
   | -------- | ------ | --------------------------- |
   | username | string | 用户名                      |
   | password | string | 密码，已被转换为MD5加密格式 |
   | level    | string | 权限等级                    |

7. 备注:  返回所有用户数据

 

作者：张珺淼

 