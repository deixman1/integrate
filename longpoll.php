<?php
echo file_get_contents("https://".$_REQUEST['server']."?act=a_check&key=".$_REQUEST['key']."&ts=".$_REQUEST['ts']."&wait=25&mode=2&version=2");
?>