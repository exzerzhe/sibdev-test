import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux'
import { RootState } from '../../reducers'
import {
  Input,
  Select,
  Slider,
  InputNumber,
  Row,
  Col,
  Button,
  Form,
} from 'antd'
import './style.css'
import { closeModal } from '../../actions/closeModal'
import { saveRequest } from '../../actions/saveRequest'
import { saveEditedRequest } from '../../actions/saveEditedRequest'
import { modalWindowValues } from '../../interfaces/modalWindowTypes'

const ModalWindow: React.FC = () => {
  const searchValue = useSelector((state: RootState) => state.data?.searchValue)
  const requests = useSelector((state: RootState) => state.requests?.requests)
  const index = useSelector((state: RootState) => state.requests?.index)
  const currentUser = useSelector(
    (state: RootState) => state.requests.currentUser
  )
  const [sliderValue, increaseSliderValue] = useState(1)
  const dispatch = useDispatch()
  const [form] = Form.useForm()
  const { Option } = Select
  const [width, setWidth] = useState(window.innerWidth)

  useEffect(() => {
    const resize = () => setWidth(window.innerWidth)
    window.addEventListener('resize', resize)
    return () => {
      window.removeEventListener('resize', resize)
    }
  }, [])

  const increaseNum = (value: any) => {
    increaseSliderValue(value)
  }

  useEffect(() => {
    localStorage.setItem(currentUser, JSON.stringify(requests))
  }, [currentUser, requests])

  const onFinish = (values: modalWindowValues) => {
    if (index !== '') {
      dispatch(saveEditedRequest(values, index))
      localStorage.setItem(currentUser, JSON.stringify(requests))
      dispatch(closeModal())
    } else {
      dispatch(saveRequest(values))
      dispatch(closeModal())
    }
  }

  const onReset = () => {
    dispatch(closeModal())
  }
  return (
    <div className="modalWindow">
      <Form
        layout="vertical"
        form={form}
        name="control-hooks"
        onFinish={onFinish}
      >
        <h2 className="modalWindowTitle">Сохранить запрос</h2>
        <Form.Item
          initialValue={
            index !== '' ? requests[index].requestvalue : searchValue
          }
          name="requestvalue"
          label="Запрос"
        >
          <Input size="large" placeholder={searchValue} />
        </Form.Item>
        <Form.Item
          initialValue={index !== '' ? requests[index].requestname : ''}
          name="requestname"
          label="Название"
          rules={[{ required: true, message: 'Введите название запроса' }]}
        >
          <Input size="large" />
        </Form.Item>
        <Form.Item
          name="sort"
          initialValue={index !== '' ? requests[index].sort : 'relevance'}
          label="Сортировать по:"
        >
          <Select size="large" style={{ width: '100%' }}>
            <Option value="date">Дате</Option>
            <Option value="rating">Рейтингу</Option>
            <Option value="relevance">Релевантности</Option>
            <Option value="title">Заголовку</Option>
            <Option value="videoCount">Количеству видео</Option>
            <Option value="viewCount">Просмотрам</Option>
          </Select>
        </Form.Item>
        <Row>
          <Col span={width < 600 ? 13 : 18}>
            <Form.Item
              name="maxresults"
              initialValue={index !== '' ? requests[index].maxresults : '20'}
              label="Максимальное количество"
            >
              <Slider
                min={1}
                max={20}
                onChange={increaseNum}
                value={sliderValue}
              />
            </Form.Item>
          </Col>
          <Col span={width < 600 ? 10 : 3}>
            <Form.Item name="maxresults">
              <InputNumber
                className="input-number"
                min={1}
                max={20}
                value={sliderValue}
                onChange={increaseNum}
              />
            </Form.Item>
          </Col>
        </Row>
        <div className="modalButtons">
          <Form.Item className="modalButtonItem">
            <Button onClick={onReset} size="large" className="buttons">
              Отмена
            </Button>
          </Form.Item>
          <Form.Item className="modalButtonItem">
            <Button
              htmlType="submit"
              size="large"
              className="buttons"
              type="primary"
            >
              Сохранить
            </Button>
          </Form.Item>
        </div>
      </Form>
    </div>
  )
}

export default ModalWindow
