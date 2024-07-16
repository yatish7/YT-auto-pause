chrome.tabs.onActivated.addListener(activeInfo => {
    chrome.tabs.get(activeInfo.tabId, tab => {
      if (tab.url.includes("youtube.com/watch")) {
        chrome.scripting.executeScript({
          target: { tabId: activeInfo.tabId },
          function: checkVideoState
        });
      }
    });
  });
  
  chrome.windows.onFocusChanged.addListener(windowId => {
    if (windowId !== chrome.windows.WINDOW_ID_NONE) {
      chrome.tabs.query({ active: true, lastFocusedWindow: true }, tabs => {
        let tab = tabs[0];
        if (tab && tab.url.includes("youtube.com/watch")) {
          chrome.scripting.executeScript({
            target: { tabId: tab.id },
            function: checkVideoState
          });
        }
      });
    }
  });
  
  function checkVideoState() {
    let video = document.querySelector("video");
    if (document.hidden) {
      if (!video.paused) {
        video.pause();
      }
    } else {
      if (video.paused) {
        video.play();
      }
    }
  }
  