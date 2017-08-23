<?php
file_put_contents("video.mp4", fopen(urldecode($_REQUEST['url']), 'r'));
$params=[
    'chat_id'=>'-1001143659191',
    'document'=>new CURLFile(realpath('video.mp4')),
    'caption' => $_REQUEST['caption'],
];
$ch = curl_init('https://api.telegram.org/bot'.$_REQUEST["token"].'/sendDocument');
curl_setopt($ch, CURLOPT_HEADER, false);
curl_setopt($ch, CURLOPT_HTTPHEADER, array(
    "Content-Type:multipart/form-data"
));
curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
curl_setopt($ch, CURLOPT_POST, 1);
curl_setopt($ch, CURLOPT_POSTFIELDS, ($params));
curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
$result = curl_exec($ch);
curl_close($ch);
unlink('video.mp4');
echo json_encode(1);
exit();