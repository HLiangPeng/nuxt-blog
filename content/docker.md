---
title: docker使用基础
---

# docker使用基础

## docker安装

[下载地址](https://www.docker.com/)

如果出现 `Docker Desktop requires a newer WSL kernel version` 问题打不开。请按照上面的地址去`下载Linux内核`。

## 通过 docker-compose 安装 MySQL 和 Adminer

在项目根目录中，我们新建`docker-compose.yml`文件

```yml
version: '3.7'
services:
  mysql_db_container: # 数据库容器
    image: mysql:latest # 镜像 mysql的最新版本
    command: --default-authentication-plugin=mysql_native_password # 启动的命令
    environment: # 环境变量
      MYSQL_ROOT_PASSWORD: rootpassword  # root账号密码 这里密码要写在.env配置文件中，防止git提交
    ports:
      - 3306:3306 # 内部端口和外部端口
    volumes:
      - mysql_db_data_container:/var/lib/mysql # 数据存储的地址
  adminer_container: # 管理工具容器
    image: adminer:latest
    environment:
      ADMINER_DEFAULT_SERVER: mysql_db_container
    ports:
      - 8080:8080

volumes:
  mysql_db_data_container:
```

然后使用 docker-compose 命令拉取镜像，在命令行输入如下命令：

```
# docker compose拉取镜像 
# up启动  
# -d重新安装
docker compose up -d
```

安装成功后，现在再看一下 Docker Desktop 的运行状态，MySQL 和 Adminer 顺利启动了

如果拉取不成功，可能是网络问题。我们可以在Docker中的Docker Engine中配置国内镜像地址

## 使用Adminer

上面已经启动了Adminer，我们可以直接打开服务地址

账号默认是root，密码就是我们`docker-compose.yml`文件中设置的密码

### 新建用户

为了数据库的安全，我们需要在权限中创建新的用户

服务器为 % 表示全部，然后我们再设置用户名和密码

一般情况下就分配对表的一些操作：增删改查（Create、Insert、Delete、Update、Select）