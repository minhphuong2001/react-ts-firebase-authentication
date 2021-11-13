import React, { InputHTMLAttributes } from 'react'
import './input.css'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
    label: string
}

export default function InputField(props: InputProps) {

    const { name, placeholder, type, value, onChange, label } = props;


    return (
        <div className='input-field'>
            <label className='label' htmlFor={name}>{label}</label>
            <input
                className='input'
                type={type}
                placeholder={placeholder}
                value={value}
                onChange={onChange}
                autoComplete='off'
            />
        </div>
    )
}
