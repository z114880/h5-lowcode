import styles from './index.module.scss'
import { FC } from 'react'
import { Form, Input, Button, message } from 'antd'
import bg from '@/assets/images/login/bg.png'
import { useNavigate } from 'react-router-dom'

const Login: FC = () => {
  const navigate = useNavigate()

  const onFinish = async (value: any) => {
    if (value.account === 'admin' && value.password === '123456') {
      localStorage.setItem('name', 'admin')
      localStorage.setItem('avatar', '/images/avatar.jpg')
      navigate('/')
    } else {
      message.error('密码错误,请重新输入')
    }
  }
  return (
    <div className={styles['login-wrap']}>
      <div>
        <img className={styles['left_img']} src={bg} />
        <div className={styles['right_content']}>
          <div className={styles['login_view']}>
            <p className={styles['title']}>Low-code Platform</p>
            <p className="mb-2">username: admin &nbsp;&nbsp;&nbsp; password: 123456</p>
            <Form name="basic" className="w-[320px]" onFinish={onFinish} autoComplete="off">
              <Form.Item
                label="username"
                name="account"
                rules={[{ required: true, message: '请输入账号!' }]}
              >
                <Input autoComplete="off" />
              </Form.Item>
              <Form.Item
                label="password"
                name="password"
                rules={[
                  { required: true, message: '请输入密码!' },
                  { min: 6, message: '最少六位密码' }
                ]}
              >
                <Input.Password autoComplete="off" />
              </Form.Item>
              <Form.Item className={styles['login-button']}>
                <Button className="w-[180px] ml-12" type="primary" htmlType="submit">
                  Login
                </Button>
              </Form.Item>
            </Form>
          </div>
        </div>
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
