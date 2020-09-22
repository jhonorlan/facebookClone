<?php

$dbname = "facebook-clone-database";
$dbusername ="root";
$dbpassword = "";
$connect = new PDO("mysql:host=localhost;dbname=".$dbname,$dbusername,$dbpassword);



// USERS
if(!function_exists('editUserDetails')){
	function editUserDetails($connect){
		$id = $_SESSION["id"];
		$username = $_SESSION["username"];
		$bio = "This is my bio";
		$education = json_encode(array("level" =>"First year College","degree"=>"BSIT"));
		$work = json_encode(array("work" => "Web Developer","boss" => "none","salary"=> "12k"));
		$status = json_encode(array("status"=> "Single","with"=>"","long"=> "4yrs"));
		$socialmedia_accounts = json_encode(array("facebook" => "jhon.orlan.7","twitter"=> "jhonorlan","instagram"=> "jhonOrlanTero"));


		$data = [$username,$id,$bio,$work,$education,$status,$socialmedia_accounts];

		$query = "SELECT * FROM user_details WHERE id='$id' ";
		$stmt= $connect->prepare($query);
		$stmt->execute();
		$count =$stmt->rowCount();
		if($count == 0){
			$query = "INSERT INTO user_details(username,id,bio,work,education,status,socialmedia_accounts)VALUES(?,?,?,?,?,?,?)";
			$stmt= $connect->prepare($query);
			$stmt->execute($data);
		}else{
			$query = "UPDATE user_details SET username=?,id=?,bio=?,work=?,education=?,status=?,socialmedia_accounts=? WHERE id='$id'";
			$stmt= $connect->prepare($query);
			$stmt->execute($data);
		}
		fetchUserDetails($connect);
	}
}

if(!function_exists('fetchUserDetails')){
	function fetchUserDetails($connect){
		$id = $_SESSION["id"];
		$query = "SELECT * FROM user_details WHERE id='$id' ";
		$stmt= $connect->prepare($query);
		$stmt->execute();
		$result = $stmt->fetchall();
		foreach($result as $row){
			$data = array(
				"id"=> $row["id"],
				"username" => $row["username"],
				"bio" => $row["bio"],
				"work" => $row["work"],
				"education" => $row["education"],
				"status" => $row["status"],
				"socialMedia" => $row["socialmedia_accounts"]
			);
			return $data;
		}
	}
}
if(!function_exists('get_user_information')){
	function get_user_information($user,$connect){
		$query = "SELECT * FROM user WHERE fullname = '$user' OR id='$user' ";
		$stmt= $connect->prepare($query);
		$stmt->execute();
		$result = $stmt->fetchall();
		foreach($result as $row){
			$data = array(
				'username' => $row['username'],
				'profile_picture' => get_temporary_profile_picture($row["firstname"],"index",$connect),
				'firstname' => $row['firstname'],
				'lastname'=> $row['lastname'],
				'middlename'=> $row["middlename"],
				'fullname'=> $row["fullname"],
				'gender' => $row['gender'],
				'email' => $row['email'],
				'id' => $row['id'],
				'month' => $row['month'],
				'day' => $row['day'],
				'year' => $row['year'],
				"birthday" => $row["birthday"],
				"allPostsCount" => "",
				"followSystem" => "",
				"friendSystem" => "",
				"last_activity" => getUserLastActivityInformation($_SESSION["id"],$connect)

 			);
			return $data;
		}
	}
}
if(!function_exists('registerUser')){
	function registerUser($firstname,$middlename,$lastname,$email,$password,$month,$day,$year,$birthday,$connect){
		$fullname = $firstname." ".$lastname;
		$password = md5($password);
		$query ="INSERT INTO user(firstname,middlename,lastname,fullname,email,month,day,year,birthday,password)VALUES('$firstname','$middlename','$lastname','$fullname','$email','$month','$day','$year','$birthday','$password')";
		$stmt = $connect->prepare($query);
		$stmt->execute();

		echo "success";
	}
}
if(!function_exists('loginUser')){
	function loginUser($username_or_email,$password,$connect){
		$password = md5($password);
		$query = "SELECT * FROM user WHERE email='$username_or_email' AND password='$password' ";
		$stmt = $connect->prepare($query);
		$stmt->execute();
		$count = $stmt->rowCount();
		$result = $stmt->fetchall();
		if($count != 0){
			foreach($result as $row){
				session_start();

				$_SESSION["id"] =  $row["id"];
				$_SESSION["firstname"] = $row["firstname"];
				$_SESSION["lastname"] = $row["lastname"];
				$_SESSION["fullname"] = $row["fullname"];
				$_SESSION["username"] = $row["username"];
				$_SESSION["email"] = $row["email"];
				$_SESSION["month"] = $row["month"];
				$_SESSION["day"] = $row["day"];
				$_SESSION["year"] = $row["year"];
				$_SESSION["birthday"] = $row["birthday"];	
				$_SESSION["profile_picture"] = $row["profile_picture"];

				if($_SESSION["profile_picture"] == ""){
					$_SESSION["profile_picture"] = get_temporary_profile_picture($_SESSION["firstname"],"index",$connect);
				}
			}
			echo "success";
		}else{
			echo "failed";
		}
	}
}
if(!function_exists('isUserExist')){
	function isUserExist($username_or_email,$connect){
		$query = "SELECT * FROM user WHERE email='$username_or_email' OR id='$username_or_email' ";
		$stmt = $connect->prepare($query);
		$stmt->execute();
		$count = $stmt->rowCount();
		if($count != 0){
			return true;
		}else{
			return false;
		}
	}
}
if(!function_exists('get_profile_picture')){
	function get_profile_picture($username,$path,$connect){
		$query = "SELECT * FROM user WHERE id ='$username' AND profile_picture != '' ";
		$stmt = $connect->prepare($query);
		$stmt->execute();
		$result = $stmt->fetchall();
		$count = $stmt->rowCount();
		if($count == 0){
			foreach($result as $row){
				 return get_temporary_profile_picture($row["firstname"],$path,$connect);
			}
		}else{
				foreach($result as $row){
				return "data:image;base64,".$row['profile_picture'];
			}
		}

	}
}
if(!function_exists('get_temporary_profile_picture')){
	function get_temporary_profile_picture($username,$path,$connect){
	   $query = "SELECT * FROM user WHERE firstname='$username' AND profile_picture ='' ";
	   $stmt = $connect->prepare($query);
	   $stmt->execute();
	   $count = $stmt->rowCount();
	   $first_letter = substr($username, 0, 1);
	   if($count != 0){
			if($path == "forms"){
				return '../image/temporary_pictures/jpg/'.$first_letter.'.jpg';
			}else{
				return 'image/temporary_pictures/jpg/'.$first_letter.'.jpg';
			}
	   }else{
	   		if($path == "forms"){
				return '../../image/temporary_pictures/jpg/'.$first_letter.'.jpg';
			}else{
				return 'image/temporary_pictures/jpg/'.$first_letter.'.jpg';
			}
	   }
	}
}

if(!function_exists('getAllUser')){
	function getAllUser($connect){
		$query = "SELECT * FROM user WHERE email !='".$_SESSION["email"]."' ";
		$stmt = $connect->prepare($query);
		$stmt->execute();
		$result = $stmt->fetchall();
		foreach($result as $row){
			$profile_picture = get_temporary_profile_picture($row["firstname"],"index",$connect);
			$output =' 
				<div class="right-content-content profile-hover-container">
					<img src="'.$profile_picture.'" class="image pf">
					<div class="info" data-id="'.$row["id"].'">'.$row["fullname"].'</div>

					<div class="output left">
						<div class="box">
							<div class="area1"></div>
							<div class="area2"></div>
						</div>
					</div>

				</div>
			';
			echo $output;
		}
	}
}
if(!function_exists('fetchUserList')){
	function fetchUserList($connect){
		$query = "SELECT * FROM user ";
		$stmt = $connect->prepare($query);
		$stmt->execute();
		$result = $stmt->fetchall();
		foreach($result as $row){
			$data = get_user_information($row["id"],$connect);
			$profile_picture = get_temporary_profile_picture($data["firstname"],"forms",$connect);
			$output =' 
			<li>
				<div class="header">
					<img src="'.$profile_picture.'" class="circle"/>
					<div class="box"><a href="#">'.$data["fullname"].'</a></div>
				</div>
				<div class="info">
					<div class="item">
						<p>Firstname: </p><span>'.$data["firstname"].'</span>
					</div>
					<div class="item">
						<p>Middlename: </p><span>'.$data["middlename"].'</span>
					</div>
					<div class="item">
						<p>Lastname: </p><span>'.$data["lastname"].'</span>
					</div>
					<div class="item">
						<p>Email: </p><span>'.$data["email"].'</span>
					</div>
					<div class="item">
						<p>Birthday: </p><span>'.$data["birthday"].'</span>
					</div>
				
				</div>
			</li>
			';
			echo $output;
		}
	}
}
if(!function_exists('identifyUser')){
	function identifyUser($user,$connect){
		if($user == $_SESSION["id"]){
			return "You";
		}else{
			$data = get_user_information($user,$connect);
			return $data["firstname"];
		}
	}
}

if(!function_exists('getUserPicturePreview')){
	function getUserPicturePreview($id,$connect){
		$query = "SELECT * FROM images WHERE id='$id' ORDER BY date_inserted LIMIT 9";
		$stmt = $connect->prepare($query);
		$stmt->execute();
		$result = $stmt->fetchall();
		$data = array();
		foreach($result as $row){
			array_push($data,$row["image"]);
		}
		return $data;
	}
}

if(!function_exists('getProfile')){
	function getProfile($user,$connect){
		$query = "SELECT * FROM user WHERE id='$user' ";
		$stmt = $connect->prepare($query);
		$stmt->execute();
		$result = $stmt->fetchall();
		foreach($result as $row){
			$data = get_user_information($row["id"],$connect);
			$me = get_user_information($_SESSION["id"],$connect);
			$friendInformation = getFriendInformation($_SESSION["id"],$row["id"],$connect);
			$placeholder = "Write something about ".$data["firstname"];
			$userPicturePreview = getUserPicturePreview($row["id"],$connect);
			$output ='
		<div class="body">
				<div class="profile-container">
					<div class="cover-photo-container">
						';
						if($row['id'] == $me["id"]){
							$output .='<div class="cover-photo-button"><img src="svg/ar-camera.svg"><span>Edit Cover Photo</span></div>';	
						}
						$output .='
						<div class="profile">
							<img src="'.$data["profile_picture"].'" class="profile-picture">
							<div class="icons">
								<div class="icon"><img src="svg/ar-camera.svg" class=""></div>
							</div>
						</div>
					</div>
				</div>
				<div class="user-information-container">
					<div>
						<h1>'.$data["fullname"].'</h1>
						<span>Web Dev</span>
						<span>💻Coding is my passion💻</span>
						<span>18</span>
						';
						if($data["id"] ==  $_SESSION["id"]){
							$output .='<span class="edit">Edit</span>';
						}
						$output .='
					</div>
				</div>
				<div class="profile-menu">
					<div class="menu">
						<div class="profile-menu-picture">
							<img src="'.$data["profile_picture"].'" class="circle">
							<span>'.$data["fullname"].'</span>
						</div>
						<div class="profile-menu-button">
							<div class="item active">
								<span>Timeline</span>
							</div>
							<div class="item">
								<span>About</span>
							</div>
							<div class="item">
								<span>Friends</span>
							</div>
							<div class="item">
								<span>Photos</span>
							</div>';
							if($row["id"] == $_SESSION["id"]){
								$output .='	<div class="item">
								<span>Archive</span>
							</div>';
							}else{
								$output .='	<div class="item">
								<span>Videos</span>
							</div>';
							}

							$output .='
							<div class="item">
								<span>More</span>  
							</div>
						</div>
						<div class="profile-content-buttons buttons" data-user="'.$row["id"].'">';
							if($row["id"] == $_SESSION["id"]){
								$output .= '
								<div class="button" data-f="search">
								<img src="image/search.png">
							</div>
							<div class="button" data-f="viewAs">
								<img src="image/viewas.png">
							</div>
								<div class="button" data-f="edit-profile">
									<img src="image/edit.png">
									<p>Edit Profile</p>
								</div>
								';
							}else{
								$output .= '
							<div class="button" data-f="more">
								<img src="svg/more1.svg">
							</div>';
							if($friendInformation["status"] == "Friends"){
							$output .='
							<div class="button" data-f="already-friends">
								<img src="https://static.xx.fbcdn.net/rsrc.php/v3/yp/r/gXDMGXp9zDk.png?_nc_eui2=AeHz1wTTsDu625NOPgsoYi0TaF3Hc2QgcupoXcdzZCBy6l7nVt5NDHY0DtKWKXE3jsG0dXF8l7QrKSJs-Vkc0xGE" alt="" height="16" width="16">	
							</div>
								';
							}

							$output .='
							<div class="button" data-f="call">
								<img src="https://static.xx.fbcdn.net/rsrc.php/v3/yL/r/P3-pS-qAiSs.png?_nc_eui2=AeEBaGvvX3lvUHZPhRpNxl6cxeo1F88jvz3F6jUXzyO_PbTEoxqG7WBNwZea4tbUfwBOHTpjtPtk-8EEq6uSWGIA" alt="" height="16" width="16">
							</div>
								<div class="button" data-f="message">
							<svg version="1.1" id="Capa_1" width="20px" height="20px" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
								 viewBox="0 0 512 512" style="enable-background:new 0 0 512 512;" xml:space="preserve">
							<path style="fill:#;" d="M256,0C114.624,0,0,106.112,0,237.024c0,74.592,37.216,141.12,95.392,184.576V512l87.168-47.84
								c23.264,6.432,47.904,9.92,73.44,9.92c141.376,0,256-106.112,256-237.024C512,106.112,397.376,0,256,0z"/>
							<polygon style="fill:#FAFAFA;" points="281.44,319.2 216.256,249.664 89.056,319.2 228.96,170.656 295.744,240.192 421.376,170.656 
								"/></svg>
						</div>
							
								
									';
									if($friendInformation["status"] == "not_friend"){
										$output .='
									<div class="button" data-f="add-friend">
										<img src="https://static.xx.fbcdn.net/rsrc.php/v3/yp/r/gXDMGXp9zDk.png?_nc_eui2=AeHz1wTTsDu625NOPgsoYi0TaF3Hc2QgcupoXcdzZCBy6l7nVt5NDHY0DtKWKXE3jsG0dXF8l7QrKSJs-Vkc0xGE" alt="" height="16" width="16">
										<p>Add Friend</p>
									</div>
										';
									}else if($friendInformation["status"] == "Friend_request"){

										if($friendInformation["from_id"] == $_SESSION["id"]){
											$output .='
										<div class="button" data-f="cancel-friend-request">
											<img src="https://static.xx.fbcdn.net/rsrc.php/v3/yp/r/gXDMGXp9zDk.png?_nc_eui2=AeHz1wTTsDu625NOPgsoYi0TaF3Hc2QgcupoXcdzZCBy6l7nVt5NDHY0DtKWKXE3jsG0dXF8l7QrKSJs-Vkc0xGE" alt="" height="16" width="16">
											<p>Friend Request Sent</p>
										</div>
											';
										}else{
												$output .='
										<div class="button" data-f="accept-friend-request">
											<img src="https://static.xx.fbcdn.net/rsrc.php/v3/yp/r/gXDMGXp9zDk.png?_nc_eui2=AeHz1wTTsDu625NOPgsoYi0TaF3Hc2QgcupoXcdzZCBy6l7nVt5NDHY0DtKWKXE3jsG0dXF8l7QrKSJs-Vkc0xGE" alt="" height="16" width="16">
											<p>Accept Friend Request</p>
										</div>
											';
										}
										
									}
								}
							
					$output .='
							</div>
						</div>
					</div>
				</div>
			</div>
			<div class="other-content">
				<div class="other"></div>
			</div>
			<div class="profile-body-content about-content">
				<div class="one-half-pipe-container">
					<div class="row row1">
						<div class="header">
							<span><a href="">About</a></span>
						</div>
						<div class="list-body">
							<li class="active"><span>Overview</span></li>
							<li><span>Work and Education</span></li>
							<li><span>Places Lived</span></li>
							<li><span>Contact and Basic Info</span></li>
							<li><span>Family and Relationships</span></li>
							<li><span>Details About you</span></li>
							<li><span>Live Events</span></li>
						</div>
					</div>
					<div class="row row2">
						<div class="header">
							<span><a href="">Overview</a></span>
						</div>
					</div>
				</div>
			</div>
			<div class="profile-body-content friends-content">
				<div class="one-half-pipe-container">
					<div class="header">
						<p class="len-friends"><a href="">Friends</a></p>

						<div class="more-set">
							<div class="friends-search-engine">
								<input type="text" placeholder="Search">
							</div>
							<div class="button active"><span>Friend Request</span></div>
							<div class="button active"><span>Find Friends</span></div>
							<div class="button active"><span>'.mysvg("more1").'</span></div>
						</div>
					</div>
					<div class="header-menu-list">
						<div class="item active"><span>All Friends</span></div>
						<div class="item"><span>Recently Added</span></div>
						<div class="item"><span>Birthdays</span></div>
						<div class="item"><span>High School</span></div>
						<div class="item"><span>Current City</span></div>
						<div class="item"><span>Hometown</span></div>
						<div class="item"><span>More</span></div>
					</div>
					<div class="big-friend-list-container">';
					for($i = 0; $i < 10; $i++){
						$output .='
						<div class="item">
							<div class="profile-picture">
								<div class="box"></div>
							</div>
							<div class="info">
								<div class="link">
									<a href="">Jean Dela Cruz</a>
								</div>
								<div class="mutual-friends">
									<span>67 mutual friends</span>
								</div>
							</div>
							<div class="status-button">
								<span>Friends</span>
							</div>
						</div>
						';
					}
					$output .='	
					</div>
				</div>
			</div>
			<div class="profile-body-content photos-content">
				<div class="one-half-pipe-container">
					<div class="header">
						<p class="len-friends"><a href="">Photos</a></p>
						<div class="more-set">
							<div class="button active"><span>Create Album</span></div>
							<div class="button active"><span>Add Photos/Video</span></div>
							<div class="button active"><span>'.mysvg("more1").'</span></div>
						</div>
					</div>
					<div class="header-menu-list">
						<div class="item active"><span>Photos of You</span></div>
						<div class="item"><span>Your Photos</span></div>
						<div class="item"><span>Albums</span></div>
					</div>
					<div class="big-photo-list-container">';
							foreach($userPicturePreview as $imagePreview){
								$output .='
								<div class="item">
									<div class="edit">'.fbsvg("edit-white").'</div>
									<div class="picture" style="background-image:url(data:image/jpeg;base64,'.base64_encode($imagePreview).')"></div>
								</div>
								';
						}
						$output .='
					</div>
				</div>
			</div>
			';
			if($row["id"] == $_SESSION["id"]){
				$output .='
					<div class="profile-body-content archive-content">
						<div class="one-half-pipe-container">
							<div class="header">
								<p class="len-friends"><a href="">Archive</a></p>
								<div class="more-set">
									<p>Only you can see your story archive</p>
									<div class="button active"><span>'.mysvg("cog").'</span></div>
								</div>
							</div>
							<div class="header-menu-list">
								<div class="item active"><span>Your Story Archive</span></div>
							</div>
							<div class="big-story-list-container">';
								for($i = 0; $i < 20; $i++){
									$output .='
									<div class="item">
										<div class="date"><span>Sep 6 <div class="status"></div></span></div>
										<div class="picture"></div>
									</div>
									';
								}
								$output .='
							</div>
						</div>
					</div>';
			}else{
				$output .='
				<div class="profile-body-content videos-content">
					<div class="one-half-pipe-container">
						<div class="header">
							<p class="len-friends"><a href="">Videos</a></p>
							<div class="more-set">
								<div class="button active"><span>Create Album</span></div>
								<div class="button active"><span>Add Video</span></div>
								<div class="button active"><span>'.mysvg("more1").'</span></div>
							</div>
						</div>
						<div class="header-menu-list">
							<div class="item active"><span>Your Videos</span></div>
						</div>
					</div>
				</div>
				';
			}

			$output .='

			<div class="profile-body-content timeline-content"  style="display:flex">
				<div class="content">	
					<div class="left-content">
						<div class="container">
							<div id="header">
								<div>Intro</div>
							</div>
							<div id="body">
								<div>
									<img class="hu5pjgll cwsop09l" src="https://static.xx.fbcdn.net/rsrc.php/v3/yk/r/M0Wls5DHC-A.png?_nc_eui2=AeEc6x4zUwt65k4IGdvjy5RwJ2zClzTV8jMnbMKXNNXyM6PyKEw90QiCUW0p5ar_7GjrzYHmFvJjhuVayask5-bZ" alt="" height="20" width="20">
									<span class="bold underline">JSlayer</span>
								</div>
								<div>
									<img class="hu5pjgll cwsop09l" src="https://static.xx.fbcdn.net/rsrc.php/v3/yd/r/id4jdGYPaIP.png?_nc_eui2=AeH1Yy6IeTUS5Y9VJT28n1BDNWlf1E_21uw1aV_UT_bW7HTFiF5etdRn4xZwGnjhT7dXmRRhcpQwBBh03hOlfa9C" alt="" height="20" width="20">
									<span>Went to <span class="bold underline"> Kaunlaran High School</span></span>
								</div>
								<div>
									<img class="hu5pjgll cwsop09l" src="https://static.xx.fbcdn.net/rsrc.php/v3/ym/r/N_tq7yNW9DG.png?_nc_eui2=AeG7LHGofo1Gvw9T7u2sHn1w8XUv831Rf33xdS_zfVF_fS_iw9jvZfGhO-9A4NZkvqwoONn_JhCzkeHPazl_jb9x" alt="" height="20" width="20">
									<span>From <span class="bold underline">Manila, Philippines</span></span>
								</div>
								<div>
									<img class="hu5pjgll cwsop09l" src="https://static.xx.fbcdn.net/rsrc.php/v3/yq/r/S0aTxIHuoYO.png?_nc_eui2=AeFUIz4Y7k0J4I9tFyHKMDB7rlG3yvH4CWGuUbfK8fgJYVR_vywLGuC5nJPtcqZatagUGZHXWBpoAcQ1yIPRJ_t0" alt="" height="20" width="20">
									<span>Single</span>
								</div>
								<div>
									<img class="hu5pjgll cwsop09l" src="https://static.xx.fbcdn.net/rsrc.php/v3/yv/r/JanwljMyOww.png?_nc_eui2=AeGAq5aYZ6e_anm0EV3cKvRTilTgE3bQKDiKVOATdtAoOGUBzp3ZI72qGRdvBJ-aJqQgRbSrAEOQ0wgalcZzSobI" alt="" height="20" width="20">
									<span>Followed by <span class="bold underline">375 people</span></span>
								</div>
					
							</div>
						</div>
	
						<div class="container">
							<div id="header">
								<div>Pictures</div>
							</div>
							<div id="body" class="grid-body">
								<div class="grid-photos">
									';
									$allPreviewimage = count($userPicturePreview);
									$notFilled = 9 - $allPreviewimage;
									foreach($userPicturePreview as $imagePreview){
										$output .='
											<div class="item" style="background-image:url(data:image/jpeg;base64,'.base64_encode($imagePreview).')"></div>
										';
									}
									for($i = 0; $i < $notFilled; $i++){
										$output .='
											<div class="item" style="background: #F0F2F5"></div>
										';
									}
								$output .='
								</div>
							</div>
						</div>
					</div>
					<div class="right-content">
							
						<div class="post-main-container">
							<div id="header">
								<img src="'.$me["profile_picture"].'" class="circle"/>
								<div class="post-text-container">
									<input type="text" name="post-text-area" class="post-text-area" placeholder="'.$placeholder.'">
								</div>
							</div>
							<div id="footer">
								<div id="item">
									<img src="image/lived.png">
									<span>Live Video</span></div>
								<div id="item" class="upload-images-button">
									<img src="image/picture.png">
									<span>Photo/Video</span></div>
								<div id="item">
									<img src="image/smile.png">
									<span>Felling/Activity</span></div>
							</div>
						</div>
							

						<div class="user-profile-all-post-content"></div>
						<div class="user-profile-all-post-content-response"></div>
					</div>
				</div>
			</div>
		';
		}
		echo $output;
	}
}
if(!function_exists('updateUserStatus')){
	function updateUserStatus($connect){
		$date = date('Y-m-d H:i:s');
		$username = $_SESSION["username"];
		$id = $_SESSION["id"];
		$query = "SELECT * FROM user_last_activity WHERE id='$id' ";
		$stmt = $connect->prepare($query);
		$stmt->execute();
		$result = $stmt->rowCount();

if($result == 0){
	$query = "INSERT INTO user_last_activity(username,id,last_activity)VALUES('$username','$id','$date') ";
	$stmt = $connect->prepare($query);
	$stmt->execute();
}else{
	$query = "UPDATE user_last_activity SET last_activity = '$date' WHERE id ='$id'  ";
	$stmt = $connect->prepare($query);
	$stmt->execute();
}

		userOnlineOffline($connect);
		
	}
}
if(!function_exists('getIdByName')){
	function getIdByName($name,$connect){
		$query = "SELECT id FROM user WHERE fullname='$name' ";
		$stmt= $connect->prepare($query);
		$stmt->execute();
		$result =  $stmt->fetchall();
		foreach($result as $row){
			return $row["id"];
		}
	}
}
if(!function_exists('getUsernameById')){
	function getUsernameById($id,$connect){
		$query = "SELECT username FROM user WHERE id='$id' ";
		$stmt= $connect->prepare($query);
		$stmt->execute();
		$result =  $stmt->fetchall();
		foreach($result as $row){
			return $row["username"];
		}
	}
}
if(!function_exists('getUserLastActivityInformation')){
	function getUserLastActivityInformation($user,$connect){
		$query = "SELECT * FROM user_last_activity WHERE id='$user' ";
		$stmt = $connect->prepare($query);
		$stmt->execute();
		$result = $stmt->fetchall();
		foreach($result as $row){
			$data = array(
				"username" => $row["username"],
				"id" => $row["id"],
				"status" => $row["status"],
				"last_activity" => $row["last_activity"],
				"time_ago" => time_elapsed_string($row["last_activity"]),
				"date" => date('g:i A \o\n l jS F Y',strtotime($row["last_activity"]))
			);
			return $data;
		}
	}
}
if(!function_exists('userOnlineOffline')){
	function userOnlineOffline($connect){

		$query = "SELECT * FROM user_last_activity ";
		$stmt = $connect->prepare($query);
		$stmt->execute();
		$result = $stmt->fetchall();
		foreach($result as $row){
			$current = strtotime(date('Y-m-d H:i:s') . '-10 second');
			$current = date('Y-m-d H:i:s', $current); 
			$data = getUserLastActivityInformation($row["id"],$connect);

			if($data["last_activity"] > $current){
				$status = "Online";
			}else{
				$status = "Offline";	
			}
			updateOnlineStatus($row["id"],$status,$connect);
		}
		updateOnlineStatusIfNotSet($connect);
	}
}
if(!function_exists('updateOnlineStatusIfNotSet')){
	function updateOnlineStatusIfNotSet($connect){
		$query = "SELECT * FROM user WHERE status ='' ";
		$stmt = $connect->prepare($query);
		$stmt->execute();
		$result = $stmt->fetchall();
		foreach($result as $row){
			$id = $row["id"];
			$status = "Offline";
			updateUserInfo($id,"status",$status,$connect);
		}
	}
}
if(!function_exists('updateOnlineStatus')){
	function updateOnlineStatus($user,$status,$connect){
		$query = "UPDATE user_last_activity SET status='$status' WHERE id='$user' ";
		$stmt = $connect->prepare($query);
		$stmt->execute();

		updateUserInfo($user,"status",$status,$connect);
	}
}
if(!function_exists('updateUserInfo')){
	function updateUserInfo($user,$toUpdate,$value,$connect){
		$query = "UPDATE user SET ".$toUpdate."='$value' WHERE id='$user' ";
		$stmt = $connect->prepare($query);
		$stmt->execute();
	}
}

// Friends System

if(!function_exists('sendFriendRequest')){
	function sendFriendRequest($to_id,$connect){	
		$from_id = $_SESSION['id'];
		$code = generateCode(12);
		$status = "Friend_request";
		$check = checkIsFriend($from_id,$to_id,$connect);
		if(!$check){
			$query = "INSERT INTO friends(from_id,to_id,status,code)VALUES('$from_id','$to_id','$status','$code')";
			$stmt = $connect->prepare($query);
			$stmt->execute();
			echo "Friend Request Sent";
		}else{
			echo "Friend Request Sent";
		}	
	}
}
if(!function_exists('cancelFriendRequest')){
	function cancelFriendRequest($to_id,$connect){
		$from_id = $_SESSION["id"];
		$query = "DELETE FROM friends WHERE from_id='$from_id' AND to_id='$to_id' OR from_id='$to_id' AND to_id='$from_id' ";
		$stmt = $connect->prepare($query);
		if($stmt->execute()){
			echo "Add Friend";
		}
	}
}
if(!function_exists('acceptFriendRequest')){
	function acceptFriendRequest($to_id,$connect){
		$status = "Friends";
		$from_id = $_SESSION["id"];
		$date_accepted = date('Y-m-d H:i:s');
 		$query = "UPDATE friends SET status='$status',date_accepted='$date_accepted' WHERE from_id='$from_id' AND to_id='$to_id' OR from_id='$to_id' AND to_id='$from_id' ";
		$stmt = $connect->prepare($query);
		$stmt->execute();
	}
}
if(!function_exists('checkIsFriend')){
	function checkIsFriend($from_id,$to_id,$connect){
		$query = "SELECT * FROM friends WHERE from_id='$from_id' AND to_id='$to_id' OR from_id='$to_id' AND to_id='$from_id' ";
		$stmt = $connect->prepare($query);
		$stmt->execute();
		$count = $stmt->rowCount();
		if($count == 0){
			return false;
		}else{
			return true;
		}
	}
}
if(!function_exists('getFriendInformation')){
	function getFriendInformation($from_id,$to_id,$connect){
		$query = "SELECT * FROM friends WHERE from_id='$from_id' AND to_id='$to_id' OR from_id='$to_id' AND to_id='$from_id' ";
		$stmt = $connect->prepare($query);
		$stmt->execute();
		$result = $stmt->fetchall();
		$count = $stmt->rowCount();
		if($count == 0){
			$data = array(
				"status" => "not_friend"
			);
			return $data;
		}
		foreach($result as $row){
			$data = array(
				"from_id" => $row["from_id"],
				"to_id" => $row["to_id"],
				"status" => $row["status"],
				"code" => $row["code"],
				"accepted_date" => $row["date_accepted"],
				"date_sent" => $row["date_sent"]
			);
			return $data;
		}


	}
}
// POSTS
if(!function_exists('getPostInformation')){
	function getPostInformation($post,$connect){
		$query = "SELECT * FROM post WHERE post_id ='$post' ";
		$stmt = $connect->prepare($query);
		$stmt->execute();
		$result = $stmt->fetchall();
		foreach($result as $row){
			$data = array(
				"post_id" => $row["post_id"],
				"username" => $row["username"],
				"id"=> $row["id"],
				"post_text" => $row["post_text"],
				"background" => $row["background"],
				"images" => $row["images"],
				"videos" => $row["videos"],
				"code" => $row["code"],
				"post_inserted" => $row["post_inserted"],
				"timestamp" => $row["post_inserted"],
				"time_ago" => time_elapsed_string($row["post_inserted"]),
				"date" => date('g:i A \o\n l jS F Y',strtotime($row["post_inserted"]))
			);
			return $data;
		}
	}
}
if(!function_exists('getPostCommentInformation')){
	function getPostCommentInformation($comment,$connect){
		$query = "SELECT * FROM post_comments WHERE code ='$comment' ";
		$stmt = $connect->prepare($query);
		$stmt->execute();
		$result = $stmt->fetchall();
		foreach($result as $row){
			$data = array(
				"post_comment_id" => $row["post_comment_id"],
				"username" => $row["username"],
				"id"=> $row["id"],
				"post_id" => $row["post_id"],
				"comment" => $row["comment"],
				"code" => $row["code"],
				"date_commented" => $row["date_commented"],
				"timestamp" => $row["date_commented"],
				"time_ago" => time_elapsed_string($row["date_commented"]),
				"date" => date('g:i A \o\n l jS F Y',strtotime($row["date_commented"]))
			);
			return $data;
		}
	}
}
if(!function_exists('postCondition')){
	function postCondition($start,$limit,$condition,$people,$post,$connect){
		if($condition == false && $people == false && $post == false ){
			$query = "SELECT * FROM post ORDER BY post_inserted DESC LIMIT ".$start.",".$limit."";
			fetchPost($query,false,$connect);
		}else if($people != false && $condition == false && $post == false){
			if($people == "me"){
				$people = $_SESSION["id"];
			}
			$query = "SELECT * FROM post WHERE id='$people' ORDER BY post_inserted DESC LIMIT ".$start.",".$limit."";
			fetchPost($query,false,$connect);
		}else if($post != false && $condition != false && $people == false){
			$query = "SELECT * FROM post WHERE post_id='$post'";
			fetchPost($query,$condition,$connect);
		}
	}
}

if(!function_exists('fetchPost')){
	function fetchPost($query,$condition,$connect){
		$stmt = $connect->prepare($query);
		$stmt->execute();
		$result = $stmt->fetchall();
		foreach($result as $row){
			$data = get_user_information($row["id"],$connect);
			$me = get_user_information($_SESSION["id"],$connect);
			$hasImage = $row["images"];
			$hasVideo = $row["videos"];
			$theme = $row["background"];
			$code = $row["code"];
			$id = $data["id"];
			$countImages = countImages($id,$code,$connect);
			$post_id = $row["post_id"];
			$date = date('g:i A \o\n l jS F Y',strtotime($row["post_inserted"]));
			$time_ago = time_elapsed_string($row["post_inserted"]);
			$allReact = countReaction($post_id,$connect);
			$myReact = whatIReact($post_id,$connect);
			$allComments = countALLComments($post_id,$connect);
			$like = countPostReaction("like",$post_id,$connect);
			$love = countPostReaction("love",$post_id,$connect);
			$care = countPostReaction("care",$post_id,$connect);
			$haha = countPostReaction("haha",$post_id,$connect);
			$sad = countPostReaction("sad",$post_id,$connect);
			$angry = countPostReaction("angry",$post_id,$connect);
			$wow = countPostReaction("wow",$post_id,$connect);
			$reactions =  array();
			$reactions["like"] = $like;
			$reactions["love"] = $love;
			$reactions["care"] = $care;
			$reactions["haha"] = $haha;
			$reactions["sad"] = $sad;
			$reactions["angry"] = $angry;
			$reactions["wow"] = $wow;
			$WhoReact = fetchWhoReact($post_id,$connect);
			$CountComments = countComments($post_id,$connect);
			$post_text = $row["post_text"];
			$lettersArray = array("a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z","A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z",0,1,2,3,4,5,6,7,8,9,"?",".");
			$string = str_split($post_text);
			$countTextArray = array();
			$font_size = "16px";

			if($myReact["default"] == "no"){
				$myReactImage  = fetchReactionImages($myReact["reaction"]);
			}else{
				$myReactImage  = "<img src='svg/like.svg'>";
			}
			if($countImages > 4){
				$countImages = 4;
			}
			if($hasImage == "false" && $row["background"] == "false"){	
				foreach($string as $letters){
					if(in_array($letters, $lettersArray)){
						array_push($countTextArray, $letters);
					}
				}
				$countAllText = count($countTextArray);
				if($countAllText < 50){
					$font_size = "24px";
				}else{
					$font_size = "16px";
				}
			}	
			
			$output = '
 							<div class="user-post-container">
								<div id="header">
									<div class="box">
										<img src="'.$data["profile_picture"].'" id="circle"/>
										<div id="info">
											<a href="'.$data["id"].'" class="profile-link">'.$data["fullname"].'</a>
											<span class="hc date_time_ago">'.$time_ago.'<div class="desc bot" data-timestamp="'.$row["post_inserted"].'">'.$date.'</div></span>
										</div>
									</div>
								</div>
								';
							if($theme  == "false"){
								$output .='<div id="text-content" class="bold" style="font-size:'.$font_size.'">'.$post_text.'</div>';
							}else{
								$output .='
								
								<div class="post-theme" style="background:'.$theme.'">
									<div id="text-content">'.$post_text.'</div>
								</div>
					
								';
							}

			if($hasImage == "true" && $condition != "post-preview"){

				$output .='<div id="image-content" class="style'.$countImages.'">';
				$query = "SELECT * FROM images WHERE code ='$code' AND id='$id' ";
				$stmt = $connect->prepare($query);
				$stmt->execute();
				$result = $stmt->fetchall();
				foreach($result as $images){
					$output .= '
						<img src="data:image/jpeg;base64,'.base64_encode($images["image"]).'" class="post-images" data-id="'.$images["id"].'" data-post="'.$post_id.'" data-index="'.$images["image_index"].'">
					';
				}
				$output .='</div>';
			}	
			$output .='<div id="reactions" class="reactions-'.$post_id.'" >';
			if($allReact > 3){
				$i = 0;
				foreach($reactions as $key => $value){
						if($value != 0 && $i != 3){
							$i++;
						$output .= '<image src="image/reactions/svg/'.$key.'.svg">';
					}
				}
			}else{
				foreach($reactions as $key => $value){
						if($value != 0){
						$output .= '<image src="image/reactions/svg/'.$key.'.svg">';
				}
			}

		}
			$output .='<span class="left">'.$WhoReact.'</span><span class="right">'.$CountComments.'</span><span class="right"></span>';
		
			$output .='	</div><div id="footer">
								<div class="reaction-container reaction-container-'.$post_id.'" data-id="'.$post_id.'">
									<div class="item like-post">
										<img src="image/reactions/like.gif">
										<span>Like</span>
									</div>
									<div class="item love-post">
										<img src="image/reactions/love.gif">
										<span>Love</span>
									</div>
									<div class="item care-post">
										<img src="image/reactions/care.gif">
										<span>Care</span>
									</div>
									<div class="item haha-post">
										<img src="image/reactions/haha.gif">
										<span>Haha</span>
									</div>
									<div class="item wow-post">
										<img src="image/reactions/wow.gif">
										<span>Wow</span>
									</div>
									<div class="item sad-post">
										<img src="image/reactions/sad.gif">
										<span>Sad</span>
									</div>
									<div class="item angry-post">
										<img src="image/reactions/angry.gif">
										<span>Angry</span>
									</div>
								</div>
									<div class="react-buttons" data-id="'.$post_id.'">
										<div class="item main-like-post">
												'.$myReactImage.'
											<span>'.$myReact["reaction"].'</span>
										</div>
										<div class="item">
											<img src="svg/comment.svg">
											<span>Comment</span></div>
										<div class="item">
											<img src="svg/share.svg">
											<span>Share</span></div>
									</div>
									<div class="user-comments-section user-comments-section-'.$post_id.'">';
	$query = "SELECT * FROM post_comments WHERE post_id='$post_id' ORDER BY date_commented DESC LIMIT 5";
	$stmt = $connect->prepare($query);
	$stmt->execute();
	$result = $stmt->fetchall();
	$count = countALLComments($post_id,$connect);
	$text = " Comments";
	$minus = $count;
	if($minus == 1){
		$text = " Comment";
	}
	if($count != 0 && $count != 1 && $count != 2 && $count != 3 && $count != 4 && $count != 5){
		$minus = $count - 5;
		$minus_comments ='<h5>View '.$minus.$text.'</h5>';
	}else{
		$minus_comments = '';
	}
	foreach($result as $comments){
			$userCommentData = get_user_information($comments["id"],$connect);
			$comment_id = $comments["post_comment_id"];
			$comment_code = $comments["code"];
			$time_ago = time_elapsed_string($comments["date_commented"]);
			$date = date('g:i A \o\n l jS F Y',strtotime($comments["date_commented"]));
										$output .='
										<div class="user-post-comments-container" data-id="'.$comments["post_comment_id"].'">

											<div class="user-post-comments">
												<img src="'.$userCommentData["profile_picture"].'" class="circle">
												<div class="text">
													<a href="'.$userCommentData["id"].'" >'.$userCommentData["fullname"].'</a>
													<span>'.$comments["comment"].'</span>
												</div>
											</div>
											<div class="comment-reactions">
							<div class="reaction-container comment-reaction-container-'.$comment_id.'" data-id="'.$comment_id.'">
									<div class="item like-post">
										<img src="image/reactions/like.gif">
										<span>Like</span>
									</div>
									<div class="item love-post">
										<img src="image/reactions/love.gif">
										<span>Love</span>
									</div>
									<div class="item care-post">
										<img src="image/reactions/care.gif">
										<span>Care</span>
									</div>
									<div class="item haha-post">
										<img src="image/reactions/haha.gif">
										<span>Haha</span>
									</div>
									<div class="item wow-post">
										<img src="image/reactions/wow.gif">
										<span>Wow</span>
									</div>
									<div class="item sad-post">
										<img src="image/reactions/sad.gif">
										<span>Sad</span>
									</div>
									<div class="item angry-post">
										<img src="image/reactions/angry.gif">
										<span>Angry</span>
									</div>
								</div>
								<span data-comment_id="'.$comment_id.'">Like</span>
								<span data-comment_id="'.$comment_id.'">Reply</span>
								<span class="hc date_time_ago">'.$time_ago.'<div class="desc"  data-timestamp="'.$comments["date_commented"].'">'.$date.'</div></span>
							</div>
							
							<div class="user-comment-reply-container">
							
							';
	 $query = "SELECT * FROM post_comment_replies WHERE comment_id ='$comment_id' AND comment_code ='$comment_code' ";
		$stmt = $connect->prepare($query);
		$stmt->execute();
		$result = $stmt->fetchall();
		foreach($result as $reply){
			$userReplyData =  get_user_information($reply["id"],$connect);
			$time_ago = time_elapsed_string($reply["comment_reply_date"]);
			$date = date('g:i A \o\n l jS F Y',strtotime($reply["comment_reply_date"]));
								 $output .='
						 <div class="user-post-comment-replies">
							 <img src="'.$userReplyData["profile_picture"].'" class="circle">
							
								<div class="text">
								<a href="#">'.$userReplyData["fullname"].'</a>
								<span data-comment_id="'.$comment_id.'">'.$reply["reply"].'</span>
								</div>
							
							</div>
								 <div class="reply-reactions" data-id="'.$comment_id.'">
									<span>Like</span>
									<span>Reply</span>
									<span class="hc date_time_ago">'.$time_ago.'<div class="desc" data-timestamp="'.$reply["comment_reply_date"].'">'.$date.'</div></span>
								</div>
							 ';
							}
							
							 $output .='
							 <div class="user-post-comment-textarea-container user-post-comment-textarea-container-'.$comment_id.'" style="display:none;" data-id="'.$comment_id.'" data-post_id ="'.$post_id.'">
									<img src="'.$me["profile_picture"].'" class="circle">
									<div class="comment-reply-textarea" contenteditable placeholder="Write a reply"></div>
							</div>

							</div>
						</div>

						';
								}
								$output .= $minus_comments;
										$output .='
									</div>
									<div class="comment-container" data-id="'.$post_id.'">
										<img src="'.$me["profile_picture"].'">
							<div class="comment-textarea" contenteditable placeholder="Write a comment"></div>
										<ul>
											<li class="hc">'.fbsvg("avatar_icon").'<div class="desc">Insert your Avatar</div></li>
											<li class="hc">'.fbsvg("smile").'<div class="desc">Insert an Emoji</div></li>
											<li class="hc">'.fbsvg("camera").'<div class="desc">Attach a photo or video</div></li>
											<li class="hc">'.fbsvg("gif-icon").'<div class="desc">Post a GIF</div></li>
											<li class="hc">'.fbsvg("sticker-icon").'<div class="desc">Sticker</div></li>
										</ul>
									</div>
								</div>
							</div>

			';

			echo $output;
		}
	}
}



if(!function_exists('insertPost')){
  function insertPost($text,$background,$images,$video,$code,$connect){
    $data = get_user_information($_SESSION["id"],$connect);
    $username = $data["username"];
    $id = $data["id"];
    $query = "INSERT INTO post(username,id,post_text,background,images,videos,code)VALUES('$username','$id','$text','$background','$images','$video','$code')";
    $stmt = $connect->prepare($query);
    $stmt->execute();
  }
}
if(!function_exists('insertImages')){
  function insertImages($image_file,$index,$code,$connect){
    $data = get_user_information($_SESSION["id"],$connect);
    $username = $data["username"];
    $id = $data["id"];
    $query ="INSERT INTO images(username,id,image,image_index,code)VALUES('$username','$id','$image_file','$index','$code')";
    $stmt = $connect->prepare($query);
    $stmt->execute();
  }
}
if(!function_exists('countImages')){
	function countImages($id,$code,$connect){
		$query = "SELECT * FROM images WHERE id='$id' AND code='$code' ";
		$stmt = $connect->prepare($query);
  	  	$stmt->execute();
  	  	$count = $stmt->rowCount();
  	  	return $count;
	}
}

if(!function_exists('getPostImageInformation')){
	function getPostImageInformation($post,$id,$index,$connect){
		$query = "SELECT * FROM post WHERE post_id ='$post' AND images='true' ";
		$stmt = $connect->prepare($query);
  	  	$stmt->execute();
  	  	$count = $stmt->rowCount();
  	  	$result = $stmt->fetchall();
  	  	if($count != 0){
  	  		foreach($result as $row){
  	  			$code = $row["code"];
  	  			$maxIndex = countAllImages($id,$code,$connect);
  	  			$query = "SELECT * FROM images WHERE id='$id' AND image_index ='$index' AND code ='$code' ";
				$stmt = $connect->prepare($query);
	  	  		$stmt->execute();
	  	  		$result = $stmt->fetchall();
	  	  		foreach($result as $row){
	  	  			$data = array(
	  	  				"image" => 'data:image/jpeg;base64,'.base64_encode($row["image"]),
	  	  				"index" => $row["image_index"],
	  	  				"maxIndex" => $maxIndex
	  	  			);
	  	  			return $data;
	  	  		}
  	  		}
  	  		
  	  	}
	}
}
if(!function_exists('countAllImages')){
	function countAllImages($id,$code,$connect){
		$query = "SELECT * FROM images WHERE id='$id' AND code ='$code' ORDER BY image_id DESC LIMIT 1";
		$stmt = $connect->prepare($query);
	  	$stmt->execute();
	  	$count = $stmt->fetchall();
	  	foreach($count as $row){
	  		return $row["image_index"];
	  	}
	}
}

if(!function_exists('reactToPost')){
	function reactToPost($reaction,$post_id,$connect){
		$id = $_SESSION["id"];
		$username = $_SESSION["username"];
		$query = "SELECT * FROM post_reactions WHERE post_id ='$post_id' AND id='$id' ";
		$stmt = $connect->prepare($query);
		$stmt->execute();
		$count = $stmt->rowCount();
	
		if($count == 0){
			$query = "INSERT INTO post_reactions(username,id,reaction,post_id)VALUES('$username','$id','$reaction','$post_id')";
				$stmt = $connect->prepare($query);
				$stmt->execute();
				echo "insert";
		}else{
			$query = "SELECT * FROM post_reactions WHERE post_id ='$post_id' AND id='$id' ";
			$stmt = $connect->prepare($query);
			$stmt->execute();
			$result =$stmt->fetchall();
			foreach($result as $row){
				if($row["reaction"] == $reaction){
					$query = "DELETE FROM post_reactions  WHERE post_id ='$post_id' AND id='$id' AND reaction='$reaction' ";	
					$stmt = $connect->prepare($query);
					$stmt->execute();

					echo "delete";
				}else{
					$query = "UPDATE post_reactions SET reaction ='$reaction' WHERE post_id ='$post_id' AND id='$id'";	
					$stmt = $connect->prepare($query);
					$stmt->execute();
					echo "update";
				}
				
			}
			
		
		}
	}
}
if(!function_exists('countPostReaction')){
	function countPostReaction($reaction,$post_id,$connect){
		$query = "SELECT * FROM post_reactions WHERE reaction ='$reaction' AND post_id='$post_id' ";
		$stmt = $connect->prepare($query);
		$stmt->execute();
		$count = $stmt->rowCount();
		return $count;
	}
}
if(!function_exists('countReaction')){
	function countReaction($post_id,$connect){
		$query = "SELECT * FROM post_reactions WHERE post_id='$post_id' AND reaction != '' ";
		$stmt = $connect->prepare($query);
		$stmt->execute();
		$result = $stmt->rowCount();
		if($result == 0){
			return false;
		}else{
			return $result;
		}
		
	}
}
if(!function_exists('fetchWhoReact')){
	function fetchWhoReact($post_id,$connect){
		$query = "SELECT * FROM post_reactions WHERE post_id='$post_id' AND reaction != '' ";
		$stmt = $connect->prepare($query);
		$stmt->execute();
		$count = $stmt->rowCount();
		$result = $stmt->fetchall();
		if($count == 0){
			return false;
		}else{
			$all = array();
			foreach($result as $row){
				if($count == 1){
					$data = get_user_information($row["id"],$connect);
					return $data["fullname"];
				}else if($count == 2){

					if(in_array($row["id"],$all)){

					}else{
						array_push($all, $row["id"]);	
					}
				}else if($count != 1 || $count != 2){
					if(in_array($row["id"],$all)){
					}else{
						array_push($all, $row["id"]);	
					}
				}
			}
			if($count == 2){
				$first = get_user_information($all[0],$connect);
				$second = get_user_information($all[1],$connect);
				return $first["fullname"]." and ".$second["fullname"];
			}else if($count != 1 || $count != 2){
				$scope = array();
				for($i = 0; $i < count($all); $i++ ){
					if($all[$i] == $_SESSION["id"]){
						array_push($scope, $all[$i]);
					}
				}
				if(count($scope) == 0 || count($scope) == null){
					array_push($scope, $all[0]);
				}
				$first = get_user_information($scope[0],$connect);
				$sum = $count - 1;
				return $first["fullname"]." and ".$sum." others";
			}
		}
		
	}
}
if(!function_exists('fetchReactionImages')){
	function fetchReactionImages($reaction){
		$image = '<image src="image/reactions/svg/'.$reaction.'.svg">';
		return $image;
	}
}
if(!function_exists('whatIReact')){
	function whatIReact($post_id,$connect){
		$me = $_SESSION["id"];
		$query = "SELECT * FROM post_reactions WHERE post_id='$post_id' AND id='$me' ";
		$stmt = $connect->prepare($query);
		$stmt->execute();
		$result = $stmt->fetchall();
		$count = $stmt->rowCount();

		foreach($result as $row){
			$data = array(
				"reaction"=>$row["reaction"],
				"default"=>"no"
			);
			return $data;
		}
		if($count == 0){
			$data = array(
				"reaction"=>"like",
				"default"=>"yes"
			);
			return $data;

		}
	}
}
if(!function_exists('fetchReaction')){
	function fetchReaction($post_id,$connect){
			$output ='';
			$allReact = countReaction($post_id,$connect);
			$allReactions = countReaction($post_id,$connect);
			$WhoReact = fetchWhoReact($post_id,$connect);
			$CountComments = countComments($post_id,$connect);

			$like = countPostReaction("like",$post_id,$connect);
			$love = countPostReaction("love",$post_id,$connect);
			$care = countPostReaction("care",$post_id,$connect);
			$haha = countPostReaction("haha",$post_id,$connect);
			$sad = countPostReaction("sad",$post_id,$connect);
			$angry = countPostReaction("angry",$post_id,$connect);
			$wow = countPostReaction("wow",$post_id,$connect);

			$reactions =  array();
			$reactions["like"] = $like;
			$reactions["love"] = $love;
			$reactions["care"] = $care;
			$reactions["haha"] = $haha;
			$reactions["sad"] = $sad;
			$reactions["angry"] = $angry;
			$reactions["wow"] = $wow;
			
			if($allReact > 3){
				$i = 0;
				foreach($reactions as $key => $value){
						if($value != 0 && $i != 3){
							$i++;
						$output .= '<image src="image/reactions/svg/'.$key.'.svg">';
					}
				}
			}else{
				foreach($reactions as $key => $value){
						if($value != 0){
						$output .= '<image src="image/reactions/svg/'.$key.'.svg">';
					}
				}
			}

			$output .='<span class="left">'.$WhoReact.'</span><span class="right">'.$CountComments.'</span><span class="right"></span>';

			echo $output;
	}
}

if(!function_exists('commentToPost')){
	function commentToPost($post_id,$comment,$code,$connect){
		$id = $_SESSION["id"];
		$username = $_SESSION["username"];
		$query = "INSERT INTO post_comments(username,id,post_id,comment,code)VALUES('$username','$id','$post_id','$comment','$code')";
		$stmt = $connect->prepare($query);
		$stmt->execute();
		return $code;
	}
}
if(!function_exists('countALLComments')){
	function countALLComments($post_id,$connect){
		$query = "SELECT * FROM post_comments WHERE post_id='$post_id' ";
		$stmt = $connect->prepare($query);
		$stmt->execute();
		$count = $stmt->rowCount();
		return $count;
	}
}
if(!function_exists('countComments')){
	function countComments($post_id,$connect){
		$query = "SELECT * FROM post_comments WHERE post_id='$post_id' ";
		$stmt = $connect->prepare($query);
		$stmt->execute();
		$count = $stmt->rowCount();
		if($count != 0 ){
			if($count == 1){
				return $count ." Comment";
			}else{
				return $count ." Comments";
			}
		}
	}
}
if((!function_exists('fetchComments'))){
	function fetchComments($post_id,$connect){
		$query = "SELECT * FROM post_comments WHERE post_id='$post_id' ";
		$stmt = $connect->prepare($query);
		$stmt->execute();
		$result = $stmt->fetchall();
		foreach($result as $comments){
				$me = get_user_information($_SESSION["id"],$connect);
				$userCommentData = get_user_information($comments["id"],$connect);
				$comment_id = $comments["post_comment_id"];
				$comment_code = $comments["code"];
				$time_ago = time_elapsed_string($comments["date_commented"]);
				$date = date('g:i A \o\n l jS F Y',strtotime($comments["date_commented"]));


				$output ='<div class="user-post-comments">
					<img src="'.$userCommentData["profile_picture"].'" class="circle">
					<div class="text">
						<a href="#">'.$userCommentData["fullname"].'</a>
						<span>'.$comments["comment"].'</span>
					</div>
				</div>
				<div class="comment-reactions">
					<span>Like</span>
					<span data-comment_id="'.$comment_id.'">Reply</span>
					<span class="hc date_time_ago">'.$time_ago.'<div class="desc" data-timestamp="'.$comments["date_commented"].'">'.$date.'</div></span>
				</div>
				<div class="user-comment-reply-container">						
					';
		 $query = "SELECT * FROM post_comment_replies WHERE comment_id ='$comment_id' AND comment_code ='$comment_code' ";
					 $stmt = $connect->prepare($query);
					$stmt->execute();
					$result = $stmt->fetchall();
					foreach($result as $reply){
						$userReplyData =  get_user_information($reply["id"],$connect);
						$time_ago = time_elapsed_string($reply["comment_reply_date"]);
						$date = date('g:i A \o\n l jS F Y',strtotime($reply["comment_reply_date"]));
						 $output .='
				 <div class="user-post-comment-replies">
					 <img src="'.$userReplyData["profile_picture"].'" class="circle">
					
						<div class="text">
						<a href="#">'.$userReplyData["fullname"].'</a>
						<span  data-comment_id="'.$comment_id.'">'.$reply["reply"].'</span>
						</div>
					
					</div>
						 <div class="reply-reactions">
							<span>Like</span>
							<span>Reply</span>
							<span class="hc date_time_ago">'.$time_ago.'<div class="desc" data-timestamp="'.$reply["comment_reply_date"].'">'.$date.'</div></span>
						</div>
					 ';
					}
					
					 $output .='
					 <div class="user-post-comment-textarea-container user-post-comment-textarea-container-'.$comment_id.'" style="display:none;" data-id="'.$comment_id.'" data-post_id ="'.$post_id.'">
							<img src="'.$me["profile_picture"].'" class="circle">
							<div class="comment-reply-textarea" contenteditable placeholder="Write a reply"></div>
					</div>

					</div>

				';

				echo $output;
		}
	}
}

if(!function_exists('replyToComment')){
	function replyToComment($comment_id,$reply,$connect){
		$id = $_SESSION["id"];
		$username = $_SESSION["username"];
		$code = generateCode(12);

		$query = "SELECT * FROM post_comments WHERE post_comment_id='$comment_id' ";
		$stmt = $connect->prepare($query);
		$stmt->execute();
		$result = $stmt->fetchall();
		foreach($result as $row){
			$comment_code = $row["code"];
			$query = "INSERT INTO post_comment_replies(username,id,comment_id,reply,code,comment_code)VALUES('$username','$id','$comment_id','$reply','$code','$comment_code')";
			$stmt = $connect->prepare($query);
			$stmt->execute();
			echo "success";
		}	
	}
}
// Messages /
if(!function_exists('insertMessage')){
	function insertMessage($sender,$reciever,$message,$index,$emoji,$messageToken,$connect){
		$query = "INSERT INTO messages(sender,reciever,message,message_index,emoji,message_token)VALUES('$sender','$reciever','$message','$index','$emoji','$messageToken')";
		$stmt = $connect->prepare($query);
		$stmt->execute();
		insertMessageToInbox($sender,$reciever,$message,$index,$emoji,$messageToken,$connect);
	}
}	
if(!function_exists('insertMessageToInbox')){
	function insertMessageToInbox($sender,$reciever,$message,$index,$emoji,$messageToken,$connect){
		$query = "SELECT * FROM inbox WHERE sender ='$sender' AND reciever='$reciever' OR sender='$reciever' AND reciever='$sender' ";
		$stmt = $connect->prepare($query);
		$stmt->execute();
		$count = $stmt->rowCount();
		if($count == 0){
			$query = "INSERT INTO inbox(sender,reciever,message,emoji,message_index,message_token)VALUES('$sender','$reciever','$message','$emoji','$index','$messageToken')";
			$stmt = $connect->prepare($query);
			$stmt->execute();
		}else{
			$query = "UPDATE inbox SET sender='$sender',reciever='$reciever',message='$message',message_index='$index',emoji='$emoji',message_token='$messageToken' WHERE sender ='$sender' AND reciever='$reciever' OR sender='$reciever' AND reciever='$sender' ";
			$stmt = $connect->prepare($query);
			$stmt->execute();
		}
	
	
	}
}	

if(!function_exists('fetchMessages')){
	function fetchMessages($sender,$reciever,$connect){
		$query = "SELECT * FROM messages WHERE sender='$sender' AND reciever='$reciever' AND message_index= '1' OR sender='$reciever' AND reciever='$sender' AND message_index= '1'";
		$stmt = $connect->prepare($query);
		$stmt->execute();
		$result = $stmt->fetchall();
		$countMessages = $stmt->rowCount();

		$output = "";
		if($countMessages == 0){
			$data = get_user_information($reciever,$connect);	
			$output .='
					
				<center>
					<div style="margin-top:-325px;margin-bottom:50px;">
					<img src="'.$data["profile_picture"].'" class="circle" style="width:60px;height:60px;border-radius:50%;">
					<br>
					<small>You and '.$data["fullname"].' aren\'t connected </small>
					<br>
					<small>on Facebook</small>
					</div>
				</center>
	
			';
			echo $output;
		}
		foreach($result as $row){
			$emoji = $row["emoji"];
			$count = countMessagesGroup($sender,$reciever,$row["message_token"],$connect);
			$token = $row["message_token"];
			
			if($sender  == $row["sender"] && $reciever == $row["reciever"]){
				$data = get_user_information($sender,$connect);	
				if($count == 1){
					$date = date("I:s A",strtotime($row["date_send"]));
					$output ='
			  		<div class="message-con right">
	      				<div class="status">
							<div class="status-content">
								<div class="image"></div>
							</div>
	      				</div>';

	      				if($emoji == "true"){
	      					$insertEmoji = insertEmoji($row["message"],"#0084FF");
	     
	      						$output .='
							<div class="main-message-container">
								<div class="menu">
									<div class="flex">
										<div class="item hc">'.mysvg("more-gray").'<div class="desc">More</div></div>
										<div class="item hc">'.mysvg("reload").'<div class="desc">Reply</div></div>
										<div class="item hc">'.mysvg("emoji").'<div class="desc">React</div></div>
									</div>
								</div>
								<span class="content right hc" style="background:transparent:padding:2px">'.$insertEmoji.'
								<div class="desc">'.$date.'</div>
								</span>
							</div>';
	      				}else{
	      					$output .='
							<div class="main-message-container">
								<div class="menu">
									<div class="flex">
										<div class="item hc">'.mysvg("more-gray").'<div class="desc">More</div></div>
										<div class="item hc">'.mysvg("reload").'<div class="desc">Reply</div></div>
										<div class="item hc">'.mysvg("emoji").'<div class="desc">React</div></div>
									</div>
								</div>
								<span class="content right hc" style="background:#0084FF">'.$row["message"].'
								<div class="desc">'.$date.'</div>
								</span>
							</div>';
	      				}
	  					$output .='</div>';
					echo $output;
				}else{
					$output ='
					<div class="message-con right">
	      				<div class="status">
							<div class="status-content">
								<div class="image"></div>
							</div>
	      				</div>';
					$query = "SELECT * FROM messages WHERE sender='$sender' AND reciever='$reciever' AND message_token='$token' OR sender='$reciever' AND reciever='$sender' AND message_token='$token'";
					$stmt = $connect->prepare($query);
					$stmt->execute();
					$result = $stmt->fetchall();
					foreach($result as $messages){
						$date = date("I:s A",strtotime($messages["date_send"]));
						$emoji = $messages["emoji"];
						
						if($emoji != "true"){
							$output .='
							<div class="main-message-container">
								<div class="menu">
									<div class="flex">
										<div class="item hc">'.mysvg("more-gray").'<div class="desc">More</div></div>
										<div class="item hc">'.mysvg("reload").'<div class="desc">Reply</div></div>
										<div class="item react-to-message hc">'.mysvg("emoji").'
											<div class="reaction-con">
												<div class="reactions"><img src="image/message_reactions/heartReact.png"></div>
												<div class="reactions"><img src="image/message_reactions/hahaReact.png"></div>
												<div class="reactions"><img src="image/message_reactions/wowReact.png"></div>
												<div class="reactions"><img src="image/message_reactions/sadReact.png"></div>
												<div class="reactions"><img src="image/message_reactions/angryReact.png"></div>
												<div class="reactions"><img src="image/message_reactions/likeReact.png"></div>
												<div class="reactions"><img src="image/message_reactions/unlikeReact.png"></div>
											</div>
										<div class="desc">React</div></div>
									</div>
								</div>
								<span class="content right hc" style="background:#0084FF">'.$messages["message"].'
								<div class="desc">'.$date.'</div>
								</span>
							</div>';
						}else{
							$insertEmoji = insertEmoji($messages["message"],"#0084FF");
							$output .='
							<div class="main-message-container">
								<div class="menu">
									<div class="flex">
									<div class="item hc">'.mysvg("more-gray").'<div class="desc">More</div></div>
										<div class="item hc">'.mysvg("reload").'<div class="desc">Reply</div></div>
										<div class="item hc">'.mysvg("emoji").'<div class="desc">React</div></div>
									</div>
								</div>
							<span class="content right hc" style="background:transparent;padding:2px">
							'.$insertEmoji.'
						<div class="desc">'.$date.'</div>
						</span>
							</div>';
						}
						
					}
					$output .=' </div>';
					echo $output;
				}
			
			}
			else if($sender  == $row["reciever"] && $reciever == $row["sender"]){
				$data = get_user_information($reciever,$connect);	
				if($count == 1){
					$date = date("I:s A",strtotime($row["date_send"]));

						$output ='
			  	  			<div class="message-con left ">
			      				<div class="status">
									<div class="status-content">
										<div class="image"></div>
									</div>
			      				</div>
			  					<div class="box">
									<div class="circle-content">
										<img src="'.$data["profile_picture"].'" class="image" />
									</div>
			  					</div>';

	      				if($emoji == "true"){
	      					$insertEmoji = insertEmoji($row["message"],"#0084FF");
	      					$output .='
	      					<span class="content left hc" style="background:transparent:padding:2px">'.$insertEmoji.'
							<div class="desc">'.$date.'</div>
	  						</span>
	      					';
	      				}else{
	      						$output .='
							<div class="main-message-container">
								<span class="content left hc">'.$row["message"].'
								<div class="desc">'.$date.'</div>
								</span>
								<div class="menu">
									<div class="flex">
										<div class="item hc">'.mysvg("emoji").'<div class="desc">React</div></div>
										<div class="item hc">'.mysvg("reload").'<div class="desc">Reply</div></div>
										<div class="item hc">'.mysvg("more-gray").'<div class="desc">More</div></div>
									</div>
								</div>
							</div>';
	      				}
	  					

	  					$output .='
	  				</div>
					';
					echo $output;
	
				}else{
						$output ='
					<div class="message-con left ">
	      				<div class="status">
							<div class="status-content">
								<div class="image"></div>
							</div>
	      				</div>
	  					<div class="box">
							<div class="circle-content">
								<img src="'.$data["profile_picture"].'" class="image" />
							</div>
	  					</div>
					';
					$query = "SELECT * FROM messages WHERE sender='$sender' AND reciever='$reciever' AND message_token='$token' OR sender='$reciever' AND reciever='$sender' AND message_token='$token'";
					$stmt = $connect->prepare($query);
					$stmt->execute();
					$result = $stmt->fetchall();
					foreach($result as $messages){
						$date = date("I:s A",strtotime($messages["date_send"]));
						$emoji = $messages["emoji"];
						
						if($emoji != "true"){
							$output .='
							<div class="main-message-container">
								<span class="content left hc">'.$messages["message"].'
								<div class="desc">'.$date.'</div>
								</span>
								<div class="menu">
									<div class="flex">
										<div class="item hc">'.mysvg("emoji").'<div class="desc">React</div></div>
										<div class="item hc">'.mysvg("reload").'<div class="desc">Reply</div></div>
										<div class="item hc">'.mysvg("more-gray").'<div class="desc">More</div></div>
									</div>
								</div>
							</div>';
						}else{
						$insertEmoji = insertEmoji($messages["message"],"#0084FF");
							$output .='
							<div class="main-message-container">
							<span class="content left hc" style="background:transparent;padding:2px">
							'.$insertEmoji.'
						<div class="desc">'.$date.'</div>
						</span>
								<div class="menu">
									<div class="flex">
										<div class="item hc">'.mysvg("emoji").'<div class="desc">React</div></div>
										<div class="item hc">'.mysvg("reload").'<div class="desc">Reply</div></div>
										<div class="item hc">'.mysvg("more-gray").'<div class="desc">More</div></div>
									</div>
								</div>
							</div>';
						}
						
					}
					$output .=' </div>';
					echo $output;
				}
				
			}
			
			
		}
	}
}





if(!function_exists('fetchMessageInbox')){
	function fetchMessageInbox($connect){
		$sender = $_SESSION["id"];
		$query = "SELECT * FROM inbox WHERE reciever='$sender' OR sender='$sender'  ORDER BY date_send  DESC";
			$stmt = $connect->prepare($query);
			$stmt->execute();
			$result= $stmt->fetchall();
			$count = $stmt->rowCount();
			foreach($result as $messages){
				$who = identifyUser($messages["sender"],$connect);
				if($messages["sender"] == $_SESSION["id"]){
					$data = get_user_information($messages["reciever"],$connect);
				}else if($messages["reciever"] == $_SESSION["id"]){
					$data = get_user_information($messages["sender"],$connect);
				}
				if($messages["emoji"] == "true"){
					$message = insertEmoji("Like","#0084FF");
				}else{
					$message = $messages["message"];
				}
				$date = date("I:s A",strtotime($messages["date_send"]));
				$output ='
					<li data-id="'.$data["id"].'">
					<image src="'.$data["profile_picture"].'" class="circle">
						<div class="info">
							<span>'.$data["fullname"].'</span>
							<small>'.$who.': '.$message.'<small style="font-size:12px;"> - '.$date.'</small></small>
						</div>
						<div class="status"></div>
					</li>
				';
				
				echo $output;
			}
			if($count == 0){
				echo "empty";
			}
	}
}
if(!function_exists('getMessageToken')){
	function getMessageToken($sender,$reciever,$connect){
		$query = "SELECT message_token FROM messages WHERE sender='$sender' AND reciever='$reciever'  OR sender='$reciever' AND reciever='$sender' ORDER BY date_send DESC LIMIT 1";
		$stmt = $connect->prepare($query);
		$stmt->execute();
		$result = $stmt->fetchall();
		foreach($result as  $row){
			return $row["message_token"];
		}
	}
}
if(!function_exists('getMessageInfo')){
	function getMessageInfo($sender,$reciever,$connect){
		$query = "SELECT sender FROM messages WHERE sender='$sender' AND reciever='$reciever' OR sender='$reciever' AND reciever='$sender' ORDER BY date_send DESC LIMIT 1";
		$stmt = $connect->prepare($query);
		$stmt->execute();
		$result = $stmt->fetchall();
		foreach($result as $row){
			return $row["sender"];
		}
	}
}
if(!function_exists('countMessagesGroup')){
	function countMessagesGroup($sender,$reciever,$token,$connect){
		$query = "SELECT message_token FROM messages WHERE sender='$sender' AND reciever='$reciever' AND message_token='$token' OR sender='$reciever' AND reciever='$sender' AND message_token='$token' ";
		$stmt = $connect->prepare($query);
		$stmt->execute();
		$result = $stmt->rowCount();
		return $result;

	}
}
if(!function_exists('getLastMessage')){
	function getLastMessage($reciever,$connect){
		$sender = $_SESSION["id"];
		$query = "SELECT * FROM messages WHERE sender='$sender' AND reciever='$reciever' OR sender='$reciever' AND  reciever='$sender' ORDER BY date_send DESC LIMIT 1";
		$stmt = $connect->prepare($query);
		$stmt->execute();
		$result = $stmt->fetchall();
		$count = $stmt->rowCount();
		if($count == 0){
			$data = array(
				"message" => "No messages"
			);
			return $data;
		}
		foreach($result as $row){
			if($row["sender"] == $_SESSION["id"]){
				$message = "You: ".$row["message"];
			}else{
				$message = $row["message"];
			}
			$data = array(
				"message" => $message,
				"sender" => $row["sender"],
				"reciever" => $row["reciever"],
				"token" => $row["message_token"],
				"date" => $row["date_send"],
				"index" => $row["message_index"],
				"id"=> $row["message_id"]
			);
			return $data;
		}

	}
}
// Notification

if(!function_exists('insertNewNotification')){
	function insertNewNotification($from_username,$from_id,$to_username,$to_id,$event,$post_id,$comment_id,$reply_id,$with,$connect){
		$query = "INSERT INTO notification(from_username,from_id,to_username,to_id,event,post_id,comment_id,reply_id,with_username)VALUES('$from_username','$from_id','$to_username','$to_id','$event','$post_id','$comment_id','$reply_id','$with')";
		$stmt = $connect->prepare($query);
		$stmt->execute();
	}
}

// Stories

if(!function_exists('insertToStory')){
	function insertToStory($story,$tag,$privacy,$type,$with,$connect){
		$id = $_SESSION["id"];
		$username = $_SESSION["username"];
		$is_expired = "false";
		$code = generateCode(12);
		$date = getdate(date("U"));
		$stories = "../accounts/".$id."/stories";
		$year = $stories."/".$date["year"];
		$month = $year."/".$date["month"];
		$day = $month."/".$date["mday"];
		$time = "story-".date("h-i-s-A").".txt";	
		$entryDate = date('Y-m-d H:i:s');
		$expiration_date = date('Y-m-d H:i:s', strtotime($entryDate . ' +1 day'));


		if(!file_exists($year)){
			mkdir($year);
		}
		if(!file_exists($month)){
			mkdir($month);	
		}
		if(!file_exists($day)){
			mkdir($day);
		}
	
		if(file_exists($year) && file_exists($month) && file_exists($day)){
			$path = "../accounts/".$id."/stories/".$date["year"]."/".$date["month"]."/".$date["mday"]."/".$time;
			$storyPath = $date["year"]."/".$date["month"]."/".$date["mday"]."/".$time;
			$file = fopen($path,"w");
		if(fwrite($file, $story)){
			$query = "INSERT INTO stories(id,username,story,tag,privacy,is_expired,type,with_id,code,file_name,expiration_date)
					  VALUES('$id','$username','$storyPath','$tag','$privacy','$is_expired','$type','$with','$code','$time','$expiration_date')";
			$stmt = $connect->prepare($query);
			$stmt->execute();

			echo "success";
		}else{
			echo "failed";
		}
			fclose($file);
			
		}

	}
}
if(!function_exists('fetchAllUsersInStories')){
	function fetchAllUsersInStories($connect){
		$query = "SELECT * FROM stories WHERE is_expired ='false' ";
		$stmt = $connect->prepare($query);
		$stmt->execute();
		$result = $stmt->fetchall();
		$all = array();
		foreach($result as $row){
			$id = $row["id"];
			if(!in_array($id,$all)){
				array_push($all,$id);
			}
		}
		return $all;
	}
}

if(!function_exists('checkIfUserHasStory')){
	function checkIfUserHasStory($id,$connect){
		$query = "SELECT * FROM stories WHERE is_expired='false' AND id='$id' ";
		$stmt = $connect->prepare($query);
		$stmt->execute();
		$count = $stmt->rowCount();
		if($count != 0){
			return true;
		}else{
			return false;
		}
	}
}
if(!function_exists('fetchallUserHasStories')){
	function fetchallUserHasStories($type,$connect){
		$session = $_SESSION["id"];
		$query = "SELECT * FROM stories WHERE is_expired ='false' ORDER BY story_inserted LIMIT 5";
		$stmt = $connect->prepare($query);
		$stmt->execute();
		$result = $stmt->fetchall();
		$allUsers = array();
		$userStoryData = array();
		foreach($result as $row){
			$id = $row["id"];
			if(!in_array($row["id"],$allUsers)){
				array_push($allUsers,$row["id"]);
					$userStoryData[$row["id"]] = array(
					"code" => $row["code"],
					"privacy" => $row["privacy"],
					"story" => $row["story"],
					"file_name" => $row["file_name"],
					"id" => $row["id"],
					"story_inserted" => $row["story_inserted"],
					"is_expired" => $row["is_expired"],
					"availableStory" => countToDatabaseRow("stories"," id='$id' AND is_expired='false' ",$connect),
					"storyIndex" => $row["storyIndex"],
					"next" => getNextOfStory($id,$row["code"],$row["storyIndex"],$connect),
					"nextOfNext"=> getNextOfNextOfStory($id,$row["code"],$row["storyIndex"],$connect),
					"prev" => getPrevOfStory($id,$row["code"],$row["storyIndex"],$connect),
					"time_ago" => time_elapsed_string($row["story_inserted"])
					);
				if($type != "story"){
					$path = "accounts/$id/stories/".$row["story"];
				$userStoryData[$row["id"]]["src"] = file_get_contents($path);
				}
				
			}
		}
		$output ='';
		$i = 0;
		foreach($allUsers as $user){
			$i++;
			$data = get_user_information($user,$connect);
			$storyData = $userStoryData[$user];
			$time_ago = time_elapsed_string($storyData["story_inserted"]);
			if($type == "story"){
					
					$output .= '
					<li class="user-story-list"  data-id="'.$storyData["id"].'">
							<img src="'.$data["profile_picture"].'"  class="circle">
						<div class="info"><p>'.$data["fullname"].'</p><small>'.$storyData["time_ago"].'</small></div>
					</li>
					';
				
				
			}else{

					$output .='
					<div class="item" data-id="'.$storyData["id"].'" data-code="'.$storyData["code"].'" data-index="'.$storyData["storyIndex"].'">
						<div class="story">
							<img src="'.$storyData["src"].'">
						</div>
						<div class="picture">
							<img src="'.$data["profile_picture"].'" class="content">
						</div>
						<div class="name">
							<span>'.$data["fullname"].'</span>
						</div>
					</div>
				';
				
			}
		}
		if($type != "story"){
				$to_add = 4 - $i;
				for($j = 0; $j < $to_add; $j++){
				$output .='
					<div class="item">
						<div class="story">
								
						</div>
					</div>
				';
			}
		}

		echo $output;
		
	}
}
if(!function_exists('getAllStoryInformation')){
	function getAllStoryInformation($id,$connect){
		$query = "SELECT * FROM stories WHERE id='$id' AND is_expired ='false' ";
		$stmt = $connect->prepare($query);
		$stmt->execute();
		$result = $stmt->fetchall();
		$data = array(
			"CountAvailableStories" => countToDatabaseRow("stories"," id='$id' AND is_expired='false' ",$connect),
			"storiesList" => $result
		);
			return $data;
	}
}
if(!function_exists('countToDatabaseRow')){
	function countToDatabaseRow($tablename,$condition,$connect){
		$query = "SELECT * FROM ".$tablename." WHERE ".$condition;
		$stmt = $connect->prepare($query);
		$stmt->execute();
		$count = $stmt->rowCount();
		return $count;
	}
}

if(!function_exists('getdataToDatabaseTable')){
	function getdataToDatabaseTable($tablename,$condition,$to_get,$connect){
		$query = "SELECT * FROM ".$tablename." WHERE ".$condition;
		$stmt = $connect->prepare($query);
		$stmt->execute();
		$result = $stmt->fetchall();
		foreach($result as $row){
			return $row[$to_get];
		}
	}
}
if(!function_exists('getStoryInformation')){
	function getStoryInformation($id,$username,$code,$connect){
		if($code == ""){
			$code = getdataToDatabaseTable("stories","id='$id'","code",$connect);
		}
		$query = "SELECT * FROM stories WHERE id='$id' AND code='$code' ";
		$stmt = $connect->prepare($query);
		$stmt->execute();
		$result = $stmt->fetchall();
		foreach($result as $row){
			$data = array(
				"code" => $row["code"],
				"privacy" => $row["privacy"],
				"story" => $row["story"],
				"file_name" => $row["file_name"],
				"id" => $row["id"],
				"story_inserted" => $row["story_inserted"],
				"is_expired" => $row["is_expired"],
				"availableStory" => countToDatabaseRow("stories"," id='$id' AND is_expired='false' ",$connect),
				"storyIndex" => $row["storyIndex"],
				"next" => getNextOfStory($id,$row["code"],$row["storyIndex"],$connect),
				"nextOfNext"=> getNextOfNextOfStory($id,$row["code"],$row["storyIndex"],$connect),
				"prev" => getPrevOfStory($id,$row["code"],$row["storyIndex"],$connect)
			);
			$path = "../accounts/$id/stories/".$row["story"];
			$data["src"] = file_get_contents($path);
			return $data;
		}
	}
}
if(!function_exists('getNextOfNextOfStory')){
	function getNextOfNextOfStory($id,$code,$index,$connect){
		$countUserStory = countUserStory($id,$connect);
		$index = $index + 2;
		$query = "SELECT * FROM stories WHERE id='$id' AND storyIndex='$index' AND is_expired='false' ";
		$stmt = $connect->prepare($query);
		$stmt->execute();
		$result = $stmt->fetchall();
		foreach($result as $row){
			return $row["code"];
		}
	}
}
if(!function_exists('getNextOfStory')){
	function getNextOfStory($id,$code,$index,$connect){
		$countUserStory = countUserStory($id,$connect);
		$index = $index + 1;
		$query = "SELECT * FROM stories WHERE id='$id' AND storyIndex='$index' AND is_expired='false' ";
		$stmt = $connect->prepare($query);
		$stmt->execute();
		$result = $stmt->fetchall();
		foreach($result as $row){
			return $row["code"];
		}
	}
}
if(!function_exists('getPrevOfStory')){
	function getPrevOfStory($id,$code,$index,$connect){
		$countUserStory = countUserStory($id,$connect);
		$index = $index - 1;
		$query = "SELECT * FROM stories WHERE id='$id' AND storyIndex='$index' AND is_expired='false'  ";
		$stmt = $connect->prepare($query);
		$stmt->execute();
		$result = $stmt->fetchall();
		foreach($result as $row){
			return $row["code"];
		}
	}
}
if(!function_exists('countUserStory')){
	function countUserStory($id,$connect){
		$query = "SELECT * FROM stories WHERE id='$id' AND is_expired='false' ";
		$stmt = $connect->prepare($query);
		$stmt->execute();
		$count = $stmt->rowCount();
		return $count;
	}
}
if(!function_exists('getStoryContent')){
	function getStoryContent($id,$username,$code,$connect){
		$query = "SELECT * FROM stories WHERE id='$id' AND code='$code' ";
		$stmt = $connect->prepare($query);
		$stmt->execute();
		$result = $stmt->fetchall();
		
		foreach($result as $row){
			$storyData = getStoryInformation($id,$username,$code,$connect);
			$countUserStory = countUserStory($id,$connect);
			$data = get_user_information($id,$connect);
			$allInfo = getAllStoryInformation($id,$connect);
			$time_ago = time_elapsed_string($row["story_inserted"]);
			$index = $row["storyIndex"];
			$i = 0;
   			$output = '
			<div class="top">
				<div class="story-count">';
				foreach($allInfo["storiesList"] as $stories){
					$i++;
					if($index > $i){
						$output .='
							<div class="items">
								<div class="timer-value done story-timer-'.$i.'" data-code="'.$stories["code"].'" ></div>
							</div>
							';
					}else{
						$output .='
							<div class="items">
								<div class="timer-value story-timer-'.$i.'" data-code="'.$stories["code"].'" ></div>
							</div>
					';
					}
					
				}
					
				
			
			$output .='
				</div>
				<div class="info">
					<img src="'.$data["profile_picture"].'" class="circle">
					<p>'.$data["fullname"].'</p>
					<small>'.$time_ago.'</small>
					<div class="icon playandpause" data-label="pause">
						'.mysvg("pause-24px").'
					</div>
					<div class="icon">
						'.mysvg("volume_up").'
					</div>
					<div class="icon">
						'.mysvg("more1").'
					</div>
				</div>
			</div>

			<img src="'.$storyData["src"].'" class="story-src">
		';		
		}

		echo $output;

	}
}
if(!function_exists('isUserHasStory')){
	function isUserHasStory($id,$connect){
		$query = "SELECT * FROM stories WHERE id='$id' AND is_expired ='false' ";
		$stmt = $connect->prepare($query);
		$stmt->execute();
		$count = $stmt->rowCount();
		if($count == 0){
			return "no";
		}else{
			return "yes";
		}
	}
}
if(!function_exists('setStoryIndex')){
	function setStoryIndex($connect){
		$query =  "SELECT *  FROM user ";
		$stmt = $connect->prepare($query);
		$stmt->execute();
		$result = $stmt->fetchall();
		
		foreach($result as $row){
		
			$isUserHasStory = isUserHasStory($row["id"],$connect);

			if($isUserHasStory == "yes"){

				$query = "SELECT * FROM stories WHERE id='".$row["id"]."' AND is_expired ='false' ";
				$stmt = $connect->prepare($query);
				$stmt->execute();
				$stories = $stmt->fetchall();
				$i = 0;
				foreach($stories as $story){
					$i++;
					$query = "UPDATE stories SET storyIndex ='$i' WHERE story_id='".$story["story_id"]."' AND code='".$story["code"]."' ";
					$stmt = $connect->prepare($query);
					$stmt->execute();

				}
			}
		}
	}
}
setStoryIndex($connect);
//EMOJIS

if(!function_exists('insertEmoji')){
	function insertEmoji($emoji,$color){
		$svg = "";
		switch ($emoji) {
			case 'Like':
				$svg = '
					<svg fill="'.$color.'" class="sqpo3gyd" height="35px" width="35px" preserveAspectRatio="xMinYMax meet" version="1.1" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg"><g><path d="M16,9.1c0-0.8-0.3-1.1-0.6-1.3c0.2-0.3,0.3-0.7,0.3-1.2c0-1-0.8-1.7-2.1-1.7h-3.1c0.1-0.5,0.2-1.3,0.2-1.8 c0-1.1-0.3-2.4-1.2-3C9.3,0.1,9,0,8.7,0C8.1,0,7.7,0.2,7.6,0.4C7.5,0.5,7.5,0.6,7.5,0.7L7.6,3c0,0.2,0,0.4-0.1,0.5L5.7,6.6 c0,0-0.1,0.1-0.1,0.1l0,0l0,0L5.3,6.8C5.1,7,5,7.2,5,7.4v6.1c0,0.2,0.1,0.4,0.2,0.5c0.1,0.1,1,1,2,1h5.2c0.9,0,1.4-0.3,1.8-0.9 c0.3-0.5,0.2-1,0.1-1.4c0.5-0.2,0.9-0.5,1.1-1.2c0.1-0.4,0-0.8-0.2-1C15.6,10.3,16,9.9,16,9.1z"></path><path d="M3.3,6H0.7C0.3,6,0,6.3,0,6.7v8.5C0,15.7,0.3,16,0.7,16h2.5C3.7,16,4,15.7,4,15.3V6.7C4,6.3,3.7,6,3.3,6z"></path></g></svg>
				'; 
				break;
			
			default:
				# code...
				break;
	
		}
		return $svg;
		
	}
} 
// Settings

if(!function_exists('getSettingsTab')){
	function getSettingsTab($tab,$ref,$connect){
		if($tab == 'undefined' || $tab == ""){
			$tab = "account";
		}
		$output = '';
		$data = get_user_information($_SESSION["id"],$connect);
		switch($tab){
			case 'account':
				$output .='
				<div class="settings-con">
				 			<div class="header">
				 				<h2>General Account Settings</h2>
				 			</div>
				 			<div class="main-container">
				 				<div class="container">

				 					<div class="section2 full">
				 						<li>
											<a href="settings?tab=account&section=name" class="settings-tab-section">
												<div>
													<h4>Name</h4>
													<p class="bold">'.$data["fullname"].'</p>
												</div>
											</a>
										</li>
										<li>
											<a href="settings?tab=account&section=username" class="settings-tab-section">
												<div>
													<h4>Username</h4>
													<p>'.$data["username"].'</p>
												</div>
											</a>
										</li>
										<li>
											<a href="settings?tab=account&section=Contact" class="settings-tab-section">
												<div>
													<h4>Contact</h4>
													<p>Contact</p>
												</div>
											</a>
										</li>
										<li>
											<a href="settings?tab=account&section=advertising_email" class="settings-tab-section">
												<div>
													<h4>Ad account contact</h4>
													<p>'.$data["email"].'</p>
												</div>
											</a>
										</li>
										<li>
											<a href="settings?tab=account&section=account_management" class="settings-tab-section">
												<div>
													<h4>Memorialization Settings</h4>
													<p>Decide what happens to your account after you pass away.</p>
												</div>
											</a>
										</li>
										<li>
											<a href="settings?tab=account&section=identity_confirmation" class="settings-tab-section">
												<div>
													<h4>Identity Confirmation</h4>
													<p>Confirm your identity to do things like run ads about social issues, elections or politics.</p>
												</div>
											</a>
										</li>
				 						
				 					</div>
				 				</div>
				 			</div>
				 		</div>

				';
			break;

			case 'security':
				$output .='
						<div class="settings-con">
				 			<div class="header">
				 				<h2>Security and Login</h2>
				 			</div>
				 			<div class="main-container">
				 				<div class="container">
				 					
				 				</div>
				 			</div>
				 		</div>

				';
			break;

			case 'your_facebook_information':
				$output .='

				';
			break;

			case 'privacy':
				$output .= '
				<div class="settings-con">
				 			<div class="header">
				 				<h2>Privacy Settings and Tools</h2>
				 			</div>
				 			<div class="main-container">
				 				<div class="container">
				 					<div class="section1"><p>Privacy Shortcuts</p></div>
				 					<div class="section2">
				 						<li>
				 							<a href="settings?tab=account&section=" class="settings-tab-section">
				 								<div>
				 									<p>Check a few important settings</p>
				 									<small>Quickly review some important settings to make sure you are sharing with the people you want.</small>
				 								</div>
				 							</a>
				 						</li>
				 						
				 						<li>
				 							<a href="settings?tab=account&section=" class="settings-tab-section">
				 								<div>
				 									<p>Manage Your Profile</p>
				 									<small>Go to your profile to change your profile info privacy, like who can see 	your birthday or relationships.</small>
				 								</div>
				 							</a>
				 						</li>
				 						
				 						<li>
				 							<a href="settings?tab=account&section=" class="settings-tab-section">
				 								<div>
				 									<p>Learn more with Privacy Basics</p>
				 									<small>Get answers to common questions with this interactive guide.</small>
				 								</div>
				 							</a>
				 						</li>
				 					</div>
				 				</div>
				 				<div class="container">
				 					<div class="section1"><p>Your Activity</p></div>
				 					<div class="section2">
				 						<li>
				 							<a href="settings?tab=account&section=" class="settings-tab-section">
				 								<div>
				 									<p>Who can see this posts?</p>
				 								</div>
				 							</a>
				 						</li>
				 						
				 						<li>
				 							<a href="settings?tab=account&section=" class="settings-tab-section">
				 								<div>
				 									<p>Review all your posts and things you are tagged in</p>
				 								</div>
				 							</a>
				 						</li>
				 						
				 						<li>
				 							<a href="settings?tab=account&section=" class="settings-tab-section">
				 								<div>
				 								<p>Limit the audience for posts you have shared with friends of friends or Public.</p>
				 								</div>
				 							</a>	
				 						</li>
				 					</div>
				 				</div>
				 				<div class="container">
				 					<div class="section1"><p>How People Find and Contact You</p></div>
				 					<div class="section2">
				 						<li>
				 							<a href="settings?tab=account&section=" class="settings-tab-section">
					 							<div>
					 								<p>Who can send you friend requests?</p>
					 							</div>
					 						</a>
				 						</li>
				 						
				 						<li>
				 							<a href="settings?tab=account&section=" class="settings-tab-section">
					 							<div>
					 								<p>Who can see your friends list?</p>
					 							</div>
				 							</a>
				 						</li>
				 						
				 						<li>
				 							<a href="settings?tab=account&section=" class="settings-tab-section">
				 								<div>
				 									<p>Who can look up using the email address you provided?</p>
				 								</div>
				 							</a>
				 						</li>
				 					</div>
				 				</div>
				 			</div>
				 		</div>

				';
				break;
				case 'timeline':
					$output .='

					';
				break;
				case 'stories':
					$output .= '
				<div class="settings-con">
				 			<div class="header">
				 				<h2>Stories Settings</h2>
				 			</div>
				 			<div class="main-container">
				 				<div class="container">
				 					<div class="section1"><p>Sharing Options</p></div>
				 					<div class="section2">
				 						<li>
				 							<a href="settings?tab=account&section=" class="settings-tab-section">
				 								<div>
				 									<p>Allow others to share your public stories to their own story?</p>
				 								</div>
				 							</a>
				 						</li>
				 						
				 						<li>
				 							<a href="settings?tab=account&section=" class="settings-tab-section">
				 								<div>
				 									<p>Allow people to share your stories if you mention them?</p>
				 								</div>
				 							</a>
				 						</li>
				 						
				 					</div>
				 				</div>
				 				
				 			</div>
				 		</div>

				';
				break;
				case 'location':
				$output .='
						<div class="settings-con">
				 			<div class="header">
				 				<h2>Stories Settings</h2>
				 			</div>
				 			<div class="main-container">
				 				<div class="container">
				 					<div class="section2 full">
				 						<li>
				 							<a href="settings?tab=account&section=" class="settings-tab-section">
				 								<div>
				 									<h4>Location History</h4>
				 									<p>Turn on Location History for your mobile Devices?</p>
				 								</div>
				 							</a>
				 						</li>
				 						
				 					</div>
				 				</div>
				 				
				 			</div>
				 		</div>

				';
				break;
				case 'blocking':
					$output .='

					';
				break;
				case 'language':
					$output .='

					';
				break;
				case 'facerecog':
					$output .='

					';
				break;
				case 'notification':
					$output .='

					';
				break;
				case 'mobile':
					$output .='

					';
				break;
				case 'followers':
					$output .='

					';
				break;
				case 'timeline':
					$output .='

					';
				break;

		}
		echo $output;
	}
}

// Dir
if(!function_exists("makeDirectoryForAllUser")){
	function makeDirectoryForAllUser($connect){
		$query = "SELECT * FROM user ";
		$stmt = $connect->prepare($query);
		$stmt->execute();
		$result = $stmt->fetchall();
		foreach($result as $row){
			$user = "accounts/".$row['id'] ;
			// $pictures = $user."/pictures/";
			// $messages  = $user."/messages/";
			// $posts  = $user."/posts/";
			// $videos = $user."/videos/";
			// $music = $user."/music/";
			$stories = $user."/stories/";
			$info = $user."/information/";

			if(!file_exists($user)){
				mkdir($user);
			}
			// if(!file_exists($pictures)){
			// 	mkdir($pictures);
			// }
			// if(!file_exists($videos)){
			// 	mkdir($videos);
			// }
			// if(!file_exists($messages)){
			// 	mkdir($messages);
			// }
			// if(!file_exists($posts)){
			// 	mkdir($posts);
			// // }
			// // if(!file_exists($music)){
			// // 	mkdir($music);
			// / }
			if(!file_exists($stories)){
				mkdir($stories);
			}
			if(!file_exists($info)){
				mkdir($info);
			}



			// Write Information

		}
		
	}
}


if(!function_exists('setUserInformation')){
	function setUserInformation($connect){
		$data = get_user_information($_SESSION["id"],$connect);
		$path = "accounts/".$data["id"]."/information/me.json";
		$file = fopen($path,"w");
		fwrite($file, json_encode($data));
		fclose($file);
	}
}
// Emojis
if(!function_exists('get_png_emoji')){
	function get_png_emoji($Addpath){
		$path = "lib/myemoji/png/labeled/64/".$Addpath."/";
		$images = glob($path."*.png");
		foreach($images as $image) {
			$n = basename($image);
			$name = str_replace(['.png','-'], ' ', $n);
		    echo '<img src="'.$image.'" title="'.$name.'" />';
		}
	}
}
if(!function_exists('get_emoji')){
	function get_emoji($type,$name,$class){
		$path = "lib/myemoji/png/labeled/64/".$type."/";
		$image = $path.$name.".png";
		echo '<img src="'.$image.'" title="Music" class="'.$class.'"/>';
	}
}
if(!function_exists('get_random_emoji')){
	function get_random_emoji($name){
		$path = "lib/myemoji/png/labeled/64/people/";
		$image = $path.$name.".png";
		$images = glob($path."*.png");
		$num  = count($images);
		$i = rand(0,$num);
		echo '<img src="'.$images[$i].'" title="Emoji" class=""/>';
		
	}
}
// Backgrounds

if(!function_exists("getLinearGradientCombination")){
	function getLinearGradientCombination(){
		$data = array(
			["#6dd5ed","#FBD786","#f7797d"],
			["#0F2027","#203A43","#f7797d"],
			["#12c2e9","#c471ed","#f7797d"],
			["#7F7FD5","#86A8E7","#91EAE4"],
			["#2980B9","#6DD5FA","#FFFFFF"],
			["#aa4b6b","#6b6b83","#3b8d99"],
			["#b92b27","#1565C0"],
			["#373B44","#4286f4"],
			["#FF0099","#493240"],
			["#1f4037","#99f2c8"],
			["#f953c6","#b91d73"],
			["#c31432","#240b36"],
			["#f12711","#f5af19"],
			["#659999","#f4791f"],
			["#dd3e54","#6be585"],
			["#8360c3","#2ebf91"],
			["#544a7d","#ffd452"],
			["#009FFF","#ec2F4B"],
			["#654ea3","#eaafc8"],
			["#FF416C","#FF4B2B"],
			["#ED213A","#93291E"]
		);

		return $data;
	}
} 

// SVGS

if(!function_exists('svg')){
	function svg($name){
		$path = "fbSVG/".$name.".svg";
		$svg = file_get_contents($path);
		if($svg == "undefined"){
			$svg = "";
		}
		echo $svg;

	}
}
if(!function_exists('insvg')){
	function insvg($name){
		$path = "svg/".$name.".svg";
		$svg = file_get_contents($path);
		if($svg == "undefined"){
			$svg = "";
		}
		return $svg;
	}
}
if(!function_exists('mysvg')){
	function mysvg($name){
		$path = "../svg/".$name.".svg";
		$svg = file_get_contents($path);
		if($svg == "undefined"){
			$svg = "";
		}
		return $svg;
	}
}
if(!function_exists('fbsvg')){
	function fbsvg($name){
		$path = "../fbSVG/".$name.".svg";
		$svg = file_get_contents($path);
		if($svg == "undefined"){
			$svg = "";
		}
		return $svg;
	}
}
if(!function_exists('generateCode')){
	function generateCode($length){
		$seed = str_split('abcdefghijklmnopqrstuvwxyz'
                 .'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
                 .'0123456789!@#%^&*()'); 
		shuffle($seed);
$rand = '';
foreach (array_rand($seed, $length) as $k) $rand .= $seed[$k];

return $rand;
	}
}
if(!function_exists('generateUUID')){
	function generateUUID($length){
		$uuid = "";
		for($i = 0; $i < $length; $i++){
			if($i == $length - 1){
				$uuid .= uniqid();
			}else{
				$uuid .= uniqid()."-";
			}
			
		}
		return $uuid;
	}
}
if(!function_exists('getDate')){
	function getDate(){
		date_default_timezone_set('Asia/Manila');
		$date = date("Y, F d l g:i A");
		return $date;
		// Here you can get the date based on his/her Location 
	}
}
if(!function_exists('one_day_expired')){
	function one_day_expired($timestamp){
	$today = strtotime(date('Y-m-d H:i:s'));
	$expiration_date = strtotime($timestamp);
	if($expiration_date < $today){
			return "expired";
		}else{
			return false;
		}
	}
}

if(!function_exists('timeRemaining')){
	function timeRemaining($timestamp){
		$date = strtotime($timestamp);
	 $rem = $date - time();
	$day = floor($rem / 86400);
	$hr  = floor(($rem % 86400) / 3600);
	$min = floor(($rem % 3600) / 60);
	$sec = ($rem % 60);

	if($day < 0){
		$day = 0;
	}
	if($min < 0){
		$min = 0;
	}
	if($hr < 0){
		$hr = 0;
	}
	if($sec < 0){
		$sec = 0;
	}
	$data = array(
		"day"=> $day,
		"hours"=> $hr,
		"minutes" => $min,
		"seconds"=> $sec
	);
	return $data;
	}
}

if(!function_exists('updateStoryOneDayExpired')){
	function updateStoryOneDayExpired($connect){
		$query = "SELECT * FROM stories ";
		$stmt = $connect->prepare($query);
		$stmt->execute();
		$result = $stmt->fetchall();
		foreach($result as $row){
			$is_expired = one_day_expired($row["expiration_date"]);
			$story = $row["story_id"];	
			$remaining = timeRemaining($row["expiration_date"]);
			$hour = $remaining["hours"];
			$min = $remaining["minutes"];
			if($is_expired == "expired"){
				$query = "UPDATE stories SET is_expired ='true' WHERE story_id='$story' AND is_expired='false' ";
				$stmt = $connect->prepare($query);
				$stmt->execute();
			}else{
				$query = "UPDATE stories SET is_expired ='false',hours='$hour',minutes='$min'  WHERE story_id='$story' ";
				$stmt = $connect->prepare($query);
				$stmt->execute();
			}


			if($row["expiration_date"] == ""){

				$expiration_date = date('Y-m-d H:i:s', strtotime($row["story_inserted"] . ' +1 day'));
				$query = "UPDATE stories SET expiration_date ='$expiration_date' WHERE story_id='$story' ";
				$stmt = $connect->prepare($query);
				$stmt->execute();
			}
		}
	}
}
updateStoryOneDayExpired($connect);
if(!function_exists('time_elapsed_string')){
	function time_elapsed_string($timestamp){
date_default_timezone_set('Asia/Manila');  
      $time_ago = strtotime($timestamp);  
      $current_time = time();  
      $time_difference = $current_time - $time_ago;  
      $seconds = $time_difference;  
      $minutes      = round($seconds / 60 );          
      $hours= round($seconds / 3600);           
      $days =round($seconds / 86400);           
      $weeks= round($seconds / 604800);        
      $months= round($seconds / 2629440);     
      $years  = round($seconds / 31553280);     
      if($seconds <= 60)  
      {  
     return "Just Now";  
   }  
      else if($minutes <=60)  
      {  
     if($minutes==1)  
           {  
       return "1min";  
     }  
     else  
           {  
       return "$minutes min";  
     }  
   }  
      else if($hours <=24)  
      {  
     if($hours==1)  
           {  
       return "1hr";  
     }  
           else  
           {  
       return "$hours hrs";  
     }  
   }  
      else if($days <= 7)  
      {  
     if($days==1)  
           {  
       return "Yesterday";  
     }  
           else  
           {  
       return "$days days";  
     }  
   }  
      else if($weeks <= 4.3) //4.3 == 52/12  
      {  
     if($weeks==1)  
           {  
       return "1 week";  
     }  
           else  
           {  
       return "$weeks weeks";  
     }  
   }  
       else if($months <=12)  
      {  
     if($months==1)  
           {  
       return "1 month";  
     }  
           else  
           {  
       return "$months months";  
     }  
   }  
      else  
      {  
     if($years==1)  
           {  
       return "1 year";  
     }  
           else  
           {  
       return "$years years";  
     }  
   }  
}
}

if(isset($_SESSION["id"])){
	makeDirectoryForAllUser($connect);
}


?>