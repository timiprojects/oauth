const express = require('express')
const uuid = require('uuid')
const passport = require('passport')
const session = require('express-session')
const FileStore = require('session-file-store')(session)
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const keys = require('./config/keys')
const path = require('path')
const expressLayouts = require('express-ejs-layouts')
const cors = require('cors')

const app = express()

require('./config/passport')(passport)

mongoose.connect(keys.MONGO_DB_LINK, { useNewUrlParser: true }).then(() => {
    console.log("MongoDB Connected")
})

app.use(cors())

app.use(expressLayouts)
app.set('view engine', 'ejs')
app.use(express.static(path.join(__dirname, 'public')))

app.use(express.urlencoded({ extended: false }))
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())

app.use(session({
    genid: (req) => {
        return uuid() // use UUIDs for session IDs
    },
    store: new FileStore(),
    secret: 'oauth',
    resave: false,
    saveUninitialized: true,
}))

app.use(passport.initialize())
app.use(passport.session())

app.use('/api', require('./routes/route'))

const PORT = process.env.PORT || 12345

app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});