import { useEffect, useState } from "react"
import Upload from "../components/Upload"
import Specifications from "../components/Specifications"
import ChoosePrinter from "../components/ChoosePrinter"
import Confirmation from "../components/Confirmation"
import Success from "../components/Success"
import { useTranslation } from "react-i18next"
import { useNavigate } from "react-router-dom"
import useAuth from "../hooks/useAuth"
import styles from '../styles/Print.module.scss'
import { printJobs } from "../utils/sample"
import useSpecs from "../hooks/useSpecs"

export default function Print() {
    const {specifications} = useSpecs()
    const navigate = useNavigate()
    const {user, loading} = useAuth()
    const [step, setStep] = useState(1)
    const { t } = useTranslation()
    const titles = [t('Upload'), t('specifications'), t('choosePrinter'), t('confirmation'), (t("confirmation"))]
    const [error, setError] = useState<string[]>([])
    const handleBack = () => {
        if (step > 1) {
            setError([])
            setStep(step - 1)
            return
        }
        navigate('/homepage')
    }
    const handleNext = () => {
        if (step === 5) {
            printJobs.push({
                id: (printJobs.length + 1).toString(),
                printerId: specifications.printerId,
                copies: specifications.numberOfCopies,
                location: specifications.location,
                confirmTime: specifications.confirmationTime!,
                status: "Pending",
                studentId: user!.id
            })
            navigate('/homepage')
            return
        }
        setError([])
        setStep(step + 1)
    }
    const handleMissing = (error: string[]) => {
        setError(error);
        setStep(step - 1)
    }
    const parseErrors = (errors: string[]) => {
        if (errors.length === 1) {
            return t(errors[0])
        }
        const temp = [...errors];
        const lastError = t(temp.pop()!).toLowerCase();
        const joinedErrors = temp.map((e, index) => index === 0 ? t(e) : t(e).toLowerCase()).join(', ');
        return joinedErrors + ' ' + t('and') + ' ' + lastError
    }
    useEffect(() => {
        if (!loading && !user) {
            navigate('/login')
        }
    }, [loading, user])
    return (
        <div className={styles.container}>
            <div className={styles.navigate}>{t('print')} / {titles[step-1]}</div>
            <button className={styles.back} onClick={handleBack}>{t('back')}</button>
            {error.length > 0 && <div className={styles.error}>{parseErrors(error)}</div>}
                {step === 1 && <Upload/>}
                {step === 2 && <Specifications onMissing={handleMissing}/>}
                {step === 3 && <ChoosePrinter/>}
                {step === 4 && <Confirmation onMissing={handleMissing}/>}
                {step === 5 && <Success/>}
            <button className={styles.next} onClick={handleNext}>{(() => {
                if (step === 4) {
                    return t('confirm')
                }
                if (step===5) {
                    return t('homepage')
                }
                return t('next')
            })()}</button>
        </div>
    )
}
