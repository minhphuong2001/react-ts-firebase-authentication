import React from 'react'
import { useSelector } from 'react-redux'
import {Redirect, Route, RouteProps} from 'react-router-dom'
import { RootState } from '../../redux/store'

interface Props extends RouteProps {
    component: any
}

export default function PrivateRoute({ component: Component, ...rest }: Props) {

    const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated)
    
  return (  
      <Route
          {...rest}
          render={props => isAuthenticated ? <Component {...props}/> : <Redirect to='/sign-in'/>}
      />
    )
}
