<?php		
	require_once './Class/response.php';
	require_once 'config.php';

	$sql = "SELECT a.id,a.title,a.author,a.picture,b.text,c.filename FROM hk_items a INNER JOIN  hk_texts b ON a.id = b.itemid INNER JOIN hk_attachments c ON a.id = c.itemid ORDER BY a.id DESC";	

	$data_new = getdata($sql);

	//返回json数据调用静态类
	Response::show(200,'success',$data_new);

	