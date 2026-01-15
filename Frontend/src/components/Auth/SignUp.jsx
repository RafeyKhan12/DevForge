import React, { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { registerThunk } from "../../features/auth/authSlice.js"
import { Link, useNavigate } from "react-router"
import Input from "../Input.jsx"
import Button from "../Button.jsx"

function SignUp() {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const { isAuthenticated, loading, error } = useSelector(
    (state) => state.auth
  )

  const [data, setData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [localError, setLocalError] = useState("")


  if (isAuthenticated)
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50 px-4">
        <p className="text-slate-700 text-sm">
          User already exists,{" "}
          <Link
            to="/log-in"
            className="text-sky-500 hover:text-sky-600 font-medium"
          >
            click here to log in
          </Link>
        </p>
      </div>
    )

  if (loading)
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <p className="text-slate-600 text-lg">Loading...</p>
      </div>
    )

  const handleSubmit = async () => {
    if (!data.username || !data.email || !data.password) {
      setLocalError("All fields are required")
    }
    if (data.password !== data.confirmPassword) {
      setLocalError("Password does not match")
    }

    const result = await dispatch(registerThunk(data))
    if (registerThunk.fulfilled.match(result)) {
      navigate("/log-in")
    }
    setData({
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
    })
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 px-4">
      <div className="w-full max-w-md bg-white rounded-xl shadow-md p-8 space-y-5">

        <h1 className="text-2xl font-semibold text-slate-800 text-center">
          Sign Up
        </h1>

        <Input
          label="Username"
          value={data.username}
          onChange={(e) =>
            setData({ ...data, username: e.target.value })
          }
        />

        <Input
          label="E-Mail"
          type="email"
          value={data.email}
          onChange={(e) =>
            setData({ ...data, email: e.target.value })
          }
        />

        <Input
          label="Password"
          type="password"
          value={data.password}
          onChange={(e) =>
            setData({ ...data, password: e.target.value })
          }
        />

        <Input
          label="Confirm Password"
          type="password"
          value={data.confirmPassword}
          onChange={(e) =>
            setData({ ...data, confirmPassword: e.target.value })
          }
        />

        <Button
          onClick={handleSubmit}
          className="
            w-full bg-sky-500 hover:bg-sky-600
            text-white font-medium
            py-2.5 rounded-lg
            transition
          "
        >
          Sign Up
        </Button>

        {localError && (
          <p className="text-sm text-red-500 text-center">
            {localError}
          </p>
        )}
      </div>
    </div>
  )
}

export default SignUp
