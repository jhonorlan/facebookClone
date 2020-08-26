<?php
$dbname = "facebook-clone-database";
$dbusername ="root";
$dbpassword = "";
$connect = new PDO("mysql:host=localhost;dbname=".$dbname,$dbusername,$dbpassword);


if(!function_exists('fetchNewUserList')){
	function fetchNewUserList($connect){
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

if(!function_exists('registerNewUser')){
	function registerNewUser($firstname,$middlename,$lastname,$email,$password,$month,$day,$year,$birthday,$connect){
		$fullname = $firstname." ".$lastname;
		$password = md5($password);
		$query ="INSERT INTO user(firstname,middlename,lastname,fullname,email,month,day,year,birthday,password)VALUES('$firstname','$middlename','$lastname','$fullname','$email','$month','$day','$year','$birthday','$password')";
		$stmt = $connect->prepare($query);
		$stmt->execute();

		echo "success";
	}
}
if(!function_exists('get_user_information')){
	function get_user_information($user,$connect){
		$query = "SELECT * FROM user WHERE username = '$user' OR id='$user' ";
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
				"birthday" => $row["birthday"]
 			);
			return $data;
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
if(!function_exists('countAllUser')){
	function countAllUser($connect){
		$query = "SELECT * FROM user";
		$stmt= $connect->prepare($query);
		$stmt->execute();
		$result = $stmt->rowCount();

		return $result;
	}
}
?>