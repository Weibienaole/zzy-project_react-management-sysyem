// 获取地址栏参数
export const getUrlData = (url) => {
  if (url.slice(url.length - 2, url.length) === '#/')
    url = url.slice(0, url.length - 2)
  let o = {}
  let params = url.split('?')[1]
  if (!params) return {}
  params.split('&').map((item) => {
    let r = item.split('=')
    o[item.split('=')[0]] = r[1]
  })
  return o
}
