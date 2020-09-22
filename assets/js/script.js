
$(document).ready(function(){

	// Available Pages

	 let pages = ["home","watch","marketplace","groups","gaming","messages","photo","stories","settings"];

	// Messages
	let openTabMessages = [];
	let openTab = [];
	let openMainMessages = GetParameterValues("t");
	
	// Story 
	let PlayStory = false;
	let storyUserStart = null;
	let StoryObjTarget = null;
	let allHasStory = [];

	// Editor
	let ImageFilters = [];
	let AllFilters = [];
	let draw = false;

	let openedProfile = null;

	$(document).on("click",".all-contacts .right-content-content",function(){
		let name = $(this).find("div").eq(0).html();
		let picture = $(this).find("img").attr("src");
		let color = "#0084FF";
		let id = $(this).find("div").eq(0).data("id");
		createNewChatBox({
			id:id,
			name:name,
			picture:picture,
			color:color
		});
	});

	$(document).on("click",".message-inbox li",function(){
		let name = $(this).find("div").find("span").html();
		let picture = $(this).find("img").attr("src");
		let color = "#0084FF";
		let id = $(this).data("id");

		if($(this).parent().parent().hasClass('message-li-list')){
			$(this).parent().parent().css("display","none");
			$(".nav-right .circles .item").removeClass("active");
			createNewChatBox({
				id:id,
				name:name,
				picture:picture,
				color:color
			});
		}else{
			createNewMainChatBox({
				id:id,
				name:name,
				picture:picture,
				color:color
			});
			console.log("Awd")
		}

	});
	$(document).on("click",".tab-call",function(){
		let token = $(this).parent().data("token");
		let name = $(this).parent().data("name");

		$.getJSON('data/getUserinformation.php', {user: name}, function(json, textStatus) {
			sendCallRequest(json.id);
		});

	});
	$(document).on("click",".tab-videocall",function(){
		let token = $(this).parent().data("token");
		let name = $(this).parent().data("name");
		$.getJSON('data/getUserinformation.php', {user: name}, function(json, textStatus) {
			
		});
	});

	function onLoadVidyoioApi(status){
		console.log(status)
	}

	function sendCallRequest(to_id){
		$.ajax({
			url:"client/clients.php",
			type:"POST",
			data:{action:"send_call_request",id:to_id},
			success:function(){

			}
		});
	}
	function acceptCallRequest(from_id,to_id){
		$.ajax({
			url:"client/clients.php",
			type:"POST",
			data:{action:"accept_call_request",from_id,to_id},
			success:function(){

			}
		});
	}
	$(document).on("click",".tab-close",function(){
		let token = $(this).parent().data("token");
		let name = $(this).parent().data("name");
		$(".m-"+token).remove();
		openTab.splice(name);
	});
	$(document).on("click",".tab-minimize",function(){
		let token = $(this).parent().data("token");
		let name = $(this).parent().data("name");
		let picture = $(this).parent().data("picture");

		$(".m-"+token).hide();
		if(!openTabMessages.includes(name)){
			openTabMessages.push(name);
			createNewChatBoxShortcut({
				name:name,picture:picture,token:token
			});
		}
	});
	$(document).on("click",".float-box .item img",function(){
		let token = $(this).parent().data("token");
		let name = $(this).parent().data("name");

		$(".m-"+token).show();
			$(this).parent().remove();
			openTabMessages.splice(name);
	});
	$(document).on("click",".float-box .item .button",function(){
		$(this).parent().remove();
	});
	$(document).on("click",".nav-right .circles .item",function(){
		let menu = $(this).find("div").html().toLowerCase();

		$(".menu-menu").not($(".menu-"+menu)).css("display","none");
		
		$(".nav-right .circles .item").not($(this)).removeClass("active");
		if($(".menu-"+menu).is(":visible")){
			$(".menu-"+menu).css("display","none");
			$(this).removeClass("active");
		}else{
			$(".menu-"+menu).css("display","block");
			$(this).addClass("active");
		}

		menu == "messenger" ? fetchinbox() : false;
	});

	$(document).on("click",".switch",function(){
		let value = $(this).find("div").attr("value");
		let val;
		let width = $(this).find("div").width();
		if(value == "off"){
			val = "on"; 
			$(this).find("div").css("margin-left","+="+width);
			$(this).addClass("active");
			if($(this).hasClass('image-filter')){
				let filter = $(this).data("value");
				addFilterToImage($(".appended-image-background"),filter,true,true,true);
			}else if($(this).hasClass('story-image-filter')){
				let filter = $(this).data("value");
				addFilterToImage(StoryObjTarget,filter,true,true,false);
			}

		}else{
			val = "off";
			$(this).find("div").css("margin-left","0px");
			$(this).removeClass("active");
			if($(this).hasClass('image-filter')){
				let filter = $(this).data("value");
				addFilterToImage($(".appended-image-background"),filter,false,true,true);
			}else if($(this).hasClass('story-image-filter')){
				let filter = $(this).data("value");
				addFilterToImage(StoryObjTarget,filter,false,true,false);
			}
		}
		$(this).find("div").attr("value",val);
	});

	function addFilterToImage(img,filter,bool,value,isJquery){
		if(filter != "combine"){
			if(value){
				 value = getFilterDefaultValue(filter);
			}
			let filters = {grayscale:"grayscale("+ value +")",sepia:"sepia("+ value +")",blur:"blur("+ value +")",saturate:"saturate("+ value +")",hue:"hue-rotate("+ value +")",invert:"invert("+ value +")",darken:"brightness("+ value +")",contrast:"contrast("+ value +")"};
			let finalFilter = "";
			if(bool){
				ImageFilters.push(filters[filter]);
				AllFilters.push(filter);
			}else{
				ImageFilters.splice(filters[filter]);
				AllFilters.splice(filter);
			}
			for(let i = 0; i < ImageFilters.length; i++){
				finalFilter += ImageFilters[i] + " ";
			}
			if(isJquery){
				img.css("filter",finalFilter);
			}else{
				img.style.filter = finalFilter;
			}
			
		}
		if(isJquery){
			if(img.hasClass('combine')){
				img.removeClass('combine');
			}else{
				if(filter == "combine"){
					img.addClass('combine');
				}
				
			}		
		}else{
			if(img.classList.contains('combine')){
				img.classList.remove('combine');
			}else{
				img.classList.add('combine');
			}
		}

	
	}
	
	function getFilterDefaultValue(filter){
	let filters = {grayscale:"1",sepia:"100%",blur:"5px",saturate:"2",hue:"140deg",invert:".8",darken:".5",contrast:"2"};
		return filters[filter];
	}
	function darkmode(){
		let darkmode = $(".darkmode").attr("value");

	}

	$(document).on("click",".center-content",function(){
			closeAllOpenTabs()
	});
	$(document).on("click",".left-content",function(){
			closeAllOpenTabs()
	});
	$(document).on("click",".right-content",function(){
			closeAllOpenTabs()
	});
	$(document).on("keypress",".message-textarea",function(e){

		let code = e.keyCode;
		let message = $(this).html();
		let reciever = $(this).parent().data("id");
		let token = $(this).parent().data("token");
		let color = $(this).parent().data("color");
		let emoji =  false;

		if($(this).html().length != 0){
			$(this).addClass("focus");
		}else{
			$(this).removeClass('focus');
		}
		if(code == 13 && $(this).html().length != 0){
			if(e.shiftKey){

			}else{
				let isTyping = "no";
				e.preventDefault();



				$(this).html("");
				
				isUserTyping({
				reciever,message,token,color,isTyping
				});
				
				sendMessageRequest({
					reciever,message,token,color,emoji
				});				
							
			}
			
		}
	});
	$(document).on("focus",".message-textarea",function(){
		messageContentBorderRadius();
		let message = $(this).html();
		let reciever = $(this).parent().data("id");
		let token = $(this).parent().data("token");
		let color = $(this).parent().data("color");


		if(message.length == 0){
			isTyping = "no";
		}else{
			isTyping = "yes";
		}
		isUserTyping({
			reciever,message,token,color,isTyping
		});
		colorFillIconSvgInChatBox(token,color);


	});
	$(document).on("blur",".message-textarea",function(){
		
		let message = $(this).html();
		let reciever = $(this).parent().data("id");
		let token = $(this).parent().data("token");
		let color = $(this).parent().data("color");
		let isTyping = "no";
		isUserTyping({
			reciever,message,token,color,isTyping
		});
		messageContentBorderRadius();
		colorFillIconSvgInChatBox(token,"#E4E6EB");
				$(this).removeClass('focus');
	});
	$(document).on("click",".message-container #body",function(){
		let token = $(this).parent().data("token");
		let color = $(this).parent().data("color");
		colorFillIconSvgInChatBox(token,color);
	});
	$(document).on("click",".user-post-container #video-content video",function(){
		let video = $(this).get(0);

		if(video.pause){
			video.play();
				return false
		}else{
			video.pause();
		}
	
	});
		$(document).on("click",".layout .item",function(){
		let view = $(this).data("view");
		let newTitle;
		let newIcon;
		$(view).css("display","block");

		$(".view").not(view).css("display","none");
		$("html,body").animate({
			scrollTop: 0
		},500);

		if(view == "facebook"){
			newTitle = "Jhon Orlan Tero | Facebook";
			newIcon = "image/facebook-logo.png";
		}else if(view == "twitter"){
			newTitle = "Jhon Orlan Tero | Twitter";
			newIcon = "image/twitter-logo.png";
		}else if(view == "instagram"){
			newTitle = "Jhon Orlan Tero | Instagram";
			newIcon = "image/Instagram.png";
		}
		changeTitle(newTitle);
		changeFavicon(newIcon);
	});
	$(document).on("click",".open-profile",function(){
		$(".profile-body").css("display","block");
		$(".home-body").css("display","none");
		$(this).addClass('active');
		$.getJSON('data/getSession.php', function(session, textStatus) {
			changeUrl(session)
			getProfile(session);
		});
		removeFilledActiveItemInNav();
	});
	$(document).on("click",".open-home",function(){
		$(".profile-body").css("display","none");
		$(this).addClass('active');
		$(".open-profile").removeClass("active");
		$(".home-body").css("display","block");
	});
	$(document).on("click",".open-messenger",function(){
		openMessenger()
	});
	function openMessenger(id){
		let newUrl = id == null || id == undefined ? "messages" : "messages?t="+id;
		changeUrl(newUrl);
		checkUrl();
		fetchinbox();
	}
	$(document).on("click",".nav-center .item",function(){
		let tab = $(this).find("div").html().toLowerCase();
		if(tab != "more"){
			switchTab(tab);
		activeTab($(this));
		changeUrl(tab);

		$(".nav-center .item").each(function(){
			let button = $(this).find("div").html().toLowerCase();

			if(tab != button){
				handleTab($(this));
			}
		});
		}
		
	});
	
	$(document).on("focus",".post-text-area",function(){
		$(".newPostTextArea-container").css("display","flex");
	});
	$(document).on("click",".newPostTextArea-container .background",function(){
		
		$(".newPostTextArea-container").css("display","none");


		
	});
	$(document).on("click",".newPostTextArea-container .close",function(){
		$(".newPostTextArea-container").css("display","none");
	});
	$(".theme-container .item").each(function(){
		let bg = $(this).data("bg");
		$(this).css("background",bg);
	});
	$(document).on("click",".main-theme-button",function(){
	
		if($(".all-themes").is(":visible")){
				$(".all-themes").slideUp();
		}else{
				$(".all-themes").slideDown();
		}
	});
	$(document).on("click",".all-themes .item",function(){
		let background = $(this).data("bg");
		
		if($(".newPostTextArea #body .main-container").hasClass("theme")){
			if(background == "#FFF"){
				$(".newPostTextArea #body .main-container").removeClass("theme");
			}
		}else{
			$(".newPostTextArea #body .main-container").addClass("theme");
		}

		$(".newPostTextArea #body .main-container").css("background",background);
		$(".text-area-background").val(background);

	});

	$(document).on("click",".setting",function(){
		$(this).parent().parent().find("div").eq(0).toggle();
	});

	$(document).on("click",".message-container #body",function(){

	});

	$(document).on("submit",".post-container-form",function(){

		let formdata = new FormData($(this)[0]);

		$.ajax({
			url: 'data/insertPost.php',
			type: 'POST',
			cache:false,
			processData:false,
			contentType:false,
			data: formdata,
		})
		.done(function(data) {
			fetchAllPosts();
		})
		.fail(function() {
			
		})
		.always(function() {
			$(".post-main-container").css("display","none");
			$(".post-main-container input").val("");
			$(".post-main-container contenteditable").html("");

		});
	});
	$(document).on("input",".main-text-area",function(){
		let val = $(this).html();
		$(".my-post-text").val(val);
	});
	$(document).on("click",".upload-images-button",function(){
		$(".text-area-images").click();
	});
	$(document).on("change",".text-area-images",function(event){
		let files = document.querySelector(".text-area-images").files.length;
		for(let i = 0; i < files; i++){
			$(".post-image-preview").append("<img src='"+ URL.createObjectURL(event.target.files[i]) +"' class='images-"+i+"' >");
		}
		$(".hasimage").val("yes");
	});

	$(document).on("click",".main-like-post",function(){
		let id = $(this).parent().data("id");
		let action = $(this).find("span").html().toLowerCase();
		let react = $(this).find("span").html();
		let src = "image/reactions/svg/like.svg";

		$.ajax({
			url:"client/postManagement.php",
			type:"POST",
			data:{action:action,id:id},
			success:function(){
				fetchReaction(id);

				$(".react-buttons").each(function(){
					let post_id = $(this).data("id");

					if(id == post_id){
						$(this).find("div").eq(0).find("span").html(react);
						$(this).find("div").eq(0).find("img").attr("src",src)
					}
				});
			}
		});
	});
	$(document).on("click",".reaction-container .item",function(){
		let id = $(this).parent().data("id");
		let react = $(this).find("span").html();
		let action = $(this).find("span").html().toLowerCase();
		let src = "image/reactions/svg/"+action+".svg";
		
		$.ajax({
			url:"client/postManagement.php",
			type:"POST",
			data:{action:action,id:id},
			success:function(data){
				if(data == "delete"){
					react = "Like";
					src = "svg/like.svg";
				}else if(data == "update" || data == "insert"){
					$.getJSON('data/getPostInformation.php', {post: id}, function(post, textStatus) {
						insertNewNotification({
							"event":"react",
							"react": react,
							"src":src,
							"photo":post.images,
							"post_id": post.post_id,
							"to_id":post.id,
							"to_username": post.username,
							"is_shared":null
						});
					});
				}
				fetchReaction(id);
				if(data !="undefined" || data != ""){
						$(".react-buttons").each(function(){
					let post_id = $(this).data("id");

					if(id == post_id){
						$(this).find("div").eq(0).find("span").html(react);
						$(this).find("div").eq(0).find("img").attr("src",src);
					}
					});
				}else{
					console.log("Failed, Theres something wrong");
				}

			}
		});
	});
	function fetchReaction(id){
		$.ajax({
			url:"data/fetchReaction.php",
			type:"POST",
			data:{id:id},
			success:function(data){
				$(".reactions-"+id).html(data);
				$(".reactions-"+id).removeClass('none');

			}
		});
	}
	$(document).on("mouseover",".main-like-post",function(){
		let id = $(this).parent().data("id");
		$(".reaction-container-"+id).css("visibility","visible");
	});
	$(document).on("mouseover",".reaction-container",function(){
		$(this).css({
			"visibility":"visible",
			"transition-delay":"0.2s"
		});
	});
	$(document).on("mouseout",".reaction-container",function(){	
		$(this).css({
			"visibility":"hidden",
			"transition-delay":"1s"
		});
	});
	$(document).on("mouseout",".main-like-post",function(){
		let id = $(this).parent().data("id");
		$(".reaction-container-"+id).css("visibility","hidden");
	});
	$(document).on("mouseover",".comment-reactions span",function(){
		let action = $(this).html().toLowerCase();
		let comment_id = $(this).data("comment_id");

		if(action == "like"){

			$(".comment-reaction-container-"+comment_id).css("visibility","visible");
			
		}
	});
	$(document).on("mouseout",".comment-reactions span",function(){
		let action = $(this).html().toLowerCase();
		let comment_id = $(this).data("comment_id");

		if(action == "like"){

			setTimeout(function(){
				$(".comment-reaction-container-"+comment_id).css("visibility","hidden");
			},2000);
			
		}
	});
	$(document).on("click",".profile-link",function(e){
		e.preventDefault();
		let user = $(this).attr("href");

		getProfile(user);
		changeUrl(user)
	});


	$(document).on("keypress",".comment-textarea",function(e){
		let code = e.keyCode;
		let post_id = $(this).parent().data("id");
		let comment = $(this).html();

		if(code == 13 && comment != "" ){
			if(e.shiftKey){


			}else{
				e.preventDefault();
				insertComment(post_id,comment);
				$(this).html("");
			}
		}
	});	

	$(document).on("click",".comment-reactions span",function(){
		let action = $(this).html().toLowerCase();
		let comment_id = $(this).data("comment_id");

		if(action == "reply"){

			$(".user-post-comment-textarea-container-"+comment_id).css("display","flex");
			
		}
	});
	$(document).on("click",".reply-reactions span",function(){
		let action = $(this).html().toLowerCase();
		let comment_id = $(this).parent().data("id");

		if(action == "reply"){

			$(".user-post-comment-textarea-container-"+comment_id).css("display","flex");
			
		}
	});
	$(document).on("keypress",".comment-reply-textarea",function(e){
		let code = e.keyCode;
		let comment_id = $(this).parent().data("id");
		let reply = $(this).html();
		let post_id = $(this).parent().data("post_id");


		if(code == 13 && reply != "" ){
			if(e.shiftKey){


			}else{
				e.preventDefault();
				insertCommentReply(comment_id,post_id,reply);
				$(this).html("");
			}
		}
	});
	$(document).on("click",".send-like",function(){
		let reciever = $(this).parent().data("id");
		let code = $(this).parent().data("code");
		let color = $(this).parent().data("color");
		let emoji = "Like";
		sendEmoji({
			reciever,token,emoji,color
		});
	});
	$(document).on("click",".post-images",function(){
		let id = $(this).data("id");
		let post = $(this).data("post");
		let index = $(this).data("index");
		let newUrl = "photo?id="+id+"&index="+index+"&post="+post;
		changeUrl(newUrl);
		checkUrl();

	});

	$(document).on("click",".stories-theme",function(){
		let src = $(this).find("img").data("theme");

		$(".main-story-preview").css({
			"background-image":"url("+ src +")",
			"background-repeat": "no-repeat",
			"object-fit": "fill",
			"background-size":"cover"
		})
	});
	$(document).on("click",".stories-theme-gradient",function(){
		let bg = $(this).css("background");

		$(".main-story-preview").css({
			"background":bg
		});
		
	});
	$(document).on("keypress",".story-main-textbox",function(e){
		if(e.keyCode == 13){
			$(this).val($(this).val() + "</br>");
		}
		setInterval(function(){
			let content = $(".story-main-textbox").val();

			$(".main-story-preview .main-textbox").html(content);
			if($(".main-story-preview .main-textbox").html() == ""){
				$(".main-story-preview .main-textbox").html("Start Typing");
			}
		});
	});
	$(document).on("click",".stories-picker.text",function(){

			$(".when-text-content").css("display","block");
			$(".stories-picker").hide();
			$(".story-main-content .preview-container").show();
			$(".footer.main").css("display","flex");
		
	});
	$(document).on("click",".stories-picker.photo",function(){
		$(".upload-photo-story").click();
	});
	$(document).on("change",".append-image-story",function(event){
		let files = document.querySelector(".append-image-story").files.length;
		let img;
		for(let i = 0; i < files; i++){
			let src =  URL.createObjectURL(event.target.files[i]);
			img = new Image();
			img.src = src;
			img.classList.add("appended-image");
			img.style.cursor = "grab";
			img.onload = function(){
				appendToStory(this);
				$(".main-story-preview .appended-image").draggable({
					 containment: $(".main-container"),
    				scroll: false
				});
			}
		}
	});
	$(document).on("change",".upload-photo-story",function(event){
			$(".when-image-content").css("display","block");
			$(".footer.main").css("display","flex");
			$(".stories-picker").hide();
			$(".story-main-content .preview-container").show();
		let files = document.querySelector(".upload-photo-story").files.length;
		let img;
		$(".main-story-preview").html("");
		$(".main-story-preview").css({
			"background":"#FFF",
		})
		for(let i = 0; i < files; i++){
			let src =  URL.createObjectURL(event.target.files[i]);
			img = new Image();
			img.src = src;
			img.classList.add("appended-image-background");
			img.onload = function(){
				appendToStory(this);
				let height = this.height;
				let Storyheight = $(".main-story-preview").height();

					if(Storyheight == height){
						$(".main-story-preview .appended-image-background").css("border-radius","10px");
					
					}
				
			}
		
		}

	});


	let SnapedStory = {data:null};
	$(document).on("click",".save-story",function(){
		snapDiv(document.getElementById("main-story-preview"));
		let response;
		if(SnapedStory.data != null){
			insertToStory({
				storyData: SnapedStory.data,
				privacy:"public",
				type:"story",
				with:null,
				tag:null
			});

		}else{
			setTimeout(function(){
				$(".save-story span").html("Share to Story");
			},1000);
		}

	});

	$(document).on("click",".settings-list",function(e){
		e.preventDefault();
		let href = $(this).attr("href");

		changeUrl(href);
		checkUrl();

		$(this).addClass("active");
		$(".settings-list").not($(this)).removeClass("active");

	});
	$(document).on("click",".settings-tab-section",function(e){
		e.preventDefault();
		let href = $(this).attr("href");

		changeUrl(href);
	});
	$(document).on("click",".list-picker .main-picker",function(){
		$(this).parent().find("div").each(function(){
			if($(this).hasClass('picker-container')){
				$(this).toggle();
			}
		});
	});
	$(document).on("click",".picker-container li",function(){
		let content = $(this).find("span").html();

		$(this).parent().toggle();
		
	$(this).parent().parent().find("div.main-picker").find("div.main-font").find("span").html(content);
	
	});
	$(document).on("click",".list-picker.add .main-picker .square",function(){
		let span = $(this).find("span").html();
		let content = "";

		if(span == "Text"){
			content = `
				<div class="appended-text">
					<div class="textarea" contenteditable placeholder="Aa">Type Something...</div>
				</div>
			`;
		}else if(span == "Image"){
			 $(".append-image-story").click();

		}else if(span == "Sticker"){

		}else if(span == "Draw"){
			createNewDrawingEditor()
			switchEditor("draw");

		}
		appendToStory(content);
	});
	$(document).on("click",".story-textarea",function(){
		let value  = $(this).find("div").attr("value");

		if(value == "on"){
			newValue = "off";
			$(".story-main-textbox").prop("disabled",false);
			$(".main-story-preview .main-textbox").show();
		}else{
			newValue = "on";
			$(".story-main-textbox").prop("disabled",true);
			$(".main-story-preview .main-textbox").hide();
		}
	});

	$(document).on("click",".textarea",function(){
		$(this).focus();
	});
	$(document).on("click",".view-more-brush-color",function(){
		let data = $(this).attr("value");

		if(data == "show"){
			$(this).attr("value","hide");
			Select255Colors(255,false,"brush-color");
		}else{
			$(this).attr("value","show");
			Select255Colors(16,true,"brush-color");
		}
		
	});
	$(document).on("click",".view-more-fonts-color",function(){
		let data = $(this).attr("value");

		if(data == "show"){
			$(this).attr("value","hide");
			Select255Colors(255,false,"fonts");
		}else{
			$(this).attr("value","show");
			Select255Colors(16,true,"fonts");
		}
		
	});
	$(document).on("click",".view-more-background-color",function(){
		let data = $(this).attr("value");

		if(data == "show"){
			$(this).attr("value","hide");
			Select255Colors(255,false,"text-background");
		}else{
			$(this).attr("value","show");
			Select255Colors(16,true,"text-background");
		}
		
	});

	$(document).on("click",".main-story-preview",function(e){
		let target = e.target;

		if(target.classList.contains("appended-text")){
			switchEditor("appended-text");
			StoryObjTarget = target;
			createNewFontEditor(target);
		}else if(target.parentNode.classList.contains('appended-text')){
			switchEditor("appended-text");
			StoryObjTarget = target;
			createNewFontEditor(target);
		}else if(target.classList.contains('appended-image-background')){
			switchEditor("appended-image-background");
			StoryObjTarget =  target;
		}else if(target.classList.contains('appended-image')){
			switchEditor("appended-image");
			StoryObjTarget = target;
			createNewImageEditor(target);
		}else{	
			if($(".story-draw-editor").is(":hidden")){
				switchEditor("no-target");
				StoryObjTarget = null;
			}
			
		}
	
	});
	function switchEditor(editor){
		switch(editor){
			case "appended-text":
				$(".when-text-content").css("display","none");
				$(".story-font-editor").css("display","block");
				$(".story-image-editor").css("display","none");
				$(".story-draw-editor").css("display","none");
				draw = false;
			break;
			case "appended-image-background":
				$(".when-text-content").css("display","none");
				$(".story-font-editor").css("display","none");
				$(".story-image-editor").css("display","none");
				$(".story-draw-editor").css("display","none");
				draw = false;
			break;
			case "appended-image":
				$(".when-text-content").css("display","none");
				$(".story-font-editor").css("display","none");
				$(".story-image-editor").css("display","block");
				$(".story-draw-editor").css("display","none");
				draw = false;
			break;
			case "draw":
				$(".when-text-content").css("display","none");
				$(".story-font-editor").css("display","none");
				$(".story-image-editor").css("display","none");
				$(".story-draw-editor").css("display","block");
				draw = true;
			break;
			case "no-target":
				if($(".when-image-content").is(":visible")){

				}else if($(".story-draw-editor").is(":visible")){

				}else{
					$(".when-text-content").css("display","block");
				}
				
				$(".story-font-editor").css("display","none");
				$(".story-image-editor").css("display","none");
				$(".story-draw-editor").css("display","none");
				draw = false;
			break;
		}
	}
	$(document).on("click",".sticker-tabs",function(){
		let src = $(this).data("stickername");

		cutSticker({
			src: src,
			div: document.getElementById("fetch-all-stickers-container"),
			ToElem: document.getElementById("fetch-all-stickers-container-png"),
			refresh: true,
			count: "all"
		});
	});
	$(document).on("click",".li-see-more",function(){
		$(".li-hidden").css("display","block");
		$(this).hide();
	});
	$(document).on("click",".li-see-less",function(){
		$(".li-hidden").css("display","none");
		$(this).hide();
		$(".li-see-more").show();
	});

	$(document).on("click",".set-li .main-set",function(){
		$(this).parent().find("div").eq(2).toggle();
		$(this).find("div").toggleClass('rotate');
	});
	
	$(document).on("click",".playandpause",function(){
		switchPlayAndPause();
		playTheStory();
	});
	function switchPlayAndPause(){
		let Svgpause = `
		<svg fill="white !important" xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24"><path d="M0 0h24v24H0z" fill="none"/><path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/></svg>
		`;
		let Svgplay = `
		<svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24"><path d="M0 0h24v24H0z" fill="none"/><path d="M8 5v14l11-7z"/></svg>
		`;
		if(PlayStory){
			$(".playandpause").html(Svgplay);
		}else{
			$(".playandpause").html(Svgpause);
		}
	}
	$(document).on("click",".no-story-content",function(){

		 let id = GetParameterValues("id");
     	 let code = GetParameterValues("code");
     		
		if(id != undefined && code != undefined){
			getStoryContent(id,code);
			return false;
		} 	
		let next = allHasStory[0];
	$(".user-story-list").each(function(){
		let data = $(this).data("id");
		if(data == next){
			fetchallUserHasStories();
			$(".user-story-list").not($(this)).removeClass('active');
			$(this).addClass('active');
			manageStoryContent("select",next);

		}
		});
	});
	$(document).on("click",".user-story-list",function(){
		let name = $(this).find("div.info").find("p").html();
		$(".user-story-list").not($(this)).removeClass('active');
		$(this).addClass('active');
		$.getJSON('data/getUserinformation.php', {user: name}, function(json, textStatus) {
			PlayStory = false;
			manageStoryContent("select",json.id);
		});
	});
	$(document).on("click",".next-story",function(){
		manageStoryContent("next");
	});
	$(document).on("click",".prev-story",function(){
		manageStoryContent("prev");
	});
	$(document).on("click",".story-container .item.me",function(){
		changeUrl("stories?a=create");
		checkUrl();
	});	
	$(document).on("click",".story-container .item",function(){
		let id = $(this).data("id");
		let code = $(this).data("code");
		let index = $(this).data("index");

		if(id != undefined && code != undefined && index != undefined){
			changeUrl("stories?id="+id +"&code="+code+"&index="+index);
			checkUrl();
		}else{
			alert("no content");
		}
		
	});	
	$(document).on("mouseover",".story-reaction-container",function(){
		PlayStory = true;;
		switchPlayAndPause();
		playTheStory();
	
	});
	$(document).on("mouseout",".story-reaction-container",function(){
		PlayStory = false;
		switchPlayAndPause();
		playTheStory();
		
	});
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
															// FUNCTIONS
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function isOutOfViewport(elem){
	let bounding = elem.getBoundingClientRect();

	// Check if it's out of the viewport on each side
	let out = {};
	out.top = bounding.top < 0;
	out.left = bounding.left < 0;
	out.bottom = bounding.bottom > (window.innerHeight || document.documentElement.clientHeight);
	out.right = bounding.right > (window.innerWidth || document.documentElement.clientWidth);
	out.any = out.top || out.left || out.bottom || out.right;

	return out;
}


function isInViewport(elem){
	let isOut = isOutOfViewport(elem);
	if (isOut.any) {
		return 'no';
	} else {
		return 'yes';
	}
}


// Stories
	// [DISCOVER [STORIES]]
function fetchallUserHasStories(){
	$.ajax({
		url:"data/fetchallUserHasStories.php",
		type:"GET",
		success:function(content){
			$(".fetchallUserHasStories-content").html(content);
			$.getJSON('data/fetchAllUsersInStories.php',function(json, textStatus) {
					allHasStory = json;
			});
		}
	});
}
function manageStoryContent(...Args){

		let id = GetParameterValues("id");
		let code = GetParameterValues("code");
	switch(Args[0]){
		case "select":
			$.getJSON('data/getStoryInformation.php', {user: Args[1],code: ""}, function(story, textStatus) {
				let index = GetParameterValues("index");
				let newUrl = "stories?id=" + Args[1] + "&code=" + story.code + "&index="+story.storyIndex;
				 changeUrl(newUrl);

				 getStoryContent(Args[1],story.code);
				
			});
		break;
		case "next":
			$.getJSON('data/getStoryInformation.php', {user: id,code: code}, function(story, textStatus) {
				$.getJSON('data/getStoryInformation.php', {user: id,code: story.next}, function(nextStory, textStatus) {
					let index = GetParameterValues("index");
					let newUrl = "stories?id=" + id + "&code=" + nextStory.code + "&index="+nextStory.storyIndex;
					if(index != nextStory.availableStory){
						changeUrl(newUrl);
						 getStoryContent(id,nextStory.code);	
					}else{
						nextUserStory(id);
					}
						 
				});	
			});
		break;
		case "prev":
			$.getJSON('data/getStoryInformation.php', {user: id,code: code}, function(story, textStatus) {
				$.getJSON('data/getStoryInformation.php', {user: id,code: story.prev}, function(prevStory, textStatus) {
						let newUrl = "stories?id=" + id + "&code=" + prevStory.code + "&index="+prevStory.storyIndex;
						 changeUrl(newUrl);
						 if(prevStory.storyIndex - 1 != 0){
						 	 getStoryContent(id,prevStory.code);
						 }else{
							prevUserStory(id);
						}
				});	
			});
		break;

	}

}
function nextUserStory(id){
	let next;
	for(let i = 0; i < allHasStory.length; i++){
		if(allHasStory[i] == id){
			next = allHasStory[i + 1];
			PlayStory = false;
			manageStoryContent("select",next);
		}
	}
	$(".user-story-list").each(function(){
		let data = $(this).data("id");
		if(data == next){
			$(".user-story-list").not($(this)).removeClass('active');
			$(this).addClass('active');
		}
	});
}
function prevUserStory(id){
	let next;
	for(let i = 0; i < allHasStory.length; i++){
		if(allHasStory[i] == id){
			next = allHasStory[i - 1];
			PlayStory = false;
			manageStoryContent("select",next);
		}
	}
	$(".user-story-list").each(function(){
		let data = $(this).data("id");
		if(data == next){
			$(".user-story-list").not($(this)).removeClass('active');
			$(this).addClass('active');
		}
	});
}
function getStoryContent(id,code){
	$.ajax({
		url:"data/getStoryContent.php",
		type:"GET",
		data:{id,code},
		success:function(storyContent){
			changeTheStoryContent(storyContent);
			playTheStory();
		}
	});
}
function changeTheStoryContent(content){
	if(content == "none"){
		$(".user-main-story").addClass('no-story-content');
		$(".user-main-story").html("<p>Click to view Story</p>");
	}else{
		$(".user-main-story").removeClass('no-story-content');
		$(".user-main-story").html(content);
	}
	
}
function playTheStory(){
  let index = GetParameterValues('index');
  let progressBar = $(".story-timer-"+index);
  let DURATION = 10000; // in miliseconds
  let width;
  let max = progressBar.parent().width();
  let checkWidth = setInterval(function(){
  	width = progressBar.width();
  		if(width == max){
  			done();
  		}
 
  });

 	function start(){
 		PlayStory = true;
 		progressBar.animate({ width: '100%'}, DURATION);
 	}
	function stop(){
		PlayStory = false;
		progressBar.stop();
	}
	function reset(){
 		var clearQueue = true;
        progressBar.stop(clearQueue).animate({ width: 0 });
	}
	function done(){
		PlayStory = false;
		progressBar.addClass('done');
		manageStoryContent("next");
  		clearInterval(checkWidth);
  		return false;
	}

	if(!PlayStory){
		start();
	}else{
		stop();
	}
	
}

// END // [DISCOVER [STORIES]]
	// [CREATE [STORIES]]
function createNewImageEditor(img){
	let editor = `
	<div class="story-content-body">
	<div class="list-picker">
		<div class="main-picker">
			<div class="main-font">
				<span>Filter</span>
			</div>
			<?php echo insvg("down-arrow") ?>
		</div>
		<div class="picker-container" style="z-index: 999 !important">
			<div class="item">
				<div class="name"><span>Combine</span></div>
				<div class="switch relative story-image-filter" data-value="combine">
					<div class="onOff" value="off"></div>
				</div>
			</div>
			<div class="item">
				<div class="name"><span>Grayscale</span></div>
				<div class="switch relative story-image-filter" data-value="grayscale">
					<div class="onOff" value="off"></div>
				</div>
			</div>
			<div class="item">
				<div class="name"><span>Sepia</span></div>
				<div class="switch relative story-image-filter" data-value="sepia">
					<div class="onOff" value="off"></div>
				</div>
				
			</div>
			<div class="item">
				<div class="name"><span>Blur</span></div>
				<div class="switch relative story-image-filter" data-value="blur">
					<div class="onOff" value="off"></div>
				</div>
				
			</div>
			<div class="item">
				<div class="name"><span>Saturate</span></div>
				<div class="switch relative story-image-filter" data-value="saturate">
					<div class="onOff" value="off"></div>
				</div>
				
			</div>
			<div class="item">
				<div class="name"><span>Hue</span></div>
				<div class="switch relative story-image-filter" data-value="hue">
					<div class="onOff" value="off"></div>
				</div>
				
			</div>
			<div class="item">
				<div class="name"><span>Invert</span></div>
				<div class="switch relative story-image-filter" data-value="invert">
					<div class="onOff" value="off"></div>
				</div>
			</div>
			<div class="item">
				<div class="name"><span>Darken</span></div>
				<div class="switch relative story-image-filter" data-value="darken">
					<div class="onOff" value="off"></div>
				</div>
			</div>
			<div class="item">
				<div class="name"><span>Contrast</span></div>
				<div class="switch relative story-image-filter" data-value="contrast">
					<div class="onOff" value="off"></div>
				</div>
			</div>

		</div>

		</div> 
		<div class="list-picker add imageConfiguaration">
			<span>Width & Height</span>
			<div class="form">
				<div class="form-group">
					<input type="number" class="imageWidth" name="" placeholder="Width">
				</div>
				<div class="form-group">
					<input type="number" class="imageHeight"name="" placeholder="Height">
				</div>
			</div>
		</div>
	`;
	let width = img.width;
	let height = img.height;
	$(".story-image-editor").html(editor);
	$(".imageConfiguaration .form .imageWidth").val(width);
	$(".imageConfiguaration .form .imageHeight").val(height);

	$(document).on("input",".imageConfiguaration .form .imageWidth",function(){
		 width = $(this).val();
		 img.width = width;
		 height = img.height;
		 $(".imageConfiguaration .form .imageHeight").val(height);
	});
	$(document).on("input",".imageConfiguaration .form .imageHeight",function(){
		 height = $(this).val();
		 img.height = height;
		 width = img.width;
		 $(".imageConfiguaration .form .imageWidth").val(width);
	});
}
function createNewDrawingEditor(){
	let editor = `
		<div class="story-content-body">
		<div class="list-picker">
			<div class="main-picker">
				<div class="square">
					Brush
				</div>
				<div class="main-font">
					<span>Normal Brush</span>
				</div>
				<?php echo insvg("down-arrow") ?>
			</div>
			<div class="picker-container brush-style-picker" style="background: #FFF;z-index: 888">
				<li><span>Normal Brush</span></li>
				<li><span>Caligrapy 1</span></li>
				<li><span>Caligrapy 2</span></li>
				<li><span>Airbrush</span></li>
				<li><span>Oil Brush</span></li>
				<li><span>Crayon</span></li>
				<li><span>Watercolor Brush</span></li>
			</div>
		</div>
		<div class="list-picker">
			<div class="main-picker">
				<div class="square">
					Size
				</div>
				<div class="main-font brushes">
					<span><div class="brush-sizes size-1"></div></span>
				</div>
				<?php echo insvg("down-arrow") ?>
			</div>
			<div class="picker-container brushes" style="background: #FFF;z-index: 888">
				<li data-size="2"><span><div class="brush-sizes size-1"></div></span></li>
				<li data-size="4"><span><div class="brush-sizes size-2"></div></span></li>
				<li data-size="6"><span><div class="brush-sizes size-3"></div></span></li>
				<li data-size="8"><span><div class="brush-sizes size-4"></div></span></li>
				<li data-size="10"><span><div class="brush-sizes size-5"></div></span></li>
			</div>
		</div>
			<div class="list-picker">
			<div class="main-picker">
				<div class="square">
					Cap
				</div>
				<div class="main-font brushes">
					<span>Round</span>
				</div>
				<?php echo insvg("down-arrow") ?>
			</div>
			<div class="picker-container brushesCap">
				<li data-cap="round"><span>Round</span></li>
				<li data-cap="square"><span>Square</span></li>
				<li data-cap="butt"><span>Butt</span></li>
			</div>
		</div>
		<div class="content-picker brush-editor-container">
			<p>Color</p>
			<div class="main-picker">

			</div>
			<div class="footer view-more-brush-color" value="show">
				<div class="icon-down-arrow"></div>
			</div>
		</div>
	</div>
	`;
	$(".story-draw-editor").html(editor);
	Select255Colors(16,false,"brush-color");
	drawToStory();
	svg("down-arrow","");


	$(document).on("click",".story-brush-colors",function(){
		let value = $(this).data("value");

		$("#storyCanvas").attr("data-color",value);
		drawToStory()
	});
	$(document).on("click",".picker-container.brushes li",function(){
		let size = $(this).attr("data-size");

		$("#storyCanvas").attr("data-size",size);
		drawToStory()
	});
	$(document).on("click",".picker-container.brushesCap li",function(){
		let cap = $(this).attr("data-cap");

		$("#storyCanvas").attr("data-cap",cap);
		drawToStory()
	});
	$(document).on("click",".brush-style-picker li",function(){
		let value = $(this).find("span").html();

		$("#storyCanvas").attr("data-brush",value);
		drawToStory();
	});
}
function drawToStory(){
	draw = true;
	var canvas = document.getElementById('storyCanvas');
	var ctx = canvas.getContext('2d');
	var story = document.getElementById("main-story-preview");
	var mouse = {x: 0, y: 0};

	var isPainting = false;
	canvas.addEventListener('mousemove', function(evt) {
	 var rect = canvas.getBoundingClientRect(), 
	      scaleX = canvas.width / rect.width, 
	      scaleY = canvas.height / rect.height; 

	  mouse.x = (evt.clientX - rect.left) * scaleX;
	  mouse.y = (evt.clientY - rect.top) * scaleY;

	 
	}, false);


	canvas.addEventListener('mousedown', function(e) {
	    ctx.beginPath();
	    ctx.moveTo(mouse.x, mouse.y);
	 
	    canvas.addEventListener('mousemove', onPaint, false);
	     isPainting = true;
	}, false);
	 
	canvas.addEventListener('mouseup', function() {
	    canvas.removeEventListener('mousemove', onPaint, false);
	    isPainting = false;
	}, false);

	
	
	ctx.lineWidth = canvas.dataset.size;
	ctx.lineJoin =  canvas.dataset.cap;
	ctx.lineCap =  canvas.dataset.cap;
	ctx.strokeStyle =  canvas.dataset.color;
	


	var onPaint = function() {
		if(isPainting && draw){

		    ctx.lineTo(mouse.x, mouse.y);
	  		  ctx.stroke();	
	  		 // 
		}

	};
}
function createNewFontEditor(textarea){
	let editor = ` 
		<div class="story-content-body">
			<div class="list-picker add">
				<div class="main-picker">
					<div class="square fontSize">
						<span>12px</span>
					</div>
					<div class="square fontSize">
						<span>14px</span>
					</div>
					<div class="square fontSize">
						<span>16px</span>
					</div>
					<div class="square fontSize">
						<span>18px</span>
					</div>
					<div class="square fontSize">
						<span contenteditable>20px</span>
					</div>
				</div>
			</div>
			<div class="list-picker">
				<div class="main-picker">
					<div class="square">
						Aa
					</div>
					<div class="main-font">
						<span>CLEAN</span>
					</div>
					<div class="icon-down-arrow"></div>
				</div>
				<div class="picker-container">
					<li><span>CLEAN</span></li>
					<li><span>Simple</span></li>
					<li><span>Casual</span></li>
					<li><span>Fancy</span></li>
					<li><span><b>Headline</b></span></li>
				</div>
			</div>
			<div class="content-picker font-editor-container">
				<p>Color</p>
				<div class="main-picker">

				</div>
				<div class="footer view-more-fonts-color" value="show">
					<div class="icon-down-arrow"></div>
				</div>
			</div>
			<div class="content-picker text-background-editor-container">
				<p>Text Background Color</p>
				<div class="main-picker">

				</div>
				<div class="footer view-more-background-color" value="show">
					<div class="icon-down-arrow"></div>
				</div>
			</div>
		</div>
	`;

	$(".story-font-editor").html(editor);
	Select255Colors(16,false,"fonts");
	Select255Colors(16,false,"text-background");
	svg("down-arrow","");

	$(document).on("click",".list-picker .main-picker .square.fontSize",function(){
		 let fontSize = $(this).find("span").html();

		 textarea.style.fontSize = fontSize;
	});
	$(document).on("click",".font-editor-container .story-font-colors",function(){
		let color = $(this).attr("data-value");

		textarea.style.color = color;
	});
	$(document).on("click",".text-background-editor-container .story-text-background-colors",function(){
		let color = $(this).attr("data-value");

		textarea.style.background = color;
	});
}
function Select255Colors(...Args){
	let length = Args[0];

	$.getJSON('assets/json/Colors255.json', function(colors, textStatus) {
		for(let i = 0; i < length; i++){
			if(Args[2] == "fonts"){
				output = '<div class="item story-font-colors" style="background:'+ colors[i]["hexString"] +'" data-value="'+ colors[i]["hexString"]  +'"></div>';
				
				if(Args[1]){
					$(".font-editor-container .main-picker").html("");
				}
				$(".font-editor-container .main-picker").append(output);
			}else if(Args[2] == "text-background"){
				output = '<div class="item story-text-background-colors" style="background:'+ colors[i]["hexString"] +'" data-value="'+ colors[i]["hexString"]  +'"></div>';
				
				if(Args[1]){
					$(".text-background-editor-container .main-picker").html("");
				}
				$(".text-background-editor-container .main-picker").append(output);

			}else if(Args[2] == "brush-color"){
				output = '<div class="item story-brush-colors" style="background:'+ colors[i]["hexString"] +'" data-value="'+ colors[i]["hexString"]  +'"></div>';
				
				if(Args[1]){
					$(".brush-editor-container .main-picker").html("");
				}
				$(".brush-editor-container .main-picker").append(output);
			}

		}
	});

}


function appendToStory(toAppend){
	let storyContainer = $(".main-story-preview");

	storyContainer.append(toAppend)
	$(".main-story-preview .appended-text").draggable({containment: $(".main-container"),scroll: false});
}
	
	window.onscroll = function() {scrollFunction()};
	function scrollFunction() {
		 let left = $(".timeline-content .content .left-content");
		let elem = $(".timeline-content .content .left-content .container").last();
		let elemoffset = elem.offset();
		let change = true;
		


	  if (document.body.scrollTop > 150 || document.documentElement.scrollTop > 550) {
	  	$(".profile-menu").addClass("fixed");
	  } else {
	   $(".profile-menu").removeClass("fixed");
		if(elem && elemoffset){
			 left.removeClass('stick');
			left.css({"position":"relative","bottom":"auto"});
		}
	  }
		if(elem && elemoffset){
			let top = elemoffset.top - 150;
			let bodyTop = document.documentElement.scrollTop;
	
			if(bodyTop > top){
				left.css({"position":"fixed","bottom":"0"})
			}
		}
	}

	// $(".skill-con").each(function(){
	// 	let value = $(this).find("div").find("div").attr("value");
	// 	 value = value + "%";

	// 	$(this).find("div").find("div").css("width",value);

	// });
function insertToStory(story){
	$.ajax({
		url:"data/insertToStory.php",
		type:"POST",
		data:story,
		success:function(response){
			if(response == "success"){
				$(".save-story span").html("Shared");
			}
			
			
		}
	});
}	
function snapDiv(element){
	var getCanvas;
	var image2 = new Image();
	domtoimage.toPng(element)
	    .then(function (dataUrl) {
	        var img = new Image();
	        img.src = dataUrl;
	        img.onload = function(){
	        	SnapedStory.data = dataUrl;
	         }
	    })
	    .catch(function (error) {
	        console.error('oops, something went wrong!', error);
	    });
}

// End [CREATE [STORIES]]

// TABS
	function myprofile(){
		$(".profile-body").css("display","block");
		$(".home-body").css("display","none");
	}
	function handleTab(tab){
		tab.find("svg").each(function(){
			if($(this).hasClass('filled')){
				$(this).remove();
			}else{
				$(this).show();
			}
		});
		
	}
	function activeTab(button){
		let name = button.find("div").html().toLowerCase();
		button.addClass("active");
		$(".nav-center .item").not(button).removeClass("active");
		$.ajax({
			url:"fbSVG/" + name + "-fill.php",
			type:"GET",
			success:function(data){
				button.find("svg").hide();
				button.append(data);
			}
		});
	}
	function removeFilledActiveItemInNav(){
		$(".nav-center .item").each(function(){
			if($(this).hasClass('active')){
				$(this).removeClass('active');
				$(this).find("svg").each(function(){
					if($(this).hasClass('filled')){
						$(this).hide();
					}else{
						$(this).show();
					}
				});
			}
		});
	}
	function switchActiveButton(button){
		let allActiveButtons =  ["home","watch","marketplace","groups","gaming"];

		if(allActiveButtons.includes(button)){
				$(".nav-center .item").each(function(){
			let tab = $(this).find("div").html().toLowerCase();

			if(tab == button){
				activeTab($(this));
			}else{
				if(tab == "me"){
					removeFilledActiveItemInNav();
				}
				removeFilledActiveItemInNav();
			}
		});
			}else{
				removeFilledActiveItemInNav();
			}
	
	}
	function switchTab(tab){
		$(".facebook-content").not($("."+tab+"-body")).css("display","none");
		$("."+tab+"-body").css("display","block");
		$(".profile-body").css("display","none");

		let url = capitalizeFirstLetter(tab);
		let newUrl;
		let background = "#F0F2F5";
		if(url == "Home"){
			newUrl = "Facebook";
			whenMessagesTab(false);
		}else if(url == "Messages"){
			whenMessagesTab(true);
			fetchinbox();
		}else if(url == "Stories"){
			let defineUrl = window.location.href;
				let siteRoot = "/facebook-clone";
     		defineUrl = defineUrl.replace(siteRoot+"/","");
     		let content;
     		if(defineUrl.includes("?a=create")){
     			whenMessagesTab(true);
     		}else{
     			whenMessagesTab(false);
     		}
			
			 newUrl = "Facebook";
		}else if(url == "Settings"){
			newUrl = "Settings & Privacy";
			whenMessagesTab(false);
			background = "#FFF";

			getSettingsTab();
		}else{
			whenMessagesTab(false);
			 newUrl = url + " | Facebook";
		}
		changeTitle(newUrl);
		switchActiveButton(tab);
		$("body").css("background",background);
	}

     function getSettingsTab(){
     	let tab = GetParameterValues("tab");
     	let root = "/facebook-clone/";
     	let url = window.location.href;
     	let ref = GetParameterValues("ref");
     	url = url.replace(root,"");

     	if(ref == undefined || ref == ""){
     		ref = false;
     	}
     
     	$.ajax({
     		url:"data/getSettingsTab.php",
     		type:"GET",
     		data:{tab,ref},
     		success:function(data){
     			$(".main-settings-to-replace").html(data);
     		}
     	});

     	$(".settings-list").each(function(){
     		let a = $(this).attr("href");
     		let toReplace = "settings?tab=";
     		a = a.replace(toReplace,"");

     		if(a == tab){
     			$(".settings-list").not($(this)).removeClass("active");
     			$(this).addClass("active");
     		}
     	});

     }

     function whenMessagesTab(bool){
     	$(".nav-right .circles .item").each(function(){
     		if($(this).hasClass('messages-button')){
     			if(bool){
     				$(this).hide();
     				$(".floating-content").hide();
     				ifMessagesNotSellected();
     			}else{
     				$(this).show();
     				$(".floating-content").show();
     			}
     		
     		}
     	});
     }

     // Profile 

     $(document).on("click",".profile-menu-button .item",function(){
     	let tab = $(this).find("span").html().toLowerCase();

     	if(tab != "more"){
     		changeProfileTab(tab);
     	}else{
     		alert("more");
     	}
     	
     });
     $(document).on("click",".profile-content-buttons .button",function(){
     	let data = $(this).data("f");
     	let user = $(this).parent().data("user");
     	switch(data){
     		case "add-friend":
     			manageFriendRequest(user,$(this).find("p"),"add-friend");
     			getProfile(user);
     		break;		
     		case "cancel-friend-request":
     			manageFriendRequest(user,$(this).find("p"),"cancel-friend-request");
     			getProfile(user);
     		break;
     		case "accept-friend-request":
     			manageFriendRequest(user,$(this).find("p"),"accept-friend-request");
     			getProfile(user);
     		break;
     		case "message":
	     		$.getJSON('data/getUserinformation.php', {user: user}, function(json, textStatus) {
	     				createNewChatBox({
							id:json.id,
							name:json.fullname,
							picture:json.profile_picture,
							color:'#FFA51B'
						});
	     		});
     		break;
     	}
     });


     function manageFriendRequest(user,elem,action){
     	switch(action){
     		case "add-friend":
		     	$.ajax({
		     		url:"client/clients.php",
		     		type:"POST",
		     		data:{action:"send-friend-request",to_id:user},
		     		success:function(res){
		     			elem.html(res)
		     		}
		     	});
     		break;
     		case "cancel-friend-request":
     			$.ajax({
		     		url:"client/clients.php",
		     		type:"POST",
		     		data:{action:"cancel-friend-request",to_id:user},
		     		success:function(res){
		     			elem.html(res);
		     			console.log(res)
		     		}
		     	});
     		break;
     		case "accept-friend-request":
     			$.ajax({
		     		url:"client/clients.php",
		     		type:"POST",
		     		data:{action:"accept-friend-request",to_id:user},
		     		success:function(res){
		     			elem.html(res);
		     			console.log(res)
		     		}
		     	});
     		break;
     	}
     	
     }
     function changeProfileTab(tab){
     	let contentTab = $(".profile-body-content."+tab+"-content");
     	$(".profile-body-content").not(contentTab).css("display","none");
     	contentTab.css("display","flex");
     	changeActiveProfileTab(tab)
	   }
     function changeActiveProfileTab(tab){
     	$(".profile-menu-button .item").each(function(){
     		let newTab = $(this).find("span").html().toLowerCase();
     		let newUrl = "?tab="+newTab;
     		if(tab == newTab){	
     			$(".profile-menu-button .item").not($(this)).removeClass('active');
     			$(this).addClass('active');
     			changeUrl(newUrl)
     		}
     	});
     }
     function checkTabInProfile(){
     	let tab = GetParameterValues("tab");
     	if(tab == undefined || tab == null){
     		tab = "timeline";
     	}
     	changeProfileTab(tab);
     }
     function getProfile(user){
		$.ajax({
			url:"data/getProfile.php",
			type:"GET",
			data:{user:user},
			success:function(profile){
				if(user == "me"){
					$(".open-profile").addClass("active");
					user = "me";
				}
				openProfile(profile);
				changeUrl(user);
				fetchAllPostsInProfile(user);
				removeFilledActiveItemInNav();
				checkTabInProfile();
				changeTitleByName(user);
				openedProfile = user;
			}
		});
	}
	function openProfile(profile){
		$(".user-profile-body").html(profile);
		$(".facebook-content").css("display","none");
		$(".profile-body").css("display","block");
	} 

	function changeTitleByName(user){
		$.getJSON('data/getUserinformation.php', {user: user}, function(json, textStatus) {
			changeTitle(json.fullname)
		});
	}
	function capitalizeFirstLetter(word){
		let firstLetter = word.substring(0,1).toUpperCase();
		let length = word.length;
		let other = word.substring(1,length);
		let newWord = firstLetter + other;
	
		return newWord;
	}



     // URLS
     function changeUrl(url){
		history.pushState({},"",url);
	}
	function parseURLParams(url) {
	    var queryStart = url.indexOf("?") + 1,
	        queryEnd   = url.indexOf("#") + 1 || url.length + 1,
	        query = url.slice(queryStart, queryEnd - 1),
	        pairs = query.replace(/\+/g, " ").split("&"),
	        parms = {}, i, n, v, nv;

	    if (query === url || query === "") return;

	    for (i = 0; i < pairs.length; i++) {
	        nv = pairs[i].split("=", 2);
	        n = decodeURIComponent(nv[0]);
	        v = decodeURIComponent(nv[1]);

	        if (!parms.hasOwnProperty(n)) parms[n] = [];
	        parms[n].push(nv.length === 2 ? v : null);
	    }
	    return parms;
}
	function RemoveLastDirectoryPartOf(url){
	    var the_arr = url.split('/');
	    the_arr.pop();
	    return( the_arr.join('/') );
	}
	function GetParameterValues(param) {  
        var url = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');  
        for (var i = 0; i < url.length; i++) {  
            var urlparam = url[i].split('=');  
            if (urlparam[0] == param) {  
                return urlparam[1];  
            }  
        }  
     } 
     function checkUrl(){
     	let url = window.location.pathname;
     	let check = window.location;
     	let siteRoot = "/facebook-clone";
     	url = url.replace(siteRoot+"/","");
     	
     	if(url == ""){
     		url = "home";
     	}else if(url == "index.php"){
     		url = "home";
     	}else if(url == "photo"){
     		let post = GetParameterValues("post");
     		let index = GetParameterValues("index");
     		let id = GetParameterValues("id");
     		createNewPreviewPost({
     			post,index,id
     		});
     	}else if(url == "stories"){
     		let defineUrl = window.location.href;
     		defineUrl = defineUrl.replace(siteRoot+"/","");
     		let content;
     		if(defineUrl.includes("?a=create")){
     			 content = "facebook-create-stories-content.php";
     		}else{
     			 content = "facebook-discover-stories-content.php";

     			 let id = GetParameterValues("id");
     			 let code = GetParameterValues("code");
     			fetchallUserHasStories();
     			if(id != undefined && code != undefined){
     				getStoryContent(id,code);
     			} 	
   				
     		}
     		$.ajax({
     			url:"content/"+content,
     			type:"GET",
     			success:function(data){
     				$(".stories-body").html(data);
     			}
     		});
     		removeFilledActiveItemInNav();
     	}else{
     		if(!pages.includes(url)){
     			removeFilledActiveItemInNav();
     			
     			$.ajax({
     				url:"data/isUserExist.php",
     				type:"POST",
     				data:{user:url},
     				success:function(response){
     					if(response == "true"){
     						return getProfile(url);
     					}else{
     						switchTab("no-content");
     					}
     				}
     			});
     		}
     	}
     	for(let i = 0; i < pages.length; i++){
     		if(pages[i] == url){
     			switchTab(pages[i]);
     			switchActiveButton(pages[i]);
     		}
     	}

     }


// TITLE
	function changeTitle(newTitle){
		document.title = newTitle;
	}
// FAVICON
	function changeFavicon(newIcon){
		$(".rel").attr("href",newIcon);
	}
// POSTS
	function fetchAllPosts(){
		let start = 0;
		let limit = 5;
		let active = false;

	function fetchPost(start,limit){
		let condition = "false";
		let people = "false";
		let post = "false";
		$.ajax({
				url:"data/fetchPost.php",
				type:"POST",
				data:{start,limit,condition,people,post},
				success:function(data){
					$(".all-user-post-content").append(data);
					
					if(data == ""){
						let noContent = ` 
	                     	<div class="no-content">
                     			<center>
                     				<span class="icon-undraw_hire_te5y">'`+ svg("undraw_hire_te5y","") +`'</span>
                     			<h2>I Think You Reached the end</h2>
                     			<p>Find and Follow Friends to get updates to them.</p>
                     			<div class="button"><span>Find Friends</span></div>
                     			</center>
                     		</div>
						`;
						$(".all-user-post-content-response").html(noContent);

						active = true;
					}else{
						createPostPreload($(".all-user-post-content-response"),5);
						active = false;
					}
				}
			});
		}

		if(active == false){
			fetchPost(start,limit);
			active = true;
			
		}

		$(window).scroll(function(){
			if($(window).scrollTop() + $(window).height() > $(".all-user-post-content-response").height() && active == false){
				active = true;
				start = start + limit;
				fetchPost(start,limit);
			}
		});
	}
	function fetchAllPostsInProfile(people){
		let start = 0;
		let limit = 5;
		let active = false;
	
	function fetchPost(start,limit,people){
		let condition = "false";
		let post = "false";

		$.ajax({
			url:"data/fetchPost.php",
			type:"POST",
			data:{start,limit,condition,people,post},
			success:function(data){
				$(".user-profile-all-post-content").append(data);
				let noContent = ` 
					<div class="no-content" style="margin-left:0;width:480px;padding:5px;padding-top:20px;padding-bottom:10px;">
						<center>
         				<span class="icon-undraw_hire_te5y">'`+ svg("undraw_hire_te5y","") +`'</span>
         			<h2>I Think You Reached the end</h2>
         			<p>Find and Follow Friends to get updates to them.</p>
         			<div class="button"><span>Find Friends</span></div>
         			</center>

					</div>
				`;
				if(data == ""){	
					$(".user-profile-all-post-content-response").html(noContent);
					active = true;
				}else{
					createPostPreload($(".user-profile-all-post-content-response"),5);
					active = false;
				}
			}
		});
	}

		if(active == false){
			setTimeout(function(){
					fetchPost(start,limit,people);
				},1000);
			active = true;
			
		}

		$(window).scroll(function(){
			if($(window).scrollTop() + $(window).height() > $(".user-profile-all-post-content-response").height() && active == false){
				active = true;
				start = start + limit;
				setTimeout(function(){
					fetchPost(start,limit,people);
				},1000);
			}
		});
	}
	function createInboxPreload(elem,length,clear){
		if(clear){
			elem.html("");
		}
		
		let preload = `
		<div class="inbox-preload">
			<div class="circle"></div>
			<div class="box"></div>
		</div>
		`;
		for(let i = 0; i < length; i++){
			elem.append(preload);
		}
	}
	function createPostPreload(elem,length){
		let preload =` 
			<div class="post-preload">
                 <div id="header">
            	<div class="preload-name">
            			<div class="circle"></div>
            			<div class="info"></div>
            		</div>
            	</div>
            	<div id="body"></div>
              </div>
		`;
		for(let i = 0; i < length; i++){
			elem.append(preload);
		}
	}

	function insertCommentReply(id,post_id,reply){
		$.ajax({
			url:"client/postManagement.php",
			type:"POST",
			data:{id,reply,post_id},
			success:function(data){

				// $.getJSON('data/getPostInformation.php', {post:id}, function(json, textStatus){

				// 	insertNewNotification({
				// 		to_id:json.id,
				// 		to_username:json.username,
				// 		event:"reply",
				// 		post_id:data.id
				// 	});
				// });
			}
		});
	}
	function insertComment(id,comment){

		$.ajax({
			url:"client/postManagement.php",
			type:"POST",
			data:{id,comment},
			success:function(data){

				// $.getJSON('data/getPostInformation.php', {post:id}, function(json, textStatus){

				// 		insertNewNotification({
				// 			to_id:json.id,
				// 			to_username:json.username,
				// 			event:"commented",
				// 			post_id:data.id
				// 		});
				// });
			}
		});
	}
	function fetchComments(comment,me,json,data,comments){
		$.ajax({
			url:"data/timeAgo.php",
			type:"GET",
			data:{date:data.timestamp},
			success:function(timeAgo){
						let message =` 
					<div class="user-post-comments-container " data-id="`+data.post_id +`">
								<div class="user-post-comments">
									<img src="`+ json.profile_picture +`" class="circle">
									<div class="text">
										<a href="`+ json.id +`" >`+ json.fullname +`</a>
										<span>`+ comment +`</span>
									</div>
								</div>
								<div class="comment-reactions">
									<span>Like</span>
									<span  data-comment_id="`+ comments.post_comment_id +`">Reply</span>
									<span class="hc date_time_ago">Just Now<div class="desc"  data-timestamp="`+ data.timestamp +`">`+data.date+`</div></span>
								</div>
								
								<div class="user-comment-reply-container"></div>
								 <div class="user-post-comment-textarea-container user-post-comment-textarea-container-`+ comments.post_comment_id +`"  data-id="`+ comments.comment_id +`" data-post_id ="`+ data.post_id +`" style="display:none;margin-left:12%;">
								<img src="`+ me.profile_picture + `" class="circle">
								<div class="comment-reply-textarea" contenteditable placeholder="Write a reply"></div>
						</div>
					</div>
				</div>

		`;
		$(".user-comments-section-"+data.post_id).prepend(message);
		if($(".user-comments-section-"+data.post_id +" .user-post-comments-container").length >= 6){
			$(".user-comments-section-"+data.post_id +" .user-post-comments-container").last().remove();
		}
		
	}
		});
	}
		function svg(name,condition){
		let svgs = "";
		if(condition == "fb"){
			$.ajax({
				url:"data/fbsvg.php",
				type:"GET",
				data:{name:name},
				success:function(svgs){
					if(svgs == undefined){
	
						console.log("error")
					}else{
						$(".icon-"+name).html(svgs);
						if($(".icon-"+name).html() == 'undefined'){
							$(".icon-"+name).html(""); 
						}
					}
					
				}
			});
		}else if(condition == "insvg"){
			$.ajax({
				url:"data/insvg.php",
				type:"GET",
				data:{name:name},
				success:function(svgs){
					if(svgs == undefined){
							console.log("error")
					}else{
						$(".icon-"+name).html(svgs);
						if($(".icon-"+name).html() == 'undefined'){
							$(".icon-"+name).html(""); 
						}
					}

				}
			});
		}else if(condition == "mysvg"){
			$.ajax({
				url:"data/mysvg.php",
				type:"GET",
				data:{name:name},
				success:function(svgs){
					if(svgs ==undefined){

							console.log("error")
					}else{
						$(".icon-"+name).html(svgs);
						if($(".icon-"+name).html() == 'undefined'){
							$(".icon-"+name).html(""); 
						}
					}

				}
			});
		}else{
			$.ajax({
				url:"data/svg.php",
				type:"GET",
				data:{name:name},
				success:function(svgs){
					if(svgs == undefined){
						console.log("error")
					}else{
						$(".icon-"+name).html(svgs);
						if($(".icon-"+name).html() == 'undefined'){
							$(".icon-"+name).html(""); 
						}
					}
					
				}
			});
		}	
		
	}
	function generateToken(length){
			let result = "";
			let token = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
			token += token.toLowerCase();
			token += "1234567890";

			for(let i = 0; i < length; i++){
				result += token.charAt(Math.floor(Math.random() * token.length));
			}

			return result;
		}
	function generatUuidv4() {
	  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
	    var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
	    return v.toString(16);
	  });
	}
	function createNewPreviewPost(obj){
		let token = generateToken(8);
		let post = obj["post"];
		let id = obj["id"];
		let index = obj["index"];


		let start = "false";
		let limit = "false";
		let condition = "post-preview";
		let people = "false";
		let preview;
		
		let CurrentId = GetParameterValues("id");
		let CurrentPost = GetParameterValues("post");
		let CurrentIndex = GetParameterValues("index");

		$.getJSON('data/getPostImageInformation.php', {post,id,index}, function(json, textStatus) {
			let max =  parseInt(json.maxIndex);
			let prev = 0;
			let next = 0;
			if(index != 0){
				prev = parseInt(index) - 1;
			}else{
				prev = max;
			}
			if(index != max){
				next = parseInt(index) + 1;
			}else if(index == 0){
				prev = 0;
				if(max != 0){
					next = 1;
				}
				
			}
		


			$.getJSON('data/getPostImageInformation.php', {post,id,index}, function(image, textStatus) {
		
			preview = ` 
				<div class="photo-post-preview-main-container">
					<div class="photo-post-preview-left-container">
						<div class="main-background" style="background-image: url(`+ image.image +`);"></div>
						<div class="main-function">
							<div class="content top"></div>
							<div class="content left">
								<div class="button icon-chevron-right post-preview-button right" data-prev="`+prev+`">
								</div>
							</div>
							<div class="content right">
								<div class="button icon-chevron-right post-preview-button left" data-next="`+next+`"></div>
							</div>
						</div>
						<img src="`+ image.image +`">
					</div>
					<div class="photo-post-preview-right-container photo-post-preview-`+ token +` scrollbar"></div>
				</div>
				`;

				$.ajax({
					url:"data/fetchPost.php",
					type:"POST",
					data:{start,limit,condition,people,post},
					success:function(data){
						$(".photo-post-preview-"+token).html(data);
					}
				});


			$(".facebook-content.photo-body").html(preview);
				svg("chevron-right","");


		});
		
		});
		

	}
	$(document).on("click",".post-preview-button",function(){
		let index;
		let newUrl;
		let id = GetParameterValues("id");
		let post = GetParameterValues("post");
	

		if($(this).data("prev") != undefined){
			index = $(this).data("prev");
		}else{
			index = $(this).data("next");
		}
	     newUrl = "photo?id="+id+"&index="+index+"&post="+post;
		changeUrl(newUrl);
		checkUrl();
	});

     // MESSAGES

     function messageContentBorderRadius(){
     	$(".message-con.right").each(function(){
     		let length = $(this).find("span").length;

     		$(this).find("span").first().css({
     			"border-top-right-radius":"25px",
     			"border-bottom-right-radius":"4px"
     		});
     		if(length != 1){
	     		$(this).find("span").last().css({
	     			"border-bottom-right-radius":"25px",
	     			"border-top-right-radius":"4px"
	     		});
     		}else{
 	     		$(this).find("span").last().css({
	     			"border-bottom-right-radius":"25px",
	     			"border-top-right-radius":"25px"
	     		});    			
     		}
 
 			$(this).find("span").not(":last").not(":first").css({
	     			"border-bottom-right-radius":"4px",
	     			"border-top-right-radius":"4px",
	     	});
     	});

     	$(".message-con.left").each(function(){
     		let length = $(this).find("span").length;

     		$(this).find("span").first().css({
     			"border-top-left-radius":"25px",
     			"border-bottom-left-radius":"4px"
     		});
     		if(length != 1){
	     		$(this).find("span").last().css({
	     			"border-bottom-left-radius":"25px",
	     			"border-top-left-radius":"4px",
	     		});
     		}else{
 	     		$(this).find("span").last().css({
	     			"border-bottom-left-radius":"25px",
	     			"border-top-left-radius":"25px",
	     		});    			
     		}
 
 			$(this).find("span").not(":last").not(":first").css({
	     			"border-bottom-left-radius":"4px",
	     			"border-top-left-radius":"4px",
	     	});
     	});
     }
	function createNewChatBoxShortcut(obj){
		$.getJSON('data/getLastMessage.php', {name: obj["name"]}, function(json, textStatus) {
				let shortcut = ` 
						<div class="item" data-token="`+ obj["token"] +`" data-name="`+ obj["name"] +`">
					 		<img src="`+ obj["picture"] +`">
					 		<div class="button">
					 			<i class="fa fa-times"></i>
					 		</div>
					 		<div class="desc">
					 			<div class="content">
					 				<a href="#">`+ obj["name"] +`</a>
					 				<span>`+ json.message +`</span>
					 				<div class="triangle"></div>
					 			</div>
					 		</div>
					 </div>
			
				`;
				$(".float-box").prepend(shortcut);
		});
	}
	function createNewEmptyChatMessage(){
		$.ajax({
			url:"data/getAllUser.php",
			type:"GET",
			success:function(allUser){
				let chatbox = ` 
				<div class="message-container newEmptyChatBox">
			      		<div id="header">
			      			<h2>New Message</h2>

			      			<div class="search-engine-container">
			      				<label>To: </label>
			      				<input type="text" class="contact-search-engine">
			      			</div>

			      		</div>
			      		<div id="body">
			      			<div class="contact-tab">
								<div class="item"><span>Suggested</span></div>
								<div class="item active"><span>Active</span></div>
			      			</div>
			      			<div class="contact-list">`+ allUser +`
			      			</div>
			      		</div>
			      	</div>
					`;
					$(".message-big-pipe-container").prepend(chatbox);
			}
		});
	}
	$(document).on("click",".float-circle",function(){
		createNewEmptyChatMessage();
	});
	function createNewChatBox(obj){
		let token = generateToken(8);

		let chatbox = ` 
	<div class="message-container me-`+ obj["id"] +` m-`+token+`" data-token="`+token+`" data-color="`+obj["color"]+`">
	  		     <div class="settings-container" data-token="`+token+`" data-id="`+ obj["id"] +`">
	  					<li data-role="open-messenger">
	  						<div class="circle"></div>
	  						<div class="info"><span>Open in Messenger</span></div>
	  					</li>
	  					<li data-role="view-profile">
	  						<div class="circle"></div>
	  						<div class="info"><span>View Profile</span></div>
	  					</li>
	  					<hr>
	  					<li data-role="change-color">
	  						<div class="circle"></div>
	  						<div class="info"><span>Color</span></div>
	  					</li>
	  					<li data-role="change-emoji">
	  						<div class="circle"></div>
	  						<div class="info"><span>Emoji</span></div>
	  					</li>
	  					<li  data-role="change-nicknames">
	  						<div class="circle"></div>
	  						<div class="info"><span>Nicknames</span></div>
	  					</li>
	  					<hr>
	  					<li data-role="create-group">
	  						<div class="circle"></div>
	  						<div class="info"><span>Create group</span></div>
	  					</li>
	  					<hr>
	  					<li data-role="mute-conversation">
	  						<div class="circle"></div>
	  						<div class="info"><span>Mute Conversation</span></div>
	  					</li>
	  					<li data-role="ignore-messages">
	  						<div class="circle"></div>
	  						<div class="info"><span>Ignore messages</span></div>
	  					</li>
	  					<li data-role="block-person">
	  						<div class="circle"></div>
	  						<div class="info"><span>Block</span></div>
	  					</li>
	  					<hr>
	  					<li data-role="delete-conversation">
	  						<div class="circle"></div>
	  						<div class="info"><span>Delete Conversation</span></div>
	  					</li>
	  					<li data-role="help">
	  						<div class="circle"></div>
	  						<div class="info"><span>Something Wrong</span></div>
	  					</li>
	  					
	  				</div>
              		<div id="header">
              			<div class="info setting">
              				<img src="`+obj["picture"]+`" class="circle">
              				<div class="name">
              					<p>`+ obj["name"] +`</p>
              					<span>Active now</span>
              				</div>
              				<i class="fa fa-chevron-down" style="font-size: 12px;"></i>
              			</div>
              			<div class="icons" data-token="`+ token +`" data-name="`+ obj["name"] +`" data-picture="`+ obj["picture"] +`">
              				<div class="icon hc tab-close"><div class="icon-ex">`+ svg("ex","fb") +`</div><div class="desc">Close</div></div>
              				<div class="icon hc tab-minimize"><div class="icon-minus">`+ svg("minus","fb") +`</div><div class="desc">Minimize Tab</div></div>
              				<div class="icon hc tab-call"><div class="icon-call">`+ svg("call","fb") +`</div><div class="desc">Call</div></div>
              				<div class="icon hc tab-videocall"><div class="icon-videocall">`+ svg("videocall","fb") +`</div><div class="desc">Video Call</div></div>
              			</div>
              		</div>
              		<div id="body">
              			<div class="chat-history chat-history-token-`+ token +`" data-token="`+ token +`" data-name="`+ obj["name"] +`">
              				
              			</div>
              		</div>
              		<div id="footer" data-token="`+ token +`" data-id="`+ obj["id"] +`" data-color="`+ obj["color"] +`">
              			<div class="item hc"><div class="message-svg icon-pollygon">`+ svg("pollygon","fb") +`</div><div class="desc">More</div></div>
              			<div class="item hc"><div class="message-svg icon-picture">`+ svg("picture","fb") +`</div><div class="desc">Attach</div></div>
              			<div class="item hc"><div class="message-svg icon-sticker">`+ svg("sticker","fb") +`</div><div class="desc">Choose a sticker</div></div>
              			<div class="item hc"><div class="message-svg icon-gif">`+ svg("gif","fb") +`</div><div class="desc">Choose a gif</div></div>
              			<div class="message-textarea box message-`+token+`" contenteditable="plaintext-only" placeholder="Aa"></div>
              			<div class="item hc send-like"><div class="message-svg icon-like">`+ svg("like","fb") +`</div><div class="desc">Like</div></div>
              		</div>
              	</div>
		`;
		if(obj["message"] != null || obj["message"] != undefined){
			recieveMessage({
				message:obj["message"],sender:obj["sender"],reciever:obj["reciever"],picture:obj["picture"],color:""
			});
		}
		if(openTab.includes(obj["name"])){
			$(".message-container #header .icons").each(function(){
				let name = $(this).data("name");
				let token = $(this).data("token");

				if(name == obj["name"] && $(".m-"+token).is(":hidden")){
					$(".m-"+token).show();
					fetchMessage(obj["id"],$(".chat-history-token-"+token));

					$(".float-box .item").each(function(){
						let n = $(this).data("name");
						let t = $(this).data("token");

						if(name == n && token == t){
							$(this).remove();
							openTabMessages.splice(name);
		$(".all-of-main-message-box").html(chatbox);
		
						}
					});
				}
			});
		}else{
			$(".message-big-pipe-container").prepend(chatbox);
			messageSettings();
			$(".message-"+token).focus();
			$(".message-"+token).blur();
			$(".message-"+token).focus();
			openTab.push(obj["name"]);
			fetchMessage(obj["id"],$(".chat-history-token-"+token));
			colorFillIconSvgInChatBox(token,obj["color"]);
			

		}

		messageContentBorderRadius();

	}

	function createNewMainChatBox(obj){
		let token = generateToken(8);
		let newUrl = "messages?t="+obj["id"];
		let chatbox = `
			<div class="message-container me-`+ obj["id"] +` m-`+token+`" data-token="`+token+`" data-color="`+obj["color"]+`">
	 			<div id="header">
	 				<div class="info">
	 					<img src="`+obj["picture"]+`" class="circle">
	 					<div class="name">
	 						<p>`+ obj["name"] +`</p>
	 						<span>Active on Messenger</span>
	 					</div>
	 				</div>
	 				<div class="icons">
	 					<div class="icon icon-messages-info">
	 						`+ svg("messages-info","fb") +`
	 					</div>
	 					<div class="icon icon-videocall">
	
	 						`+ svg("videocall","fb") +`
	 					</div>
	 					<div class="icon icon-call">
	 						`+ svg("call","fb") +`
	 					</div>
	 				</div>
	 			</div>
	 			<div class="messages-body-tab">
	 				<div class="main-body">
	 					<div id="body" class="scrollbar">
			 			<div class="chat-history chat-history-token-`+ token +`" data-token="`+ token +`" data-name="`+ obj["name"] +`">
 </div>
			 			</div>
			 			<div id="footer" data-token="`+ token +`" data-id="`+ obj["id"] +`" data-color="`+ obj["color"] +`">
	              			<div class="item hc"><div class="message-svg icon-pollygon">`+ svg("pollygon","fb") +`</div><div class="desc">More</div></div>
	              			<div class="item hc"><div class="message-svg icon-picture">`+ svg("picture","fb") +`</div><div class="desc">Attach</div></div>
	              			<div class="item hc"><div class="message-svg icon-sticker">`+ svg("sticker","fb") +`</div><div class="desc">Choose a sticker</div></div>
	              			<div class="item hc"><div class="message-svg icon-gif">`+ svg("gif","fb") +`</div><div class="desc">Choose a gif</div></div>
	              			<div class="message-textarea message-`+token+`" contenteditable="plaintext-only" placeholder="Type a message"></div>
	              			<div class="item hc send-like last"><div class="message-svg icon-like">`+ svg("like","fb") +`</div><div class="desc">Like</div></div>
              			</div>
	 				</div>
		 			<div id="user-info" class="scrollbar">
		 				<div class="top">
		 					<div class="div">
		 						<img src="`+obj["picture"]+`" class="circle">
		 					</div>
		 					<h4>`+ obj["name"] +`</h4>
		 					<p>Active now</p>
		 				</div>
		 				<div class="bot">
		 					<div class="set-li">
		 						<div class="main-set">
		 							<h3>MORE ACTIONS</h3>
		 							<div class="stat rotate icon-chevron-right">
		 								`+ svg("chevron-right","") +`
		 							</div>
		 						</div>
		 						<div class="set" style="display: block;">
		 							<li>
		 								<span>Search in Conversation</span>
		 								<div class="stat icon-little-search">
		 									`+ svg("little-search","") +`
		 								</div>
		 							</li>
		 							<li>
		 								<span>Edit Nicknames</span>
		 								<div class="stat icon-nickname">
		 									`+ svg("nickname","") +`
		 								</div>
		 							</li>
		 							<li>
		 								<span>Change Theme</span>
		 								<div class="stat theme"></div>
		 							</li>
		 							<li>
		 								<span>Change Emoji</span>
		 								<div class="stat emojis icon-like">
		 					
		 								</div>
		 							</li>
		 						</div>
		 					</div>
		 					<div class="set-li">
		 						<div class="main-set">
		 							<h3>PRIVACY & SUPPORT</h3>
		 							<div class="stat icon-chevron-right">
		 								`+ svg("chevron-right","") +`
		 							</div>
		 						</div>
		 						<div class="set">
		 							<li>
		 								<span>Notifications</span>
		 								<div class="stat icon-small-bell">
		 									`+ svg("small-bell","") +`
		 								</div>
		 							</li>
		 							<li>
		 								<span>Ignore Messages</span>
		 								<div class="stat icon-ignore-messages">
		 									`+ svg("ignore-messages","") +`
		 								</div>
		 							</li>
		 							<li>
		 								<span>Block Messages</span>
		 								<div class="stat icon-block-messages">
		 									` + svg("block-messages","") + `
		 								</div>
		 							</li>
		 							<li>
		 								<span>Something's Wrong</span>
		 								<div class="stat icon-wrong">
		 									`+ svg("wrong","") +`
		 								</div>
		 							</li>
		 						</div>
		 					</div>
		 					<div class="set-li">
		 						<div class="main-set">
		 							<h3>SHARED PHOTOS</h3>
		 						</div>
		 					</div>
		 				</div>
		 			</div>
	 			</div>
	 		</div>
		`;
		$(".all-of-main-message-box").html(chatbox);
		fetchMessage(obj["id"],$(".chat-history-token-"+token));
		colorFillIconSvgInChatBox(token,obj["color"]);
		messageContentBorderRadius();
		changeUrl(newUrl);
	}
	function messageSettings(){
		$(document).on("click",".message-container .settings-container li",function(){
			let role = $(this).data("role");
			let id = $(this).parent().data("id");
			let dialogClass = "Dialog-"+generateToken(12);
			switch(role){
				case "open-messenger":
					openMessenger(id)
				break;
				case "view-profile":
					getProfile(id);
				break;
				case "change-color":
				
					makeDialogBox(false,{
						header:"Change Color",
						content:false,
						typeOfContent:"pick",
						buttons:true,
						dialogClass:dialogClass,
						Allbuttons:{
								Cancel:{

									action:function(){

									}
								},
							Continue:{
								background:"#1877F2",
								action:function(){
									let Elem = $("."+dialogClass)
								}
							}
						}
					});
				break;
				case "change-emoji":
				
					makeDialogBox(false,{
						header:"Change Emoji",
						content:"Change Emoji",
						typeOfContent:"emoji",
						buttons:true,
						dialogClass:dialogClass,
						Allbuttons:{
								Cancel:{

									action:function(){

									}
								},
							Continue:{
								background:"#1877F2",
								action:function(){
									let Elem = $("."+dialogClass)
								}
							}
						}
					});
				break;
				case "change-nickname":
					makeDialogBox(false,{
						header:"Change Nickname",
						content:"Change Nickname",
						typeOfContent:"nickname",
						buttons:true,
						dialogClass:dialogClass,
						Allbuttons:{
								Cancel:{

									action:function(){

									}
								},
							Continue:{
								background:"#1877F2",
								action:function(){
									let Elem = $("."+dialogClass)
								}
							}
						}
					});
				break;
				case "create-group":

				break;
				case "mute-conversation":

				break;
				case "ignore-messages":

				break;
				case "block-person":

				break;
				case "delete-conversation":

				break;
				case "help":

				break;
			}
		});
	}

	function ifMessagesNotSellected(){
	
		openMainMessages = openMainMessages == null || openMainMessages == undefined ? $(".message-inbox li:first-child").find("div").find("span").html() : openMainMessages;
		 $.getJSON('data/getUserinformation.php', {user: openMainMessages}, function(json, textStatus) {
			 	let id = json["id"];
			 	let picture = json["profile_picture"];
			 	let color = "#0084FF";
			 			let token = generateToken(8);
					 createNewMainChatBox({
						id:id,
						name:json["fullname"],
						picture:picture,
						color:color
					});
			 });
	}
	
	function fetchMessage(id,elem){
		$.ajax({
			url:"data/fetchAllMessages.php",
			type:"POST",
			data:{id:id},
			success:function(data){
				elem.html(data);
				messageContentBorderRadius();
			}
		});
	}
	function closeAllOpenTabs(){
		$(".menu-menu").css("display","none");
		$(".nav-right .circles .item").removeClass("active");
		$(".message-container .settings-container").css("display","none");
		colorFillIconSvgInChatBox("","");
	}

	function sendEmoji(obj){
		let message = obj["emoji"];
		let reciever = obj["reciever"];
		let token = obj["token"];
		let color  = obj["color"];
		let emoji = true;
		sendMessageRequest({
			reciever,message,token,color,emoji
		});		
	}
	function sendMessage(obj){
		let date = formatAMPM(new Date());
		let emoji;
		let NewMessage = null;
		let AppendMessage = null;
		if(obj["emoji"] == "true"){
			emoji = obj["message"];
			color = "#0084FF";
			$.ajax({
				url:"data/insertEmoji.php",
				type:"GET",
				data:{emoji,color},
				success:function(newMessage){
					 NewMessage =` 
		      			<div class="message-con right">
		      				<div class="status">
								<div class="status-content">
									<div class="image"></div>
								</div>
		      				</div>
		  					<div class="main-message-container">
		  						<div class="menu">
			  						<div class="flex">
			  							<div class="item hc"><div class="icon-emoji">`+ svg("emoji","svg") +`</div><div class="desc">More</div></div>
										<div class="item hc"><div class="icon-reload">`+ svg("reload","svg") +`</div><div class="desc">Reply</div></div>
										<div class="item hc "><div class="icon-more-gray">`+ svg("more-gray","svg") +`</div><div class="desc">React</div></div>
			  						</div>
		  						</div>
		  						<span class="content right hc" style="background:transparent">
		  						`+ newMessage +`	
		  						<div class="desc">`+date+`<div>
		  						</span>
		  					</div>
		  				</div>
				`;
				 AppendMessage = ` 
					
		      		<div class="main-message-container">
					<div class="menu">
						<div class="flex">
							<div class="item hc"><div class="icon-emoji">`+ svg("emoji","mysvg") +`</div><div class="desc">More</div></div>
						<div class="item hc"><div class="icon-reload">`+ svg("reload","mysvg") +`</div><div class="desc">Reply</div></div>
						<div class="item hc "><div class="icon-more-gray">`+ svg("more-gray","mysvg") +`</div><div class="desc">React</div></div>
						</div>
					</div>
					<span class="content right hc" style="background:transparent">
					`+ newMessage +`		
					<div class="desc">`+date+`<div>
					</span>
				</div>
				`;
						if($(".chat-history-token-"+obj["token"] + " .message-con").last().hasClass("right")){
						$(".chat-history-token-"+obj["token"] + " .message-con.right").last().append(AppendMessage);

					}else{
						$(".chat-history-token-"+obj["token"]).append(NewMessage);
					}
					messageContentBorderRadius();
				}
			});
		}else{
			 NewMessage =` 
	      			<div class="message-con right">
	      				<div class="status">
							<div class="status-content">
								<div class="image"></div>
							</div>
	      				</div>
	  					<div class="main-message-container">
	  						<div class="menu">
		  						<div class="flex">
		  							<div class="item hc"><div class="icon-emoji">`+ svg("emoji","svg") +`</div><div class="desc">More</div></div>
									<div class="item hc"><div class="icon-reload">`+ svg("reload","svg") +`</div><div class="desc">Reply</div></div>
									<div class="item hc "><div class="icon-more-gray">`+ svg("more-gray","svg") +`</div><div class="desc">React</div></div>
		  						</div>
	  						</div>
	  						<span class="content right hc" style="background:`+ obj["color"] +`">
	  						`+ obj["message"] +`	
	  						<div class="desc">`+date+`<div>
	  						</span>
	  					</div>
	  				</div>
			`;
			 AppendMessage = ` 
	      		<div class="main-message-container">
				<div class="menu">
					<div class="flex">
						<div class="item hc"><div class="icon-emoji">`+ svg("emoji","mysvg") +`</div><div class="desc">More</div></div>
					<div class="item hc"><div class="icon-reload">`+ svg("reload","mysvg") +`</div><div class="desc">Reply</div></div>
					<div class="item hc "><div class="icon-more-gray">`+ svg("more-gray","mysvg") +`</div><div class="desc">React</div></div>
					</div>
				</div>
				<span class="content right hc" style="background:`+ obj["color"] +`">
				`+ obj["message"] +`	
				<div class="desc">`+date+`<div>
				</span>
			</div>
			`;
		}
		
		if($(".chat-history-token-"+obj["token"] + " .message-con").last().hasClass("right")){
			$(".chat-history-token-"+obj["token"] + " .message-con.right").last().append(AppendMessage);

		}else{
			$(".chat-history-token-"+obj["token"]).append(NewMessage);
		}
		messageContentBorderRadius();	
	}

	function recieveMessage(obj){
		let sender = obj.sender;
		let date = formatAMPM(new Date());
		let NewMessage =` 
      			<div class="message-con left `+ obj["class"] +`">
      				<div class="status">
						<div class="status-content">
							<div class="image"></div>
						</div>
      				</div>
  					<div class="box">
						<div class="circle-content">
							<img src="`+ obj["picture"] +`" class="image" />
						</div>
  					</div>
  					<span class="content left hc">
  						`+ obj["message"] +`	
  						<div class="desc">`+date+`</div>
  					</span>
  				</div>
		`;
		let AppendMessage = ` 
			<br>
      		<span class="content left `+ obj["class"] +`" style="background:`+ obj["color"] +`">`+ obj["message"] +`</span>
		`;
		if($(".me-"+ sender +" #body .chat-history .message-con").last().hasClass("left")){
			$(".me-"+ sender +" #body .chat-history .message-con.left").last().append(AppendMessage);
		}else{
			$(".me-"+ sender +" #body .chat-history").append(NewMessage);
		}
		messageContentBorderRadius();	
		sendMessageRequest(obj);

	}
	
	function sendMessageRequest(obj){

		$.ajax({
			url:"client/clients.php",
			type:"POST",
			data:{id_reciever:obj["reciever"],message:obj["message"],token:obj["token"],color:obj["color"],action:"new_message",emoji:obj["emoji"]},
			success:function(){
				let token = obj["token"];
				let message = obj["message"];
				let color = obj["color"];
				let reciever = obj["reciever"];
				let emoji = obj["emoji"];
				if($(".chat-history-token-"+ token + " .message-con").last().hasClass("right")){
					$.ajax({
						url:"data/getMessageToken.php",
						type:"GET",
						data:{reciever:reciever},
						success:function(messageToken){
							$.ajax({
								url:"data/getMessageInfo.php",
								type:"GET",
								data:{reciever:reciever},
								success:function(id){
									let index = $(".chat-history-token-"+ token + " .message-con").last().find("span").length ;
									if(messageToken == "" || id == reciever){
										messageToken = generateToken(20);
									}
									insertMessage({
										reciever,message,token,color,index,messageToken,emoji
									});
									fetchinbox();
									}
								});
						}
					});
					
				}else if($(".chat-history-token-"+ token + " .message-con").last().hasClass("left")){
					let messageToken = generateToken(20);
					let index = $(".chat-history-token-"+ token + " .message-con").last().find("span").length ;
							
					// insertMessage({
					// 	reciever,message,token,color,index,messageToken
					// });
				
				}
		
		
			}
		});
		
	}
	function insertMessage(obj){

		$.ajax({
			url:"data/insertMessage.php",
			type:"POST",
			data:{reciever:obj["reciever"],message:obj["message"],token:obj["token"],color:obj["color"],index: obj["index"],messageToken:obj["messageToken"],emoji:obj["emoji"]},
			success:function(){
				fetchinbox();
			}
		});
	}
	function isUserTyping(obj){
		$.ajax({
			url:"client/clients.php",
			type:"POST",
			data:{id_reciever:obj["reciever"],message:obj["message"],token:obj["token"],color:obj["color"],action:"keypress",isTyping:obj["isTyping"]},
			success:function(){
	
			}
		});
	}
	function colorFillIconSvgInChatBox(token,color){
		let noncolor = "#BEC2C9"; 


		if(token == "" || token =="undefined"){
			$(".message-container #header .icons svg").css("fill",noncolor);
			$(".message-container #header .icons path").css("fill",noncolor);
			$(".message-container #footer path").css("fill",noncolor);
			$(".message-container #header .icons line").css("stroke",noncolor);
		}else{	
			$(".m-"+token +" #header .icons svg").css("fill",color);
			$(".m-"+token +" #header .icons path").css("fill",color);
			$(".m-"+token +" #footer  path").css("fill",color);
			$(".m-"+token +" #header .icons line").css("stroke",color);
		}
	}
	// DialogBox
		function makeDialogBox(...Args){
		let Ar0 = Args[0],Ar1 = Args[1];
		let { typeOfContent, header, buttons, dialogClass, backgroundDismiss} = Ar1;
		let content = Ar1["content"],Allbuttons = "",iniButton = [],code,dialog;
		backgroundDismiss = backgroundDismiss == null || backgroundDismiss == undefined ? false : true;
		if(buttons != false  && buttons != null){
			obj = Object.entries(Ar1["Allbuttons"]);
			Allbuttons = `<div class="buttons">`;

			for(let i = 0; i < obj.length;  i++){
				let button = obj[i];
				let btnObj = button[1];
				code = button[0].toLowerCase()+generateToken(8);
				button[2] = code; 
				iniButton.push(button);
				Allbuttons += `<button class="`+ code +`"><span>`+ button[0] +`</span></button>`;
			}
			Allbuttons += `</div`;
		}
		switch(typeOfContent){
			case "pick":
				content = getDialogBoxContent(typeOfContent);
			break;
			case "dialog":
				content = getDialogBoxContent(typeOfContent,content);
			break;
		}
		
		header = (header == false || header == null) ? "Dialog" : header;
		insertIntoDialog({header,typeOfContent,content,Allbuttons,iniButton,dialogClass, backgroundDismiss});
	}
	function insertIntoDialog(obj){
		let {header,typeOfContent,content,Allbuttons,iniButton,dialogClass,backgroundDismiss} = obj;
		let dialog = ` 
			<div class="DialogBox DialogBox-"  data-backgDis="`+ backgroundDismiss +`">
			<div class="DialogBox-background"></div>
			<div class="DialogBox-content">
				<div class="DialogBox-header">
					<h2>`+ header +`</h2>
					<div class="DialogBox-close"></div>
				</div>
				<div class="DialogBox-body scrollbar">
					<div class="content `+dialogClass +" "+typeOfContent +`">`+ content +`</div>
				</div>
				`+ Allbuttons +`
			</div>
		</div>
			`;
		$("body").append(dialog);

		for(let i = 0; i < iniButton.length; i++){
			let button = iniButton[i];
			let className = button[2];
			let action = button[1];

			$(document).on("click","."+className,function(){
				action.action();

				removeDialog()
			});
		}
		function removeDialog(){
		
			$(".DialogBox-background").parent().remove();

		}
		$(document).on("click",".DialogBox-background",function(){
			let backgroundDismiss = $(this).parent().attr("data-backgDis");
			
			if(backgroundDismiss){
				$(this).parent().find("div.DialogBox-content").effect( "shake" );
			}else{
				$(this).parent().remove();
			}
			
		});

	}
	function getDialogBoxContent(...Args){
		switch(Args[0]){
			case "pick":
				 content = `
					<div class="item"><div class="circle" style="background-color: rgb(138, 57, 239); background-image: radial-gradient(circle at center 75%, rgb(138, 57, 239) 0%, rgb(138, 57, 239) 6%, rgb(114, 76, 236) 12%, rgb(63, 119, 230) 18%, rgb(11, 161, 223) 24%, rgb(1, 179, 170) 30%, rgb(1, 190, 105) 36%, rgb(1, 201, 45) 42%, rgb(121, 199, 24) 48%, rgb(217, 197, 7) 54%, rgb(255, 176, 1) 60%, rgb(255, 135, 1) 66%, rgb(255, 122, 1) 72%, rgb(255, 93, 6) 78%, rgb(255, 49, 14) 84%, rgb(255, 4, 23) 90%, rgb(255, 0, 24) 96%);"></div></div>
					<div class="item"><div class="circle" style="background-color: rgb(255, 124, 168); background-image: radial-gradient(circle at center 75%, rgb(0, 229, 255) 0%, rgb(167, 151, 255) 50%, rgb(255, 143, 178) 100%);"></div></div>
					<div class="item"><div class="circle" style="background-color: rgb(26, 219, 91); background-image: radial-gradient(circle at center 75%, rgb(255, 210, 0) 0%, rgb(110, 223, 0) 50%, rgb(0, 223, 187) 100%);"></div></div>
					<div class="item"><div class="circle" style="background-color: rgb(240, 29, 106); background-image: radial-gradient(circle at center 75%, rgb(255, 46, 25) 0%, rgb(146, 0, 255) 50%, rgb(0, 95, 255) 100%);"></div></div>
					<div class="item"><div class="circle" style="background-color: rgb(255, 156, 25); background-image: radial-gradient(circle at center 75%, rgb(255, 220, 45) 0%, rgb(255, 150, 22) 50%, rgb(255, 79, 0) 100%);"></div></div>
					<div class="item"><div class="circle" style="background-color: rgb(14, 220, 222); background-image: radial-gradient(circle at center 75%, rgb(14, 230, 183) 0%, rgb(0, 230, 210) 50%, rgb(25, 201, 255) 100%);"></div></div>
					<div class="item"><div class="circle" style="background-color: rgb(0, 132, 255);"></div></div>
					<div class="item"><div class="circle" style="background-color: rgb(68, 190, 199);"></div></div>
					<div class="item"><div class="circle" style="background-color: rgb(255, 195, 0);"></div></div>
					<div class="item"><div class="circle" style="background-color: rgb(250,60,76)"></div></div>
					<div class="item"><div class="circle" style="background-color: rgb(214,150,187)"></div></div>
					<div class="item"><div class="circle" style="background-color: rgb(19,207,19)"></div></div>
					<div class="item"><div class="circle" style="background-color:rgb(255,126,41) ;"></div></div>
					<div class="item"><div class="circle" style="background-color: rgb(230,133,133);"></div></div>
					<div class="item"><div class="circle" style="background-color:rgb(118,70,255) ;"></div></div>
					<div class="item"><div class="circle" style="background-color: rgb(32,206,245);"></div></div>
					<div class="item"><div class="circle" style="background-color:rgb(255,92,161) ;"></div></div>
					`;
			break;

			case "dialog":
				content = ` 
				<div class="dialog-content">
					<p>`+ Args[1] +`</p>
				</div>
				`;
			break;
		}
		return content;
	}
	// INBOX
	function fetchinbox(){
		$.ajax({
			url:"client/clientinbox.php",
			type:"POST",
			data:{action:"fetchinbox"},
			success:function(data){
				if(data.fetch == "yes"){
					getInbox();
				}else{
					createInboxPreload($(".message-inbox"),10,true);
				}	
			}
		});
	}
	function getInbox(){
		$.ajax({
			url:"data/fetchMessageInbox.php",
			type:"POST",
			success:function(inbox){
				if(inbox == "" || inbox == null){
					
				}else if(inbox == "empty"){
					let message = `
					<center>
					<span class="icon-undraw_mobile_messages_u848" style="width:80%;">`+ svg("undraw_mobile_messages_u848","a") +`</span>
					<h3>You dont have messages yet</h3>
					</center>
					`;
					insertToInbox(message);
				}else{
					insertToInbox(inbox);
				}
				
			}
		});
	}
	function insertToInbox(data){
		$(".message-inbox").html(data);
	}
	// END INBOX

	// NOTIFICATIONS
	function insertNewNotification(obj){
		$.ajax({
			url:"data/insertNewNotification.php",
			type:"POST",
			data:obj,
			success:function(data){
				
			}
		});
	}
	 	function addToNotifications(...Args){
				let id = generateToken(10);
				let condition = Args[0];
				let post = Args[1];
				let user = Args[2];
				let {profile_picture,fullname} = user;
				let {src,message} = post;
				let content;
				switch(condition.condition){
					case "post":
						 content = `
						<div id="notification-float-item" class="notification-count-`+ id +`" data-id="`+ id +`" data-countdown="0">
							<div id="header">
								<h4>New Notification</h4>
							</div>
							<div id="body" >
								<div class="box">
									<div id="profile_pic">
										<img src="`+ profile_picture +`">
										<span><img src="`+ src +`"></span>
									</div>
									<div class="info"><p><a href="">`+ fullname +`</a> <span>`+ message +`</span></p></div>
								</div>
							</div>
						</div>
						`;
					break;
					case "status":
					let text,icon = "";
					switch(condition.status){
						case "connected":
							text = "Connected";
							icon = "icon-wifi";
						break;
						case "disconnected":
							text = "You are Disconnected to the Server!";
							icon = "icon-no-wifi";
						break;	
						case "disconnecting":
							text = "Slow Internet Connection!";
							icon = "icon-no-wifi";
						break;
						case "reconnecting":
							text = "Reconnecting!";
							icon = "icon-link";
						break;	
						case "reconnect_attempt":
							text = "Attempting to Reconnect!";
							icon = "icon-wrench";
						break;	
						case "reconnect_failed":
							text = "Failed to Reconnect!";
							icon = "icon-no-wifi";
						break;

					}
						 content = `
					<div id="notification-float-item" class="status notification-count-`+ id +`" data-id="`+ id +`" data-countdown="0" >
						<div id="body">
								<div class="box">
									<div id="profile_pic" class="`+ icon +`"></div>
									<div class="info"><p>`+ text +`</span></p></div>
								</div>
							</div>
					</div>
					`;
					break;	
				}
				
			
				$(".notification-float-container").append(content);
				svg("wifi","fb");
				svg("no-wifi","fb");
				svg("link","fb");
				svg("wrench","fb");
				notificationCountdown();	
		}
	function notificationCountdown(){

		let limit = 5;
		setInterval(function(){
			$("#notification-float-item").each(function(){
				let id = $(this).data("id");
				let countdown = $(this).data("countdown");

				countdown++;

				$(this).data("countdown",countdown);

				if(countdown == limit){
					$('.notification-count-'+id).hide("fast", function(){ $(this).remove(); });
					
				}
				
			});
		},2000);
	}
	$(document).on("mouseover","#notification-float-item",function(){
		$(this).data("countdown",0);
	});
	function changeTimeAndDate(){
		// $(".date_time_ago").each(function(){
		// 	let date = $(this).find("div").eq(0).data("timestamp");
		// 	$.ajax({
		// 		url:"data/timeAgo.php",
		// 		type:"GET",
		// 		data:{date:date},
		// 		success:function(newDate){
				
		// 		}
		// 	});
		// });
	}
	function formatAMPM(date) {
		  let hours = date.getHours();
		  let minutes = date.getMinutes();
		  let ampm = hours >= 12 ? 'PM' : 'AM';
		  hours = hours % 12;
		  hours = hours ? hours : 12; // the hour '0' should be '12'
		  minutes = minutes < 10 ? '0'+minutes : minutes;
		  let strTime = hours + ':' + minutes + ' ' + ampm;
		  return strTime;
	}

	// STATUS [ONLINE - OFFLINE]
	function updateUserStatus(){
		setInterval(function(){
			$.ajax({
				url:"data/updateUserStatus.php",
				type:"POST",
				success:function(data){
				
				}
			});
		},5000);
	}
	function requestRoom(obj){
		$.ajax({
			url:"client/clients.php",
			type:"POST",
			data:{action:"request_room",participants:obj["participants"]},
			success:function(){
				console.log("success")
			}
		})
	}
	function createRoom(data){
		let url = `http://localhost:3003/${data["roomId"]}`;
		window.open(url);
	}
	// SERVER
	function ListenToServer(port){
	$.ajax({
			url:"data/getSession.php",
			type:"GET",
			success:function(session){

			var socket = io.connect("http://localhost:"+port);

			socket.on("connection",function(){
				fetchinbox();
				addToNotifications({condition:"status",status:"connected"},false,false);
			});
			socket.on("disconnect",function(){
				addToNotifications({condition:"status",status:"disconnected"},false,false);
			});
			socket.on("disconnecting",function(){
				addToNotifications({condition:"status",status:"disconnecting"},false,false);
			});
			socket.on("reconnect_attempt",function(){
				addToNotifications({condition:"status",status:"reconnect_attempt"},false,false);
			});
			socket.on("reconnecting",function(){
				addToNotifications({condition:"status",status:"reconnecting"},false,false);
			});
			socket.on("reconnect_failed",function(){
				addToNotifications({condition:"status",status:"reconnect_failed"},false,false);
			});

			// Calls
			socket.on("send_call_request",function(data){
				if(data.to_id == session){
					$.getJSON('data/getUserinformation.php', {user: data.from_id}, function(json, textStatus){
						makeDialogBox(false,{
							header: json.fullname +" is calling!",
							content:"Do you want to answer "+json.fullname+" call? ",
							typeOfContent:"dialog",
							buttons:true,
							dialogClass:"Dialog-"+generateToken(12),
							backgroundDismiss: true,
							Allbuttons:{
									Cancel:{
										action:function(){

										}
									},
								Answer:{
									background:"#1877F2",
									action:function(){
										acceptCallRequest(data.to_id,json.id);
									}
								}
							}
						});
					});
				}			
			});
			socket.on("accept_call_request",function(data){
				if(data.from_id == session || data.to_id == session){
					$.getJSON('data/getUserinformation.php', {user: data.from_id}, function(fromId, textStatus){
						$.getJSON('data/getUserinformation.php', {user: data.to_id}, function(toId, textStatus) {
							if(fromId.id == session){
								requestRoom({
									type:"call",
									participants: [fromId.id,toId.id]
								});
							}
						});
					});
				}
			});
			socket.on("create_room",function(data){
				if(data.participants.includes(session)){
					createRoom(data)
				}
			});
			socket.on("fetchinbox",function(data){
				if(data.fetch == "yes"){
					getInbox()
				}
			});
			// When user  Typed
			socket.on("keypress",function(data){
				if(data.isTyping == "yes"){
					$.getJSON('data/getUserinformation.php', {user: data.sender}, function(json, textStatus) {
						let name = json.fullname;
						let picture = json.profile_picture;
						let color = "#0084FF";
						let id = json.id;
						let message = `
					<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" style="height:20px;width:30px;" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid">
					<circle cx="20" cy="57.5" r="15" fill="#85a2b6">
					  <animate attributeName="cy" calcMode="spline" keySplines="0 0.5 0.5 1;0.5 0 1 0.5;0.5 0.5 0.5 0.5" repeatCount="indefinite" values="57.5;42.5;57.5;57.5" keyTimes="0;0.3;0.6;1" dur="1s" begin="-0.6s"></animate>
					</circle> 
					<circle cx="60" cy="57.5" r="15" fill="#85a2b6">
					  <animate attributeName="cy" calcMode="spline" keySplines="0 0.5 0.5 1;0.5 0 1 0.5;0.5 0.5 0.5 0.5" repeatCount="indefinite" values="57.5;42.5;57.5;57.5" keyTimes="0;0.3;0.6;1" dur="1s" begin="-0.39999999999999997s"></animate>
					</circle> 
					<circle cx="100" cy="57.5" r="15" fill="#85a2b6">
					  <animate attributeName="cy" calcMode="spline" keySplines="0 0.5 0.5 1;0.5 0 1 0.5;0.5 0.5 0.5 0.5" repeatCount="indefinite" values="57.5;42.5;57.5;57.5" keyTimes="0;0.3;0.6;1" dur="1s" begin="-0.19999999999999998s"></animate>
					</circle>
					</svg>
						`;

						let NewMessage =  ` 
							<div class="typing-left">
								<img src="`+ picture +`" class="image">
								<div class="info" style="padding-left:10px;padding-bottom:0px;padding-top:8px;padding-right:15px;">`+ message +`</div>
							</div>
						`;
						if($(".me-"+ data.sender + " #body .chat-history .typing-left").length){

						}else{
							$(".me-"+ data.sender + " #body .chat-history").append(NewMessage);
						}
						
						messageContentBorderRadius();	
						});	

				}else{
					$(".me-"+ data.sender + " #body .chat-history .typing-left").remove();
				}

			});

			// When user Message
			socket.on("new_message",function (data){

					if(session == data.sender || session == data.reciever){
						let sender = data.sender;
						let reciever = data.reciever;
						let message = data.message;

						if(session == sender){

							sendMessage(data);

						}else if(session == reciever){
							if($(".me-" + sender).length != 0){
								$.getJSON('data/getUserinformation.php', {user: sender}, function(json, textStatus) {
										let name = json.fullname;
										let picture = json.profile_picture;
										let color = "#0084FF";
										let id = json.id;

										recieveMessage({
											message:message,sender:sender,reciever:reciever,picture:picture,color:""
										});
						

								});	

						
							}else{
								$.getJSON('data/getUserinformation.php', {user: sender}, function(json, textStatus) {
										let name = json.fullname;
										let picture = json.profile_picture;
										let color = "#0084FF";
										let id = json.id;
										
										createNewChatBox({
											id:id,
											name:name,
											picture:picture,
											color:color,
											message:message,
											sender:sender,
											reciverColor:""
										});
								

								});		
							}
						}
						fetchinbox();
					}
				
				});

			// POSTS


				socket.on("react-to-post",function(data){								
					fetchReaction(data.id);
				});
				socket.on("comment-to-post",function(data){								
					fetchReaction(data.id);
					$.getJSON('data/getPostInformation.php', {post: data.id}, function(post, textStatus) {
						$.getJSON('data/getPostCommentInformation.php', {comment: data.code}, function(comment, textStatus) {
							$.getJSON('data/getUserinformation.php', {user: comment.id}, function(json, textStatus) {
								$.getJSON('data/getUserinformation.php', {user: session}, function(me, textStatus) {
										fetchComments(data.comment,me,json,post,comment);
										
								});
							});	
						});		
					});
					
				});
				socket.on("reply-to-comment",function(data){								
					fetchReaction(data.id);
					$.getJSON('data/getPostInformation.php', {post: data.id}, function(post, textStatus) {
						$.getJSON('data/getPostCommentInformation.php', {comment: data.code}, function(comment, textStatus) {
							$.getJSON('data/getUserinformation.php', {user: comment.id}, function(json, textStatus) {
								$.getJSON('data/getUserinformation.php', {user: session}, function(me, textStatus) {
										fetchComments(data.comment,me,json,post,comment);
								});
							});	
						});		
					});
					
				});
				socket.on("new-notification",function(data){
					if(data.to_id == session && data.from_id != data.to_id){
						$.getJSON('data/getUserinformation.php', {user: data.from_id}, function(user, textStatus) {
							addToNotifications({condition:"post"},data,user);
						
						});
					}	
				});
			}
		});
	}
	window.addEventListener('popstate', function (event) {
		checkUrl();
	});
	function keyPressFunction(){
		$(document).on("keydown",function(e){
		// let url = window.location.pathname;
  //    	let siteRoot = "/facebook-clone";
  //    	let code = e.keyCode;
  //    	url = url.replace(siteRoot+"/","");

		});
	}
	// Server
	function InitializePort(){
		$.ajax({
			url:"port.txt",
			type:"GET",
			success:function(port){
				ListenToServer(port);
			}
		});
	}

	keyPressFunction();
	InitializePort();
	// Declare Functions
     checkUrl();
     scrollFunction();

     // Inbox
     fetchinbox();
      messageContentBorderRadius();
     // Posts

     fetchAllPosts();

     setInterval(function(){
     	changeTimeAndDate();
     },60000);


     updateUserStatus();

     fetchallUserHasStories();

});