import React, {useState} from 'react'
import Socket from '../socket'

const Intro = (props) => {
  let [ channel, setChannel ] = useState('')
  let [ name, setName ] = useState('')

  const changeChannel = (ch) => {
    setChannel(ch)
  }

  const enter = () => {
    if ( !channel || !name ) {
      alert('channel 또는 name이 비었습니다.')
      return
    }
    
    Socket.gameInit(channel, name)
    props.history.push(`/game?name=${name}`)
  }

  return (
    <div id="channel">
      <div className="info">
        <h1>선택한 채널: {channel}</h1>
      </div>
      <div className="ch">
        <div className="ch-item" onClick={() => changeChannel('ch.1')}>Ch.1</div>
        <div className="ch-item" onClick={() => changeChannel('ch.2')}>Ch.2</div>
        <div className="ch-item" onClick={() => changeChannel('ch.3')}>Ch.3</div>
        <div className="ch-item" onClick={() => changeChannel('ch.4')}>Ch.4</div>
      </div>
      
      <div className="enter">
        <input type="text" placeholder="닉네임" onChange={e => setName(e.target.value)}/>

        <button onClick={enter}>입장</button>
      </div>
    </div>
  )
}

export default Intro