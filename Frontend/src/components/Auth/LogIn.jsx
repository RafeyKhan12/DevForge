import React, { useState } from 'react'
import Input from "../Input.jsx"
import Button from "../Button.jsx"
import { Link, useNavigate } from 'react-router'
import { useDispatch, useSelector } from 'react-redux'
import { loginThunk } from '../../features/auth/authSlice.js'

function LogIn() {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const { loading, error } = useSelector((state) => state.auth)

  const [data, setData] = useState({
    username: "",
    password: ""
  })
  const [localError, setLocalError] = useState("")

  const handleLogIn = async () => {
    if (!data.username || !data.password) {
      setLocalError("All fields are required.")
    }
    const result = await dispatch(loginThunk(data))
    if (loginThunk.fulfilled.match(result)) {
      navigate("/")
    }
    setData({ username: "", password: "" })
    console.log("API: ", import.meta.env.VITE_API_BASE_URL);
  }

  if (loading)
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <h1 className="text-slate-600 text-lg">Loading...</h1>
      </div>
    )

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 px-4">
      <div className="w-full max-w-md bg-white rounded-xl shadow-md p-8 space-y-6">
        
        <h1 className="text-2xl font-bold text-slate-800 text-center">
          Login
        </h1>

        <Input
          label="Username"
          type="text"
          value={data.username}
          placeholder="Enter your username"
          onChange={(e) =>
            setData({ ...data, username: e.target.value })
          }
        />

        <Input
          label="Password"
          type="password"
          placeholder="Enter your password"
          value={data.password}
          onChange={(e) =>
            setData({ ...data, password: e.target.value })
          }
        />

        <Button
          type="submit"
          onClick={handleLogIn}
          className="w-full bg-sky-500 hover:bg-sky-600 text-white font-medium py-2.5 rounded-lg transition"
        >
          Log In
        </Button>

        <p className="text-sm text-slate-600 text-center">
          Don&apos;t have an account?{" "}
          <Link
            to="/sign-up"
            className="text-sky-500 hover:text-sky-600 font-medium"
          >
            Register here
          </Link>
        </p>

        {localError && (
          <p className="text-sm text-red-500 text-center">
            {localError}
          </p>
        )}
        {error && (
          <p className="text-sm text-red-500 text-center">
            {error}
          </p>
        )}
      </div>
    </div>
  )
}

export default LogIn
