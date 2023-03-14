import ConversationInput from "./ConversationInput";
import HomeChat from "./HomeChat";
import UserConversation from "./UserConversation";
import styles from "../styles/Chat.module.css"
import { User } from "../types/user";
import { Conversation } from "../types/conversation";

{/* 
    Displays chat or home page if there is no conversation.
    Displays a list of messages and a input form to send message.
    Relaunch the server to see changes.
*/}

interface Props {
    currentUser: User,
    users: User[],
    conversation: Conversation | null
}

const Chat = ({ currentUser, users, conversation }: Props) => {
    return (

        <div className={styles.conversationContainer}>
            {!conversation ?
                <HomeChat></HomeChat>
                :
                <>
                    <div className={styles.userConversationContainer}>
                        <UserConversation users={users} currentUser={currentUser} conversation={conversation} />
                    </div>
                    <div className={styles.conversationInputContainer}>
                        <ConversationInput conversation={conversation} currentUser={currentUser} />
                    </div>
                </>
            }
        </div>
    )
}

export default Chat;
