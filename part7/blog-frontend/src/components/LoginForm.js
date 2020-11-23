import React from 'react'
import PropTypes from 'prop-types'
import { Form, Button } from 'react-bootstrap'

const LoginForm = ({
  handleLogin,
  handleUsernameChange,
  handlePasswordChange,
  username,
  password
}) => {
  return (
    <div className="container">
      <h2>Log in to application</h2>
      <Form onSubmit={handleLogin}>
        <Form.Group>
          <Form.Label>Username</Form.Label>
          <div>
            <input
              id='username'
              type="text"
              value={username}
              name="Username"
              onChange={handleUsernameChange}
            />
          </div>
        </Form.Group>
        <Form.Group>
          <Form.Label>Password</Form.Label>
          <div>
            <input
              id='password'
              type="password"
              value={password}
              name="Password"
              onChange={handlePasswordChange}
            />
          </div>
        </Form.Group>
        <Form.Group>
          <Button id='login-button' type="submit">Login</Button>
        </Form.Group>
      </Form>
    </div >
  )
}

LoginForm.propTypes = {
  handleLogin: PropTypes.func.isRequired,
  handleUsernameChange: PropTypes.func.isRequired,
  handlePasswordChange: PropTypes.func.isRequired,
  username: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired
}

export default LoginForm