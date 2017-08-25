//https://api.telegram.org/bot426929260:AAEW5BWWoPXcBGNCgtwrBRRcTnBV8tcxuTY/getUpdates?offset=0
//https://api.telegram.org/bot426929260:AAEW5BWWoPXcBGNCgtwrBRRcTnBV8tcxuTY/sendMessage?chat_id=-1001143659191&text=asddsa
//https://api.vk.com/method/messages.get?out=0&count=1&&access_token=203d08e37d16cbe5c034431933a5455e7ee86b69e90c51f6173bf3370d68be83b692bc4282de84adec98b
//https://api.vk.com/method/photos.getMessagesUploadServer?upload_url=https://pp.userapi.com/c638119/v638119018/554e1/_O0LMe1FaPY.jpg&access_token=203d08e37d16cbe5c034431933a5455e7ee86b69e90c51f6173bf3370d68be83b692bc4282de84adec98b
//https://api.vk.com/method/video.get?videos=335456267_456240107_6e75c35eca16c1c3a3&access_token=203d08e37d16cbe5c034431933a5455e7ee86b69e90c51f6173bf3370d68be83b692bc4282de84adec98b
var Telegram = {
	offset: 0,
	token: '426929260:AAEW5BWWoPXcBGNCgtwrBRRcTnBV8tcxuTY',
	chatId: -1001143659191,
	message: '',
	img: 'IMG',
	username: '',
	messageReturn: '',
};
var VK = {
	last_message: 0,
	//token: 'f4c5696a8e6bce620bd8cd0f20c51f34891380a465db2a4bfa6fa92b7b277cc32eddec8bce375d3377274',
	token: '0f6455faf4ae674305cd240ea8136749e70b171f21427ad9fb6cae93b0f350d6181efd0908da4b2397e95',
	message: ' ',
	img: '',
	video: '',
	doc: '',
	firstname: '',
	lastname: '',
	access_key: '',
	messageReturn: '',
};
var stats = {
	vk: 0,
	telegram: 0,
};
//console.log(Telegram);
setInterval(function(){
	$.ajax({
		url: 'https://api.telegram.org/bot'+Telegram.token+'/getUpdates',
		type: 'GET',
		dataType: 'json',
		data: {offset: Telegram.offset},
	})
	.done(function(e) {
		//console.log(e);
		try{
			Telegram.offset = e.result[0].update_id+1;
			//Telegram.chatId = e.result[0].message.chat.id;
			Telegram.message = (e.result[0].message.text == undefined) ? '' : e.result[0].message.text;
			if(e.result[0].message.photo === undefined && e.result[0].message.sticker === undefined && e.result[0].message.document === undefined)
			{
				//Telegram.img = 'IMG';
				Telegram.username = e.result[0].message.from.username;
				if(Telegram.message[0] == '!')
				{
					Telegram.messageReturn = Telegram.message;
				}
				else
				{
					if(Telegram.message == '/stats')
					{
						Telegram.messageReturn = 'Сообщений в вк: '+stats.vk+'\nСообщений в телеграме: '+stats.telegram;
						$.ajax({
						url: 'https://api.telegram.org/bot'+Telegram.token+'/sendMessage',
						type: 'GET',
						dataType: 'json',
						data: {chat_id: Telegram.chatId, text: Telegram.messageReturn},
						});
						return;
					}
					else
					{
						Telegram.messageReturn = '(Telegram)'+Telegram.username+': '+Telegram.message.replace(/Тͥͥ/g, 'я сосу хуй ');//+' '+Telegram.img;
					}
				}
			}
			else {
				Telegram.username = e.result[0].message.from.username;
				Telegram.messageReturn = '(Telegram)'+Telegram.username+': '+Telegram.message+' IMG';
				//Telegram.img = '';
			}
			stats.telegram++;
			$.ajax({
				url: 'https://api.vk.com/method/messages.send',
				type: 'get',
				dataType: 'jsonp',
				crossDomain: true,
				data: {chat_id: 3, message: Telegram.messageReturn, access_token: VK.token},
				});
		}catch(err)
		{}
	});
	$.ajax({
		url: 'https://api.vk.com/method/messages.get',
		type: 'get',
		dataType: 'jsonp',
		crossDomain: true,
		data: {out: 0, count: 1, access_token: VK.token},
	})
	.done(function(e) {
		//console.log(e);
		//console.log(e.response[1].mid);
		
			if(VK.last_message != e.response[1].date && VK.last_message < e.response[1].date && e.response[1].chat_id == 3)
			{
				VK.last_message = e.response[1].date;
				VK.message = e.response[1].body;
				try{
					if(e.response[1].attachment.doc.title == 'voice_message.webm')
					{
						VK.doc = e.response[1].attachment.doc.url;
						sendTelegramVoice(e, VK.doc);
						return;
					}
				}catch(err){
				}
				try{
				VK.doc = e.response[1].attachment.wall.attachment.doc.url;
				sendTelegramDocument(e, VK.doc);
				return;
				}catch(err){
				}
				try{
				VK.doc = e.response[1].attachment.doc.url;
				sendTelegramDocument(e, VK.doc);
				return;
				}catch(err){
				}
				try{
				VK.audio = e.response[1].attachment.audio.url;
				sendTelegramAudio(e, VK.audio);
				return;
				}catch(err){
				}
				try{
				VK.img = e.response[1].attachment.photo.src_big;
				sendTelegramPhoto(e, VK.img);
				return;
				}catch(err){
				}
				try{
				VK.img = e.response[1].attachment.wall.attachment.photo.src_big;
				VK.message = e.response[1].attachment.wall.text;
				sendTelegramPhoto(e, VK.img);
				return;
				}catch(err){
				}
				try{
				VK.img = e.response[1].attachment.wall.attachment.photo.src_big;
				VK.message = e.response[1].attachment.wall.text;
				sendTelegramPhoto(e, VK.img);
				return;
				}catch(err){
				}
				try{
					//console.log(e);
				VK.videoURL = 'https://vk.com/video'+e.response[1].attachment.wall.attachment.video.owner_id+'_'+e.response[1].attachment.wall.attachment.video.vid;
				$.ajax({
					url: 'https://api.vk.com/method/video.get',
					type: 'get',
					dataType: 'jsonp',
					crossDomain: true,
					async: false,
					data: {videos: e.response[1].attachment.wall.attachment.video.owner_id+'_'+e.response[1].attachment.wall.attachment.video.vid+'_'+e.response[1].attachment.wall.attachment.video.access_key, access_token: VK.token},
				}).done(function(getVideo) {
					//console.log(getVideo);
					VK.video = getVideo.response[1].player;
					VK.message = e.response[1].attachment.wall.text;
					console.log(encodeURIComponent(VK.video));
					if(VK.video.indexOf('you') == -1)
					$.ajax({
						url: '/getVideoURL.php',
						type: 'get',
						dataType: 'json',
						async: false,
						data: {url: encodeURIComponent(VK.video)},
					}).done(function(getVideoURL) {
						console.log(getVideoURL);
						if(getVideoURL)
						{
							sendTelegramVideo(e, getVideoURL);
						}
						else
						{
							VK.message += '\nПриватное видео'
							sendTelegram(e);
						}
					});
					else
						sendTelegram(e);
					//sendTelegram(e);
					//VK.message = e.response[1].attachment.wall.text;
					//sendTelegram(e);
				});
				return;
				}catch(err){
				}
				try{
				VK.message = e.response[1].attachment.wall.text;
				sendTelegram(e);
				return;
				}catch(err){
				}
				try{
				VK.videoURL = 'https://vk.com/video'+e.response[1].attachment.video.owner_id+'_'+e.response[1].attachment.video.vid;
				$.ajax({
					url: 'https://api.vk.com/method/video.get',
					type: 'get',
					dataType: 'jsonp',
					crossDomain: true,
					async: false,
					data: {videos: e.response[1].attachment.video.owner_id+'_'+e.response[1].attachment.video.vid+'_'+e.response[1].attachment.video.access_key, access_token: VK.token},
				}).done(function(getVideo) {
					//console.log(getVideo);
					VK.video = getVideo.response[1].player;
					//VK.message = e.response[1].attachment.wall.text;
					console.log(encodeURIComponent(VK.video));
					if(VK.video.indexOf('you') == -1)
					$.ajax({
						url: '/getVideoURL.php',
						type: 'get',
						dataType: 'json',
						async: false,
						data: {url: encodeURIComponent(VK.video)},
					}).done(function(getVideoURL) {
						console.log(getVideoURL);
						if(getVideoURL)
						{
							sendTelegramVideo(e, getVideoURL);
						}
						else
						{
							VK.message += '\nПриватное видео'
							sendTelegram(e);
						}
					});
					else
						sendTelegram(e);
					//sendTelegram(e);
					//VK.message = e.response[1].attachment.wall.text;
					//sendTelegram(e);
				});
				return;
				}catch(err){
				}
				sendTelegram(e);
				//console.log(VK);
			}
	});
},1000);

function sendTelegram(e)
{
	$.ajax({
		url: 'https://api.vk.com/method/users.get',
		type: 'get',
		dataType: 'jsonp',
		crossDomain: true,
		data: {user_ids: e.response[1].uid, access_token: VK.token},
	}).done(function(user) {
		VK.firstname = user.response[0].first_name;
		VK.lastname = user.response[0].last_name;
		VK.messageReturn = '(VK)'+VK.firstname+' '+VK.lastname+':\n'+VK.message+'\n'+VK.video;
		VK.messageReturn = VK.messageReturn.replace(/\<br\>/g, '\n');
		VK.img = '';
		VK.video = '';
		VK.doc = '';
		stats.vk++;
		$.ajax({
		url: 'https://api.telegram.org/bot'+Telegram.token+'/sendMessage',
		type: 'GET',
		dataType: 'json',
		data: {chat_id: Telegram.chatId, text: VK.messageReturn},
		});

	});
}
function sendTelegramVideo(e, urlVideo)
{
	$.ajax({
		url: 'https://api.vk.com/method/users.get',
		type: 'get',
		dataType: 'jsonp',
		crossDomain: true,
		async: false,
		data: {user_ids: e.response[1].uid, access_token: VK.token},
	}).done(function(user) {
		VK.firstname = user.response[0].first_name;
		VK.lastname = user.response[0].last_name;
		VK.messageReturn = '(VK)'+VK.firstname+' '+VK.lastname+':\n'+VK.message+'\n'+VK.video;
		VK.messageReturn = VK.messageReturn.replace(/\<br\>/g, '\n');
		VK.img = '';
		VK.video = '';
		VK.doc = '';
		stats.vk++;
		//console.log(e);
		$.ajax({
		url: '/sendvideo.php',
		type: 'GET',
		async: false,
		dataType: 'json',
		data: {token: Telegram.token, caption: VK.messageReturn, url: urlVideo},
		}).done(function(b){
			console.log(b);
		});
	});
}
function sendTelegramPhoto(e, urlPhoto)
{
	$.ajax({
		url: 'https://api.vk.com/method/users.get',
		type: 'get',
		dataType: 'jsonp',
		crossDomain: true,
		data: {user_ids: e.response[1].uid, access_token: VK.token},
	}).done(function(user) {
		VK.firstname = user.response[0].first_name;
		VK.lastname = user.response[0].last_name;
		VK.messageReturn = '(VK)'+VK.firstname+' '+VK.lastname+':\n'+VK.message;
		VK.messageReturn = VK.messageReturn.replace(/\<br\>/g, '\n');
		VK.img = '';
		VK.video = '';
		VK.doc = '';
		stats.vk++;
		$.ajax({
		url: 'https://api.telegram.org/bot'+Telegram.token+'/sendPhoto',
		type: 'GET',
		dataType: 'json',
		data: {chat_id: Telegram.chatId, caption: VK.messageReturn, photo: urlPhoto},
		});
	});
}
function sendTelegramDocument(e, urlDocument)
{
	$.ajax({
		url: 'https://api.vk.com/method/users.get',
		type: 'get',
		dataType: 'jsonp',
		crossDomain: true,
		data: {user_ids: e.response[1].uid, access_token: VK.token},
	}).done(function(user) {
		VK.firstname = user.response[0].first_name;
		VK.lastname = user.response[0].last_name;
		VK.messageReturn = '(VK)'+VK.firstname+' '+VK.lastname+':\n'+VK.message+'\n'+VK.doc;
		VK.messageReturn = VK.messageReturn.replace(/\<br\>/g, '\n');
		VK.img = '';
		VK.video = '';
		VK.doc = '';
		stats.vk++;
		$.ajax({
		url: 'https://api.telegram.org/bot'+Telegram.token+'/sendDocument',
		type: 'GET',
		dataType: 'json',
		data: {chat_id: Telegram.chatId, caption: VK.messageReturn, document: urlDocument},
		});
	});
}
function sendTelegramAudio(e, urlAudio)
{
	$.ajax({
		url: 'https://api.vk.com/method/users.get',
		type: 'get',
		dataType: 'jsonp',
		crossDomain: true,
		data: {user_ids: e.response[1].uid, access_token: VK.token},
	}).done(function(user) {
		VK.firstname = user.response[0].first_name;
		VK.lastname = user.response[0].last_name;
		VK.messageReturn = '(VK)'+VK.firstname+' '+VK.lastname+':\n'+VK.message+'\n'+VK.audio;
		VK.messageReturn = VK.messageReturn.replace(/\<br\>/g, '\n');
		VK.img = '';
		VK.video = '';
		VK.doc = '';
		stats.vk++;
		$.ajax({
		url: 'https://api.telegram.org/bot'+Telegram.token+'/sendAudio',
		type: 'GET',
		dataType: 'json',
		data: {chat_id: Telegram.chatId, caption: VK.messageReturn, audio: urlAudio},
		});
	});
}
function sendTelegramVoice(e, urlAudio)
{
	$.ajax({
		url: 'https://api.vk.com/method/users.get',
		type: 'get',
		dataType: 'jsonp',
		crossDomain: true,
		data: {user_ids: e.response[1].uid, access_token: VK.token},
	}).done(function(user) {
		VK.firstname = user.response[0].first_name;
		VK.lastname = user.response[0].last_name;
		VK.messageReturn = '(VK)'+VK.firstname+' '+VK.lastname+':\n'+VK.message;
		VK.messageReturn = VK.messageReturn.replace(/\<br\>/g, '\n');
		VK.img = '';
		VK.video = '';
		VK.doc = '';
		stats.vk++;
		$.ajax({
		url: 'https://api.telegram.org/bot'+Telegram.token+'/sendVoice',
		type: 'GET',
		dataType: 'json',
		data: {chat_id: Telegram.chatId, caption: VK.messageReturn, voice: urlAudio},
		});
	});
}