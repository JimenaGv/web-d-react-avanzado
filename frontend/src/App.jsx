import { ChatBot } from './components/ChatBot'
import { ChatProvider } from './Context/chatContext'
import './index.css'

export const App = () => {
  return (
    <ChatProvider>
      <ChatBot />
    </ChatProvider>
  )
}
