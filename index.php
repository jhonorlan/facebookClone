<?php
include 'database.php';
session_start();
if(!isset($_SESSION["id"])){
	header("Location: login/");
}


?>
<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<meta http-equiv="X-UA-Compatible" content="IE=Edge">
   <meta name="viewport" content="width=device-width, initial-scale=1.1">
	<title>Facebook</title>

		<!-- Jquery Cdn -->
	<script type="text/javascript" src="lib/jquery/jquery.js"></script>

	<!-- Css -->
	<link rel="stylesheet" type="text/css" href="assets/css/styles.css">
	<link rel="stylesheet" type="text/css" href="assets/css/theresponsive.css">
	<link rel="stylesheet" type="text/css" href="assets/css/main-style.css">
	<link rel="icon" href="image/facebook-logo.png" class="rel">

	<!--  -->
	<script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.14.0/js/all.min.js"></script>
	<script type="text/javascript" src="lib/socket/socket.io.js"></script>



	<script type="text/javascript" src="lib/momment/momment.min.js"></script>
</head>
<body>
	<!-- Root -->
		
	<main>
		<!-- For facebook -->
		<facebook class="view">
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
						<div id="footer">
							<a href="">See All in Messenger</a>
						</div>
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
<!-- ..............PROFILE.................................................................... -->
		<div class="profile-body user-profile-body" style="display: none;"></div>
<!-- ..............HOME........................................................................ -->
		<div class="facebook-content home-body">
			<div class="body">
				<div class="left-content scrollbar">
					<li class="open-profile">
						<img src="<?php echo $_SESSION["profile_picture"] ?>">
						<div class="info"><?php echo $_SESSION["fullname"] ?></div>
					</li>
					<li>
						<img class="hu5pjgll bixrwtb6" src="https://static.xx.fbcdn.net/rsrc.php/v3/yg/r/kOxV5aCYUAE.png" alt="">
						<div class="info">COVID-19 Information Center</div>
					</li>
					<li>
						<img class="hu5pjgll bixrwtb6" src="https://static.xx.fbcdn.net/rsrc.php/v3/yH/r/kyCAf2jbZvF.png" alt="" >
						<div class="info">Pages</div>
					</li>
					<li>
						<img class="hu5pjgll bixrwtb6" src="https://static.xx.fbcdn.net/rsrc.php/v3/y8/r/S0U5ECzYUSu.png" alt="">
						<div class="info">Friends</div>
					</li>
					<li class="open-messenger">
						<img class="hu5pjgll bixrwtb6" src="https://static.xx.fbcdn.net/rsrc.php/v3/yh/r/SeXJIAlf_z-.png"  alt="">
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
						<img class="hu5pjgll bixrwtb6" src="https://static.xx.fbcdn.net/rsrc.php/v3/y5/r/duk32h44Y31.png"  alt="">
						<div class="info">Videos</div>
					</li>
					<li>
						<img class="hu5pjgll bixrwtb6" src="https://static.xx.fbcdn.net/rsrc.php/v3/yU/r/D2y-jJ2C_hO.png" alt="" >
						<div class="info">Marketplace</div>
					</li>
					<li>
						<img class="hu5pjgll bixrwtb6" src="https://static.xx.fbcdn.net/rsrc.php/v3/ys/r/8wTx0Eu2vRq.png" alt="" >
						<div class="info">Events</div>
					</li>
					<li>
						<img class="hu5pjgll bixrwtb6" src="https://static.xx.fbcdn.net/rsrc.php/v3/yj/r/n2vd2VduYc1.png" alt="" >
						<div class="info">Fundraisers</div>
					</li>
					<li>
						<img class="hu5pjgll bixrwtb6" src="https://static.xx.fbcdn.net/rsrc.php/v3/y5/r/PrjLkDYpYbH.png" alt="" >
						<div class="info">Groups</div>
					</li>
					<li>
						<img class="hu5pjgll bixrwtb6" src="https://static.xx.fbcdn.net/rsrc.php/v3/yQ/r/MN5ZSGIfEZ3.png" alt="" >
						<div class="info">Friend Lists</div>
					</li>
					<li>
						<img class="hu5pjgll bixrwtb6" src="https://static.xx.fbcdn.net/rsrc.php/v3/yt/r/PObY9OA5lvJ.png" alt="" >
						<div class="info">Games</div>
					</li>
					<li>
						<img class="hu5pjgll bixrwtb6" src="https://static.xx.fbcdn.net/rsrc.php/v3/ye/r/w-vdKCGzCy1.png" alt="" >
						<div class="info">Most Recent</div>
					</li>
					<li>
						<img class="hu5pjgll bixrwtb6" src="https://static.xx.fbcdn.net/rsrc.php/v3/yb/r/5EU1wNhLmR6.png" alt="" >
						<div class="info">Gaming Video</div>
					</li>
					<li>
						<img class="hu5pjgll bixrwtb6" src="https://static.xx.fbcdn.net/rsrc.php/v3/yT/r/cT5nPnO8Wsc.png" alt="" >
						<div class="info">Crisis Response</div>
					</li>
					<li>
						<img class="hu5pjgll bixrwtb6" src="https://static.xx.fbcdn.net/rsrc.php/v3/y_/r/NYOGcd-z-qs.png" alt="" >
						<div class="info">Offers</div>
					</li>
					<li>
						<img class="hu5pjgll bixrwtb6" src="https://static.xx.fbcdn.net/rsrc.php/v3/yC/r/bo0Zt72NIra.png" alt="" >
						<div class="info">Weather</div>
					</li>
					<li>
						<img class="hu5pjgll bixrwtb6" src="https://static.xx.fbcdn.net/rsrc.php/v3/yj/r/8OasGoQgQgF.png" alt="" >
						<div class="info">Recent Ad Activity</div>
					</li>
					<li>
						<img class="hu5pjgll bixrwtb6" src="https://static.xx.fbcdn.net/rsrc.php/v3/yz/r/AzoqGSvagcH.png" alt="" >
						<div class="info">Buy and Sell Groups</div>
					</li>
					<li>
						<img class="hu5pjgll bixrwtb6" src="https://static.xx.fbcdn.net/rsrc.php/v3/yG/r/Nl9CPY6q_n-.png" alt="" >
						<div class="info">Live Video</div>
					</li>
					<li>
						<img class="hu5pjgll bixrwtb6" src="https://static.xx.fbcdn.net/rsrc.php/v3/yD/r/lVijPkTeN-r.png" alt="" >
						<div class="info">Saved</div>
					</li>
					<li>
						<img class="hu5pjgll bixrwtb6" src="https://static.xx.fbcdn.net/rsrc.php/v3/y6/r/VPndBxotRgH.png?_nc_eui2=AeEDcSA4PyR5RomRMMG_qMNVFvGCZ9KBlcEW8YJn0oGVwRhmneIgTrDUisXNg2w7Yp7ar_MCVlXsu90Tgf5qW5ql" alt="" >
						<div class="info">Memories</div>
					</li>
					<li>
						<img class="hu5pjgll bixrwtb6" src="https://static.xx.fbcdn.net/rsrc.php/v3/yo/r/DO-SN-shaZL.png" alt="" >
						<div class="info">Jobs</div>
					</li>
					<li>
						<img class="hu5pjgll bixrwtb6" src="https://static.xx.fbcdn.net/rsrc.php/v3/yK/r/mAnT0r8GSOm.png" alt="" >
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
								<div class="item">
									<div class="story">
										<img src="image/projects/2-1.jpg">
									</div>
									<div class="picture">
										<img src="image/temporary_pictures/jpg/A.jpg" class="content">
									</div>
								</div>
								<div class="item">
									<div class="story">
										<img src="image/projects/2.jpg">
									</div>
									<div class="picture">
										<img src="image/temporary_pictures/jpg/B.jpg" class="content">
									</div>
								</div>
								<div class="item">
									<div class="story">
										<img src="image/projects/4-4.jpg">
									</div>
									<div class="picture">
										<img src="image/temporary_pictures/jpg/C.jpg" class="content">
									</div>
								</div>
								<div class="item">
									<div class="story">
										<img src="image/projects/4-1.jpg">
									</div>
									<div class="picture">
										<img src="image/temporary_pictures/jpg/D.jpg" class="content">
									</div>
								</div>
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
									<img src="https://scontent.xx.fbcdn.net/v/t1.0-1/cp0/p50x50/97882360_111023380611687_3115445998072102912_n.png?_nc_cat=101&_nc_sid=dbb9e7&_nc_ohc=qn1G7H8ktdkAX_3Rv9_&_nc_ad=z-m&_nc_cid=0&_nc_ht=scontent.xx&oh=13bf533b7747178e88939c7b7e324e4c&oe=5F489A83" class="image">
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
									<img src="https://scontent.fmnl3-2.fna.fbcdn.net/v/t1.0-1/cp0/c0.0.40.40a/p40x40/116042296_2730641940588874_904659729291803314_n.jpg?_nc_cat=100&_nc_sid=7206a8&_nc_ohc=XP7v76TVHj0AX_BWAKk&_nc_ht=scontent.fmnl3-2.fna&oh=eb74df32fa355d762fdff8e2045c3813&oe=5F48561A" class="image">
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
<!--...................WATCH.................................................... -->

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
<!--...........................MARKETPLACE............................................... -->

					<div class="facebook-content marketplace-body facebook-content-body" style="display: none;">
						<div class="facebook-left-content">
								<div class="header">
									<h2>Marketplace</h2>
									<div class="message-search-engine-container">
											<?php svg("search") ?>
									<div class="message-search-engine" contenteditable placeholder="Search Marketplace"></div>
								</div>
								</div>
								<div class="body">
								<div class="left-content scrollbar">
									<li class="active">
										<div class="circle">
											<?php svg("marketplace") ?>
										</div>
										<div class="info">Browse All</div>
									</li>
									<li>
										<div class="circle"></div>
										<div class="info">Your Account</div>
									</li>
									<div class="buttons active">
										<span>Create New Listing</span>
									</div>
									<hr class="hr-94-10">
									<h3>Filters</h3>	
									<div class="buttons active not">
										<span>Navotas within 60 Kilometers</span>
									</div>
				                    <hr class="hr-94-10">	
				                    <h3>Categories</h3>
									<li>
										<div class="circle"></div>
										<div class="info">Vihicles</div>
									</li>
									<li>
										<div class="circle"></div>
										<div class="info">Property Rentals</div>
									</li>		
									<li>
										<div class="circle"></div>
										<div class="info">Apparel</div>
									</li>
									<li>
										<div class="circle"></div>
										<div class="info">Classifields</div>
									</li>
									<li>
										<div class="circle"></div>
										<div class="info">Electronics</div>
									</li>
									<li>
										<div class="circle"></div>
										<div class="info">Entertainment</div>
									</li>
									<li>
										<div class="circle"></div>
										<div class="info">Family</div>
									</li>
									<li>
										<div class="circle"></div>
										<div class="info">Free Stuff</div>
									</li>
									<li>
										<div class="circle"></div>
										<div class="info">Garden & Outdoor</div>
									</li>
									<li>
										<div class="circle"></div>
										<div class="info">Hobbies</div>
									</li>
									<li>
										<div class="circle"></div>
										<div class="info">Home Goods</div>
									</li>
									<li>
										<div class="circle"></div>
										<div class="info">Home Improvement Supplies</div>
									</li>
									<li>
										<div class="circle"></div>
										<div class="info">Home Sales</div>
									</li>
									<li>
										<div class="circle"></div>
										<div class="info">Musical Instrument</div>
									</li>
									<li>
										<div class="circle"></div>
										<div class="info">Office Suplies</div>
									</li>
									<li>
										<div class="circle"></div>
										<div class="info">Pet Suplies</div>
									</li>
									<li>
										<div class="circle"></div>
										<div class="info">Vihicles</div>
									</li>

									<li>
										<div class="circle"></div>
										<div class="info">Sporting Goods</div>
									</li><li>
										<div class="circle"></div>
										<div class="info">Toys & Games</div>
									</li>
									<li>
										<div class="circle"></div>
										<div class="info">Groups</div>
									</li>
								</div>
							</div>
						</div>
						<div class="facebook-right-content">
							<div class="big-box">
								<h3>COVID-19: Buyers and Sellers</h3>
								<p>Please follow local guidelines about physical distancing and staying home.</p>
								<div class="buttons">Learn More</div>
							</div>
							<div class="big-content ">
								<div id="header">
									<h3>Today's Picks for You</h3>
									<div class="content-on-right">
										<p>Navotas - 60 km</p>
									</div>
								</div>
								<div id="body">

									<?php
										for($i = 0; $i < 20; $i++){
											echo $output = '

									<div class="item">
										<div class="preview">
											<div class="icons">
												<div class="icon hc">
													'.insvg("messenger").'
													<div class="desc">Message</div>
												</div>
												<div class="icon hc">
													'.insvg("bookmark").'
													<div class="desc">Save</div>
												</div>
												<div class="icon hc">
													'.insvg("reload").'
													<div class="desc">Share	</div>
												</div>
											</div>
										</div>
										<div class="info">
											<h3><b>₱ 28</b></h3>
											<p>Face Shield</p>
											<small>Quezon City, National Capital Region</small>
										</div>
									</div>
											';
										}
									 ?>	
									
								</div>
							</div>
						</div>
					</div>
<!--.................................GROUPS.................................................... -->

					<div class="facebook-content groups-body facebook-content-body" style="display: none;">
							<div class="facebook-left-content">
									<div class="header">
									<h2>Groups</h2>
									<div class="message-search-engine-container">
											<?php svg("search") ?>
									<div class="message-search-engine" contenteditable placeholder="Search Groups"></div>
								</div>
								</div>
								<div class="body">
								<div class="left-content scrollbar">
									<li class="active">
										<div class="circle">
											<?php svg("groups") ?>
										</div>
										<div class="info">Your Feed</div>
									</li>
									<li>
										<div class="circle"></div>
										<div class="info">Discover</div>
									</li>
									<div class="buttons active">
										<span>Create New Group</span>
									</div>
									<hr class="hr-94-10">	
									<h3>Group You Manage</h3>
									<h3>Your Groups</h3>			
								</div>
							</div>
						</div>
					</div>
<!-- ..............................GAMING............................................... -->

					<div class="facebook-content gaming-body facebook-content-body" style="display: none;">
							<div class="facebook-left-content">
								<div class="header">
									<h2>Gaming</h2>
								</div>
								<div class="body">
								<div class="left-content scrollbar">
									<li class="active">
										<div class="circle">
											<?php echo insvg("video")?>
										</div>
										<div class="info">Gaming Video	</div>
									</li>
									<li class="margin">
										<div class="circle"></div>
										<div class="info">Browse Live Strean</div>
									</li>
									<li class="margin">
										<div class="circle"></div>
										<div class="info">Browse Games</div>
									</li class="margin">
									<li>
										<div class="circle"></div>
										<div class="info">Browse Streamers</div>
									</li>

									<li>
										<div class="circle"></div>
										<div class="info">Play Games</div>
									</li>
									<li>
										<div class="circle"></div>
										<div class="info">Tournaments</div>
									</li>
									<hr class="hr-94-10">
									<div class="buttons active">
										<span>Go Live</span>
									</div>
									<div class="buttons">
										<span>Streamer Dashboard</span>
									</div>
									<div class="buttons">
										<span>Create Tournament Event</span>
									</div>
									<hr class="hr-94-10">	
									<h3>Streams You Follow </h3>
									<li>
										<div class="circle"></div>
										<div class="info">Stream 1</div>
									</li>
									<li>
										<div class="circle"></div>
										<div class="info">Stream 2</div>
									</li>
									<li>
										<div class="circle"></div>
										<div class="info">Stream 3</div>
									</li>
									
								</div>
							</div>
						</div>
					</div>
		<!-- Messenger -->
			<div class="facebook-content messages-body facebook-content-body" style="display: none;">
					<div class="facebook-left-content" >
						<div class="header">
							<h2>Chats</h2>
							<div class="message-search-engine-container">
									<?php svg("search") ?>
								<div class="message-search-engine" contenteditable placeholder="Search Messenger"></div>
							</div>
							<div class="icons">
								<div class="icon">
									<?php echo insvg("cog") ?>
								</div>
								<div class="icon">
									<?php echo insvg("edit") ?>
								</div>
							</div>
						</div>
						<div class="body">
						<div class="left-content scrollbar">
							<div class="message-inbox"></div>
						</div>
					</div>
					 </div>
					 <div class="facebook-right-content">
					 	<main>
					 		<div class="all-of-main-message-box"></div>
					 	</main>
					 </div>
				</div>
		<!-- End of Messenger -->
				<!-- Messenger -->
			<div class="facebook-content no-content-body facebook-content-body" style="display: none;">

				<div class="no-content-content">
					<div class="svg">
						<?php echo insvg("permissions_gray_wash") ?>
					</div>
					
					<h3>This Content Isn't Available Right Now</h3>
					<span>
						<p>When this happens, it's usually because the owner only shared it with a small group of people, changed who can see it or it's been deleted.</p>
					</span>
					<center>
						<br>
						<button><span>Go to News Feed</span></button>
						<br>
						<a href="">Go Back</a><br>
						<a href="">Visit Help Center</a>
					</center>
				</div>

			</div>
		<!-- End of Messenger -->

		<style type="text/css">
			.no-content-content{
				height: calc(100vh - 60px);
				text-align: center;
			}
			.no-content-content .svg{
				display: flex;
				justify-content: center;
				align-content: center;
				align-items: center;
				padding-top: 150px;
			}
			.no-content-content .svg svg{
				width: 110px;
				display: block;
			}
			.no-content-content h3{
				display: block;
				color: #64676B;
				font-size: 21px;
			}
			.no-content-content span{
				text-align: center;
				display: flex;
				justify-content: center;
				align-content: center;
				align-items: center;
			}
			.no-content-content span p{
				max-width:450px;
				font-size: 18px;
				color: #64676B; 
				line-height: 19px;
			}
			.no-content-content button{
				padding: 10px;
				width: 212px;
				border:none;
				background: #1877F2;
				color: #FFF;
				font-size: 17px;
				font-weight: 600;
				border-radius: 5px;
				margin-bottom: 10px;
			}
			.no-content-content a{
				text-decoration: none;
				font-size: 17px;
				color: #1877F2;
				font-weight: 600;
				margin: 10px;
				margin-bottom: 15px;
			}
			.facebook-left-content .header {
				position: relative;
			}
			.facebook-left-content .header .icons{
				display: flex;
				position: absolute;
				right: 15px;
				top: 10px;
			}
			.facebook-left-content .header .icons .icon{
				width: 35px;
				height: 35px;
				border-radius: 50%;
				background: #F5F5F5;
				margin:5px;
				cursor: pointer;
				display: flex;
				justify-content: center;
				align-items: center;
				align-content: center;
			}
			.facebook-left-content .header .icons .icon svg{
				width: 20px;
				height: 20px;
				fill: #000;
				stroke: #000;
			}
			.facebook-left-content .header .icons .icon path{
				fill: #000;
				stroke: #000;
			}
			.messages-body .facebook-left-content{
				width: 338px !important;
				border-right: 1px solid #EBEEEE !important;
			}
			.messages-body .facebook-right-content{
				left: 338px !important;
				width: calc(100vw - 340px);
				border-left: 1px solid lightgray;

			}

			.messages-body .facebook-left-content .header h2{
				margin-bottom: 15px !important;
			}
			.messages-body .facebook-left-content .body .left-content li .circle{
				width: 50px;
				height: 50px;
			}
			.messages-body .facebook-left-content .body .left-content li .info span{
				display: block;
			}
			.messages-body .facebook-left-content .body .left-content li .info small{
				font-weight: 400;
			}
			.messages-body .facebook-right-content main .message-container{
				width: auto !important;
				margin:0px !important;
				border-top-left-radius: 0px !important;
				border-top-right-radius: 0px !important;
				position: relative !important;
 			}
 			.messages-body .facebook-right-content main .message-container #header{
 				border-top-left-radius: 0px !important;
				border-top-right-radius: 0px !important;
				height: 59px;
				cursor: default !important;
				border-bottom: 1px solid #EBEEEE !important;
 			}
 			.messages-body .facebook-right-content main .message-container #header .info{
 				height: auto !important;
 				cursor: default !important;
 				padding: 5px;
 				margin-left:10px;
 			}
 			.messages-body .facebook-right-content main .message-container #header .info .circle{
 				background: #000;
 				width: 40px;
 				height: 40px;
 			}
 			.messages-body .facebook-right-content main .message-container #header .info:hover{
 				background: none !important;
 			}
 			.messages-body .facebook-right-content main .message-container #header .icons{
 				padding: 5px;
 			}
 			.messages-body .facebook-right-content main .message-container #header .icons .icon{
 				width: auto !important;
 				height:auto !important;
 				margin:5px;
 			}
 			.messages-body .facebook-right-content main .message-container #header .icons .icon:hover{
 				background: none !important;
 			}
 			.messages-body .facebook-right-content main .message-container #header .icons .icon svg{
 				width: 32px;
 			}
 			.messages-body .facebook-right-content main .message-container #header .icons .icon path{
 				fill: #0099FF;
 
 			}
 			.messages-body .facebook-right-content main .message-container .messages-body-tab {
 				display: flex;
 				position: relative;
 			}	
 			.messages-body .facebook-right-content main .message-container .messages-body-tab #body{
 				margin-top: 60px !important;
 				width: 67%;
 				position: absolute;
 				background: #FFF;
 				height:calc(100vh - 180px);
 			}
 			.messages-body .facebook-right-content main .message-container .messages-body-tab #body .chat-history .message-con .content{
 				max-width: 300px !important;
 			}
 			.messages-body .facebook-right-content main .message-container .messages-body-tab .main-body{

 			}
 			.messages-body .facebook-right-content main .message-container .messages-body-tab .main-body #footer{
 				height: 60px !important;
 				background: #FFF !important;
 				position: fixed;
 				bottom: 0;
 				width: 65%;
 			}
 			.messages-body .facebook-right-content main .message-container .messages-body-tab .main-body #footer .item{
 				width: 30px !important;
 				height: 30px !important;
 			}
 			.messages-body .facebook-right-content main .message-container .messages-body-tab .main-body #footer .item svg{
 				fill: #0099FF;
 				width: 26px !important;
 				height: 26px !important;
 			}
			.message-container #footer .item.last{
				position: relative !important;
				margin-left:15px;
			}
 			.messages-body .facebook-right-content main .message-container .messages-body-tab .main-body #footer .message-textarea{
 				width: 50%;
 			}
 			.messages-body .facebook-right-content main .message-container .messages-body-tab #user-info{
 				margin-top: 60px !important;
 				width: 33%;
 				height:calc(100vh - 120px);
 				position: absolute;
 				right: 0;
 				background: #fff;
 				border-left: 0.5px solid #EBEEEE;
 			}
 			.messages-body .facebook-right-content main .message-container .messages-body-tab #user-info .top{
 				text-align: center;
 				padding: 10px;
 		
 			}
 			.messages-body .facebook-right-content main .message-container .messages-body-tab #user-info .top .div{
 				display: flex;
 				justify-content: center;
 			}
 			.messages-body .facebook-right-content main .message-container .messages-body-tab #user-info .top .div .circle{
 				width: 100px;
 				height: 100px;
 				background:black;
 				border-radius: 50%;
 				display: block;
 			}
 			.messages-body .facebook-right-content main .message-container .messages-body-tab #user-info .top h4{
 				display: block;
 				margin:10px;
 				margin-bottom: 5px;
 				font-size: 20px;
 			}
 			.messages-body .facebook-right-content main .message-container .messages-body-tab #user-info .top p{
 				font-size: 14px;
 			}
 			.messages-body .facebook-right-content main .message-container .messages-body-tab #user-info .bot{

 			}
 			.messages-body .facebook-right-content main .message-container .messages-body-tab #user-info .set-li .set{
 				display: none;
 			}
 			.messages-body .facebook-right-content main .message-container .messages-body-tab #user-info .set-li .main-set{
 				padding: 14px;
 				border-top: 1px solid #EBEEEE;
 				cursor: pointer;
 				position: relative;
 			}
 			.messages-body .facebook-right-content main .message-container .messages-body-tab #user-info .set-li .main-set:hover{
 				background: #F2F2F2;
 			}
 			.messages-body .facebook-right-content main .message-container .messages-body-tab #user-info .set-li .main-set .stat{
 				position: absolute;
 				right: 15px;
 				width: 30px;
 				height: 30px;
 				border-radius: 50%;
 				top: 10px;
 				display: flex;
 				justify-content: center;
 				align-content: center;
 				align-items: center;
 			
 				transition: 0.2s;
 				transform: rotate(180deg);
 			}
 			.messages-body .facebook-right-content main .message-container .messages-body-tab #user-info .set-li .main-set .stat.rotate{
 				transform: rotate(90deg) !important;
 			}
 			.messages-body .facebook-right-content main .message-container .messages-body-tab #user-info .set-li .main-set .stat svg{
 				width: 15px;
 				height: 15px;
 				fill: #BEC2C9;
 			}
 			.messages-body .facebook-right-content main .message-container .messages-body-tab #user-info .set-li h3{
 				font-size: 14px;
 				color: #9F9F9F;
 				font-weight: 700;
 			}

 			.messages-body .facebook-right-content main .message-container .messages-body-tab #user-info .set-li .set li{
 				padding: 10px;
 				list-style-type: none;
 				position: relative;
 				cursor: pointer;
 			}	
 			.messages-body .facebook-right-content main .message-container .messages-body-tab #user-info .set-li .set li:last-child{
 				margin-bottom:10px;
 			}
 			.messages-body .facebook-right-content main .message-container .messages-body-tab #user-info .set-li .set li span{
 				font-size: 14px;
 				margin-left:5px;
 				user-select: none;
 			}
 			.messages-body .facebook-right-content main .message-container .messages-body-tab #user-info .set-li .set li .stat{
 				position: absolute;
 				right: 15px;
 				top: 5px;
 				width: 30px;
 				height: 30px;
 				background: #F2F2F2;
 				border-radius: 50%;
 				display: flex;
 				justify-content: center;
 				align-items: center;
 				align-content: center;
 			}
 			.messages-body .facebook-right-content main .message-container .messages-body-tab #user-info .set-li .set li .stat svg{
 				width: 22px;
 				height: 22px;
 			}
 			.messages-body .facebook-right-content main .message-container .messages-body-tab #user-info .set-li .set li .stat.theme{
 				background: #FFF;
 				width: 0px;
 				height: 0px;
 				padding: 4px;
 				border:8px solid #0099FF;
 			}
 			.messages-body .facebook-right-content main .message-container .messages-body-tab #user-info .set-li .set li .stat.emojis{
 				background: none;

 			}
 			.messages-body .facebook-right-content main .message-container .messages-body-tab #user-info .set-li .set li .stat.emojis svg{
 				fill: #0099FF;
 			}
 			.floating-box,.float-circle{
 				z-index: 999 !important;
 			}
		</style>
              <!-- Floating Content -->
			<div class="floating-content">
				 <div class="float-box"></div>
	              <div class="float-circle">
	              	<i class="fa fa-edit" style="margin-left: 5px;font-weight: 100;"></i>
	              </div>
			</div>

			<!-- MESSAGES  -->
              <div class="message-big-pipe-container"></div>

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
										<div class="item main-theme-button hc" style="display: flex;justify-content: center;align-items: center;">
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
				<!-- Notification -->
			<div class="notification-float-container"></div>
		</facebook>		
	</main>
	<!-- End Root -->
</body>

<script type="text/javascript" src="assets/js/myscripts.js"></script>
<script type="text/javascript">
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
</script>
</html>



