import styled from 'styled-components'
import globalSty from '@/utils/global-style'
import { getUrlData } from '../../utils/index'

const minWid = '1260px'

const { isOpen } = getUrlData(window.location.hash)
const occupiedHei = isOpen === '1' ? 0 : 50
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
    height: calc(100vh - ${occupiedHei}px);
    display: flex;
    .coreContent {
      flex: 1;
      height: 100%;
      overflow-y: auto;
      background-color: #f9f9f9;
      .coreView {
        max-width: 1200px;
        margin: 20px auto 0;
        width: 75%;
        min-width: 1000px;
        /* 100% - 面包屑 - 底部声明 - 20px */
        min-height: calc(100% - 90px - 50px - 20px);
        position: relative;
        .loadPageSpin {
          position: absolute;
          left: 50%;
          top: 50%;
          transform: translate(-50%, -50%);
        }
      }
    }
  }
`

export const HeaderBarSty = styled.div`
  width: 100vw;
  min-width: ${minWid};
  height: 50px;
  background-color: ${(props) => props.theme.background};
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
        ${globalSty.defaultFont()};
        color: #ffffff;
        cursor: pointer;
      }
      .active {
        background-color: rgba(255, 255, 255, 0.2);
      }
    }
  }
`

export const LeftBarSty = styled.div`
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
    ${globalSty.defaultFont()};
    color: #999999;
    font-size: 15px;
    background: #f2f2f2;
  }
  .navItem {
    height: 40px;
    ${globalSty.defaultFont()};
  }
  .active {
    background-color: #fff;
    color: rgba(26, 188, 156, 0.8);
  }

  .leftMenuContainer {
    background: none;
    /* 与二级收缩组并列的二级导航 */
    > .ant-menu-item {
      margin-bottom: 0 !important;
      height: 50px;
    }
    .ant-menu-item {
      margin: 0;
      background-color: #eaedf1;
      border-bottom: 1px solid ${globalSty.basicStyle.borderColor};
    }
    .ant-menu-title-content {
      a {
        font-family: 微软雅黑;
        font-weight: 400;
        font-size: 14px;
      }
    }
    .ant-menu-item::after {
      display: none;
    }

    .ant-menu-item a:hover,
    .ant-menu-item-active,
    .ant-menu-item-selected,
    .ant-menu-submenu-selected,
    .ant-menu-item-selected a,
    .ant-menu-item-selected a:hover,
    .ant-menu-submenu:hover > .ant-menu-submenu-title,
    .ant-menu-submenu:hover
      > .ant-menu-submenu-title
      > .ant-menu-submenu-arrow.active,
    .ant-menu-submenu:hover
      > .ant-menu-submenu-title
      > .ant-menu-submenu-expand-icon,
    .ant-menu-submenu:hover
      > .ant-menu-submenu-title
      > .ant-menu-submenu-arrow {
      color: ${globalSty.basicStyle.color} !important;
    }
    .ant-menu-submenu-active{
      color: rgba(0, 0, 0, 0.85);
    }
    .ant-menu-item-selected {
      background-color: #fff !important;
    }

    .ant-menu-submenu {
      .ant-menu-submenu-title {
        height: 50px !important;
        line-height: 50px !important;
        margin: 0;
        background: #f3f3f3;
        img{
          width: 30px;
          height: 30px;
        }
      }
    }
    .ant-menu-inline .ant-menu-item:not(:last-child) {
      margin-bottom: 0;
    }
  }
`

export const BreadCrumdsSty = styled.div`
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
    .navName {
      ${globalSty.defaultFont()};
      color: #999999;
      font-size: 14px;
      padding-left: 5px;
      border-left: 5px solid ${globalSty.basicStyle.color};
    }
    .rig {
      display: flex;
      .breadCrumdsIcon {
        svg {
          width: 15px;
          height: 15px;
          margin-right: 5px;
        }
      }
    }
  }
`
