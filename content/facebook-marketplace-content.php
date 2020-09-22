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