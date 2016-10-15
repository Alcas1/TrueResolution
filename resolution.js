// Sources:
// High DPI Detection: http://stackoverflow.com/questions/19689715/what-is-the-best-way-to-detect-retina-support-on-a-device-using-javascript
// Browser Detection: http://stackoverflow.com/questions/9847580/how-to-detect-safari-chrome-ie-firefox-and-opera-browser

// Currently tested on:
// Firefox 49.0.1
// Safari 10.0
// Chrome 53.0

// Detect Browser
var isOpera = (!!window.opr && !!opr.addons) || !!window.opera || navigator.userAgent.indexOf(' OPR/') >= 0;
var isFirefox = typeof InstallTrigger !== 'undefined';
var isSafari = Object.prototype.toString.call(window.HTMLElement).indexOf('Constructor') > 0;
var isIE = /*@cc_on!@*/false || !!document.documentMode;
var isEdge = !isIE && !!window.StyleMedia;
var isChrome = !!window.chrome && !!window.chrome.webstore;
var isBlink = (isChrome || isOpera) && !!window.CSS;

var onresize = function onresize() {
	var hres, vres;

	if (isFirefox) {
		var pixelRatio = window.devicePixelRatio;
		var highdpi = (window.matchMedia && (window.matchMedia('only screen and (min-resolution: 124dpi), only screen and (min-resolution: 1.3dppx), only screen and (min-resolution: 48.8dpcm)').matches || window.matchMedia('only screen and (-webkit-min-device-pixel-ratio: 1.3), only screen and (-o-min-device-pixel-ratio: 2.6/2), only screen and (min--moz-device-pixel-ratio: 1.3), only screen and (min-device-pixel-ratio: 1.3)').matches)) || (window.devicePixelRatio && window.devicePixelRatio > 1.3);
		
		if (highdpi) {
			pixelRatio /= 2;
		}

		hres = Math.round(screen.width * pixelRatio);
		vres = Math.round(screen.height * pixelRatio);
	}
	else {
		hres = screen.width;
		vres = screen.height;
	}

	console.log(hres);
	console.log(vres);
}

$(document).ready(function() {
	window.onresize = onresize;
	onresize();
});