chrome.runtime.onInstalled.addListener(() => {
  chrome.storage.local.set({ width: 70 });
});

chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  if (changeInfo.status === 'complete' && tab.url) {
    if (tab.url.startsWith('https://chat.openai.com/')) {
      chrome.action.enable(tabId);
    } else {
      chrome.action.disable(tabId);
    }
  }
});
