<?php
//https://vk.com/dev?act=a_run_method&al=1&hash=1507024762%3Acfd10761af3a98c9c9&method=video.get&param_extended=1&param_owner_id=66748&param_v=5.68&param_videos=123

header('Content-Type: text/html; charset=windows-1251');
$ch = curl_init();
curl_setopt($ch, CURLOPT_URL,"https://vk.com/dev?act=a_run_method&al=1&hash=1507024981:cea607a6ce0d3b04bf&method=video.get&param_extended=1&param_owner_id=".$_REQUEST['owner_id']."&param_v=5.68&param_videos=".$_REQUEST['videos']);
$headers = [
    'cookie: remixlang=0; remixdt=14400; remixstid=509958758_b7f24a4a782f8d1989; remixseenads=0; remixrefkey=74c9ca889b42fe3bc7; remixsid=444d406989f9b128cf4be6bc27d5f9fdcd009eae92888574dfcc4; remixcurr_audio=-1090630_456240218; remixflash=27.0.0; remixscreen_depth=24; tmr_detect=1%7C1506874962876; remixab=1',
];
curl_setopt($ch, CURLOPT_HTTPHEADER, $headers);
$html = curl_exec ($ch);

//echo '<body>'.json_encode($url).'</body>';
curl_close ($ch);
exit();