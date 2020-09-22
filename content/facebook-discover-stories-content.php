<?php 
include '../database.php';
session_start();
?>
<div class="facebook-left-content discover" style="overflow-y: auto;">
	<div class="header discover">
		<h2>Stories</h2>
		<div class="icons">
			<p>Settings</p>
		</div>
	</div>
	<div class="story-list">
		<div class="story-content-body discover" >
				<h3>Your Story</h3>
				<div class="prof discover">
					<img src="<?php $data = get_user_information($_SESSION["id"],$connect); echo $data["profile_picture"] ?>" class="circle">
					<div class="info">
						<p>Create a Story</p>
						<small >Share a photo or write Something</small>
					</div>
				</div>
				<h3>All Stories</h3>
				<div class="fetchallUserHasStories-content"></div>

			</div>
	</div>
</div>
<div class="facebook-right-content discover">
	<div class="story-main-content">
		<div class="story-buttons left prev-story">
			<div class="icons"><div class="icon"><?php echo mysvg("chevron-right") ?></div></div>
		</div>
		<div class="user-main-story no-story-content"><p>Click to view Story</p></div>
		<div class="story-buttons right next-story">
			<div class="icons"><div class="icon "><?php echo mysvg("chevron-right") ?></div></div>
		</div>
	</div>
	<div class="story-reaction-container">
		<div class="story-reply-container">
			<div class="story-reply-textarea" contenteditable placeholder="Reply"></div>
		</div>
		<div class="story-reactions">
			<img src="image/reactions/svg/like.svg" class="item">
			<img src="image/reactions/svg/love.svg" class="item">
			<img src="image/reactions/svg/care.svg" class="item">
			<img src="image/reactions/svg/haha.svg" class="item">
			<img src="image/reactions/svg/wow.svg" class="item">
			<img src="image/reactions/svg/sad.svg" class="item">
			<img src="image/reactions/svg/angry.svg" class="item">
		</div>
	</div>
</div>