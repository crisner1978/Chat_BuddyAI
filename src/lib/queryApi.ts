import openai from './chatgpt'

const query = async (prompt: string, chatId: string, model: string) => {
  const response = await openai
    .createCompletion({
      model,
      prompt,
      temperature: 0.9,
      max_tokens: 1500,
      top_p: 1,
      frequency_penalty: 0,
      presence_penalty: 0,
    })
    .then((res) => {
      console.log(res.data)
      return res.data.choices[0].text
    })
    .catch((err) => `ChatGPT was unable to find an answer for that! (Error: ${err.message})`)
  console.log(response)
  return response
}

export default query


