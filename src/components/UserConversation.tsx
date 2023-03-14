import { useState, useEffect, useRef } from 'react'
import MessageAuth from '../components/MessageAuth'
import { User } from '../types/user';
import { Conversation } from '../types/conversation';
import { Message } from '../types/message';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashCan } from '@fortawesome/free-solid-svg-icons';
import styles from '../styles/UserConversation.module.css'

{/* 
    Displays a list of messages in a conversation between two users.
*/}

interface Props {
  currentUser: User,
  users: User[],
  conversation: Conversation
}

const UserConversation = ({ currentUser, conversation }: Props) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const userConversationContainerRef = useRef(null);

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch(`http://localhost:3005/messages/${conversation.id}`);
      const data = await res.json();
      const sortedMessages = data?.sort((a, b) => b.lastMessageTimestamp - a.lastMessageTimestamp);
      setMessages(sortedMessages);
    }
    fetchData()
  }, [conversation])

  useEffect(() => {
    const userConversationContainer = userConversationContainerRef.current;
    userConversationContainer.scrollTop = userConversationContainer.scrollHeight;
  })

  const conversationName = () => {
    if (conversation.recipientId == currentUser.id) {
      return (conversation.senderNickname);
    } else {
      return (conversation.recipientNickname);
    }
  }

  return (
    <div className={styles.conversationContainer}>
      <div className={styles.userDescriptionMobile}>
        <h3>{conversationName()}</h3>
        <div className={styles.trashIconContainer}>
          <FontAwesomeIcon icon={faTrashCan} className={styles.trashIcon} />
        </div>
      </div>
      <div className={styles.userConversationContainer} ref={userConversationContainerRef}>
        {
          messages?.length == 0 && (
            <div className={styles.noMessageContainer}>
              <h1>Let's start to chat</h1>
            </div>
          )
        }
        {messages?.map((message) =>
          <MessageAuth key={message.id} message={message} currentUser={currentUser} />
        )}
      </div>


    </div>
  )
}

export default UserConversation;