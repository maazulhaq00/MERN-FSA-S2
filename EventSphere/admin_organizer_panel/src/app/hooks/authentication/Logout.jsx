import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';

function Logout() {

    const navigate = useNavigate()

    useEffect(() => {
        localStorage.removeItem("token");
        localStorage.removeItem("name");
        localStorage.removeItem("email");
        localStorage.removeItem("role");
        localStorage.removeItem("image");

        setTimeout(() => {
            navigate('/login')
        }, 1000)

    }, [])


    return (
        null
    )
}

export default Logout