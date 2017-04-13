<?php		
	require_once '../Class/response.php';
	require_once '../Class/db.php';

	$id =isset($_GET['id'])?$_GET['id']:'';

	$items = array();
	$sql = "SELECT a.id,a.title,a.author,a.picture,b.text,c.filename FROM hk_items a INNER JOIN  hk_texts b ON a.id = b.itemid INNER JOIN hk_attachments c ON a.id = c.itemid ORDER BY a.id DESC";	

	try {
		$connect = Db::getInstance()->connect();	
	} catch (Exception $e) {
		return Response::show(403,'数据库链接失败');
	}

	$result = mysql_query($sql,$connect);

	while ($item = mysql_fetch_assoc($result)) {
		$items[]=$item;
	}



	if ($id!=='') {
		foreach ($items as $key => $value) {
		 	 if ( $id === $value['id'] ) {
			    Response::show(200,'success',$value);
				break;
			 }elseif ($key + 1 == count($items)) {
			 	Response::show(405,'Invalid argument');
			 }                               					
		}
	}else{
		 	Response::show(200,'success',$items);
	}	