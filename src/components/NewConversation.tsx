import Select from 'react-select'
import { User } from '../types/user'
import { Conversation } from '../types/conversation'
import styles from '../styles/NewConversation.module.css'

{/* 
    Create a new conversation between two user
    Deleted user in select options when new conversation is created
    Relaunch the server to see changes
*/}

interface Props {
    usersWithoutConversation: User[],
    currentUser: User,
    setSelectedConvId: React.Dispatch<React.SetStateAction<number>>,
}

const NewConversation = ({ usersWithoutConversation, currentUser, setSelectedConvId }: Props) => {

    const CreateNewConversation = async (e) => {
        const newConversation: Partial<Conversation> = {
            lastMessageTimestamp: Math.floor(Date.now() / 1000),
            recipientId: e.value,
            recipientNickname: e.label,
            senderId: currentUser.id,
            senderNickname: currentUser.nickname
        }
        fetch(`http://localhost:3005/conversations?senderId=${currentUser.id}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(newConversation),
        })
            .then((response) => response.json())
            .then((data: Conversation) => {
                setSelectedConvId(data.id);
            });
    }
    return (
        <div className={styles.selectContainer}>
            <Select
                defaultValue={null}
                onChange={CreateNewConversation}
                options={usersWithoutConversation.map(user => ({ value: user.id, label: user.nickname }))}
                placeholder='New Chat'
            />
        </div>
    );
};

export default NewConversation;