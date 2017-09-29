//{"ts":1635767078,"updates":[[62,335456267,3],[7,2000000003,137612],[4,137613,8209,2000000003,1506617634,"сука",{"from":"335456267"}],[7,2000000003,137613],[4,137614,8721,2000000003,1506617643,"",{"fwd":"335456267_1218895","fwd_all_count":"0","from":"335456267"}],[7,2000000003,137614],[4,137615,8721,2000000003,1506617695,"",{"attach1_type":"video","attach1":"335456267_456239429","from":"335456267"}],[7,2000000003,137615],[4,137616,8721,2000000003,1506617707,"",{"attach1_type":"video","attach1":"335456267_456239432","from":"335456267"}],[7,2000000003,137616],[4,137617,8721,2000000003,1506617747,"",{"attach1_type":"doc","attach1":"335456267_438602625","from":"335456267"}]]}
//https://api.vk.com/method/messages.getLongPollServer?need_pts=1&chat_id=3&access_token=0f6455faf4ae674305cd240ea8136749e70b171f21427ad9fb6cae93b0f350d6181efd0908da4b2397e95
//https://imv4.vk.com/im0807?act=a_check&key=846842222bb7a7818a75f014025a7a782eefcdba&ts=1635767067&wait=25&mode=2&version=2
//https://api.vk.com/method/messages.getById?message_ids=137614&access_token=d64dd49c027d9376c64bc62f77df9a60881ae459ca43e298e8be9aa8c8fa3573fdd3917ba195f5a9eafbb
var Telegram = {
	offset: 0,
	token: '426929260:AAEW5BWWoPXcBGNCgtwrBRRcTnBV8tcxuTY',
	chatId: -1001143659191,
};
var VK = {
	//token: 'f4c5696a8e6bce620bd8cd0f20c51f34891380a465db2a4bfa6fa92b7b277cc32eddec8bce375d3377274',
	token: 'd64dd49c027d9376c64bc62f77df9a60881ae459ca43e298e8be9aa8c8fa3573fdd3917ba195f5a9eafbb',
};
var messages = {};
finish();
function finish(){
$.ajax({
	url: 'https://api.vk.com/method/messages.getLongPollServer',
	type: 'get',
	dataType: 'jsonp',
	crossDomain: true,
	data: {access_token: VK.token},
}).done(function(e) {
	//console.log(e);
	if(typeof e.response !== "undefined")
	{
		VK.key = e.response.key;
		VK.ts = e.response.ts;
		VK.server = e.response.server;
		start();
	}
	else
		finish();
});
}
function start(){
	$.ajax({
		url: 'longpoll.php',
		type: 'get',
		dataType: 'json',
		data: {key: VK.key, ts: VK.ts, server: VK.server},
	}).done(function(result) {
		//console.log(result);
		result.updates.forEach(function (val, key) {
			switch (val[0]) {
				case 4:
					if(val[3] == 2000000003)
					unknow(val[1]);
					break;
				default:
					break;
			}
		});
		finish();
	});
}
function unknow(id){
	$.ajax({
		url: 'https://api.vk.com/method/messages.getById',
		type: 'get',
		dataType: 'jsonp',
		crossDomain: true,
		data: {message_ids: id, access_token: VK.token},
	}).done(function(message) {
		if(typeof message.response[1] !== "undefined")
		if(!message.response[1].out)
		{
			console.log(message.response[1]);
			//messages.fwd_messages = message.response[1].fwd_messages;
			if(message.response[1].body != "")
				messages.text = message.response[1].body;
			if(typeof message.response[1].attachment !== "undefined")
				attachment(message.response[1].attachment);
			sendTelegram(message.response[1].uid);
		}
	});
}
function video(e){
	return 'First link: https:\/\/vk.com\/video_ext.php?oid='+e.owner_id+'&id='+e.vid+'&hash='+e.access_key+'\nSecond link: https://vk.com/im?z=video'+e.owner_id+'_'+e.vid+'%2F'+e.access_key;
}
function attachment(e){
	switch (e.type) {
		case 'video':
			messages.video = video(e.video);
			break;
		case 'doc':
			// statements_1
			messages.doc = e.doc.url;
			break;
		case 'photo':
			// statements_1 src_big 137774
			messages.photo = e.photo.src_big
			break;
		case 'audio':
			// statements_1 src_big 137774
			messages.audio = e.audio.url
			break;
	}
}
function sendTelegram(uid)
{
	$.ajax({
		url: 'https://api.vk.com/method/users.get',
		type: 'get',
		dataType: 'jsonp',
		crossDomain: true,
		data: {user_ids: uid, access_token: VK.token},
	}).done(function(user) {
		VK.messageReturn = '(VK)'+user.response[0].first_name+' '+user.response[0].last_name+':\n'
		/*messages.updates.forEach(function (val, key) {
			VK.messageReturn += val+'\n';
		});*/
		console.log(messages);
		for(key in messages){
			VK.messageReturn += messages[key]+'\n';
		}
		VK.messageReturn = VK.messageReturn.replace(/\<br\>/g, '\n');
		$.ajax({
		url: 'https://api.telegram.org/bot'+Telegram.token+'/sendMessage',
		type: 'GET',
		dataType: 'json',
		data: {chat_id: Telegram.chatId, text: VK.messageReturn},
		});
		messages = {};
	});
}