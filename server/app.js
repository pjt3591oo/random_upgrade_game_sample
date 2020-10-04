const app = require('express')();
const server = require('http').createServer(app);
const io = require('socket.io')(server);

const Channel = require('./data/channel')
const Chat = require('./data/chat')
const Score = require('./data/score')

const PORT = 3000

const CHANNEL_USER = {} // 유저가 어느 채널에 접속했는지에 대한 데이터 정보
const CHANNEL_DATA = {} // 채널별로 가지고 있는 채널객체

// 채널은 ch.숫자 형태로 관리한다.
for(let i = 1 ; i < 5 ; ++i) {
  const score = new Score()
  const chat = new Chat()
  const channel = new Channel(score, chat)
  CHANNEL_DATA[`ch.${i}`] = channel
}

server.listen(PORT, function() {
  console.log(`server on: ${PORT}`);
});

io.on('connection', function(socket) {
  
  // 채널접속
  socket.on('/channel', (data) => {
    let { name, channel } = data

    if (!CHANNEL_USER[name] ) {
      CHANNEL_USER[name] = channel
      
      socket.join(channel) // 룸 가입

      socket.emit('/channel/complete', {
        status: 200,
        chats: CHANNEL_DATA[channel].getChats(), 
        scores: CHANNEL_DATA[channel].getScores()
      })
    } else {
      socket.emit('/channel/fail', {status: 200, msg: "이미 등록된 유저입니다."})
    }
  })

  // 랭킹등록
  socket.on('/rank', (data) => {
    let { name } = data
    let channel = CHANNEL_USER[name]

    if(!channel) {
      socket.emit('/fail', {status: 200, msg: "잘못된 유저입니다."})
      return
    }

    CHANNEL_DATA[channel].addScore(data)
    
    // 해당 룸에만 이벤트 발생
    io.to(channel).emit('/rank/complete', {status: 200, scores: CHANNEL_DATA[channel].getScores()})
  })

  // 채팅발생
  socket.on('/chat', (data) => {
    let { name } = data
    let channel = CHANNEL_USER[name]
    CHANNEL_DATA[channel].addMsg(data)
    
    if(!channel) {
      socket.emit('/fail', {status: 200, msg: "잘못된 유저입니다."})
      return
    }

    // 해당 룸에만 이벤트 발생
    io.to(channel).emit('/chat/complete', {status: 200, chats: CHANNEL_DATA[channel].getChats()})
  })

  socket.on('/out', data => {
    let { name } = data
    let channel = CHANNEL_USER[name]

    delete CHANNEL_USER[name]
    socket.leave(channel)
  })
})