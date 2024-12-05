import React, { createContext, useState, ReactNode } from 'react';

type specifications = {
    paperSize: string;
    selectedPages: string;
    numberOfCopies: number;
    isDoubleSided: boolean;
    isColor: boolean;
    Orientation: string;
    file: File | null;
    title: string;
    printerId: string;
    location: string;
    confirmationTime: Date;
    requestTime: Date | null;
    numPages: number;
}

interface SpecificationsContextType {
    specifications: specifications;
    setSpecifications: (spec: specifications) => void;
}

export const SpecificationsContext = createContext<SpecificationsContextType | undefined>(undefined);

export const SpecificationsProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [specifications, setSpecifications] = useState<specifications>({
        title: "",
        paperSize: "",
        selectedPages: "",
        numberOfCopies: 1,
        isDoubleSided: false,
        isColor: false,
        Orientation: "Portrait",
        file: null,
        printerId: "",
        location: "",
        confirmationTime: new Date(),
        requestTime: new Date(),
        numPages: 0
    });

    return (
        <SpecificationsContext.Provider value={{ specifications, setSpecifications }}>
            {children}
        </SpecificationsContext.Provider>
    );
};
