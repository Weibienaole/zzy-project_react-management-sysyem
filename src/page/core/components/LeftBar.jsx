import React, {
  useState,
  useLayoutEffect,
  forwardRef,
  useImperativeHandle
} from 'react'
import PropsType from 'prop-types'
import { Menu } from 'antd'
import { LeftBarSty } from '../style'
import asyncRoutes from '../../../router/asyncRoutes'

// 所有可用的route转换为menu形态list
let allMenus = []

const LeftBar = forwardRef((props, ref) => {
  const { nowSelectHeaderNavIdx, menuItemChange } = props
  const [menuLists, setMenuLists] = useState([])
  const [openKey, setOpenKey] = useState([])
  const [selectedKey, setSelectedKey] = useState([])
  useLayoutEffect(() => {
    let selectNav = asyncRoutes[nowSelectHeaderNavIdx]
    if (selectNav?.children.length) {
      const generateMenu = generateMenuItemLists(selectNav.children)
      allMenus = generateMenu
      const filterMenu = filterNoHiddenMenu(generateMenu)
      const { firstMenu, firstMenuItem } = returnNavDefaultPath(
        selectNav.defaultPath,
        filterMenu
      )
      if (!firstMenu || (!firstMenuItem && !firstMenu.path)) {
        throw Error(
          '未检索到可用地址，请检查路由文件是否正确，亦或者请设置当前导航的默认地址！'
        )
      }
      // path有值说明是一个导航，不能展开，则不进行展开，没有就说明是一个可展开的，赋值key
      setOpenKey([firstMenu.path ? null : firstMenu.key])
      setSelectedKey([firstMenu.path ? firstMenu.key : firstMenuItem.key])
      setMenuLists(filterMenu)
    }
  }, [nowSelectHeaderNavIdx])
  // 生成menu组件可用结构
  const generateMenuItemLists = (menu) => {
    const menuItems = []
    for (let i = 0; i < menu.length; i++) {
      const {
        name,
        path,
        defaultPath,
        children = null,
        params,
        icon = null,
        hidden = false,
        open = false
      } = menu[i]
      const n = name || params.name
      menuItems.push({
        key: `${asyncRoutes[nowSelectHeaderNavIdx]?.key || 'home'}-${i}-${
          path || 'group'
        }`,
        label: children ? (
          <span>{n}</span>
        ) : (
          <a
            rel="nofollow noopener noreferrer"
            href={`#${defaultPath || path}`}
            target={open ? '_blank' : '_self'}
          >
            {n}
          </a>
        ),
        children: children ? generateMenuItemLists(children) : null,
        icon,
        path,
        hidden
      })
    }
    return menuItems
  }
  // 对外暴露的方法
  useImperativeHandle(ref, () => ({
    update(menuIndex, itemIndex) {
      // 这里需要的路由数组得是包含hidden的，与core的路由文件结构和数据保持一致
      const targetMenu = allMenus[menuIndex]
      if (typeof itemIndex === 'number') {
        setOpenKey([targetMenu.key])
        setSelectedKey([targetMenu.children[itemIndex].key])
      } else {
        setOpenKey([])
        setSelectedKey([targetMenu.key])
      }
    }
  }))
  return (
    <LeftBarSty>
      <Menu
        className="leftMenuContainer"
        openKeys={openKey}
        selectedKeys={selectedKey}
        mode="inline"
        items={menuLists}
        // 如果伸拉缩只存在一个，就按如下逻辑进行，反之全量赋值 keys
        onOpenChange={(keys) =>
          setOpenKey(([lastKey]) => keys.filter((it) => it !== lastKey))
        }
        onSelect={({ key, keyPath }) => {
          menuItemChange(...keyPath)
          setSelectedKey([key])
        }}
      />
    </LeftBarSty>
  )
})

LeftBar.defaultProps = {}

LeftBar.propTypes = {
  nowSelectHeaderNavIdx: PropsType.number,
  menuItemChange: PropsType.func
}

export default LeftBar

// 筛除hidden路由
const filterNoHiddenMenu = (list) => {
  const notHiddenMenuList = []
  for (let i = 0; i < list.length; i++) {
    const item = list[i]
    if (!item.hidden) {
      notHiddenMenuList.push({
        ...item,
        children: item.children ? filterNoHiddenMenu(item.children) : null
      })
    }
  }
  return notHiddenMenuList
}

// 返回当前路由默认选择地址
export const returnNavDefaultPath = (target, menus) => {
  if (target) {
    // 有值就找到当前当前列表复合规则的那项
    let obj = {}
    const purePath = target.split('?')[0]
    for (let i = 0; i < menus.length; i++) {
      const menu = menus[i]
      if (menu.path && !menu.children?.length) {
        if (menu.path === target) {
          obj = {
            firstMenu: menu,
            menuIndex: i,
            firstMenuItem: null,
            itemIndex: null
          }
          break
        } else {
          continue
        }
      }
      for (let j = 0; j < menu.children.length; j++) {
        const menuItem = menu.children[j]
        if (menuItem.path === purePath) {
          obj = {
            firstMenu: menu,
            menuIndex: i,
            firstMenuItem: menuItem,
            itemIndex: j
          }
          break
        }
      }
    }
    return obj
  } else {
    // 没有默认值，指定第一个可用path
    const firstMenu = menus[0]
    let firstMenuItem, itemIndex
    if (!firstMenu.path && firstMenu.children?.length) {
      firstMenuItem = firstMenu.children[0]
      itemIndex = 0
    }
    return { firstMenu, menuIndex: 0, firstMenuItem, itemIndex }
  }
}
