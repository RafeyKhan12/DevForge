import React from 'react'

function Button({
  type,
  text,
  className="",
  children,
  ...props
}) {

  const style = ""

  return (
    <div>
      <button type={type} className={` ${className} `} {...props} >{children}</button>
    </div>
  )
}

export default Button
