
// Listen for the extension being installed or updated
browser.runtime.onInstalled.addListener(function(details) {
   if (details.reason === 'install') {
     // Open the options page on first install
     browser.runtime.openOptionsPage();
   }
 });
