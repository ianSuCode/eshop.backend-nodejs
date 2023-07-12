const express = require('express')
const app = express()
const path = require('path')
const PORT = process.env.PORT || 3500

app.use(express.static('public'))

app.use('/', require('./routes/root'))

app.get('/hello', (req, res) =>
  res.send('Hello iansucode.eshop.backend-nodejs!')
)

app.all('*', (req, res) => {
  res.status(404)
  if (req.accepts('html')) {
    res.sendFile(path.join(__dirname, 'views', '404.html'))
  } else if (req.accepts('json')) {
    res.json({ message: '404 Not Found' })
  } else {
    res.type('text', '404 Not Found')
  }
})

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`)
})
