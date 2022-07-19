import React, { useEffect, useState } from 'react'
import PropsType from 'prop-types'
import { connect } from 'react-redux'
import { NavLink, Outlet, useLocation, useNavigate } from 'react-router-dom'
import { BreadCrumds, CoreContainer, HeaderBar, LeftBar } from './style'
import { routeList } from '../../router'
import { getUrlData } from '../../api/utils'

let debounceTimer
const headerBarRoutes = routeList[0].children
const Core = () => {
  const navigate = useNavigate()
  const location = useLocation()

  const [navs, setNavs] = useState([])
  const [navRoute, setRouteMsg] = useState(null)
  // 默认选中til-header
  const [selectNavIndex, setSelectNavIndex] = useState(-1)

  //  是否显示导航栏
  const [hasNav, setHasNav] = useState(true)

  useEffect(() => {
    setNavs(headerBarRoutes)
    const { isOpen } = getUrlData(location.search)
    if (isOpen) {
      setHasNav(false)
    }
    window.addEventListener('popstate', browserDebounceFn)
    return () => {
      window.removeEventListener('popstate', browserDebounceFn)
    }
  }, [])

  // 路由监听
  useEffect(() => {
    // nav选中丢失(刷新) 或者 当前路径和实际选中路径不符
    if (
      selectNavIndex === -1 ||
      location.pathname !== headerBarRoutes[selectNavIndex]?.to
    ) {
      fixNavActive()
    }
    // if(location.pathname === '/home/accountSetting'){
    //   console.log('rediect');
    //   navigate('/', {replace: true})
    // }
  }, [location])

  // 浏览器前进后退
  const browserMove = () => {
    const nowPath = window.location.hash.split('#')[1]
    fixNavActive(nowPath)
  }

  const browserDebounceFn = debounce(browserMove, 100)

  // 修复导航选中
  const fixNavActive = (path) => {
    const nowPath = path || location.pathname
    if (nowPath === '/') {
      const findIdx = headerBarRoutes.findIndex((list) => list.to === nowPath)
      setSelectNavIndex(findIdx)
      findRouteActive(null, headerBarRoutes[findIdx])
    } else {
      const splitPath = nowPath.split('/')
      for (let i in headerBarRoutes) {
        if (splitPath.includes(headerBarRoutes[i].key)) {
          setSelectNavIndex(i)
          findRouteActive(null, headerBarRoutes[i], nowPath)
        } else continue
      }
    }
  }

  // 导航切换
  const switchNav = (nav, index) => {
    if (index === +selectNavIndex) return
    navigate(nav.to)
    setSelectNavIndex(index)
    findRouteActive(null, nav)
  }

  // 点击导航item
  const clickNav = (e, nav, path) => {
    if (nav.open) {
      // 禁用默认事件
      e.preventDefault()
      window.open(`${window.location.origin}/#${path}?isOpen=1`)
    } else {
      if (nav?.path || (nav.isDefault && '/') !== navRoute?.path) {
        findRouteActive(nav)
      }
    }
  }

  // 存储当前route信息
  /*
    点击item时有route，直接赋值
    导航切换选择默认的当前导航默认的路径
    刷新是获取最新的路径，进行识别
  */

  const findRouteActive = (route, nowFatherNav = {}, to = nowFatherNav.to) => {
    if (!route) {
      // 先找路径对得上的
      let findNav = nowFatherNav.children.find((r) => r.path === to)
      // 如果找不到就判断是否为首页(首页没有path) 是的话就是首页的默认选择
      if (!findNav && nowFatherNav.to === '/') {
        findNav = nowFatherNav.children.find((r) => r.isDefault)
      }
      route = findNav
    }
    const { path, params, hidden = false } = route
    setRouteMsg({ path, params, hidden })
  }

  const renderHeaderBar = () => {
    return (
      <HeaderBar>
        <div className="leftView">
          <div className="logo">logo</div>
          <div className="navsBox">
            {navs.map((nav, index) => (
              <div
                className={
                  index === +selectNavIndex ? 'navItem active' : 'navItem'
                }
                to={nav.to}
                key={nav.key}
                onClick={() => switchNav(nav, index)}
              >
                {nav.name}
              </div>
            ))}
          </div>
        </div>
        <div className="rightView">rightView</div>
      </HeaderBar>
    )
  }

  const renderLeftBar = () => {
    let selectNavChilds = navs[selectNavIndex]?.children || []

    // 筛选出 留有标题、默认选中、不为/*路径的模块 或者 直接设置hidden(隐藏)的route
    selectNavChilds = selectNavChilds.filter(
      (nav) =>
        !nav.hidden &&
        (nav.isTil || nav.isDefault || nav.path?.indexOf('/*') === -1)
    )
    return (
      <LeftBar>
        {selectNavChilds.map((nav) => (
          <>
            {nav.isTil ? (
              <div className="navTil item">{nav.name}</div>
            ) : (
              <NavLink
                className={({ isActive }) =>
                  isActive ? 'navItem active item' : 'navItem item'
                }
                to={nav.isDefault ? '/' : nav.path}
                key={nav.path || '/'}
                onClick={(e) => clickNav(e, nav, nav.path || '/')}
              >
                <span>· {nav.params.name}</span>
              </NavLink>
            )}
          </>
        ))}
      </LeftBar>
    )
  }

  const renderBreadCrumds = () => {
    return (
      <BreadCrumds>
        <div className="content">
          <div className="lef">
            <span className="navName">{navRoute?.params?.name || ''}</span>
          </div>
          <div className="rig">rig</div>
        </div>
      </BreadCrumds>
    )
  }
  return (
    <CoreContainer>
      {/* 顶部栏 */}
      {hasNav && renderHeaderBar()}
      <div className="coreContentContainer">
        {/* 左侧栏 */}
        {hasNav && renderLeftBar()}
        <div className="coreContent">
          {/* 面包屑 */}
          {renderBreadCrumds()}
          {/* 内容 */}
          <div className="coreView">
            <Outlet />
          </div>
        </div>
      </div>
    </CoreContainer>
  )
}
const debounce = (f, t) => {
  return (...args) => {
    if (debounceTimer) clearTimeout(debounceTimer)
    debounceTimer = setTimeout(() => {
      f && f.apply(this, ...args)
      clearTimeout(debounceTimer)
    }, t)
  }
}

Core.defaultProps = {}

Core.propTypes = {
  history: PropsType.func
}

const mapStateToProps = (state) => ({})

const mapDispatchToProps = (dispatch) => ({})

export default connect(mapStateToProps, mapDispatchToProps)(Core)
