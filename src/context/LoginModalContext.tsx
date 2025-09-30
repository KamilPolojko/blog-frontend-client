import { createContext, useContext, useState, ReactNode, Dispatch, SetStateAction } from 'react';

type LoginModalContextType  = {
    loginOpen: boolean;
    setLoginOpen: Dispatch<SetStateAction<boolean>>;
};

const LoginModalContext = createContext<LoginModalContextType | undefined>(undefined);

export const LoginModalProvider = ({ children }: { children: ReactNode }) => {
    const [loginOpen, setLoginOpen] = useState(false);

    return (
        <LoginModalContext.Provider value={{ loginOpen, setLoginOpen }}>
            {children}
        </LoginModalContext.Provider>
    );
};

export const useLoginModal = () => {
    const context = useContext(LoginModalContext);
    if (!context) {
        throw new Error('useModal must be used within a ModalProvider');
    }
    return context;
};
