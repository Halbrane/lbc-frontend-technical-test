import HeaderUser from './HeaderUser';
import ConversationPreview from './ConversationPreview';
import NewConversation from './NewConversation';
import { User } from '../types/user';
import { Conversation } from '../types/conversation';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRightFromBracket } from '@fortawesome/free-solid-svg-icons';
import styles from '../styles/SideBar.module.css';

{/* 
    SibeBar display : 
    - User presentation that is link to Home.
    - List of option to conversation whit new user.
    - List of all conversation previews
*/}

interface Props {
    currentUser: User,
    users: User[],
    setSelectedConvId: React.Dispatch<React.SetStateAction<number>>,
    selectedConvId: number | null,
    conversations: Conversation[]
}

const Sidebar = ({ currentUser, users, setSelectedConvId, selectedConvId, conversations}: Props) => {
    const sortedConversation = conversations?.sort((a, b) => b.lastMessageTimestamp - a.lastMessageTimestamp);
    const usersIdsWithConversation = sortedConversation.map(
    (conv: Conversation) => {
        return (conv.recipientId === currentUser.id ? conv.senderId : conv.recipientId);
    })

    return (
        <div className={styles.sideBarContainer}>
            <div className={styles.subSideBarContainer}>

                <HeaderUser currentUser={users.find((user) => user.id == currentUser.id)} setSelectedConvId={setSelectedConvId} />
                <NewConversation
                    usersWithoutConversation={users.filter((user) => user.id != currentUser.id && !usersIdsWithConversation.includes(user.id))}
                    currentUser={users.find((user) => user.id == currentUser.id)}
                    setSelectedConvId={setSelectedConvId}
                />
            </div>
            <div className={styles.conversationsPreviews}>
                {conversations?.map((conversation) => (
                    <ConversationPreview key={conversation.id} isActive={conversation.id === selectedConvId} conversation={conversation} currentUser={currentUser} setSelectedConvId={setSelectedConvId}/>
                ))}
            </div>
            <div className={styles.logoutContainer}>
                <a href='https://www.leboncoin.fr/'><FontAwesomeIcon icon={faRightFromBracket} className={styles.logoutLogo} /></a>
            </div>
        </div>
    )
}

export default Sidebar;