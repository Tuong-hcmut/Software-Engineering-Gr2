import React, { createContext, useState, ReactNode } from 'react';

type specifications = {
    paperSize: string;
    selectedPages: number[];
    numberOfCopies: number;
    isDoubleSided: boolean;
    isColor: boolean;
    Orientation: string;
}

interface SpecificationsContextType {
    specifications: specifications;
    setSpecifications: (spec: specifications) => void;
}

export const SpecificationsContext = createContext<SpecificationsContextType | undefined>(undefined);

export const SpecificationsProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [specifications, setSpecifications] = useState<specifications>({
        paperSize: "A4",
        selectedPages: [],
        numberOfCopies: 1,
        isDoubleSided: false,
        isColor: false,
        Orientation: "Portrait"
    });

    return (
        <SpecificationsContext.Provider value={{ specifications, setSpecifications }}>
            {children}
        </SpecificationsContext.Provider>
    );
};
