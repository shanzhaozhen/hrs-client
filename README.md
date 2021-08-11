# HRS

### 介绍

该项目是为某环保企业定制的人事系统，采用前后端分析的方式开发，前端技术主要使用 react，后端使用 Spring Boot，UI 主题采用 antd-pro

- [前端](https://github.com/shanzhaozhen/hrs-client)
- [后端](https://github.com/shanzhaozhen/hrs)

### 运行截图

（待补充）

### 功能实现

请看项目中 doc 中的[人事系统脑图](https://github.com/shanzhaozhen/hrs/blob/master/doc/%E4%BA%BA%E4%BA%8B%E7%B3%BB%E7%BB%9F%E8%84%91%E5%9B%BE.vsdx)

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

### 运行方式

1. 前端：

```shell
cd hrs-client
yarn install
yarn run start
```

2. 后台：

- 先准备好 mysql 环境，创建`hrsdb`数据库，执行`sql/hrs.sql`脚本

```shell
cd hrs/api
gradle bootRun
```

该项目使用的是 Gradle，如果使用 idea 的用户请将编译方式修改为 Gradle，否则使用 idea 内置的编译方式可能会造成 xml 文件不会编译到目标路径

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
