<?PHP
function find($page, $from, $to)
{
    $fromlen = strlen($from);
    $from = strpos($page, $from);
    $to = strpos($page, $to);
    $resul = substr($page, ($from + $fromlen), ($to - $from - $fromlen));
    return $resul;
}

ini_set('max_execution_time', '0');
header('Content-Type: text/html; charset=utf-8');
$url_in = $_REQUEST['url'];
//echo vk_video($url_in); // Запускаем основную функцию
function curl($url, $cookie = false, $post = false, $header = false, $follow_location = false) {
    $ch = curl_init($url);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($ch, CURLOPT_FAILONERROR, true);
    curl_setopt($ch, CURLOPT_HEADER, $header);
    curl_setopt($ch, CURLOPT_FOLLOWLOCATION, $follow_location);
    if ($cookie) {
        curl_setopt ($ch, CURLOPT_COOKIE, $cookie);
    }
    if ($post) {
        curl_setopt($ch, CURLOPT_POST, 1);
        curl_setopt($ch, CURLOPT_POSTFIELDS, $post);
    }
    $response = curl_exec ($ch);
    curl_close($ch);
    return $response;
}
//echo curl($url_in);
/*$file = fopen('1.txt', 'w');
fwrite($file, curl($url_in));
fclose($file);*/
$url = find(curl($url_in), '<source src="', '" type="video/mp4"></source>');
echo json_encode($url);
exit();
/*function vk_video($url_in){
 
    $vk_video = curl($url_in);
    preg_match('|host=(.*)&|Uis', $vk_video, $link1);
    preg_match('|vkid=(.*)&|Uis', $vk_video, $link2);
    preg_match('|vtag=(.*)&|Uis', $vk_video, $link3);
 
    echo '<a href="http://'.$link1[1].'/assets/videos/'.$link3[1].$link2[1].'.vk.flv">http://'.$link1[1].'/assets/videos/'.$link3[1].$link2[1].'.vk.flv</a>';
}*/
 
?>