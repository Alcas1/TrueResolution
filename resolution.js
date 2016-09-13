$(document).ready(function(){
	console.log($("#test").width());
	console.log($("#test").height());

	console.log($("#inner1").width());
	console.log($("#inner1").height());

	/* 
		Before we forget, so if you nest a div within another div and have a constant margin-left of a certain amount
		and have the rest of it fit into the parent (using vw to figure things out), there's a cool ratio
		of the widths of the parent and child. If we can figure out how to math and get the ratio
		to be nice integers, we'd be GOLDEN.

		// http://stackoverflow.com/questions/1713771/how-to-detect-page-zoom-level-in-all-modern-browsers
	*/
	// console.log(" = " + ($("#test").width() / $("#inner1").width() / 1.2695417789757413));
	//console.log(" = " + ($("#test").height() / $("#inner1").height()));

	// This is what the link above suggests - kinda works
	// Can possibly use as another metric
	// Probably gonna have to find a function to match the data
	// Excel is your best friend
	console.log(($("#inner1").outerWidth() -8) / $("#inner1").innerWidth());


	console.log(document.getElementById("test"));


});