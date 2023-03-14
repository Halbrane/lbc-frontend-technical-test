import { User } from '../types/user';
import styles from '../styles/HeaderUser.module.css'

{/* 
    Displays current user information and Displays home page onClick.
*/}

interface Props {
  currentUser: User
  setSelectedConvId: React.Dispatch<React.SetStateAction<number>>,
}

const HeaderUser = ({ currentUser, setSelectedConvId }: Props) => {
  if (!currentUser) {
    return <div>No user found</div>;
  }

  return (
    <div className={styles.containerUser}>
      <div onClick={() => setSelectedConvId(null)} className={styles.userLinkHome}><h3 className={styles.userName}>{currentUser.nickname}</h3></div>
    </div>
  );
};

export default HeaderUser;