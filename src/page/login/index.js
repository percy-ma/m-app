import { useState } from "react"
import axios from 'axios'
import Cookie from 'js-cookie'
import request from '../../api/request'

export default function Login() {
    const [firstname, setFirstname] = useState('')
    const [lastname, setLastname] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [email2, setEmail2] = useState('')
    const [password2, setPassword2] = useState('')

    const firstnameChange = (e) => {
        let value = e.target.value
        setFirstname(value)
    }
    const lastnameChange = (e) => {
        let value = e.target.value
        setLastname(value)
    }
    const emailChange = (e) => {
        let value = e.target.value
        setEmail(value)
    }
    const passwordChange = (e) => {
        let value = e.target.value
        setPassword(value)
    }
    const emailChange2 = (e) => {
        let value = e.target.value
        setEmail2(value)
    }
    const passwordChange2 = (e) => {
        let value = e.target.value
        setPassword2(value)
    }

    const signUpSubmit = (e) => {
        e.preventDefault();
        console.log(firstname, lastname, email, password)
        axios.post('/user/signup', {
            firstname,
            lastname,
            password,
            email
        }).then(res => {
            console.log('success', res)
        }).catch(err => {
            console.log('error', err)
        })
    }
    const signInSubmit = (e) => {
        e.preventDefault();
        console.log(email, password)
        request.post('/user/login', {
            password: password2,
            email: email2
        }).then(res => {
            console.log('login success', res)
        }).catch(err => {
            console.log('error', err)
        })
    }

    return (
        <div>
            <form>
                <label htmlFor="firstname">First Name</label>
                <input name="firstname" value={firstname} onChange={firstnameChange}/>
                <label htmlFor="lastname">Last Name</label>
                <input name="lastname" value={lastname} onChange={lastnameChange}/>
                <label htmlFor="email">Email</label>
                <input name="email" value={email} onChange={emailChange}/>
                <label htmlFor="password">Password</label>
                <input name="password" value={password} onChange={passwordChange}/>
                <input type='submit' value='Sign Up' onClick={signUpSubmit} />
            </form>
            <form>
                <label htmlFor="email2">Email</label>
                <input name="email2" value={email2} onChange={emailChange2}/>
                <label htmlFor="password2">Password</label>
                <input name="password2" value={password2} onChange={passwordChange2}/>
                <input type='submit' value='Sign In' onClick={signInSubmit} />
            </form>
        </div>
    )
}