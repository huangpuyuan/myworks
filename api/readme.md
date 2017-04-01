# 设置API接口

## 封装通讯接口
* 返回json
* 返回xml  

##　设置缓存

* 掌握如何设置缓存操作
* 掌握如何获取缓存操作
* 掌握如何删除缓存操作

### Memcache,Redis
1. Memcache,Redis管理数据的
2. 他们数据都是存放在内存里的
3. Redis可以定期将数据备份到磁盘（持久化）
4. Memcache 简单的key:value
5. Redis 不仅仅是简单的k/v类型数据，同时还支持List,set,hash等数据结构

> 操作Mysql
> 1.mysql服务 2.终端 如：Navicat 3.通过sql命令 4.返回终端 5.后端程序控制php/java/...

> 而Memcache,Redis
> 1.不通过使用sql语句来 利用set/get等命令进行操作 2.后端程序控制php/java/...

> Redis

* Redis数据操作
	* 开启redis客户端
	* 设置缓存值 `-set index_k_cache`
	* 获取缓存数据 `-get index-mk-cache`
	* 设置过期时间 `-setex key10 'cache' `
	* 删除缓存 `-del key`  终端 xshell

#### 安装phpredis扩展
1. 安装phpredis扩展
2. php链接redis服务-connect(127.0.0.1,6379)
...

#### APP接口实例
1. 单例模式链接数据库
	* 单例模式设计
		* 构造函数徐标记为非public(防止外部new操作符创建对象)，单例类不能在其他类中实例化，只能被其自身实例化
		* 拥有一个保存类的实例的静态成员变量`$_instance`;
		* 拥有一个访问这个实例的公共静态方法
	* PHP如何简介数据库	
2. 首页接口开发以及客户端APP演示
	* 方案一：读取数据库方式开发首页接口(数据时效性比较高的系统)
		* 从数据库获取信息
		* 封装
		* 生成及接口数据
	* 方案二：读取缓存方式开发首页接口
		* 从数据库获取信息
		* 封装
		* 缓存redis mamcache 减少数据库压力
		* 生成及接口数据
	* 方案三：定时读取缓存方式开发首页接口
		* 数据库
		* crontab定时生成数据接口
		* 缓存
		* http请求
		* 封装并返回数据

3. APP版本升级以及APP演示
4. APP错误日志接口



###### 使用静态缓存调试

