// export enum ActionType {
//     ActPas = 'actpas',
//     Prep = 'prep',
//     Adjt = 'adjt',
//     Tense = 'tense',
//     DirectIndirect = 'directindirect',
//     SubjVerbAgreement = 'subvergagrmt',
//     Conditional = 'conditional',
//     Neg = 'neg'
// }

export enum ActionType {
    actpas = 'Active to Passive',
    prep = 'Preposition',
    adjt = 'Comparison of Adjectives',
    tense = 'Tenses',
    directindirect = 'Direct and Indirect Speech',
    subvergagrmt = 'Subject and Verb Agreement',
    conditional = 'Conditional Sentences',
    neg = 'Negative Sentences'
}

export interface GrammarAction {
    type: ActionType | '';
}