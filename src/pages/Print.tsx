import { useState } from "react"
import Upload from "../components/Upload"
import Specifications from "../components/Specifications"
import ChoosePrinter from "../components/ChoosePrinter"
import Confirmation from "../components/Confirmation"
import Success from "../components/Success"
import { useTranslation } from "react-i18next"
import { SpecificationsProvider } from "../context/SpecificationsContext"
import { useNavigate } from "react-router-dom"
import useAuth from "../hooks/useAuth"

export default function Print() {
    const navigate = useNavigate()
    const {user} = useAuth()
    if (!user) {
        navigate('/login')
    }
    const [step, setStep] = useState(1)
    const { t } = useTranslation()
    const titles = [t('Upload'), t('specifications'), t('choosePrinter'), t('confirmation')]
    const handleBack = () => {
        if (step > 1) {
            setStep(step - 1)
            return
        }
        navigate('/homepage')
    }
    const handleNext = () => {
        if (step === 5) {
            navigate('/homepage')
            return
        }
        setStep(step + 1)
    }
    return (
        <div>
            <div>{t('print')}/{titles[step-1]}</div>
            <button onClick={handleBack}>{t('back')}</button>
            <SpecificationsProvider>
                {step === 1 && <Upload/>}
                {step === 2 && <Specifications/>}
                {step === 3 && <ChoosePrinter/>}
                {step === 4 && <Confirmation/>}
                {step === 5 && <Success/>}
            </SpecificationsProvider>
            <button onClick={handleNext}>{(() => {
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
