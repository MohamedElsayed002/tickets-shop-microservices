"use client"

import { useState } from "react"
import { useRouter } from 'next/navigation' // ✅ Correct
import useRequest from '../../../hooks/use-request'

const Signin = () => {
    const router = useRouter() // ✅ use the hook

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const { doRequest, errors } = useRequest({
        url: 'http://localhost:3001/api/users/signin',
        method: 'post',
        body: {
            email,
            password
        },
        onSuccess: () => router.push('/') // ✅ works now
    });

    const onSubmit = async (event) => {
        event.preventDefault()
        await doRequest()
    }

    return (
        <form onSubmit={onSubmit}>
            <h1>Sign in</h1>
            <div>
                <label>Email Address</label>
                <input
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
            </div>
            <div>
                <label>Password</label>
                <input
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    type='password'
                />
            </div>
            {errors}
            <button type="submit">Sign in</button>
        </form>
    )
}

export default Signin
