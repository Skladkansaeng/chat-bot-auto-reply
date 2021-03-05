const express = require('express'),
  app = express()
const path = require('path')

// crontab 
require('./services/cron.service').run()

// Config
app.use(express.static(path.join(__dirname, 'public/images')));
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

// Routes 
app.use(require('./routes'))


// Start Server
const server = app.listen(process.env.PORT || 3000, () => {
  let host = server.address().address
  let port = server.address().port
  console.log(`Server is running at http://${host}:${port}`)
})