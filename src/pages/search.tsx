import React, { useState, useEffect } from 'react'
import { Button, Input } from 'antd'
import './search.css'
import SearchVideo from '../components/search/helpers'
import { useSelector } from 'react-redux'
import classnames from 'classnames'
import { UnorderedListOutlined, DatabaseOutlined } from '@ant-design/icons'
import SearchResultsGrid from '../components/search/gridComponent'
import SearchResultsList from '../components/search/listComponent'
import SaveModal from '../components/saveModal/SaveModal'
import { RootState } from '../reducers'
import { LoadingOutlined } from '@ant-design/icons'
import ModalWindow from '../components/modalWindow/modalWindow'

const Search: React.FC = () => {
  const data = useSelector((state: RootState) => state.data?.data)
  const searchValue = useSelector((state: RootState) => state.data?.searchValue)
  const modal = useSelector((state: RootState) => state.data?.modalOpened)
  const fetching = useSelector((state: RootState) => state.data?.isFetching)
  const { Search } = Input
  const [grid, changeGrid] = useState('grid')
  const [width, setWidth] = useState(window.innerWidth)

  useEffect(() => {
    const resize = () => setWidth(window.innerWidth)
    window.addEventListener('resize', resize)
    return () => {
      window.removeEventListener('resize', resize)
    }
  }, [])
  const gridChange = () => {
    if (grid === 'list') {
      if (width > 700) {
        return <SearchResultsList />
      }
    }
    return <SearchResultsGrid />
  }
  const onSearch = (values: string) => SearchVideo(values, 20, 'relevance')
  return (
    <div>
      <div
        className={classnames(
          data && 'container-search-complete',
          'container-search',
          modal && 'container-search-complete-opacity'
        )}
      >
        <div
          className={classnames(
            data && 'search-input-complete',
            'search-input'
          )}
        >
          <h1
            className={classnames(
              data && 'search-title-complete',
              'search-title'
            )}
          >
            Поиск видео
          </h1>
          <Search
            placeholder={data ? searchValue : 'Что хотите посмотреть?'}
            suffix={<SaveModal />}
            enterButton="Найти"
            size="large"
            onSearch={onSearch}
          />
          {data ? (
            <div className="filter-panel">
              Видео по запросу
              <span className="filter-panel-request">
                {'«' + searchValue + '»'}
              </span>
              <span className="filter-panel-request-count">
                {data ? data.pageInfo.totalResults : null}
              </span>
              {width < 780 ? null : (
                <Button
                  onClick={() => changeGrid('list')}
                  shape="circle"
                  className="grid-list"
                  icon={<UnorderedListOutlined />}
                />
              )}
              {width < 780 ? null : (
                <Button
                  onClick={() => changeGrid('grid')}
                  shape="circle"
                  className="grid"
                  icon={<DatabaseOutlined />}
                />
              )}
            </div>
          ) : null}
          {gridChange()}
          <div>
            {fetching ? (
              <div className="loading">
                <LoadingOutlined className="loading-icon" />
              </div>
            ) : null}
          </div>
        </div>
      </div>
      {modal ? (
        <div className="modal-window">
          <ModalWindow />
        </div>
      ) : null}
    </div>
  )
}

export default Search
