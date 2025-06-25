const express = require('express')
const dotenv = require('dotenv')
const connectToMongo = require('./db')
const cors = require('cors')


dotenv.config()
const app = express()
const PORT = process.env.PORT || 8000
connectToMongo()
app.use(cors())
app.use(express.json())

app.use('/api/urls', require('./routes/urls'))
app.use('/', require('./routes/redirect'))

app.listen(PORT, () => {
    console.log(`Server is running: http://localhost:${PORT}`)
})