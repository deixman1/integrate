//https://api.telegram.org/bot426929260:AAEW5BWWoPXcBGNCgtwrBRRcTnBV8tcxuTY/getUpdates?offset=0
//https://api.telegram.org/bot426929260:AAEW5BWWoPXcBGNCgtwrBRRcTnBV8tcxuTY/sendMessage?chat_id=-1001143659191&text=asddsa
//https://api.vk.com/method/messages.get?out=0&count=1&&access_token=203d08e37d16cbe5c034431933a5455e7ee86b69e90c51f6173bf3370d68be83b692bc4282de84adec98b
//https://api.vk.com/method/photos.getMessagesUploadServer?upload_url=https://pp.userapi.com/c638119/v638119018/554e1/_O0LMe1FaPY.jpg&access_token=203d08e37d16cbe5c034431933a5455e7ee86b69e90c51f6173bf3370d68be83b692bc4282de84adec98b
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
	token: '203d08e37d16cbe5c034431933a5455e7ee86b69e90c51f6173bf3370d68be83b692bc4282de84adec98b',
	message: ' ',
	img: '',
	video: '',
	doc: '',
	firstname: '',
	lastname: '',
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
				VK.img = e.response[1].attachment.photo.src_big;
				}catch(err){
				}
				try{
				VK.img = e.response[1].attachment.wall.attachment.photo.src_big;
				VK.message = e.response[1].attachment.wall.text;
				}catch(err){
				}
				try{
				VK.video = 'https://vk.com/video'+e.response[1].attachment.wall.attachment.video.owner_id+'_'+e.response[1].attachment.wall.attachment.video.vid;
				}catch(err){
				}
				try{
				VK.doc = e.response[1].attachment.wall.attachment.doc.url;
				}catch(err){
				}
				try{
				VK.doc = e.response[1].attachment.doc.url;
				}catch(err){
				}
				try{
				VK.video = 'https://vk.com/video'+e.response[1].attachment.video.owner_id+'_'+e.response[1].attachment.video.vid;
				}catch(err){
				}
				$.ajax({
					url: 'https://api.vk.com/method/users.get',
					type: 'get',
					dataType: 'jsonp',
					crossDomain: true,
					data: {user_ids: e.response[1].uid, access_token: VK.token},
				}).done(function(user) {
					VK.firstname = user.response[0].first_name;
					VK.lastname = user.response[0].last_name;
					VK.messageReturn = '(VK)'+VK.firstname+' '+VK.lastname+': '+VK.message+' '+VK.img+''+VK.video+''+VK.doc;
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
				//console.log(VK);
			}
	});
},1000);