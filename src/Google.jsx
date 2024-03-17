import { useState, useEffect } from 'react';
import './App.css';
import { GoogleAuthProvider, onAuthStateChanged, signInWithPopup } from 'firebase/auth';
import { getFirestore, onSnapshot, collection, addDoc, orderBy, query, serverTimestamp } from 'firebase/firestore';
import { auth, app } from './firebase';

const db = getFirestore(app);

function Google() {
  const [user, setUser] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');

  useEffect(() => {
    const q = query(collection(db, 'messages'), orderBy('timestamp'));
    const unsubscribe = onSnapshot(q, snapshot => {
      setMessages(snapshot.docs.map(doc => ({
        id: doc.id,
        data: doc.data()
      })))
    });
    return unsubscribe;
  }, [])


  useEffect(() => {
    onAuthStateChanged(auth, user => {
      setUser(user);
    });
  }, []);

  const sendMessage = async () => {
    await addDoc(collection(db, 'messages'), {
      uid: user.uid,
      photoURL: user.photoURL,
      displayName: user.displayName,
      text: newMessage,
      timestamp: serverTimestamp()
    });

    setNewMessage('');
  }


  const handleGoogleLogin = async () => {
    const provider = new GoogleAuthProvider();

    try {
      await signInWithPopup(auth, provider);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    
    <div className='app-container'>
      {user ? (
        <div className='chat-container'>
          <div className='user-info'>Logged in as {user.displayName}</div>
          <div className='message-container'>
            {messages.map(msg => (
              <div key={msg.id} className={`message ${msg.data.uid === user.uid ? 'sent' : 'received'}`}>
                <div className='message-content'>
                  <img className='user-avatar' src={msg.data.photoURL} alt='User Avatar' />
                  <div className='message-text'>{msg.data.text}</div>
                </div>
              </div>
            ))}
          </div>
          <div className='input-container'>


  <input
    className='message-input'
    value={newMessage}
    onChange={e => setNewMessage(e.target.value)}
    placeholder='Type your message...'
  />
  {/* <span role='img' aria-label='Smiley' className='smiley-emoji'></span> */}
  <button className='send-button' onClick={sendMessage}>Send Message</button>
  <button className='logout-button' onClick={() => auth.signOut()}>Logout</button>
</div>


        </div>
      ) :

<div className='formContainer'>
  <div className='formWrapper'>
    <span className='logo'>ChatterBox</span>
    <button className='login-button' onClick={handleGoogleLogin}>Login with Google</button>
  </div>
</div>

      }
    </div>
  )
}

export default Google;
