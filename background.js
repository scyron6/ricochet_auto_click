chrome.runtime.onInstalled.addListener(() => {
  chrome.storage.sync.set({ on: false }, function () {});
});

chrome.tabs.onActivated.addListener(function (tab) {
  updateIcon();
});

chrome.tabs.onUpdated.addListener(function (tab) {
  updateIcon();
});

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  if (request.greeting === "refresh") {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
      chrome.tabs.reload(tabs[0].id);
    });
  }
});

function updateIcon() {
  chrome.action.setIcon({
    path: {
      16: "icons/cursor-gray-16.png",
      32: "icons/cursor-gray-32.png",
    },
  });
  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    chrome.tabs.sendMessage(
      tabs[0].id,
      { greeting: "are you there?" },
      function (response) {
        if (response.answer == "yes") {
          chrome.action.setIcon({
            path: {
              16: "icons/cursor-green-16.png",
              32: "icons/cursor-green-32.png",
            },
          });
        }
      }
    );
  });
}