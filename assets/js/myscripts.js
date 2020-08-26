$(document).ready(function(){

	
	
	let openTabMessages = [];
	let openTab = [];
	let openMainMessages = GetParameterValues("t");

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
		}
		

	});
	
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
		if(openTabMessages.includes(name)){

		}else{
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

		if(menu == "messenger"){
			fetchinbox()
		}
	});

	$(document).on("click",".switch",function(){
		let value = $(this).find("div").attr("value");
		let val;
		let width = $(this).find("div").width();
		if(value == "off"){
			val = "on"; 
			$(this).find("div").css("margin-left","+="+width);
			$(this).addClass("active");
		}else{
			val = "off";
			$(this).find("div").css("margin-left","0px");
			$(this).removeClass("active");
		}

		$(this).find("div").attr("value",val);
		darkmode();
	});
	function darkmode(){
		let darkmode = $(".darkmode").attr("value");

		if(darkmode == "on"){
			$("*").not(".switch").css({
				"background":"#18191A",
				"color":"#fff",
				"fill":"#fff"
			});
		}else{
			
		}
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
		let tab = "messages";
		switchTab(tab);
		changeUrl(tab);

	});
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
			console.log("error");
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
		console.log(val)
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
		let token = $(this).parent().data("token");
		let color = $(this).parent().data("color");
		let emoji = "Like";
		sendEmoji({
			reciever,token,emoji,color
		});
	});

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
															// FUNCTIONS
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

	window.onscroll = function() {scrollFunction()};
	function scrollFunction() {
	  if (document.body.scrollTop > 150 || document.documentElement.scrollTop > 550) {
	  	$(".profile-menu").addClass("fixed");
	  } else {
	   $(".profile-menu").removeClass("fixed");
	  }
	}

	$(".skill-con").each(function(){
		let value = $(this).find("div").find("div").attr("value");
		 value = value + "%";

		$(this).find("div").find("div").css("width",value);

	});

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

		let first = tab.substring(0,1).toUpperCase();
		let length = tab.length;
		let other = tab.substring(1,length);
		let url = first + other ;
		if(url == "Home"){
			let newUrl = "Facebook";
			changeTitle(newUrl);
			whenMessagesTab(false);
		}else if(url == "Messages"){
			whenMessagesTab(true);
		}else{
			whenMessagesTab(false);
			let newUrl = url + " | Facebook";
			changeTitle(newUrl);
		}
		switchActiveButton(tab)
	}

	function changeUrl(url){
		history.pushState({},"",url);
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
     	
     	let pages = ["home","watch","marketplace","groups","gaming","messages"];
     	if(url == ""){
     		url = "home";
     	}else if(url == "index.php"){
     		url = "home";
     	}else{
     		if(!pages.includes(url)){

     			removeFilledActiveItemInNav();
     			switchTab("no-content");

     			$.ajax({
     				url:"data/isUserExist.php",
     				type:"POST",
     				data:{user:url},
     				success:function(response){
     					if(response == "true"){
     						return getProfile(url);
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
     function whenMessagesTab(bool){
     	$(".nav-right .circles .item").each(function(){
     		if($(this).hasClass('messages-button')){
     			if(bool == true){
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

	function changeTitle(newTitle){
		document.title = newTitle;
	}
	function changeFavicon(newIcon){
		$(".rel").attr("href",newIcon);
	}
	function getProfile(user){
		$.ajax({
			url:"data/getProfile.php",
			type:"GET",
			data:{user:user},
			success:function(profile){
				openProfile(profile);
				fetchAllPostsInProfile(user);
				removeFilledActiveItemInNav();
				if(user == "me"){
					$(".open-profile").addClass("active");
					user = "me";
				}
				changeUrl(user);
			}
		});
	}
	function openProfile(profile){
		$(".user-profile-body").html(profile);
		$(".facebook-content").css("display","none");
		$(".profile-body").css("display","block");
		
	} 
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

	function svg(name,condition){
		let svgs = "";
		if(condition == "fb"){
			$.ajax({
				url:"data/fbsvg.php",
				type:"GET",
				data:{name:name},
				success:function(svgs){
					if(svgs =="undefined"){
	
						console.log("error")
					}else{
						$(".icon-"+name).html(svgs);
					}
					
				}
			});
		}else if(condition == "insvg"){
			$.ajax({
				url:"data/insvg.php",
				type:"GET",
				data:{name:name},
				success:function(svgs){
					if(svgs =="undefined"){
							console.log("error")
					}else{
						$(".icon-"+name).html(svgs);
					}

				}
			});
		}else if(condition == "mysvg"){
			$.ajax({
				url:"data/mysvg.php",
				type:"GET",
				data:{name:name},
				success:function(svgs){
					if(svgs =="undefined"){

							console.log("error")
					}else{
						$(".icon-"+name).html(svgs);
					}

				}
			});
		}else{
			$.ajax({
				url:"data/svg.php",
				type:"GET",
				data:{name:name},
				success:function(svgs){
					if(svgs =="undefined"){
						console.log("error")
					}else{
						$(".icon-"+name).html(svgs);
					}
					
				}
			});
		}	
		console.log(svgs)
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
			console.log(data)
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
				$(".float-box").append(shortcut);
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
	  		     <div class="settings-container">
	  					<li>
	  						<div class="circle"></div>
	  						<div class="info"><span>Open in Messenger</span></div>
	  					</li>
	  					<li>
	  						<div class="circle"></div>
	  						<div class="info"><span>View Profile</span></div>
	  					</li>
	  					<hr>
	  					<li>
	  						<div class="circle"></div>
	  						<div class="info"><span>Color</span></div>
	  					</li>
	  					<li>
	  						<div class="circle"></div>
	  						<div class="info"><span>Emoji</span></div>
	  					</li>
	  					<li>
	  						<div class="circle"></div>
	  						<div class="info"><span>Nicknames</span></div>
	  					</li>
	  					<hr>
	  					<li>
	  						<div class="circle"></div>
	  						<div class="info"><span>Create group</span></div>
	  					</li>
	  					<hr>
	  					<li>
	  						<div class="circle"></div>
	  						<div class="info"><span>Mute Conversation</span></div>
	  					</li>
	  					<li>
	  						<div class="circle"></div>
	  						<div class="info"><span>Ignore messages</span></div>
	  					</li>
	  					<li>
	  						<div class="circle"></div>
	  						<div class="info"><span>Block</span></div>
	  					</li>
	  					<hr>
	  					<li>
	  						<div class="circle"></div>
	  						<div class="info"><span>Delete Conversation</span></div>
	  					</li>
	  					<li>
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
						}
					});
				}
			});
		}else{
			$(".message-big-pipe-container").prepend(chatbox);
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
	function ifMessagesNotSellected(){
		if(openMainMessages == null || openMainMessages =="undefined"){
			 openMainMessages = $(".message-inbox li:first-child").find("div").find("span").html();
		}
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
	
	function closeAllOpenTabs(){
		$(".menu-menu").css("display","none");
		$(".nav-right .circles .item").removeClass("active");
		$(".message-container .settings-container").css("display","none");
		colorFillIconSvgInChatBox("","");
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
	function fetchinbox(){
		$.ajax({
			url:"client/clientinbox.php",
			type:"POST",
			data:{action:"fetchinbox"},
			success:function(data){
				if(data.fetch == "yes"){
					getInbox();
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

	function insertNewNotification(obj){
		$.ajax({
			url:"data/insertNewNotification.php",
			type:"POST",
			data:obj,
			success:function(data){
				console.log(data)
			}
		});
	}
	 	function add_to_notifications(post,user){
				let id = generateToken(10);
				let content = `
				<div id="notification-float-item" class="notification-count-`+ id +`" data-id="`+ id +`" data-countdown="0">
					<div id="header">
						<h4>New Notification</h4>
					</div>
					<div id="body" >
						<div class="box">
							<div id="profile_pic">
								<img src="`+user.profile_picture +`">
								<span><img src="`+ post.src +`"></span>
							</div>
							<div class="info"><p><a href="">`+ user.fullname +`</a> <span>`+ post.message +`</span></p></div>
						</div>
					</div>
				</div>
				`;
			
				$(".notification-float-container").prepend(content);

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
					console.log("finished");
				}
				console.log(countdown)
			});
		},2000);
	}
	$(document).on("mouseover","#notification-float-item",function(){
		$(this).data("countdown",0);
	});
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
	function ListenToServer(port){
	$.ajax({
			url:"data/getSession.php",
			type:"GET",
			success:function(session){

			var socket = io.connect("http://localhost:"+port);

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
										console.log(comment)
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
							add_to_notifications(data,user);
						
						});
					}	
				});
			}
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

});