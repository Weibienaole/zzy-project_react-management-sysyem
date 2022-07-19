import styled from 'styled-components'
import globalSty from '@/api/global-style'

const minWid = '1080px'

export const CoreContainer = styled.div`
  min-width: ${minWid};
  width: 100vw;
  max-width: 100vw;
  min-height: 100vh;
  max-height: 100vh;
  background-color: #fff;
  overflow: hidden;
  position: relative;
  .coreContentContainer {
    width: 100%;
    height: calc(100vh - 50px);
    display: flex;
    .coreContent {
      flex: 1;
      height: 100%;
      .coreView {
        max-width: 1200px;
        margin: 0 auto;
        width: 75%;
        min-width: 750px;
        height: calc(100% - 50px);
        overflow-y: auto;
        position: relative;
      }
    }
  }
`

export const HeaderBar = styled.div`
  width: 100vw;
  min-width: ${minWid};
  height: 50px;
  background-color: #3498db;
  display: flex;
  justify-content: space-between;
  .leftView {
    display: flex;
    .logo {
      width: 180px;
      height: 100%;
    }
    .navsBox {
      height: 100%;
      display: flex;
      .navItem {
        width: 60px;
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        font-family: '微软雅黑';
        font-weight: 400;
        font-style: normal;
        font-size: 13px;
        color: #ffffff;
        cursor: pointer;
      }
      .active {
        background-color: rgba(255, 255, 255, 0.2);
      }
    }
  }
  .rightView {
    width: 420px;
    height: 100%;
    display: flex;
  }
`

export const LeftBar = styled.div`
  width: 180px;
  height: 100%;
  background-color: #eaedf1;
  overflow-y: auto;
  position: relative;
  display: flex;
  flex-direction: column;
  border-right: 1px solid ${globalSty.basicStyle.borderColor};
  .item {
    display: flex;
    align-items: center;
    padding-left: 30px;
    border-bottom: 1px solid ${globalSty.basicStyle.borderColor};
  }
  .navTil {
    height: 50px;
    font-family: '微软雅黑';
    font-weight: 400;
    font-style: normal;
    color: #999999;
    font-size: 15px;
    background: #f2f2f2;
  }
  .navItem {
    height: 40px;
    font-family: '微软雅黑';
    font-weight: 410;
    font-style: normal;
    font-size: 12px;
    color: #666666;
  }
  .active {
    background-color: #fff;
    color: rgba(26, 188, 156, 0.8);
  }
`

export const BreadCrumds = styled.div`
  height: 50px;
  width: 100%;
  background: #f3f3f3;
  border-bottom: 1px solid ${globalSty.basicStyle.borderColor};
  .content {
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 100%;
    max-width: 1200px;
    margin: 0 auto;
    width: 75%;
    min-width: 750px;
  }
`
