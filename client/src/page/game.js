import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import Socket from '../socket'

function getUrlParams() {
  var params = {};
  window.location.search.replace(/[?&]+([^=&]+)=([^&]*)/gi, function (str, key, value) { params[key] = value; });
  return params;
}

const Game = (props) => {
  let [level, setLevel] = useState(0)
  let [chat, setChat] = useState('')
  let [msg, setMsg] = useState('')
  let [levelStatus, setLevelStatus] = useState(0) // -1: down, 0: 유지, 1: up
  let { chats = [], scores = [] } = useSelector(s => ({
    chats: s.Chat.chats,
    scores: s.Score.scores
  }))


  const rank = () => {
    let { name } = getUrlParams(props.location)
    Socket.emitScore(name, level)
  }

  const send = () => {
    let { name } = getUrlParams(props.location)
    Socket.emitChat(name, chat)
  }

  const upgradeNoti = () => {
    let { name } = getUrlParams(props.location)
    let jbRandom = Math.random();
    let random = Math.floor( jbRandom * 10 ) // 0~9
    
    if (random < 5) {
      setLevelStatus(0)
      setMsg('강화유지')
    } else if(random < 8) {
      setLevelStatus(1)
      setMsg('강화성공')
      Socket.emitChat(name, `[SYSTEM] ${name} 님께서 +${level + 1} 강화에 성공했습니다`)
      setLevel(level + 1)
    } else {
      setMsg('강화실패')
      setLevelStatus(-1)
      if (level && level > -1) {
        setLevel(level - 1)
      }
    }
  }

  useEffect(() => {
    let { name } = getUrlParams(props.location)
    
    return () => {
      Socket.emitOut(name)
    }
  }, [])

  useEffect(() => {
    let intervalId = setInterval(() => {
      setLevelStatus(0)
    }, 1500)

    return () => {
      clearInterval(intervalId)
    }
  }, [levelStatus])

  return (
    <div id="game">
      <div id="game-board" style={{ height: 200, width: 200 }}>
        <div>
          <h2>Level: {level} <span className={!levelStatus? "" : levelStatus === 1? "up" : "down"}>{!levelStatus? " " : levelStatus === 1? "+" : "-"}</span></h2>
          <h4>메세지: <span className={!levelStatus? "" : levelStatus === 1? "up" : "down"}>{msg}</span></h4>
          <button className="upgrade" onClick={() => upgradeNoti()}>강화하기</button>
        </div>
        <div>
          <button className="register" onClick={rank}>랭킹등록</button>
        </div>
      </div>

      <div id="game-rank">
        <h2>순위</h2>

        <ul>
          {scores.map((item, idx) => (
            <li key={idx}>
              <span>순위: {idx + 1} </span>
              <span>이름: {item.name}</span>
              <span>점수: {item.score}</span>
            </li>
          ))}
        </ul>
      </div>

      <div id="game-chat">
        <h2>채팅</h2>
        <input className="chat-msg" type="text" onChange={e => setChat(e.target.value)} placeholder="채팅"/>
        <button className="register" onClick={send}>전송</button>
        <ul>
          {chats.map((item, idx) => (
            <li key={idx}>
              
              <span>이름: {item.name} </span>
              <span>메시지: {item.chat} </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export default Game