import { Button } from 'antd'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { editRequest } from '../../actions/editRequest'
import { deleteRequest } from '../../actions/deleteRequest'
import { RootState } from '../../reducers'
import ModalWindow from '../modalWindow/modalWindow'
import { fetchLocalData } from '../../actions/fetchLocalData'
import SearchVideo from '../search/helpers'
import { useHistory } from 'react-router-dom'
import './style.css'
import { favoriteRequest } from '../../interfaces/favoritesTypes'
import classnames from 'classnames'

const Favorites: React.FC = () => {
  const currentUser = useSelector(
    (state: RootState) => state.requests?.currentUser
  )
  const dispatch = useDispatch()
  const localdata = useSelector((state: RootState) => state.requests?.requests)
  const modal = useSelector((state: RootState) => state.data?.modalOpened)
  const history = useHistory()
  const [requests, getRequests] = useState([])

  useEffect(() => {
    let localData = localStorage.getItem(currentUser)
    if (localData !== null) {
      dispatch(fetchLocalData(localData))
    }
  }, [currentUser, dispatch])

  useEffect(() => {
    let requests: any = localdata
    getRequests(requests)
  }, [requests, localdata])

  useEffect(() => {
    localStorage.setItem(currentUser, JSON.stringify(requests))
  }, [currentUser, requests])

  const requestEdit = (index: number) => {
    dispatch(editRequest(index))
  }

  const requestDelete = (index: number) => {
    dispatch(deleteRequest(index))
  }

  const requestDo = (
    requestvalue: string,
    maxresults: number,
    sort: string
  ) => {
    SearchVideo(requestvalue, maxresults, sort)
    history.push('/')
  }
  return (
    <div className="requests">
      <div className={classnames(modal && 'container-search-complete-opacity')}>
        <h2 className="requests__title">Избранное</h2>
        <div className="requests__container">
          {requests?.map((item: favoriteRequest, index: number) => (
            <div className="requests__name" key={index}>
              {item.requestname}
              <div className="requests__buttons">
                <Button
                  type="link"
                  onClick={() =>
                    requestDo(item.requestvalue, item.maxresults, item.sort)
                  }
                >
                  Выполнить
                </Button>
                <Button type="link" onClick={() => requestEdit(index)}>
                  Редактировать
                </Button>
                <Button type="link" onClick={() => requestDelete(index)}>
                  Удалить
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
      {modal ? (
        <div className="modal-window">
          <ModalWindow />
        </div>
      ) : null}
      {requests.length !== 0 ? null : (
        <div className="requests__container">Здесь пока пусто!</div>
      )}
    </div>
  )
}

export default Favorites
