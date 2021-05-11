import React                  from 'react'
import { Switch }             from 'react-router-dom'
import AppliedRoute           from './components/AppliedRoute'
import Home                   from './containers/Home'
import Login                  from './containers/Login'
import Signup                 from './containers/Signup'
import NotFound               from './containers/NotFound'
import AcceptCredentials from './containers/AcceptCredentials'

export default function Routes({ appProps }) {
  return (
    <Switch>
      <AppliedRoute path='/' exact component={Home} appProps={appProps} />
      <AppliedRoute path='/login' exact component={Login} appProps={appProps} />
      <AppliedRoute path='/signup' exact component={Signup} appProps={appProps} />
      <AppliedRoute path='/accept-credentials' exact component={AcceptCredentials} appProps={appProps} />
      <AppliedRoute component={NotFound} />
    </Switch>
  )
}
