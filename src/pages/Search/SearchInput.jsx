import './css/SearchInput.scss'
import { useState } from 'react'
import searchTab from '/src/api/searchTab.json'

const SearchInput = () => {
  // 父级分类
  const [activeTab, setActiveTab] = useState('zhannei')
  // 子级分类
  const [activeItem, setActiveItem] = useState(0)
  // 搜索框内容
  const [searchValue, setSearchValue] = useState('')

  // 选择父级分类
  const handleSelectTab = (id) => {
    setActiveTab(id)
    handleSelectItem(0)
  }

  // 选择子级分类
  const handleSelectItem = (index) => {
    setActiveItem(index)
    setSearchValue('')
  }

  // 搜索
  const search = () => {
    if (!searchValue) {
      return
    }
    window.open(
      searchTab.find((item) => item.id === activeTab).list[activeItem].action +
        searchValue
    )
  }

  return (
    <div>
      <div className="search-list">
        {searchTab.map((item) => (
          <input
            id={item.id}
            type="radio"
            name="listmenu"
            className="list-select"
            checked={activeTab === item.id}
            onChange={() => handleSelectTab(item.id)}
            key={item.id}
          />
        ))}
        <div className="buttons">
          {searchTab.map((item) => (
            <label htmlFor={item.id} key={item.id}>
              <div>{item.name}</div>
            </label>
          ))}
          <div className="anchor"></div>
        </div>
      </div>

      <div className="search-input">
        <input
          type="text"
          id="search-input"
          placeholder={
            searchTab.find((item) => item.id === activeTab).list[activeItem]
              .placeholder
          }
          value={searchValue}
          autoComplete="off"
          onChange={(e) => setSearchValue(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              search()
            }
          }}
        />
        <button id="search-btn" onClick={() => search()}>
          <i className="iconfont icon-search"></i>
        </button>
      </div>

      <div className="search-item">
        <ul className="search-group">
          <li className="group">
            {searchTab
              .find((item) => item.id === activeTab)
              .list.map((item, index) => (
                <input
                  id={item.id}
                  type="radio"
                  name="itemmenu"
                  className="item-select"
                  key={item.id}
                  checked={activeItem === index}
                  onChange={() => handleSelectItem(index)}
                />
              ))}
            <div className="buttons">
              {searchTab
                .find((item) => item.id === activeTab)
                .list.map((item, index) => (
                  <label htmlFor={item.id} key={item.id}>
                    <div data-id={index}>{item.name}</div>
                  </label>
                ))}
            </div>
          </li>
        </ul>
      </div>
    </div>
  )
}

export default SearchInput
