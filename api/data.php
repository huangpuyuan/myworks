<?php		
	require_once './Class/response.php';
	require_once 'config.php';

	$sql = "SELECT a.id,a.title,a.author,a.picture,b.text,c.filename FROM hk_items a INNER JOIN  hk_texts b ON a.id = b.itemid INNER JOIN hk_attachments c ON a.id = c.itemid ORDER BY a.id DESC";	

	$data = getdata($sql);

	$id =isset($_GET['id'])?$_GET['id']:'';


	if ($id!=='') {
		foreach ($data as $key => $value) {
		 	 if ( $id === $value['id'] ) {
			    Response::show(200,'success',$value);
				break;
			 }elseif ($key + 1 == count($data)) {
			 	Response::show(405,'Invalid argument');
			 }                               					
		}
	}else{
		 	Response::show(200,'success',$data);
	}	