import React, { lazy, Suspense } from 'react'
import { HashRouter, Routes, Route } from 'react-router-dom'

/*
结构: [
  {
    Layout 最外层框架 全局布局-顶部栏左侧栏等
    children: [
      {
        一级导航-顶部栏 
          isTil-表明不参与route生成，仅用于展示
          tilType-栏类型-顶部/左侧
          key-一级标签唯一标识
          name-名称
          to-点击后前往位置
        children:{

          左侧栏 (标题，不可点击，只可展示)
            isTil-true且tilType-leftBar
            name-名称

          route 真正参与route生成的路由
            module: 模块路径 page开头
            path: 路由内的路径走向
            isDefault: 是否为默认路由(全局的，不是每一个一级导航的)
            params: 向页面内传递的参数
            hidden: 是否在导航栏中隐藏该路由
            open: boolean-是否从新页面打开 
                  object-{
                    hasNavs: boolean-打开时是否显示导航栏
                  }
        }
      }
    ]
  }
]

 */

// 提供给外部进行导航栏渲染
export const routeList = [
  {
    path: '/',
    module: 'page/core',
    children: [
      // 一级导航
      {
        isTil: true,
        tilType: 'headerBar',
        key: 'home',
        name: '首页',
        to: '/',
        children: [
          // 二级导航
          {
            isTil: true,
            tilType: 'leftBar',
            name: '系统首页'
          },
          {
            module: 'page/home/systemHome',
            params: {
              name: '系统首页'
            },
            isDefault: true
          },
          {
            path: '/home/accountSetting',
            module: 'page/home/accountSetting',
            params: {
              name: '账号设置'
            },
            open: true
          },
          {
            path: '/home/accountSets',
            module: 'page/home/accountSetting',
            params: {
              name: '账号说明'
            },
            hidden: true
          },
          {
            path: '/home/*',
            module: 'page/home/systemHome',
            params: {
              name: '*/系统首页'
            }
          }
        ]
      },
      {
        isTil: true,
        tilType: 'headerBar',
        key: 'commodity',
        name: '商品',
        to: '/commodity/commodityList',
        children: [
          {
            isTil: true,
            tilType: 'leftBar',
            name: '商品管理'
          },
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
          },
          {
            path: '/commodity/*',
            module: 'page/commodity/commodityList',
            params: {
              name: '*/商品列表'
            }
          }
        ]
      }
    ]
  },
  {
    path: '/*',
    module: 'page/home/systemHome',
    params: {
      name: '*/系统首页'
    }
  }
]

function getModule(routes, filterRoutes = []) {
  // 剔除标题，保留路由
  routes.map((item) => {
    if (item.isTil && item.tilType === 'headerBar') {
      return getModule(item.children.filter((it) => !it.tilType) || [], filterRoutes)
    } else {
      filterRoutes.push({
        ...item,
        path: item.path,
        module: item.module && lazy(() => import(`@/${item.module}`)),
        children: item.children ? getModule(item.children, []) : null
      })
    }
  })
  return filterRoutes
}

function renderRoutes(route) {
  return route.map(
    ({ path, isDefault, children = [], module, params = {} }, index) => {
      const Component = module
      return (
        <Route
          index={isDefault}
          path={path}
          key={'Route' + index}
          // eslint-disable-next-line react/no-children-prop
          children={children ? renderRoutes(children) : null}
          element={Component ? <Component {...params} /> : null}
        ></Route>
      )
    }
  )
}

const router = () => {
  console.log(getModule(routeList), 'getModule(routeList)');
  return (
    <HashRouter>
      <Suspense fallback={<div>loading...</div>}>
        <Routes>{renderRoutes(getModule(routeList))}</Routes>
      </Suspense>
    </HashRouter>
  )
}

export default router
