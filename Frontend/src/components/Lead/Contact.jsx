import React, { useState } from "react"
import Input from "../Input"
import { useDispatch, useSelector } from "react-redux"
import { create } from "../../features/lead/leadSlice"
import Button from "../Button"

function Contact() {
  const dispatch = useDispatch()
  const { loading, error } = useSelector((state) => state.lead)

  const [data, setData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [localError, setLocalError] = useState("")

  const handleSubmit = async () => {
    if (!data.name || !data.email || !data.message) {
      setLocalError("All fields are required")
    }
    const result = await dispatch(create(data))
    if (create.fulfilled.match(result)) {
      setData({ name: "", email: "", message: "" })
    }
  }

  if (loading)
    return (
      <div className="text-center text-slate-600">
        Loading...
      </div>
    )

  return (
    <div className="bg-slate-50 py-16 px-4">
      <div className="max-w-xl mx-auto bg-white rounded-xl shadow-md p-8 space-y-5">

        <h2 className="text-2xl font-semibold text-slate-800 text-center">
          Contact Us
        </h2>

        <Input
          placeholder="Enter your name"
          value={data.name}
          onChange={(e) =>
            setData({ ...data, name: e.target.value })
          }
        />

        <Input
          placeholder="Enter your email"
          type="email"
          value={data.email}
          onChange={(e) =>
            setData({ ...data, email: e.target.value })
          }
        />

        <textarea
          placeholder="Enter details"
          value={data.message}
          onChange={(e) =>
            setData({ ...data, message: e.target.value })
          }
          className="
            w-full
            min-h-30
            rounded-lg
            border border-slate-300
            px-3 py-2
            text-slate-800
            placeholder-slate-400
            focus:outline-none
            focus:ring-2 focus:ring-sky-500
            focus:border-sky-500
            transition
            resize-none
          "
        />

        <Button
          onClick={handleSubmit}
          className="
            w-full
            bg-sky-500 hover:bg-sky-600
            text-white font-medium
            py-2.5 rounded-lg
            transition
          "
        >
          Submit
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

export default Contact
