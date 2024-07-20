chrome.runtime.onInstalled.addListener(() => {
  chrome.contextMenus.create({
    id: "saveText",
    title: "Save selected text",
    contexts: ["selection"]
  });
});

chrome.contextMenus.onClicked.addListener((info, tab) => {
  if (info.menuItemId === "saveText") {
    chrome.storage.local.get({ savedTexts: [] }, (data) => {
      const newText = {
        text: info.selectionText,
        url: info.pageUrl,
        timestamp: new Date().toLocaleString()
      };
      const updatedTexts = [...data.savedTexts, newText];
      chrome.storage.local.set({ savedTexts: updatedTexts });
    });
  }
});
