import { useState } from 'react';
import useAuth from '../hooks/useAuth';
import logo from '../assets/logo.png';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

type Role = "user" | "admin" | "";

export default function Login() {
    const { t } = useTranslation();
    const { login } = useAuth();
    const navigate = useNavigate();
    const [role, setRole] = useState<Role>('');
    const [username, setUsername] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    if (role === "") {
        return (
            <div>
                <img src={logo} alt="logo" />
                <div>{t('loginAs')}</div>
                <button onClick={() => setRole('admin')}>{t('admin')}</button>
                <button onClick={() => setRole('user')}>{t('user')}</button>
            </div>
        )
    }
    return (
        <form>
            <img src={logo} alt="logo" />
            <div>{t('enterInfo')+ " " + t(role)}</div>
            <label htmlFor="username">{t('username')}</label>
            <input type="text" id="username" value={username} onChange={(e) => setUsername(e.target.value)} />
            <label htmlFor="password">{t('password')}</label>
            <input type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)}/>
            <div>
                <button onClick={() => {setRole(''); setUsername(''); setPassword('')}}>{t('cancel')}</button>
                <button onClick={(e) => {
                    e.preventDefault();
                    login(role, "1");
                    navigate('/homepage');
                }}>{t('login')}</button>
            </div>
        </form>
  )
}
