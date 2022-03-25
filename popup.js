const check = document.getElementById('checkbox');

chrome.storage.sync.get(['on'], function(result) {
    check.checked = result.on;
});

check.addEventListener('change', (e) => {
    chrome.storage.sync.set({ on: check.checked }, function () {});
    chrome.runtime.sendMessage({ greeting: "refresh"});
});