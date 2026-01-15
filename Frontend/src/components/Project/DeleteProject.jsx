import React from 'react'
import Button from '../Button'
import { useDispatch, useSelector } from 'react-redux'
import { deleteProjectThunk } from '../../features/project/projectSlice'

function DeleteProject({ id }) {
  const dispatch = useDispatch()
  const { error } = useSelector(state => state.project)

  const handleDelete = () => {
    dispatch(deleteProjectThunk(id))
  }

  return (
    <div className="flex flex-col gap-2">
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

      {error && (
        <p className="text-sm text-red-500">
          {error}
        </p>
      )}
    </div>
  )
}

export default DeleteProject
