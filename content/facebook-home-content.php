<div class="facebook-content home-body">
	<div class="body">
		<div class="left-content scrollbar">
			<li class="open-profile">
				<img src="<?php echo $_SESSION["profile_picture"] ?>">
				<div class="info"><?php echo $_SESSION["fullname"] ?></div>
			</li>
			<li>
				<img src="image/icons/covid.png" alt="">
				<div class="info">COVID-19 Information Center</div>
			</li>
			<li>
				<img src="image/icons/pages.png" alt="" >
				<div class="info">Pages</div>
			</li>
			<li>
				<img src="image/icons/friends.png" alt="">
				<div class="info">Friends</div>
			</li>
			<li class="open-messenger">
				<img src="image/icons/messenger.png" alt="">
				<div class="info">Messenger</div>
			</li>
			<div class="li-see-more">
				<li>
					<i class="fa fa-chevron-down" style="margin-left:;font-size: 12px;background: #D8DADF;padding: 8px;border-radius: 50px;color: #777C84;"></i>
					<div class="info">See More</div>
				</li>
			</div>
			<div class="li-hidden" style="display: none;">
				<li>
				<img src="image/icons/videos.png"  alt="">
				<div class="info">Videos</div>
			</li>
			<li>
				<img src="image/icons/marketplace.png" alt="" >
				<div class="info">Marketplace</div>
			</li>
			<li>
				<img src="image/icons/events.png" alt="" >
				<div class="info">Events</div>
			</li>
			<li>
				<img src="image/icons/fundraisers.png" alt="" >
				<div class="info">Fundraisers</div>
			</li>
			<li>
				<img src="image/icons/groups.png" alt="" >
				<div class="info">Groups</div>
			</li>
			<li>
				<img src="image/icons/friendlist.png" alt="" >
				<div class="info">Friend Lists</div>
			</li>
			<li>
				<img src="image/icons/games.png" alt="" >
				<div class="info">Games</div>
			</li>
			<li>
				<img src="image/icons/mostrecent.png" alt="" >
				<div class="info">Most Recent</div>
			</li>
			<li>
				<img src="image/icons/gaming.png" alt="" >
				<div class="info">Gaming Video</div>
			</li>
			<li>
				<img src="image/icons/crisis.png" alt="" >
				<div class="info">Crisis Response</div>
			</li>
			<li>
				<img src="image/icons/offers.png" alt="" >
				<div class="info">Offers</div>
			</li>
			<li>
				<img src="image/icons/weather.png" alt="" >
				<div class="info">Weather</div>
			</li>
			<li>
				<img src="image/icons/recentadactivity.png" alt="" >
				<div class="info">Recent Ad Activity</div>
			</li>
			<li>
				<img src="image/icons/buyandsell.png" alt="" >
				<div class="info">Buy and Sell Groups</div>
			</li>
			<li>
				<img src="image/icons/live.png" alt="" >
				<div class="info">Live Video</div>
			</li>
			<li>
				<img src="image/icons/save.png" alt="" >
				<div class="info">Saved</div>
			</li>
			<li>
				<img src="image/icons/memories.png" alt="" >
				<div class="info">Memories</div>
			</li>
			<li>
				<img src="image/icons/jobs.png" alt="" >
				<div class="info">Jobs</div>
			</li>
			<li>
				<img src="image/icons/favorites.png" alt="" >
				<div class="info">Favorites</div>
			</li>
			<div class="li-see-less">
				<li>
					<i class="fa fa-chevron-up" style="margin-left:;font-size: 12px;background: #D8DADF;padding: 8px;border-radius: 50px;color: #777C84;"></i>
					<div class="info">See Less</div>
				</li>
			</div>
			</div>
			<div class="heading">
				<hr style="width: 95%;margin-left: 5%;margin-top: 10px;margin-bottom: 10px;">
				<h3>Your Shorcuts</h3>
			</div>
			<div class="shorcuts">
			<li>
				<img class="hu5pjgll bixrwtb6" src="image/pages/hugot.png" alt="" >
				<div class="info">Hugot & Quotes</div>
			</li>
			<li>
				<img class="hu5pjgll bixrwtb6" src="image/pages/web.jpg" alt="" >
				<div class="info">Web Design and Development</div>
			</li>
			<li>
				<img class="hu5pjgll bixrwtb6" src="image/pages/chess.png" alt="" >
				<div class="info">Chess</div>
			</li>
			<li>
				<img class="hu5pjgll bixrwtb6" src="image/pages/html.jpg" alt="" >
				<div class="info">HTML CSS JAVASCRIPT</div>
			</li>
			<li>
				<img class="hu5pjgll bixrwtb6" src="image/pages/poem.jpg" alt="" >
				<div class="info">Poem Society</div>
			</li>

			</div>
		</div>

		<div class="center-content">
			<div class="home-content">
				<!-- Story -->
				<story>
                    <div class="story-container">
                    	<div class="prev"></div>
                    	<div class="next">
                    		<i class="fa fa-arrow-right"></i>
                    	</div>
						<div class="item me">
							<div class="top">
								<img src="<?php echo $_SESSION["profile_picture"] ?>">
							</div>
							<div class="bot">
								<div>
									Create a 
								</div>
								<div>Story</div>
							</div>
							<div class="circle">
								<div class="content"></div>
							</div>
						</div>
						<?php fetchallUserHasStories("",$connect); ?>
				   </div>
				</story>
				<!-- Post Main Container -->
				<div class="post-main-container">
					<div id="header">
						<img src="<?php echo $_SESSION["profile_picture"] ?>" class="circle"/>
						<div class="post-text-container">
							<input type="text" name="post-text-area" class="post-text-area" placeholder="What's on your mind, <?php echo $_SESSION["fullname"] ?>?">
						</div>
					</div>

					<div id="footer">
						<div id="item">
							<img src="image/lived.png">
							<span>Live Video</span>
						</div>
						<div id="item" class="upload-images-button">
							<img src="image/picture.png">
							<span>Photo/Video</span>
						</div>
						<div id="item">
							<img src="image/smile.png">
							<span>Felling/Activity</span>
						</div>
					</div>
				</div>
               

               <!-- Post Content -->
             	<div class="user-post-content">
             		<div class="all-user-post-content"></div>
             		<div class="all-user-post-content-response"></div>
             	</div>

			</div>
		</div>

		<div class="right-content scrollbar">
				<div class="main-right-content-content ">
	
					<div class="your-pages">
						<h4>Your Pages</h4>
						<div class="right-content-content">
							<img src="" class="image">
							<div class="info">UTF-8</div>
						</div>
						<div class="right-content-content marginLeft">
							<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 28 28" alt="" class="image" height="20" width="20"><path stroke="#050505" d="M7.847 23.488C9.207 23.488 11.443 23.363 14.467 22.806 13.944 24.228 12.581 25.247 10.98 25.247 9.649 25.247 8.483 24.542 7.825 23.488L7.847 23.488ZM24.923 15.73C25.17 17.002 24.278 18.127 22.27 19.076 21.17 19.595 18.724 20.583 14.684 21.369 11.568 21.974 9.285 22.113 7.848 22.113 7.421 22.113 7.068 22.101 6.79 22.085 4.574 21.958 3.324 21.248 3.077 19.976 2.702 18.049 3.295 17.305 4.278 16.073L4.537 15.748C5.2 14.907 5.459 14.081 5.035 11.902 4.086 7.022 6.284 3.687 11.064 2.753 15.846 1.83 19.134 4.096 20.083 8.977 20.506 11.156 21.056 11.824 21.986 12.355L21.986 12.356 22.348 12.561C23.72 13.335 24.548 13.802 24.923 15.73Z"></path></svg>
							<div class="info"><span>20+ Notifications</span></div>
						</div>
						<div class="right-content-content marginLeft">
							<div class="image"></div>
							<div class="info"><span>Create Promotion</span></div>
						</div>
					</div>
					<hr class="hr-25-5">
					<div class="friend-requests">
						<h4>Friend Requests</h4>
						<div class="right-content-content block">
							<img src="" class="image">
							<div class="info"><span>Jean Dela Cruz</span></div>
							<div class="buttons">
								<div class="item active"><span>Confirm</span></div>
								<div class="item "><span>Delete</span></div>
							</div>
						</div>
					</div>
					<hr class="hr-25-5">
					<div class="birthdays">
						<h4>Birthdays</h4>
						<div class="right-content-content">
							<img src="image/gift.png" class="image" style="background: none;border-radius: 0px;width: 24px;height: 24px;">
							<div class="info"><span><b>Jerald Tero</b> and <b>14 others</b> have birthdays today.</span></div>
						</div>
					</div>
					<hr class="hr-25-5">
					<div class="all-contacts">
						<h4>Contacts</h4>
						<div class="all-contacts">
							<?php getAllUser($connect); ?>
						</div>
					</div>
				</div>
		</div>
	</div>
</div>