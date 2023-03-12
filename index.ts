const { Configuration, OpenAIApi } = require("openai")
const request = require("request")
const configuration = new Configuration({
  apiKey: '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',
})
const openai = new OpenAIApi(configuration)
const exporess = require("express")
let app = exporess()
let browser

// app.all("*", (req: any, res: any) => {
//   res.header("Access-Control-Allow-Origin", "*")
//   res.header("Access-Control-Allow-Headers", "X-Requested-With,Content-Type")
//   res.header("Access-Control-Allow-Methods", "POST,GET")
//   // res.header("Content-Type", "application/json; charset=utf-8")
//   req.next()
// })


const sendTalk = async (prompt: string) => {
    // return new Promise((resolve, reject) => {
    //   const options = {
    //     url: "https://api.openai.com/v1/chat/completions",
    //     method: "POST",
    //     headers: {
    //       "Content-Type": "application/json",
    //       Authorization: `Bearer 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`,
    //     },
    //     json: true,
    //     body: {
    //       model: "gpt-3.5-turbo",
    //       messages: [{ role: "user", content: prompt }],
    //     },
    //   }
    //   request(options, (error, response, body) => {
    //     if (error) {
    //       return reject(error)
    //     }
    //     return resolve(response.data.choices[0].message)
    //   })
  // })
  const response = await openai.createChatCompletion({
    model: "gpt-3.5-turbo",
    messages: [{ role: "user", content: prompt }],
  })
  console.log("response", response.data.choices)
  return response.data.choices[0].message
  }
  app.listen(9085, async () => {
    let result = await sendTalk("hello")
    console.log(result);
  console.log("running on port 9085")
})

