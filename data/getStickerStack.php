<?php 
include '../database.php';
$path = "../image/stickers/";
$allSticker = glob($path."*.{jpg,png,gif}", GLOB_BRACE);

echo json_encode($allSticker);
?>

<script type="text/javascript">
	function createNewStickerSelector(){
	let selector = `
	<div class="story-content-body">
		<div class="story-sticker-container">

		</div>
	</div>
	`;
}
function mainit(){
	let limit = 6;

	$.getJSON('data/getStickerStack.php', function(json, textStatus) {
		for(let i = 0; i < json.length; i++){
			let src = json[i].replace("http://localhost/","");
			src = src.replace("../","");
			let output = `
				<div class="tabs sticker-tabs" data-stickerName="`+ src +`"></div>
			`;
			$(".sticker-container .header").append(output);

			if(i ==  1){
				cutSticker({
					src: src,
					div: document.getElementById("fetch-all-stickers-container"),
					ToElem: document.getElementById("fetch-all-stickers-container-png"),
					refresh: false,
					count: "all"
				});
			}
				cutSticker({
					src: src,
					div: document.getElementById("fetch-all-stickers-container-one"),
					ToElem: document.getElementById("fetch-all-stickers-container-png"),
					refresh: false,
					count: 1
				});
			
		}
	});



}


function cutSticker(obj){
	let stickers = [];
	let src = obj["src"];
	let refresh = obj["refresh"];
	let img = new Image();
	img.src = src;
	let div = obj["div"];
	let Imgwidth;
	let Imgheight;
	let name = baseName(src);
	let Sw;
	let Sh;
	let ICols;
	let cols;
	let rows;
	let x = 0;
	let y = 0;
	let minWithHeight = 120;


	img.onload = function(){

		 Imgwidth = this.width;
		 Imgheight = this.height;

		 cols = Math.round(Imgwidth / minWithHeight);
		 rows = Math.round(Imgheight / minWithHeight);
		 ICols = Imgwidth / cols;


		 Sw = Math.round(Imgwidth / cols);
		 Sh = Math.round(Imgheight / rows);


		 // 4 = 600
		 // 5 = 750
		 // 6 = 900


		 let currentCol = 0;
		 let currentRow = 0;


	
				 for(let j = 0; j < rows; j++){
		 			 // Cols
				for(let i = 0; i < cols; i++){
					 currentCol = ++currentCol % cols;
					 if(currentCol == cols - 1){
					 	currentRow++;
	
					 }
					 x = Sw * currentCol;
					 y = Sh * currentRow;

					let theobj = {
						ToElem: obj["ToElem"],
						class:"sticker",
						name:name,
						path:src,
						width:Sw,
						height:Sh,
						position:{
							x:x,
							y:y
						}
					}

		
					stickers.push(theobj);
				}

			 }
			if(obj["count"] == "all"){
				getsticker(div,stickers,refresh);
			}
		

	}
}
function getoneSticker(div,st){
	let newSticker =  document.createElement("div");
	let ToElem = st.ToElem;
	let name = st.name;
	newSticker.style.backgroundImage = "url('"+ st.path +"')";
	newSticker.style.backgroundPosition = st.position.x+ "px " + st.position.y+ "px ";
	newSticker.style.width = st.width + "px ";
	newSticker.style.height = st.height + "px ";
	newSticker.setAttribute("id", name);
	newSticker.setAttribute("class", st.class);

	div.appendChild(newSticker);
}
function getsticker(div,stickers,refresh){
			if(refresh == true){
				div.innerHTML = "";
			}
			for(let j = 0; j < stickers.length; j++){
				let st = stickers[j];
				let newSticker =  document.createElement("div");
				let ToElem = st.ToElem;
				let name = st.name;
				newSticker.style.backgroundImage = "url('"+ st.path +"')";
				newSticker.style.backgroundPosition = st.position.x+ "px " + st.position.y+ "px ";
				newSticker.style.width = st.width + "px ";
				newSticker.style.height = st.height + "px ";
				newSticker.setAttribute("id", name+j);
				newSticker.setAttribute("class", st.class);

		
				div.appendChild(newSticker);
		}
}

function GETDOMTOPNG(obj){
	let id = obj["id"];
	let ToElem = obj["ToElem"];
		domtoimage.toPng(id)
		    .then(function (dataUrl) {
		        var img = new Image();
		        img.src = dataUrl;
		        img.onload = function(){
		            return this;
		         }
		    })
		    .catch(function (error) {
		        console.error('oops, something went wrong!', error);
		    });
}
function baseName(str){
   var base = new String(str).substring(str.lastIndexOf('/') + 1); 
    if(base.lastIndexOf(".") != -1)       
        base = base.substring(0, base.lastIndexOf("."));
   return base;
}
</script>