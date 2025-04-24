import React from 'react'

const Button = ({
    classes,
    text,
    disabled,
    onClick,
    id
}) => {
  return (
    <div>
        <button onClick={onClick} className={`btn btn-md sm:btn-sm md:btn-md  ${classes}`} id={id ? id : null} disabled={disabled}>{text}</button>
    </div>
  )
}

export default Button