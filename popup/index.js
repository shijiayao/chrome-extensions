let autoplayVideo = document.getElementById('autoplay_video');

autoplayVideo.addEventListener('click', async () => {
  let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

  chrome.scripting.executeScript({
    target: { tabId: tab.id },
    function: pageTest
  });
});

function pageTest() {
  // 点击时向页面注入 js
  let injectedFiles = chrome.runtime.getURL('/injected-files/autoplay_video.js');

  let injectedScriptDOM = document.createElement('script');
  injectedScriptDOM.src = injectedFiles;

  document.head.appendChild(injectedScriptDOM);
}

let messageTest = document.getElementById('message_test');

messageTest.addEventListener('click', async () => {
  // 点击时向扩展 background 发送了一条消息
  // let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

  chrome.runtime.sendMessage({ content: 'hello' }, function (response) {
    // 接收扩展 background 返回给我的消息
    console.log(response.farewell);
  });
});
