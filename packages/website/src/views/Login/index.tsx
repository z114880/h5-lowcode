import styles from './index.module.scss'
import { FC } from 'react'
import { Form, Input, Button, message } from 'antd'
import bg from '@/assets/images/login/bg.png'
import logo from '@/assets/images/login/logo.png'
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
            <img src={logo} className={styles['logo']} />
            <p className={styles['title']}>H5低代码制作平台</p>
            <p className="mb-2">账号：admin 密码：123456</p>
            <Form name="basic" className="w-[320px]" onFinish={onFinish} autoComplete="off">
              <Form.Item
                label="账号"
                name="account"
                rules={[{ required: true, message: '请输入账号!' }]}
              >
                <Input autoComplete="off" />
              </Form.Item>
              <Form.Item
                label="密码"
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
                  登录
                </Button>
              </Form.Item>
            </Form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login
