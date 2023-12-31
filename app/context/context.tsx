'use client';

import { createContext, useState, PropsWithChildren, useContext, Dispatch, SetStateAction } from 'react';

import { GrammarAction } from '@/app/types'

export const AppContext = createContext<{
    grammarAction: GrammarAction;
    setGrammarAction: Dispatch<SetStateAction<GrammarAction>>;
}>({
    grammarAction: { type: '' },
    setGrammarAction: () => { },
});

export const AppProvider = ({ children }: PropsWithChildren<{}>) => {
    const [grammarAction, setGrammarAction] = useState<GrammarAction>({ type: '' });

    return (
        <AppContext.Provider value={{ grammarAction, setGrammarAction }}>
            {children}
        </AppContext.Provider>
    );
};

export const useAppContext = () => {
    return useContext(AppContext);
};