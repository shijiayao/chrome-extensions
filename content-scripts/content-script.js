/**
 * 内容脚本
 * 在浏览器打开页面时向页面注入内容脚本 可选时机 document_idle document_start document_end
 * 此内容脚本在浏览器打开的页面上执行
 *
 * 可以通过此内容脚本将 extension 目录内的文件注入到页面上 【!注入的文件可以在页面上执行，并且是在页面中的环境】
 * web_accessible_resources 设置允许注入的规则
 */

let injectedFiles = chrome.runtime.getURL('/injected-files/resource.js');

let injectedScriptDOM = document.createElement('script');
injectedScriptDOM.src = injectedFiles;

document.head.appendChild(injectedScriptDOM); // document_idle or document_end
// document.documentElement.appendChild(injectedScriptDOM); // document_start

// 内容脚本执行时向扩展 background 发送了一条消息，在页面上执行的
chrome.runtime.sendMessage({ content: '内容脚本 content-scripts 向 扩展 background 发送了一条消息！' }, function (response) {
  // 接收扩展 background 返回给我的消息
  console.log(response.farewell);

  return true;
});
