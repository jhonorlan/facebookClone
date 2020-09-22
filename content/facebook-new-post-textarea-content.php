<div class="newPostTextArea-container">
	<div class="background"></div>
	<div class="newPostTextArea">
		<form method="POST" class="post-container-form" enctype="multipart/form-data">
			<div id="header">
				<center>
					<h2>Create a Post</h2>
				</center>
				<span class="close"><?php echo insvg("close") ?></span>
			</div>
			<div id="body">
				<div class="info-container">
					<img src="<?php echo $_SESSION["profile_picture"] ?>" class="circle">
					<div class="name"><span><?php echo $_SESSION["fullname"] ?></span></div>
				</div>
				<div class="main-container ">
					<div class="main-text-area scrollbar theme" contenteditable  placeholder="What's on your mind, <?php echo $_SESSION["fullname"] ?>?"></div>
				</div>
				<div class="post-image-preview"></div>
				<div class="some-container">
					<div class="theme-container">
						<div class="item main-theme-button hc" style="display: flex;justify-content: center;align-items:center;">
							<?php echo insvg("paint") ?>
							<div class="desc">Themes</div>
						</div>
						<span class="all-themes">
							<div class="item" data-bg="#000"></div>
							<div class="item" data-bg="#7321AD"></div>
							<div class="item" data-bg="#FFE0F7"></div>
							<div class="item" data-bg="#6EBFB5"></div>
							<div class="item" data-bg="#FA26A0"></div>
							<div class="item" data-bg="#FF9A76"></div>
							<div class="item" data-bg="#383E56"></div>
							<div class="item" data-bg="#FFF"></div>
						</span>
					</div>
					<div class="emoji hc" style="display: flex;justify-content: center;align-items: center;">
						<?php echo insvg("smile") ?>
						<div class="desc">Emoji</div>
					</div>
				</div>
				<div class="box">
					<p>Add to your Post</p>
					<div class="circles">
						<div class="item upload-images-button hc"><?php echo insvg("picture") ?><div  class="desc">Photo/Video</div></div>
						<div class="item hc"><?php echo insvg("tag") ?><div  class="desc">Tag Friends</div></div>
						<div class="item hc"><?php echo insvg("pin") ?><div  class="desc">Check In</div></div>
						<div class="item hc"><?php echo insvg("smile") ?><div  class="desc">Feeling/Activity</div></div>
						<div class="item hc"><?php echo insvg("gif") ?><div  class="desc">GIF</div></div>
						<div class="item hc"><?php echo insvg("more1") ?><div  class="desc">More</div></div>
					</div>
				</div>
					<input type="file" name="images[]"  hidden class="text-area-images" multiple>
					<input type="file" name="videos[]" hidden class="text-area-video">
					<input type="text" name="background" class="text-area-background" hidden>
					<input type="text" name="text" class="my-post-text" hidden>
					<input type="text" name="hasimage" class="hasimage" hidden>
					<input type="text" name="hasvideo" class="hasvideo" hidden>
				<input type="submit" class="submit-post" value="Post" >
			</form>
		</div>
	</div>
</div>