<?php 
require_once('./Class/response.php');
require_once('./Class/file.php');

$file = new File();
$data = $file ->cacheData('index_cron_cache');

if($data){
	return Response::show(200,'数据获取成功',$data);
}else{
	return Response::show(400,'数据获取失败');	
}


exit;




require_once('./Class/db.php');
require_once('./Class/file.php');

$page = isset($_GET['page'])?$_GET['page']:1;
$pageSize = isset($_GET['pageSize'])?$_GET['pageSize']:6;

if (!is_numeric($page)|| !is_numeric($pageSize)) {
	return Response::show(401,"数据不合法");
}

$offset = ($page-1)*$pageSize;

$sql = "SELECT a.id,a.title,a.author,a.picture,b.text,c.filename FROM hk_items a INNER JOIN  hk_texts b ON a.id = b.itemid INNER JOIN hk_attachments c ON a.id = c.itemid ORDER BY a.id DESC LIMIT ".$offset.",".$pageSize;

//设置缓存
$cache = new File();
$items = array();

if(!$items = $cache->cacheData('index_hksh_cache'.$page.'-'.$pageSize)){
	//echo 1;exit;
	try {
		$connect = Db::getInstance()->connect();	
	} catch (Exception $e) {

		return Response::show(403,'数据库链接失败');
	}

	$result = mysql_query($sql,$connect);

	while ($item = mysql_fetch_assoc($result)) {
		$items[]=$item;
	}

	if($items){
		$cache ->cacheData('index_hksh_cache'.$page.'-'.$pageSize,$items,600);
	}
}



if($items){
	return Response::show(200,'数据获取成功',$items);
}else{
	return Response::show(400,'数据获取失败');	
}