import React from 'react'
import Button from '../Button'
import { deleteServiceThunk } from '../../features/service/serviceSlice'
import { useDispatch } from 'react-redux'

function DeleteService({ id }) {
  const dispatch = useDispatch();

  const handleDelete = () => {
    dispatch(deleteServiceThunk(id))
  }

  return (
    <div className="inline-flex">
      <Button
        onClick={handleDelete}
        className="
          bg-red-50
          text-red-600
          border border-red-200
          px-4 py-2
          rounded-lg
          text-sm font-medium
          hover:bg-red-100 hover:text-red-700
          transition
        "
      >
        Delete
      </Button>
    </div>
  )
}

export default DeleteService