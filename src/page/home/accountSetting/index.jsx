import React, { useEffect, useState } from 'react'
import PropsType from 'prop-types'
import { connect } from 'react-redux'
import { Outlet, useNavigate } from 'react-router-dom'
import { CoreContainer } from './style'

const Core = (props) => {
  const navigate = useNavigate()
  const { history } = props

  useEffect(() => {
    console.log(props, 'acc')
  }, [])

  return (
    <>
      账户设置
 <div onClick={() => navigate('/commodity/addCommodity')}>addCommodity</div>
      {/* <Outlet /> */}
    </>
    // <CoreContainer>
    //   CoreContainer
    // </CoreContainer>
  )
}

Core.defaultProps = {}

Core.propTypes = {
  history: PropsType.func
}

const mapStateToProps = (state) => ({})

const mapDispatchToProps = (dispatch) => ({})

export default connect(mapStateToProps, mapDispatchToProps)(Core)
