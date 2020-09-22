<nav>
	<div class="nav-left">
		<img src="image/facebook-logo.png" class="logo"/>
		<div class="search-engine-container">
			<?php svg("search") ?>
			<input type="text" class="search-engine home" placeholder="Search Facebook">
		</div>
	</div>
	<div class="nav-center">
		<div class="item active open-home">
			
			<?php svg("home") ?>
			<div class="description">Home</div>
		</div>
		<div class="item">
			<?php svg("watch") ?>
			<div class="description">Watch</div>
		</div>
		<div class="item">
			<?php svg("marketplace") ?>
			<div class="description">Marketplace</div>
		</div>
		<div class="item">
			<?php svg("groups") ?>
			<div class="description">Groups</div>
		</div>
		<div class="item gaming">
			<?php svg("gaming") ?>
			<div class="description">Gaming</div>
		</div>
		<div class="item more">
			<?php svg("more-menu") ?>
			<div class="description">More</div>
		</div>
	</div>
	<div class="nav-right">
		<div class="circles">
	
			<div class="item hc down">
				<?php echo insvg("down-arrow") ?>
				<span></span>
				<div class="desc bot">Account</div>
			</div>
			<div class="item hc">
				<?php svg("notification") ?>
				<div class="desc bot">Notification</div>
			</div>
			<div class="item hc messages-button">
				<?php svg("message") ?>
				<div class="desc bot">Messenger</div>
			</div>
			
			<div class="item hc">
				<?php echo insvg("more") ?>
				<div class="desc bot">Create</div>
			</div>
			<div class="profile open-profile">
				<img src="<?php echo $_SESSION["profile_picture"] ?>">
				<span><?php echo $_SESSION["firstname"] ?> </span>
			</div>
		</div>

		<div class="menu-menu menu-create scrollbar">
			<div id="header">
				<h1>Create</h1>
			</div>
			<div id="body">
				<li>
					<div class="circle">
						<img src="svg/edit.svg">
					</div>
					<div class="info">
						<span>Post</span>
						<small>Share a post on News Feed.</small>
					</div>
				</li>
				<li>
					<div class="circle">
						<img src="svg/book.svg">
					</div>
					<div class="info">
						<span>Story</span>
						<small>Share a photo or something.</small>
					</div>
				</li>
				<li>
					<div class="circle">
						<img src="svg/shine.svg">
					</div>
					<div class="info">
						<span>Live Event</span>
						<small>Add a life events to your profile.</small>
					</div>
				</li>
				<hr>
				<li>
					<div class="circle">
						<img src="svg/flag.svg">
					</div>
					<div class="info">
						<span>Page</span>
						<small>Connect and share with customers or fans.</small>
					</div>
				</li>
				<li>
					<div class="circle">
						<img src="svg/speaker.svg">
					</div>
					<div class="info">
						<span>Ad</span>
						<small>Advertice your Business, brand or organization.</small>
					</div>
				</li>
				<li>
					<div class="circle">
						<?php svg("groups") ?>
					</div>
					<div class="info">
						<span>Group</span>
						<small>Connect with people who share your interests.</small>
					</div>
				</li>
				<li>
					<div class="circle">
						<img src="svg/calendar.svg">
					</div>
					<div class="info">
						<span>Event</span>
						<small>Bring people together with a public or private event.</small>
					</div>
				</li>
				<li>
					<div class="circle">
						<img src="svg/bag.svg">
					</div>
					<div class="info">
						<span>Marketplace Listing</span>
						<small>Sell items to people in your community.</small>
					</div>
				</li>
				<li>
					<div class="circle">
						<img src="svg/fundraising.svg">
					</div>
					<div class="info">
						<span>Fundraiser</span>
						<small>Raise money for a cause you care about.</small>
					</div>
				</li>
			</div>
		</div>
		<div class="menu-menu menu-messenger scrollbar message-li-list">
			<div id="header">
				<h1>Messenger</h1>
				<div class="icons">
					<div class="icon"><i class="fa fa-expand-arrows-alt"></i></div>
					<div class="icon"><i class="fa fa-edit"></i></div>
					<div class="icon"><i class="fa fa-ellipsis-h"></i></div>
				</div>
			</div>
			<div class="message-search-engine-container" style="margin-top: -5px;">
				<?php svg("search") ?>
				<div class="message-search-engine" contenteditable placeholder="Search Messenger"></div>
			</div>
			<div class="message-body message-inbox">
				
			</div>
		<!-- 	<div id="footer">
				<a href="settings?tab=" class="settings-list">See All in Messenger</a>
			</div> -->
		</div>
		<div class="menu-menu menu-notification scrollbar">
			<div id="header">
				<h1>Notifications</h1>
				<div class="icons"  style="padding-right: 15px;">
					<div class="icon">
						<i class="fa fa-ellipsis-h"></i>
					</div>
				</div>
			</div>
			<div class="message-body">
				<li>
					<div class="circle"></div>
					<div class="info">
						<span>Step Sister</span>
						<small>You: Hampas ko sayo yan</small>
					</div>
					<div class="status"></div>
				</li>
				<li>
					<div class="circle"></div>
					<div class="info">
						<span>Step Sister</span>
						<small>You: Hampas ko sayo yan awd aw aw daw wa awdw</small>
					</div>
					<div class="status"></div>
				</li>
				<li>
					<div class="circle"></div>
					<div class="info">
						<span>Step Sister</span>
						<small>You: Hampas ko sayo yan</small>
					</div>
					<div class="status"></div>
				</li>
				<li>
					<div class="circle"></div>
					<div class="info">
						<span>Step Sister</span>
						<small>You: Hampas ko sayo yan</small>
					</div>
					<div class="status"></div>
				</li>
				<li>
					<div class="circle"></div>
					<div class="info">
						<span>Step Sister</span>
						<small>You: Hampas ko sayo yan</small>
					</div>
					<div class="status"></div>
				</li>
				<li>
					<div class="circle"></div>
					<div class="info">
						<span>Step Sister</span>
						<small>You: Hampas ko sayo yan</small>
					</div>
					<div class="status"></div>
				</li>
				<li>
					<div class="circle"></div>
					<div class="info">
						<span>Step Sister</span>
						<small>You: Hampas ko sayo yan</small>
					</div>
					<div class="status"></div>
				</li>
			</div>
		</div>
		<div class="menu-menu menu-account">
			<div id="body" class="account-body">
					<li class="profile">
						<img src="<?php echo $_SESSION["profile_picture"] ?>" class="circle">
						<div class="info">
							<span><?php echo $_SESSION["fullname"] ?></span>
							<small>See your profile</small>
						</div>
					</li>
				<hr>
				<li>
					<div class="circle">
						<img src="svg/feedback.svg">
					</div>
					<div class="info">
						<span>Give Feedback</span>
						<small>Help us improve the new Facebook</small>
					</div>
				</li>
				<hr>
				<li>
					<img src="image/kata.jpg" class="circle">
					<div class="info">
						<span>Switch Account</span>
						<small>Login as Justin Vincent</small>
					</div>
					<div class="menu">
						<?php echo insvg("more1") ?>
					</div>
				</li>
				<li>
					<div class="circle">
						<img src="svg/cog.svg">
					</div>
					<div class="info">
						<span>Settings & Privacy</span>
					</div>
					<div class="menu">
						<?php echo insvg("chevron-right") ?>
					</div>
				</li>
				<li>
					<div class="circle">
						<img src="svg/question.svg">
					</div>
					<div class="info">
						<span>Help & Support</span>
					</div>
					<div class="menu">
						<?php echo insvg("chevron-right") ?>
					</div>
				</li>
				<li>
					<div class="circle">
						<img src="svg/moon.svg">
					</div>
					<div class="info">
						<span>Dark Mode</span>
					</div>
					<div class="switch">
						<div class="onOff darkmode" value="off"></div>
					</div>
				</li>
				<li>
					<div class="circle">
						<img src="svg/back.svg">
					</div>
					<div class="info">
						<span>Switch to Classic Facebook</span>
						<small>Go back to the previous Facebook design at any time</small>
					</div>
				</li>
				<a href="data/logout.php">
					<li>
					<div class="circle">
						<img src="svg/logout.svg">
					</div>
					<div class="info">
						<span>Logout</span>
					</div>
				</li>
				</a>
			</div>
		</div>
	</div>
</nav>