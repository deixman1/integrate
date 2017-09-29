<?php
//https://vk.com/video_ext.php?oid=-141650120&id=456239052&hash=9366a76d144f2b99
//https://vk.com/video_ext.php?oid=-99126464&id=456263999&hash=216f8489a070a967
header('Content-type: text/html; charset=windows-1251');
$USERAGENT = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/61.0.3163.100 Safari/537.36";
$ch = curl_init("https://vk.com/video_ext.php?oid=-141650120&id=456239052&hash=9366a76d144f2b99");
curl_setopt($ch, CURLOPT_HEADER, 1);
curl_setopt($ch, CURLOPT_USERAGENT, $_SERVER["HTTP_USER_AGENT"]);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
$html = curl_exec($ch);
curl_close($ch);
//$html = utf8_decode ( $html );
$html = str_replace('src="/', 'src="https://vk.com/', $html);
$html = str_replace('href="/', 'href="https://vk.com/', $html);
echo($html);
?>