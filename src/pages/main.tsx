import React from 'react'
import { Route } from 'react-router-dom'
import Favorites from '../components/favorites/index'
import Header from '../components/header/index'
import Search from './search'

const Main: React.FC = () => (
  <>
    <Header />
    <Route path="/" exact component={Search} />
    <Route path="/favorites" component={Favorites} />
  </>
)
export default Main
