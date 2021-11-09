const express = require('express');
const app = express();
const dotenv = require('dotenv')
const cors = require('cors')
const path = require('path')
const httpServer = require('http').Server(app)
const io = require('socket.io')(httpServer, {
    cors: {
      origin: "http://localhost:3000",
    }
  })

dotenv.config({
    path:'./env/config/config.env'
})

app.use(express.json())
app.use(cors())
app.use('/public',express.static(path.join(__dirname,"public")))
const MainRouter = require('./Routers/index');
const { ConnectDatabase } = require('./Helper/Database/ConnectDatabase');
const { CustomErrorHandler } = require('./Middleware/Error/CustomErrorHandler');
const { voteSocket, notificationSocket } = require('./Routers/Socket/socketRoute');
const PORT = process.env.PORT;
const NODE_ENV = process.env.NODE_ENV


voteSocket(io);
notificationSocket(io);



app.use('/api/v2',MainRouter)
app.use(CustomErrorHandler)
ConnectDatabase();


httpServer.listen(PORT,() => {
    console.log(`Server started on 5000 PORT : http://localhost:${PORT} : NODE_ENV : ${NODE_ENV}`)
})
