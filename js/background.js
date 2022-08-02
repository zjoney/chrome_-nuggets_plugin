const contextMenus = {
  id: 'wangzaimisuAdd',
  title: '添加为特别关注-掘金',
  type: 'radio',
  contexts: ['image']
}

const contextMenus2 = {
  id: 'wangzaimisuCancel',
  title: '取消对该用户特别关注',
  type: 'radio',
  contexts: ['image']
}

chrome.contextMenus.create(contextMenus)
chrome.contextMenus.create(contextMenus2)