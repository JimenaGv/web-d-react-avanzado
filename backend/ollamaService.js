// Etapa 3
import axios from 'axios'

export const generateFromOllama = async (prompt) => {
  const res = await axios.post('http://localhost:11434/api/generate', {
    /* model: 'llama2', */
    model: 'deepseek-r1:1.5b',
    prompt,
    stream: false
  })
  return res.data.response
}
