const express = require('express')
const cors = require('cors')
const bcrypt = require('bcrypt')
const session = require('express-session')
const MongoDBStore = require("connect-mongodb-session")(session);
const mongoose = require('mongoose')

const port = 5000
const app = express()
app.use(cors({ credentials: true, origin: 'http://localhost:3000' }))
app.use(express.json())

const mongodb = "mongodb://localhost:27017/passport"
mongoose.connect(mongodb)
const User = mongoose.model('User', { name: String, passwordHash: String, cardNum: String})

app.use(session({
  secret: 'secret string', 
  resave: false,
  saveUninitialized: false,
  store: new MongoDBStore({ uri: mongodb, collection: "sessions" }),
  cookie: { sameSite: false }
}))

app.use((req, res, next) => {
  const sessUser = req.session.user
  if (sessUser) {
    res.locals.authenticated = true
  } else {
    res.locals.authenticated = false
  }
  next()
})
  
app.post('/register', async (req, res) => {
  const { name, cardNum, password } = req.body;
  if (!name || !cardNum || !password) {
    return res.status(400).json({ message: "Please enter all fields" });
  }
  const username = await User.findOne({ cardNum: req.body.cardNum }, 'name').exec();
  if (username) {
    return res.status(409).json({ message: "User already registered" })
  }
  const hash = await bcrypt.hash(password, 10)
  const user = new User({name: name, passwordHash: hash, cardNum: cardNum})
  try {
    const result = await user.save();
    res.json({ message: `User was inserted with the _id: ${result?._id}` });
  } catch(err) {
    console.log(err)
    res.sendStatus(400)
  }
})

app.post('/login', async (req, res) => {
  const { cardNum, password } = req.body
  if (!cardNum || !password) {
    return res.status(400).json({ message: "Please enter all fields" });
  }
  const user = await User.findOne({ cardNum: cardNum }).exec()
  if (!user) {
    return res.status(401).send("ID number or password is incorrect")
  }
  bcrypt.compare(password, user.passwordHash, (err, result) => {
    if (err) {
      console.log(err)
      return res.sendStatus(500)
    }
    if (result) {
      const sessUser = { id: user._id, name: user.name, cardNum: cardNum }
      req.session.user = sessUser // Auto saves session data in mongo store
      return res.status(200).json({ message: "Login success" })
    } else {
      return res.status(401).json({ message: "ID number or password is incorrect" })
    }
  })
})

app.delete("/logout", (req, res) => {
  req.session.destroy((err) => {
    if (err) throw err;
    res.clearCookie("session-id"); // clears cookie containing expired sessionID
    res.json({ message: "Logged out successfully" });
  })
})

app.get('/user', async (req, res) => {
  if (res.locals.authenticated) {
    const { name, cardNum } = req.session.user
    return res.json({ name, cardNum })
  }
  return res.status(401).json({ success: false })
})

app.get('/users', async (req, res) => {
  const users = await User.find().exec()
  return res.json(users)
})

app.listen(port, () => console.log(`Server started on http://localhost:${port}`))