import React, { useState, useEffect } from 'react'
import queryString from 'query-string'
import io from 'socket.io-client'

import './Chat.css'

import InfoBar from '../InfoBar/InfoBar'
import Messages from '../Messages/Messages'
import Input from '../Input/Input'
import TextContainer from '../TextContanier/TextContainer'

//create an empty variable called socket
let socket = null;
const Chat = ({location}) => {
    const [name, setName] = useState('')
    const [room, setRoom] = useState('')
    const [message, setMessage] = useState('')
    const [messages, setMessages] = useState([])
    const [users, setUsers] = useState()
    const ENDPOINT = 'https://react-practise-for-chatapp.herokuapp.com/'

    useEffect(() => {
        const params= queryString.parse(location.search)
        const { name, room } = queryString.parse(location.search)
        
        socket = io(ENDPOINT)
        setName(name)
        setRoom(room)
        socket.emit('join', { name, room }, (error) => {
            if (error) {
                alert(error)
            }
        })
        return () => {
            socket.emit('disconnect')
            socket.disconnect()
        }

        //only if the two values(ENDPOINT,location.search) change,we need to rerender useEffect
    }, [ENDPOINT, location.search])

    useEffect(() => {
        socket.on('message', (message) => {
            setMessages([...messages, message])
        })
        socket.on('roomData',({users})=>{
            setUsers(users)
        })
        return ()=>{
            socket.emit('disconnect')
            socket.disconnect()
        }
    }, [messages])

    //function for sending messages
    const sendMessage = (e) => {
        e.preventDefault()
        if (message) {
            socket.emit('sendMessage', message, () => setMessage(''))
        }
    }
    
    return (
        <div className="outerContainer">
            <div className="container">
                <InfoBar room={room}/>
                <Messages messages={messages} name={name}/>
                <Input message={message} setMessage={setMessage} sendMessage={sendMessage}/>
            </div>
            <TextContainer users={users}/>
        </div>
    )

}
export default Chat