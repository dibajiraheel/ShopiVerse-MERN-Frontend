import React from 'react'
import { useSelector } from 'react-redux'

const Switch = ({
  defaultChecked,
  onChange,
  classes,
  themeSwitchReference,
}) => {


  return (
    <div>
          <input ref={themeSwitchReference} onChange={onChange} type="checkbox" defaultChecked={defaultChecked} className={`toggle toggle-sm toggle-accent ${classes}`} />
    </div>
  )
}

export default Switch
