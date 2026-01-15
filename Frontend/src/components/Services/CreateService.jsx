import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { createServiceThunk } from '../../features/service/serviceSlice'
import Input from "../Input.jsx"
import Button from "../Button.jsx"

function CreateService() {
  const dispatch = useDispatch()
  const { loading, error } = useSelector(state => state.service)

  const [data, setData] = useState({
    name: "",
    description: "",
    pricing: 0,
    isActive: true
  })
  const [localError, setLocalError] = useState("");

  const handleSave = async () => {
    if (!data.name || !data.description || !data.pricing) {
      setLocalError("All fields are required");
    }
    await dispatch(createServiceThunk(data))
    setData({
      name: "",
      description: "",
      pricing: 0,
      isActive: true
    })
  }

  return (
    <div className="bg-slate-50 py-12 px-4">
      <div className="max-w-xl mx-auto bg-white rounded-xl shadow-md p-8 space-y-5">

        <h2 className="text-2xl font-semibold text-slate-800 text-center">
          Create Service
        </h2>

        <Input
          value={data.name}
          placeholder="Enter name of service"
          onChange={(e) =>
            setData({ ...data, name: e.target.value })
          }
        />

        <textarea
          placeholder="Enter description"
          value={data.description}
          onChange={(e) =>
            setData({ ...data, description: e.target.value })
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

        <Input
          type="number"
          placeholder="Enter service price"
          value={data.pricing}
          onChange={(e) =>
            setData({
              ...data,
              pricing: Number(e.target.value),
            })
          }
        />

        <div className="flex flex-col gap-1">
          <label className="text-sm font-medium text-slate-700">
            Active
          </label>
          <select
            value={String(data.isActive)}
            onChange={(e) =>
              setData({
                ...data,
                isActive: e.target.value === "true",
              })
            }
            className="
              w-full
              border border-slate-300
              rounded-lg
              px-3 py-2
              text-slate-800
              focus:outline-none
              focus:ring-2 focus:ring-sky-500
              focus:border-sky-500
              transition
            "
          >
            <option value="true">Yes</option>
            <option value="false">No</option>
          </select>
        </div>

        <Button
          onClick={handleSave}
          className="
            w-full
            bg-sky-500 hover:bg-sky-600
            text-white
            font-medium
            py-2.5
            rounded-lg
            transition
          "
        >
          Save
        </Button>

        {error && (
          <p className="text-sm text-red-500 text-center">
            {error}
          </p>
        )}
        {localError && (
          <p className="text-sm text-red-500 text-center">
            {localError}
          </p>
        )}
      </div>
    </div>
  )
}

export default CreateService
