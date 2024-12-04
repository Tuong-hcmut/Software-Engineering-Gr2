import { useEffect, useState } from 'react';
import useAuth from '../hooks/useAuth';
import logo from '../assets/logo.png';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import styles from '../styles/Login.module.scss';

type Role = "user" | "admin" | "";

export default function Login() {
    const { t } = useTranslation();
    const { user, loading ,login } = useAuth();
    const navigate = useNavigate();
    const [role, setRole] = useState<Role>('');
    const [username, setUsername] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    useEffect(() => {
        if (!loading && user) {
            navigate('/homepage');
        }
    }, [loading, user]);
    if (role === "") {
        return (
            <div className={styles.container}>
                <div>
                <img src={logo} alt="logo" />
                <div>{t('loginAs')}</div>
                <button onClick={() => setRole('admin')}>{t('admin')}</button>
                <button onClick={() => setRole('user')}>{t('user')}</button>
                </div>
            </div>
        )
    }
    return (
        <div className={styles.container}>
            <form>
                <img src={logo} alt="logo" />
                <div>
                    <div className={styles.title}>{t('enterInfo')+ " " + t(role)}</div>
                    <label htmlFor="username">{t('username')}</label>
                    <input type="text" id="username" value={username} onChange={(e) => setUsername(e.target.value)} />
                    <label htmlFor="password">{t('password')}</label>
                    <input type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)}/>
                    <div className={styles.buttons}>
                        <button className={styles.cancel} onClick={() => {setRole(''); setUsername(''); setPassword('')}}>{t('cancel')}</button>
                        <button className={styles.login} onClick={(e) => {
                            e.preventDefault();
                            login(role, "1");
                            navigate('/homepage');
                        }}>{t('login')}</button>
                    </div>
                </div>
            </form>
        </div>
        
  )
}
