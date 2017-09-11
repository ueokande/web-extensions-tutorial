function selectPrevTab(current) {
  chrome.tabs.query({ currentWindow: true }, (tabs) => {
    let index = (current.index - 1 + tabs.length) % tabs.length;
    chrome.tabs.update(tabs[index].id, { active: true });
  });
};

function selectNextTab(current) {
  chrome.tabs.query({ currentWindow: true }, (tabs) => {
    let index = (current.index + 1) % tabs.length;
    chrome.tabs.update(tabs[index].id, { active: true });
  });
};

chrome.runtime.onMessage.addListener((request, sender) => {
  switch (request.type) {
  case 'tabs.prev':
    selectPrevTab(sender.tab);
    break;
  case 'tabs.next':
    selectNextTab(sender.tab);
    break;
  }
});
