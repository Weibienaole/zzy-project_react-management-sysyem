// 扩大可点击区域
const extendClick = () => {
  return `
    position: relative
    &:before {
      content: '';
      position: absolute;
      top: -10px;
      bottom: -10px;
      right: -10px;
      left: -10px;
    }
  `
}

const noWrap = () => {
  return `
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
  `
}

const noWraps = (line = 2) => {
  return `
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: ${line};
    overflow: hidden;
  `
}

const bgFull = () => {
  return `
    background-position: 50%;
    background-size: auto;
    background-repeat: no-repeat;
  `
}

const positionCenter = () => {
  return `
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
  `
}

// 固定地步横占80%左右的大按钮
const bottomBtn = () => {
  return`
    width: 42.5rem;
    height: 5rem;
    background: #2578f5;
    box-shadow: 0rem 0.13rem 0.5rem 0rem rgba(0, 0, 0, 0.04);
    border-radius: 0.13rem;
    position: fixed;
    bottom: 2.25rem;
    left: 50%;
    transform: translate(-50%, 0);
    font-size: 1.75rem;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: #ffffff;
    display: flex;
    align-items: center;
    justify-content: center;
  `
}

const flexCenter = () => {
  return`
    display: flex;
    align-items: center;
    justify-content: center;
  `
}

const defaultFont = () => {
  return `
  `
}

const basicStyle = {
  borderColor: '#e4e4e4'
}

const globalSty = {
  basicStyle,
  extendClick,
  noWrap,
  noWraps,
  bgFull,
  positionCenter,
  bottomBtn,
  flexCenter,
  defaultFont
}

export default globalSty
