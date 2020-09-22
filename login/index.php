<?php include '../database.php'; 
session_start();
if(isset($_SESSION["id"])){
	header("Location: ../index.php");
}
?>
<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<title>Facebook - Log In or Sign Up</title>

	<link rel="stylesheet" type="text/css" href="assets/css/login.css">
	<link rel="icon" href="../image/facebook-logo.png" class="rel">
	<script type="text/javascript" src="../lib/jquery/jquery.js"></script>

</head>
<body>
	<facebook class="old-des" >
		<form method="POST" class="login-form">
		<div class="header">
			<div class="content">
				<img src="../image/Facebook-Logo-Meaning.png">

				<div class="right-content">
					
					<div class="form-group">
						<label>Email or Phone</label>
						<input type="text" name="username">
					</div>
					<div class="form-group">
						<label>Password</label>
						<input type="password" name="password">
						<a href="">Forgotten account?</a>
					</div>
					<div class="submit">
						<input type="submit" name="" value="Log In">
					</div>
					
				</div>
			</div>
		</div>
		</form>
		<div class="body">
			<div class="container container1">
				<div class="recent" style="display: none;">
					<h1>Recent Logins</h1>
						<span>Click your picture or add an account.</span>
				</div>
				<div class="default">
					<h2>Facebook helps you connect and share with the people in your life.</h2>
					
					<img src="../image/people.png">
				</div>
			</div>
			<div class="container container2">
				<h1>Create a New Account</h1>
				<span>It’s quick and easy.</span>
		<br>
		<br>
		<form method="POST" class="registration-form">
				<div class="form-group half">
					
					<input type="text" name="firstname" placeholder="First name">
					<input type="text" name="lastname" placeholder="Last name">

					<div class="desc"><span>What's your name?</span></div>
					<?php echo mysvg("error") ?>
				</div>
		
				<div class="form-group">
					<?php echo mysvg("error") ?>
					<input type="email" name="email"  placeholder="Mobile number or email">
					<div class="desc" style="width: 300px;"><span>You'll use this when you login and if you ever need <br>  to reset your password</span></div>
				</div>
				<div class="form-group">
					<?php echo mysvg("error") ?>
					<input type="password" name="password" placeholder="New password">
					<div class="desc" style="width: 300px;">
						<span>Enter a combination of at least six numbers, letters and punctuation marks (such as ! and &).</span>
					</div>
				</div>
				<div class="form-group">
					<h4>Date of birth</h4>
				</div>
				<div class="form-group">
					<select name="day">
						<option>Day</option>
						<?php 
                          for($i = 1; $i < 32; $i++){
                          	echo "<option value=".$i.">".$i."</option>";
                          }
						?>
					</select>
					<select name="month">
						<option>Month</option>
						<option value="January">Jan</option>
						<option value="February">Feb</option>
						<option value="March">Mar</option>
						<option value="April">Apr</option>
						<option value="May">May</option>
						<option value="June">Jun</option>
						<option value="July">Jul</option>
						<option value="August">Aug</option>
						<option value="September">Sep</option>
						<option value="October">Oct</option>
						<option value="November">Nov</option>
						<option value="December">Dec</option>

					</select>
					<select name="year">
						<option>Year</option>
						<?php 
                          for($i = 2020; $i > 1904; $i--){
                          	echo "<option value=".$i.">".$i."</option>";
                          }
						?>
					</select>
				</div>
				<div class="form-group">
					<h4>Gender</h4>
				</div>
				<div class="form-group" style="padding: 0px;margin-top: -5px">
					<div class="g">
						<input type="radio" name="gender" value="Female" class="gender-picker">
						<span>Female</span>
					</div>
					<div class="g">
						<input type="radio" name="gender" value="Male" style="margin-left: 10px;" class="gender-picker">
						<span>Male</span>
					</div>
					<div class="g">
						<input type="radio" name="gender" value="Custom" class="gender-picker">
						<span>Custom</span>
					</div>
				</div>
				<div class="form-group">
					<p>
						By clicking Sign Up, you agree to our <a href="">Terms</a>, <a href="">Data Policy</a> and <br><a href="">Cookie Policy</a>. You may receive SMS notifications from us and <br>can opt out at any time.
					</p>
				</div>
				<div class="form-group">
					<input type="submit" name="" class="submit" value="Sign Up">
				</div>
			</form>
				<div class="last">
					<span><a href="">Create a Page </a><b> for a celebrity, band or business.</b></span>
				</div>
			</div>
		</div>
	</facebook>
	<facebook class="new-des">
		<main>
			<div class="areas">
				<div class="area1">
					<div>
						<img src="../svg/facebook-text.svg">
						<p>Connect with friends and the world around you on Facebook.</p>
					</div>
				</div>
				<div class="area2">
					<div class="box">
						<form method="POST" class="login-form">
							<div class="form-group">
								<input type="text" name="username" placeholder="Email or Phone Number">
							</div>
							<div class="form-group">
								<input type="password" name="password" placeholder="Password">
							</div>
							<div class="form-group">
								<input type="submit" value="Log In" class="login-button">
							</div>
							<div class="form-group link">
								<a href="">Forgot Password?</a>
							</div>
							<div class="form-group hr">
								<hr>
							</div>
							<div class="form-group create">
								<button class="create-an-account-button">
									<span>Create New Account</span>
								</button>
							</div>
						</form>
					</div>
					<div class="last">
						<span><a href="">Create a Page </a> for a celebrity, band or business.</span>
					</div>
				</div>
			</div>
		</main>
	</facebook>
			<div class="footer">
			<div class="lang-list">
				<span>English (UK)</span>
				<li>Filipino</li>
				<li>Bisaya</li>
				<li>Español</li>
				<li>한국어</li>
				<li>日本語</li>
				<li>العربية</li>
				<li>中文(简体)</li>
				<li>Português (Brasil)</li>
				<li>Français (France)</li>
				<li>Deutsch</li>
			</div>
			<hr>
			<div class="all-list">
				<li>Sign Up</li>
				<li>Log In</li>
				<li>Messenger</li>
				<li>Facebook Lite</li>
				<li>Watch</li>
				<li>People</li>
				<li>Pages</li>
				<li>Page Categories</li>
				<li>Places</li>
				<li>Games</li>
				<li>Locations</li>
				<li>Marketplace</li>
				<li>Facebook Play</li>
				<br>
				<li>Groups</li>
				<li>Oculus</li>
				<li>Portal</li>
				<li>Instagram</li>
				<li>Local</li>
				<li>Fundraisers</li>
				<li>Services</li>
				<li>About</li>
				<li>Create Ad</li>
				<li>Create Page</li>
				<li>Developers</li>
				<li>Careers</li>
				<li>Privacy</li>
				<li>Cookies</li>
				<br>
				<li>AdChoices</li>
				<li>Terms</li>
				<li>Help</li>

			</div>
		</div>
</body>
<script type="text/javascript" src="../assets/js/cookie.js"></script>
<script type="text/javascript" src="assets/js/login.js"></script>
</html>