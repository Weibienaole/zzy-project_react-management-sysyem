import React from 'react'
import PropsType from 'prop-types'
import { HeaderBarSty } from '../style'
import { connect } from 'react-redux'
import { setThemeKey } from '../store/actionCreators'
import asyncRoutes from '../../../router/asyncRoutes'

const HeaderBar = (props) => {
  const { selectNavIndex } = props
  const { switchNav } = props
  return (
    <HeaderBarSty>
      <div className="leftView">
        <div className="logo">logo</div>
        <div className="navsBox">
          {asyncRoutes.map((nav, index) => (
            <div
              className={
                index === +selectNavIndex ? 'navItem active' : 'navItem'
              }
              key={nav.key}
              onClick={() => switchNav(nav, index)}
            >
              {nav.name}
            </div>
          ))}
        </div>
      </div>
      <div className="rightView">rightView</div>
    </HeaderBarSty>
  )
}

HeaderBar.defaultProps = {}

HeaderBar.propTypes = {
  selectNavIndex: PropsType.string,
  switchNav: PropsType.func
}

export default HeaderBar
