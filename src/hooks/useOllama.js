import axios from 'axios'

export const useOllama = () => {
  const sendMessage = async (userPrompt) => {
    try {
      const res = await axios.post('http://localhost:11434/api/generate', {
        /* model: 'llama2', */
        model: 'deepseek-r1:1.5b',
        prompt: userPrompt,
        stream: false
      })
      return res
    } catch (error) {
      console.error('error', error)
    }
  }
  return { sendMessage }
}
