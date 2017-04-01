<?php
	
	class Response{

		const JSON = "json";
		
		/*
		*按json,array(调试),xml方式输出通讯数据
		*@param integer $code 状态码
		*@param string $message 提示信息
		*@param array $data 传入的数据
		*@param string $type 数据类型默认为json 或者在URL上挂参数?format="xml" 或array 动态的显示
		*return string
		*/
		
		public static function show($code,$message='',$data = array(),$type = self::JSON){
			if (!is_numeric($code)) {
				return '';
			}

			$result = array(
				'code' => $code,
				'message' =>$message,
				'data' =>$data
			);

			$type =isset($_GET['format'])?$_GET['format']:self::JSON;

			if($type == 'json'){
				self::json($code,$message,$data);
				exit;
			}elseif($type == 'array'){
				var_dump($result);
			}elseif ($type == 'xml') {
				self::xmlEncode($code,$message,$data);
				exit;
			}

		}




		/*
		*按json方式输出通讯数据
		*@param integer $code 状态码
		*@param string $message 提示信息
		*return string
		*/
		public static function json($code,$message='',$data = array()){
			if(!is_numeric($code)){
				return '';
			}

			$result = array(
				'code' => $code,
				'message' =>$message,
				'data' =>$data
			);

			echo json_encode($result);
			exit;
		}

		/*
		*按xml方式输出通讯数据
		*@param integer $code 状态码
		*@param string $message 提示信息
		*return string
		*/

		public static function xmlEncode($code,$message='',$data = array()){
			if(!is_numeric($code)){
				return '';
			}

			$result = array(
				'code' => $code,
				'message' =>$message,
				'data' =>$data				
			);

			header("Content-Type:text/xml");

			$xml = "<?xml version = '1.0' encoding='UTF-8'?>\n"; 
			$xml .="<root>";
			$xml .=self::xmlToEncode($result);
			$xml .="</root>";


			echo $xml;
			exit;
		}

		public static function xmlToEncode($data){
			$xml = $attr = "";
			foreach ($data as $key => $value) {
				if(is_numeric($key)){
					$attr= " id='{$key}'";
					$key = "item";
				}
				$xml .="<{$key}{$attr}>";
				//递归算法
				$xml .=is_array($value)?self::xmlToEncode($value):$value;
				$xml .="</{$key}>";
			}
			return $xml;
		}
	}


