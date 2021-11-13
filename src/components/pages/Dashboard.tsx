import React from 'react'
import { useSelector } from 'react-redux'
import { RootState } from '../../redux/store'
import { Typography } from 'antd'

const { Title } = Typography;

export default function Dashboard() {
    const user = useSelector((state: RootState) => state.auth.user);

    return (
        <div style={{padding: 50}}>
            <Title level={2}>Welcome 
                <span style={{ color: '#cfcfcf', fontWeight: 'bold' }}> {user?.username} </span>
                to Firebase Authentication
            </Title>
        </div>
    )
}
