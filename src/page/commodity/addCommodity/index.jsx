import React, { useEffect, useState } from 'react'
import PropsType from 'prop-types'
import { connect } from 'react-redux'
import { Outlet, useNavigate } from 'react-router-dom'
import { CommodityContainer } from './style'

const Commodity = (props) => {
  const navigate = useNavigate()
  const { history } = props

  useEffect(() => {
  }, [])

  return (
    <>
      添加商品
      {/* <Outlet /> */}
    </>
    // <CommodityContainer>
    //   CommodityContainer
    // </CommodityContainer>
  )
}

Commodity.defaultProps = {}

Commodity.propTypes = {
  history: PropsType.func
}

const mapStateToProps = (state) => ({})

const mapDispatchToProps = (dispatch) => ({})

export default connect(mapStateToProps, mapDispatchToProps)(Commodity)
