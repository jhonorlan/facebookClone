

function cutSticker(obj){
	let stickers = [];
	let src = obj["src"];
	let save = obj["save"];
	let img = new Image();
	img.src = src;
	let div = document.getElementById("show-sticker-preview");
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
						class:"main-sticker",
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
		

	
			for(let j = 0; j < stickers.length; j++){
				let st = stickers[j];
				let newSticker =  document.createElement("div");
				let ToElem = document.getElementById("ToElem");
				let name = st.name;
				newSticker.style.backgroundImage = "url('"+ src +"')";
				newSticker.style.backgroundPosition = st.position.x+ "px " + st.position.y+ "px ";
				newSticker.style.width = st.width + "px ";
				newSticker.style.height = st.height + "px ";
				newSticker.setAttribute("id", name+j);
				newSticker.setAttribute("class", st.class);
				div.appendChild(newSticker);

			}
	}
}

function GetAllImages(){
	let path = "../image/stickers/";
	$.getJSON('getAllImages.php', {path: path}, function(json, textStatus) {
		let length = json.length;

		for(let i = 0; i < length; i++){
			cutSticker({
				src:json[i],
				save:false
			});
		}
	});
}


GetAllImages()
function baseName(str){
   var base = new String(str).substring(str.lastIndexOf('/') + 1); 
    if(base.lastIndexOf(".") != -1)       
        base = base.substring(0, base.lastIndexOf("."));
   return base;
}
