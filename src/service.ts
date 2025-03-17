import { type Model } from './llm'

const DEEPSEEK_API_KEY = 'sk-8690387b86b04c19aa692c4361e87725'

const modelsSetting:{[name:string]:{apiKey:string, baseUri:string}} = {
  'gpt-4': {
    baseUri: '',
    apiKey: ''
  },
  'llama': {
    baseUri: '',
    apiKey: ''
  },
  'deepseek': {
    baseUri: 'https://api.deepseek.com/chat/completions',
    apiKey: DEEPSEEK_API_KEY
  }
}

class ApiService {
  static async getModelResponse({name, baseUri}:Model) {
    const apiKey = modelsSetting[name].apiKey
    const data = {
      model:'deepseek-chat',
      messages:[
        {role:'user', content:'Hello, how are you?'}
      ],
      stream:false
    }
    const res = await fetch(baseUri, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`
      },
      body: JSON.stringify(data)
    })
    const result = await res.json()

  }
}
