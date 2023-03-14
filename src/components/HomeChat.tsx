import Image from 'next/image';
import Logo from '../assets/lbc-logo.webp'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faDesktop, faMobileScreen, faRightFromBracket } from '@fortawesome/free-solid-svg-icons';
import { faComments } from '@fortawesome/free-regular-svg-icons'
import styles from '../styles/HomeChat.module.css'

{/* 
    Displays Home page when no conversations have been selected.
*/}

const HomeChat = () => {
    const year = new Date().getFullYear();

    return (
        <div className={styles.chatHomeContainer}>
            <div className={styles.subChatHomeContainer}>
                <div className={styles.titleContainer}>
                    <FontAwesomeIcon icon={faComments} className={styles.iconComments} />
                    <h1 className={styles.title}>Welcome</h1>
                    <p>Let's chat with people !</p>
                </div>
                <div className={styles.optionsResponsive}>
                    <FontAwesomeIcon icon={faDesktop} className={styles.iconOptionsResponsive} />
                    <FontAwesomeIcon icon={faMobileScreen} className={styles.iconOptionsResponsive} />
                </div>
                <div className={styles.containerLogo}>
                    <Image src={Logo} alt="Leboncoin Frontend Team" className={styles.logo} />
                </div>
                <div className={styles.copyright}>
                    &copy; Marion Rigal pour Leboncoin - {year}
                </div>
                <div className={styles.logoutMobileContainer}>
                    <a href='https://www.leboncoin.fr/'><FontAwesomeIcon icon={faRightFromBracket} className={styles.logoutMobileLogo} /></a>
                </div>
            </div>
        </div>
    )
}

export default HomeChat;