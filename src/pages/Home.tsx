import general from '../assets/general.png';
import { generalNotifications } from '../utils/sample';
import { useTranslation } from 'react-i18next';
import styles from '../styles/Home.module.scss';

export default function General() {
    const { t, i18n } = useTranslation();
    return (
        <div className={styles.container}>
            <img src={general} alt="general" />
            <div>{t('notification')}</div>
            <ul>
                {generalNotifications.map((notification, index) => (
                    <li key={index}>{notification[i18n.language === "vi" ? "vi" : "en"]}</li>
                ))}
            </ul>
        </div>
    )
}
