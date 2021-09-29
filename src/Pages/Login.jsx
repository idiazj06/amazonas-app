import React from 'react'
import LoginForm from '../Components/LoginForm'
import RegisterForm from '../Components/RegisterForm'
import { useLocation } from 'react-router-dom'

export default function Login() {
    const location = useLocation()
    
    return (
        <div>
            {
                location.pathname === '/auth/login'?
                <LoginForm/>:
                <RegisterForm/>
            }
        </div>
    )
}
