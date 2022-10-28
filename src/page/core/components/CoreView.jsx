import React, { Suspense } from 'react'
import { Outlet } from 'react-router-dom'
import { Spin } from 'antd'

const CoreView = () => (
  <Suspense
    fallback={<Spin className="loadPageSpin" tip="加载中..." size="large" />}
  >
    <Outlet />
  </Suspense>
)

export default CoreView
