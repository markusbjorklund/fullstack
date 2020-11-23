import React, { useState, useImperativeHandle } from 'react'
import { Button } from 'react-bootstrap'

const padding = {
  marginTop: 5,
}

const Toggleable = React.forwardRef((props, ref) => {
  const [visible, setVisible] = useState(false)

  const hideWhenVisible = { display: visible ? 'none' : '' }
  const showWhenVisible = { display: visible ? '' : 'none' }

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  useImperativeHandle(ref, () => {
    return {
      toggleVisibility
    }
  })

  return (
    <div>
      <div style={hideWhenVisible}>
        <Button variant='primary' onClick={toggleVisibility}>{props.buttonLabel}</Button>
      </div>
      <div style={showWhenVisible}>
        {props.children}
        <Button style={padding} variant='danger' onClick={toggleVisibility}>Cancel</Button>
      </div>
    </div>
  )
})

Toggleable.displayName = 'Toggleable'

export default Toggleable