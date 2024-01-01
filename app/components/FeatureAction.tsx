import React from 'react';
import { GrammarAction, ActionType } from '@/app/types';
import dynamic from 'next/dynamic'

const ActivePassiveComponent = dynamic(() => import('./GrammarActions/ActivePassiveComponent'), { ssr: false })
const Prepositions = dynamic(() => import('./GrammarActions/Prepositions'), { ssr: false })
const Adjectives = dynamic(() => import('./GrammarActions/Adjectives'), { ssr: false })
const Rewrite = dynamic(() => import('./GrammarActions/Rewrite'), { ssr: false })
const Tenses = dynamic(() => import('./GrammarActions/Tenses'), { ssr: false })
const DirectIndirect = dynamic(() => import('./GrammarActions/DirectIndirect'), { ssr: false })
const SubjectVerb = dynamic(() => import('./GrammarActions/SubjectVerb'), { ssr: false })
const Conditional = dynamic(() => import('./GrammarActions/Conditional'), { ssr: false })
const Negative = dynamic(() => import('./GrammarActions/Negative'), { ssr: false })

interface FeatureActionProps {
    type: GrammarAction;
}

const FeatureAction: React.FC<FeatureActionProps> = ({ type }) => {
    const { type: actionType } = type;
    const actionTypeValue = ActionType[actionType as keyof typeof ActionType]; // @ts-ignore

    return (
        <>
            {/* @ts-ignore */}
            {actionTypeValue === ActionType.rewrite && <Rewrite />}
            {/* @ts-ignore */}
            {actionTypeValue === ActionType.actpas && <ActivePassiveComponent />}
            {/* @ts-ignore */}
            {actionTypeValue === ActionType.prep && <Prepositions />}
            {/* @ts-ignore */}
            {actionTypeValue === ActionType.adjt && <Adjectives />}
            {/* @ts-ignore */}
            {actionTypeValue === ActionType.tense && <Tenses />}
            {/* @ts-ignore */}
            {actionTypeValue === ActionType.directindirect && <DirectIndirect />}
            {/* @ts-ignore */}
            {actionTypeValue === ActionType.subjectverb && <SubjectVerb />}
            {/* @ts-ignore */}
            {actionTypeValue === ActionType.conditional && <Conditional />}
            {/* @ts-ignore */}
            {actionTypeValue === ActionType.negative && <Negative />}
        </>
    )
};

export default FeatureAction;
