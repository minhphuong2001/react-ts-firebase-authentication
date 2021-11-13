import React, { useEffect, useState } from 'react'
import { Button, Col, Row, Typography } from 'antd'
import InputField from '../InputField';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import { sendPasswordResetEmail, setError, setLoading, setSuccess } from '../../redux/actions/authActions';
import Message from '../message/Message';

const { Title } = Typography;

export default function ForgotPassword() {
    const [email, setEmail] = useState('');
    const [isLoading, setIsLoading] = useState(false)
    const dispatch = useDispatch()
    const {error, success} = useSelector((state: RootState) => state.auth)
    
    useEffect(() => {
        return () => {
            if (success) {
                dispatch(setSuccess(''))
            }
            if (error) {
                dispatch(setError(''))
            }
        }
    }, [dispatch, success, error])

    const handleSubmit = async (e: any) => {
        e.preventDefault();

        if (success) {
            dispatch(setSuccess(''))
        }

        if (error) {
            dispatch(setError(''))
        }

        setLoading(true)
        await dispatch(sendPasswordResetEmail(email, 'Email sent! Please check your email.'))
        setIsLoading(false)
    }

    return (
        <div>
            <Title level={3} style={{ padding: '50px 0 20px 50px' }}>Reset password</Title>
            <form onSubmit={handleSubmit}>
                {error && <Message message={error} type='error'/>}
                {success && <Message message={success} type='success'/>}
                <InputField
                    label='Email address'
                    name='email'
                    type='email'
                    placeholder='Enter email...'
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />

                <Row justify='center'>
                    <Col xs={8}>
                        <Button
                            style={{width: '100%'}}
                            type='primary'
                            htmlType='submit'
                            disabled={email ? false : true}
                        >
                            {isLoading ? '...Loading' : 'Send password reset email'}
                        </Button>
                    </Col>
                </Row>
            </form>
            
        </div>
    )
}
