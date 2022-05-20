import React , {useState, useEffect} from 'react';
import queryString from 'query-string';
import { useParams, useLocation } from 'react-router-dom';
import io from 'socket.io-client';
import InfoBar from '../InfoBar/InfoBar';
import Input from '../Input/Input';
import Messages from '../Messages/Messages';
import TextContainer from '../TextContainer/TextContainer';
import './chat.css';

let socket;


const Chat = () => {
  const [name, setName] = useState('');
  const [room, setRoom] = useState('');
  const [users, setUsers] = useState('');
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const endpoint = 'localhost:4000';
  const data = useLocation();
  useEffect(() => {
    //const data = queryString.parse(location.search);
    //const data = useLocation();
    
    const search = data.search;
    const name = new URLSearchParams(search).get('name');
    const room = new URLSearchParams(search).get('room');
    setName(name);
    setRoom(room);
    socket = io(endpoint);
    socket.emit('join', { name, room}, () => {
      
    });
    return () => {
      socket.emit('disconnect');
      socket.off();
    }
    //console.log(data);
    //console.log(name, room);
  }, [data]);
  useEffect(() => {
    socket.on('message', (message) => {
      console.log("mess");
      setMessages([...messages, message]);
    });
    socket.on("roomData", ({ users }) => {
      
      setUsers(users);
    });
    }, [messages,users]);
  

  const sendMessage = (event) => {
    event.preventDefault();
    if(message) {
      socket.emit('sendMessage', message, () => setMessage(''));

    }
  }
  console.log(message,messages);
  console.log(users);
  return (
    <div className='outerContainer'>
      <div className='container'>
        <InfoBar room = {room}/>
        <Messages messages={messages} name={name} />
        <Input message={message} setMessage={setMessage} sendMessage={sendMessage} />

      </div>
      <TextContainer users={users}/>
    </div>
  );
}

export default Chat;
