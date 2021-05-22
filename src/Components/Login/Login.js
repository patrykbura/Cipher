import React, { useState, useRef } from 'react';
import ReactDOM from 'react-dom'
import './Login.scss'
import { 
  Form, 
  Input, 
  Button, 
} from 'antd';
import SessionManager from '../../Utils/SessionManager'

const Login = () => {
  
  const [userAutheticated, setUserAutheticated] = useState(false)
  const formRef = useRef(null)

  const onFinish = (values) => {
    const isLogged = SessionManager.authenticate(values.password)

    if (!isLogged) {
      formRef.current.setFields([
        {
          name: 'password',
          errors: ['Wrong password'],
        }
      ])
    }

    setUserAutheticated(isLogged)
  };

  const renderLabel = () => {
    return (
      <Form.Item>
        <div className="login-container__label">
          Log In
        </div>
      </Form.Item>
    )
  }

  const renderPasswordInput = () => {
    return (
      <Form.Item
        label="Password"
        name="password"
        rules={[
        {
          message: 'Please input your password!',
        },
        ]}
      >
        <Input.Password />
      </Form.Item>
    )
  }

  const renderLogInButton  = () => {
    return (
      <Form.Item >
        <div className='login-overlay__buttons'>
          <Button 
            type="primary" 
            htmlType="submit"
            className='login-overlay__buttons--login'
          >
            Sign In
          </Button>
        </div>
      </Form.Item>
    )
  }

  const renderPopup = () => {
    return (
      <div className="login-overlay">
        <div className="login-container">
          <Form onFinish={onFinish} ref={formRef}>
            { renderLabel() }
            { renderPasswordInput() }
            { renderLogInButton() }
          </Form>
        </div> 
      </div>
    );
  };

  if (userAutheticated) {
    return null
  };

  return ReactDOM.createPortal(
    renderPopup(),
    document.getElementById('root')
  );
}

export default Login;