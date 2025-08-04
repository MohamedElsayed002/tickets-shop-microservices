"use client"

import { useState, useEffect } from "react"
import { useRouter } from 'next/navigation' // ✅ Correct
import useRequest from "../../../hooks/use-request"


const Signup = () => {

    const router = useRouter()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const { doRequest, errors } = useRequest({
        url: 'http://localhost:3001/api/users/signup',
        method: 'post',
        body: {
            email,
            password
        },
        onSuccess: () => router.push('/')
    })

    const onSubmit = async (event) => {
        event.preventDefault()

        await doRequest()
    }

    return (
        <form onSubmit={onSubmit}>
            <h1>Sign up</h1>
            <div className="">
                <label>Email Address</label>
                <input
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    className="form-control"
                />
            </div>
            <div className="">
                <label>Password</label>
                <input
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    type="password"
                    className="form-control"
                />
            </div>
            {errors}
            <button className="btn btn-primary">Sign Up</button>
        </form>
    )
}

export default Signup