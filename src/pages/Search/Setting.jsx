import './css/Setting.scss'
import { useState } from 'react'
import { useSettingStore } from '/src/store'
import { Button, Input, message, Tooltip, Switch } from 'antd'
import {
  RightOutlined,
  DeleteOutlined,
  InfoCircleOutlined
} from '@ant-design/icons'

const Setting = ({ switchWallpaper }) => {
  const {
    isOpen,
    setIsOpen,
    wallpapers,
    currentIndex,
    setCurrentIndex,
    showWeather,
    setShowWeather
  } = useSettingStore()
  const [webImage, setWebImage] = useState('')

  // 关闭设置菜单
  const closeSetting = () => {
    setIsOpen(false)
  }

  // 添加网络壁纸
  const handleWebImage = () => {
    if (!webImage) {
      message.error('图片网址不能为空')
      return
    }
    wallpapers.push(webImage)
    setCurrentIndex(wallpapers.length - 1)
    localStorage.setItem('currentIndex', wallpapers.length - 1)
    localStorage.setItem('wallpapers', JSON.stringify(wallpapers))
    message.success('添加成功')
    setWebImage('')
  }

  // 删除壁纸
  const handleDelete = (index) => {
    if (wallpapers.length < 4) {
      message.error('最少保留3张壁纸')
      return
    }
    wallpapers.splice(index, 1)
    setCurrentIndex(currentIndex >= wallpapers.length ? 0 : currentIndex)
    localStorage.setItem('currentIndex', currentIndex)
    localStorage.setItem('wallpapers', JSON.stringify(wallpapers))
  }

  return (
    <div className={`setting-menu ${isOpen ? 'open-set' : 'close-set'}`}>
      <div className={`menu-list ${isOpen ? 'open-set' : 'close-set'}`}>
        <div className="top">
          <div className="set-title">
            <span className="iconfont icon-setting"></span>
            <span>设置</span>
          </div>
          <div className="set-close-btn" onClick={closeSetting}>
            <div className="iconfont icon-close"></div>
          </div>
        </div>
        <div className="content">
          <div className="set-item">
            <div className="set-item-header">
              <div className="set-item-title">壁纸设置</div>
              <div className="set-item-btn">
                <Button
                  icon={<RightOutlined />}
                  onClick={switchWallpaper}
                ></Button>
              </div>
            </div>
            <div className="set-item-content">
              <div className="image-select">
                {[-1, 0, 1].map((item) => (
                  <div
                    key={item}
                    className={`image-preview ${item === 0 ? 'active' : ''}`}
                    style={{
                      backgroundImage: `url(${
                        item < 0
                          ? wallpapers[
                              currentIndex === 0
                                ? wallpapers.length - 1
                                : currentIndex + item
                            ]
                          : wallpapers[
                              (currentIndex + item) % wallpapers.length
                            ]
                      })`
                    }}
                  >
                    <div className="image-preview-mask">
                      <Button
                        color="danger"
                        variant="solid"
                        shape="circle"
                        icon={<DeleteOutlined />}
                        onClick={() => handleDelete(currentIndex + item)}
                      ></Button>
                    </div>
                  </div>
                ))}
              </div>
              <div className="image-web">
                <Input.Search
                  value={webImage}
                  placeholder="输入图片网址"
                  enterButton="应用"
                  suffix={
                    <Tooltip title="将图片链接复制到此处">
                      <InfoCircleOutlined
                        style={{ color: 'rgba(0,0,0,0.45)' }}
                      />
                    </Tooltip>
                  }
                  onChange={(e) => setWebImage(e.target.value)}
                  onSearch={handleWebImage}
                />
              </div>
            </div>
          </div>
          <div className="set-item">
            <div className="set-item-header">
              <div className="set-item-title">布局设置</div>
            </div>
            <div className="set-item-content">
              <div className="option">
                <div className="option-title">天气卡片</div>
                <div className="option-switch">
                  <Switch
                    checked={showWeather}
                    onChange={() => setShowWeather(!showWeather)}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="bottom">
          <div className="loadingspinner">
            <div id="square1"></div>
            <div id="square2"></div>
            <div id="square3"></div>
            <div id="square4"></div>
            <div id="square5"></div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Setting
