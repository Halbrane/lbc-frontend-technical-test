import { useState, useEffect } from 'react'
import Head from 'next/head'
import Chat from '../components/Chat'
import Sidebar from '../components/SideBar'
import Loader from '../components/Loader'
import { getLoggedUserId } from '../utils/getLoggedUserId'
import { User } from '../types/user'
import { Conversation } from '../types/conversation'
import styles from '../styles/Home.module.css'

{/* 
    Display chat or home page if there is no conversation.
    Display a list of messages and a input form to send message.
    Relaunch the server to see changes.
*/}

const Home = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [selectedConvId, setSelectedConvId] = useState<number | null>(null);
  const currentUserId = getLoggedUserId();
  const currentUser = users?.find((user) => user.id == currentUserId);

  useEffect(() => {
    const fetchUsers = async () => {
      const res = await fetch(`http://localhost:3005/users/`);
      const usersList = await res.json();
      setUsers(usersList);
      setLoading(false);
    }
    fetchUsers();
  }, [])

  useEffect(() => {
    const fetchConversation = async () => {
      const res = await fetch(`http://localhost:3005/conversations/${currentUserId}`);
      const usersList = await res.json();
      setConversations(usersList);
    }

    if (!conversations.some(conv => conv.id === selectedConvId)) {
      fetchConversation();
    }
  }, [selectedConvId])

  return (
    <div className={styles.container}>
      <Head>
        <meta name="description" content="Frontend exercise for developpers who want to join us on leboncoin.fr"></meta>
      </Head>

      <main className={styles.main}>
        <div className={`${styles.sideBar}`}>
          <div className={styles.sideBar}>
            {loading ? (
              <Loader/>
            ) : (
              <Sidebar currentUser={currentUser} users={users} selectedConvId={selectedConvId} setSelectedConvId={setSelectedConvId} conversations={conversations} />
            )}
          </div>
        </div>
        <div className={styles.chat}>
          <Chat currentUser={currentUser} users={users} conversation={conversations?.find((conv) => conv.id === selectedConvId)} />
        </div>
      </main>

    </div>
  )
}

export default Home;
