import {useEffect} from 'react'
import useSpecs from '../hooks/useSpecs';
import { useTranslation } from 'react-i18next';
import styles from '../styles/Print.module.scss'

export default function Confirmation() {
  const {t} = useTranslation();
  const {specifications, setSpecifications} = useSpecs();
  useEffect(() => {
    setSpecifications({...specifications, confirmationTime: new Date()})
  }, []);
  return (
    <div>
      <div className={styles.congrats}>{t("requestSuccess")}</div>
      <div className={styles.confirm} style={{backgroundColor: "white"}}>
        <span>
          <span>{t('title')}:</span>
          <span>{specifications.title}</span>
        </span>
        <span>
          <span>File:</span>
          <span>{specifications.file!.name}</span>
        </span>
        <span>
          <span>{t('requestTime')}:</span>
          <span>{specifications.requestTime.toLocaleString()}</span>
        </span>
        <span>
          <span>{t('printerID')}:</span>
          <span>{specifications.printerId}</span>
        </span>
        <span>
          <span>{t('location')}:</span>
          <span>{specifications.location}</span>
        </span>
        <span>
          <span>{t("confirmationTime")}</span>
          <span>{specifications.confirmationTime.toLocaleString()}</span>
        </span>
        <span>
          <span>{t("status")}</span>
          <span>{t("Pending")}</span>
        </span>
        </div>
    </div>
  )
}
