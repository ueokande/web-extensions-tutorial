window.addEventListener("keypress", (e) => {
  if (e.key === 'h') {
    chrome.runtime.sendMessage({ type: 'tabs.prev' });
  } else if (e.key  === 'l') { // L
    chrome.runtime.sendMessage({ type: 'tabs.next' });
  } else {
    return;
  }

  e.stopPropagation();
  e.preventDefault();
});
