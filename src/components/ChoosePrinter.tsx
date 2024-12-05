import { useState } from "react"
import { printers, Printer } from "../utils/sample"
import { useTranslation } from "react-i18next"
import styles from '../styles/Print.module.scss'
import useSpecs from "../hooks/useSpecs"
export default function ChoosePrinter() {
  const { specifications, setSpecifications } = useSpecs()
  const [selectedPrinter, setSelectedPrinter] = useState<string>(specifications.printerId)
  const { t } = useTranslation()
  const handleSelect = (printer: Printer) => {
    setSelectedPrinter(printer.id)
    setSpecifications({ ...specifications,  printerId: printer.id, location: printer.location })
  }
  return (
    <div className={styles.choose}>
      <div>
        <ul>
          {printers.map(printer => (
            <li key={printer.id} onClick={() => handleSelect(printer)}>
            <span className={styles.decoration}></span>
            <span className={styles.history}>
                <div><span>{t('printID')}:</span> {printer.id}</div>
                <div><span>{t('location')}:</span> {printer.location}</div>
                <div><span>{t('status')}:</span> {t(printer.status)}</div>
                <div><span>{t('type')}:</span> {t(printer.type)}</div>
            </span>
            <span className={styles.button}>
                <input type="checkbox" checked={selectedPrinter === printer.id} onChange={() => handleSelect(printer)}/>
            </span>
        </li>))}
        </ul>
      </div>
      <p>{t('mustChooseOnlyOne')}</p>
    </div>
  )
}
