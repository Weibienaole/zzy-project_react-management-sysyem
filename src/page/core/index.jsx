import React, { useLayoutEffect, useRef, useState } from 'react'
import PropsType from 'prop-types'
import { connect } from 'react-redux'
import { useLocation, useNavigate } from 'react-router-dom'
import { CoreContainer } from './style'
import { getUrlData } from '../../utils/index'
import asyncRoutes from '../../router/asyncRoutes'
// import EnterpriseSays from '../../components/EnterpriseSays'
import LeftBar, { returnNavDefaultPath } from './components/LeftBar'
import BreadCrumds from './components/BreadCrumds'
import CoreView from './components/CoreView'
import HeaderBar from './components/HeaderBar'

window.__CORE__ = {}

const headerBarRoutes = [...asyncRoutes]
const Core = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const lefBarRef = useRef()

  const [navRoute, setNavRoute] = useState(null)
  // 默认选中til-header
  const [selectNavIndex, setSelectNavIndex] = useState(-1)

  // 面包屑til
  const [breadCrumdTil, setBreadcrumdTIl] = useState('')

  //  是否显示导航栏
  const [hasNav, setHasNav] = useState(true)

  useLayoutEffect(() => {
    const { isOpen } = getUrlData(location.search)
    if (isOpen === '1') {
      setHasNav(false)
    }
    initWindowMethpds()
  }, [])

  // 路由监听
  useLayoutEffect(() => {
    // nav选中丢失(刷新) 或者 当前路径和实际选中路径不符
    if (selectNavIndex === -1 || navRoute?.path !== location.pathname) {
      fixNavActive()
      // 每次切换页面之后滚动条重置
    }
  }, [location])

  // 初始化全局方法
  const initWindowMethpds = () => {
    // 设置面包屑标题全局函数
    window.__CORE__.breadCrumdSetTitle = (val) => {
      let timer = setTimeout(() => {
        setBreadcrumdTIl(val)
        clearTimeout(timer)
      }, 200)
    }
  }

  // 修复导航选中
  const fixNavActive = (path) => {
    let nowPath = path || location.pathname
    if (nowPath === '/') {
      setSelectNavIndex(0)
      findRouteActive(headerBarRoutes[0])
    } else {
      if (!nowPath.startsWith('/')) nowPath = '/' + nowPath
      const splitPath = nowPath.split('/')[1]
      for (let i = 0; i < headerBarRoutes.length; i++) {
        const headerNavItem = headerBarRoutes[i]
        if (headerNavItem.key === splitPath) {
          setSelectNavIndex(i)
          findRouteActive(headerNavItem)
          break
        }
      }
    }
  }

  // 导航切换
  const switchNav = (nav, index) => {
    if (index === +selectNavIndex) return
    if (!nav.defaultPath) {
      const { firstMenu, firstMenuItem } = findNavActiveSetRoute(
        null,
        nav.children
      )
      navigate(firstMenu.path || firstMenuItem.path)
    } else {
      navigate(nav.defaultPath)
    }
    setSelectNavIndex(index)
  }

  // 存储当前route信息
  const findRouteActive = (nowFatherNav = {}) => {
    const locationPath = location.pathname
    const { menuIndex, itemIndex } = findNavActiveSetRoute(
      locationPath,
      nowFatherNav.children
    )
    const timer = setTimeout(() => {
      lefBarRef.current.update(menuIndex, itemIndex)
      clearTimeout(timer)
    }, 0)
  }

  // 左侧导航栏change
  const leftMenuItemChange = (itemKey) => {
    const nowLeftMenus = headerBarRoutes[selectNavIndex].children
    const path = itemKey.slice(itemKey.lastIndexOf('-') + 1)
    findNavActiveSetRoute(path, nowLeftMenus)
  }

  // 查找到当前匹配路径的route，保存，并返回相关信息
  const findNavActiveSetRoute = (path, menus) => {
    const { firstMenu, firstMenuItem, ...args } = returnNavDefaultPath(
      path,
      menus
    )
    const findRoute = firstMenuItem || firstMenu
    setNavRoute(findRoute)
    if (hasNav) {
      setBreadcrumdTIl(findRoute?.params.name)
    }
    return { firstMenu, firstMenuItem, ...args }
  }
  return (
    <CoreContainer id="Core_Page_Wrapper">
      {/* 顶部栏 */}
      {hasNav && (
        <HeaderBar selectNavIndex={selectNavIndex} switchNav={switchNav} />
      )}
      <div className="coreContentContainer">
        {/* 左侧栏 */}
        {hasNav && (
          <LeftBar
            ref={lefBarRef}
            nowSelectHeaderNavIdx={selectNavIndex.toString()}
            menuItemChange={leftMenuItemChange}
          />
        )}
        <div className="coreContent">
          {/* 面包屑 */}
          <BreadCrumds
            isOpen={hasNav}
            hidden={navRoute?.hidden}
            title={breadCrumdTil}
          />
          {/* 内容 */}
          <div className="coreView">
            <CoreView />
          </div>
          {/* 底部企业信息 */}
          {/* <EnterpriseSays /> */}
        </div>
      </div>
    </CoreContainer>
  )
}

Core.defaultProps = {}

Core.propTypes = {
  themeKey: PropsType.number,
  setThemeKeyDispatch: PropsType.func
}

const mapStateToProps = () => ({})

const mapDispatchToProps = () => ({})

export default connect(mapStateToProps, mapDispatchToProps)(Core)
