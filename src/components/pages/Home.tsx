import React from 'react'
import { Typography } from 'antd'

const { Title } = Typography;

export default function Home() {
    return (
        <div style={{padding: 50}}>
            <Title level={3}>Welcome to Homepage</Title>
        </div>
    )
}
