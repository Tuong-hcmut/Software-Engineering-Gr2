import useAuth from '../hooks/useAuth'
import { printJobs } from '../utils/sample'
import { useTranslation } from 'react-i18next'
import { Navigate } from 'react-router-dom'
import styles from '../styles/History.module.scss'
import { useState } from 'react'
export default function History() {
    const { t } = useTranslation()
    const {user} = useAuth()
    if (!user) {
        return <Navigate to="/login" />
    }
    const [displayJobs, setDisplayJobs] = useState(user.role === "user" ? printJobs.filter(job => job.studentId === user.id) : printJobs)
  return (
    <div className={styles.container}>
        <div className={styles.info}>
            <p>{t('historyIn')}</p>
            <ul>
                {displayJobs.map((job) => (
                    <li key={job.id}>
                        <span className={styles.decoration}></span>
                        <span className={styles.history}>
                            <div className={styles.ids}>
                                <span><span>{t('printID')}:</span> {job.id}</span>
                                <span><span>{t('printerID')}:</span> {job.printerId}</span>
                                <span><span>{t('copies')}:</span> {job.copies}</span>
                            </div>
                            <div><span>{t('location')}:</span> {job.location}</div>
                            <div><span>{t('confirmTime')}:</span> {job.confirmTime.toLocaleString()}</div>
                            <div><span>{t('status')}:</span> {t(job.status)}</div>
                            
                        </span>
                        <span className={styles.button}>
                            <button onClick={() => {
                                    printJobs.find(j => j.id === job.id)!.status = "cancelled"
                                    displayJobs.find(j => j.id === job.id)!.status = "cancelled"
                                    setDisplayJobs([...displayJobs])
                                }}>{t('cancel')}</button>
                        </span>
                    </li>
                ))}
            </ul>
        </div>
    </div>

)
}
