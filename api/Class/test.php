<?php 

require_once 'file.php';
$data = array(
		'id'=>1,
		'name'=>'kaitai',
		'type'=>array(4,5,6),
		'test'=>array(
			11,
			15,
			22=>array(123,'asdsa')
		)
);


$file = new File();

if($file ->cacheData('index_mk_cache',null)){
	// var_dump($file ->cacheData('index_mk_cache'));
	// exit;
	echo "success";
}else{
	echo "error";
};