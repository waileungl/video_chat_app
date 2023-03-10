import {React, useState} from 'react';
import Room from './components/room';
import {
  Routes,
  Route,
  Link,
  useNavigate
} from "react-router-dom";
import uuid from 'react-uuid';
import LandingPage from './components/landingPage';

function App() {
  //JOIN VIDEO CHAT ROOM 
  const[joined, setJoined] = useState(false)
  const[userID, setUserID] = useState('')
  const[userName, setUserName] = useState('')
  const[roomName, setRoomName] = useState('')
  const[invitationLink, setinvitationLink] = useState('')
  const navigate = useNavigate();

  const createRoom = (e) => {
    e.preventDefault();
    const hasSpaces = Boolean(userName.indexOf(' '))
    if (roomName === undefined || userName === undefined || !hasSpaces) {
      setJoined(false)
      navigate('/invalid')
    }
    setUserID(uuid())
    setJoined(true)
    const roomNameWithoutSpace = roomName.replace(/ /g, '-');
    const room_id = uuid().substring(0, 8) + '@' + roomNameWithoutSpace;
    navigate(`/room/${room_id}`);
  }

  const joinRoom = (e) => {
    e.preventDefault();
    const hasSpaces = Boolean(userName.indexOf(' '))
    if (userName === undefined || !hasSpaces || !invitationLink.includes("-") || !invitationLink.includes("@")) {
      setJoined(false)
      navigate('/invalid')
    }
    setUserID(uuid())
    setJoined(true)
    navigate(`/room/${invitationLink}`);
  }

  return (
    <>
      <Routes>
        <Route path="/" element={
          !joined && <LandingPage createRoom={createRoom} userName={userName} setUserName={setUserName} roomName={roomName} setRoomName={setRoomName} joinRoom={joinRoom} invitationLink={invitationLink} setinvitationLink={setinvitationLink}/>
        } />
        <Route path="/room/:ROOMID" element={<Room joined={joined} setJoined = {setJoined} userID = {userID} userName = {userName} roomName={roomName}/>} />
        <Route path="/*" element={<>Invalid invalid invitation link! <br/><Link to={'/'}>Back to create Room Page</Link></>} />
      </Routes>
    </>
  );
}

export default App;
