import React, { useEffect } from 'react';
import { BrowserRouter as Router, Switch } from 'react-router-dom';
import './App.css';
import PrivateRoute from './components/auth/PrivateRoute';
import PublicRoute from './components/auth/PublicRoute';
import Header from './components/header/Header';
import Home from './components/pages/Home';
import Login from './components/pages/Login';
import Register from './components/pages/Register';
import Dashboard from './components/pages/Dashboard';
import firebase from './firebase/config';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from './redux/store';
import { getUserById, setLoading } from './redux/actions/authActions';
import Loading from './components/loading/Loading';
import ForgotPassword from './components/pages/ForgotPassword';

function App() {
  const dispatch = useDispatch();
  const isLoading  = useSelector((state: RootState) => state.auth.isLoading)
  

  useEffect(() => {
    dispatch(setLoading(true))
    
    const getUser = firebase.auth().onAuthStateChanged(async (user) => {
      console.log(user);
      
      if (user) {
        dispatch(setLoading(true))
        await dispatch(getUserById(user.uid))
      }

      dispatch(setLoading(false))
    })

    return () => {
      getUser()
    }
  }, [dispatch]);

  if (isLoading) {
    return (
      <Loading/>
    )
  }

  return (
    <div className='App'>
      <Router>
        <Header/>
        <Switch>
          <PublicRoute path='/' component={Home} exact/>
          <PublicRoute path='/sign-in'  component={Login} />
          <PublicRoute path='/sign-up' component={Register}  />
          <PublicRoute path='/forgot-password' component={ForgotPassword} />
          <PrivateRoute path='/dashboard' component={Dashboard} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
