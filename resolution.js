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
	*/
	console.log(" = " + ($("#test").width() / $("#inner1").width() / 1.2695417789757413));
	//console.log(" = " + ($("#test").height() / $("#inner1").height()));

	console.log(document.getElementById("test"));


});