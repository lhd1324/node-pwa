# node-pwa
#基于pwa渐进式应用，利用node+mongodb开发的简易通讯录

#目录
```
|---admin //后台管理页面（基于webpack+vue开发）
    |----src源文件
         |----assets  //相关引入资源（包括js,less,img）
         |----components //相关模块
         |----router  //路由配置文件
         |----App.vue  //入口文件的内容模板
         |----main.js   //主入口文件
         
|---nodeserver服务器端程序
    |----endcontr  管理后台控制器
    |----frontcontr  前台控制器
    |----headimg    保存的图片资源
    |----static     前台静态文件资源
    |----config.js   配置文件
    |----conmongodb.js 连接数据库文件
    |----jsonparse.js  转换数据格式
    |----resdata.js    response返回数据处理
    |-----static.js   静态文件处理
    |-----mine.js     文件类型
    |-----xss.js    xss处理
    |-----index.js  //启动服务入口文件
```
   #admin 启用步奏
```
   1->  npm install
   2->  npm run dev
```
