const { Configuration, OpenAIApi } = require("openai")
const configuration = new Configuration({
  apiKey: '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',
})
const openai = new OpenAIApi(configuration)
const exporess = require("express")
let app = exporess()

// app.all("*", (req: any, res: any) => {
//   res.header("Access-Control-Allow-Origin", "*")
//   res.header("Access-Control-Allow-Headers", "X-Requested-With,Content-Type")
//   res.header("Access-Control-Allow-Methods", "POST,GET")
//   // res.header("Content-Type", "application/json; charset=utf-8")
//   req.next()
// })

app.post('/chat', async (req, res) => {
  const { q } = req.body;
  let result = await sendTalk(q)
  res.json({
    code: 1,
    data: result
  })
})


const sendTalk = async (prompt) => {
  try {
    const response = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: prompt }],
    })
    console.log("response", response.data.choices)
    return response.data.choices[0].message
  } catch (error) {
    return error
  }
}

app.listen(9085, async () => {
  let result = await sendTalk("hello")
  console.log(result);
  console.log("running on port 9085")
})

