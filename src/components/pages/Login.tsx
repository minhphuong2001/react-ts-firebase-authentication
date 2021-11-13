import React, { useEffect, useState } from 'react'
import { Button, Row, Col, Typography } from 'antd'
import InputField from '../InputField';
import { Link } from 'react-router-dom';
import firebase from '../../firebase/config'
import { useDispatch, useSelector } from 'react-redux';
import { login, setError } from '../../redux/actions/authActions';
import { RootState } from '../../redux/store';
import Message from '../message/Message';

const { Title } = Typography;

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const dispatch = useDispatch();
    const error = useSelector((state: RootState) => state.auth.error)

    useEffect(() => {
        dispatch(setError(''))
    }, [dispatch])

    const handleSubmit = (e: any) => {
        e.preventDefault();

        if (error) {
            dispatch(setError(''))
        }

        dispatch(login({ email, password }))
        setEmail('');
        setPassword('');
    }

    const ggProvider = new firebase.auth.GoogleAuthProvider();
    
    const handleLoginWithGG = async() => {
        const { additionalUserInfo, user } = await firebase.auth().signInWithPopup(ggProvider);

        if (additionalUserInfo?.isNewUser) {
            firebase.firestore().collection('users').add({
                username: user?.displayName,
                email: user?.email,
                uid: user?.uid,
                photoUrl: user?.photoURL,
                providerId: additionalUserInfo.providerId
            })
        }
    }

    return (
        <div style={{paddingTop: 100}}>
            <Title level={2} style={{textAlign: 'center'}}>Sign In</Title>
            <form onSubmit={handleSubmit}>
                {error && <Message message={error} type='error'/>}
                <InputField
                    name='email'
                    label='Email'
                    placeholder='Enter email'
                    type='email'
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <InputField
                    name='password'
                    label='Password'
                    placeholder='Enter password'
                    type='password'
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <div style={{marginBottom: '10px', marginLeft: 512, display: 'flex'}}>
                    <Link to='/forgot-password'>
                        <span style={{ color: '#1f94ff', cursor: 'pointer' }}>
                            Forgot password
                        </span>
                    </Link>
                    <div style={{marginLeft: 220}}>
                        <span style={{ marginRight: 10 }}>Do you an account?</span>
                        <Link to='/sign-up' >
                            <span style={{ color: '#1f94ff', fontWeight: 600, cursor: 'pointer'}}>Sign Up</span>
                        </Link>
                    </div>
                </div>
                <Row justify='center'>
                    <Col xs={8}>
                        <Button
                            type='primary'
                            style={{ width: '100%', marginBottom: "20px" }}
                            htmlType='submit'
                            disabled={email || password ? false : true}
                        > 
                            Sign In
                        </Button>
                    </Col>
                </Row>
            </form>

            <Title level={5} style={{ textAlign: 'center'}}>Or</Title>
            <Row justify='center'>
                <Col xs={8}>
                    <Button
                        type='primary'
                        style={{ width: '100%', marginTop: "20px" }}
                        onClick={handleLoginWithGG}
                    > 
                        Sign in with Google
                    </Button>
                </Col>
            </Row>
        </div>
    )
}
