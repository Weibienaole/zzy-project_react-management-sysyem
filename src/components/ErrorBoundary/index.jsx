import React, { Component } from 'react'
/*
 错误边界
  1.请在App.js中用此组件将 Route组件包裹即可展示错误之后的UI信息
  2.它在渲染期间、生命周期方法和整个组件树的构造函数中捕获错误
  3.无法捕获 事件处理，异步代码等错误
*/

export default class ErrorBoundary extends Component {
  constructor(props) {
    super(props)
    this.state = {
      hasError: false,
    }
  }
  static getDerivedStateFromError(error) {
    // console.error(error, '更新state 使下一次的UI是降级后的UI')
    return { hasError: true }
  }
  renderCustomErr() {
    return <div>error</div>
   
  }
  render() {
    if (this.state.hasError) {
      return this.renderCustomErr()
    } else {
      return this.props.children
    }
  }
}