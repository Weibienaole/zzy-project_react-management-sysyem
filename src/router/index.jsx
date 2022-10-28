import React, { lazy } from 'react'
import { HashRouter, Routes, Route } from 'react-router-dom'

// 基层
import Core from '../page/core'

// 主要展示页面
import asyncRoutes from './asyncRoutes'

/*
  第一级是最特殊的，全局页面
*/
const basicRoutes = [
  {
    path: '/',
    module: Core,
    children: [...asyncRoutes]
  }
]

export function getModule(routes, filterRoutes = []) {
  routes.map((item) => {
    if (item.children && !item.module && !item.path) {
      return getModule(item.children, filterRoutes)
    } else if (item.module && item.path) {
      filterRoutes.push({
        ...item,
        path: item.path,
        module: lazy(() => import(`@/${item.module}`)),
        children: item.children ? getModule(item.children, []) : null
      })
    }
  })
  return filterRoutes
}

export function renderRoutes(route) {
  return route.map(({ path, children = [], module, params = {} }, index) => {
    const Component = module
    return (
      <Route
        index={path === '/'}
        path={path}
        key={'Route' + index}
        element={Component ? <Component {...params} /> : null}
      >
        {children ? renderRoutes(children) : null}
      </Route>
    )
  })
}
const router = () => {
  return (
    <HashRouter>
      <Routes>
        {basicRoutes.map(({ path, module, children }) => {
          const Module = module
          return (
            <Route
              path={path}
              key={`basic-${path}`}
              element={<Module />}
              // eslint-disable-next-line react/no-children-prop
              children={children && renderRoutes(getModule(children))}
            />
          )
        })}
      </Routes>
    </HashRouter>
  )
}

export default router
