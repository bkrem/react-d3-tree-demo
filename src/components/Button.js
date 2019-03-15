import React from 'react'

const Button = ({children, onClick}) => (
  <button
    type="button"
    className="btn btn-controls btn-block"
    onClick={onClick}
  >
    {children}
  </button>
)

export default Button