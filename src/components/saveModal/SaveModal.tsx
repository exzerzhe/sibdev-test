/* eslint-disable jsx-a11y/anchor-is-valid */
import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux'
import { HeartOutlined, HeartTwoTone } from '@ant-design/icons'
import { Tooltip } from 'antd'
import { openModal } from '../../actions/openModal'
import { useHistory } from 'react-router-dom'
import React from 'react'
import { RootState } from '../../reducers'
import './style.css'

const SaveModal: React.FC = () => {
  const data = useSelector((state: RootState) => state.data?.data)
  const suffix = useSelector((state: RootState) => state.data?.getSuffix)
  const searchValue = useSelector((state: RootState) => state.data?.searchValue)
  const dispatch = useDispatch()
  const history = useHistory()

  return data ? (
    <div>
      {suffix ? (
        <Tooltip
          placement="bottom"
          defaultVisible
          color="white"
          title={
            <>
              <div>
                <p className="modal-title">
                  Поиск сохранен в разделе "Избранное"
                </p>
              </div>
              <a
                onClick={() => {
                  history.push('/favorites')
                }}
              >
                <p className="modal-link">Перейти в избранное</p>
              </a>
            </>
          }
        >
          <HeartTwoTone twoToneColor="rgba(19, 144, 229, 1)" />
        </Tooltip>
      ) : (
        <a
          onClick={() => {
            dispatch(openModal(searchValue))
          }}
        >
          <HeartOutlined style={{ color: 'rgba(19, 144, 229, 1)' }} />
        </a>
      )}
    </div>
  ) : (
    <span />
  )
}

export default SaveModal
