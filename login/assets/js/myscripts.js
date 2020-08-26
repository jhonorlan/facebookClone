$(document).ready(function(){
	let newDesign = true;

	$(document).on("blur","input",function(){
		if($(this).val().length == 0){
			error($(this),"empty",true);
		}else{
			error($(this),"empty",false);
		}

		$(this).parent().find("div").css("visibility","hidden");
	});
	$(document).on("focus","input",function(){
	
		if($(this).val().length == 0){
			$(this).parent().find("div").css("visibility","visible");
		}else{
				$(this).parent().find("div").css("visibility","hidden");
		}
	});

	$(document).on("click",".gender-picker",function(){
		$(".gender-picker").not($(this)).prop("checked",false);
	});
	$(document).on("click",".g",function(){
		$(this).find("input").prop("checked",true);
		$(".gender-picker").not($(this).find("input")).prop("checked",false);
	});
	$(document).on("submit",".registration-form",function(evt){
		evt.preventDefault();
		let data = $(this).serialize();

		registerUser(data);
	});
	$(document).on("submit",".login-form",function(evt){

		let data = $(this).serialize();

		loginuser(data);
	});

	function error(elem,condition,bool){
		if(condition == "empty" && bool == true){
			elem.addClass("error");
			elem.parent().find("svg").css("display","block");
		}else{
			elem.removeClass("error");
			elem.parent().find("svg").css("display","none");
		}
	}
	function changeDesign(){
		if(newDesign == true){
			$(".old-des").css("display","none");
			$(".new-des").css("display","block");
		}else{
			$(".old-des").css("display","block");
			$(".new-des").css("display","none");
		}
	}
	changeDesign();

	function registerUser(data){
		$.ajax({
			url: 'data/register.php',
			type: 'POST',
			data: data,
		})
		.done(function(data) {
			if(data == "success"){
			
			}else{
				alert(data);
			}
				
		})
		.fail(function() {
			console.log("error");
		});
	}
	function loginuser(data){
		$.ajax({
			url: 'data/login.php',
			type: 'POST',
			data: data,
		})
		.done(function(data) {
			if(data == "success"){
				window.open("../index.php","_self");
			}else{
				
			}
		})
		.fail(function() {
			console.log("error");
		});
		
	}
});