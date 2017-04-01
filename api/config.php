<?php
	
	define("HOST","113.106.87.19");
	//define("HOST","10.201.1.1");
	define("USERNAME", "root");
	define("PASSWORD", "#hkstv520#");
	define("DATABASE", "hksh");


	function getdata($sql){
		//创建对象并打开连接，最后一个参数是选择的数据库名称
		$mysqli = new mysqli(HOST,USERNAME,PASSWORD,DATABASE);
		//检查连接是否成功

		if (mysqli_connect_errno()){
			//注意mysqli_connect_error()新特性
			die('Unable to connect!'). mysqli_connect_error();
		}

		$data = array();
		$result = $mysqli->query($sql);
		while($row = $result->fetch_assoc()){			
				 $data[]=$row;
		}

		$result->free(); //释放结果集
		$mysqli->close(); //释放链接
		return $data;
	}