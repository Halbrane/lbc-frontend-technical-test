import { useState } from 'react'
import { User } from '../types/user';
import { timestampToString } from '../utils/time';
import styles from '../styles/MessageAuth.module.css';

{/* 
    Displays a message in a converation and update color and location accroding to user who send the message.
    If message is too long (max 200), button see more or see less appears.
*/}


interface Props {
    currentUser: User,
    message: any
}

const MessageAuth = ({ message, currentUser }: Props) => {
    const [showFullMessage, setShowFullMessage] = useState(false);

    const isCurrentUser = (id: any): Boolean => {
        if (currentUser.id == id) {
            return (true);
        } else {
            return (false);
        }
    }

    const handleClick = () => {
        setShowFullMessage(!showFullMessage);
    };

    return (

        <div key={message.id} className={styles.userConversationContainer}>
            <div className={`${styles.messageContainer} ${isCurrentUser(message.authorId) ? styles.userMessageContainer : styles.otherUserContainer}`}>
                <div className={`${styles.bodyMessageContainer} ${isCurrentUser(message.authorId) ? styles.userBodyMessage : styles.otherBodyMessage}`}>
                    <div className={`${styles.bodyMessage}`}>
                        {showFullMessage ? `${message.body}` : `${message.body.substring(0, 200)}`}
                        {
                            message?.body.length > 200 &&
                            <button onClick={handleClick} className={styles.buttonExtendBody}>{showFullMessage ? 'See less...' : 'See more...'}</button>
                        }
                    </div>
                </div>
                <div className={styles.subMessageContainer}>
                    <div className={`${styles.subMessage} ${isCurrentUser(message.authorId) ? styles.alignForCurrentUser : ''}`}>
                        <p>{timestampToString(message.timestamp)}</p>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default MessageAuth;