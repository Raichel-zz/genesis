var colW = 200, rowH = 200;
var columns = null;

$(document).ready(
		function() {
				$(window)
					.resize(
							function() {
								//Set the background div size to cover the window
								var $window = $(window);
								$('#backgroundDiv').width($window.width()-15);
								$('#backgroundDiv').height($window.height());
								
								// check if columns has changed
								var currentColumns = Math.floor(($(
										'#wizardContainer').width() - 10)
										/ colW);
								if (currentColumns !== columns) {
									// set new column count
									columns = currentColumns;
									// apply width to container manually,
									// then trigger relayout
									$('#themesTileContainer').width(
											columns * colW);
								}

							}).resize(); // trigger resize to set container width
		});

function filterAds() {
	var filter = "";
	if ($("#nameFilterInput").val().trim() != "") {
		filter += "[alt*='" + $("#nameFilterInput").val().toLowerCase() + "']";
	} else {
		filter = "*";
	}
	$('#themesTileContainer').isotope({
		filter : filter
	});
}

function themeSelected(selectedThemeId) {
	$.ajax("/decals/theme_show?id=" + selectedThemeId,{
		type : "get",
		dataType : "JSON"
	}).success(function(data) {
		// Draw the theme image on a canvas
		var c = document.getElementById("decalCanvas");
		var context = c.getContext("2d");
		var imageObj = new Image();

		imageObj.onload = function() {
	        context.drawImage(imageObj, 0, 0, 420, 420);
	        //Move to the next wizard step
	        fadeInAndOut($("#firstStep"), $("#secondStep"))
	    };
	    imageObj.src = "/assets/" + data["file_url"];
	});
}

function fadeInAndOut(itemToFadeOut, itemToFadeIn) {
	$(itemToFadeOut).fadeOut("1000", function (){
		$(itemToFadeIn).fadeIn("1000");
	});
}

function renderThemesTileView() {
	$.ajax("/decals/theme_list",{
		type : "get",
		dataType : "JSON"
	}).success(function(data) {
		// ad themes to the tile view
		for (var i=0; i < data.length; i++) {
			populateThemeTile(data[i]);
		}

		$(".theme-item").css("display", "inline");
		// Ads view layout manager
		$("#themesTileContainer").isotope({
			// Options
			itemSelector : '.theme-item',
			layoutMode : 'cellsByRow',
			cellsByRow : {
				columnWidth : colW,
				rowHeight : rowH
			}
		});
	});
}

function populateThemeTile(theme) {
	var themeItem;
	$("#themesTileContainer").append($("#themeItemWrapper").html());
	themeItem = $(".theme-item:last", $("#themesTileContainer"));
	
	themeItem.attr({"alt": theme.name.toLowerCase()});
	themeItem.click(function() {
		themeSelected(theme.id);
	});
	$(".theme-img", themeItem).attr("src", "/assets/" + theme.file_url);
	$(".theme-name", themeItem).text(theme.name);
}

function showWizard() {
	//Load themes and render their tile view
	renderThemesTileView();
	$( "#backgroundDiv" ).animate({
		 //left: ["-2000","swing"],
		opacity: "0",
		 }, 1000, function() {
			 $( "#backgroundDiv" ).css("display", "none");
			 $("#wizardContainer").css("display", "inline");
		 });
	$( "#welcomeRow" ).animate({
		 //left: ["-2000","swing"],
		opacity: "0",
		 }, 1000, function() {
			 $( "#welcomeRow" ).css("display", "none");
		 });
	
}
