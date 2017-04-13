<?php		
	require_once '../Class/response.php';
	require_once '../Class/db.php';

	$id =isset($_GET['id'])?$_GET['id']:0;

	$items = array();


	$sql = "SELECT a.id,a.title,a.author,a.picture,b.text,c.filename FROM hk_items a INNER JOIN  hk_texts b ON a.id = b.itemid INNER JOIN hk_attachments c ON a.id = c.itemid WHERE a.id = {$id}";	

	try {
		$connect = Db::getInstance()->connect();	
	} catch (Exception $e) {
		return Response::show(403,'数据库链接失败');
	}

	$result = mysql_query($sql,$connect);

	while ($item = @mysql_fetch_assoc($result)) {
		$items=$item;
	}

	if ($items) {		
		Response::show(200,'success',$items);
	}else{
		Response::show(405,'参数错误');
	}