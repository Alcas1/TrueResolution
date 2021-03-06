/* 
 * ============================================================================
 * This file is for notes or other possible solutions.
 * Hopefully the other file will be a bit cleaner as a result.
 * ============================================================================
 */

// ==================
// Our original ideas
// ==================

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

/* Add variable percentages from 1% to 99% and average results

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
var realHRes      = 1920; // NOTE: CHANGE THIS TO YOUR HORIZONTAL RESOLUTION
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

// ======================================================
// Trying to consolidate a list of all relevant variables
// ======================================================

var item = document.getElementById("test4");
console.log("Here's some variables for test4:");
console.log("clientHeight = " + item.clientHeight);
console.log("clientWidth = " + item.clientWidth);
console.log("offsetHeight = " + item.offsetHeight); // height including padding and border, but not margin
console.log("offsetWidth = " + item.offsetWidth);
console.log("offsetTop = " + item.offsetTop); // offset between top of child and parent
console.log("offsetLeft = " + item.offsetLeft); // similar for left side
console.log("scrollTop = " + item.scrollTop); // amount of element hidden by scrolling
console.log("scrollHeight = " + item.scrollHeight);
console.log("scrollWidth = " + item.scrollWidth); // true width of element; bigger than clientWidth if it goes offscreen
console.log("more accurate stuff -- getBoundingClientRect() -- run in console");
console.log("getBoundingClientRect width = " + item.getBoundingClientRect().width);
var doc = document.body;
console.log("document.body.clientHeight = " + doc.clientHeight);
console.log("document.body.clientWidth = " + doc.clientWidth);
console.log("And so on...");
var win = window;
console.log("window.innerHeight = " + win.innerHeight); // height of viewport
console.log("window.innerWidth = " + win.innerWidth);
console.log("window.outerHeight = " + win.outerHeight); // height of whole browser window
console.log("window.outerWidth = " + win.outerWidth);
console.log("screen.height = " + screen.height); // whole screen
console.log("screen.width = " + screen.width);
console.log("All of these are affected by zoom.");

// document.body.clientWidth will show true viewport width (also window widths)
// element clientWidth will give off-screen size as well

console.log(document.getElementById('test4').getBoundingClientRect().width - document.body.clientWidth);
// ^^^ this might be helpful

// 1 vw = document.documentElement.clientWidth / 100

// Kevin got 153.59
// 1366 x 768

// Note: can get aspect ratio by screen.width / screen.height

// Because David's computer also return 192 for 1080p, maybe that means there's a way to determine
// resolution without needing the zoom factor... hm. Consider it



// ===============
// window.onresize
// ===============
// might be useful as an event handler, even if only for testing

// =======================
// window.devicePixelRatio
// =======================
// on firefox, tells if zoomed in or not
// not sure how values differ, but it definitely shows
// however, on retina macs, defaults at 2
// also note: retina macs have 1.5x pixel density, not actually 2x

// ================
// retina detection
// ================
// ((window.matchMedia && (window.matchMedia('only screen and (min-resolution: 124dpi), only screen and (min-resolution: 1.3dppx), only screen and (min-resolution: 48.8dpcm)').matches || window.matchMedia('only screen and (-webkit-min-device-pixel-ratio: 1.3), only screen and (-o-min-device-pixel-ratio: 2.6/2), only screen and (min--moz-device-pixel-ratio: 1.3), only screen and (min-device-pixel-ratio: 1.3)').matches)) || (window.devicePixelRatio && window.devicePixelRatio > 1.3));
// from http://stackoverflow.com/questions/19689715/what-is-the-best-way-to-detect-retina-support-on-a-device-using-javascript
// or (from same webpage)
// function isRetinaDisplay() {
//     if (window.matchMedia) {
//         var mq = window.matchMedia("only screen and (min--moz-device-pixel-ratio: 1.3), only screen and (-o-min-device-pixel-ratio: 2.6/2), only screen and (-webkit-min-device-pixel-ratio: 1.3), only screen  and (min-device-pixel-ratio: 1.3), only screen and (min-resolution: 1.3dppx)");
//         return (mq && mq.matches || (window.devicePixelRatio > 1)); 
//     }
// }