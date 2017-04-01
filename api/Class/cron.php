<?php 

//让crontab定时执行的脚本程序

require_once('./db.php');
require_once('./file.php');

$sql = "SELECT a.id,a.title,a.author,a.picture,b.text,c.filename FROM hk_items a INNER JOIN  hk_texts b ON a.id = b.itemid INNER JOIN hk_attachments c ON a.id = c.itemid ORDER BY a.id DESC";

try {
		$connect = Db::getInstance()->connect();	
} catch (Exception $e) {
	//记录异常日志
	file_put_contents('./logs/'.date('y-m-d').'.txt',$e->getMessage());
	return;
}

$result = mysql_query($sql,$connect);
$items =array();
while ($item = mysql_fetch_assoc($result)) {
	$items[]=$item;
}

$file = new File();
if($items){
	$file ->cacheData('index_cron_cache',$items,0);
}else{
	file_put_contents('./logs/'.date('y-m-d').'.txt','没有相关数据');
}

return;