import React from 'react'
import { Button, Typography } from 'antd'
import './header.css'
import { Link, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import { logout } from '../../redux/actions/authActions';

const { Title } = Typography;

export default function Header() {
    const history = useHistory();
    const dispatch = useDispatch();
    const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated)

    const handlelogout = () => {
        dispatch(logout())
    }
    
    return (
        <div className='header'>
            <div className="header-left">
                <Link to={!isAuthenticated ? '/' : '/dashboard'}>
                    <Title level={3}>Firebase Authentication</Title>
                </Link>
            </div>
            <div className="header-right">
                {
                    !isAuthenticated ? <>
                        <Button
                            style={{ marginRight: 10 }}
                            onClick={() => history.push('/sign-in')}
                        >
                            Sign in
                        </Button>
                        <Button
                            onClick={() => history.push('/sign-up')}
                        >
                            Sign up
                        </Button>
                    </> : <>
                            <Button onClick={handlelogout}>
                                Sign out
                            </Button>
                    </>
                }
            </div>
        </div>
    )
}
