import React, { useEffect } from 'react';
import useSpecs from '../hooks/useSpecs';
import Preview from './Preview';
import { paperSizes } from '../utils/sample';
import { useTranslation } from 'react-i18next';
import Select from 'react-select';
import CreatableSelect from 'react-select/creatable';
import styles from '../styles/Print.module.scss';

export default function Specifications({ onMissing }: { onMissing: (error: string[]) => void }) {
  const { specifications, setSpecifications } = useSpecs();
  const { t } = useTranslation();

  useEffect(() => {
    if (!specifications.title && !specifications.file) {
      onMissing(['missingTitle', 'missingFile']);
      return;
    }
    if (!specifications.file) {
      onMissing(['missingFile']);
      return;
    }
    if (!specifications.title) {
      onMissing(['missingTitle']);
      return;
    }
  }, [specifications, onMissing]);

  const paperSizeOptions = paperSizes.map(size => ({ value: size, label: size }));
  const pagesOptions = ["All", "Odd", "Even"].map(option => ({ value: option, label: t(option) }));
  const orientationOptions = ["Portrait", "Landscape"].map(option => ({ value: option, label: t(option) }));

  return (
    <div className={styles.specs}>
      {specifications.file && specifications.selectedPages !== "" ? <div className={styles.preview} style={{display: "flex", justifyContent:"center"}}><Preview file={specifications.file} selectedPages={specifications.selectedPages} isColored={specifications.isColor} /></div> : <div style={{backgroundColor: "white", padding: "2%"}}>{t('pleaseSelect')}</div>}
      <div className={styles.field}>
        <span>
          <label htmlFor="paperSize">{t('paperSize')}</label>
          <span>
          <Select
            id="paperSize"
            value={specifications.paperSize === "" ? {value: "", label: t("choose") + " " + t("paperSize").toLowerCase()} : { value: specifications.paperSize, label: specifications.paperSize }}
            onChange={(selectedOption) => setSpecifications({ ...specifications, paperSize: selectedOption?.value || '' })}
            options={paperSizeOptions}
            isSearchable={false}
          />
          </span>
        </span>
        <span>
          <label htmlFor="choosePages">{t('pages')}</label>
          <span>
          <CreatableSelect
            id="choosePages"
            value={specifications.selectedPages === "" ? {value: "", label: t("choose") + " " + t("pages").toLowerCase()} : { value: specifications.selectedPages, label:  t(specifications.selectedPages) }}
            onChange={(selectedOption) => setSpecifications({ ...specifications, selectedPages: selectedOption?.value || '' })}
            options={pagesOptions}
            onCreateOption={(inputValue) => setSpecifications({ ...specifications, selectedPages: inputValue })}
            isClearable />
          </span>
        </span>
        <span>
          <label htmlFor="numberOfCopies">{t('copies')}</label>
          <span>
          <input
            type="number"
            id="numberOfCopies"
            value={specifications.numberOfCopies}
            onChange={(e) => setSpecifications({ ...specifications, numberOfCopies: parseInt(e.target.value) })}
          />
          </span>
        </span>
        <span>
          <label htmlFor="isDoubleSided">{t('doubledSided')}</label>
          <span>
          <input
            type="checkbox"
            id="isDoubleSided"
            checked={specifications.isDoubleSided}
            onChange={(e) => setSpecifications({ ...specifications, isDoubleSided: e.target.checked })} />
          </span>
        </span>
        <span>
          <label htmlFor="isColor">{t('color')}</label>
          <span>
          <input
            type="checkbox"
            id="isColor"
            checked={specifications.isColor}
            onChange={(e) => setSpecifications({ ...specifications, isColor: e.target.checked })} />
          </span>
        </span>
        <span>
          <label htmlFor="Orientation">{t('orientation')}</label>
          <span>
          <Select
            id="Orientation"
            value={specifications.Orientation === "" ? {value: "", label: t("choose") + " " + t("orientation").toLowerCase()} : { value: specifications.Orientation, label:  t(specifications.Orientation) }}
            onChange={(selectedOption) => setSpecifications({ ...specifications, Orientation: selectedOption?.value || '' })}
            options={orientationOptions}
            isSearchable={false} />
          </span>        
        </span>
      </div>
    </div>
  );
}