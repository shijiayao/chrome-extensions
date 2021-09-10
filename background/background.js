/**
 *
 * 在扩展页面执行
 */

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  if (sender.tab) {
    // 来自页面
    console.log(`我是扩展 background 收到来自页面【 ${sender.tab.url} 】的消息【${request.content}】`, sender);
  } else {
    // 来自扩展
    console.log(`我是扩展 background 收到来自扩展的消息【${request.content}】`, sender);
  }

  sendResponse({ farewell: '我是扩展 background 发送的消息' });
});
