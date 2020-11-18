import React, { useEffect, useState } from 'react'
import { Route, Redirect } from 'react-router-dom'
import { useAuth } from '../Contexts/AuthContext'

export default function PrivateRoute({component: Component, ...rest}) {
    const { currentUser } = useAuth();
    const [loading, setLoading] = useState();

    useEffect(() => {
        if(currentUser){
            setLoading(true)
        } else {
            setLoading(false)
        } 
    },[])
    return (
        <Route 
            {...rest}
            render={props => {
                return currentUser ? <Component {...props}/> : <Redirect to="/Login"/>
            }}
        >
        </Route>
    )
}