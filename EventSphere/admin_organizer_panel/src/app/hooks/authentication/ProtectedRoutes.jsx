import React, { useEffect, useState } from 'react'
import { Navigate } from 'react-router-dom';

function ProtectedRoutes({ children }) {

  const [token, setToken] = useState(localStorage.getItem("token"));

  useEffect(() => {
    setToken(localStorage.getItem("token"))
  }, [])

  return (
    token ? children : <Navigate to="/login" />
  )
}

export default ProtectedRoutes;