<div class="facebook-content watch-body facebook-content-body" style="display: none;">
	<div class="facebook-left-content">
		<div class="header">
			<h2>Watch</h2>
			<div class="message-search-engine-container">
					<?php svg("search") ?>
				<div class="message-search-engine" contenteditable placeholder="Search Watch"></div>
			</div>
		</div>
		<div class="body">
			<div class="left-content scrollbar">
				<li class="active">
					<div class="circle">
						<?php svg("watch") ?>
					</div>
					<div class="info">Home</div>
				</li>
				<li>
					<div class="circle"></div>
					<div class="info">Shows</div>
				</li>
				<li>
					<div class="circle"></div>
					<div class="info">Live</div>
				</li>
				<li>
					<div class="circle"></div>
					<div class="info">Saved Videos</div>
				</li>
				<hr class="hr-94-10">				
			</div>
		</div>
	 </div>
 	<div class="facebook-right-content">
	 	<div class="main-content">
		 	<div class="user-post-container">
				<div id="header">
					<div class="box">
						<img src="image/profile.jpg" id="circle"/>
					<div id="info">
						<a href="#"><?php echo $_SESSION["fullname"] ?></a>
						<span>5hr</span>
					</div>
					</div>
				</div>
				<div id="text-content">I created this...</div>					
				<div id="video-content">
				<!-- 	<video width="100%" height="auto" >
					  <source src="video/Connected.mp4" type="video/mp4">
					  <source src="movie.ogg" type="video/ogg">
					</video> -->
					<div class="controls">
					  	<div class="play-control">
				  				<span class="play">
				  					<?php echo insvg("play_arrow-24px") ?>
				  				</span>
				  				<span class="pause">
				  					<?php echo insvg("pause-24px") ?>
				  				</span>
				  				<span class="current-time">
				  					00:00
				  				</span>
				  				<span>
				  					/
				  				</span>
				  				<span class="limit-time">
				  					00:00
				  				</span>
					  	</div>
					  		<div class="time-control">
					  			<div class="current-range"></div>
					  			<div class="loading-range"></div>
					  		</div>
					  		<div class="video-control">
					  			<div class="svg hc">
					  				<?php echo insvg("settings") ?>
					  				<div class="desc">Settings</div>
					  			</div>
					  			<div class="svg hc">
					  				<?php echo insvg("open_in_full") ?>
					  				<div class="desc">Enlarge</div>
					  			</div>
					  			<div class="svg volume">
					  				<?php echo insvg("volume_up") ?>
					  				<div class="adjust-volume">
					  					<input type="range" name="" value="100" max="100" min="0">
					  				</div>
					  			</div>
					  		</div>
					  	</div>
				</div>
	            <div id="reactions">
					<img src="svg/heart.svg">
					<img src="svg/care.svg">
					<img src="svg/wow.svg">
					<span class="left">
						Micaela Manansala and 4.1k others
					</span>
					<span class="right">
						2.3k Shares
					</span>
				</div>								
				<div id="footer">
					<div class="react-buttons">
						<div class="item">
							<img src="svg/like.svg">
							<span>Like</span></div>
						<div class="item">
							<img src="svg/comment.svg">
							<span>Comment</span></div>
						<div class="item">
							<img src="svg/share.svg">
							<span>Share</span></div>
					</div>
					<div class="comment-container">
						<img src="image/profile.jpg">
						<div class="comment-textarea" contenteditable placeholder="Write a comment"></div>
					</div>
				</div>
			</div>
	 	</div>
 	</div>
</div>