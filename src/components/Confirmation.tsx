import {useEffect} from 'react'
import useSpecs from '../hooks/useSpecs';
import { useTranslation } from 'react-i18next';
import styles from '../styles/Print.module.scss'

export default function Confirmation({onMissing}: {onMissing: (error: string[]) => void}) {
  const {t} = useTranslation();
  const {specifications, setSpecifications} = useSpecs();
  useEffect(() => {
    const errors = []
    if (specifications.Orientation === '') {
      errors.push('missingOrientation')
    }
    if (specifications.paperSize === '') {
      errors.push('missingPaperSize')
    }
    if (specifications.selectedPages === '') {
      errors.push('missingPages')
    }
    if (specifications.numberOfCopies < 1) {
      errors.push('missingCopies')
    }
    if (specifications.printerId === '' || specifications.location === '') {
      errors.push('missingPrinter')
    }
    if (errors.length > 0) {
      onMissing(errors)
    }
    if (!specifications.requestTime) setSpecifications({...specifications, requestTime: new Date()})
  }, []);
  return (
    <div className={styles.confirm}>
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
        <span>{specifications.requestTime!.toLocaleString()}</span>
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
        <span>{t('pages')}:</span>
        <span>{t(specifications.selectedPages)}</span>
      </span>
      <span>
        <span>{t('paperSize')}:</span>
        <span>{specifications.paperSize}</span>
      </span>
      <span>
        <span>{t('copies')}:</span>
        <span>{specifications.numberOfCopies}</span>
      </span>
      <span>
        <span>{t('orientation')}:</span>
        <span>{t(specifications.Orientation)}</span>
      </span>
      <span>
        <span>{specifications.isDoubleSided? t('doubledSided'):t('singleSided')}</span>
        <span style={{fontWeight: "bold"}}>{specifications.isColor ? t('colored'):t("notColored")}</span>
      </span>
    </div>
  )
}
