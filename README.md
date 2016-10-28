# TrueResolution

**NOTE: This repository has mainly been replaced by another which holds the rest of the server-side code for this project. See Alcas1/true-resolution-server on Github.**

A tool to determine the resolution of your screen through your browser that is cross-platform and isn't affected by browser zooming.

Tested on the following platforms:
- macOS Sierra
	- Safari 10.0
	- Chrome 53.0
	- Opera 40.0
	- Firefox 49
- Windows 10
	- Chrome 53.0
	- Firefox 46
	- Internet Explorer 11
	- Microsoft Edge 38

Known issues:
- Bug in Firefox 46+ where high DPI displays are not accounted for
- In Internet Explorer 11 and Microsoft Edge 38, zooming to 10% or lower causes it to show incorrect resolution, and will remain incorrect until you zoom back to 100%
