<?php 
include '../database.php';
session_start();
?>
<div class="facebook-left-content">
			<div class="header">
				<a href="settings?tab=" class="settings-list">Stories</a>
				<h2>Your Story</h2>
				<div class="icons">
					<div class="icon">
						<?php echo mysvg("cog") ?>
					</div>
				</div>
			</div>
			<div class="body">
				<div class="left-content scrollbar">
					<div class="prof">
						<img src="<?php echo $_SESSION["profile_picture"] ?>" class="circle">
						<p><?php echo $_SESSION["fullname"] ?></p>
					</div>
				<div class="when-image-content" style="display: none;">
					<div class="story-content-body">
						<div class="list-picker">
							<div class="main-picker">
								<div class="main-font">
									<span>Filter</span>
								</div>
								<?php echo mysvg("down-arrow") ?>
							</div>
							<div class="picker-container">
								<div class="item">
									<div class="name"><span>Combine</span></div>
									<div class="switch relative image-filter image-filter" data-value="combine">
										<div class="onOff" value="off"></div>
									</div>
								</div>
								<div class="item">
									<div class="name"><span>Grayscale</span></div>
									<div class="switch relative image-filter" data-value="grayscale">
										<div class="onOff" value="off"></div>
									</div>
								</div>
								<div class="item">
									<div class="name"><span>Sepia</span></div>
									<div class="switch relative image-filter" data-value="sepia">
										<div class="onOff" value="off"></div>
									</div>
									
								</div>
								<div class="item">
									<div class="name"><span>Blur</span></div>
									<div class="switch relative image-filter" data-value="blur">
										<div class="onOff" value="off"></div>
									</div>
									
								</div>
								<div class="item">
									<div class="name"><span>Saturate</span></div>
									<div class="switch relative image-filter" data-value="saturate">
										<div class="onOff" value="off"></div>
									</div>
									
								</div>
								<div class="item">
									<div class="name"><span>Hue</span></div>
									<div class="switch relative image-filter" data-value="hue">
										<div class="onOff" value="off"></div>
									</div>
									
								</div>
								<div class="item">
									<div class="name"><span>Invert</span></div>
									<div class="switch relative image-filter" data-value="invert">
										<div class="onOff" value="off"></div>
									</div>
								</div>
								<div class="item">
									<div class="name"><span>Darken</span></div>
									<div class="switch relative image-filter" data-value="darken">
										<div class="onOff" value="off"></div>
									</div>
								</div>
								<div class="item">
									<div class="name"><span>Contrast</span></div>
									<div class="switch relative image-filter" data-value="contrast">
										<div class="onOff" value="off"></div>
									</div>
								</div>
							</div> 
						</div>
					</div>
				</div>
<!-- 				<div class="story-sticker-selector">
						<div class="story-content-body">
							<div class="sticker-container">
								<div class="header">
									
								</div>
								<div class="body scrollbar" id="fetch-all-stickers-container">
									<div id="fetch-all-stickers-container-png"></div>
								</div>
							</div>
						</div>
					</div> -->
					<div class="story-font-editor" style="display: none;"></div>
					<div class="story-image-editor" style="display: none;"></div>
					<div class="story-draw-editor" style="display: none;"></div>
			<div class="when-text-content" style="display: none;">
				<div class="story-content-body">
					<div class="switch story-textarea relative small active" data-value="textarea" style="position: absolute !important;margin-top:8px;right:8%; !important;">
							<div class="onOff" value="on" style="margin-left: 12.5px;"></div>
						</div>
						<textarea placeholder="Start typing" class="story-main-textbox"></textarea>
						<div class="list-picker add">
							<div class="main-picker">
								<div class="square">
									<span>Text</span>
								</div>
								<div class="square">
									<span>Image</span>
								
								</div>
								<div class="square">
									<span>Sticker</span>
								</div>
								<div class="square">
									<span>Draw</span>
								</div>
							</div>
						</div>
						<div class="list-picker">
							<div class="main-picker">
								<div class="square">
									Aa
								</div>
								<div class="main-font">
									<span>CLEAN</span>
								</div>
								<?php echo mysvg("down-arrow") ?>
							</div>
							<div class="picker-container">
								<li><span>CLEAN</span></li>
								<li><span>Simple</span></li>
								<li><span>Casual</span></li>
								<li><span>Fancy</span></li>
								<li><span><b>Headline</b></span></li>
							</div>
						</div>
						<div class="content-picker">
							<p>Backgrounds</p>
							<div class="main-picker">
								<?php 
								$path = "../image/themes/stories/";
								$image = glob($path."*.jpg");
								foreach($image as $theme){
									$theme = str_replace("../","",$theme);
									$name = basename($theme);
									$name = str_replace(".jpg","",$name);
									$output ='<div class="item stories-theme"><img src="'.$theme.'" data-theme="image/themes/stories/themes/theme'.$name.'.jpg"/></div>';
									echo $output;
								}
								?>
							</div>
							<p>Linear Gradient</p>
							<div class="main-picker">
								<?php 
									$linearGradientCombination = getLinearGradientCombination();

									foreach($linearGradientCombination as $group){
										$count = count($group);
								
										$output = '
											<div class="item stories-theme-gradient" style="background: linear-gradient(to right,';
											for($i = 0; $i < $count ; $i++){
												if($i == $count - 1){
													$output .= $group[$i];
												}else{
													$output .= $group[$i].",";
												}
											}
										$output .=') !important"></div>
										';
										echo $output;
									}
								?>
							</div>
							<div class="footer">
								<?php echo mysvg("down-arrow") ?>
							</div>
						</div>
					</div>
				</div>
			<div class="footer main" style="display: none;z-index: 999">
				<div class="mybuttons discard-story"><span>Discard</span></div>
				<div class="mybuttons active save-story"><span>Save</span></div>
			</div>
		</div>
	</div>
</div>
		<div class="facebook-right-content">
			<div class="story-main-content">
				<div class="preview-container" style="display: none;">
					<p>Preview</p>
					<div class="main-container">
						<!-- Story Preview -->
						<div class="story main-story-preview" id="main-story-preview" style="background-image: url('image/themes/stories/themes/themea.jpg')">
					<canvas id="storyCanvas" data-size="1" data-brush="normal" data-cap="round" data-color="#000"></canvas>
							<div class="main-textbox" placeholder="Start Typing">Start Typing</div>
						</div>
						<!--  -->

						<div class="toElem" style=""></div>
						</canvas>
					</div>
				</div>
					<div class="stories-picker photo" label="photo">
						<center>
							<div class="circle">
								<img src="svg/ar-camera.svg">
							</div>
						<p>Create a Photo Story</p>
						</center>
					</div>
				<div class="stories-picker text" label="text">
					<center>
						<div class="circle">
							<span>Aa</span>
						</div>
						<p>Create a Text Story</p>
					</center>
				</div>
					<!-- 	<div id="fetch-all-stickers-container-one" style="visibility: "></div> -->
			</div>
			<form method="POST" enctype="multipart/form-data" hidden="">
				<input type="file" name=""  class="upload-photo-story">
			</form>
			<form method="POST" enctype="multipart/form-data" hidden="">
				<input type="file" name="" class="append-image-story">
			</form>
	</div>