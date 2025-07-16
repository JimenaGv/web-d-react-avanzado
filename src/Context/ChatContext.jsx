import { createContext, useReducer } from 'react'

// 1. Creación del contexto global
export const ChatContext = createContext()

// Estado inicial. Almacenamiento de los mensajes
const initialState = {
  messages: []
}

// Cambio de estado dependiendo de la acción que se recibe
const chatReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_MESSAGE':
      console.log('agregando mensaje ...')
      console.log(state)
      return { ...state, messages: [...state.messages, action.payload] } // Se copia el estado actual, se copia la lista actual de mensajes y se añade el nuevo mensaje al final
    case 'SET_LOADING':
      return { ...state, loading: action.payload }
    default:
      return state // Si la acción no se reconoce, se devuelve el estado sin cambios
  }
}

// 2. Provider
export const ChatProvider = ({ children }) => {
  const [state, dispatch] = useReducer(chatReducer, initialState)

  return (
    <ChatContext.Provider value={{ state, dispatch }}>
      {children}
    </ChatContext.Provider>
  )
}
