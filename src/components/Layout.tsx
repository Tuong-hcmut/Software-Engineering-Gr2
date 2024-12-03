import useAuth from '../hooks/useAuth'
import { useTranslation } from 'react-i18next'
import logo from '../assets/logo.png'
import { NavLink } from 'react-router-dom'
import { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faBell, faUserCircle} from '@fortawesome/free-solid-svg-icons';
import styles from '../styles/Layout.module.scss'

export default function Layout({ children }: { children: React.ReactNode }) {
    const { user } = useAuth()
    const { t, i18n } = useTranslation()
    const [language, setLanguage] = useState(i18n.language.split('-')[0]);
    const changeLanguage = () => {
        const lng = language === 'en' ? 'vi' : 'en-US'
        i18n.changeLanguage(lng)
        setLanguage(lng.split('-')[0])
    }
    return (
        <div className={styles.container}>
            <nav className={styles.nav}>
                <div className={styles.left}>
                    <img src={logo} alt="logo" />
                    <span className={styles.title}>
                        <div>SSPS</div>
                        <div>{t('systemName')}</div>
                    </span>
                    <NavLink className={({isActive}) => isActive ? styles.active : ""} to="/homepage">{t('homepage').toUpperCase()}</NavLink>
                    {user && <NavLink className={({isActive}) => isActive ? styles.active : ""} to="/history">{t('history').toUpperCase()}</NavLink>}
                    {user && user.role ==='admin' && <>
                        <NavLink className={({isActive}) => isActive ? styles.active : ""} to="/report">{t('report').toUpperCase()}</NavLink>
                        <NavLink className={({isActive}) => isActive ? styles.active : ""} to="/printer">{t('printer').toUpperCase()}</NavLink>
                    </>}
                    {user && user.role==="user" && <>
                        <NavLink className={({isActive}) => isActive ? styles.active : ""} to="/print">{t('print').toUpperCase()}</NavLink>
                        <NavLink className={({isActive}) => isActive ? styles.active : ""} to="/buypages">{t('buyPages').toUpperCase()}</NavLink>
                    </>}
                </div>
                <div className={styles.right}>
                    <button className={styles[language]} onClick={changeLanguage}>{language}</button>
                    <FontAwesomeIcon icon={faBell} />
                    <FontAwesomeIcon icon={faUserCircle} />
                </div>
            </nav>
            <main>{children}</main>
        </div>
    )
}
