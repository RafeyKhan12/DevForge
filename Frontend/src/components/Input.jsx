import React from 'react'

function Input({
  type = "text",
  label,
  placeholder,
  className = "",
  id,
  ...props
}) {
  return (
    <div className="flex flex-col gap-1 w-full">
      {label && (
        <label
          htmlFor={id}
          className="text-sm font-medium text-slate-700"
        >
          {label}
        </label>
      )}

      <input
        id={id}
        type={type}
        placeholder={placeholder}
        className={`
          w-full
          rounded-lg
          border border-slate-300
          px-3 py-2
          text-slate-800
          placeholder-slate-400
          focus:outline-none
          focus:ring-2 focus:ring-sky-500
          focus:border-sky-500
          transition
          ${className}
        `}
        {...props}
      />
    </div>
  )
}

export default Input
