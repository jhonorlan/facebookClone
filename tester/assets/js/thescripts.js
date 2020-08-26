	let start = false;
	let currentUser = null;
	let leters = ["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z"];
	let type = null;
	let allArrayUsers = [];
	

	$(document).on("click",".copyArray",function(){
		for(let i = 0; i < allArrayUsers.length; i++){
			console.log(allArrayUsers[i]);
		}
	});
	$(document).on("click",".create",function(){
		if(type != null){
			generateUser("create");
			
		}
	
	});
	$(document).on("click",".insert",function(){
		if(type != null){
			if(type == "database"){
				insertToDatabase(currentUser);
			}else{
				insertToArray(currentUser);
				insertToCode();
			}
		}
	});
	$(document).on("click",".generate_insert",function(){
		if(type != null){
			generateUser("generate_insert");
		}
	});
	$(document).on("click",".start",function(){
		start = true;
		init(start)
		type = $(this).data("type");
		fetchUserList();
	});

	$(document).on("click","li .header",function(){
		$(this).parent().find("div").each(function(){
			if($(this).hasClass('info')){
				$(this).toggle();
			}
		});
	});

	function generateUser(condition){
		$.ajax({
			url:"json/name.json",
			type:"POST",
			success:function(data){
				let firstname = data["firstname"];
				let middlename = data["lastname"];
				let lastname = data["lastname"];
				let bday = null;
				let email = null;
				let fullname =null;
				let profile_picture = null;
				
				firstname = firstname[Math.round(Math.random() * firstname.length)];
				middlename = middlename[Math.round(Math.random() * middlename.length)];
				lastname = lastname[Math.round(Math.random() * lastname.length)];
				fullname = firstname+" "+middlename+" "+lastname;
				email = firstname+lastname.toLowerCase()+"@gmail.com";
				bday = generateBirthday();

				let sub = firstname.substring(0,1);
				 profile_picture = "../image/temporary_pictures/jpg/"+sub+".jpg";

				data = {
					fullname,firstname,middlename,lastname,bday,email,profile_picture
				};
				assignToForm(data);

				if(condition == "create"){
					currentUser = data;
				}else if(condition == "generate_insert"){
					if(type == "database"){
						insertToDatabase(data);
					}else{
						insertToArray(data);
					}
					
				}
			}
		});
	}
	function insertToArray(user){
		let output = ` 
			<li>
				<div class="header">
					<img src="`+ user.profile_picture +`" class="circle"/>
					<div class="box"><a href="#">`+ user.fullname +`</a></div>
				</div>
				<div class="info">
					<div class="item">
						<p>Firstname: </p><span>`+ user.firstname +`</span>
					</div>
					<div class="item">
						<p>Middlename: </p><span>` + user.middlename + `</span>
					</div>
					<div class="item">
						<p>Lastname: </p><span>`+ user.lastname +`</span>
					</div>
					<div class="item">
						<p>Email: </p><span>` + user.email+ `</span>
					</div>
					<div class="item">
						<p>Birthday: </p><span>`+ user.bday.birthday +`</span>
					</div>
				
				</div>
			</li>
		`;
		$(".all-user-list-array").append(output);
		allArrayUsers.push(user);
		insertToCode();
	}
	function assignToForm(user){
		$(".fullname").html(user.fullname);
		$(".firstname").html(user.firstname);
		$(".middlename").html(user.middlename);
		$(".lastname").html(user.lastname);
		$(".email").html(user.email);
		$(".month").html(user.bday.month);
		$(".day").html(user.bday.day);
		$(".year").html(user.bday.year);
		$(".bday").html(user.bday.birthday);
		$(".profile_picture").attr("src",user.profile_picture);

	}	
	function generateBirthday(){
		let birthday = null;
		let month = [
		"January", 
		"February", 
		"March", 
		"April", 
		"May", 
		"June", 
		"July", 
		"August", 
		"September", 
		"October", 
		"November", 
		"December"
		];

		let day = [];
		let year = [];
		for(let i = 1; i < 32; i++){
			day.push(i);
		}
		for(let i = 1980; i < 2019;i++){
			year.push(i);
		}
		let has31Days = ["January","March","May","July","August","October","December"];

		month = month[Math.round(Math.random() * month.length)];	

		if(jQuery.inArray(month, has31Days) !== -1){
			day.remove(31);
			
		}
		day = day[Math.round(Math.random() * day.length)];
		year = year[Math.round(Math.random() * year.length)];

		
		birthday = month+" "+day+" "+year;

		return {month,day,year,birthday};
	}

		Array.prototype.remove = function() {
	    var what, a = arguments, L = a.length, ax;
	    while (L && this.length) {
	        what = a[--L];
	        while ((ax = this.indexOf(what)) !== -1) {
	            this.splice(ax, 1);
	        }
	    }
	    return this;
	};

	function insertToDatabase(user){
		$.ajax({
			url:"data/InsertNewUser.php",
			type:"POST",
			data:user,
			success:function(data){
				fetchUserList();
			
			}
		});
	}

	function insertToCode(){
			$.ajax({
				url:"data/convert.php",
				type:"POST",
				data:{code:allArrayUsers},
				success:function(code){
					$(".area-code #body").html(code);
				}
			});
	}

	function fetchUserList(){
		if(type == "database" ){
			$.ajax({
				url:"data/fetchUserList.php",
				type:"POST",
				success:function(list){
					$.ajax({
						url:"data/countAllUser.php",
						type:"POST",
						success:function(count){
							$(".user-lists #header h3").html(count);
						}
					});
					$(".all-user-list-database").html(list);
				}
			});
		
		}else if(type == "array"){
			$(".insert").html("Insert to List");
		}

	}
	function init(start){
		if(start == false){
			$(".start-creating").css("display","none");
			$(".pause-generating").css("display","block");
		}else{
			$(".start-creating").css("display","block");
			$(".pause-generating").css("display","none");
			generateUser("create");
	
		}
	}
	fetchUserList();
	init(start);