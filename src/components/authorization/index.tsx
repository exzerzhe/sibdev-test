import React from 'react'
import { Form, Input, Button } from 'antd'
import 'antd/dist/antd.css'
import './authorization.css'
import { logIn } from './helpers'
import { useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { RootState } from '../../reducers'

const Authorization: React.FC = () => {
  const history = useHistory()
  const wrongUser = useSelector((state: RootState) => state.auth?.wrongUser)
  useEffect(() => {
    if (localStorage.getItem('token')) {
      history.push('/')
    }
  })
  return (
    <div className="login">
      <Form
        className="login-form"
        layout="vertical"
        name="basic"
        onFinish={logIn}
      >
        <img className="login-logo" alt="" src="/images/logo.svg" />
        <p className="login-title">Вход</p>
        {wrongUser ? (
          <p className="wrong-user">Неправильный логин или пароль</p>
        ) : null}
        <Form.Item
          rules={[{ required: true, message: 'Введите ваш логин!' }]}
          label="Логин"
          name="username"
        >
          <Input />
        </Form.Item>

        <Form.Item
          rules={[{ required: true, message: 'Введите ваш пароль!' }]}
          label="Пароль"
          name="password"
        >
          <Input.Password />
        </Form.Item>

        <Form.Item style={{ textAlign: 'center' }}>
          <Button
            className="login-button"
            type="primary"
            size="large"
            htmlType="submit"
          >
            Войти
          </Button>
        </Form.Item>
      </Form>
    </div>
  )
}

export default Authorization
