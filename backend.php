<?php
require_once('Wichtel.php');
require_once('WichtelManager.php');


function out($obj,$success = true,$code = 0,$msg = 'Request successful') {
	$prt = array(
		'success' => $success,
		'code' => $code,
		'msg' => $msg,
		'result' => $obj
		);
	echo json_encode($prt);
}









header('Content-Type: application/json');

$params = array_merge($_POST, $_GET);


if (!isset($params['fcall'])) {
	out(null,false,1,'Unknown function requested.');
	exit;
}

switch ($params['fcall']) {
case 'doShuffle':
	$m = new WichtelManager();
	$wichtel = array();
	foreach($params['wichtel'] as $entry) {
		$wichtel[] = new Wichtel(htmlspecialchars($entry['name']),htmlspecialchars($entry['gruppe']));
	}
	$m->setWichtel($wichtel);
	
	
	$wichtel = $m->getWichtel();
	$wObj = array();
	foreach($wichtel as $w) {
		$wObj[] = $w->toArray();
	}
	
	out(array('wichtel'=>$wObj));
	break;
	
default: 
	out(null,false,1,'Unknown function requested.');
	exit;
}
exit;
