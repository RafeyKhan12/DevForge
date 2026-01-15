import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Input from "../Input.jsx"
import Button from "../Button.jsx"
import { createProjectThunk } from '../../features/project/projectSlice'

function CreateProject() {
  const dispatch = useDispatch()
  const { error } = useSelector(state => state.project)

  const [data, setData] = useState({
    title: "",
    status: "pending",
    deadline: "",
    serviceName: "",
    clientName: ""
  });
  const [localError, setLocalError] = useState("");

  const handleSave = async () => {
    if(!data.title || !data.status || !data.deadline || !data.serviceName || !data.clientName){
      setLocalError("All fields are required")
    }
    await dispatch(createProjectThunk(data))
    setData({
      title: "",
      status: "pending",
      deadline: "",
      serviceName: "",
      clientName: ""
    })
  }

  return (
    <div className="bg-slate-50 py-12 px-4">
      <div className="max-w-xl mx-auto bg-white rounded-xl shadow-md p-8 space-y-5">

        <h2 className="text-2xl font-semibold text-slate-800 text-center">
          Create Project
        </h2>

        <Input
          placeholder="Enter title"
          value={data.title}
          onChange={(e) =>
            setData({ ...data, title: e.target.value })
          }
        />

        <div className="flex flex-col gap-1">
          <label className="text-sm font-medium text-slate-700">
            Status
          </label>
          <select
            value={data.status}
            onChange={(e) =>
              setData({ ...data, status: e.target.value })
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
            <option value="pending">Pending</option>
            <option value="started">Started</option>
            <option value="review">Review</option>
            <option value="completed">Completed</option>
          </select>
        </div>

        <Input
          type="date"
          value={data.deadline}
          onChange={(e) =>
            setData({ ...data, deadline: e.target.value })
          }
        />

        <Input
          placeholder="Enter service"
          value={data.serviceName}
          onChange={(e) =>
            setData({ ...data, serviceName: e.target.value })
          }
        />

        <Input
          placeholder="Enter client name"
          value={data.clientName}
          onChange={(e) =>
            setData({ ...data, clientName: e.target.value })
          }
        />

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

        {localError && (
          <p className="text-sm text-red-500 text-center">
            {localError}
          </p>
        )}
      </div>
    </div>
  )
}

export default CreateProject
