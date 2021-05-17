import React from 'react'
import { NavLink } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { deleteToken } from '../../actions/tokenDelete'
import './header.css'
import { clearData } from '../../actions/clearData'
import { Button } from 'antd'

const Header: React.FC = () => {
  const dispatch = useDispatch()
  const del = () => {
    dispatch(deleteToken())
    dispatch(clearData())
    localStorage.removeItem('user')
    localStorage.removeItem('token')
  }

  return (
    <header className="header">
      <div className="container">
        <div className="header__wrapper">
          <div className="header__logo">
            <img src="/images/logo.svg" alt="" width={48} height={48} />
          </div>
          <nav className="header__nav">
            <NavLink
              className="nav__link"
              exact
              activeClassName="active"
              to="/"
            >
              Поиск
            </NavLink>
            <NavLink
              className="nav__link"
              activeClassName="active"
              to="/favorites"
            >
              Избранное
            </NavLink>
          </nav>
          <Button onClick={del} className="header__exit">
            Выйти
          </Button>
        </div>
      </div>
    </header>
  )
}
export default Header
