$(document).ready(function(){
	// console.log($("#test").width());
	// console.log($("#test").height());

	// console.log($("#inner1").width());
	// console.log($("#inner1").height());

	/* 
		Before we forget, so if you nest a div within another div and have a constant margin-left of a certain amount
		and have the rest of it fit into the parent (using vw to figure things out), there's a cool ratio
		of the widths of the parent and child. If we can figure out how to math and get the ratio
		to be nice integers, we'd be GOLDEN.

		// http://stackoverflow.com/questions/1713771/how-to-detect-page-zoom-level-in-all-modern-browsers
	*/
	console.log("width ratio     = " + ($("#test").width() / $("#inner1").width()));	
	console.log("adj width ratio = " + ($("#test").width() / $("#inner1").width() / 1.2695417789757413));
	console.log("height ratio    = " + ($("#test").height() / $("#inner1").height()));

	// This is what the link above suggests - kinda works
	// Can possibly use as another metric
	// Probably gonna have to find a function to match the data
	// Excel is your best friend
	console.log("other metric    = " + ($("#inner1").outerWidth() - 8) / $("#inner1").innerWidth());


	// console.log(document.getElementById("test"));

	console.log(($("#test").width() / $("#inner1").width()) + "," +
		($("#test").width() / $("#inner1").width() / 1.2695417789757413) + "," +
		($("#test").height() / $("#inner1").height()) + "," +
		($("#inner1").outerWidth() - 8) / $("#inner1").innerWidth()
	);



	/* ===================================================================== */
	/* Peter work from 9/27 -- determine horinzontal screen resolution and
	/*     and percent error
	/* ===================================================================== */

	/* Zoom function determined from Excel regression - unadjusted width */
	var getZoom1 = function (x) {
		return -1.3768*Math.pow(x,4) + 10.573*Math.pow(x,3) - 31.821*Math.pow(x,2) + 46.709*x - 24.066;
	};

	/* Zoom function determined from Excel regression - ADJUSTED width */
	var getZoom2 = function (x) {
		return -3.5764*Math.pow(x,4) + 21.635*Math.pow(x,3) - 51.287*Math.pow(x,2) + 59.299*x - 24.066
;
	};

	var getHRes = function (res, zoom) {
		return res * zoom;
	};

	var perceivedHRes = document.body.clientWidth;
	var realHRes      = 1920;
	var zoomLevel1    = getZoom1(($("#test").width() / $("#inner1").width()));
	var zoomLevel2    = getZoom2(($("#test").width() / $("#inner1").width() / 1.2695417789757413));
	var adjustedHRes1 = getHRes(perceivedHRes, zoomLevel1);
	var adjustedHRes2 = getHRes(perceivedHRes, zoomLevel2);
	var percentError1 = (adjustedHRes1 - realHRes) / realHRes * 100;
	var percentError2 = (adjustedHRes2 - realHRes) / realHRes * 100;

	console.log("=====================================================================");
	console.log("Zoom level (unadjusted) = " + zoomLevel1);
	console.log("Horizontal resolution   = " + adjustedHRes1);
	console.log("Percent error           = " + percentError1);
	console.log();
	console.log("Zoom level (adjusted)   = " + zoomLevel2);
	console.log("Horizontal resolution   = " + adjustedHRes2);
	console.log("Percent error           = " + percentError2);
	console.log("=====================================================================");
});