import React from 'react'
import './Input.css'

const Input = ({ message, sendMessage, setMessage }) => (
    <form className="form">
        <input
            className="input"
            type="text"
            placeholder="Type a message"
            value={message}
            onChange={e => setMessage(e.target.value)}
            onKeyPress={e => e.key === "Enter" ? sendMessage(e) : null}
        />
        <button className="sendButton" onClick={e => sendMessage(e)}>SEND</button>
    </form>
)
export default Input;