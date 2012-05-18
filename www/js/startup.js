
// If you want to prevent dragging, uncomment this section
/*
function preventBehavior(e) 
{ 
    e.preventDefault(); 
  };
document.addEventListener("touchmove", preventBehavior, false);
*/

/* If you are supporting your own protocol, the var invokeString will contain any arguments to the app launch.
see http://iphonedevelopertips.com/cocoa/launching-your-own-application-via-a-custom-url-scheme.html
for more details -jm */
/*
function handleOpenURL(url)
{
  // TODO: do something with the url passed in.
}
*/

function onBodyLoad()
{
  
  //$(document).ready(function() {
  //  $('head').remove();
  //  $('body').load('http://tera-forums.enmasse.com/ div#content-primary');

//  $('a').live("click", function (event) {
//    event.preventDefault();
//    window.Pages.setCurrentPage($(this).attr("href"));
//  });
//
//  function scrapeAndClean () {
//    for (i=0; i < document.styleSheets.length; i++) {
//      document.styleSheets[i].disabled = true;
//      forge.logging.info("function runs");
//    }
//  };
//  scrapeAndClean();
  
//  $.get("http://tera-forums.enmasse.com/forums", function (data) {
//    alert(data);
//  });
//  alert("ran get.");
  document.addEventListener("deviceready", onDeviceReady, false);
  
}

/* When this function is called, Cordova has been initialized and is ready to roll */
/* If you are supporting your own protocol, the var invokeString will contain any arguments to the app launch.
see http://iphonedevelopertips.com/cocoa/launching-your-own-application-via-a-custom-url-scheme.html
for more details -jm */
function onDeviceReady()
{
  // do your thing!
  navigator.notification.alert("Cordova is working");
}
