import React, { FC, lazy, Suspense } from 'react'
import { Navigate, useRoutes } from 'react-router-dom'
import Home from '@/views/Home'

const wrapperSuspense = (Component: React.LazyExoticComponent<FC>) => {
  return (
    <Suspense fallback={<div></div>}>
      <Component />
    </Suspense>
  )
}

const Login = wrapperSuspense(lazy(() => import(`../views/Login/index`)))

const AppRouter: FC = () => {
  return useRoutes([
    {
      path: '*',
      element: <Navigate to="/" />
    },
    {
      path: '/',
      element: <Home />
    },
    {
      path: '/login',
      element: Login
    }
  ])
}

export default AppRouter
