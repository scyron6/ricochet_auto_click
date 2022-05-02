chrome.storage.sync.get(['on'], function (result) {
  if (result.on) {
    var insertedNodes = [];
    document.addEventListener(
      'DOMNodeInserted',
      function (e) {
        if (
          e.target.data == 'Incoming Call' &&
          !document.querySelector('.live-call')
        ) {
          setTimeout(function () {
            var clickEvent = document.createEvent('MouseEvents');
            clickEvent.initEvent('click', true, true);
            document
              .querySelector('.green-answer-call')
              .dispatchEvent(clickEvent);
          }, 1);
        }
      },
      false
    );

    chrome.runtime.onMessage.addListener(function (
      request,
      sender,
      sendResponse
    ) {
      if (request.greeting === 'are you there?')
        sendResponse({ answer: 'yes' });
    });
  }
});
