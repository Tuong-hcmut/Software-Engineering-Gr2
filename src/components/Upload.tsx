import useSpecs from '../hooks/useSpecs';
import styles from '../styles/Print.module.scss'
import { useTranslation } from 'react-i18next';

export default function Upload() {
  const {specifications, setSpecifications} = useSpecs()
  const { t } = useTranslation()
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setSpecifications({ ...specifications, file: e.target.files[0] });
    }
  };
  return (
    <div className={styles.upload}>
      <div>
        <span>{t('title')}</span>
        <input type="text" value={specifications.title} onChange={(e) => setSpecifications({...specifications, title: e.target.value})}/>
      </div>
      <div>
        <span>File</span>
        <div>
          <label htmlFor="file" className={styles.fileLabel}>
            {specifications.file ? specifications.file.name : t('chooseFile')}
          </label>
          <input
            type="file"
            id="file"
            className={styles.fileInput}
            accept='.pdf'
            onChange={handleFileChange}
          />
        </div>
      </div>
    </div>
  )
}
