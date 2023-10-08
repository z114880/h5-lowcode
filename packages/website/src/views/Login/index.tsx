import styles from './index.module.scss'
import { FC } from 'react'
import { Form, Input, Button, message } from 'antd'
import { useNavigate } from 'react-router-dom'

const Login: FC = () => {
  const navigate = useNavigate()

  const onFinish = async (value: any) => {
    if (value.account === 'admin' && value.password === '123456') {
      localStorage.setItem('name', 'admin')
      localStorage.setItem('avatar', '/images/avatar.jpg')
      navigate('/')
    } else {
      message.error('Incorrect password!')
    }
  }
  return (
    <div className={styles['login-wrap']}>
      <div className={styles['login-view']}>
        <p className={styles['title']}>Low-code Platform</p>
        <p className="mb-2 text-center">username: admin &nbsp;&nbsp; password: 123456</p>
        <Form name="basic" className="w-[320px]" onFinish={onFinish} autoComplete="off">
          <Form.Item
            label="username"
            name="account"
            rules={[{ required: true, message: 'please input username!' }]}
          >
            <Input autoComplete="off" />
          </Form.Item>
          <Form.Item
            label="password"
            name="password"
            rules={[
              { required: true, message: 'Please input password!' },
              { min: 6, message: 'Password must be at least six digits!' }
            ]}
          >
            <Input.Password autoComplete="off" />
          </Form.Item>
          <Form.Item className={styles['login-button']}>
            <Button className="w-[180px]" type="primary" htmlType="submit">
              Login
            </Button>
          </Form.Item>
        </Form>
      </div>
      <a
        className="absolute bottom-2"
        href="https://beian.miit.gov.cn/"
        target="_blank"
        rel="noreferrer"
      >
        京ICP备2023015675号-1
      </a>
    </div>
  )
}

export default Login
