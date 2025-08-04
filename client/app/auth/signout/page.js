"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import useRequest from "../../../hooks/use-request"

const Signout = () => {

    const router = useRouter()
    const {doRequest} = useRequest({
        url: 'http://localhost:3001/api/users/signout',
        method: 'POST',
        body: {},
        onSuccess: () => router.push('/')
    })

    useEffect(() => {
        doRequest()
    },[])

    return (
        <div>
            <h1>Signing you out..</h1>
        </div>
    )
}

export default Signout