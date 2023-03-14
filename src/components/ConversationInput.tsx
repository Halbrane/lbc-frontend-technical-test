
import { FormEvent, useState } from 'react';
import { Message } from '../types/message';
import { User } from '../types/user';
import { Conversation } from '../types/conversation';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons';
import styles from '../styles/ConversationInput.module.css'

{/* 
    Input to send message.
    Security : You can't send an empty message and it's better to add more security by catching 
    response or error from the server and display it on the front.
*/}

interface Props {
  conversation: Conversation,
  currentUser: User
}

const ConversationInput = ({ conversation, currentUser }: Props) => {
  const [inputPrompt, setInputPrompt] = useState('');

  const sendMessage = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!inputPrompt) return;
    const input = inputPrompt.trim();
    setInputPrompt('');

    const message: Partial<Message> = {
      conversationId: conversation.id,
      authorId: currentUser.id,
      timestamp: Math.floor(Date.now() / 1000),
      body: input,
    }
    fetch(`http://localhost:3005/messages?conversationId=${conversation.id}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(message),
    })
      .then((response) => response.json())
      .then((data) => {
        // Verifications just come from the server. Display message if success or fetch message from server
      })
      .catch((error) => {
        // Displays verifications from the server to help user understand his error.
      });
  }

  return (
    <div className={styles.inputContainer}>
      <form onSubmit={sendMessage} className={styles.inputFormContainer}>
        <input
          type="text"
          value={inputPrompt}
          onChange={(e) => setInputPrompt(e.target.value)}
          placeholder="Type your message here..."
          className={styles.inputForm}
          required 
        />
        <button disabled={(!inputPrompt || !currentUser.id)} type="submit" className={styles.buttonForm}>
          <FontAwesomeIcon icon={faPaperPlane} className={styles.iconButtonForm} />
        </button>
      </form>
    </div>
  )
}

export default ConversationInput;