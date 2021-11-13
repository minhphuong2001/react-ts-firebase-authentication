import React, {FC} from 'react'
import { useSelector } from 'react-redux'
import { Redirect, Route, RouteProps } from 'react-router-dom'
import {RootState} from '../../redux/store'

interface Props extends RouteProps {
    component: any
}

const PublicRoute: FC<Props> = ({ component: Component, ...rest }) => {
    const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated)
    
    return (
        <Route
            {...rest}
            render={(props) => !isAuthenticated ? <Component {...props}/> : <Redirect to='/dashboard'/>}
        />
    )
}

export default PublicRoute;