import React from 'react'
import PropsType from 'prop-types'
import { BreadCrumdsSty } from '../style'
import { useNavigate } from 'react-router-dom'

const BreadCrumds = (props) => {
  const { isOpen, title, hidden } = props
  const navigate = useNavigate()
  return (
    <BreadCrumdsSty>
      <div className="content">
        <div className="lef">
          <span className="navName">{title}</span>
        </div>
        <div className="rig">{/* 按钮组 */}</div>
      </div>
    </BreadCrumdsSty>
  )
}

BreadCrumds.defaultProps = {
  hidden: false,
  isOpen: false
}

BreadCrumds.propTypes = {
  isOpen: PropsType.bool,
  title: PropsType.string,
  hidden: PropsType.bool
}

export default BreadCrumds
