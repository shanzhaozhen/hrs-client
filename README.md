<h1 align="center">HRS 人事系统</h1>

<div align="center">
该项目是为某环保企业定制的人事系统，采用前后端分析的方式开发，前端技术主要使用react，后端使用Spring Boot，UI主题采用antd-pro

喜欢这个项目的朋友们记得点一下 star 哦！

![主界面](https://raw.githubusercontent.com/shanzhaozhen/hrs/master/doc/img/%E4%B8%BB%E7%95%8C%E9%9D%A2.png)

</div>

- [前端：https://github.com/shanzhaozhen/hrs-client](https://github.com/shanzhaozhen/hrs-client)
- [后台：https://github.com/shanzhaozhen/hrs](https://github.com/shanzhaozhen/hrs)

### 运行截图

<table>
  <tr>
    <td>
      <img src="https://raw.githubusercontent.com/shanzhaozhen/hrs/master/doc/img/%E7%94%A8%E6%88%B7%E7%AE%A1%E7%90%86.png" alt="用户管理"/>
    </td>
    <td>
      <img src="https://raw.githubusercontent.com/shanzhaozhen/hrs/master/doc/img/%E8%8F%9C%E5%8D%95%E7%AE%A1%E7%90%86.png" alt="菜单管理"/>
    </td>
    <td>
      <img src="https://raw.githubusercontent.com/shanzhaozhen/hrs/master/doc/img/%E5%AE%9A%E6%97%B6%E4%BB%BB%E5%8A%A1%E8%AE%BE%E7%BD%AE.png" alt="定时任务设置"/>
    </td>
  </tr>
  <tr>
    <td>
      <img src="https://raw.githubusercontent.com/shanzhaozhen/hrs/master/doc/img/%E8%A7%92%E8%89%B2%E7%AE%A1%E7%90%86.png" alt="角色管理"/>
    </td>
    <td> 
      <img src="https://raw.githubusercontent.com/shanzhaozhen/hrs/master/doc/img/%E8%A7%92%E8%89%B2%E5%88%86%E9%85%8D.png" alt="角色分配"/>
    </td>
    <td>
      <img src="https://raw.githubusercontent.com/shanzhaozhen/hrs/master/doc/img/%E4%BF%AE%E6%94%B9%E8%A7%92%E8%89%B2.png" alt="修改角色"/>
    </td>
  </tr>
  <tr>
    <td>
      <img src="https://raw.githubusercontent.com/shanzhaozhen/hrs/master/doc/img/%E5%AD%97%E5%85%B8%E7%AE%A1%E7%90%86.png" alt="字典管理"/>
    </td>
    <td>
      <img src="https://raw.githubusercontent.com/shanzhaozhen/hrs/master/doc/img/%E5%91%98%E5%B7%A5%E7%AE%A1%E7%90%86.png" alt="员工管理"/>
    </td>
    <td>
      <img src="https://raw.githubusercontent.com/shanzhaozhen/hrs/master/doc/img/%E8%96%AA%E8%B5%84%E5%8F%91%E6%94%BE%E8%AE%A1%E7%AE%97.png" alt="薪资发放计算"/>
    </td>
  </tr>
</table>

### 功能实现

请看项目中 doc 中的[人事系统脑图](https://github.com/shanzhaozhen/hrs/blob/master/doc/%E4%BA%BA%E4%BA%8B%E7%B3%BB%E7%BB%9F%E8%84%91%E5%9B%BE.vsdx) ![人事系统功能脑图](https://raw.githubusercontent.com/shanzhaozhen/hrs/master/doc/img/%E4%BA%BA%E4%BA%8B%E7%B3%BB%E7%BB%9F%E5%8A%9F%E8%83%BD%E8%84%91%E5%9B%BE.png)

### 区域信息

系统中有使用到区域信息（省-区-市-街道），数据来源于以下 [Administrative-divisions-of-China](https://github.com/modood/Administrative-divisions-of-China) 项目

### 准备环境

1. 前端：

- node 环境
- npm
- yarn (npm i -g yarn) 或 tyarn (npm i -g tyarn)
- Nginx (部署需要)

2. 后台：

- Java 1.8
- Gradle 6.8+ (加载依赖，仅开发需要)
- mysql 7+
- redis

### 运行前提

- mysql 建库，创建`hrsdb`数据库，执行`sql/hrs.sql`脚本。（必须）
- redis（必须）
- 运行 api 子工程下的测试用例，`testRegion`方法，加载区域信息，因为数据量比较大，读取区域信息的 json 数据插入到数据库中。（非必要）
- 默认账号：`admin`，密码为：`123456`
- 该项目使用的是 Gradle，如果使用 idea 的用户请将编译方式修改为 Gradle，否则使用 idea 内置的编译方式可能会造成 xml 文件不会编译到目标路径

### 运行方式

1. 前端：

```shell
cd hrs-client
yarn install
yarn run start
```

2. 后台：

```shell
cd hrs/api
gradle bootRun
```

### 打包部署

1. 前端：

```shell
cd hrs-client
yarn install
run build
```

2. 后台：

```shell
cd hrs/api
# -x test 为跳过测试
gradle bootjar -x test
```

### docker 运行

(待完善)
