import React from 'react'
import './loading.css'

export default function Loading() {
    return (
        <div className='loading'> 
            <div className='spinner'>
                <div className='bounce1'></div>
                <div className='bounce2'></div>
                <div className='bounce3'></div>
            </div>
        </div>
    )
}
