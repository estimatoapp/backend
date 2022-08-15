const express = require('express')
const app = express()
const port = 3001

app.get('/', (req, res) => {
  res.json({ hello: 'Hello World!' })
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})