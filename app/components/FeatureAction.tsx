import React from 'react';
import { GrammarAction, ActionType } from '@/app/types';
import dynamic from 'next/dynamic'

const ActivePassiveComponent = dynamic(() => import('./GrammarActions/ActivePassiveComponent'), { ssr: false })
const Prepositions = dynamic(() => import('./GrammarActions/Prepositions'), { ssr: false })

interface FeatureActionProps {
    type: GrammarAction;
}

const FeatureAction: React.FC<FeatureActionProps> = ({ type }) => {
    const { type: actionType } = type;
    const actionTypeValue = ActionType[actionType as keyof typeof ActionType]; // @ts-ignore

    // switch (actionTypeValue) {
    //     case ActionType.actpas:
    //         return <ActivePassiveComponent />;

    //     case ActionType.prep:
    //         return <Prepositions />
    // }
    
    return (
        <>
        {/* @ts-ignore */}
        {actionTypeValue === ActionType.actpas && <ActivePassiveComponent />}
        {/* @ts-ignore */}
        {actionTypeValue === ActionType.prep && <Prepositions />} 
        </>
    )
};

export default FeatureAction;
