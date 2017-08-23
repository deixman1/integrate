<?PHP
function find($page, $from, $to)
{
    $fromlen = strlen($from);
    $from = strpos($page, $from);
    if($from === false) return 0;
    $to = strpos($page, $to);
    $resul = substr($page, ($from + $fromlen), ($to - $from - $fromlen));
    return $resul;
}
//curl 'http://cs507407.vk.me/u112847320/video/l_ff5a5b75.jpg' -H 'Accept: image/png,image/*;q=0.8,*/*;q=0.5' -H 'Accept-Encoding: gzip, deflate' -H 'Accept-Language: en-US,en;q=0.5' -H 'Cache-Control: max-age=0' -H 'Connection: keep-alive' -H 'Host: cs507407.vk.me' -H 'If-Modified-Since: Wed, 24 Apr 2013 15:54:42 GMT' -H 'User-Agent: Mozilla/5.0 (X11; Ubuntu; Linux x86_64; rv:26.0) Gecko/20100101 Firefox/26.0'
$ch = curl_init();
curl_setopt($ch, CURLOPT_URL, urldecode($_REQUEST['url']));
curl_setopt($ch, CURLOPT_HEADER, 1);
curl_setopt($ch, CURLOPT_USERAGENT, "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/60.0.3112.101 Safari/537.36");
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
$html = curl_exec($ch);
curl_close($ch);
/*$file = fopen('1.txt', 'w');
fwrite($file, $html);
fclose($file);*/
$url;

if(find($html, ',"url1080":"', '","jpg"'))
{
    $url = find($html, ',"url1080":"', '","jpg"');
}
else
{
    if(find($html, ',"url720":"', '","jpg"'))
    {
        $url = find($html, ',"url720":"', '","jpg"');
    }
    else
    {
        if(find($html, ',"url360":"', '","jpg"'))
        {
            $url = find($html, ',"url360":"', '","jpg"');
        }
        else
        {
            if(find($html, ',"url240":"', '","jpg"'))
            {
                $url = find($html, ',"url240":"', '","jpg"');
            }
        }
    }
}
if(find($html, ',"url1080":"', '","hls"'))
{
    $url = find($html, ',"url1080":"', '","hls"');
}
else
{
    if(find($html, ',"url720":"', '","hls"'))
    {
        $url = find($html, ',"url720":"', '","hls"');
    }
    else
    {
        if(find($html, ',"url360":"', '","hls"'))
        {
            $url = find($html, ',"url360":"', '","hls"');
        }
        else
        {
            if(find($html, ',"url240":"', '","hls"'))
            {
                $url = find($html, ',"url240":"', '","hls"');
            }
        }
    }
}
    

//echo $url = str_replace(array('\/', '////'), "//", $url);
//echo json_encode(str_replace("////", "//", $url));
//header("Location: getvideourl.php?json=".urlencode($url));
$url = str_replace("\\", "", $url);
echo json_encode($url);
//unlink('video.mp4');

//unlink('video.mp4');
//file_put_contents("https://api.telegram.org/bot426929260:AAEW5BWWoPXcBGNCgtwrBRRcTnBV8tcxuTY/sendDocument?chat_id=-1001143659191&document", fopen($url, 'r'));
?>