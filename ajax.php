<?
if ( ($_POST["action"] == 'addUserRating') && !empty($_POST["rating"]) ) {
    
    $error= '';
    //Учитываем кол-во поставивших рейтинг
	$fd = fopen("shetchik/c", 'r') or $error = "не удалось открыть файл";
	while(!feof($fd))
	{
		$count = intval(htmlentities(fgets($fd)));
	}
	$count++;
	fclose($fd); 

	$fd = fopen("shetchik/c", 'w') or $error = "не удалось создать файл";
	fwrite($fd, $count);
	fclose($fd);


    $result = array(
    	'count' => $count,
        'error' => $error
    ); 

    echo json_encode($result); 
}


if ( ($_POST["action"] == 'GetUsersRating') ) {
    
    $error= '';
	$fd = fopen("shetchik/c", 'r') or $error = "не удалось открыть файл";
	while(!feof($fd))
	{
		$count = intval(htmlentities(fgets($fd)));
	}
	
	fclose($fd); 

    $result = array(
    	'count' => $count,
        'error' => $error
    ); 

    echo json_encode($result); 
}

if ( ($_POST["action"] == 'getRandom') ) {
    
   
    echo rand(); 
}
?>