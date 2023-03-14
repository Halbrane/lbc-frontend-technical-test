import { Conversation } from '../types/conversation';
import { User } from '../types/user';
import { timestampToString } from '../utils/time';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashCan } from '@fortawesome/free-solid-svg-icons';
import styles from '../styles/ConversationPreview.module.css'

{/* 
    Displays a conversation preview.
    To deleted a conversation, create a Method Deleted on http://localhost:3005/conversation/${conversation.id}.
*/}

interface Props {
    currentUser: User,
    conversation: Conversation,
    setSelectedConvId: React.Dispatch<React.SetStateAction<number>>,
    isActive: boolean
}

const ConversationPreview = ({ conversation, currentUser, setSelectedConvId, isActive }: Props) => {
    const isUserConversationSender = (conversation: Conversation): boolean => {
        if (conversation?.senderId === currentUser.id) {
            return true;
        }
        return false;
    }

    const getFirstLetter = (conversation: Conversation): string => {
        if (conversation.senderId === currentUser.id) {
            return conversation.recipientNickname.charAt(0);
        }
        return conversation?.senderNickname.charAt(0);
    }

    return (
        <div key={conversation?.id} className={styles.allConversationsContainer}>
            <div onClick={() => { setSelectedConvId(conversation.id) }} className={`${styles.allConversations} ${isActive ? styles.active : ''}`}>
                <p className={`${styles.firstLetter} ${isActive ? styles.activeMobile : ''}`}>{getFirstLetter(conversation)}</p>
                <div className={styles.infosConversationContainer}>
                    <h3>{isUserConversationSender(conversation) ? conversation?.recipientNickname : conversation.senderNickname}</h3>
                    <p>{timestampToString(conversation.lastMessageTimestamp)}</p>
                </div>
                <div className={styles.trashIconContainer}>
                    <FontAwesomeIcon icon={faTrashCan} className={styles.trashIcon} />
                </div>

            </div>
        </div>
    )
}

export default ConversationPreview;