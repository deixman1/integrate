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
var tmp = [
    '.1080.',
    '.720.',
    '.480.',
    '.360.',
    '.240.',
    '.144.',
];
var shit = false;
var messages = {
	photo: [],
	video: [],
	audio: [],
	doc: [],
};
function clear(){
	messages = {
	photo: [],
	video: [],
	audio: [],
	doc: [],
	};
}
get_for_polling_vk();
start_polling_telegram();
function start_polling_telegram(){
	$.ajax({
		url: 'https://api.telegram.org/bot'+Telegram.token+'/getUpdates',
		type: 'GET',
		dataType: 'json',
		data: {offset: Telegram.offset, timeout: 25},
	})
	.done(function(e) {
		//console.log(e);
		if(!e.result.length)
		{
			start_polling_telegram();
			return;
		}
		try{
			Telegram.offset = e.result[0].update_id+1;
			start_polling_telegram();
			//Telegram.chatId = e.result[0].message.chat.id;
			Telegram.message = (e.result[0].message.text == undefined) ? '' : e.result[0].message.text;
			console.log(e);
			if(e.result[0].message.voice === undefined && e.result[0].message.audio === undefined && e.result[0].message.video === undefined && e.result[0].message.photo === undefined && e.result[0].message.sticker === undefined && e.result[0].message.document === undefined)
			{
				//Telegram.img = 'IMG';
				Telegram.username = e.result[0].message.from.username;
				if(Telegram.message.search(/ф\s*\s*\s*\s*и\s*\s*\s*\s*а\s*\s*\s*\s*с\s*\s*\s*\s*к|а\s*\s*\s*\s*н\s*\s*\s*\s*т\s*\s*\s*\s*и\s*\s*\s*\s*х\s*\s*\s*\s*а\s*\s*\s*\s*й\s*\s*\s*\s*п/gi))
				{
					if(Telegram.message[0] == '!')
					{
						Telegram.messageReturn = Telegram.message;
					}
					else
					{
						Telegram.messageReturn = '(Telegram)'+Telegram.username+':\n'+Telegram.message.replace(/Тͥͥ/g, 'я сосу хуй ');//+' '+Telegram.img;
					}
					$.ajax({
					url: 'https://api.vk.com/method/messages.send',
					type: 'get',
					dataType: 'jsonp',
					crossDomain: true,
					data: {chat_id: 3, message: Telegram.messageReturn, access_token: VK.token},
					});
				}
				else
				{
					Telegram.messageReturn = '(Telegram)'+Telegram.username+':\n'+'я сосу хуи с======8';
					$.ajax({
					url: 'https://api.vk.com/method/messages.send',
					type: 'get',
					dataType: 'jsonp',
					crossDomain: true,
					data: {chat_id: 3, message: Telegram.messageReturn, access_token: VK.token},
					});
					$.ajax({
					url: 'https://api.telegram.org/bot'+Telegram.token+'/deleteMessage',
					type: 'GET',
					dataType: 'json',
					data: {chat_id: Telegram.chatId, message_id: e.result[0].message.message_id},
					});
				}
			}
			else {
				//Telegram.username = e.result[0].message.from.username;
				//Telegram.messageReturn = '(Telegram)'+Telegram.username+':\n'+Telegram.message+' IMG';
				//Telegram.img = '';
			}
		}catch(err)
		{}
	});
}
function get_for_polling_vk(){
$.ajax({
	url: 'https://api.vk.com/method/messages.getLongPollServer',
	type: 'get',
	dataType: 'jsonp',
	crossDomain: true,
	data: {access_token: VK.token},
}).done(function(e) {
	//console.log(e);
	try{
		VK.key = e.response.key;
		VK.ts = e.response.ts;
		VK.server = e.response.server;
		start_polling_vk();
	}catch(er){
		get_for_polling_vk();
	}
		

});
}
function start_polling_vk(){
	$.ajax({
		url: 'longpoll.php',
		type: 'get',
		dataType: 'json',
		data: {key: VK.key, ts: VK.ts, server: VK.server},
	}).done(function(result) {
		console.log(result);
		if(typeof result.failed !== "undefined")
		{
			result.failed = result.failed;
			get_for_polling_vk();
			//return;
		}
		else
		{
		VK.ts = result.ts;
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
		start_polling_vk();
		}

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
		
			if(!message.response[1].out)
			{
				VK.uid = message.response[1].uid;
				console.log(message);
				if(message.response[1].body != "")
					if((message.response[1].body).search(/ф\s*\s*\s*\s*и\s*\s*\s*\s*а\s*\s*\s*\s*с\s*\s*\s*\s*к|а\s*\s*\s*\s*н\s*\s*\s*\s*т\s*\s*\s*\s*и\s*\s*\s*\s*х\s*\s*\s*\s*а\s*\s*\s*\s*й\s*\s*\s*\s*п/gi))
						messages.atext = message.response[1].body;
					else
						messages.atext = 'я сосу хуи с======8';
				if(typeof message.response[1].fwd_messages !== "undefined")
				{
					SendTelegram_fwd_messages(message.response[1].fwd_messages, VK.uid);
					shit = true;
				}
				if(typeof message.response[1].attachments !== "undefined")
				{
					attachments(message.response[1].attachments);
					shit = true;
				}
				if(!shit)
					sendTelegram(VK.uid);
				shit = false;
			}
		
	});
}
function SendTelegram_fwd_messages(e, uid){

	var fwd_messages = 'Forwarded messages:\n***********************************************\n';
	console.log(e);
	e.forEach(function (val, key) {
		$.ajax({
			url: 'https://api.vk.com/method/users.get',
			type: 'get',
			dataType: 'jsonp',
			crossDomain: true,
			
			data: {user_ids: val.uid, access_token: VK.token},
		}).done(function(user) {
			e[key] = '    |  (VK)'+user.response[0].first_name+' '+user.response[0].last_name+':\n';
			e[key] += '    |  '+val.body+'\n';
			//messages.fwd_messages += '(VK)'+user.response[0].first_name+' '+user.response[0].last_name+':\n';
			//messages.fwd_messages += val.body+'\n';
			if((key+1) == e.length)
			{
				e.forEach(function (valu, keys) {
					console.log(valu);
					fwd_messages += valu;
				});
				fwd_messages += '\n***********************************************';
				sendTelegram(uid, fwd_messages);
			}
			/*messages.updates.forEach(function (val, key) {
				VK.messageReturn += val+'\n';
			});*/
		});
	});
}
function attachments(e, wall = true){
	console.log(e);
	e.forEach(function (val, key) {
		switch (e[key].type) {
			case 'video':
				//sendTelegramVideo(VK.uid, 0);
				console.log(e[key].video);
				messages.video[messages.video.length] = e[key].video;
				//if(e.length-1 == key)
				//	sendTelegramVideo(VK.uid, 0);
				break;
			case 'doc':
				// statements_1
				messages.doc[messages.doc.length] = e[key].doc.url;
				//if(e.length-1 == key)
				//	sendTelegramDoc(VK.uid, 0);
				break;
			case 'photo':
				// statements_1 src_big 137774
				console.log(e[key].photo.src_big);
				messages.photo[messages.photo.length] = e[key].photo.src_big;
				//if(e.length-1 == key)
				//	sendTelegramPhoto(VK.uid, 0);
				break;
			case 'audio':
				// statements_1 src_big 137774
				if(typeof e[key].audio.url !== "undefined")
					messages.audio[messages.audio.length] = e[key].audio.url;
				//if(e.length-1 == key && messages.audio.length)
				//	sendTelegramAudio(VK.uid, 0);
				break;
			case 'wall':
				if(typeof e[key].wall.text !== "undefined")
					messages.atext += '\n'+e[key].wall.text;
				if(typeof e[key].wall.attachments !== "undefined")
					attachments(e[key].wall.attachments, false);
				else
					sendTelegram(VK.uid);
				break;
		}
	});

	if (wall)
		for(key in messages)
		{
			switch (key) {
				case 'video':
					if(messages.video.length)
						sendTelegramVideo(VK.uid, 0);
					break;
				case 'audio':
					if(messages.audio.length)
						sendTelegramAudio(VK.uid, 0);
					break;
				case 'photo':
					if(messages.photo.length)
						sendTelegramPhoto(VK.uid, 0);
					break;
				case 'doc':
					if(messages.doc.length)
						sendTelegramDoc(VK.uid, 0);
					break;
			}
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
		//console.log(send);
		if(messages.atext !== undefined)
			VK.messageReturn += messages.atext+'\n';
		VK.messageReturn = VK.messageReturn.replace(/\<br\>/g, '\n');
		$.ajax({
		url: 'https://api.telegram.org/bot'+Telegram.token+'/sendMessage',
		type: 'GET',
		dataType: 'json',
		data: {chat_id: Telegram.chatId, text: VK.messageReturn},
		});
		clear();
	});
}
function sendTelegramVideo(uid, i)
{
	if(messages.video.length - i)
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
			if(messages.atext !== undefined)
				VK.messageReturn += messages.atext+'\n';
			VK.messageReturn = VK.messageReturn.replace(/\<br\>/g, '\n').replace('undefined\n', '');
			if(typeof messages.video[i].platform === "undefined")
				$.ajax({
				url: '/getVideoURL.php',
				type: 'get',
				dataType: 'html',
				data: {owner_id: messages.video[i].owner_id, videos: messages.video[i].owner_id+'_'+messages.video[i].vid+'_'+messages.video[i].access_key},
				}).done(function(urlVideo) {
					urlVideo = urlVideo.match(/https:\\\/\\\/cs[\\\/a-zA-Z\d\.\?\=\-\_]+.vkuservideo.net+[\\\/a-zA-Z\d\.\?\=\-\_]+/g);
					console.log(urlVideo);
						for(var k = 0; k < tmp.length;k++)
						{
							if(urlVideo[urlVideo.length-1].indexOf(tmp[k]))
							{
								urlVideo = urlVideo[urlVideo.length-1].replace(/\\/g,'');
								break;
							}
						}
					//console.log(urlVideo);
					//sendTelegram(VK.uid, false, [urlVideo, e.vid]);
					VK.messageReturn += 'First link: https://vk.com/video'+messages.video[i].owner_id+'_'+messages.video[i].vid+'\nSecond link: '+urlVideo;
					$.ajax({
					url: 'https://api.telegram.org/bot'+Telegram.token+'/sendVideo',
					type: 'get',
					dataType: 'json',
					data: {chat_id: Telegram.chatId, caption: VK.messageReturn, video: urlVideo},
					}).done(function() {
						messages.atext = undefined;
						sendTelegramVideo(uid, i+1);
					});
					
				});
			else
				$.ajax({
					url: 'https://api.vk.com/method/video.get',
					type: 'get',
					dataType: 'jsonp',
					crossDomain: true,
					data: {videos: messages.video[i].owner_id+'_'+messages.video[i].vid+'_'+messages.video[i].access_key, access_token: VK.token},
				}).done(function(playerURL) {
					VK.messageReturn += 'First link: https://vk.com/video'+messages.video[i].owner_id+'_'+messages.video[i].vid+'\nSecond link: '+playerURL.response[1].player;
					$.ajax({
					url: 'https://api.telegram.org/bot'+Telegram.token+'/sendMessage',
					type: 'GET',
					dataType: 'json',
					data: {chat_id: Telegram.chatId, text: VK.messageReturn},
					}).done(function() {
						messages.atext = undefined;
						sendTelegramVideo(uid, i+1);
					});
				});
		});
	}
	else{
		messages.video = [];
	}
}
function sendTelegramPhoto(uid, i)
{
	if(messages.photo.length - i)
	{
		$.ajax({
			url: 'https://api.vk.com/method/users.get',
			type: 'get',
			dataType: 'jsonp',
			crossDomain: true,
			data: {user_ids: uid, access_token: VK.token},
		}).done(function(user) {
			VK.messageReturn = '(VK)'+user.response[0].first_name+' '+user.response[0].last_name+':\n'
			if(messages.atext !== undefined)
				VK.messageReturn += messages.atext+'\n';
			VK.messageReturn = VK.messageReturn.replace(/\<br\>/g, '\n').replace('undefined\n', '');

			VK.messageReturn += messages.photo[i];
			$.ajax({
			url: 'https://api.telegram.org/bot'+Telegram.token+'/sendMessage',
			type: 'GET',
			dataType: 'json',
			data: {chat_id: Telegram.chatId, text: VK.messageReturn},
			}).done(function() {
				messages.atext = undefined;
				sendTelegramPhoto(uid, i+1);
			});
		});
	}
	else{
		messages.photo = [];
	}
}
function sendTelegramAudio(uid, i)
{
	if(messages.audio.length - i)
	{
		$.ajax({
			url: 'https://api.vk.com/method/users.get',
			type: 'get',
			dataType: 'jsonp',
			crossDomain: true,
			data: {user_ids: uid, access_token: VK.token},
		}).done(function(user) {
			VK.messageReturn = '(VK)'+user.response[0].first_name+' '+user.response[0].last_name+':\n'
			if(messages.atext !== undefined)
				VK.messageReturn += messages.atext+'\n';
			VK.messageReturn = VK.messageReturn.replace(/\<br\>/g, '\n').replace('undefined\n', '');

			VK.messageReturn += messages.audio[i];
			$.ajax({
			url: 'https://api.telegram.org/bot'+Telegram.token+'/sendMessage',
			type: 'GET',
			dataType: 'json',
			data: {chat_id: Telegram.chatId, text: VK.messageReturn},
			}).done(function() {
				messages.atext = undefined;
				sendTelegramAudio(uid, i+1);
			});
		});
	}
	else{
		messages.audio = [];
	}
}
function sendTelegramDoc(uid, i)
{
	if(messages.doc.length - i)
	{
		$.ajax({
			url: 'https://api.vk.com/method/users.get',
			type: 'get',
			dataType: 'jsonp',
			crossDomain: true,
			data: {user_ids: uid, access_token: VK.token},
		}).done(function(user) {
			VK.messageReturn = '(VK)'+user.response[0].first_name+' '+user.response[0].last_name+':\n'
			if(messages.atext !== undefined)
				VK.messageReturn += messages.atext+'\n';
			VK.messageReturn = VK.messageReturn.replace(/\<br\>/g, '\n').replace('undefined\n', '');

			VK.messageReturn += messages.doc[i];
			$.ajax({
			url: 'https://api.telegram.org/bot'+Telegram.token+'/sendMessage',
			type: 'GET',
			dataType: 'json',
			data: {chat_id: Telegram.chatId, text: VK.messageReturn},
			}).done(function() {
				messages.atext = undefined;
				sendTelegramDoc(uid, i+1);
				console.log(i);
				console.log(messages.doc);
			});
		});
	}
	else{
		messages.doc = [];
	}
}