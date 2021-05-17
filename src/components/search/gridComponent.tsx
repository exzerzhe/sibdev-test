import React, { useEffect, useState } from 'react'
import './search.css'
import { useSelector } from 'react-redux'
import { Row, Col } from 'antd'
import { Card } from 'antd'
import { sliceText } from './conversion'
import { conversion } from './conversion'
import { RootState } from '../../reducers'
import { IsearchResults } from '../../interfaces/searchResultsTypes'

const SearchResultsGrid: React.FC = () => {
  const data = useSelector((state: RootState) => state.data?.data)
  const fetching = useSelector((state: RootState) => state.data?.isFetching)
  const [width, setWidth] = useState(window.innerWidth)
  const { Meta } = Card
  useEffect(() => {
    const resize = () => setWidth(window.innerWidth)
    window.addEventListener('resize', resize)
    return () => {
      window.removeEventListener('resize', resize)
    }
  }, [])

  if (data && !fetching) {
    return (
      <div className="grid-container">
        <Row gutter={[20, 40]}>
          {data.items.map((item: IsearchResults, key: string) => {
            return (
              <Col
                key={key}
                span={width > 780 ? 6 : width < 350 ? 40 : 12}
                style={{ padding: '0px 5px' }}
              >
                <a
                  href={`https://www.youtube.com/watch?v=${item.id.videoId}`}
                  target="_blank"
                  rel="noreferrer noopener"
                >
                  <Card
                    className="grid-container__item"
                    size="small"
                    hoverable
                    cover={
                      <img
                        alt="example"
                        src={item.snippet.thumbnails.medium.url}
                      />
                    }
                  >
                    <Meta
                      title={sliceText(
                        item.snippet.title,
                        width > 1400 ? 50 : 30
                      )}
                      description={
                        <>
                          <div>{sliceText(item.snippet.channelTitle, 20)}</div>
                          <div>{conversion(item.statistic.viewCount)}</div>
                        </>
                      }
                    />
                  </Card>
                </a>
              </Col>
            )
          })}
        </Row>
      </div>
    )
  }
  return null
}
export default SearchResultsGrid
