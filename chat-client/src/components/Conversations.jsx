import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Chat from './Chat'
import './Conversations.css'

class Conversations extends Component {
  constructor (props) {
    super(props)
    this.getPartnerName = this.getPartnerName.bind(this)
  }

  getPartnerName (room) {
    const members = room.split('|')
    return members.filter((member) => member !== this.props.username)[0]
  }

  filterMessages (messages, room) {
    return messages.filter((message) => {
      return message.room === room
    })
  }

  render () {
    const {username, rooms, leaveRoom, sendChat, messages} = this.props
    const chatWindows = rooms.map((room, i) => {
      const roomMessages = this.filterMessages(messages, room)
      const partner = this.getPartnerName(room)
      return (
        <Chat
          key={i}
          room={room}
          username={username}
          partner={partner}
          messages={roomMessages}
          leaveRoom={leaveRoom}
          sendChat={sendChat} />
      )
    })
    return (
      <div className='conversations'>
        {chatWindows}
      </div>
    )
  }
}

Conversations.PropTypes = {
  username: PropTypes.string,
  rooms: PropTypes.arrayOf(PropTypes.string)
}

export default Conversations