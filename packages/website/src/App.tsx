import AppRouter from './router/index'
import { ContextProvider } from '@/utils/context'
function App() {
  return (
    <ContextProvider>
      <AppRouter />
    </ContextProvider>
  )
}

export default App
