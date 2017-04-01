<?php 

 class File{

 	private $_dir;
 	const EXT = '.txt';

 	public function __construct(){
 		//新建目录
 		$this -> _dir = dirname(__FILE__).'/files/';
 		//写入文件

 	}
	//key->value 以及缓存失效时间
 	public function cacheData($key,$value='',$cacheTime = 0){
 		$filename = $this ->_dir.$key.self::EXT;
 		
 		/*
			1.生成缓存
			2.获取缓存
			3.删除缓存

     	*/
		if($value!==''){//将value值写入缓存

			if(is_null($value)){//当第二个参数为null的时候删除缓存
				return @unlink($filename);
			}

			//创建目录
			$dir = dirname($filename);
			if(!is_dir($dir)){
				//0777目录操作权限
				mkdir($dir,0777);
			}

			$cacheTime = sprintf('%011d',$cacheTime);

			return file_put_contents($filename, $cacheTime.json_encode($value));
		}

		if (!is_file($filename)) {
			return FALSE;
		} 

		$contents = file_get_contents($filename);
		$cacheTime = (int)substr($contents,0,11);
		$value = substr($contents,11);

		if ($cacheTime!=0 && ($cacheTime + filemtime($filename) < time()) ) {
			unlink($filename);
			return FALSE;
		}

		return json_decode($value,true);
		

 	}
 
 }

