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


const baseUrl = 'https://juejin.cn/user/'
const reqQuery = {
  aid: '', // 自定义
  uuid: '', // 自定义
  user_id: '',
  not_self: '1',
  need_badge: '1'
}

 /**
 * 正则匹配用户 user_id
 */
const regFunc = (str) => {
  return str.match(/\d{15,16}/g)[0]
}

chrome.contextMenus.onClicked.addListener((clickData) => {
  if (clickData.menuItemId === 'wangzaimisuAdd') {
    if (clickData.linkUrl && clickData.linkUrl.includes(baseUrl)) {
      // 获取id
      const user_id = regFunc(clickData.linkUrl)
      reqQuery.user_id = user_id

      // 发起请求
      requestUserInfo()
    } else if (clickData.pageUrl.includes(baseUrl)) {
      // 获取id
      const user_id = regFunc(clickData.pageUrl)
      reqQuery.user_id = user_id

      // 发起请求
      requestUserInfo()
    }
  }

  if (clickData.menuItemId === 'wangzaimisuCancel') {
    if (clickData.linkUrl && clickData.linkUrl.includes(baseUrl)) {
      // 获取id
      const user_id = regFunc(clickData.linkUrl)
      // 从storage中删除
      cnacelFollowUserInfo(user_id)
    } else if (clickData.pageUrl.includes(baseUrl)) {
      // 获取id
      const user_id = regFunc(clickData.pageUrl)
      // 从storage中删除
      cnacelFollowUserInfo(user_id)
    }
  }
})