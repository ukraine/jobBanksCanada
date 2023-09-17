let isFirstInstall = true;

chrome.runtime.onInstalled.addListener(function(details) {
  if (details.reason === 'install' && isFirstInstall) {
	chrome.tabs.create({ url: 'options.html' });
    isFirstInstall = false;
    chrome.tabs.create({url: "https://yatsiv.com/extensions/canadreeemjoeb/welcome"});
  }
});

 if(chrome.runtime.setUninstallURL) {
   chrome.runtime.setUninstallURL('https://yatsiv.com/f/canadreeemjoeb');
}