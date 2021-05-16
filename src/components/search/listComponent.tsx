import React from 'react'
import '../../pages/search.css'
import { useSelector } from 'react-redux'
import { Row, Col } from 'antd'
import { Card } from 'antd'
import { conversion } from './conversion'
import { RootState } from '../../reducers'
import { IsearchResults } from '../../interfaces/searchResultsTypes'

const SearchResultsList: React.FC = () => {
  const data = useSelector((state: RootState) => state.data?.data)
  const { Meta } = Card

  if (data) {
    return (
      <Row>
        {data.items.map((item: IsearchResults, key: string) => {
          return (
            <Col key={key} span={18}>
              <a
                href={`https://www.youtube.com/watch?v=${item.id.videoId}`}
                target="_blank"
                rel="noreferrer noopener"
              >
                <Card
                  className="cards-list"
                  size="small"
                  hoverable
                  bordered={false}
                >
                  <Meta
                    style={{ color: 'red' }}
                    avatar={
                      <img
                        alt=""
                        style={{ maxWidth: 160 }}
                        src={item.snippet.thumbnails.medium.url}
                      />
                    }
                    title={item.snippet.title}
                    description={
                      <>
                        <div>{item.snippet.description}</div>
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
    )
  }
  return null
}

export default SearchResultsList
