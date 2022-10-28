/*
结构: 
[
  {
    一级导航-顶部栏 
      key: string-一级标签唯一标识
      name: string-名称
      defaultPath: string-默认跳转页面，不加则默认选择第一个可用路由
    children: [
      {
        二级路由，或者二级路径
        路径：
        {
          path: string-页面地址,
          module: string-组件实际指向位置,
          params: {
            name: string-页面名称
          },
          hidden: boolean-是否在导航栏中隐藏该路由,
          open: boolean-是否从新页面打开
        },
        路由:
        {
          name: string-二级路由名称,
          children: [
            ...和二级路由参数一致
          ]
        }
      }
    ]
  }
]

 */

// 懒加载路由表
const asyncRoutes = [
  {
    name: '首页',
    key: 'home',
    defaultPath: '/',
    children: [
      {
        path: '/',
        module: 'page/home/systemHome',
        params: {
          name: '系统首页'
        }
      },
      {
        name: '系统信息',
        children: [
          {
            path: '/home/accountSetting',
            module: 'page/home/accountSetting',
            params: {
              name: '账号设置'
            }
          },
          {
            path: '/home/systemInfo',
            module: 'page/home/accountSetting',
            params: {
              name: '基本信息'
            },
            open: true
          }
        ]
      }
    ]
  },
  {
    name: '商品',
    key: 'commodity',
    defaultPath: '/commodity/commodityList',
    children: [
      {
        name: '商品管理',
        children: [
          {
            path: '/commodity/commodityList',
            module: 'page/commodity/commodityList',
            params: {
              name: '商品列表'
            }
          },
          {
            path: '/commodity/addCommodity',
            module: 'page/commodity/addCommodity',
            params: {
              name: '添加商品'
            }
          }
        ]
      }
    ]
  }
]

export default asyncRoutes
