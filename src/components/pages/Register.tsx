import React, { useState } from 'react'
import { Button, Row, Col, Typography } from 'antd'
import InputField from '../InputField';
import { Link, useHistory } from 'react-router-dom';
// import firebase from '../../firebase/config'
import { useDispatch } from 'react-redux';
import { register } from '../../redux/actions/authActions';

const { Title } = Typography;

export default function Register() {
    const [email, setEmail] = useState('')
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const dispatch = useDispatch()
    const history = useHistory()

    const handleSignUp = (e: any) => {
        e.preventDefault();
        // firebase.auth().createUserWithEmailAndPassword(email, password)
        //     .then((result) => {
        //         firebase.firestore().collection('users')
        //             .doc(firebase.auth().currentUser?.uid)
        //             .set({ username, email, password })
        //         console.log(result);
                
        //     })
        //     .catch((error) => {
        //         console.log(error.message);
        //     })
        dispatch(register({ username, email, password }))
        setUsername('')
        setEmail('')
        setPassword('')
        setConfirmPassword('')
        history.push('/sign-in')
    }

    return (
        <div style={{paddingTop: 100}}>
            <Title level={2} style={{textAlign: 'center'}}>Sign Up</Title>
            <form onSubmit={handleSignUp}>
                <InputField
                    name='username'
                    label='Username'
                    placeholder='Enter username'
                    type='username'
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
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
                <InputField
                    name='confirmPassword'
                    label='Confirm Password'
                    placeholder='Enter password again'
                    type='password'
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                />
                <div style={{marginBottom: '10px', marginLeft: 512, display: 'flex'}}>
                    <div style={{marginLeft: 300}}>
                        <span style={{ marginRight: 10 }}>Already have an account?</span>
                        <Link to='/sign-in' >
                            <span style={{ color: '#1f94ff', fontWeight: 600, cursor: 'pointer'}}>Sign In</span>
                        </Link>
                    </div>
                </div>
                <Row justify='center'>
                    <Col xs={8}>
                        <Button
                            type='primary'
                            style={{ width: '100%', marginBottom: "20px" }}
                            htmlType='submit'
                            disabled={email || username || password ? false : true}
                        > 
                            Sign Up
                        </Button>
                    </Col>
                </Row>
            </form>
        </div>
    )
}
