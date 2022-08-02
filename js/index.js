
// 通信需要 activeTab
const tabUrlList = ['https://juejin.cn/user', 'https://juejin.cn/post']

/**
 * 匹配我们当前打开的url，是否是这两个中的
 */
const existenceFunc = (tabUrl) => {
  return tabUrlList.filter((item) => {
    return tabUrl.includes(item)
  }).length
}

window.onload = () => {
  const wzmsInput = document.getElementById('wzmsInput')
  const wzmsBtnCancel = document.getElementById('wzmsBtnCancel')
  const wzmsBtnConfirm = document.getElementById('wzmsBtnConfirm')

  let tabId
  let tabUrl

  chrome.tabs.getSelected(null, function (tab) {
    // 先获取当前页面的tabID

    tabId = tab.id
    tabUrl = tab.url
  })

  wzmsBtnCancel.onclick = function () {
    wzmsInput.value = ''
  }

  wzmsBtnConfirm.onclick = function () {
    if (existenceFunc(tabUrl)) {
      // 发送消息给 background
      chrome.runtime.sendMessage({ user_id: wzmsInput.value, tabId }, function (res) {
        wzmsInput.value = ''
      })
    }
  }
}